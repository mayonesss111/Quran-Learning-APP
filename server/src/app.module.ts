import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuranModule } from './quran/quran.module';

@Module({
  imports: [QuranModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
