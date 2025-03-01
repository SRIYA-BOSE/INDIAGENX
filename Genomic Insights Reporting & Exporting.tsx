// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clinician');
  const [selectedMarkers, setSelectedMarkers] = useState<string[]>([]);
  const [language, setLanguage] = useState('english');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);

  const genomicMarkers = [
    'DNA Methylation',
    'Single Nucleotide Variants',
    'Copy Number Variations',
    'Gene Expression Levels',
    'Protein Biomarkers'
  ];

  const recentExports = [
    { id: 1, name: 'Clinical Report - Patient 2458', date: '2025-03-01', format: 'PDF' },
    { id: 2, name: 'Research Analysis - Batch 147', date: '2025-03-01', format: 'XLSX' },
    { id: 3, name: 'Policy Overview - Q1 2025', date: '2025-02-28', format: 'JSON' }
  ];

  useEffect(() => {
    if (pieChartRef.current) {
      const chart = echarts.init(pieChartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Risk Distribution',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 35, name: 'Low Risk' },
              { value: 45, name: 'Moderate Risk' },
              { value: 20, name: 'High Risk' }
            ]
          }
        ]
      };
      chart.setOption(option);
    }

    if (barChartRef.current) {
      const chart = echarts.init(barChartRef.current);
      const option = {
        animation: false,
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      chart.setOption(option);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="https://public.readdy.ai/ai/img_res/3befd8752e2ff007cc2dd5a167cd7d1b.jpg" 
                 alt="IndiaGenX+" 
                 className="h-10 w-10" />
            <span className="text-2xl font-bold text-blue-600">IndiaGenX+</span>
          </div>
          <nav className="flex space-x-6">
            <button className="text-gray-600 hover:text-blue-600">Dashboard</button>
            <button className="text-gray-600 hover:text-blue-600">Analysis</button>
            <button className="text-blue-600 font-medium">Reports</button>
            <button className="text-gray-600 hover:text-blue-600">Settings</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reporting & Export</h1>
          <p className="mt-2 text-gray-600">Generate and export genomic analysis reports with customizable templates</p>
        </div>

        {/* Report Type Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['clinician', 'researcher', 'policymaker'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Configuration */}
          <div className="col-span-3 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Report Configuration</h2>
            
            {/* Markers Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Genomic Markers</h3>
              <div className="space-y-2">
                {genomicMarkers.map((marker) => (
                  <label key={marker} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedMarkers.includes(marker)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMarkers([...selectedMarkers, marker]);
                        } else {
                          setSelectedMarkers(selectedMarkers.filter(m => m !== marker));
                        }
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-600">{marker}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Language</h3>
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm flex justify-between items-center !rounded-button"
                >
                  <span className="capitalize">{language}</span>
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </button>
                {showLanguageDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {['english', 'hindi', 'tamil', 'telugu'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLanguageDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize whitespace-nowrap !rounded-button"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content - Preview */}
          <div className="col-span-6 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Risk Distribution</h2>
              <div ref={pieChartRef} style={{ height: '400px' }}></div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Trend Analysis</h2>
              <div ref={barChartRef} style={{ height: '400px' }}></div>
            </div>
          </div>

          {/* Right Sidebar - Export Options */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Export Options</h2>
              
              <div className="mb-6">
                <div className="relative">
                  <button
                    onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm flex justify-between items-center !rounded-button"
                  >
                    <span className="uppercase">{exportFormat}</span>
                    <i className="fas fa-chevron-down text-gray-400"></i>
                  </button>
                  {showFormatDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {['pdf', 'xlsx', 'json'].map((format) => (
                        <button
                          key={format}
                          onClick={() => {
                            setExportFormat(format);
                            setShowFormatDropdown(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 uppercase whitespace-nowrap !rounded-button"
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 flex items-center justify-center space-x-2 !rounded-button">
                <i className="fas fa-download"></i>
                <span>Export Report</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Exports</h2>
              <div className="space-y-4">
                {recentExports.map((export_) => (
                  <div key={export_.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{export_.name}</p>
                      <p className="text-xs text-gray-500">{export_.date}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase">{export_.format}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

