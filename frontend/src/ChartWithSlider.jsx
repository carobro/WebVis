import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega';

// Dummy dataset
const rawData = [
  { x: 1, y: 10, category: 'A', size: 40 },
  { x: 2, y: 20, category: 'B', size: 80 },
  { x: 3, y: 30, category: 'A', size: 150 },
  { x: 4, y: 40, category: 'B', size: 200 },
  { x: 5, y: 50, category: 'C', size: 300 },
  { x: 6, y: 60, category: 'C', size: 100 },
];

export default function ChartWithSlider() {
  const [spec, setSpec] = useState(null);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    fetch('/chart.json')
      .then((res) => res.json())
      .then((json) => setSpec(json));
  }, []);

  const filteredData = rawData.filter(d => d.y >= threshold);

  const data = {
    mydata: filteredData
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <label className="block mb-2">Y Threshold: {threshold}</label>
      <input 
        type="range"
        min="0"
        max="60"
        step="2"
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
        className="w-full mb-4"
      />

      {spec ? (
        <VegaLite spec={spec} data={data} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
