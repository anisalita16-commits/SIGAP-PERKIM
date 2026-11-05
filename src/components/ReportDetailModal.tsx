import React from 'react';
import {
  X,
  Printer,
  Building,
  User,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  FileText,
  DollarSign,
  Users
} from 'lucide-react';
import { HouseDamageReport } from '../types/disaster';

interface ReportDetailModalProps {
  report: HouseDamageReport | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPrintModal: (report: HouseDamageReport) => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  isOpen,
  onClose,
  onOpenPrintModal
}) => {
  if (!isOpen || !report) return null;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full my-6 flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Berkas Hasil Uji Verifikasi Kerusakan Perumahan
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {report.residentName}
              </h3>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono-numbers text-emerald-800 dark:text-emerald-400 font-semibold">
                {report.caseNumber}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Top Status & Summary Banner */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Klasifikasi Tingkat Kerusakan
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`text-lg font-black ${
                    report.damageLevel === 'Rusak Berat'
                      ? 'text-red-600'
                      : report.damageLevel === 'Rusak Sedang'
                      ? 'text-amber-500'
                      : 'text-emerald-700'
                  }`}
                >
                  {report.damageLevel}
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-mono-numbers font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-2xs">
                  {report.damageScorePercentage}% Kerusakan Fisik
                </span>
              </div>
              <span className="text-slate-600 dark:text-slate-400 mt-1 block">
                Status Huni: <strong>{report.isHabitable ? 'Layak Huni Sementara' : 'TIDAK LAYAK HUNI (Wajib Tenda/Huntara)'}</strong>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Alokasi Bantuan Stimulan
              </span>
              <p className="text-base font-extrabold text-emerald-800 dark:text-emerald-400 font-mono-numbers">
                {formatIDR(report.estimatedBudgetIDR)}
              </p>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Status: {report.disbursementStatus}
              </span>
            </div>
          </div>

          {/* Demographic & Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Kependudukan &amp; Kerentanan</span>
              </h4>
              <div className="space-y-1 text-slate-600 dark:text-slate-300">
                <p>Nama KK: <strong>{report.residentName}</strong></p>
                <p>NIK: <span className="font-mono-numbers">{report.nik}</span></p>
                <p>No. KK: <span className="font-mono-numbers">{report.kkNumber}</span></p>
                <p>Telepon: <span className="font-mono-numbers">{report.phone}</span></p>
                <p>Jumlah Jiwa: <span className="font-mono-numbers">{report.familyMembers}</span> Orang</p>
                <p className="text-[11px] text-slate-500">
                  Kelompok Rentan: {report.vulnerableMembers.elderly} Lansia, {report.vulnerableMembers.infants} Balita, {report.vulnerableMembers.disabled} Disabilitas
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Lokasi &amp; Karakteristik Tanah</span>
              </h4>
              <div className="space-y-1 text-slate-600 dark:text-slate-300">
                <p>Desa/Kelurahan: <strong>{report.address.village}</strong></p>
                <p>Kecamatan: {report.address.district}</p>
                <p>Alamat: {report.address.rtRw}, {report.address.regency}</p>
                <p>Koordinat: <span className="font-mono-numbers">Lat {report.address.coordinates.lat}, Lng {report.address.coordinates.lng}</span></p>
                <p>Kepemilikan Tanah: <strong>{report.landTenureStatus}</strong></p>
                <p>Tipe Bangunan: {report.houseType} (±{report.buildingAreaM2} m²)</p>
              </div>
            </div>
          </div>

          {/* Structural Assessment Detail */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide text-[11px]">
              Rincian Penilaian 6 Elemen Struktur (Permen PUPR)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">1. Pondasi &amp; Sloof</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.structuralAssessment.foundation}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">2. Kolom &amp; Balok</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.structuralAssessment.columnsBeams}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">3. Dinding Pasangan</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.structuralAssessment.walls}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">4. Rangka Kuda-Kuda</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.structuralAssessment.roofFrame}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">5. Penutup Genteng</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.structuralAssessment.roofCovering}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">6. Sanitasi &amp; Air</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.structuralAssessment.sanitationWater}</span>
              </div>
            </div>
          </div>

          {/* Photos */}
          {report.photos?.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide text-[11px]">
                Dokumentasi Visual Lapangan
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {report.photos.map((p, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 h-40 bg-slate-100">
                    <img
                      src={p}
                      alt="Dokumentasi Kerusakan"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verifier Notes */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px] block">
              Catatan &amp; Pengesahan Tim Teknis:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {report.notes}
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-[11px] text-slate-500">
              <span>Verifikator: <strong>{report.assessorName}</strong> (NIP: {report.assessorNip})</span>
              <span>Tanggal: {report.verifiedAt}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2 bg-slate-50/50 dark:bg-slate-800/40">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={() => onOpenPrintModal(report)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Berita Acara (BAVL)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
