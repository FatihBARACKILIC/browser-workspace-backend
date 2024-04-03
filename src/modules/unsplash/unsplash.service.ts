import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UnsplashService {
  constructor(private readonly config: ConfigService) {}

  async fetchFromUnsplash(url: string, init: RequestInit = {}) {
    const clientId = this.config.getOrThrow('unsplashClientId');
    const response = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
    });
    if (!response.ok) {
      throw new HttpException(response.statusText, response.status);
    }
    return await response.json();
  }
}
