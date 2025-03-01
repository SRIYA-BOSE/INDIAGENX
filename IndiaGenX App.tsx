// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

const App: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const heatmapChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heatmapChartRef.current) {
      const chart = echarts.init(heatmapChartRef.current);
      const option = {
        animation: false,
        tooltip: {
          position: 'top'
        },
        grid: {
          top: '10%',
          right: '10%',
          bottom: '10%',
          left: '10%'
        },
        xAxis: {
          type: 'category',
          data: ['Gene A', 'Gene B', 'Gene C', 'Gene D', 'Gene E'],
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: ['Sample 1', 'Sample 2', 'Sample 3', 'Sample 4', 'Sample 5'],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
          inRange: {
            color: ['#4CAF50', '#FFC107', '#F44336']
          }
        },
        series: [{
          type: 'heatmap',
          data: [
            [0, 0, 5], [0, 1, 2], [0, 2, 8], [0, 3, 3], [0, 4, 7],
            [1, 0, 4], [1, 1, 9], [1, 2, 2], [1, 3, 6], [1, 4, 1],
            [2, 0, 7], [2, 1, 3], [2, 2, 5], [2, 3, 8], [2, 4, 4],
            [3, 0, 2], [3, 1, 6], [3, 2, 3], [3, 3, 7], [3, 4, 9],
            [4, 0, 8], [4, 1, 4], [4, 2, 6], [4, 3, 2], [4, 4, 5]
          ],
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      chart.setOption(option);
    }

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
            name: 'Risk Analysis',
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
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 48, name: 'Low Risk' },
              { value: 32, name: 'Medium Risk' },
              { value: 20, name: 'High Risk' }
            ]
          }
        ]
      };
      chart.setOption(option);
    }
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'New Dataset Available',
      description: 'Genomic analysis for Patient ID: 2025-03-001 is ready',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Security Alert',
      description: 'Unusual access pattern detected from IP: 192.168.1.100',
      time: '4 hours ago'
    }
  ];

  const patientReports = [
    {
      id: 'P2025-001',
      name: 'Alexander Thompson',
      age: 45,
      riskLevel: 'high',
      lastUpdate: '2025-03-01'
    },
    {
      id: 'P2025-002',
      name: 'Emily Richardson',
      age: 38,
      riskLevel: 'medium',
      lastUpdate: '2025-03-01'
    },
    {
      id: 'P2025-003',
      name: 'Michael Anderson',
      age: 52,
      riskLevel: 'low',
      lastUpdate: '2025-02-28'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://public.readdy.ai/ai/img_res/56bd204f3b57e722e2ebdbe7d7e163a3.jpg" 
                 alt="IndiaGenX Logo" 
                 className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold text-gray-900">IndiaGenX</span>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search datasets, patients, or reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="relative !rounded-button whitespace-nowrap"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="fas fa-bell text-gray-600"></i>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>

            <div className="relative">
              <button 
                className="flex items-center space-x-2 !rounded-button whitespace-nowrap"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img
                  src="https://public.readdy.ai/ai/img_res/8e86605679c4e4cbdcced665ebd2bf32.jpg"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Dr. Sarah Mitchell</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Datasets</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">1,284</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-database text-blue-600 text-xl"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">
                <i className="fas fa-arrow-up"></i> 12% increase
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Insights</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">856</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-brain text-green-600 text-xl"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">
                <i className="fas fa-check-circle"></i> AI Processing Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Status</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">Protected</h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-purple-600 text-xl"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">
                <i className="fas fa-lock"></i> All Systems Secure
              </span>
            </div>
          </div>
        </div>

        {/* Genomic Analysis Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Genomic Variants Analysis</h2>
            <div className="flex space-x-4 mb-6">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium !rounded-button whitespace-nowrap ${
                  selectedRiskLevel === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'
                }`}
                onClick={() => setSelectedRiskLevel('all')}
              >
                All Variants
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium !rounded-button whitespace-nowrap ${
                  selectedRiskLevel === 'high' ? 'bg-red-100 text-red-700' : 'text-gray-500'
                }`}
                onClick={() => setSelectedRiskLevel('high')}
              >
                High Risk
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium !rounded-button whitespace-nowrap ${
                  selectedRiskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-500'
                }`}
                onClick={() => setSelectedRiskLevel('medium')}
              >
                Medium Risk
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium !rounded-button whitespace-nowrap ${
                  selectedRiskLevel === 'low' ? 'bg-green-100 text-green-700' : 'text-gray-500'
                }`}
                onClick={() => setSelectedRiskLevel('low')}
              >
                Low Risk
              </button>
            </div>
            <div ref={heatmapChartRef} style={{ height: '400px' }}></div>
          </div>
        </div>

        {/* Patient Reports and Risk Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Reports</h2>
                <div className="space-y-4">
                  {patientReports.map((patient) => (
                    <div key={patient.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-500">ID: {patient.id} | Age: {patient.age}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            patient.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                            patient.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {patient.riskLevel.charAt(0).toUpperCase() + patient.riskLevel.slice(1)} Risk
                          </span>
                          <button className="text-gray-400 hover:text-gray-600 !rounded-button whitespace-nowrap">
                            <i className="fas fa-download"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h2>
                <div ref={pieChartRef} style={{ height: '300px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <i className={`fas ${
                      notification.title.includes('Security') ? 'fa-shield-alt text-red-500' : 'fa-file-medical text-blue-500'
                    }`}></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className="absolute top-16 right-4 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
            <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

