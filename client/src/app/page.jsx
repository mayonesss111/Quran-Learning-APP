'use client';

import { useState, useEffect } from 'react';
import SurahCard from '@/components/surahCard';

export default function HomePage() {
  const [surahList, setSurahList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quran/surah`);
        const data = await response.json();
        setSurahList(data);
      } catch (error) {
        console.error('Gagal memuat data surah:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, []);

  const filteredSurah = surahList.filter((surah) =>
    surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arti.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header & Search */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            📖 Al-Qur'an Digital
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Pelajari, baca, dan dengarkan lantunan ayat Al-Qur'an secara interaktif.
          </p>

          <div className="max-w-md mx-auto mt-6">
            <input
              type="text"
              placeholder="Cari nama surah atau arti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>
        </div>

        {/* List Surah */}
        {loading ? (
          <div className="text-center py-12 text-slate-500">Memuat daftar surah...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurah.map((surah) => (
              <SurahCard key={surah.nomor} surah={surah} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}