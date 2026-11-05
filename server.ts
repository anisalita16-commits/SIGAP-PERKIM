import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  // JSON payload parser
  app.use(express.json({ limit: '20mb' }));

  // API Route: AI Rapid Damage Assessment (JITUPASNA & Pengkajian Teknis PUPR/BNPB)
  app.post('/api/analyze-damage', async (req, res) => {
    try {
      const { description, houseCategory, disasterType, photoBase64, mimeType } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback rule-based analysis if API key is temporarily unavailable
        const fallback = generateRuleBasedAssessment(description, disasterType, houseCategory);
        return res.json(fallback);
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemPrompt = `Anda adalah Ahli Asesmen Kerusakan Perumahan Pascabencana dari Dinas Perumahan dan Kawasan Permukiman (DISPERKIM) Kabupaten Konawe, Provinsi Sulawesi Tenggara.
Analisis data kerusakan perumahan (termasuk dampak luapan Sungai Konaweha/DAS Lahumbuti, gempa Sesar Lawanopo, tanah longsor Asinua, maupun puting beliung) berdasarkan standar Permen PUPR No. 29/PRT/M/2018 dan Pedoman BNPB No. 04/2012:
- Rusak Ringan (RR): Kerusakan <30%, komponen non-struktural (retak rambut dinding, genteng/seng lepas, plafon jatuh). Struktur utama (kolom, balok, pondasi) utuh & layak huni. Nilai stimulan acuan: Rp 15.000.000.
- Rusak Sedang (RS): Kerusakan 30% - 65%, sebagian dinding roboh, sebagian kolom patah/retak struktural tetapi rangka atap tidak runtuh total. Perlu perbaikan perkuatan/retrofitting sebelum dihuni. Nilai stimulan acuan: Rp 30.000.000.
- Rusak Berat (RB): Kerusakan >65%, sebagian besar struktur roboh, terendam lumpur ekstrem, bahaya ambruk atau berada di zona merah rawan longsor/sempadan sungai aktif. Tidak layak huni, butuh bangun baru atau relokasi hunian tetap (Huntap). Nilai stimulan acuan: Rp 60.000.000.

Berdasarkan parameter berikut:
- Jenis Bencana: ${disasterType || 'Umum'}
- Tipe Bangunan: ${houseCategory || 'Rumah Tinggal Sederhana (Tembok/Setengah Tembok)'}
- Laporan & Catatan Kerusakan: ${description || 'Pemeriksaan kondisi fisik lapangan'}

Keluarkan respon HANYA berupa JSON valid sesuai skema berikut tanpa backticks atau teks tambahan:
{
  "damageLevel": "Rusak Ringan" | "Rusak Sedang" | "Rusak Berat",
  "damageScorePercentage": 45,
  "isHabitable": false,
  "structuralDamage": "Rincian kerusakan pondasi, sloof, kolom praktis, ring balok, rangka atap",
  "nonStructuralDamage": "Rincian kerusakan dinding pasangan bata, plafon, penutup genteng, lantai, kusen",
  "recommendedAction": "Perbaikan Ringan Swadaya" | "Retrofitting Perkuatan Struktur" | "Pembangunan Baru / Relokasi Huntap",
  "estimatedBudgetIDR": 30000000,
  "materialRequirements": [
    { "item": "Semen Portland (PC)", "volume": "25", "unit": "Sak", "notes": "Untuk pasangan dinding dan plesteran perbaikan" },
    { "item": "Pasir Pasang", "volume": "4", "unit": "M3", "notes": "Agregat halus spesi mortal" },
    { "item": "Besi Beton Polos Dia. 10mm", "volume": "8", "unit": "Batang", "notes": "Perkuatan sengkang dan tulangan kolom praktis" }
  ],
  "safetyMeasures": [
    "Pasang penyangga kayu/bambu darurat pada bagian atap yang miring",
    "Hindari memasuki ruangan jika terjadi gempa susulan",
    "Matikan MCB instalasi listrik yang tertimpa puing"
  ],
  "disperkimTechnicalNotes": "Catatan rekomendasi verifikator teknis Disperkim untuk dimasukkan ke dalam Berita Acara Verifikasi Lapangan (BAVL)."
}`;

      const contents: any[] = [];
      if (photoBase64 && mimeType) {
        const cleanBase64 = photoBase64.replace(/^data:image\/\w+;base64,/, '');
        contents.push({
          inlineData: {
            mimeType: mimeType,
            data: cleanBase64
          }
        });
      }
      contents.push({ text: systemPrompt });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text?.trim() || '{}';
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (parseErr) {
        // Fallback clean regex
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return res.json(JSON.parse(jsonMatch[0]));
        }
        throw parseErr;
      }
    } catch (error: any) {
      console.error('AI Assessment Error:', error);
      const fallback = generateRuleBasedAssessment(req.body.description, req.body.disasterType, req.body.houseCategory);
      return res.json(fallback);
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'SIGAP-PERKIM API Service', timestamp: new Date().toISOString() });
  });

  // Setup Vite dev server or serve static build
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`SIGAP-PERKIM Server running on port ${port} (mode: ${isProduction ? 'prod' : 'dev'})`);
  });
}

