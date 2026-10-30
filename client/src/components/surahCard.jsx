import Link from 'next/link';

function surahCard({ surah }) {
  return (
    <Link href={`/quran/${surah.nomor}`}>
      <div className="border border-slate-200 hover:border-emerald-500 rounded-xl p-4 transition-all hover:shadow-md bg-white cursor-pointer group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {surah.nomor}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{surah.namaLatin}</h3>
              <p className="text-xs text-slate-500">
                {surah.arti} • {surah.jumlahAyat} Ayat
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-serif text-xl font-bold text-emerald-700">
              {surah.nama}
            </span>
            <p className="text-[10px] text-slate-400 uppercase mt-1">
              {surah.tempatTurun}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default surahCard;