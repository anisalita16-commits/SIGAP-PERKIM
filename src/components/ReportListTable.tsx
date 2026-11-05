import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Building,
  UserCheck
} from 'lucide-react';
import { HouseDamageReport, DamageLevel, AidDisbursementStatus } from '../types/disaster';

interface ReportListTableProps {
  reports: HouseDamageReport[];
  onSelectReport: (report: HouseDamageReport) => void;
  onOpenPrintModal: (report: HouseDamageReport) => void;
  onUpdateStatus: (id: string, status: AidDisbursementStatus) => void;
  onDeleteReport: (id: string) => void;
  onOpenNewAssessment: () => void;
}

export const ReportListTable: React.FC<ReportListTableProps> = ({
  reports,
  onSelectReport,
  onOpenPrintModal,
  onUpdateStatus,
  onDeleteReport,
  onOpenNewAssessment
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [filterDisaster, setFilterDisaster] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'budget'>('date');

  // Filter logic
  const filteredReports = reports.filter((r) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      r.residentName.toLowerCase().includes(term) ||
      r.nik.includes(term) ||
      r.caseNumber.toLowerCase().includes(term) ||
      r.address.village.toLowerCase().includes(term) ||
      r.address.district.toLowerCase().includes(term);

    const matchesLevel = filterLevel === 'ALL' || r.damageLevel === filterLevel;
    const matchesDisaster = filterDisaster === 'ALL' || r.disasterType === filterDisaster;
    const matchesStatus = filterStatus === 'ALL' || r.disbursementStatus === filterStatus;

    return matchesSearch && matchesLevel && matchesDisaster && matchesStatus;
  });

  // Sort logic
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === 'score') {
      return b.damageScorePercentage - a.damageScorePercentage;
    }
    if (sortBy === 'budget') {
      return (b.estimatedBudgetIDR || 0) - (a.estimatedBudgetIDR || 0);
    }
    return new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime();
  });

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'No Registrasi',
      'Nama Kepala Keluarga',
      'NIK',
      'No KK',
      'Desa/Kelurahan',
      'Kecamatan',
      'Kabupaten',
      'Kejadian Bencana',
      'Jenis Rumah',
      'Tingkat Kerusakan',
      'Skor Kerusakan (%)',
      'Status Kelaikan Huni',
      'Alokasi Bantuan Stimulan',
      'Status Penyaluran',
      'Verifikator',
      'Tanggal Verifikasi'
    ];

    const rows = sortedReports.map((r) => [
      `"${r.caseNumber}"`,
      `"${r.residentName}"`,
      `'${r.nik}`,
      `'${r.kkNumber}`,
      `"${r.address.village}"`,
      `"${r.address.district}"`,
      `"${r.address.regency}"`,
      `"${r.disasterType}"`,
      `"${r.houseType}"`,
      `"${r.damageLevel}"`,
      r.damageScorePercentage,
      r.isHabitable ? 'Layak Huni' : 'Tidak Layak Huni',
      r.estimatedBudgetIDR,
      `"${r.disbursementStatus}"`,
      `"${r.assessorName}"`,
      r.verifiedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIGAP_PERKIM_KONAWE_Laporan_Bencana_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusOptions: AidDisbursementStatus[] = [
    'Terdata',
    'Verifikasi Teknis',
    'SK Bupati/Walikota',
    'Penyaluran Tahap 1',
    'Pembangunan Fisik',
    'Penyaluran Tahap 2',
    'Selesai PHO'
  ];

  return (
    <div className="space-y-4">
      {/* Top Header & Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Daftar Verifikasi Rumah Korban Bencana
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Basis data penetapan calon penerima Bantuan Stimulan Perumahan Swadaya (BSPS / Rekon-Pascabencana)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Data CSV</span>
          </button>
          <button
            onClick={onOpenNewAssessment}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <span>+ Tambah Data</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama warga, NIK, No. Registrasi, atau desa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
            />
          </div>

          {/* Level Filter */}
          <div className="md:col-span-2">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
            >
              <option value="ALL">Semua Kerusakan</option>
              <option value="Rusak Berat">Rusak Berat (RB)</option>
              <option value="Rusak Sedang">Rusak Sedang (RS)</option>
              <option value="Rusak Ringan">Rusak Ringan (RR)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
            >
              <option value="ALL">Semua Status Penyaluran</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
            >
              <option value="date">Urut: Tanggal Terbaru</option>
              <option value="score">Urut: Kerusakan Terberat</option>
              <option value="budget">Urut: Anggaran Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Filter Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">Filter Cepat:</span>
          <button
            onClick={() => { setFilterLevel('ALL'); setFilterStatus('ALL'); }}
            className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
              filterLevel === 'ALL' && filterStatus === 'ALL'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Semua ({reports.length})
          </button>
          <button
            onClick={() => setFilterLevel('Rusak Berat')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
              filterLevel === 'Rusak Berat'
                ? 'bg-red-600 text-white'
                : 'text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
            }`}
          >
            Rusak Berat ({reports.filter((r) => r.damageLevel === 'Rusak Berat').length})
          </button>
          <button
            onClick={() => setFilterLevel('Rusak Sedang')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
              filterLevel === 'Rusak Sedang'
                ? 'bg-amber-500 text-white'
                : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
            }`}
          >
            Rusak Sedang ({reports.filter((r) => r.damageLevel === 'Rusak Sedang').length})
          </button>
          <button
            onClick={() => setFilterLevel('Rusak Ringan')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
              filterLevel === 'Rusak Ringan'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
            }`}
          >
            Rusak Ringan ({reports.filter((r) => r.damageLevel === 'Rusak Ringan').length})
          </button>
          <button
            onClick={() => setFilterStatus('Penyaluran Tahap 1')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
              filterStatus === 'Penyaluran Tahap 1'
                ? 'bg-blue-600 text-white'
                : 'text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
            }`}
          >
            Tahap 1 Cair ({reports.filter((r) => r.disbursementStatus === 'Penyaluran Tahap 1').length})
          </button>
          <button
            onClick={() => setFilterStatus('Selesai PHO')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
              filterStatus === 'Selesai PHO'
                ? 'bg-emerald-800 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Selesai PHO ({reports.filter((r) => r.disbursementStatus === 'Selesai PHO').length})
          </button>
        </div>
      </div>

      {/* Main High-Density Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="px-3.5 py-3">No. Registrasi</th>
                <th className="px-3.5 py-3">Nama KK &amp; NIK</th>
                <th className="px-3.5 py-3">Lokasi Administrasi</th>
                <th className="px-3.5 py-3">Klasifikasi</th>
                <th className="px-3.5 py-3 text-right">Plafon Stimulan</th>
                <th className="px-3.5 py-3">Status Tahapan</th>
                <th className="px-3.5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {sortedReports.length > 0 ? (
                sortedReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-3.5 py-3">
                      <span className="font-mono-numbers font-semibold text-slate-900 dark:text-slate-100 block">
                        {report.caseNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono-numbers">
                        {report.verifiedAt} · {report.disasterType}
                      </span>
                    </td>
                    <td className="px-3.5 py-3">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">
                        {report.residentName}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-numbers">
                        NIK: {report.nik} ({report.familyMembers} Jiwa)
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-slate-700 dark:text-slate-300">
                      <span className="block font-medium">{report.address.village}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Kec. {report.address.district}, {report.address.rtRw}
                      </span>
                    </td>
                    <td className="px-3.5 py-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            report.damageLevel === 'Rusak Berat'
                              ? 'bg-red-600'
                              : report.damageLevel === 'Rusak Sedang'
                              ? 'bg-amber-500'
                              : 'bg-emerald-600'
                          }`}
                        />
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {report.damageLevel}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-numbers">
                          ({report.damageScorePercentage}%)
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {report.isHabitable ? 'Layak Huni' : 'Tidak Layak Huni'}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right font-mono-numbers font-bold text-slate-900 dark:text-slate-100">
                      {formatIDR(report.estimatedBudgetIDR)}
                    </td>
                    <td className="px-3.5 py-3">
                      <select
                        value={report.disbursementStatus}
                        onChange={(e) => onUpdateStatus(report.id, e.target.value as AidDisbursementStatus)}
                        className="text-[11px] py-1 px-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600 cursor-pointer"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3.5 py-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => onSelectReport(report)}
                        title="Lihat Detail Berkas"
                        className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenPrintModal(report)}
                        title="Cetak Berita Acara Verifikasi (BAVL)"
                        className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteReport(report.id)}
                        title="Hapus Data"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 dark:text-slate-400">
                    Tidak ada data verifikasi rumah yang cocok dengan filter atau kata kunci.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Menampilkan <strong className="font-mono-numbers">{sortedReports.length}</strong> dari <strong className="font-mono-numbers">{reports.length}</strong> data rumah terdampak</span>
          <span className="font-mono-numbers text-[11px]">DISPERKIM KAB. KONAWE · DATABASE TRC BENCANA</span>
        </div>
      </div>
    </div>
  );
};
