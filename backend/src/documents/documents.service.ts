import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './schemas/document.schema';
import * as fs from 'fs';
import * as path from 'path';
const pdfParse = require('pdf-parse');

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<Document>,
  ) {}

  async findByUserId(userId: string) {
    return this.documentModel.find({ userId }).sort({ uploadedAt: -1 });
  }

  async findOne(id: string, userId: string) {
    const document = await this.documentModel.findById(id);
    
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    if (document.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return document;
  }

  async uploadDocument(file: Express.Multer.File, userId: string) {
    try {
      // Read PDF file
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);

      // Split text into chunks (simple chunking by paragraphs)
      const chunks = this.chunkText(data.text, 1000);

      // Create document record
      const document = new this.documentModel({
        filename: file.originalname,
        filepath: file.path,
        userId,
        chunks: chunks.map((text) => ({ text })),
      });

      await document.save();

      return {
        message: 'Document uploaded successfully',
        document: {
          id: document._id,
          filename: document.filename,
          uploadedAt: document.uploadedAt,
          chunksCount: chunks.length,
        },
      };
    } catch (error) {
      // Clean up uploaded file if processing fails
      if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      console.error('Upload error:', error);
      throw new Error(`Failed to process document: ${error.message}`);
    }
  }

  async delete(id: string, userId: string) {
    const document = await this.findOne(id, userId);

    // Delete file from disk
    if (fs.existsSync(document.filepath)) {
      fs.unlinkSync(document.filepath);
    }

    await this.documentModel.findByIdAndDelete(id);

    return { message: 'Document deleted successfully' };
  }

  private chunkText(text: string, chunkSize: number): string[] {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > chunkSize && currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += ' ' + sentence;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  async getDocumentChunks(documentId: string, userId: string): Promise<any[]> {
    const document = await this.findOne(documentId, userId);
    return document.chunks;
  }
}
