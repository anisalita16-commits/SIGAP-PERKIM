import { HouseDamageReport } from '../types/disaster';

export const INITIAL_DISASTER_REPORTS: HouseDamageReport[] = [
  {
    id: 'REP-001',
    caseNumber: 'REG-PERKIM-KNW-2026-0014',
    residentName: 'Tamrin Mokodompit',
    nik: '7402011204800003',
    kkNumber: '7402011204050012',
    phone: '0812-4211-9870',
    familyMembers: 5,
    vulnerableMembers: { elderly: 1, infants: 1, disabled: 0 },
    address: {
      regency: 'Kabupaten Konawe',
      district: 'Unaaha',
      village: 'Kelurahan Tuoy',
      rtRw: 'RT 02 / RW 01',
      coordinates: { lat: -3.9682, lng: 122.0624 }
    },
    disasterEvent: 'Banjir Luapan Sungai Konaweha (DAS Konaweha)',
    disasterType: 'Banjir Bandang',
    disasterDate: '2026-02-18',
    houseType: 'Rumah Tembok Permanen',
    buildingAreaM2: 54,
    landTenureStatus: 'Sertifikat Hak Milik (SHM)',
    structuralAssessment: {
      foundation: 'Amblas / Patah Parah',
      columnsBeams: 'Patah / Runtuh Total',
      walls: 'Roboh Total (>60%)',
      roofFrame: 'Runtuh Total',
      roofCovering: 'Hancur Seluruhnya',
      sanitationWater: 'Rusak Total'
    },
    damageLevel: 'Rusak Berat',
    damageScorePercentage: 92,
    isHabitable: false,
    aidScheme: 'Stimulan Rusak Berat (Rp 60 Juta)',
    disbursementStatus: 'Penyaluran Tahap 1',
    photos: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80'
    ],
    notes: 'Terjangan arus luapan Sungai Konaweha merobohkan dinding utama dan menghancurkan pondasi tapak bagian depan sedalam 1.8 meter. Warga saat ini berada di posko pengungsian GOR Unaaha.',
    assessorName: 'Ir. Laode Syarifuddin, S.T., M.Eng.',
    assessorNip: '19850614 201001 1 012',
    verifiedAt: '2026-02-21',
    estimatedBudgetIDR: 60000000,
    materialEstimates: [
      { item: 'Semen Tonasa / Bosowa 50kg', volume: '75', unit: 'Sak', pricePerUnit: 82000, notes: 'Pondasi umpak & sloof kedap air' },
      { item: 'Besi Beton Ulir Dia. 10mm SNI', volume: '38', unit: 'Batang', pricePerUnit: 96000, notes: 'Kolom utama tahan banjir & getaran' },
      { item: 'Bata Ringan Hebel 10cm', volume: '14', unit: 'M3', pricePerUnit: 720000, notes: 'Dinding ringan berangkur' },
      { item: 'Rangka Baja Ringan C75', volume: '28', unit: 'Batang', pricePerUnit: 120000, notes: 'Kuda-kuda atap anti rayap' },
      { item: 'Atap Spandek 0.30mm', volume: '42', unit: 'Lembar', pricePerUnit: 98000, notes: 'Penutup atap ringan' }
    ]
  },
  {
    id: 'REP-002',
    caseNumber: 'REG-PERKIM-KNW-2026-0022',
    residentName: 'La Ode Sudirman',
    nik: '7402021508770001',
    kkNumber: '7402021508080019',
    phone: '0852-5640-1123',
    familyMembers: 4,
    vulnerableMembers: { elderly: 0, infants: 1, disabled: 0 },
    address: {
      regency: 'Kabupaten Konawe',
      district: 'Wawotobi',
      village: 'Desa Nario Indah',
      rtRw: 'RT 03 / RW 02',
      coordinates: { lat: -3.9421, lng: 122.1480 }
    },
    disasterEvent: 'Banjir Luapan DAS Lahumbuti & Konaweha',
    disasterType: 'Banjir Bandang',
    disasterDate: '2026-02-18',
    houseType: 'Rumah Semi Permanen',
    buildingAreaM2: 45,
    landTenureStatus: 'Girik / Letter C',
    structuralAssessment: {
      foundation: 'Retak Sebagian',
      columnsBeams: 'Retak Struktur Sebagian',
      walls: 'Retak Tembus / Runtuh 30-50%',
      roofFrame: 'Miring / Sebagian Rusak',
      roofCovering: 'Lepas / Pecah Sebagian',
      sanitationWater: 'Terganggu Sebagian'
    },
    damageLevel: 'Rusak Sedang',
    damageScorePercentage: 54,
    isHabitable: false,
    aidScheme: 'Stimulan Rusak Sedang (Rp 30 Juta)',
    disbursementStatus: 'SK Bupati/Walikota',
    photos: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80'
    ],
    notes: 'Ketinggian air banjir mencapai 1.6 meter merendam dinding pasangan bata dan menyebabkan retak diagonal geser. Kuda-kuda kayu terangkat sebagian. Rekomendasi perkuatan ferosemen dinding.',
    assessorName: 'Dra. Wa Ode Sitti Rahma, S.T.',
    assessorNip: '19880922 201202 2 004',
    verifiedAt: '2026-02-22',
    estimatedBudgetIDR: 30000000,
    materialEstimates: [
      { item: 'Semen Tonasa 50kg', volume: '34', unit: 'Sak', pricePerUnit: 82000, notes: 'Grouting spesi plesteran kedap air' },
      { item: 'Kawat Wiremesh Dinding', volume: '4', unit: 'Roll', pricePerUnit: 350000, notes: 'Perkuatan dinding peredam' },
      { item: 'Pasir Sedimen Konaweha Bersih', volume: '6', unit: 'M3', pricePerUnit: 280000, notes: 'Pasir pasang beton' },
      { item: 'Kayu Kaso 5/7 Kelas II', volume: '1.4', unit: 'M3', pricePerUnit: 2900000, notes: 'Penyangga atap darurat' }
    ]
  },
  {
    id: 'REP-003',
    caseNumber: 'REG-PERKIM-KNW-2026-0035',
    residentName: 'Ibu Hasnah Tombili',
    nik: '7402035408850002',
    kkNumber: '7402035408110008',
    phone: '0813-4109-8874',
    familyMembers: 3,
    vulnerableMembers: { elderly: 1, infants: 0, disabled: 0 },
    address: {
      regency: 'Kabupaten Konawe',
      district: 'Pondidaha',
      village: 'Desa Wonua Mandara',
      rtRw: 'RT 01 / RW 02',
      coordinates: { lat: -3.9850, lng: 122.2410 }
    },
    disasterEvent: 'Angin Puting Beliung Tropis',
    disasterType: 'Angin Puting Beliung',
    disasterDate: '2026-02-24',
    houseType: 'Rumah Tembok Permanen',
    buildingAreaM2: 60,
    landTenureStatus: 'Sertifikat Hak Milik (SHM)',
    structuralAssessment: {
      foundation: 'Utuh / Kokoh',
      columnsBeams: 'Aman / Utuh',
      walls: 'Retak Rambut (<2mm)',
      roofFrame: 'Miring / Sebagian Rusak',
      roofCovering: 'Lepas / Pecah Sebagian',
      sanitationWater: 'Berfungsi Normal'
    },
    damageLevel: 'Rusak Ringan',
    damageScorePercentage: 24,
    isHabitable: true,
    aidScheme: 'Stimulan Rusak Ringan (Rp 15 Juta)',
    disbursementStatus: 'Penyaluran Tahap 2',
    photos: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    ],
    notes: 'Puting beliung menerbangkan 45 lembar atap seng dan merusak gording rangka atap kayu. Struktur kolom dan dinding beton masih sangat kokoh.',
    assessorName: 'Dra. Wa Ode Sitti Rahma, S.T.',
    assessorNip: '19880922 201202 2 004',
    verifiedAt: '2026-02-26',
    estimatedBudgetIDR: 15000000,
    materialEstimates: [
      { item: 'Seng Gelombang BJLS 0.30mm', volume: '40', unit: 'Lembar', pricePerUnit: 88000, notes: 'Penggantian atap seng terbang' },
      { item: 'Rangka Baja Ringan C75', volume: '12', unit: 'Batang', pricePerUnit: 120000, notes: 'Perbaikan kuda-kuda' },
      { item: 'Plafon Tripleks / GRC 4mm', volume: '14', unit: 'Lembar', pricePerUnit: 78000, notes: 'Plafon rusak terhempas angin' }
    ]
  },
  {
    id: 'REP-004',
    caseNumber: 'REG-PERKIM-KNW-2026-0048',
    residentName: 'Kasman Sinapoy',
    nik: '7402202512810005',
    kkNumber: '7402202512060011',
    phone: '0853-9980-3344',
    familyMembers: 6,
    vulnerableMembers: { elderly: 2, infants: 0, disabled: 1 },
    address: {
      regency: 'Kabupaten Konawe',
      district: 'Asinua',
      village: 'Desa Asinua Jaya',
      rtRw: 'RT 01 / RW 01',
      coordinates: { lat: -3.8820, lng: 121.9540 }
    },
    disasterEvent: 'Tanah Longsor Mahkota Lereng Pegunungan',
    disasterType: 'Tanah Longsor',
    disasterDate: '2026-02-25',
    houseType: 'Rumah Panggung Kayu',
    buildingAreaM2: 50,
    landTenureStatus: 'Zona Merah Bencana',
    structuralAssessment: {
      foundation: 'Amblas / Patah Parah',
      columnsBeams: 'Patah / Runtuh Total',
      walls: 'Roboh Total (>60%)',
      roofFrame: 'Runtuh Total',
      roofCovering: 'Hancur Seluruhnya',
      sanitationWater: 'Rusak Total'
    },
    damageLevel: 'Rusak Berat',
    damageScorePercentage: 98,
    isHabitable: false,
    aidScheme: 'Relokasi Huntap Terpadu',
    disbursementStatus: 'Verifikasi Teknis',
    photos: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
    ],
    notes: 'Longsoran tebing lereng Asinua setinggi 20 meter menimbun rumah kayu panggung seluruhnya. Lokasi berada pada zona merah rawan longsor susulan sehingga diusulkan relokasi ke Kawasan Hunian Tetap Pemkab Konawe di Unaaha Barat.',
    assessorName: 'Ir. Laode Syarifuddin, S.T., M.Eng.',
    assessorNip: '19850614 201001 1 012',
    verifiedAt: '2026-02-28',
    estimatedBudgetIDR: 75000000,
    materialEstimates: [
      { item: 'Unit Hunian Tetap Tipe 36 RISHA Konawe', volume: '1', unit: 'Unit', pricePerUnit: 75000000, notes: 'Paket Relokasi Pemkab Konawe' }
    ]
  },
  {
    id: 'REP-005',
    caseNumber: 'REG-PERKIM-KNW-2026-0056',
    residentName: 'Baharuddin Tolaki',
    nik: '7402081006720004',
    kkNumber: '7402081006990022',
    phone: '0812-4550-9981',
    familyMembers: 4,
    vulnerableMembers: { elderly: 0, infants: 1, disabled: 0 },
    address: {
      regency: 'Kabupaten Konawe',
      district: 'Sampara',
      village: 'Desa Asolu',
      rtRw: 'RT 02 / RW 04',
      coordinates: { lat: -3.9920, lng: 122.3150 }
    },
    disasterEvent: 'Banjir Luapan Sungai Konaweha Hilir',
    disasterType: 'Banjir Bandang',
    disasterDate: '2026-02-19',
    houseType: 'Rumah Semi Permanen',
    buildingAreaM2: 48,
    landTenureStatus: 'Garapan / Surat Desa',
    structuralAssessment: {
      foundation: 'Retak Sebagian',
      columnsBeams: 'Aman / Utuh',
      walls: 'Retak Tembus / Runtuh 30-50%',
      roofFrame: 'Kokoh / Normal',
      roofCovering: 'Aman',
      sanitationWater: 'Rusak Total'
    },
    damageLevel: 'Rusak Sedang',
    damageScorePercentage: 46,
    isHabitable: false,
    aidScheme: 'Stimulan Rusak Sedang (Rp 30 Juta)',
    disbursementStatus: 'Pembangunan Fisik',
    photos: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
    ],
    notes: 'Banjir hilir DAS Konaweha merendam dinding setengah bata dan menghanyutkan fasilitas MCK dan sumur bor. Perbaikan struktur dinding dan sanitasi sedang berlangsung 45%.',
    assessorName: 'Dra. Wa Ode Sitti Rahma, S.T.',
    assessorNip: '19880922 201202 2 004',
    verifiedAt: '2026-02-23',
    estimatedBudgetIDR: 30000000,
    materialEstimates: [
      { item: 'Semen Tonasa 50kg', volume: '30', unit: 'Sak', pricePerUnit: 82000, notes: 'Pasangan dinding trassram' },
      { item: 'Pasir Pasang', volume: '5', unit: 'M3', pricePerUnit: 280000, notes: 'Agregat mortar' },
      { item: 'Paket Sanitasi Kloset & Bio Septic Tank', volume: '1', unit: 'Set', pricePerUnit: 2600000, notes: 'Sanitasi darurat pascabanjir' }
    ]
  },
  {
    id: 'REP-006',
    caseNumber: 'REG-PERKIM-KNW-2026-0067',
    residentName: 'Ruslan Ilato',
    nik: '7402151901760002',
    kkNumber: '7402151901040015',
    phone: '0852-4112-7788',
    familyMembers: 5,
    vulnerableMembers: { elderly: 1, infants: 0, disabled: 0 },
    address: {
      regency: 'Kabupaten Konawe',
      district: 'Lambuya',
      village: 'Desa Lambuya',
      rtRw: 'RT 04 / RW 02',
      coordinates: { lat: -4.0410, lng: 122.1120 }
    },
    disasterEvent: 'Gempa Bumi Sesar Lawanopo M5.4',
    disasterType: 'Gempa Bumi',
    disasterDate: '2026-02-27',
    houseType: 'Rumah Tembok Permanen',
    buildingAreaM2: 64,
    landTenureStatus: 'Sertifikat Hak Milik (SHM)',
    structuralAssessment: {
      foundation: 'Retak Sebagian',
      columnsBeams: 'Retak Struktur Sebagian',
      walls: 'Retak Tembus / Runtuh 30-50%',
      roofFrame: 'Kokoh / Normal',
      roofCovering: 'Lepas / Pecah Sebagian',
      sanitationWater: 'Berfungsi Normal'
    },
    damageLevel: 'Rusak Sedang',
    damageScorePercentage: 50,
    isHabitable: false,
    aidScheme: 'Stimulan Rusak Sedang (Rp 30 Juta)',
    disbursementStatus: 'Verifikasi Teknis',
    photos: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80'
    ],
    notes: 'Guncangan gempa dangkal segmen Sesar Lawanopo memicu retakan silang pada dinding ruang tengah dan plesteran kolom terkelupas. Perlu perkuatan retrofitting kawat ayam sebelum dihuni kembali.',
    assessorName: 'Ir. Laode Syarifuddin, S.T., M.Eng.',
    assessorNip: '19850614 201001 1 012',
    verifiedAt: '2026-03-01',
    estimatedBudgetIDR: 30000000,
    materialEstimates: [
      { item: 'Semen Tonasa 50kg', volume: '32', unit: 'Sak', pricePerUnit: 82000, notes: 'Grouting spesi semen' },
      { item: 'Kawat Wiremesh / Ayam', volume: '4', unit: 'Roll', pricePerUnit: 350000, notes: 'Perkuatan dinding gempa' },
      { item: 'Besi Beton Ulir 10mm SNI', volume: '12', unit: 'Batang', pricePerUnit: 96000, notes: 'Pengikat sengkang kolom' }
    ]
  },
  {
    id: 'REP-007',
    caseNumber: 'REG-PERKIM-KNW-2026-0078',
    residentName: 'Jufri Manggabarani',
    nik: '7402120503830001',
    kkNumber: '7402120503090014',
    phone: '0813-4122-6655',
    familyMembers: 3,
    vulnerableMembers: { elderly: 0, infants: 0, disabled: 0 },
    address: {
      regency: 'Kabupaten Konawe',
      district: 'Unaaha',
      village: 'Kelurahan Inolobunggadue',
      rtRw: 'RT 01 / RW 03',
      coordinates: { lat: -3.9710, lng: 122.0550 }
    },
    disasterEvent: 'Banjir Genangan DAS Lahumbuti',
    disasterType: 'Banjir Bandang',
    disasterDate: '2026-02-18',
    houseType: 'Rumah Tembok Permanen',
    buildingAreaM2: 52,
    landTenureStatus: 'Sertifikat Hak Milik (SHM)',
    structuralAssessment: {
      foundation: 'Utuh / Kokoh',
      columnsBeams: 'Aman / Utuh',
      walls: 'Retak Rambut (<2mm)',
      roofFrame: 'Kokoh / Normal',
      roofCovering: 'Aman',
      sanitationWater: 'Terganggu Sebagian'
    },
    damageLevel: 'Rusak Ringan',
    damageScorePercentage: 18,
    isHabitable: true,
    aidScheme: 'Stimulan Rusak Ringan (Rp 15 Juta)',
    disbursementStatus: 'Selesai PHO',
    photos: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    ],
    notes: 'Tergenang air setinggi 60cm selama 2 hari. Struktur rumah masih sangat kokoh. Pekerjaan pembersihan lumpur dan perbaikan lantai/cat telah selesai 100% dan telah PHO.',
    assessorName: 'Dra. Wa Ode Sitti Rahma, S.T.',
    assessorNip: '19880922 201202 2 004',
    verifiedAt: '2026-03-02',
    estimatedBudgetIDR: 15000000,
    materialEstimates: [
      { item: 'Semen Tonasa 50kg', volume: '10', unit: 'Sak', pricePerUnit: 82000, notes: 'Perbaikan plesteran kaki dinding' },
      { item: 'Cat Tembok Weatherproof 20kg', volume: '2', unit: 'Pail', pricePerUnit: 690000, notes: 'Pengecatan ulang pascabanjir' }
    ]
  }
];

