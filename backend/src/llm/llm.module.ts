import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LlmController } from './llm.controller';
import { LlmService } from './llm.service';
import { DocumentsModule } from '../documents/documents.module';
import { Document, DocumentSchema } from '../documents/schemas/document.schema';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    DocumentsModule,
    MongooseModule.forFeature([{ name: Document.name, schema: DocumentSchema }]),
  ],
  controllers: [LlmController],
  providers: [LlmService],
})
export class LlmModule {}
