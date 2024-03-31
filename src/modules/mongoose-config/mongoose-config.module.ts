import { Module } from '@nestjs/common';
import { MongooseConfigService } from './mongoose-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MongooseConfigService],
  exports: [MongooseConfigService],
})
export class MongooseConfigModule {}
