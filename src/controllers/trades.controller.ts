import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
  MethodNotAllowedException,
  BadRequestException,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { TradesService } from '../services/trades.service';
import { CreateTradeDto } from '../dtos/create-trade.dto';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  async create(@Body() createTradeDto: CreateTradeDto) {
    try {
      return await this.tradesService.create(createTradeDto);
    } catch (error) {
      throw new BadRequestException('Failed to create trade');
    }
  }

  @Get()
  async findAll(
    @Query('type') type: string,
    @Query('user_id') user_id: number,
  ) {
    try {
      return await this.tradesService.findAll(type, user_id);
    } catch (error) {
      throw new BadRequestException('Failed to retrieve trades');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.tradesService.findOne(id);
    } catch (error) {
      throw new NotFoundException('ID not found');
    }
  }

  @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
  @Delete(':id')
  async deleteNotAllowed() {
    throw new MethodNotAllowedException('Deleting trades is not allowed');
  }

  @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
  @Put(':id')
  async updateNotAllowed() {
    throw new MethodNotAllowedException('Updating trades is not allowed');
  }

  @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
  @Patch(':id')
  async patchNotAllowed() {
    throw new MethodNotAllowedException('Patch trades is not allowed');
  }
}
