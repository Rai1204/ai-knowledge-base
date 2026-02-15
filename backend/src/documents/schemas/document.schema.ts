import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';
import * as mongoose from 'mongoose';

class Chunk {
  @Prop({ required: true })
  text: string;

  @Prop({ type: [Number], default: [] })
  embedding?: number[];
}

const ChunkSchema = new mongoose.Schema({
  text: { type: String, required: true },
  embedding: { type: [Number], default: [] },
});

@Schema({ timestamps: true })
export class Document extends MongooseDocument {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  filepath: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  uploadedAt: Date;

  @Prop({ type: [ChunkSchema], default: [] })
  chunks: Chunk[];
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
