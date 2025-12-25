'use client';

import { useState } from 'react';
import { GyeongjoRecord } from '@/types';

interface DataTableProps {
  records: GyeongjoRecord[];
  onDelete: (id: string) => void;
}

export default function DataTable({ records, onDelete }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterType, setFilterType] = useState<'' | '수입' | '지출'>('');

  const filteredRecords = records.filter(record => {
    const matchesSearch =
      record.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.memo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !filterCategory || record.category === filterCategory;
    const matchesYear = !filterYear || record.date.startsWith(filterYear);
    const matchesType = !filterType || record.type === filterType;

    return matchesSearch && matchesCategory && matchesYear && matchesType;
  });

  const years = [...new Set(records.map(r => r.date.substring(0, 4)))].sort().reverse();

  // 필터링된 데이터의 수입/지출 합계
  const incomeTotal = filteredRecords.filter(r => r.type === '수입').reduce((sum, r) => sum + r.amount, 0);
  const expenseTotal = filteredRecords.filter(r => r.type === '지출').reduce((sum, r) => sum + r.amount, 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '결혼': 'bg-pink-100 text-pink-700',
      '조의': 'bg-gray-100 text-gray-700',
      '돌': 'bg-yellow-100 text-yellow-700',
      '칠순': 'bg-purple-100 text-purple-700',
      '개업': 'bg-green-100 text-green-700',
      '기타': 'bg-blue-100 text-blue-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">전체 데이터</h2>

        {/* 필터 */}
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="검색 (이름, 행사명, 메모)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">전체 구분</option>
            {['결혼', '조의', '돌', '칠순', '개업', '기타'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">전체 연도</option>
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>

          {/* 수입/지출 필터 */}
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button
              onClick={() => setFilterType('')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                filterType === '' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterType('수입')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                filterType === '수입' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              수입
            </button>
            <button
              onClick={() => setFilterType('지출')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                filterType === '지출' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              지출
            </button>
          </div>
        </div>

        {/* 요약 정보 */}
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          <span className="text-gray-500">
            총 {filteredRecords.length}건 / 전체 {records.length}건
          </span>
          <span className="text-green-600 font-medium">
            수입: +{formatAmount(incomeTotal)}원
          </span>
          <span className="text-red-600 font-medium">
            지출: -{formatAmount(expenseTotal)}원
          </span>
          <span className={`font-bold ${incomeTotal - expenseTotal >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            순액: {incomeTotal - expenseTotal >= 0 ? '+' : ''}{formatAmount(incomeTotal - expenseTotal)}원
          </span>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>날짜</th>
              <th>구분</th>
              <th>행사명</th>
              <th>대상자</th>
              <th>관계</th>
              <th>금액</th>
              <th>메모</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              filteredRecords.map((record, index) => (
                <tr key={record.id} className={record.type === '수입' ? 'bg-green-50' : 'bg-red-50'}>
                  <td className="font-medium text-gray-900">{index + 1}</td>
                  <td>{record.date}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(record.category)}`}>
                      {record.category}
                    </span>
                  </td>
                  <td>{record.eventName}</td>
                  <td className="font-medium">{record.person}</td>
                  <td>{record.relation}</td>
                  <td className={`font-medium ${record.type === '지출' ? 'text-red-600' : 'text-green-600'}`}>
                    {record.type === '지출' ? '-' : '+'}{formatAmount(record.amount)}원
                  </td>
                  <td className="max-w-[200px] truncate" title={record.memo}>
                    {record.memo}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (confirm('정말 삭제하시겠습니까?')) {
                          onDelete(record.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
