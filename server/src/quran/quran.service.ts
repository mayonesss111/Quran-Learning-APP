import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class QuranService {
  // Ambil daftar 114 Surah
  async getAllSurah() {
    try {
      const response = await fetch('https://equran.id/api/v2/surat');
      const result = await response.json();
      return result.data;
    } catch (error) {
      throw new HttpException(
        'Gagal mengambil data surah',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Ambil detail Surah beserta Ayat dan Audio berdasarkan nomor surah
  async getSurahDetail(nomor: string) {
    try {
      const response = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      throw new HttpException(
        'Gagal mengambil detail surah',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}