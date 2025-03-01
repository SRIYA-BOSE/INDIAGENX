// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useRef } from 'react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cloud');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{type: string; message: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { id: 1, title: 'File Upload', icon: 'fa-cloud-upload-alt' },
    { id: 2, title: 'AI Validation', icon: 'fa-robot' },
    { id: 3, title: 'Data Processing', icon: 'fa-cogs' },
    { id: 4, title: 'Risk Analysis', icon: 'fa-chart-line' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      setStatusMessage({ type: 'success', message: 'Starting upload process...' });
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentStep(2);
          setStatusMessage({ type: 'success', message: 'Files uploaded successfully! Starting AI validation...' });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fas fa-plus text-blue-600 text-2xl"></i>
            <span className="text-xl font-semibold text-gray-800">IndiaGenx</span>
          </div>
          <nav className="flex space-x-6">
            <button className="text-gray-600 hover:text-blue-600">Dashboard</button>
            <button className="text-gray-600 hover:text-blue-600">Reports</button>
            <button className="text-gray-600 hover:text-blue-600">Settings</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Data Upload & Processing</h1>

        {/* Upload Options */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 flex">
            {['cloud', 'ehr', 'sftp'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg !rounded-button whitespace-nowrap ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`fas ${
                  tab === 'cloud' ? 'fa-cloud' : 
                  tab === 'ehr' ? 'fa-hospital' : 
                  'fa-shield-alt'
                } mr-2`}></i>
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center w-1/4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.id === currentStep ? 'bg-blue-600 text-white' :
                  step.id < currentStep ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <div className="text-sm mt-2 text-center text-gray-600">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div 
          className={`bg-white rounded-lg shadow-sm p-8 mb-8 border-2 border-dashed transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <i className="fas fa-cloud-upload-alt text-5xl text-blue-600 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Drag and drop your files here
            </h3>
            <p className="text-gray-500 mb-4">
              or click to select files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap"
            >
              Browse Files
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: FASTQ, BAM, VCF, CSV
            </p>
          </div>

          {uploadProgress > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Upload Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {statusMessage && (
          <div className={`rounded-lg p-4 mb-8 ${
            statusMessage.type === 'success' ? 'bg-green-50 text-green-700' :
            statusMessage.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
            'bg-red-50 text-red-700'
          }`}>
            <div className="flex items-center">
              <i className={`fas ${
                statusMessage.type === 'success' ? 'fa-check-circle' :
                statusMessage.type === 'warning' ? 'fa-exclamation-triangle' :
                'fa-times-circle'
              } mr-2`}></i>
              <span>{statusMessage.message}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

