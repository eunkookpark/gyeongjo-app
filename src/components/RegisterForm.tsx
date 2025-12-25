'use client';

import { useState } from 'react';
import { GyeongjoRecord } from '@/types';

interface RegisterFormProps {
  onSubmit: (data: Omit<GyeongjoRecord, 'id' | 'createdAt'>) => void;
}

const categories = ['결혼', '조의', '돌', '칠순', '개업', '기타'] as const;
const relations = ['교우', '친척', '거래처', '노회', '친구', '이웃', '직장', '기타'] as const;

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '결혼' as typeof categories[number],
    eventName: '',
    person: '',
    relation: '교우' as typeof relations[number],
    amount: 0,
    type: '지출' as '지출' | '수입',
    memo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.person || formData.amount === 0) {
      alert('날짜, 대상자, 금액은 필수 입력 항목입니다.');
      return;
    }

    onSubmit(formData);

    // 폼 초기화
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '결혼',
      eventName: '',
      person: '',
      relation: '교우',
      amount: 0,
      type: '지출',
      memo: '',
    });
  };

  const setQuickAmount = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-red-500">★</span> 신규 경조사 등록
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 날짜 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">날짜 *</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* 구분 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">구분 *</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  formData.category === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 행사명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">행사명</label>
          <input
            type="text"
            value={formData.eventName}
            onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
            placeholder="예: 결혼식, 장례식"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 대상자 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">대상자 *</label>
          <input
            type="text"
            value={formData.person}
            onChange={(e) => setFormData(prev => ({ ...prev, person: e.target.value }))}
            placeholder="예: 홍길동"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* 관계 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">관계 *</label>
          <select
            value={formData.relation}
            onChange={(e) => setFormData(prev => ({ ...prev, relation: e.target.value as typeof relations[number] }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {relations.map(rel => (
              <option key={rel} value={rel}>{rel}</option>
            ))}
          </select>
        </div>

        {/* 수입/지출 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">수입/지출</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: '지출' }))}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                formData.type === '지출'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              지출
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: '수입' }))}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                formData.type === '수입'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              수입
            </button>
          </div>
        </div>

        {/* 금액 */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">금액 *</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={formData.amount || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
              placeholder="0"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <span className="text-gray-600">원</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[50000, 100000, 200000, 500000].map(amount => (
              <button
                key={amount}
                type="button"
                onClick={() => setQuickAmount(amount)}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {(amount / 10000)}만
              </button>
            ))}
            <button
              type="button"
              onClick={() => setQuickAmount(0)}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 메모 */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
          <textarea
            value={formData.memo}
            onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))}
            placeholder="추가 메모 사항"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>
      </div>

      {/* 등록 버튼 */}
      <button
        type="submit"
        className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        등록하기
      </button>
    </form>
  );
}
