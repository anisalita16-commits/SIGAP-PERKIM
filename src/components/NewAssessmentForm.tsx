import React, { useState } from 'react';
import {
  Save,
  MapPin,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Building,
  User,
  Shield,
  FileCheck,
  Calculator,
  ArrowLeft
} from 'lucide-react';
import {
  HouseDamageReport,
  DisasterType,
  DamageLevel,
  StructuralAssessment,
  AidDisbursementStatus
} from '../types/disaster';
import { DISPERKIM_CONFIG } from '../data/mockData';

interface NewAssessmentFormProps {
  onSaveReport: (report: HouseDamageReport) => void;
  onCancel: () => void;
  prefillData?: Partial<HouseDamageReport>;
}

export const NewAssessmentForm: React.FC<NewAssessmentFormProps> = ({
  onSaveReport,
  onCancel,
  prefillData
}) => {
  // Personal Info
  const [residentName, setResidentName] = useState(prefillData?.residentName || '');
  const [nik, setNik] = useState(prefillData?.nik || '');
  const [kkNumber, setKkNumber] = useState(prefillData?.kkNumber || '');
  const [phone, setPhone] = useState(prefillData?.phone || '');

  // Address
  const [regency, setRegency] = useState(prefillData?.address?.regency || 'Kabupaten Konawe');
  const [district, setDistrict] = useState(prefillData?.address?.district || 'Unaaha');
  const [village, setVillage] = useState(prefillData?.address?.village || 'Kelurahan Tuoy');
  const [rtRw, setRtRw] = useState(prefillData?.address?.rtRw || 'RT 02 / RW 01');
  const [lat, setLat] = useState<number>(prefillData?.address?.coordinates?.lat || -3.9682);
  const [lng, setLng] = useState<number>(prefillData?.address?.coordinates?.lng || 122.0624);

  // Disaster event
  const [disasterType, setDisasterType] = useState<DisasterType>(prefillData?.disasterType || 'Banjir Bandang');
  const [disasterEvent, setDisasterEvent] = useState(prefillData?.disasterEvent || 'Banjir Luapan Sungai Konaweha (DAS Konaweha)');
  const [disasterDate, setDisasterDate] = useState(prefillData?.disasterDate || '2026-02-18');

  // House characteristics
  const [houseType, setHouseType] = useState<'Rumah Tembok Permanen' | 'Rumah Semi Permanen' | 'Rumah Panggung Kayu'>(
    prefillData?.houseType || 'Rumah Tembok Permanen'
  );
  const [buildingAreaM2, setBuildingAreaM2] = useState<number>(prefillData?.buildingAreaM2 || 48);
  const [landTenureStatus, setLandTenureStatus] = useState<any>(
    prefillData?.landTenureStatus || 'Sertifikat Hak Milik (SHM)'
  );

  // Structural Assessment (PUPR 6 Elements)
  const [foundation, setFoundation] = useState<StructuralAssessment['foundation']>(
    prefillData?.structuralAssessment?.foundation || 'Utuh / Kokoh'
  );
  const [columnsBeams, setColumnsBeams] = useState<StructuralAssessment['columnsBeams']>(
    prefillData?.structuralAssessment?.columnsBeams || 'Aman / Utuh'
  );
  const [walls, setWalls] = useState<StructuralAssessment['walls']>(
    prefillData?.structuralAssessment?.walls || 'Retak Rambut (<2mm)'
  );
  const [roofFrame, setRoofFrame] = useState<StructuralAssessment['roofFrame']>(
    prefillData?.structuralAssessment?.roofFrame || 'Kokoh / Normal'
  );
  const [roofCovering, setRoofCovering] = useState<StructuralAssessment['roofCovering']>(
    prefillData?.structuralAssessment?.roofCovering || 'Aman'
  );
  const [sanitationWater, setSanitationWater] = useState<StructuralAssessment['sanitationWater']>(
    prefillData?.structuralAssessment?.sanitationWater || 'Berfungsi Normal'
  );

  const [notes, setNotes] = useState(prefillData?.notes || '');
  const [photoUrl, setPhotoUrl] = useState(
    prefillData?.photos?.[0] ||
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
  );

  // Calculate score based on PUPR weighted elements
  const calculateDamageMetrics = () => {
    let score = 0;

    // Foundation (Weight 15%)
    if (foundation === 'Amblas / Patah Parah') score += 15;
    else if (foundation === 'Retak Sebagian') score += 8;

    // Columns & Beams (Weight 25% - critical)
    if (columnsBeams === 'Patah / Runtuh Total') score += 25;
    else if (columnsBeams === 'Retak Struktur Sebagian') score += 14;

    // Walls (Weight 20%)
    if (walls === 'Roboh Total (>60%)') score += 20;
    else if (walls === 'Retak Tembus / Runtuh 30-50%') score += 10;
    else if (walls === 'Retak Rambut (<2mm)') score += 4;

    // Roof Frame (Weight 20%)
    if (roofFrame === 'Runtuh Total') score += 20;
    else if (roofFrame === 'Miring / Sebagian Rusak') score += 10;

    // Roof Covering (Weight 10%)
    if (roofCovering === 'Hancur Seluruhnya') score += 10;
    else if (roofCovering === 'Lepas / Pecah Sebagian') score += 5;

    // Sanitation & Water (Weight 10%)
    if (sanitationWater === 'Rusak Total') score += 10;
    else if (sanitationWater === 'Terganggu Sebagian') score += 5;

    let level: DamageLevel = 'Rusak Ringan';
    let budget = 15000000;
    let scheme = 'Stimulan Rusak Ringan (Rp 15 Juta)';
    let habitable = true;

    if (score > 65 || columnsBeams === 'Patah / Runtuh Total' || foundation === 'Amblas / Patah Parah') {
      level = 'Rusak Berat';
      budget = 60000000;
      scheme = landTenureStatus === 'Zona Merah Bencana' ? 'Relokasi Huntap Terpadu' : 'Stimulan Rusak Berat (Rp 60 Juta)';
      habitable = false;
    } else if (score >= 30) {
      level = 'Rusak Sedang';
      budget = 30000000;
      scheme = 'Stimulan Rusak Sedang (Rp 30 Juta)';
      habitable = false;
    }

    return { score, level, budget, scheme, habitable };
  };

  const metrics = calculateDamageMetrics();

  // GPS auto-detect
  const handleDetectGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(Number(pos.coords.latitude.toFixed(6)));
          setLng(Number(pos.coords.longitude.toFixed(6)));
        },
        (err) => {
          alert('Tidak dapat mendeteksi koordinat GPS: ' + err.message);
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!residentName || !nik) {
      alert('Nama Kepala Keluarga dan NIK wajib diisi.');
      return;
    }

    const newReport: HouseDamageReport = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      caseNumber: `REG-PERKIM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      residentName,
      nik,
      kkNumber: kkNumber || nik,
      phone: phone || '0812-XXXX-XXXX',
      familyMembers: 1,
      vulnerableMembers: { elderly: 0, infants: 0, disabled: 0 },
      address: {
        regency,
        district,
        village,
        rtRw,
        coordinates: { lat, lng }
      },
      disasterEvent,
      disasterType,
      disasterDate,
      houseType,
      buildingAreaM2,
      landTenureStatus,
      structuralAssessment: {
        foundation,
        columnsBeams,
        walls,
        roofFrame,
        roofCovering,
        sanitationWater
      },
      damageLevel: metrics.level,
      damageScorePercentage: metrics.score,
      isHabitable: metrics.habitable,
      aidScheme: metrics.scheme,
      disbursementStatus: 'Verifikasi Teknis',
      photos: [photoUrl],
      notes: notes || 'Pemeriksaan lapangan terverifikasi oleh Tim Teknis Disperkim.',
      assessorName: DISPERKIM_CONFIG.technicalChief.name,
      assessorNip: DISPERKIM_CONFIG.technicalChief.nip,
      verifiedAt: new Date().toISOString().split('T')[0],
      estimatedBudgetIDR: metrics.budget,
      materialEstimates: [
        { item: 'Semen Portland (PC) 50kg', volume: metrics.level === 'Rusak Berat' ? '60' : metrics.level === 'Rusak Sedang' ? '30' : '12', unit: 'Sak', pricePerUnit: 78000, notes: 'Struktur spesi' },
        { item: 'Pasir Pasang', volume: metrics.level === 'Rusak Berat' ? '8' : '4', unit: 'M3', pricePerUnit: 260000, notes: 'Agregat' },
        { item: 'Besi Beton Ulir 10mm', volume: metrics.level === 'Rusak Berat' ? '28' : '10', unit: 'Batang', pricePerUnit: 92000, notes: 'Penulangan struktur' }
      ]
    };

    onSaveReport(newReport);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Ringkasan</span>
        </button>
        <div className="text-right">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Formulir Asesmen Lapangan TRC
          </span>
          <span className="text-xs text-emerald-800 dark:text-emerald-400 font-bold">
            Standar Instrumen PUPR / BNPB
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Identitas Korban */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <User className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>01. Identitas Kepala Keluarga &amp; Warga Terdampak</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap Kepala Keluarga *
              </label>
              <input
                type="text"
                required
                value={residentName}
                onChange={(e) => setResidentName(e.target.value)}
                placeholder="Contoh: Asep Saepuloh"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                NIK (16 Digit KTP) *
              </label>
              <input
                type="text"
                required
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="740201xxxxxxxxxx"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600 font-mono-numbers"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nomor Kartu Keluarga (KK)
              </label>
              <input
                type="text"
                maxLength={16}
                value={kkNumber}
                onChange={(e) => setKkNumber(e.target.value)}
                placeholder="740201xxxxxxxxxx"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600 font-mono-numbers"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                No. Telepon / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812-xxxx-xxxx"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600 font-mono-numbers"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Lokasi Geografis Administrasi */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <MapPin className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>02. Lokasi Geografis Bangunan &amp; Titik Koordinat</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kabupaten / Kota
              </label>
              <input
                type="text"
                value={regency}
                onChange={(e) => setRegency(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kecamatan
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Desa / Kelurahan
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                RT / RW / Dusun
              </label>
              <input
                type="text"
                value={rtRw}
                onChange={(e) => setRtRw(e.target.value)}
                placeholder="RT 02 / RW 04"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Latitude (Garis Lintang)
              </label>
              <input
                type="number"
                step="0.000001"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600 font-mono-numbers"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Longitude (Garis Bujur)
              </label>
              <input
                type="number"
                step="0.000001"
                value={lng}
                onChange={(e) => setLng(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600 font-mono-numbers"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleDetectGps}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Deteksi GPS Lapangan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Karakteristik Bangunan & Legalitas */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Building className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>03. Spesifikasi Bangunan &amp; Status Tanah</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tipe Konstruksi Rumah
              </label>
              <select
                value={houseType}
                onChange={(e) => setHouseType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
              >
                <option value="Rumah Tembok Permanen">Rumah Tembok Permanen</option>
                <option value="Rumah Semi Permanen">Rumah Semi Permanen</option>
                <option value="Rumah Panggung Kayu">Rumah Panggung Kayu</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Perkiraan Luas Bangunan (m²)
              </label>
              <input
                type="number"
                min={10}
                max={500}
                value={buildingAreaM2}
                onChange={(e) => setBuildingAreaM2(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600 font-mono-numbers"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Status Kepemilikan Tanah
              </label>
              <select
                value={landTenureStatus}
                onChange={(e) => setLandTenureStatus(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600"
              >
                <option value="Sertifikat Hak Milik (SHM)">Sertifikat Hak Milik (SHM)</option>
                <option value="Girik / Letter C">Girik / Letter C</option>
                <option value="Garapan / Surat Desa">Garapan / Surat Keterangan Desa</option>
                <option value="Zona Merah Bencana">Zona Merah Bencana (Wajib Relokasi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Instrumen Pengujian 6 Elemen Struktur Kerusakan PUPR */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <span>04. Pengujian Elemen Fisik Bangunan (Formulir PUPR No. 29/2018)</span>
            </h3>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 font-mono-numbers">
              Skor Terhitung: {metrics.score}% ({metrics.level})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* 1. Pondasi */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                1. Pondasi &amp; Sloof (Bobot 15%)
              </label>
              <select
                value={foundation}
                onChange={(e) => setFoundation(e.target.value as any)}
                className="w-full text-xs p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="Utuh / Kokoh">Utuh / Kokoh (Aman)</option>
                <option value="Retak Sebagian">Retak Sebagian / Penurunan Ringan</option>
                <option value="Amblas / Patah Parah">Amblas / Patah Parah / Terbelah Sesar</option>
              </select>
            </div>

            {/* 2. Kolom & Balok */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                2. Kolom Praktis &amp; Ring Balok (Bobot 25%)
              </label>
              <select
                value={columnsBeams}
                onChange={(e) => setColumnsBeams(e.target.value as any)}
                className="w-full text-xs p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="Aman / Utuh">Aman / Utuh</option>
                <option value="Retak Struktur Sebagian">Retak Struktur Sebagian</option>
                <option value="Patah / Runtuh Total">Patah / Runtuh Total (Kegagalan Geser)</option>
              </select>
            </div>

            {/* 3. Dinding */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                3. Dinding Pasangan (Bobot 20%)
              </label>
              <select
                value={walls}
                onChange={(e) => setWalls(e.target.value as any)}
                className="w-full text-xs p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="Retak Rambut (<2mm)">Retak Rambut (&lt;2mm) / Plesteran Rontok</option>
                <option value="Retak Tembus / Runtuh 30-50%">Retak Tembus / Runtuh 30-50%</option>
                <option value="Roboh Total (>60%)">Roboh Total (&gt;60%)</option>
              </select>
            </div>

            {/* 4. Rangka Atap */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                4. Rangka Kuda-kuda Atap (Bobot 20%)
              </label>
              <select
                value={roofFrame}
                onChange={(e) => setRoofFrame(e.target.value as any)}
                className="w-full text-xs p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="Kokoh / Normal">Kokoh / Normal</option>
                <option value="Miring / Sebagian Rusak">Miring / Gording Sebagian Patah</option>
                <option value="Runtuh Total">Runtuh Total ke Lantai</option>
              </select>
            </div>

            {/* 5. Penutup Atap */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                5. Penutup Genteng / Seng (Bobot 10%)
              </label>
              <select
                value={roofCovering}
                onChange={(e) => setRoofCovering(e.target.value as any)}
                className="w-full text-xs p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="Aman">Aman / Utuh</option>
                <option value="Lepas / Pecah Sebagian">Lepas / Pecah Sebagian</option>
                <option value="Hancur Seluruhnya">Hancur Seluruhnya</option>
              </select>
            </div>

            {/* 6. Sanitasi */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                6. Sanitasi &amp; Air Bersih (Bobot 10%)
              </label>
              <select
                value={sanitationWater}
                onChange={(e) => setSanitationWater(e.target.value as any)}
                className="w-full text-xs p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="Berfungsi Normal">Berfungsi Normal</option>
                <option value="Terganggu Sebagian">Terganggu Sebagian / Pipa Bocor</option>
                <option value="Rusak Total">Rusak Total / Tertimbun</option>
              </select>
            </div>
          </div>

          {/* Real-time Result Summary Box */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Hasil Klasifikasi Otomatis
              </span>
              <p className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    metrics.level === 'Rusak Berat'
                      ? 'bg-red-600'
                      : metrics.level === 'Rusak Sedang'
                      ? 'bg-amber-500'
                      : 'bg-emerald-600'
                  }`}
                />
                <span>{metrics.level} ({metrics.score}%)</span>
              </p>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Status Huni: {metrics.habitable ? 'Layak Huni Sementara' : 'TIDAK LAYAK HUNI (Wajib Mengungsi/Tenda)'}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Alokasi Bantuan Stimulan Rekomendasi
              </span>
              <p className="text-lg font-bold text-emerald-800 dark:text-emerald-400 font-mono-numbers">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(metrics.budget)}
              </p>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                {metrics.scheme}
              </span>
            </div>
          </div>
        </div>

        {/* Section 5: Foto & Catatan Verifikator */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Camera className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>05. Foto Dokumentasi &amp; Catatan Petugas Lapangan</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Catatan Teknis Lapangan
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan kondisi spesifik, nama fasilitator pendamping, kondisi sanitasi, atau akses jalan..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-emerald-600 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan &amp; Terbitkan Berita Acara (BAVL)</span>
          </button>
        </div>
      </form>
    </div>
  );
};
