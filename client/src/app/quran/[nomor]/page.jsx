'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function DetailSurahPage({ params }) {
  const resolvedParams = use(params);
  const nomorSurah = resolvedParams.nomor;

  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchDetailSurah = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/quran/surah/${nomorSurah}`
        );
        const data = await response.json();
        setSurah(data);
      } catch (error) {
        console.error('Gagal mengambil detail surah:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailSurah();
  }, [nomorSurah]);

  const toggleAudio = () => {
    if (!surah || !surah.audioFull) return;

    // Ambil URL audio qori pertama (misal: 05 - Misyari Rasyid)
    const audioUrl = surah.audioFull['05'] || Object.values(surah.audioFull)[0];

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio) {
        audio.play();
      } else {
        const newAudio = new Audio(audioUrl);
        newAudio.play();
        newAudio.onended = () => setIsPlaying(false);
        setAudio(newAudio);
      }
      setIsPlaying(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Memuat detail ayat...
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-600">Data surah tidak ditemukan.</p>
        <Link href="/" className="text-emerald-600 hover:underline">
          ← Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Tombol Kembali */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          ← Kembali ke Daftar Surah
        </Link>

        {/* Header Surah */}
        <div className="bg-emerald-600 text-white rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold">{surah.namaLatin}</h1>
          <p className="text-emerald-100 text-sm">
            {surah.arti} • {surah.jumlahAyat} Ayat • {surah.tempatTurun}
          </p>
          <div className="text-4xl font-serif py-2">{surah.nama}</div>

          {/* Tombol Putar Audio */}
          <button
            onClick={toggleAudio}
            className="mt-4 bg-white text-emerald-700 font-semibold px-6 py-2.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm inline-flex items-center gap-2 text-sm"
          >
            {isPlaying ? '⏸️ Hentikan Audio' : '▶️ Dengarkan Audio Surah'}
          </button>
        </div>

        {/* Teks Bismillah (Kecuali Surah At-Taubah / Surah 9) */}
        {surah.nomor !== 9 && (
          <div className="text-center py-6 text-2xl font-serif text-slate-700">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        )}

        {/* Daftar Ayat */}
        <div className="space-y-4">
          {surah.ayat?.map((item) => (
            <div
              key={item.nomorAyat}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center">
                  {item.nomorAyat}
                </span>
              </div>

              {/* Teks Arab */}
              <div className="text-right text-2xl md:text-3xl font-serif leading-loose text-slate-800 dir-rtl">
                {item.teksArab}
              </div>

              {/* Transliterasi & Terjemahan */}
              <div className="space-y-1 pt-2">
                <p className="text-xs text-emerald-700 italic">
                  {item.teksLatin}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.teksIndonesia}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}