import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class FindStationQuery {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsInt()
  distance: number;
}
