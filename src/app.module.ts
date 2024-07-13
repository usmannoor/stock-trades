import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { DATABASE_TYPE, DATABASE_NAME } from './config/config';
import { TradesController } from './controllers/trades.controller';
import { TradesService } from './services/trades.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: DATABASE_TYPE as any,
      database: DATABASE_NAME,
      entities: [Trade],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Trade]),
  ],
  controllers: [TradesController],
  providers: [TradesService],
})
export class AppModule {}
