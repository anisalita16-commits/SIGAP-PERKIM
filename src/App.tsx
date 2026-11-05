/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { ReportListTable } from './components/ReportListTable';
import { NewAssessmentForm } from './components/NewAssessmentForm';
import { OfficialReportPrintModal } from './components/OfficialReportPrintModal';
import { ReportDetailModal } from './components/ReportDetailModal';
import { DisperkimGuidelines } from './components/DisperkimGuidelines';
import { SupabaseSyncModal } from './components/SupabaseSyncModal';
import { INITIAL_DISASTER_REPORTS } from './data/mockData';
import {
  HouseDamageReport,
  AidDisbursementStatus,
  MaterialRequirement
} from './types/disaster';
import {
  fetchReportsFromSupabase,
  upsertReportToSupabase,
  updateReportStatusInSupabase,
  deleteReportFromSupabase
} from './lib/supabase';

const STORAGE_KEY = 'SIGAP_PERKIM_KONAWE_V2';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Reports state with LocalStorage persistence
  const [reports, setReports] = useState<HouseDamageReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved reports:', e);
      }
    }
    return INITIAL_DISASTER_REPORTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  }, [reports]);

  // Initial remote fetch from Supabase
  useEffect(() => {
    let isMounted = true;
    fetchReportsFromSupabase().then(({ data, error }) => {
      if (!isMounted) return;
      if (!error && data && data.length > 0) {
        setReports((prev) => {
          const remoteIds = new Set(data.map((r) => r.id));
          const uniqueLocal = prev.filter((r) => !remoteIds.has(r.id));
          return [...data, ...uniqueLocal];
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Active view navigation
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Modals state
  const [detailModalReport, setDetailModalReport] = useState<HouseDamageReport | null>(null);
  const [printModalReport, setPrintModalReport] = useState<HouseDamageReport | null>(null);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState<boolean>(false);

  // Handlers
  const handleSelectReport = (report: HouseDamageReport) => {
    setDetailModalReport(report);
  };

  const handleOpenNewAssessment = () => {
    setActiveTab('new-assessment');
  };

  const handleSaveNewReport = (newReport: HouseDamageReport) => {
    setReports([newReport, ...reports]);
    setActiveTab('reports');
    // Save to Supabase Cloud
    upsertReportToSupabase(newReport).catch((err) => {
      console.warn('Supabase auto-save notice:', err);
    });
  };

  const handleUpdateStatus = (id: string, status: AidDisbursementStatus) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, disbursementStatus: status } : r)));
    // Update status in Supabase Cloud
    updateReportStatusInSupabase(id, status).catch((err) => {
      console.warn('Supabase status update notice:', err);
    });
  };

  const handleDeleteReport = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data verifikasi rumah ini?')) {
      setReports(reports.filter((r) => r.id !== id));
      if (detailModalReport?.id === id) setDetailModalReport(null);
      // Delete from Supabase Cloud
      deleteReportFromSupabase(id).catch((err) => {
        console.warn('Supabase delete notice:', err);
      });
    }
  };

  const totalStimulusBudget = reports.reduce((acc, curr) => acc + (curr.estimatedBudgetIDR || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewAssessment={handleOpenNewAssessment}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Administrative Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reportCount={reports.length}
            totalStimulusBudget={totalStimulusBudget}
          />
        </div>

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              reports={reports}
              onSelectReport={handleSelectReport}
              onOpenNewAssessment={handleOpenNewAssessment}
              onOpenPrintModal={(r) => setPrintModalReport(r)}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'reports' && (
            <ReportListTable
              reports={reports}
              onSelectReport={handleSelectReport}
              onOpenPrintModal={(r) => setPrintModalReport(r)}
              onUpdateStatus={handleUpdateStatus}
              onDeleteReport={handleDeleteReport}
              onOpenNewAssessment={handleOpenNewAssessment}
            />
          )}

          {activeTab === 'new-assessment' && (
            <NewAssessmentForm
              onSaveReport={handleSaveNewReport}
              onCancel={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'guidelines' && <DisperkimGuidelines />}
        </main>
      </div>

      {/* Modals */}
      <ReportDetailModal
        report={detailModalReport}
        isOpen={Boolean(detailModalReport)}
        onClose={() => setDetailModalReport(null)}
        onOpenPrintModal={(r) => {
          setDetailModalReport(null);
          setPrintModalReport(r);
        }}
      />

      <OfficialReportPrintModal
        report={printModalReport}
        isOpen={Boolean(printModalReport)}
        onClose={() => setPrintModalReport(null)}
      />

      <SupabaseSyncModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        reports={reports}
        onMergeReports={(merged) => setReports(merged)}
      />
    </div>
  );
}
