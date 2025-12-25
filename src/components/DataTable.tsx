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

  const filteredRecords = records.filter(record => {
    const matchesSearch =
      record.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.memo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !filterCategory || record.category === filterCategory;
    const matchesYear = !filterYear || record.date.startsWith(filterYear);

    return matchesSearch && matchesCategory && matchesYear;
  });

  const years = [...new Set(records.map(r => r.date.substring(0, 4)))].sort().reverse();

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
        </div>

        <p className="text-sm text-gray-500 mt-2">
          총 {filteredRecords.length}건 / 전체 {records.length}건
        </p>
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
                <tr key={record.id}>
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
