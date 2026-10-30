import { Controller, Get, Param } from '@nestjs/common';
import { QuranService } from './quran.service';

@Controller('quran')
export class QuranController {
  constructor(private readonly quranService: QuranService) {}

  // Endpoint: GET /api/quran/surah
  @Get('surah')
  getAllSurah() {
    return this.quranService.getAllSurah();
  }

  // Endpoint: GET /api/quran/surah/:nomor
  @Get('surah/:nomor')
  getSurahDetail(@Param('nomor') nomor: string) {
    return this.quranService.getSurahDetail(nomor);
  }
}