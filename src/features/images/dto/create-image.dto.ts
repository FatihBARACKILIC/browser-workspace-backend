import { IsUrl, Matches } from 'class-validator';
import { regexConstant } from 'src/shared/constants';

export class CreateImageDto {
  @IsUrl()
  @Matches(regexConstant.unsplashUrlPattern)
  url: string;
}
