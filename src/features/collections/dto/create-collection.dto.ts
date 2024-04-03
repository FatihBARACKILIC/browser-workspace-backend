import { IsUrl } from 'class-validator';

export class CreateCollectionDto {
  @IsUrl()
  url: string;
}
