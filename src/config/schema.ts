import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class Schema {
  @IsNumber()
  @IsNotEmpty()
  HTTP_PORT: number;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT: number;
}
