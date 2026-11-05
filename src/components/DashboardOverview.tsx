import React from 'react';
import {
  Building2,
  Home,
  AlertTriangle,
  CheckCircle,
  FileText,
  DollarSign,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import { HouseDamageReport } from '../types/disaster';
import { DisasterGisMap } from './DisasterGisMap';

interface DashboardOverviewProps {
  reports: HouseDamageReport[];
  onSelectReport: (report: HouseDamageReport) => void;
  onOpenNewAssessment: () => void;
  onOpenPrintModal: (report: HouseDamageReport) => void;
  onNavigateToTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  reports,
  onSelectReport,
  onOpenNewAssessment,
  onOpenPrintModal,
  onNavigateToTab
}) => {
  // Statistics calculations
  const totalReports = reports.length;
  const heavyDamage = reports.filter((r) => r.damageLevel === 'Rusak Berat').length;
  const mediumDamage = reports.filter((r) => r.damageLevel === 'Rusak Sedang').length;
  const lightDamage = reports.filter((r) => r.damageLevel === 'Rusak Ringan').length;
  const totalBudget = reports.reduce((acc, curr) => acc + (curr.estimatedBudgetIDR || 0), 0);
  const totalSouls = reports.reduce((acc, curr) => acc + (curr.familyMembers || 0), 0);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Hero Split with Inspection Photography */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white min-h-[260px] flex flex-col justify-end">
        {/* Background Image with Scrim */}
        <img
          src="/src/assets/images/housing_inspection_hero_1793774449559.jpg"
          alt="Inspeksi Teknis Kerusakan Rumah Pascabencana"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/20 w-fit">
              <img
                src="/assets/aistudio/Logo-Kabupaten-Konawe-Warna_c866335c.jpg"
                alt="Lambang Daerah Kabupaten Konawe"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded object-contain bg-white p-0.5 shadow-2xs"
              />
              <img
                src="/assets/aistudio/Logo_Kementerian_Perumahan_dan_Kawasan_Permukiman_RI__2025___logo_only_.svg_05cb77c7.webp"
                alt="Logo Kementerian Perumahan dan Kawasan Permukiman RI"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded object-contain bg-slate-950 p-0.5 shadow-2xs border border-amber-500/40"
              />
              <span className="text-[11px] font-bold text-emerald-300">
                PEMKAB KONAWE · KEMENTERIAN PKP / DISPERKIM
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="uppercase tracking-wider">Pusat Kendali Operasi Perumahan Pascabencana Kab. Konawe</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">DAS Konaweha, Sesar Lawanopo &amp; Sultra</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white text-balance">
              Sistem Tanggap Bencana &amp; Pemulihan Perumahan Kabupaten Konawe
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Portal operasional Dinas Perumahan dan Kawasan Permukiman (DISPERKIM) Kabupaten Konawe dalam verifikasi teknis kerusakan, penanganan rumah terdampak banjir luapan DAS Konaweha, longsor Asinua, perkuatan struktur, dan percepatan stimulan perumahan.
            </p>
          </div>

          {/* Primary Quick CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateToTab('reports')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Data Verifikasi Rumah</span>
            </button>
            <button
              onClick={onOpenNewAssessment}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Input Data Asesmen</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Column KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Rumah Terdata</span>
            <Building2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono-numbers">
              {totalReports}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono-numbers">
              KK ({totalSouls} Jiwa)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Terverifikasi 100% oleh Verifikator Teknis
          </p>
        </div>

        {/* Metric 2: Rusak Berat */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Rusak Berat (RB)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-600 dark:text-red-400 font-mono-numbers">
              {heavyDamage}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono-numbers">
              Unit ({totalReports ? ((heavyDamage / totalReports) * 100).toFixed(0) : 0}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Prioritas Huntap / Bangun Baru Rp 60 Jt
          </p>
        </div>

        {/* Metric 3: Rusak Sedang */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Rusak Sedang (RS)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono-numbers">
              {mediumDamage}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono-numbers">
              Unit ({totalReports ? ((mediumDamage / totalReports) * 100).toFixed(0) : 0}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Perbaikan Struktur &amp; Retrofitting Rp 30 Jt
          </p>
        </div>

        {/* Metric 4: Total Anggaran Stimulan */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Estimasi Bantuan Stimulan</span>
            <DollarSign className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 font-mono-numbers">
              {(totalBudget / 1000000).toFixed(0)} Jt
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Total RAB
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
            {formatIDR(totalBudget)}
          </p>
        </div>
      </div>

      {/* Interactive GIS Disaster Map */}
      <DisasterGisMap reports={reports} onSelectReport={onSelectReport} />

      {/* Recent Field Assessments Table Snippet */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Laporan Verifikasi Kerusakan Perumahan Terbaru
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Data hasil kajian uji kelaikan struktur oleh verifikator lapangan
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('reports')}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <span>Buka Semua Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">No. Registrasi / Tanggal</th>
                <th className="px-4 py-3 font-semibold">Nama Kepala Keluarga</th>
                <th className="px-4 py-3 font-semibold">Lokasi / Desa</th>
                <th className="px-4 py-3 font-semibold">Bencana</th>
                <th className="px-4 py-3 font-semibold">Tingkat Kerusakan</th>
                <th className="px-4 py-3 font-semibold text-right">Estimasi Bantuan</th>
                <th className="px-4 py-3 font-semibold text-center">Status Pemulihan</th>
                <th className="px-4 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {reports.slice(0, 5).map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-200">
                    <span className="font-mono-numbers font-medium block">{r.caseNumber}</span>
                    <span className="text-[11px] text-slate-400 font-mono-numbers">{r.verifiedAt}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 block">{r.residentName}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-numbers">NIK: {r.nik}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    <span>{r.address.village}</span>
                    <span className="text-[11px] text-slate-400 block">Kec. {r.address.district}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    <span>{r.disasterType}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          r.damageLevel === 'Rusak Berat'
                            ? 'bg-red-600'
                            : r.damageLevel === 'Rusak Sedang'
                            ? 'bg-amber-500'
                            : 'bg-emerald-600'
                        }`}
                      />
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {r.damageLevel} ({r.damageScorePercentage}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono-numbers font-medium text-slate-800 dark:text-slate-200">
                    {formatIDR(r.estimatedBudgetIDR)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {r.disbursementStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => onSelectReport(r)}
                      className="text-xs text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 font-semibold cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => onOpenPrintModal(r)}
                      className="text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                    >
                      Cetak BAVL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
