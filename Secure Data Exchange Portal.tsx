// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

const App: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New data exchange request from Stanford Medical', time: '10 min ago' },
    { id: 2, message: 'Successful federated learning completion', time: '25 min ago' },
    { id: 3, message: 'Access granted to Dr. Emily Richardson', time: '1 hour ago' },
  ]);

  const chartRef = useRef<HTMLDivElement>(null);
  const activityChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Data Exchanges', 'Active Users']
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Data Exchanges',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: {
              color: '#4F46E5'
            }
          },
          {
            name: 'Active Users',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            lineStyle: {
              color: '#10B981'
            }
          }
        ]
      };
      chart.setOption(option);
    }

    if (activityChartRef.current) {
      const activityChart = echarts.init(activityChartRef.current);
      const activityOption = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access Distribution',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 735, name: 'Researchers' },
              { value: 580, name: 'Clinicians' },
              { value: 484, name: 'Hospitals' },
              { value: 300, name: 'Policy Makers' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      activityChart.setOption(activityOption);
    }
  }, []);

  const heroBackgroundUrl = 'https://public.readdy.ai/ai/img_res/ed4b5db790b57780f7da9bcee87358f1.jpg';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <i className="fas fa-plus-square text-indigo-600 text-2xl"></i>
                  <span className="ml-2 text-xl font-semibold text-gray-900">IndiaGenX+</span>
                </div>
              </div>
              <nav className="ml-8">
                <div className="flex space-x-4">
                  {['Dashboard', 'Data Exchange', 'Access Control', 'Audit Logs'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveTab(item.toLowerCase())}
                      className={`${
                        activeTab === item.toLowerCase()
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      } px-3 py-2 rounded-md text-sm font-medium !rounded-button whitespace-nowrap`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
            <div className="flex items-center">
              <button className="p-2 text-gray-400 hover:text-gray-500 relative !rounded-button whitespace-nowrap">
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="ml-4 relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center !rounded-button whitespace-nowrap"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://public.readdy.ai/ai/img_res/fe2be8ceea312e5ccc65114dc2615605.jpg"
                    alt="User"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Dr. Sarah Anderson</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[600px]"
        style={{ backgroundImage: `url(${heroBackgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">
                Secure Healthcare Data Exchange & Collaboration Platform
              </h1>
              <p className="text-xl mb-8">
                Revolutionizing healthcare data sharing with blockchain security and federated learning. 
                Enable cross-institutional research while maintaining data privacy.
              </p>
              <div className="flex space-x-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium !rounded-button whitespace-nowrap">
                  Get Started
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-md font-medium !rounded-button whitespace-nowrap">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Active Data Exchanges', value: '2,847', icon: 'fa-sync' },
            { title: 'Connected Institutions', value: '156', icon: 'fa-hospital' },
            { title: 'Pending Approvals', value: '24', icon: 'fa-clock' },
            { title: 'Security Status', value: 'Optimal', icon: 'fa-shield-alt' }
          ].map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <i className={`fas ${stat.icon} text-indigo-600 text-xl`}></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Overview</h3>
            <div ref={chartRef} style={{ height: '400px' }}></div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Access Distribution</h3>
            <div ref={activityChartRef} style={{ height: '400px' }}></div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { user: 'Dr. James Wilson', action: 'Accessed patient records', time: '2 minutes ago', status: 'Approved' },
              { user: 'Mount Sinai Hospital', action: 'Initiated data exchange', time: '15 minutes ago', status: 'Pending' },
              { user: 'Research Lab 7', action: 'Completed federated learning cycle', time: '1 hour ago', status: 'Completed' },
              { user: 'Dr. Maria Garcia', action: 'Modified access permissions', time: '2 hours ago', status: 'Approved' },
              { user: 'Cleveland Clinic', action: 'Requested data access', time: '3 hours ago', status: 'Pending' }
            ].map((activity, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                    <span className="ml-4 text-sm text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

