'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { GyeongjoRecord } from '@/types';
import { createClient } from '@/lib/supabase';
import { database } from '@/lib/database';
import Auth from '@/components/Auth';
import RegisterForm from '@/components/RegisterForm';
import DataTable from '@/components/DataTable';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'register' | 'data' | 'dashboard'>('register');
  const [records, setRecords] = useState<GyeongjoRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  const supabase = createClient();

  // 인증 상태 확인
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (user) {
        loadRecords();
      }
    };

    checkUser();

    // 인증 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadRecords();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 데이터 로드
  const loadRecords = async () => {
    setDataLoading(true);
    const data = await database.getRecords();
    setRecords(data);
    setDataLoading(false);
  };

  // 로그아웃
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRecords([]);
  };

  // 데이터 등록
  const handleRegister = async (data: Omit<GyeongjoRecord, 'id' | 'createdAt'>) => {
    const newRecord = await database.addRecord(data);
    if (newRecord) {
      await loadRecords();
      alert('등록되었습니다!');
    } else {
      alert('등록에 실패했습니다.');
    }
  };

  // 데이터 삭제
  const handleDelete = async (id: string) => {
    const success = await database.deleteRecord(id);
    if (success) {
      await loadRecords();
    } else {
      alert('삭제에 실패했습니다.');
    }
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  // 로그인 안 된 경우
  if (!user) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-800">경조사 관리</h1>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex space-x-1">
                {[
                  { id: 'register' as const, label: '신규등록', icon: '✏️' },
                  { id: 'data' as const, label: '전체데이터', icon: '📋' },
                  { id: 'dashboard' as const, label: '대시보드', icon: '📊' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-1">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>

          {/* 모바일 탭 */}
          <div className="sm:hidden flex justify-center pb-3 gap-1">
            {[
              { id: 'register' as const, label: '등록', icon: '✏️' },
              { id: 'data' as const, label: '데이터', icon: '📋' },
              { id: 'dashboard' as const, label: '통계', icon: '📊' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {dataLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-500">데이터 로딩 중...</div>
          </div>
        ) : (
          <>
            {activeTab === 'register' && (
              <RegisterForm onSubmit={handleRegister} />
            )}

            {activeTab === 'data' && (
              <DataTable records={records} onDelete={handleDelete} />
            )}

            {activeTab === 'dashboard' && (
              <Dashboard records={records} />
            )}
          </>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          경조사 관리 앱 | 데이터는 클라우드에 안전하게 저장됩니다
        </div>
      </footer>
    </div>
  );
}
