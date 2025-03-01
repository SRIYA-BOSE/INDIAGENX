// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [showExportPanel, setShowExportPanel] = useState(false);

  useEffect(() => {
    const chart = echarts.init(document.getElementById('riskChart'));
    const option = {
      animation: false,
      title: {
        text: 'Population Risk Distribution',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#333',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Indian Population', 'Global Average'],
        bottom: 10
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      yAxis: {
        type: 'value',
        name: 'Risk Score'
      },
      series: [
        {
          name: 'Indian Population',
          type: 'line',
          data: [65, 72, 68, 75, 82, 78],
          lineStyle: { color: '#3B82F6' }
        },
        {
          name: 'Global Average',
          type: 'line',
          data: [60, 65, 63, 68, 72, 70],
          lineStyle: { color: '#9CA3AF' }
        }
      ]
    };
    chart.setOption(option);

    return () => chart.dispose();
  }, []);

  const insightCards = [
    {
      title: 'BRCA1 Mutation Analysis',
      risk: 'high',
      confidence: 94,
      details: 'Detected significant variants associated with increased cancer risk'
    },
    {
      title: 'Cardiovascular Risk Assessment',
      risk: 'medium',
      confidence: 87,
      details: 'Moderate risk factors identified in lipid metabolism pathways'
    },
    {
      title: 'Diabetes Predisposition',
      risk: 'low',
      confidence: 92,
      details: 'Low genetic predisposition to Type 2 Diabetes'
    }
  ];

  const backgroundImage = 'https://public.readdy.ai/ai/img_res/e4c40425f41cb7f61c98f7aae2ad95c1.jpg';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fas fa-plus text-blue-600 text-2xl"></i>
            <span className="text-xl font-semibold text-gray-800">IndiaGenx</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button className="text-gray-600 hover:text-blue-600 !rounded-button whitespace-nowrap">Dashboard</button>
            <button className="text-gray-600 hover:text-blue-600 !rounded-button whitespace-nowrap">Analysis</button>
            <button className="text-gray-600 hover:text-blue-600 !rounded-button whitespace-nowrap">Reports</button>
            <button className="text-gray-600 hover:text-blue-600 !rounded-button whitespace-nowrap">Settings</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                AI-Powered Genomic Analysis
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Advanced genetic variant detection and risk assessment powered by cutting-edge artificial intelligence.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition !rounded-button whitespace-nowrap">
                Start Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              className="w-full h-12 pl-12 pr-4 rounded-lg border-none bg-white shadow-sm text-sm"
              placeholder="Search genes, conditions, or risk levels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Risk Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {insightCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  card.risk === 'high' ? 'bg-red-100 text-red-800' :
                  card.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {card.risk.charAt(0).toUpperCase() + card.risk.slice(1)} Risk
                </span>
              </div>
              <p className="text-gray-600 mb-4">{card.details}</p>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">{card.confidence}%</div>
                <span className="ml-2 text-sm text-gray-500">Confidence Score</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div id="riskChart" style={{ height: '400px' }}></div>
        </div>

        {/* Export Panel */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setShowExportPanel(!showExportPanel)}
            className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition !rounded-button whitespace-nowrap"
          >
            <i className="fas fa-download"></i>
          </button>
          {showExportPanel && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 w-64">
              <h4 className="text-gray-800 font-medium mb-3">Export Report</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded !rounded-button whitespace-nowrap">
                  <i className="fas fa-file-pdf text-red-500 mr-2"></i> Export as PDF
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded !rounded-button whitespace-nowrap">
                  <i className="fas fa-file-csv text-green-500 mr-2"></i> Export as CSV
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded !rounded-button whitespace-nowrap">
                  <i className="fas fa-code text-blue-500 mr-2"></i> API Export
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