export const STANDARD_MATERIAL_PRICING = [
  { item: 'Semen Tonasa / Bosowa (PC) 50kg', unit: 'Sak', price: 82000, category: 'Struktur' },
  { item: 'Pasir Pasang Sungai Konaweha', unit: 'M3', price: 280000, category: 'Agregat' },
  { item: 'Batu Belah Kali Pondasi', unit: 'M3', price: 310000, category: 'Pondasi' },
  { item: 'Besi Beton Polos Dia. 8mm SNI', unit: 'Batang', price: 65000, category: 'Baja Tulangan' },
  { item: 'Besi Beton Ulir Dia. 10mm SNI', unit: 'Batang', price: 96000, category: 'Baja Tulangan' },
  { item: 'Bata Ringan AAC Tebal 10cm', unit: 'M3', price: 720000, category: 'Dinding' },
  { item: 'Bata Merah Bakar Konawe', unit: 'Buah', price: 950, category: 'Dinding' },
  { item: 'Baja Ringan Kanal C75 Tebal 0.75mm', unit: 'Batang', price: 120000, category: 'Atap' },
  { item: 'Reng Baja Ringan', unit: 'Batang', price: 52000, category: 'Atap' },
  { item: 'Atap Spandek Gelombang 0.30mm', unit: 'Lembar', price: 98000, category: 'Atap' },
  { item: 'Seng Gelombang BJLS Gajah', unit: 'Lembar', price: 88000, category: 'Atap' },
  { item: 'Kawat Wiremesh / Ayam Perkuatan', unit: 'Roll', price: 350000, category: 'Perkuatan' },
  { item: 'Kloset Jongkok Porselen + Pipa PVC', unit: 'Set', price: 450000, category: 'Sanitasi' },
  { item: 'Upah Tukang Bangunan Lokal (HOK)', unit: 'Hari', price: 160000, category: 'Tenaga Kerja' },
  { item: 'Upah Pembantu Tukang / Pekerja (HOK)', unit: 'Hari', price: 120000, category: 'Tenaga Kerja' }
];