function generateRuleBasedAssessment(description = '', disasterType = 'Gempa Bumi', houseCategory = 'Rumah Tembok'): any {
  const descLower = description.toLowerCase();
  const isHeavy = descLower.includes('runtuh') || descLower.includes('ambruk') || descLower.includes('roboh') || descLower.includes('hancur') || descLower.includes('patah total') || descLower.includes('miring parah');
  const isMedium = descLower.includes('retak besar') || descLower.includes('terkelupas') || descLower.includes('sebagian dinding') || descLower.includes('kuda-kuda miring');

  if (isHeavy) {
    return {
      damageLevel: "Rusak Berat",
      damageScorePercentage: 78,
      isHabitable: false,
      structuralDamage: "Kolom struktur utama mengalami kegagalan geser/hancur, dinding pemikul runtuh >60%, rangka atap deformasi permanen.",
      nonStructuralDamage: "Plafon ambruk total, kusen jendela lepas terpelintir, instalasi sanitasi dan saluran air terputus.",
      recommendedAction: "Pembangunan Baru / Relokasi Huntap",
      estimatedBudgetIDR: 60000000,
      materialRequirements: [
        { item: "Semen Portland (PC)", volume: "65", unit: "Sak", notes: "Pondasi batu kali, sloof 15/20 dan kolom praktis" },
        { item: "Besi Beton Ulir/Polos 10mm & 8mm", volume: "32", unit: "Batang", notes: "Penulangan tahan gempa standar RISHA/PUPR" },
        { item: "Bata Ringan / Batako Pres", volume: "12", unit: "M3", notes: "Dinding kedap air dan perkuatan angkur" },
        { item: "Rangka Baja Ringan C75", volume: "24", unit: "Batang", notes: "Kuda-kuda atap ringan tahan guncangan" },
        { item: "Atap Spandek / Seng Gelombang", volume: "35", unit: "Lembar", notes: "Penutup atap ringan" }
      ],
      safetyMeasures: [
        "Pasang garis barikade pembatas bahaya di sekitar perimeter bangunan",
        "Dilarang bermalam di dalam rumah karena bahaya keruntuhan susulan",
        "Koordinasikan segera dengan Posko TRC Disperkim untuk alokasi tenda keluarga / Huntara"
      ],
      disperkimTechnicalNotes: "Memenuhi kriteria Bantuan Stimulan Rumah Rusak Berat (SK Rekonstruksi PUPR). Segera jadwalkan verifikasi Berita Acara Uji Kelayakan Struktural Lapangan."
    };
  }

  if (isMedium) {
    return {
      damageLevel: "Rusak Sedang",
      damageScorePercentage: 45,
      isHabitable: false,
      structuralDamage: "Retak diagonal pada bidang sambungan kolom-dinding, sebagian sloof menggantung akibat penurunan tanah lokal.",
      nonStructuralDamage: "Dinding pengisi retak tembus, 30% genteng merosot, plesteran rontok di beberapa sisi ruangan.",
      recommendedAction: "Retrofitting Perkuatan Struktur",
      estimatedBudgetIDR: 30000000,
      materialRequirements: [
        { item: "Semen Portland (PC)", volume: "30", unit: "Sak", notes: "Grouting spesi semen dan plesteran ulang" },
        { item: "Kawat Wiremesh / Kawat Ayam", volume: "3", unit: "Roll", notes: "Perkuatan ferosemen dinding retak" },
        { item: "Pasir Pasang", volume: "5", unit: "M3", notes: "Campuran spesi kedap air 1:3" },
        { item: "Genteng / Seng Pengganti", volume: "100", unit: "Buah", notes: "Mengganti genteng pecah" }
      ],
      safetyMeasures: [
        "Pemberian skor/penopang pada balok ring atap yang mengalami lendutan",
        "Pindahkan barang berharga ke ruangan yang tidak mengalami retak dinding utama"
      ],
      disperkimTechnicalNotes: "Kategori Rusak Sedang (RS). Dapat dipulihkan melalui skema Bantuan Perbaikan Rumah Swadaya dengan pendampingan fasilitator teknik Disperkim."
    };
  }

  return {
    damageLevel: "Rusak Ringan",
    damageScorePercentage: 20,
    isHabitable: true,
    structuralDamage: "Struktur utama (pondasi, sloof, kolom praktis dan ring balok) dalam keadaan kokoh dan tidak mengalami deformasi plastis.",
    nonStructuralDamage: "Retak rambut pada plesteran dinding (<2mm), beberapa keping genteng bergeser, plafon tripleks/gypsum basah/copot setempat.",
    recommendedAction: "Perbaikan Ringan Swadaya",
    estimatedBudgetIDR: 15000000,
    materialRequirements: [
      { item: "Semen Portland (PC)", volume: "10", unit: "Sak", notes: "Plesteran dan acian dinding" },
      { item: "Cat Dinding Eksterior / Interior", volume: "2", unit: "Pail", notes: "Finishing dinding pasca penambalan" },
      { item: "Plafon Gypsum / GRC 4mm", volume: "8", unit: "Lembar", notes: "Penggantian plafon rusak" },
      { item: "Paku & Kaso Kayu", volume: "1", unit: "Paket", notes: "Perbaikan rangka plafon" }
    ],
    safetyMeasures: [
      "Perbaiki segera penutup atap sebelum terjadi hujan untuk mencegah kebocoran instalasi listrik",
      "Bersihkan puing pecahan kaca atau genteng di pekarangan rumah"
    ],
    disperkimTechnicalNotes: "Rumah layak huni dengan perbaikan minor. Masuk dalam daftar penerima stimulan bahan bangunan Rusak Ringan."
  };
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
