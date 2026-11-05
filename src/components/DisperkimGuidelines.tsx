import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle, ShieldCheck, FileText, Building2, HelpCircle } from 'lucide-react';

export const DisperkimGuidelines: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 rounded-lg text-emerald-800 dark:text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Pedoman Teknis Pengkajian &amp; Standar Bantuan Stimulan Perumahan
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Rujukan Resmi Permen PUPR No. 29/PRT/M/2018 &amp; Pedoman BNPB No. 04/2012 (JITUPASNA)
            </p>
          </div>
        </div>
      </div>

      {/* 3 Klasifikasi Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rusak Ringan */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
              Rusak Ringan (RR)
            </span>
            <span className="text-xs font-mono-numbers px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
              0% - 30%
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono-numbers">
            Plafon Stimulan: Rp 15.000.000
          </p>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
            <p><strong>Ciri Kerusakan:</strong> Struktur utama (pondasi, kolom, sloof, ring balok) utuh dan tegak. Kerusakan sebatas retak rambut dinding (&lt;2mm), beberapa genteng lepas/melorot, atau plafon copot setempat.</p>
            <p><strong>Status Huni:</strong> Layak huni sementara.</p>
            <p><strong>Metode Pemulihan:</strong> Perbaikan swadaya bahan bangunan tanpa perlu pembongkaran struktur.</p>
          </div>
        </div>

        {/* Rusak Sedang */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
              Rusak Sedang (RS)
            </span>
            <span className="text-xs font-mono-numbers px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
              31% - 65%
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono-numbers">
            Plafon Stimulan: Rp 30.000.000
          </p>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
            <p><strong>Ciri Kerusakan:</strong> Sebagian dinding pemikul runtuh/retak tembus (30-50%), kolom praktis mengalami retak diagonal geser namun belum patah total, rangka kuda-kuda atap miring atau melorot.</p>
            <p><strong>Status Huni:</strong> Tidak layak huni sampai dilakukan perkuatan.</p>
            <p><strong>Metode Pemulihan:</strong> Retrofitting perkuatan struktur (pemberian kawat ferosemen, suntik spesi semen grout, penggantian batang rangka atap).</p>
          </div>
        </div>

        {/* Rusak Berat */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-red-200 dark:border-red-800/60 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-wider">
              Rusak Berat (RB)
            </span>
            <span className="text-xs font-mono-numbers px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-bold">
              &gt; 65%
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono-numbers">
            Plafon Stimulan: Rp 60.000.000
          </p>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
            <p><strong>Ciri Kerusakan:</strong> Keruntuhan struktur utama (kolom patah geser total, sloof putus akibat deformasi patahan tanah, dinding roboh &gt;60%, rangka atap jatuh ke lantai).</p>
            <p><strong>Status Huni:</strong> TIDAK LAYAK HUNI (Bahaya runtuh total).</p>
            <p><strong>Metode Pemulihan:</strong> Rekonstruksi total pembangunan kembali rumah tahan gempa (RISHA/RUSPIN) atau Relokasi Kawasan Hunian Tetap (Huntap) jika berada pada zona bahaya merah.</p>
          </div>
        </div>
      </div>

      {/* Alur Standar Penanganan Perumahan Korban Bencana */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
          Alur Tata Kelola Penyaluran Bantuan Stimulan Rumah (Rehab-Rekon)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 font-mono-numbers">Tahap 01</span>
            <p className="font-semibold text-slate-900 dark:text-slate-100">Kajian Cepat &amp; Verifikasi (TRC)</p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Inspeksi visual 6 elemen struktur, pendataan NIK/KK, dan penerbitan Berita Acara Verifikasi Lapangan (BAVL).
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 font-mono-numbers">Tahap 02</span>
            <p className="font-semibold text-slate-900 dark:text-slate-100">Penetapan SK Kepala Daerah</p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Penyusunan Surat Keputusan (SK) Bupati/Walikota tentang Daftar Penerima Bantuan Stimulan Rumah Korban Bencana.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 font-mono-numbers">Tahap 03</span>
            <p className="font-semibold text-slate-900 dark:text-slate-100">Penyaluran Bertahap (Bank)</p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Pencairan rekening buku tabungan: Tahap 1 (50% pembelian material awal) dan Tahap 2 (50% setelah progres fisik mencapai 50%).
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 font-mono-numbers">Tahap 04</span>
            <p className="font-semibold text-slate-900 dark:text-slate-100">PHO &amp; Serah Terima</p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Pemeriksaan akhir kelayakan rumah tahan gempa oleh Fasilitator Disperkim dan serah terima hunian kembali ke warga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