export const DISPERKIM_CONFIG = {
  officeName: 'DINAS PERUMAHAN DAN KAWASAN PERMUKIMAN',
  regencyName: 'KABUPATEN KONAWE',
  provinceName: 'PROVINSI SULAWESI TENGGARA',
  divisionName: 'BIDANG PERUMAHAN - SEKSI FASILITASI RUMAH KORBAN BENCANA & RELOKASI',
  appTitle: 'SIGAP-PERKIM KONAWE',
  version: 'v3.4-KONAWE-TANGGAP',
  officeAddress: 'Kompleks Perkantoran Pemkab Konawe, Jl. Inolobunggadue No. 1, Unaaha, Kab. Konawe, Sulawesi Tenggara 93411',
  officeContact: 'Telp. (0408) 242-1209 · Posko TRC Bencana Perumahan Unaaha',
  logoKonawe: '/assets/aistudio/Logo-Kabupaten-Konawe-Warna_c866335c.jpg',
  logoDisperkim: '/assets/aistudio/Logo_Kementerian_Perumahan_dan_Kawasan_Permukiman_RI__2025___logo_only_.svg_05cb77c7.webp',
  emblemPath: '/assets/aistudio/Logo-Kabupaten-Konawe-Warna_c866335c.jpg',
  headOfDepartment: {
    name: 'Ir. H. Muhammad Akbar, M.Si.',
    nip: '19730412 199903 1 005',
    title: 'Kepala Dinas Perumahan dan Kawasan Permukiman Kabupaten Konawe'
  },
  technicalChief: {
    name: 'Ir. Laode Syarifuddin, S.T., M.Eng.',
    nip: '19850614 201001 1 012',
    title: 'Pejabat Pembuat Komitmen (PPK) Rehabilitasi Pascabencana Kab. Konawe'
  }
};

