import { Test, TestingModule } from '@nestjs/testing';
import { TradesService } from '../services/trades.service';
import { Trade } from '../entities/trade.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTradeDto } from '../dtos/create-trade.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('TradesService', () => {
  let service: TradesService;
  let repository: Repository<Trade>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradesService,
        {
          provide: getRepositoryToken(Trade),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TradesService>(TradesService);
    repository = module.get<Repository<Trade>>(getRepositoryToken(Trade));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a trade', async () => {
      const createTradeDto: CreateTradeDto = {
        type: 'buy',
        user_id: 1,
        symbol: 'AAPL',
        shares: 10,
        price: 150,
        timestamp: Date.now(),
      };

      const trade = {
        id: 1,
        ...createTradeDto,
      };

      jest.spyOn(repository, 'create').mockReturnValue(trade as any);
      jest.spyOn(repository, 'save').mockResolvedValue(trade as any);

      expect(await service.create(createTradeDto)).toEqual(trade);
    });

    it('should throw a BadRequestException if create fails', async () => {
      const createTradeDto: CreateTradeDto = {
        type: 'buy',
        user_id: 1,
        symbol: 'AAPL',
        shares: 10,
        price: 150,
        timestamp: Date.now(),
      };

      jest.spyOn(repository, 'create').mockReturnValue(createTradeDto as any);
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      await expect(service.create(createTradeDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of trades', async () => {
      const trades = [
        {
          id: 1,
          type: 'buy',
          user_id: 1,
          symbol: 'AAPL',
          shares: 10,
          price: 150,
          timestamp: Date.now(),
        },
        {
          id: 2,
          type: 'sell',
          user_id: 2,
          symbol: 'GOOG',
          shares: 5,
          price: 2000,
          timestamp: Date.now(),
        },
      ];

      jest.spyOn(repository, 'createQueryBuilder').mockImplementation(
        () =>
          ({
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue(trades),
          }) as any,
      );

      expect(await service.findAll()).toEqual(trades);
    });

    it('should throw a BadRequestException if findAll fails', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockImplementation(
        () =>
          ({
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockRejectedValue(new Error()),
          }) as any,
      );

      await expect(service.findAll()).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a trade', async () => {
      const trade = {
        id: 1,
        type: 'buy',
        user_id: 1,
        symbol: 'AAPL',
        shares: 10,
        price: 150,
        timestamp: Date.now(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(trade as any);

      expect(await service.findOne(1)).toEqual(trade);
    });

    it('should throw a NotFoundException if trade is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
