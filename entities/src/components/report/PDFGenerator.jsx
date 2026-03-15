import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { getMineralConfig } from '../shared/MineralIcon';

export default function PDFGenerator({ report }) {
  const [generating, setGenerating] = useState(false);
  const coverRef = useRef(null);
  const summaryRef = useRef(null);
  const statsRef = useRef(null);
  const zonesRef = useRef(null);
  const envRef = useRef(null);

  const config = getMineralConfig(report.mineral);

  const generatePDF = async () => {
    setGenerating(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;

      // Função auxiliar para capturar e adicionar ao PDF
      const captureAndAdd = async (ref, addNewPage = true) => {
        if (!ref.current) return;
        
        const canvas = await html2canvas(ref.current, {
          scale: 2,
          backgroundColor: '#0a0a0a',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (addNewPage) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, Math.min(imgHeight, pageHeight - 20));
      };

      // Página 1: Capa
      await captureAndAdd(coverRef, false);

      // Página 2: Resumo Executivo
      await captureAndAdd(summaryRef);

      // Página 3: Estatísticas
      if (statsRef.current) {
        await captureAndAdd(statsRef);
      }

      // Página 4: Top Zones
      if (zonesRef.current) {
        await captureAndAdd(zonesRef);
      }

      // Página 5: Indicadores Ambientais
      if (envRef.current) {
        await captureAndAdd(envRef);
      }

      // Salvar PDF
      const fileName = `CO2IA_${report.mineral}_${report.title.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setGenerating(false);
    }
  };

  const topZones = report.top_zones ? JSON.parse(report.top_zones) : [];
  const statistics = report.statistics ? JSON.parse(report.statistics) : null;
  const envIndicators = report.environmental_indicators ? JSON.parse(report.environmental_indicators) : null;

  return (
    <>
      <Button
        onClick={generatePDF}
        disabled={generating}
        className="bg-[#d4a853] hover:bg-[#c49843] text-black font-semibold"
      >
        {generating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Gerando PDF...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download PDF Executivo
          </>
        )}
      </Button>

      {/* Hidden PDF Content */}
      <div className="fixed -left-[9999px] top-0">
        {/* Capa */}
        <div
          ref={coverRef}
          className="w-[794px] h-[1123px] flex flex-col justify-between p-16"
          style={{ backgroundColor: '#0a0a0a', fontFamily: 'Montserrat' }}
        >
          {/* Logo */}
          {report.logo_url && (
            <div className="flex justify-center mb-8">
              <img src={report.logo_url} alt="Logo" className="max-h-20 object-contain" />
            </div>
          )}

          {/* Centro */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div
              className="w-24 h-24 rounded-2xl mb-8 flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: config.color }} />
            </div>

            <h1 className="text-6xl font-black text-white mb-4 tracking-tight">{report.title}</h1>
            
            <div className="h-1 w-32 mb-6" style={{ backgroundColor: config.color }} />

            <p className="text-2xl font-semibold mb-2" style={{ color: config.color }}>
              Análise de {config.label}
            </p>

            <p className="text-lg text-gray-400 mb-8">
              Inteligência Mineral & Regeneração Ambiental
            </p>

            {report.mineral_score && (
              <div className="mt-8 p-6 rounded-2xl border" style={{ borderColor: config.color, backgroundColor: `${config.color}10` }}>
                <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Potential Score</p>
                <p className="text-5xl font-black" style={{ color: config.color }}>
                  {report.mineral_score.toFixed(0)}
                </p>
              </div>
            )}
          </div>

          {/* Rodapé */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-800">
            <div>
              <p className="text-3xl font-black text-white tracking-tight">CØ2.IA</p>
              <p className="text-xs text-gray-500 mt-1">Mineral Intelligence Platform</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">
                {report.created_date ? format(new Date(report.created_date), 'dd MMMM yyyy') : ''}
              </p>
              {report.start_date && report.end_date && (
                <p className="text-xs text-gray-500 mt-1">
                  Período: {report.start_date} a {report.end_date}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div
          ref={summaryRef}
          className="w-[794px] h-[1123px] p-16"
          style={{ backgroundColor: '#0a0a0a', fontFamily: 'Montserrat' }}
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8" style={{ backgroundColor: config.color }} />
              <h2 className="text-3xl font-black text-white">Resumo Executivo</h2>
            </div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Executive Summary</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <p className="text-base text-gray-300 leading-relaxed">
              {report.summary || 'Resumo não disponível.'}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Mineral</p>
              <p className="text-2xl font-bold text-white">{config.label}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Score</p>
              <p className="text-2xl font-bold" style={{ color: config.color }}>
                {report.mineral_score?.toFixed(1) || 'N/A'}
              </p>
            </div>
            {statistics && (
              <>
                <div className="bg-gray-900 rounded-xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Área Total</p>
                  <p className="text-2xl font-bold text-white">
                    {statistics.total_area_km2?.toFixed(0)} km²
                  </p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Alto Potencial</p>
                  <p className="text-2xl font-bold" style={{ color: config.color }}>
                    {statistics.high_potential_pct?.toFixed(1)}%
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="absolute bottom-16 left-16 right-16 flex justify-between items-center pt-8 border-t border-gray-800">
            <p className="text-xl font-black text-white">CØ2.IA</p>
            <p className="text-sm text-gray-500">Página 2</p>
          </div>
        </div>

        {/* Estatísticas */}
        {statistics && (
          <div
            ref={statsRef}
            className="w-[794px] h-[1123px] p-16"
            style={{ backgroundColor: '#0a0a0a', fontFamily: 'Montserrat' }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8" style={{ backgroundColor: config.color }} />
                <h2 className="text-3xl font-black text-white">Estatísticas</h2>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Statistical Analysis</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Média', value: statistics.mean?.toFixed(2) },
                { label: 'Mediana', value: statistics.median?.toFixed(2) },
                { label: 'Desvio Padrão', value: statistics.std_dev?.toFixed(2) },
                { label: 'Mínimo', value: statistics.min?.toFixed(2) },
                { label: 'Máximo', value: statistics.max?.toFixed(2) },
                { label: 'Área Total', value: `${statistics.total_area_km2?.toFixed(0)} km²` },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-900 rounded-xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <p className="text-lg font-bold text-white mb-4">Distribuição de Potencial</p>
              <div className="h-64 flex items-end gap-4">
                {[
                  { label: 'Min', value: statistics.min, height: 20 },
                  { label: 'Média', value: statistics.mean, height: 60 },
                  { label: 'Mediana', value: statistics.median, height: 55 },
                  { label: 'Máx', value: statistics.max, height: 100 },
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full rounded-t-lg transition-all"
                      style={{
                        height: `${bar.height}%`,
                        backgroundColor: config.color,
                        opacity: 0.3 + idx * 0.2,
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-2">{bar.label}</p>
                    <p className="text-sm font-bold text-white">{bar.value?.toFixed(1)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-16 left-16 right-16 flex justify-between items-center pt-8 border-t border-gray-800">
              <p className="text-xl font-black text-white">CØ2.IA</p>
              <p className="text-sm text-gray-500">Página 3</p>
            </div>
          </div>
        )}

        {/* Top Zones */}
        {topZones.length > 0 && (
          <div
            ref={zonesRef}
            className="w-[794px] h-[1123px] p-16"
            style={{ backgroundColor: '#0a0a0a', fontFamily: 'Montserrat' }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8" style={{ backgroundColor: config.color }} />
                <h2 className="text-3xl font-black text-white">Zonas de Alto Potencial</h2>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Top Potential Zones</p>
            </div>

            <div className="space-y-4">
              {topZones.map((zone, idx) => (
                <div key={idx} className="bg-gray-900 rounded-xl p-6 flex items-center gap-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black"
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                  >
                    #{idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{zone.name}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Score</p>
                        <p className="font-bold" style={{ color: config.color }}>
                          {zone.score?.toFixed(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Área</p>
                        <p className="font-bold text-white">{zone.area_km2?.toFixed(0)} km²</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Coordenadas</p>
                        <p className="font-mono text-xs text-white">
                          {zone.lat?.toFixed(4)}, {zone.lon?.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-16 left-16 right-16 flex justify-between items-center pt-8 border-t border-gray-800">
              <p className="text-xl font-black text-white">CØ2.IA</p>
              <p className="text-sm text-gray-500">Página 4</p>
            </div>
          </div>
        )}

        {/* Indicadores Ambientais */}
        {envIndicators && (
          <div
            ref={envRef}
            className="w-[794px] h-[1123px] p-16"
            style={{ backgroundColor: '#0a0a0a', fontFamily: 'Montserrat' }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8" style={{ backgroundColor: '#34d399' }} />
                <h2 className="text-3xl font-black text-white">Indicadores Ambientais</h2>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Environmental Indicators</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { label: 'NDVI Médio', value: envIndicators.ndvi_mean?.toFixed(3), color: '#34d399' },
                { label: 'Proximidade de Água', value: `${envIndicators.water_proximity_km?.toFixed(1)} km`, color: '#4a9eff' },
                { label: 'Risco de Desflorestamento', value: envIndicators.deforestation_risk, color: '#eab308' },
                { label: 'Score de Sequestro de Carbono', value: envIndicators.carbon_sequestration_score?.toFixed(1), color: '#34d399' },
                { label: 'Sensibilidade Ambiental', value: envIndicators.environmental_sensitivity, color: '#a0714f' },
              ].map((indicator, idx) => (
                <div key={idx} className="bg-gray-900 rounded-xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">{indicator.label}</p>
                  <p className="text-3xl font-black" style={{ color: indicator.color }}>
                    {indicator.value || 'N/A'}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-4">Análise de Sustentabilidade</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Os indicadores ambientais apresentados refletem a condição ecológica da região analisada.
                O NDVI (Normalized Difference Vegetation Index) indica a densidade de vegetação, enquanto
                a proximidade de recursos hídricos é crucial para a manutenção de ecossistemas saudáveis.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                A análise de sensibilidade ambiental e risco de desflorestamento permite o planejamento
                de atividades minerárias com menor impacto ecológico, alinhado aos princípios ESG e
                regeneração ambiental da CØ2.IA.
              </p>
            </div>

            <div className="absolute bottom-16 left-16 right-16 flex justify-between items-center pt-8 border-t border-gray-800">
              <p className="text-xl font-black text-white">CØ2.IA</p>
              <p className="text-sm text-gray-500">Página 5</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}