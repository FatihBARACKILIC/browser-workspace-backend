import { IsUrl } from 'class-validator';

export class CreatePhotographerDto {
  @IsUrl()
  url: string;
}
