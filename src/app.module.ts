import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationsModule } from './stations/stations.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [StationsModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
