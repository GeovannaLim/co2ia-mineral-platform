import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';

export default function ProgressChart({ reports }) {
  const prepareChartData = () => {
    const completedReports = reports
      .filter((r) => r.status === 'completed' && r.created_date)
      .sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

    let cumulativeCO2 = 0;
    let cumulativeArea = 0;
    let cumulativeScore = 0;

    return completedReports.map((report, index) => {
      const envIndicators = report.environmental_indicators ? JSON.parse(report.environmental_indicators) : null;
      const stats = report.statistics ? JSON.parse(report.statistics) : null;

      const co2Score = envIndicators?.carbon_sequestration_score || 0;
      const area = stats?.total_area_km2 || 0;
      const mineralScore = report.mineral_score || 0;

      cumulativeCO2 += co2Score;
      cumulativeArea += area;
      cumulativeScore += mineralScore;

      return {
        date: format(parseISO(report.created_date), 'MMM yyyy'),
        fullDate: report.created_date,
        carbonScore: parseFloat((cumulativeCO2 / (index + 1)).toFixed(1)),
        areaKm2: parseFloat(cumulativeArea.toFixed(0)),
        envScore: parseFloat((cumulativeScore / (index + 1)).toFixed(1)),
        reportCount: index + 1,
      };
    });
  };

  const data = prepareChartData();

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-[#2a2a2a] p-12 text-center" style={{ backgroundColor: '#141414' }}>
        <p className="text-sm text-[#888]">Sem dados suficientes para gerar gráfico</p>
        <p className="text-xs text-[#666] mt-1">Complete relatórios para visualizar progresso ambiental</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div
        className="rounded-lg border border-[#2a2a2a] p-3 shadow-lg"
        style={{ backgroundColor: '#141414' }}
      >
        <p className="text-xs font-semibold text-white mb-2">{payload[0].payload.date}</p>
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-2 text-xs mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[#888]">{entry.name}:</span>
            <span className="font-semibold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-[#2a2a2a] p-6" style={{ backgroundColor: '#141414' }}>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
        Progresso Ambiental ao Longo do Tempo
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#888', fontSize: 11 }}
              stroke="#2a2a2a"
            />
            <YAxis tick={{ fill: '#888', fontSize: 11 }} stroke="#2a2a2a" />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="carbonScore"
              stroke="#34d399"
              strokeWidth={2.5}
              dot={{ fill: '#34d399', r: 4 }}
              name="Score de Carbono"
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="areaKm2"
              stroke="#4a9eff"
              strokeWidth={2.5}
              dot={{ fill: '#4a9eff', r: 4 }}
              name="Área Total (km²)"
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="envScore"
              stroke="#d4a853"
              strokeWidth={2.5}
              dot={{ fill: '#d4a853', r: 4 }}
              name="Score Ambiental"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}