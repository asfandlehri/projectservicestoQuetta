
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProviderList } from './pages/ProviderList';
import { Bookings } from './pages/Bookings';
import { Profile } from './pages/Profile';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserRole, ProviderProfile } from './types';
import { INITIAL_PROVIDERS } from './constants';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';

const LoginPage: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl space-y-8 animate-in zoom-in-95 duration-500">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center text-white font-black text-4xl mx-auto shadow-xl shadow-indigo-200">
            S
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">LocalConnect</h1>
          <p className="text-gray-500 font-medium">Home Services Hub</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+1 234 567 8900"
              className="w-full bg-gray-50 border-none h-14 px-5 rounded-2xl text-lg focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <button className="w-full bg-indigo-600 text-white font-bold h-14 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
            Get OTP
          </button>
        </div>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Login as (Demo)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onLogin(UserRole.CLIENT)}
              className="flex flex-col items-center gap-2 p-4 bg-indigo-50 text-indigo-700 rounded-3xl hover:bg-indigo-100 transition-all active:scale-95"
            >
              <LogIn size={24} />
              <span className="font-bold text-sm">Client</span>
            </button>
            <button 
              onClick={() => onLogin(UserRole.PROVIDER)}
              className="flex flex-col items-center gap-2 p-4 bg-green-50 text-green-700 rounded-3xl hover:bg-green-100 transition-all active:scale-95"
            >
              <UserPlus size={24} />
              <span className="font-bold text-sm">Provider</span>
            </button>
          </div>
          <button 
            onClick={() => onLogin(UserRole.ADMIN)}
            className="flex items-center justify-center gap-3 p-4 bg-gray-900 text-white rounded-3xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            <ShieldCheck size={24} />
            <span className="font-bold">System Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [providers, setProviders] = useState<ProviderProfile[]>(INITIAL_PROVIDERS);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  const addProvider = (newProvider: ProviderProfile) => {
    setProviders(prev => [newProvider, ...prev]);
  };

  const updateProviderPrice = (providerId: string, newPrice: number) => {
    setProviders(prev => prev.map(p => p.id === providerId ? { ...p, baseCharge: newPrice } : p));
  };

  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout userRole={userRole} onLogout={handleLogout}>
        <Routes>
          {userRole === UserRole.CLIENT && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/services/:categoryId" element={<ProviderList providers={providers} />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/profile" element={<Profile role={UserRole.CLIENT} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          
          {userRole === UserRole.PROVIDER && (
            <>
              <Route 
                path="/" 
                element={
                  <ProviderDashboard 
                    currentProvider={providers.find(p => p.role === UserRole.PROVIDER)} 
                    onUpdatePrice={(price) => {
                      const proId = providers.find(p => p.role === UserRole.PROVIDER)?.id;
                      if (proId) updateProviderPrice(proId, price);
                    }}
                  />
                } 
              />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/profile" element={<Profile role={UserRole.PROVIDER} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {userRole === UserRole.ADMIN && (
            <>
              <Route path="/admin" element={<AdminDashboard providers={providers} onAddProvider={addProvider} />} />
              <Route path="/" element={<Navigate to="/admin" />} />
              <Route path="/profile" element={<Profile role={UserRole.ADMIN} />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </>
          )}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
