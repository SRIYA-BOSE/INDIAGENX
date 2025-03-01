// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import * as echarts from 'echarts';

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showMfa, setShowMfa] = useState(false);

  const roles = [
    { id: 'clinician', name: 'Clinician', icon: 'fa-user-doctor' },
    { id: 'researcher', name: 'Researcher', icon: 'fa-microscope' },
    { id: 'hospital', name: 'Hospital', icon: 'fa-hospital' },
    { id: 'policymaker', name: 'Policy Maker', icon: 'fa-landmark' }
  ];

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      return;
    }
    setShowMfa(true);
  };

  const handleMfaSubmit = () => {
    setShowMfa(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center">
      <nav className="w-full px-8 py-4 bg-white shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="https://public.readdy.ai/ai/img_res/17dc7c32b6cf9f0eb90c9b32cff5a411.jpg" 
            alt="IndiGenX Logo" 
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-semibold text-gray-800">IndiGenX</span>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
          <i className="fas fa-moon text-xl"></i>
        </button>
      </nav>

      <div className="w-full max-w-md px-8 py-12 mt-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h1>
          
          {/* Role Selection */}
          <div className="relative mb-6">
            <button 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            >
              <span className="text-gray-600">
                {selectedRole ? roles.find(r => r.id === selectedRole)?.name : 'Select Role'}
              </span>
              <i className={`fas fa-chevron-down transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`}></i>
            </button>
            
            {showRoleDropdown && (
              <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 !rounded-button whitespace-nowrap"
                    onClick={() => {
                      setSelectedRole(role.id);
                      setShowRoleDropdown(false);
                    }}
                  >
                    <i className={`fas ${role.icon} text-blue-600`}></i>
                    <span>{role.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <div className="relative">
                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm text-blue-600 hover:text-blue-700 !rounded-button whitespace-nowrap">Forgot password?</button>
            </div>

            <button
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap"
              onClick={handleLogin}
            >
              Sign in
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500 bg-white">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap">
                <i className="fab fa-google text-red-500"></i>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap">
                <i className="fas fa-building text-blue-600"></i>
                <span>SSO</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MFA Modal */}
      {showMfa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
            <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your email</p>
            
            <div className="flex gap-2 mb-6">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 border border-gray-200 rounded-lg text-center text-xl"
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 !rounded-button whitespace-nowrap"
                onClick={() => setShowMfa(false)}
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap"
                onClick={handleMfaSubmit}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

