import { IsInt, IsString, Min, Max, IsIn, IsPositive } from 'class-validator';

export class CreateTradeDto {
  @IsString()
  @IsIn(['buy', 'sell'])
  type: string;

  @IsInt()
  user_id: number;

  @IsString()
  symbol: string;

  @IsInt()
  @Min(1)
  @Max(100)
  shares: number;

  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  timestamp: number;
}
