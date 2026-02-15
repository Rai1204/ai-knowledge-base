import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DocumentsService } from '../documents/documents.service';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class LlmService {
  private readonly llmServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private documentsService: DocumentsService,
  ) {
    this.llmServiceUrl = this.configService.get<string>('LLM_SERVICE_URL');
  }

  async summarize(documentId: string, userId: string) {
    try {
      const chunks = await this.documentsService.getDocumentChunks(documentId, userId);
      
      const response = await firstValueFrom(
        this.httpService.post<any>(`${this.llmServiceUrl}/summarize`, {
          chunks: chunks.map((c) => c.text),
        }),
      ) as AxiosResponse;

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to generate summary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async semanticSearch(documentId: string, query: string, userId: string) {
    try {
      const chunks = await this.documentsService.getDocumentChunks(documentId, userId);

      const response = await firstValueFrom(
        this.httpService.post<any>(`${this.llmServiceUrl}/semantic-search`, {
          query,
          chunks: chunks.map((c) => c.text),
        }),
      ) as AxiosResponse;

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to perform semantic search',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async chat(documentId: string, question: string, userId: string) {
    try {
      const chunks = await this.documentsService.getDocumentChunks(documentId, userId);

      const response = await firstValueFrom(
        this.httpService.post<any>(`${this.llmServiceUrl}/chat`, {
          question,
          chunks: chunks.map((c) => c.text),
        }),
      ) as AxiosResponse;

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to get chat response',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