export interface AppUserAccount {
  username: string;
  passwordHash: string; // Plaintext demo password
  fullName: string;
  nip: string;
  role: 'Administrator' | 'Pejabat Pembuat Komitmen (PPK)' | 'Verifikator TRC Lapangan' | 'Bendahara Bantuan';
  position: string;
  department: string;
  avatarUrl?: string;
}

export const DEFAULT_USERS: AppUserAccount[] = [
  {
    username: 'admin',
    passwordHash: 'admin123',
    fullName: 'Ir. H. Muhammad Akbar, M.Si.',
    nip: '19730412 199903 1 005',
    role: 'Administrator',
    position: 'Kepala Dinas Perumahan dan Kawasan Permukiman',
    department: 'Dinas Perumahan dan Kawasan Permukiman Kab. Konawe'
  },
  {
    username: 'ppk.konawe',
    passwordHash: 'ppk123',
    fullName: 'Ir. Laode Syarifuddin, S.T., M.Eng.',
    nip: '19850614 201001 1 012',
    role: 'Pejabat Pembuat Komitmen (PPK)',
    position: 'PPK Rehabilitasi & Rekonstruksi Perumahan Pascabencana',
    department: 'Bidang Perumahan DISPERKIM Kab. Konawe'
  },
  {
    username: 'trc.lapangan',
    passwordHash: 'trc123',
    fullName: 'Dra. Wa Ode Sitti Rahma, S.T.',
    nip: '19880922 201202 2 004',
    role: 'Verifikator TRC Lapangan',
    position: 'Fasilitator Teknik Lapangan TRC Unaaha',
    department: 'Posko TRC Bencana Perumahan Unaaha'
  },
  {
    username: 'keuangan',
    passwordHash: 'keuangan123',
    fullName: 'H. Basrun Sambo, S.E., M.M.',
    nip: '19800318 200604 1 008',
    role: 'Bendahara Bantuan',
    position: 'Bendahara Penyaluran Bantuan Stimulan Perumahan',
    department: 'Subbag Keuangan & Aset DISPERKIM Kab. Konawe'
  }
];
