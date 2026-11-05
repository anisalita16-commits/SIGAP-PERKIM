import React, { useState } from 'react';
import {
  X,
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import {
  SUPABASE_URL,
  SUPABASE_PROJECT_ID,
  SUPABASE_SQL_SCHEMA,
  TABLE_NAME,
  supabase,
  syncBatchToSupabase,
  fetchReportsFromSupabase
} from '../lib/supabase';
import { HouseDamageReport } from '../types/disaster';

interface SupabaseSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: HouseDamageReport[];
  onMergeReports: (newReports: HouseDamageReport[]) => void;
}

export const SupabaseSyncModal: React.FC<SupabaseSyncModalProps> = ({
  isOpen,
  onClose,
  reports,
  onMergeReports
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  if (!isOpen) return null;

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTestConnectionAndSync = async () => {
    setIsSyncing(true);
    setSyncStatus({ type: 'idle', message: 'Menghubungkan ke Supabase...' });

    try {
      // 1. Try to fetch from Supabase
      const { data: remoteData, error: fetchErr } = await fetchReportsFromSupabase();

      if (fetchErr) {
        // If table doesn't exist (error code 42P01 in postgres or PGRST204)
        const errMsg = fetchErr.message || JSON.stringify(fetchErr);
        if (errMsg.includes('relation') || errMsg.includes('does not exist') || errMsg.includes('42P01')) {
          setSyncStatus({
            type: 'error',
            message: `Tabel '${TABLE_NAME}' belum dibuat di Supabase. Silakan salin SQL Skrip di bawah dan jalankan di SQL Editor Supabase Anda.`
          });
          setIsSyncing(false);
          return;
        }

        setSyncStatus({
          type: 'error',
          message: `Gagal mengakses Supabase: ${fetchErr.message || 'Periksa koneksi dan izin RLS'}`
        });
        setIsSyncing(false);
        return;
      }

      // If remote has data, merge with local
      if (remoteData && remoteData.length > 0) {
        onMergeReports(remoteData);
      }

      // 2. Upload any local reports to Supabase
      const { count, error: uploadErr } = await syncBatchToSupabase(reports);
      if (uploadErr) {
        setSyncStatus({
          type: 'error',
          message: `Terhubung, namun gagal mengunggah data: ${uploadErr.message}`
        });
      } else {
        setSyncStatus({
          type: 'success',
          message: `Berhasil tersambung & sinkron! ${count} data tersimpan di Supabase (${TABLE_NAME}).`
        });
      }
    } catch (err: any) {
      setSyncStatus({
        type: 'error',
        message: `Terjadi kendala jaringan: ${err.message || 'Koneksi gagal'}`
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Koneksi Supabase Cloud Database</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-mono">
                  Aktif
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Integrasi database PostgreSQL &amp; Cloud Storage SIGAP-PERKIM Konawe
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs text-slate-700 dark:text-slate-300">
          {/* Credentials Info Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">Project Name &amp; ID:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono-numbers">
                SIGAP-PERKIM ({SUPABASE_PROJECT_ID})
              </span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">Supabase Endpoint:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-[11px] truncate block" title={SUPABASE_URL}>
                {SUPABASE_URL}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">Tabel Database:</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                public.{TABLE_NAME}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">Data Lokal Saat Ini:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono-numbers">
                {reports.length} Laporan Verifikasi Rumah
              </span>
            </div>
          </div>

          {/* Sync Status Banner */}
          {syncStatus.message && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                syncStatus.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : syncStatus.type === 'error'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
              }`}
            >
              {syncStatus.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
              {syncStatus.type === 'error' && <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
              {syncStatus.type === 'idle' && <RefreshCw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 animate-spin" />}
              <div className="flex-1 text-xs">
                {syncStatus.message}
              </div>
            </div>
          )}

          {/* Sync Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                Sinkronkan Data ke Supabase Cloud
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Mengunggah data verifikasi rumah lokal ke tabel cloud Supabase dan mengambil data terbaru.
              </p>
            </div>
            <button
              onClick={handleTestConnectionAndSync}
              disabled={isSyncing}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menghubungkan...' : 'Sinkronkan Sekarang'}</span>
            </button>
          </div>

          {/* SQL Setup Guidance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Skrip SQL Pembuatan Tabel &amp; RLS Supabase</span>
              </span>
              <button
                onClick={handleCopySQL}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-md border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin!' : 'Salin SQL (1-Klik)'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Jika tabel belum dibuat di Supabase Anda, buka{' '}
              <a
                href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 dark:text-emerald-400 underline font-medium inline-flex items-center gap-0.5"
              >
                <span>Supabase SQL Editor</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              , tempel skrip SQL di bawah, dan klik <strong>Run</strong>.
            </p>
            <div className="relative">
              <pre className="p-3 bg-slate-950 text-slate-200 rounded-xl text-[11px] font-mono overflow-x-auto max-h-44 border border-slate-800 leading-relaxed">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            Kredensial Publik Supabase Terpasang
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
