import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  AlertOctagon,
  Building,
  CheckCircle2,
  Compass,
  Waves
} from 'lucide-react';
import { HouseDamageReport, DamageLevel } from '../types/disaster';

interface DisasterGisMapProps {
  reports: HouseDamageReport[];
  onSelectReport: (report: HouseDamageReport) => void;
}

export const DisasterGisMap: React.FC<DisasterGisMapProps> = ({
  reports,
  onSelectReport
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [showRiverBasin, setShowRiverBasin] = useState<boolean>(true);
  const [showFaultLine, setShowFaultLine] = useState<boolean>(true);
  const [showHazardZones, setShowHazardZones] = useState<boolean>(true);
  const [selectedReport, setSelectedReport] = useState<HouseDamageReport | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    if (filterLevel === 'ALL') return true;
    return r.damageLevel === filterLevel;
  });

  // Calculate coordinates mapping for Kabupaten Konawe
  // Approx bounds: lat -3.85 to -4.10, lng 121.90 to 122.38
  const minLat = -4.10;
  const maxLat = -3.85;
  const minLng = 121.90;
  const maxLng = 122.38;

  const getSvgCoordinates = (lat: number, lng: number) => {
    // X axis from lng: minLng -> 40, maxLng -> 720
    const x = ((lng - minLng) / (maxLng - minLng)) * 680 + 40;
    // Y axis from lat: maxLat (north) -> 40, minLat (south) -> 400
    const y = ((maxLat - lat) / (maxLat - minLat)) * 360 + 40;
    return { x: Math.max(30, Math.min(730, x)), y: Math.max(30, Math.min(410, y)) };
  };

  const getPinColor = (level: DamageLevel) => {
    switch (level) {
      case 'Rusak Berat':
        return '#dc2626'; // Red
      case 'Rusak Sedang':
        return '#d97706'; // Amber
      case 'Rusak Ringan':
        return '#059669'; // Emerald
      default:
        return '#475569';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
      {/* Map Control Bar */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/40">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            Peta GIS Sebaran Kerusakan Perumahan Kabupaten Konawe
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono-numbers">
            {filteredReports.length} Titik Terplot
          </span>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterLevel('ALL')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filterLevel === 'ALL'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterLevel('Rusak Berat')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                filterLevel === 'Rusak Berat'
                  ? 'bg-red-500 text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-red-600'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-0.5" />
              Rusak Berat
            </button>
            <button
              onClick={() => setFilterLevel('Rusak Sedang')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                filterLevel === 'Rusak Sedang'
                  ? 'bg-amber-500 text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block mr-0.5" />
              Rusak Sedang
            </button>
            <button
              onClick={() => setFilterLevel('Rusak Ringan')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                filterLevel === 'Rusak Ringan'
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block mr-0.5" />
              Rusak Ringan
            </button>
          </div>

          {/* Layer toggles */}
          <button
            onClick={() => setShowRiverBasin(!showRiverBasin)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              showRiverBasin
                ? 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            DAS Konaweha
          </button>
          <button
            onClick={() => setShowFaultLine(!showFaultLine)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              showFaultLine
                ? 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            Sesar Lawanopo
          </button>
          <button
            onClick={() => setShowHazardZones(!showHazardZones)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              showHazardZones
                ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            Zona Sempadan Banjir
          </button>
        </div>
      </div>

      {/* SVG GIS Map Canvas (Konawe Topography) */}
      <div className="relative w-full h-[410px] bg-slate-100 dark:bg-slate-950 overflow-hidden select-none">
        <svg
          viewBox="0 0 760 450"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            <pattern id="konawe-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800/80" strokeWidth="0.75" />
            </pattern>
            <linearGradient id="flood-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="landslide-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <rect width="760" height="450" fill="url(#konawe-grid)" />

          {/* Kecamatan Boundaries in Kabupaten Konawe */}
          <g className="district-polygons">
            {/* 1. Asinua & Latoma (Pegunungan Hulu Barat) */}
            <path
              d="M 30,30 L 190,40 L 170,220 L 40,240 Z"
              className="fill-amber-50/50 dark:fill-amber-950/20 stroke-slate-300 dark:stroke-slate-700"
              strokeWidth="1.5"
            />
            <text x="60" y="80" className="fill-amber-800/70 dark:fill-amber-400/60 text-[10px] font-bold tracking-wider">
              KEC. ASINUA / LATOMA (HULU)
            </text>

            {/* 2. Unaaha (Ibukota Kabupaten Konawe) */}
            <path
              d="M 190,40 L 370,50 L 360,250 L 170,220 Z"
              className="fill-emerald-100/40 dark:fill-emerald-950/30 stroke-emerald-400 dark:stroke-emerald-700"
              strokeWidth="1.5"
            />
            <text x="220" y="150" className="fill-emerald-900/80 dark:fill-emerald-300/80 text-[11px] font-extrabold tracking-wider">
              KEC. UNAAHA (PUSAT PEMKAB)
            </text>

            {/* 3. Wawotobi */}
            <path
              d="M 370,50 L 520,60 L 510,240 L 360,250 Z"
              className="fill-blue-50/40 dark:fill-blue-950/20 stroke-slate-300 dark:stroke-slate-700"
              strokeWidth="1.5"
            />
            <text x="400" y="130" className="fill-slate-600 dark:fill-slate-400 text-[10px] font-bold tracking-wider">
              KEC. WAWOTOBI (BENDUNG)
            </text>

            {/* 4. Pondidaha & Wonggeduku */}
            <path
              d="M 520,60 L 680,70 L 670,260 L 510,240 Z"
              className="fill-slate-200/30 dark:fill-slate-800/20 stroke-slate-300 dark:stroke-slate-700"
              strokeWidth="1.5"
            />
            <text x="540" y="140" className="fill-slate-500 dark:fill-slate-400 text-[10px] font-semibold tracking-wider">
              KEC. PONDIDAHA &amp; WONGGEDUKU
            </text>

            {/* 5. Lambuya & Uepai (Konawe Selatan) */}
            <path
              d="M 170,220 L 360,250 L 340,410 L 160,390 Z"
              className="fill-slate-200/40 dark:fill-slate-800/25 stroke-slate-300 dark:stroke-slate-700"
              strokeWidth="1.5"
            />
            <text x="210" y="320" className="fill-slate-500 dark:fill-slate-400 text-[10px] font-semibold tracking-wider">
              KEC. LAMBUYA &amp; UEPAI
            </text>

            {/* 6. Sampara & Besulutu (Hilir Muara) */}
            <path
              d="M 510,240 L 670,260 L 730,420 L 490,410 Z"
              className="fill-slate-200/30 dark:fill-slate-800/20 stroke-slate-300 dark:stroke-slate-700"
              strokeWidth="1.5"
            />
            <text x="540" y="340" className="fill-slate-500 dark:fill-slate-400 text-[10px] font-semibold tracking-wider">
              KEC. SAMPARA (HILIR DAS)
            </text>
          </g>

          {/* Sempadan DAS Konaweha - Flood Hazard Zone */}
          {showHazardZones && (
            <g className="flood-hazard-zones">
              <polygon
                points="170,160 380,170 530,190 680,240 680,290 510,270 350,230 180,200"
                fill="url(#flood-gradient)"
                className="stroke-sky-500/60"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x="320" y="215" className="fill-sky-700 dark:fill-sky-300 text-[9px] font-bold uppercase tracking-wider">
                Zona Sempadan Rawan Luapan Banjir Sungai Konaweha
              </text>
            </g>
          )}

          {/* Mountain Landslide Hazard Zone (Asinua / Latoma) */}
          {showHazardZones && (
            <g className="landslide-hazard">
              <polygon
                points="40,50 160,60 140,170 50,150"
                fill="url(#landslide-gradient)"
                className="stroke-rose-500/60"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text x="50" y="110" className="fill-rose-700 dark:fill-rose-300 text-[8px] font-bold uppercase tracking-wider">
                Zona Tebing Longsor Asinua
              </text>
            </g>
          )}

          {/* Sungai Konaweha (Konaweha River Course) */}
          {showRiverBasin && (
            <g className="konaweha-river">
              <path
                d="M 60,60 Q 200,160 320,180 T 480,200 T 630,260 T 730,370"
                fill="none"
                className="stroke-sky-500/80 dark:stroke-sky-400/80"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Tributary: Sungai Lahumbuti */}
              <path
                d="M 280,410 Q 320,310 320,180"
                fill="none"
                className="stroke-sky-400/70 dark:stroke-sky-500/70"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text x="430" y="175" className="fill-sky-800 dark:fill-sky-300 text-[9px] font-extrabold tracking-wider">
                SUNGAI KONAWEHA
              </text>
              <text x="325" y="320" className="fill-sky-600 dark:fill-sky-400 text-[8px] font-bold">
                S. Lahumbuti
              </text>
            </g>
          )}

          {/* Sesar Lawanopo (Sulawesi Tenggara Active Fault) */}
          {showFaultLine && (
            <g className="fault-lawanopo">
              <path
                d="M 120,420 L 320,260 L 580,70"
                fill="none"
                className="stroke-rose-600 dark:stroke-rose-500"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <circle cx="320" cy="260" r="9" className="fill-rose-500/20 stroke-rose-600" strokeWidth="1" />
              <circle cx="320" cy="260" r="3.5" className="fill-rose-600" />
              <text x="335" y="264" className="fill-rose-700 dark:fill-rose-300 text-[10px] font-bold">
                Jalur Sesar Lawanopo Darat M5.4
              </text>
            </g>
          )}

          {/* House Pins for Kabupaten Konawe */}
          {filteredReports.map((report) => {
            const coords = getSvgCoordinates(report.address.coordinates.lat, report.address.coordinates.lng);
            const isSelected = selectedReport?.id === report.id;
            const color = getPinColor(report.damageLevel);

            return (
              <g
                key={report.id}
                className="cursor-pointer transition-transform duration-200 hover:scale-125"
                onClick={() => {
                  setSelectedReport(report);
                  onSelectReport(report);
                }}
              >
                {/* Ping wave effect for Rusak Berat */}
                {report.damageLevel === 'Rusak Berat' && (
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isSelected ? 16 : 11}
                    className="fill-red-500/25 stroke-red-500/40"
                    strokeWidth="1"
                  />
                )}

                {/* Base Pin Circle */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isSelected ? 9 : 6.5}
                  fill={color}
                  className="stroke-white dark:stroke-slate-900 shadow-md"
                  strokeWidth="2"
                />

                {/* Label on select */}
                {isSelected && (
                  <g>
                    <rect
                      x={coords.x - 65}
                      y={coords.y - 34}
                      width="130"
                      height="22"
                      rx="4"
                      className="fill-slate-900 dark:fill-white"
                    />
                    <text
                      x={coords.x}
                      y={coords.y - 19}
                      textAnchor="middle"
                      className="fill-white dark:fill-slate-900 text-[9px] font-bold"
                    >
                      {report.residentName} ({report.damageLevel})
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Map Legend */}
        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs text-xs space-y-1.5">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Legenda Bencana Kab. Konawe
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
            <span className="text-[11px] text-slate-700 dark:text-slate-300">
              Rusak Berat (Stimulan Rp 60 Jt / Relokasi Huntap)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span className="text-[11px] text-slate-700 dark:text-slate-300">
              Rusak Sedang (Stimulan Rp 30 Jt / Retrofit)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
            <span className="text-[11px] text-slate-700 dark:text-slate-300">
              Rusak Ringan (Stimulan Rp 15 Jt / Swadaya)
            </span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
            title="Perbesar Peta"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.25))}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
            title="Perkecil Peta"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
            title="Reset Posisi Peta"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Selected Point Quick Bar */}
      {selectedReport && (
        <div className="p-3 bg-emerald-50/60 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                selectedReport.damageLevel === 'Rusak Berat'
                  ? 'bg-red-600'
                  : selectedReport.damageLevel === 'Rusak Sedang'
                  ? 'bg-amber-500'
                  : 'bg-emerald-600'
              }`}
            />
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {selectedReport.residentName}
              </span>
              <span className="text-slate-500 dark:text-slate-400 ml-2">
                NIK: <span className="font-mono-numbers">{selectedReport.nik}</span> · {selectedReport.address.village}, Kec. {selectedReport.address.district} (Kab. Konawe)
              </span>
            </div>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 dark:text-slate-300">
              Skor Kerusakan: <strong className="font-mono-numbers">{selectedReport.damageScorePercentage}%</strong> ({selectedReport.damageLevel})
            </span>
          </div>

          <button
            onClick={() => onSelectReport(selectedReport)}
            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-md font-medium text-xs transition-colors cursor-pointer"
          >
            Buka Berkas Lengkap
          </button>
        </div>
      )}
    </div>
  );
};
