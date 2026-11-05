import { createClient } from '@supabase/supabase-js';
import { HouseDamageReport, AidDisbursementStatus } from '../types/disaster';

// Project Credentials provided by user
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://pfqwtxggolcvusgqlpxb.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_kiK2TrB1Huzk8Zsq0tn5LQ_y8ImdNzY';
export const SUPABASE_PROJECT_ID = 'pfqwtxggolcvusgqlpxb';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export const TABLE_NAME = 'disaster_reports';

/**
 * SQL Schema script to run in Supabase SQL Editor if table is not yet created
 */
export const SUPABASE_SQL_SCHEMA = `-- 1. Buat Tabel Data Bencana Perumahan SIGAP-PERKIM
CREATE TABLE IF NOT EXISTS disaster_reports (
  id TEXT PRIMARY KEY,
  case_number TEXT,
  resident_name TEXT NOT NULL,
  nik TEXT NOT NULL,
  kk_number TEXT,
  phone TEXT,
  damage_level TEXT,
  damage_score_percentage INT,
  is_habitable BOOLEAN,
  disaster_type TEXT,
  disbursement_status TEXT,
  estimated_budget_idr NUMERIC,
  address JSONB,
  structural_assessment JSONB,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE disaster_reports ENABLE ROW LEVEL SECURITY;

-- 3. Policy Akses Anon/Public Key (Read, Insert, Update, Delete)
CREATE POLICY "Allow public read disaster_reports"
ON disaster_reports FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow public insert disaster_reports"
ON disaster_reports FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public update disaster_reports"
ON disaster_reports FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public delete disaster_reports"
ON disaster_reports FOR DELETE
TO anon, authenticated
USING (true);
`;

/**
 * Convert local HouseDamageReport to Supabase row format
 */
export function toSupabaseRow(report: HouseDamageReport) {
  return {
    id: report.id,
    case_number: report.caseNumber,
    resident_name: report.residentName,
    nik: report.nik,
    kk_number: report.kkNumber,
    phone: report.phone,
    damage_level: report.damageLevel,
    damage_score_percentage: report.damageScorePercentage,
    is_habitable: report.isHabitable,
    disaster_type: report.disasterType,
    disbursement_status: report.disbursementStatus,
    estimated_budget_idr: report.estimatedBudgetIDR,
    address: report.address,
    structural_assessment: report.structuralAssessment,
    details: report,
    updated_at: new Date().toISOString()
  };
}

/**
 * Convert Supabase row format back to local HouseDamageReport
 */
export function fromSupabaseRow(row: any): HouseDamageReport {
  if (row.details && typeof row.details === 'object' && row.details.id) {
    return {
      ...row.details,
      id: row.id || row.details.id,
      caseNumber: row.case_number || row.details.caseNumber,
      residentName: row.resident_name || row.details.residentName,
      nik: row.nik || row.details.nik,
      damageLevel: row.damage_level || row.details.damageLevel,
      disbursementStatus: row.disbursement_status || row.details.disbursementStatus,
      estimatedBudgetIDR: Number(row.estimated_budget_idr) || row.details.estimatedBudgetIDR
    };
  }

  return {
    id: row.id,
    caseNumber: row.case_number || 'REG-PERKIM-KNW',
    residentName: row.resident_name || '',
    nik: row.nik || '',
    kkNumber: row.kk_number || '',
    phone: row.phone || '',
    familyMembers: row.family_members || 1,
    vulnerableMembers: { elderly: 0, infants: 0, disabled: 0 },
    address: row.address || {
      regency: 'Kabupaten Konawe',
      district: 'Unaaha',
      village: 'Inolobunggadue',
      rtRw: 'RT 01 / RW 01',
      coordinates: { lat: -3.85, lng: 122.05 }
    },
    disasterEvent: 'Bencana Perumahan',
    disasterType: row.disaster_type || 'Banjir Bandang',
    disasterDate: new Date().toISOString().split('T')[0],
    houseType: 'Rumah Tembok Permanen',
    buildingAreaM2: 54,
    landTenureStatus: 'Sertifikat Hak Milik (SHM)',
    structuralAssessment: row.structural_assessment || {
      foundation: 'Utuh / Kokoh',
      columnsBeams: 'Aman / Utuh',
      walls: 'Retak Rambut (<2mm)',
      roofFrame: 'Kokoh / Normal',
      roofCovering: 'Aman',
      sanitationWater: 'Berfungsi Normal'
    },
    damageLevel: row.damage_level || 'Rusak Ringan',
    damageScorePercentage: row.damage_score_percentage || 20,
    isHabitable: row.is_habitable ?? true,
    aidScheme: 'Stimulan Perumahan',
    disbursementStatus: row.disbursement_status || 'Terdata',
    photos: [],
    notes: 'Kajian teknis Disperkim',
    assessorName: 'TRC Disperkim Konawe',
    assessorNip: '198804122014031002',
    verifiedAt: new Date().toISOString().split('T')[0],
    estimatedBudgetIDR: Number(row.estimated_budget_idr) || 15000000,
    materialEstimates: []
  };
}

/**
 * Fetch all reports from Supabase database
 */
export async function fetchReportsFromSupabase(): Promise<{ data: HouseDamageReport[] | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error };
    }

    const parsed = (data || []).map(fromSupabaseRow);
    return { data: parsed, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Insert or update a single report into Supabase
 */
export async function upsertReportToSupabase(report: HouseDamageReport): Promise<{ success: boolean; error: any }> {
  try {
    const row = toSupabaseRow(report);
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(row, { onConflict: 'id' });

    if (error) {
      return { success: false, error };
    }
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Update disbursement status of a report in Supabase
 */
export async function updateReportStatusInSupabase(
  id: string,
  status: AidDisbursementStatus
): Promise<{ success: boolean; error: any }> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .update({ disbursement_status: status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return { success: false, error };
    }
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Delete a report from Supabase
 */
export async function deleteReportFromSupabase(id: string): Promise<{ success: boolean; error: any }> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error };
    }
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Batch synchronize local reports into Supabase
 */
export async function syncBatchToSupabase(reports: HouseDamageReport[]): Promise<{ count: number; error: any }> {
  try {
    const rows = reports.map(toSupabaseRow);
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(rows, { onConflict: 'id' });

    if (error) {
      return { count: 0, error };
    }
    return { count: rows.length, error: null };
  } catch (err) {
    return { count: 0, error: err };
  }
}
