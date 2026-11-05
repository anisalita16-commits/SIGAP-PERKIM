import React from 'react';
import { Plus, Moon, Sun, Database } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewAssessment: () => void;
  onOpenSupabaseModal: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewAssessment,
  onOpenSupabaseModal,
  darkMode,
  setDarkMode
}) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-6 px-6 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Zone 1: Brand Wordmark with Both Official Logos */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <img
            src="/assets/aistudio/Logo-Kabupaten-Konawe-Warna_c866335c.jpg"
            alt="Lambang Daerah Kabupaten Konawe"
            title="Lambang Daerah Kabupaten Konawe"
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded object-contain bg-white p-0.5 shadow-2xs"
          />
          <img
            src="/assets/aistudio/Logo_Kementerian_Perumahan_dan_Kawasan_Permukiman_RI__2025___logo_only_.svg_05cb77c7.webp"
            alt="Logo Kementerian Perumahan dan Kawasan Permukiman RI"
            title="Logo Resmi Kementerian Perumahan & Kawasan Permukiman (DISPERKIM)"
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded object-contain bg-slate-950 p-0.5 shadow-2xs border border-amber-600/30"
          />
        </div>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-left cursor-pointer group"
        >
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 block">
            SIGAP-PERKIM KONAWE
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block -mt-0.5">
            Dinas Perumahan &amp; Kawasan Permukiman Kab. Konawe
          </span>
        </button>
      </div>

      {/* Zone 2: clean single-line nav links */}
      <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'dashboard' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 pb-1 -mb-1' : ''
          }`}
        >
          Peta &amp; Statistik
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'reports' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 pb-1 -mb-1' : ''
          }`}
        >
          Data Verifikasi Rumah
        </button>
      </nav>

      {/* Zone 3: Supabase status + Theme toggle + Primary action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenSupabaseModal}
          title="Status & Sinkronisasi Database Supabase"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
        >
          <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden sm:inline">Supabase</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenNewAssessment}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Input Asesmen Baru</span>
        </button>
      </div>
    </header>
  );
};
