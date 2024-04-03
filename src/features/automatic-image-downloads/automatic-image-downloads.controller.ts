import { Controller, Post } from '@nestjs/common';
import { AutomaticImageDownloadsService } from './automatic-image-downloads.service';

@Controller('automatic-image-downloads')
export class AutomaticImageDownloadsController {
  constructor(
    private readonly automaticImageDownloadsService: AutomaticImageDownloadsService,
  ) {}

  @Post()
  automaticDownload() {
    return this.automaticImageDownloadsService.automaticDownload();
  }
}
