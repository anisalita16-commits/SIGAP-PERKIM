export type DamageLevel = 'Rusak Ringan' | 'Rusak Sedang' | 'Rusak Berat';

export type DisasterType =
  | 'Gempa Bumi'
  | 'Banjir Bandang'
  | 'Tanah Longsor'
  | 'Angin Puting Beliung'
  | 'Kebakaran Permukiman'
  | 'Erupsi Gunung Api';

export type AidDisbursementStatus =
  | 'Terdata'
  | 'Verifikasi Teknis'
  | 'SK Bupati/Walikota'
  | 'Penyaluran Tahap 1'
  | 'Pembangunan Fisik'
  | 'Penyaluran Tahap 2'
  | 'Selesai PHO';

export interface StructuralAssessment {
  foundation: 'Utuh / Kokoh' | 'Retak Sebagian' | 'Amblas / Patah Parah';
  columnsBeams: 'Aman / Utuh' | 'Retak Struktur Sebagian' | 'Patah / Runtuh Total';
  walls: 'Retak Rambut (<2mm)' | 'Retak Tembus / Runtuh 30-50%' | 'Roboh Total (>60%)';
  roofFrame: 'Kokoh / Normal' | 'Miring / Sebagian Rusak' | 'Runtuh Total';
  roofCovering: 'Aman' | 'Lepas / Pecah Sebagian' | 'Hancur Seluruhnya';
  sanitationWater: 'Berfungsi Normal' | 'Terganggu Sebagian' | 'Rusak Total';
}

export interface MaterialRequirement {
  item: string;
  volume: string;
  unit: string;
  pricePerUnit?: number;
  notes: string;
}

export interface HouseDamageReport {
  id: string;
  caseNumber: string;
  residentName: string;
  nik: string;
  kkNumber: string;
  phone: string;
  familyMembers: number;
  vulnerableMembers: {
    elderly: number;
    infants: number;
    disabled: number;
  };
  address: {
    regency: string;
    district: string; // Kecamatan
    village: string; // Desa / Kelurahan
    rtRw: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  disasterEvent: string;
  disasterType: DisasterType;
  disasterDate: string;
  houseType: 'Rumah Tembok Permanen' | 'Rumah Semi Permanen' | 'Rumah Panggung Kayu';
  buildingAreaM2: number;
  landTenureStatus: 'Sertifikat Hak Milik (SHM)' | 'Girik / Letter C' | 'Garapan / Surat Desa' | 'Zona Merah Bencana';
  structuralAssessment: StructuralAssessment;
  damageLevel: DamageLevel;
  damageScorePercentage: number;
  isHabitable: boolean;
  aidScheme: string;
  disbursementStatus: AidDisbursementStatus;
  photos: string[];
  notes: string;
  assessorName: string;
  assessorNip: string;
  verifiedAt: string;
  estimatedBudgetIDR: number;
  materialEstimates: MaterialRequirement[];
}

export interface AiAssessmentResult {
  damageLevel: DamageLevel;
  damageScorePercentage: number;
  isHabitable: boolean;
  structuralDamage: string;
  nonStructuralDamage: string;
  recommendedAction: string;
  estimatedBudgetIDR: number;
  materialRequirements: MaterialRequirement[];
  safetyMeasures: string[];
  disperkimTechnicalNotes: string;
}

export type UserRole = 'Administrator' | 'Pejabat Pembuat Komitmen (PPK)' | 'Verifikator TRC Lapangan' | 'Bendahara Bantuan';

export interface UserSession {
  username: string;
  fullName: string;
  nip: string;
  role: UserRole;
  position: string;
  department: string;
  avatarUrl?: string;
}
