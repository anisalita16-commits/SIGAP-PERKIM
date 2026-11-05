import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { HouseDamageReport } from '../types/disaster';
import { DISPERKIM_CONFIG } from '../data/mockData';

interface OfficialReportPrintModalProps {
  report: HouseDamageReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialReportPrintModal: React.FC<OfficialReportPrintModalProps> = ({
  report,
  isOpen,
  onClose
}) => {
  if (!isOpen || !report) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-xl max-w-4xl w-full my-6 shadow-2xl flex flex-col border border-slate-300">
        {/* Modal Controls (Hidden in Print) */}
        <div className="no-print p-4 border-b border-slate-200 flex items-center justify-between bg-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Pratinjau Dokumen Berita Acara Verifikasi Lapangan (BAVL)
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-mono-numbers text-emerald-700 font-semibold">
              {report.caseNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Berkas (A4)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet (Standard Indonesian Kedinasan Format) */}
        <div className="p-8 sm:p-12 font-serif text-slate-900 leading-normal space-y-6 bg-white">
          {/* Kop Surat Dinas Resmi (Format Dual Logo Kedinasan) */}
          <div className="border-b-2 border-double border-slate-900 pb-4 text-center relative flex items-center justify-between gap-4">
            {/* Logo 1: Lambang Daerah Kabupaten Konawe */}
            <div className="flex flex-col items-center shrink-0">
              <img
                src="/assets/aistudio/Logo-Kabupaten-Konawe-Warna_c866335c.jpg"
                alt="Lambang Daerah Kabupaten Konawe"
                referrerPolicy="no-referrer"
                className="w-20 h-20 object-contain"
              />
              <span className="text-[8px] font-sans font-bold uppercase text-slate-600 mt-0.5">Pemkab Konawe</span>
            </div>

            {/* Teks Kop Kedinasan */}
            <div className="flex-1 px-2 text-center">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 font-sans">
                PEMERINTAH {DISPERKIM_CONFIG.regencyName}
              </h4>
              <h2 className="text-base sm:text-lg font-black uppercase text-slate-900 font-sans tracking-wide">
                {DISPERKIM_CONFIG.officeName}
              </h2>
              <p className="text-xs font-bold uppercase text-slate-700 font-sans">
                {DISPERKIM_CONFIG.divisionName}
              </p>
              <p className="text-[10px] text-slate-600 font-sans mt-0.5">
                {DISPERKIM_CONFIG.officeAddress} · {DISPERKIM_CONFIG.officeContact}
              </p>
            </div>

            {/* Logo 2: Logo Resmi Kementerian Perumahan dan Kawasan Permukiman RI */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-20 h-20 bg-slate-950 rounded-lg p-1 flex items-center justify-center border border-amber-500/40 shadow-xs">
                <img
                  src="/assets/aistudio/Logo_Kementerian_Perumahan_dan_Kawasan_Permukiman_RI__2025___logo_only_.svg_05cb77c7.webp"
                  alt="Logo Kementerian Perumahan dan Kawasan Permukiman RI"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[8px] font-sans font-bold uppercase text-slate-600 mt-0.5">Kementerian PKP</span>
            </div>
          </div>

          {/* Title & Document Number */}
          <div className="text-center space-y-1">
            <h3 className="text-sm sm:text-base font-bold uppercase underline tracking-wider font-sans">
              BERITA ACARA VERIFIKASI LAPANGAN KERUSAKAN RUMAH PASCABENCANA
            </h3>
            <p className="text-xs font-mono-numbers text-slate-700">
              Nomor: BAVL/400.12/DISPERKIM/2026/{report.id.replace('REP-', '')}
            </p>
          </div>

          {/* Opening Narrative */}
          <p className="text-xs text-justify leading-relaxed font-sans">
            Pada hari ini, tanggal <strong>{new Date(report.verifiedAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>, bertempat di lokasi terdampak, Tim Verifikator Teknis Dinas Perumahan dan Kawasan Permukiman bersama perangkat desa telah melaksanakan uji kelaikan fisik bangunan rumah tinggal yang terdampak bencana <strong>{report.disasterEvent}</strong> ({report.disasterType}), dengan hasil verifikasi sebagai berikut:
          </p>

          {/* Identitas Penerima Table */}
          <div className="space-y-1.5 font-sans">
            <h4 className="text-xs font-bold uppercase text-slate-800">
              I. IDENTITAS KEPALA KELUARGA &amp; LOKASI
            </h4>
            <table className="w-full text-xs border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="w-1/3 p-2 bg-slate-50 font-semibold">Nama Kepala Keluarga</td>
                  <td className="p-2 font-bold">{report.residentName}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 bg-slate-50 font-semibold">Nomor Induk Kependudukan (NIK)</td>
                  <td className="p-2 font-mono-numbers">{report.nik}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 bg-slate-50 font-semibold">Alamat Lengkap Rumah</td>
                  <td className="p-2">
                    {report.address.rtRw}, Desa/Kelurahan {report.address.village}, Kecamatan {report.address.district}, {report.address.regency}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 bg-slate-50 font-semibold">Koordinat Geografis (GPS)</td>
                  <td className="p-2 font-mono-numbers">
                    Lat: {report.address.coordinates.lat}, Lng: {report.address.coordinates.lng}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 bg-slate-50 font-semibold">Legalitas Kepemilikan Tanah</td>
                  <td className="p-2">{report.landTenureStatus}</td>
                </tr>
                <tr>
                  <td className="p-2 bg-slate-50 font-semibold">Tipe &amp; Luas Bangunan</td>
                  <td className="p-2">{report.houseType} (± {report.buildingAreaM2} m²)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Hasil Pengujian Struktur 6 Elemen PUPR */}
          <div className="space-y-1.5 font-sans">
            <h4 className="text-xs font-bold uppercase text-slate-800">
              II. HASIL PENILAIAN 6 ELEMEN FISIK (PERMEN PUPR NO. 29/2018)
            </h4>
            <table className="w-full text-xs border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300 text-slate-800">
                <tr>
                  <th className="p-2 text-left w-12">No</th>
                  <th className="p-2 text-left">Elemen Komponen Bangunan</th>
                  <th className="p-2 text-left">Kondisi Kerusakan Fisik Teramati</th>
                  <th className="p-2 text-center w-24">Status Keamanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 text-center">1</td>
                  <td className="p-2 font-medium">Pondasi &amp; Sloof Beton</td>
                  <td className="p-2">{report.structuralAssessment.foundation}</td>
                  <td className="p-2 text-center font-semibold">
                    {report.structuralAssessment.foundation.includes('Utuh') ? 'Aman' : 'Gagal'}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-center">2</td>
                  <td className="p-2 font-medium">Kolom Praktis &amp; Ring Balok</td>
                  <td className="p-2">{report.structuralAssessment.columnsBeams}</td>
                  <td className="p-2 text-center font-semibold">
                    {report.structuralAssessment.columnsBeams.includes('Aman') ? 'Aman' : 'Kritis'}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-center">3</td>
                  <td className="p-2 font-medium">Dinding Pasangan Bata / Pengisi</td>
                  <td className="p-2">{report.structuralAssessment.walls}</td>
                  <td className="p-2 text-center font-semibold">Terpengaruh</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">4</td>
                  <td className="p-2 font-medium">Rangka Atap / Kuda-kuda</td>
                  <td className="p-2">{report.structuralAssessment.roofFrame}</td>
                  <td className="p-2 text-center font-semibold">
                    {report.structuralAssessment.roofFrame.includes('Kokoh') ? 'Aman' : 'Deformasi'}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-center">5</td>
                  <td className="p-2 font-medium">Penutup Atap (Genteng/Seng)</td>
                  <td className="p-2">{report.structuralAssessment.roofCovering}</td>
                  <td className="p-2 text-center font-semibold">Terpengaruh</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">6</td>
                  <td className="p-2 font-medium">Utilitas Sanitasi &amp; Air Bersih</td>
                  <td className="p-2">{report.structuralAssessment.sanitationWater}</td>
                  <td className="p-2 text-center font-semibold">
                    {report.structuralAssessment.sanitationWater.includes('Normal') ? 'Berfungsi' : 'Terganggu'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Kesimpulan & Penetapan Stimulan */}
          <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans space-y-1 text-xs">
            <h4 className="font-bold uppercase text-slate-900">
              III. KESIMPULAN VERIFIKASI &amp; PENETAPAN STIMULAN
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <p>Klasifikasi Kerusakan: <strong className="uppercase">{report.damageLevel} ({report.damageScorePercentage}%)</strong></p>
                <p>Status Kelayakan Hunian: <strong>{report.isHabitable ? 'Layak Huni Sementara' : 'TIDAK LAYAK HUNI'}</strong></p>
              </div>
              <div className="text-right">
                <p>Skema Bantuan: <strong>{report.aidScheme}</strong></p>
                <p>Estimasi Alokasi Stimulan: <strong className="font-mono-numbers">{formatIDR(report.estimatedBudgetIDR)}</strong></p>
              </div>
            </div>
            {report.notes && (
              <p className="pt-1 text-[11px] text-slate-600 border-t border-slate-200 mt-1">
                Catatan Lapangan: {report.notes}
              </p>
            )}
          </div>

          {/* Tanda Tangan Para Pihak (4 Kolom Kedinasan) */}
          <div className="pt-4 font-sans text-xs">
            <p className="text-right text-[11px] mb-4">
              {report.address.regency}, {report.verifiedAt}
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-semibold text-slate-700">Kepala Keluarga Terdampak,</p>
                <div className="h-16 flex items-end justify-center">
                  <span className="text-[10px] text-slate-400 italic">(Tanda Tangan &amp; Materai)</span>
                </div>
                <p className="font-bold underline uppercase">{report.residentName}</p>
                <p className="text-[10px] text-slate-500 font-mono-numbers">NIK: {report.nik}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-700">Kepala Desa / Lurah Setempat,</p>
                <div className="h-16 flex items-end justify-center">
                  <span className="text-[10px] text-slate-400 italic">(Cap Stempel &amp; TTD)</span>
                </div>
                <p className="font-bold underline uppercase">H. BASRUN SAMBO, S.Sos.</p>
                <p className="text-[10px] text-slate-500">Kepala Desa / Lurah {report.address.village}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-700">Verifikator Teknis DISPERKIM,</p>
                <div className="h-16 flex items-end justify-center">
                  <span className="text-[10px] text-emerald-700 font-bold font-mono-numbers">TERVERIFIKASI SISTEM</span>
                </div>
                <p className="font-bold underline uppercase">{report.assessorName}</p>
                <p className="text-[10px] text-slate-500 font-mono-numbers">NIP. {report.assessorNip}</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="font-semibold text-slate-700">Mengetahui &amp; Menyetujui,</p>
              <p className="text-[11px] font-bold text-slate-800">
                Pejabat Pembuat Komitmen (PPK) Rehabilitasi Pascabencana DISPERKIM
              </p>
              <div className="h-16 flex items-end justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan Elektronik Kedinasan)</span>
              </div>
              <p className="font-bold underline uppercase">{DISPERKIM_CONFIG.technicalChief.name}</p>
              <p className="text-[10px] text-slate-500 font-mono-numbers">NIP. {DISPERKIM_CONFIG.technicalChief.nip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
