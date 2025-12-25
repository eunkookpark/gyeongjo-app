'use client';

import { useState, useEffect } from 'react';
import { GyeongjoRecord } from '@/types';
import { storage } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import RegisterForm from '@/components/RegisterForm';
import DataTable from '@/components/DataTable';
import Dashboard from '@/components/Dashboard';
import DataManager from '@/components/DataManager';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'register' | 'data' | 'dashboard'>('register');
  const [records, setRecords] = useState<GyeongjoRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 데이터 로드
  useEffect(() => {
    setRecords(storage.getRecords());
    setIsLoaded(true);
  }, []);

  const refreshData = () => {
    setRecords(storage.getRecords());
  };

  const handleRegister = (data: Omit<GyeongjoRecord, 'id' | 'createdAt'>) => {
    storage.addRecord(data);
    refreshData();
    alert('등록되었습니다!');
  };

  const handleDelete = (id: string) => {
    storage.deleteRecord(id);
    refreshData();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 데이터 관리 */}
        <div className="mb-6">
          <DataManager onDataChange={refreshData} />
        </div>

        {/* 탭 컨텐츠 */}
        {activeTab === 'register' && (
          <RegisterForm onSubmit={handleRegister} />
        )}

        {activeTab === 'data' && (
          <DataTable records={records} onDelete={handleDelete} />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard records={records} />
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          경조사 관리 앱 | 데이터는 브라우저에 저장됩니다
        </div>
      </footer>
    </div>
  );
}
