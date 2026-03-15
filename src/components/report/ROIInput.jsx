import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MapPin } from 'lucide-react';

export default function ROIInput({ value, onChange }) {
  const [roiType, setRoiType] = useState('rectangle');
  const [coords, setCoords] = useState(
    value ? JSON.parse(value) : { north: '', south: '', east: '', west: '' }
  );

  const handleChange = (field, val) => {
    const updated = { ...coords, [field]: val };
    setCoords(updated);
    onChange(JSON.stringify({ type: roiType, ...updated }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-[#d4a853]" />
        <Label className="text-sm font-semibold text-white">Region of Interest (ROI)</Label>
      </div>

      <Tabs value={roiType} onValueChange={(v) => setRoiType(v)}>
        <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger value="rectangle" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white text-[#888]">Rectangle</TabsTrigger>
          <TabsTrigger value="coordinates" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white text-[#888]">Coordinates</TabsTrigger>
          <TabsTrigger value="polygon" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white text-[#888]">Polygon</TabsTrigger>
        </TabsList>

        <TabsContent value="rectangle" className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-[#888]">North (Lat)</Label>
              <Input
                type="number"
                step="0.0001"
                placeholder="-3.0"
                value={coords.north}
                onChange={(e) => handleChange('north', e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-[#888]">South (Lat)</Label>
              <Input
                type="number"
                step="0.0001"
                placeholder="-4.0"
                value={coords.south}
                onChange={(e) => handleChange('south', e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-[#888]">East (Lon)</Label>
              <Input
                type="number"
                step="0.0001"
                placeholder="-49.0"
                value={coords.east}
                onChange={(e) => handleChange('east', e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-[#888]">West (Lon)</Label>
              <Input
                type="number"
                step="0.0001"
                placeholder="-50.0"
                value={coords.west}
                onChange={(e) => handleChange('west', e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
              />
            </div>
          </div>
          <p className="text-[10px] text-[#666] mt-2">Define a bounding box for the area of interest</p>
        </TabsContent>

        <TabsContent value="coordinates" className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-[#888]">Center Latitude</Label>
              <Input
                type="number"
                step="0.0001"
                placeholder="-3.5"
                value={coords.lat}
                onChange={(e) => handleChange('lat', e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-[#888]">Center Longitude</Label>
              <Input
                type="number"
                step="0.0001"
                placeholder="-49.5"
                value={coords.lon}
                onChange={(e) => handleChange('lon', e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-xs text-[#888]">Radius (km)</Label>
              <Input
                type="number"
                step="1"
                placeholder="50"
                value={coords.radius}
                onChange={(e) => handleChange('radius', e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white mt-1"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="polygon" className="mt-4">
          <div className="rounded-lg border border-dashed border-[#2a2a2a] p-6 text-center">
            <MapPin className="w-8 h-8 text-[#888] mx-auto mb-2" />
            <p className="text-sm text-[#888]">Polygon ROI — paste GeoJSON coordinates</p>
            <textarea
              className="mt-3 w-full h-24 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-xs text-white resize-none focus:outline-none focus:border-[#d4a853]"
              placeholder='[[-49.5, -3.0], [-49.0, -3.0], [-49.0, -4.0], [-49.5, -4.0]]'
              onChange={(e) => handleChange('polygon', e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}