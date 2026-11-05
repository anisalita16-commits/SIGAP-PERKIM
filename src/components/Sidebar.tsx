import React from 'react';
import {
  LayoutDashboard,
  FileSpreadsheet,
  PlusCircle,
  BookOpen,
  FileCheck2,
  MapPin,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { DISPERKIM_CONFIG } from '../data/mockData';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  reportCount: number;
  totalStimulusBudget: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  reportCount,
  totalStimulusBudget
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Ringkasan & Peta GIS',
      icon: LayoutDashboard,
      badge: `${reportCount} Rumah`
    },
    {
      id: 'reports',
      label: 'Data Verifikasi Rumah',
      icon: FileSpreadsheet,
      badge: null
    },
    {
      id: 'new-assessment',
      label: 'Input Pendataan Baru',
      icon: PlusCircle,
      badge: 'TRC'
    },
    {
      id: 'guidelines',
      label: 'Standar Kerusakan',
      icon: BookOpen,
      badge: null
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between min-h-[calc(100vh-61px)]">
      <div className="p-4 space-y-5">
        {/* Department Info Box */}
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-lg border border-emerald-200 dark:border-emerald-800 shadow-2xs shrink-0">
              <img
                src="/assets/aistudio/Logo-Kabupaten-Konawe-Warna_c866335c.jpg"
                alt="Lambang Daerah Kabupaten Konawe"
                title="Lambang Daerah Pemkab Konawe"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded object-contain bg-white p-0.5"
              />
              <img
                src="/assets/aistudio/Logo_Kementerian_Perumahan_dan_Kawasan_Permukiman_RI__2025___logo_only_.svg_05cb77c7.webp"
                alt="Logo Kementerian Perumahan dan Kawasan Permukiman RI"
                title="Logo Resmi Kementerian PKP / DISPERKIM"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded object-contain bg-slate-950 p-0.5 border border-amber-600/30"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 leading-tight">
                DISPERKIM KONAWE
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 leading-tight">
                Kabupaten Konawe, Sultra
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
            <div className="flex justify-between">
              <span>Total Terverifikasi:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 font-mono-numbers">{reportCount} KK</span>
            </div>
            <div className="flex justify-between">
              <span>Kebutuhan Dana:</span>
              <span className="font-semibold text-emerald-800 dark:text-emerald-400 font-mono-numbers">
                {(totalStimulusBudget / 1000000).toFixed(0)} Jt
              </span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-emerald-200/40 dark:border-emerald-800/20 text-[10px]">
              <span className="text-slate-500 dark:text-slate-400">Database:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>Supabase (PostgreSQL)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-2">
            Menu Operasional
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs dark:bg-emerald-700'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono-numbers ${
                      isActive
                        ? 'bg-emerald-900/50 text-emerald-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Emergency Hotlines */}
        <div className="pt-2">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-2">
            Posko Siaga TRC
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1.5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Piket Reaksi Cepat</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Hotline 24 Jam: (0263) 261-445
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              WhatsApp TRC: 0811-2026-999
            </p>
          </div>
        </div>
      </div>

      {/* Official Footprint */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
        <p className="font-semibold text-slate-700 dark:text-slate-300">Pedoman Teknis:</p>
        <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
          Permen PUPR No. 29/PRT/M/2018 &amp; BNPB Perka No. 04/2012
        </p>
      </div>
    </aside>
  );
};
