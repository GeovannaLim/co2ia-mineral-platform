import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Upload, Loader2, ArrowLeft, Zap } from 'lucide-react';
import MineralIcon, { getMineralConfig } from '../components/shared/MineralIcon';
import ROIInput from '../components/report/ROIInput';

const minerals = ['gold', 'copper', 'iron', 'diamond', 'bauxite'];

export default function GenerateReport() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const preselected = urlParams.get('mineral');

  const [form, setForm] = useState({
    title: '',
    mineral: preselected || '',
    start_date: '',
    end_date: '',
    roi_data: '',
    logo_url: '',
  });
  const [uploading, setUploading] = useState(false);

  const createMutation = useMutation({
    mutationFn: async (data) => {
      // Create report with pending status
      const report = await base44.entities.Report.create({
        ...data,
        status: 'processing',
      });

      // Simulate analysis (in production, this calls your Python backend)
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a mineral intelligence analysis system for the CØ2.IA platform. Generate a realistic mineral analysis report for ${data.mineral} mining potential.

ROI Data: ${data.roi_data || 'South America region'}
Date range: ${data.start_date} to ${data.end_date}

Generate realistic data for:
1. mineral_score (0-100)
2. top_zones (array of 5 zones with name, score, area_km2, coordinates)
3. statistics (mean, median, std_dev, min, max, total_area_km2, high_potential_pct)
4. environmental_indicators (ndvi_mean, water_proximity_km, deforestation_risk, carbon_sequestration_score, environmental_sensitivity)
5. summary (executive summary paragraph about findings)`,
        response_json_schema: {
          type: 'object',
          properties: {
            mineral_score: { type: 'number' },
            top_zones: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  score: { type: 'number' },
                  area_km2: { type: 'number' },
                  lat: { type: 'number' },
                  lon: { type: 'number' },
                },
              },
            },
            statistics: {
              type: 'object',
              properties: {
                mean: { type: 'number' },
                median: { type: 'number' },
                std_dev: { type: 'number' },
                min: { type: 'number' },
                max: { type: 'number' },
                total_area_km2: { type: 'number' },
                high_potential_pct: { type: 'number' },
              },
            },
            environmental_indicators: {
              type: 'object',
              properties: {
                ndvi_mean: { type: 'number' },
                water_proximity_km: { type: 'number' },
                deforestation_risk: { type: 'string' },
                carbon_sequestration_score: { type: 'number' },
                environmental_sensitivity: { type: 'string' },
              },
            },
            summary: { type: 'string' },
          },
        },
      });

      // Update report with results
      await base44.entities.Report.update(report.id, {
        status: 'completed',
        mineral_score: result.mineral_score,
        top_zones: JSON.stringify(result.top_zones),
        statistics: JSON.stringify(result.statistics),
        environmental_indicators: JSON.stringify(result.environmental_indicators),
        summary: result.summary,
      });

      return report;
    },
    onSuccess: (report) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      navigate(`/ReportView?id=${report.id}`);
    },
  });

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm((f) => ({ ...f, logo_url: file_url }));
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(form);
  };

  const selectedConfig = form.mineral ? getMineralConfig(form.mineral) : null;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs text-[#888] hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#d4a853]" />
          <span className="text-xs font-medium uppercase tracking-widest text-[#d4a853]">New Analysis</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Generate Report</h1>
        <p className="text-sm text-[#888] mt-1">Configure your mineral intelligence analysis</p>
      </div>

      {createMutation.isPending ? (
        <div className="rounded-xl border border-[#2a2a2a] p-12 text-center" style={{ backgroundColor: '#141414' }}>
          <div className="w-16 h-16 border-2 border-[#2a2a2a] border-t-[#d4a853] rounded-full animate-spin mx-auto mb-6" />
          <h3 className="text-lg font-bold text-white mb-2">Processing Analysis</h3>
          <p className="text-sm text-[#888]">Running geospatial analysis for {getMineralConfig(form.mineral).label}...</p>
          <p className="text-xs text-[#666] mt-2">This may take a few moments</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mineral Selection */}
          <div className="rounded-xl border border-[#2a2a2a] p-6" style={{ backgroundColor: '#141414' }}>
            <Label className="text-sm font-semibold text-white mb-3 block">Select Mineral</Label>
            <div className="grid grid-cols-5 gap-2">
              {minerals.map((m) => {
                const config = getMineralConfig(m);
                const isSelected = form.mineral === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, mineral: m }))}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-[#d4a853] bg-[#d4a853]/5'
                        : 'border-[#2a2a2a] hover:border-[#3a3a3a] bg-transparent'
                    }`}
                  >
                    <MineralIcon mineral={m} size="sm" />
                    <span className={`text-xs font-medium ${isSelected ? 'text-[#d4a853]' : 'text-[#888]'}`}>
                      {config.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Report Details */}
          <div className="rounded-xl border border-[#2a2a2a] p-6 space-y-4" style={{ backgroundColor: '#141414' }}>
            <div>
              <Label className="text-xs text-[#888]">Report Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g., Carajás Gold Potential Analysis"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-[#888]">Start Date</Label>
                <Input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-xs text-[#888]">End Date</Label>
                <Input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="rounded-xl border border-[#2a2a2a] p-6" style={{ backgroundColor: '#141414' }}>
            <Label className="text-sm font-semibold text-white mb-3 block">Logo Upload</Label>
            <div className="flex items-center gap-4">
              {form.logo_url ? (
                <div className="w-16 h-16 rounded-xl border border-[#2a2a2a] overflow-hidden bg-[#1a1a1a]">
                  <img src={form.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl border border-dashed border-[#2a2a2a] flex items-center justify-center bg-[#1a1a1a]">
                  <Upload className="w-5 h-5 text-[#888]" />
                </div>
              )}
              <div>
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <span className="text-sm text-[#d4a853] hover:text-[#e4b863] font-medium transition-colors">
                    {uploading ? 'Uploading...' : form.logo_url ? 'Change logo' : 'Upload logo'}
                  </span>
                </label>
                <p className="text-[10px] text-[#666] mt-1">PNG or SVG, will appear on the PDF report</p>
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="rounded-xl border border-[#2a2a2a] p-6" style={{ backgroundColor: '#141414' }}>
            <ROIInput value={form.roi_data} onChange={(v) => setForm((f) => ({ ...f, roi_data: v }))} />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!form.mineral || !form.title || createMutation.isPending}
            className="w-full bg-[#d4a853] hover:bg-[#c49843] text-black font-bold text-sm h-12 disabled:opacity-30"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generate Intelligence Report
          </Button>
        </form>
      )}
    </div>
  );
}