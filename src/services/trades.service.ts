import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade } from '../entities/trade.entity';
import { CreateTradeDto } from '../dtos/create-trade.dto';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Trade)
    private tradesRepository: Repository<Trade>,
  ) {}

  async create(createTradeDto: CreateTradeDto): Promise<Trade> {
    try {
      const trade = this.tradesRepository.create(createTradeDto);
      return await this.tradesRepository.save(trade);
    } catch (error) {
      throw new BadRequestException('Failed to create trade');
    }
  }

  async findAll(type?: string, user_id?: number): Promise<Trade[]> {
    try {
      const query = this.tradesRepository.createQueryBuilder('trade');
      if (type) {
        query.andWhere('trade.type = :type', { type });
      }
      if (user_id) {
        query.andWhere('trade.user_id = :user_id', { user_id });
      }
      return await query.orderBy('trade.id', 'ASC').getMany();
    } catch (error) {
      throw new BadRequestException('Failed to retrieve trades');
    }
  }

  async findOne(id: number): Promise<Trade> {
    try {
      const trade = await this.tradesRepository.findOne({ where: { id } });
      if (!trade) {
        throw new NotFoundException('ID not found');
      }
      return trade;
    } catch (error) {
      throw new NotFoundException('ID not found');
    }
  }
}
