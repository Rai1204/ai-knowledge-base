import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LlmService } from './llm.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SummarizeDto } from './dto/summarize.dto';
import { SearchDto } from './dto/search.dto';
import { ChatDto } from './dto/chat.dto';

@Controller('llm')
@UseGuards(JwtAuthGuard)
export class LlmController {
  constructor(private llmService: LlmService) {}

  @Post('summarize')
  async summarize(@Body() summarizeDto: SummarizeDto, @Request() req) {
    return this.llmService.summarize(summarizeDto.documentId, req.user.userId);
  }

  @Post('search')
  async search(@Body() searchDto: SearchDto, @Request() req) {
    return this.llmService.semanticSearch(
      searchDto.documentId,
      searchDto.query,
      req.user.userId,
    );
  }

  @Post('chat')
  async chat(@Body() chatDto: ChatDto, @Request() req) {
    return this.llmService.chat(
      chatDto.documentId,
      chatDto.question,
      req.user.userId,
    );
  }
}
