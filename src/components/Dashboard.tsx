'use client';

import { GyeongjoRecord } from '@/types';
import {
  calculateCategoryStats,
  calculateRelationStats,
  calculateYearlyStats,
  getTotalStats,
} from '@/lib/stats';

interface DashboardProps {
  records: GyeongjoRecord[];
}

export default function Dashboard({ records }: DashboardProps) {
  const categoryStats = calculateCategoryStats(records);
  const relationStats = calculateRelationStats(records);
  const yearlyStats = calculateYearlyStats(records);
  const totalStats = getTotalStats(records);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '결혼': '#EC4899',
      '조의': '#6B7280',
      '돌': '#F59E0B',
      '칠순': '#8B5CF6',
      '개업': '#10B981',
      '기타': '#3B82F6',
    };
    return colors[category] || '#6B7280';
  };

  return (
    <div className="space-y-6">
      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">총 건수</div>
          <div className="text-3xl font-bold text-blue-600">{totalStats.totalCount}건</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">총 금액</div>
          <div className="text-3xl font-bold text-green-600">{formatAmount(totalStats.totalAmount)}원</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">평균 금액</div>
          <div className="text-3xl font-bold text-orange-600">{formatAmount(totalStats.avgAmount)}원</div>
        </div>
      </div>

      {/* 구분별 통계 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">구분별 통계</h3>

        {/* 시각화 바 */}
        <div className="mb-6 space-y-3">
          {categoryStats.filter(s => s.count > 0).map(stat => (
            <div key={stat.category} className="flex items-center gap-3">
              <span className="w-12 text-sm font-medium text-gray-700">{stat.category}</span>
              <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(stat.percentage, 2)}%`,
                    backgroundColor: getCategoryColor(stat.category),
                  }}
                />
              </div>
              <span className="w-20 text-sm text-gray-600 text-right">{formatAmount(stat.total)}원</span>
              <span className="w-12 text-sm text-gray-500 text-right">{stat.percentage}%</span>
            </div>
          ))}
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>건수</th>
                <th>총 금액</th>
                <th>평균 금액</th>
                <th>비율</th>
              </tr>
            </thead>
            <tbody>
              {categoryStats.map(stat => (
                <tr key={stat.category}>
                  <td>
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getCategoryColor(stat.category) }}
                    />
                    {stat.category}
                  </td>
                  <td>{stat.count}건</td>
                  <td>{formatAmount(stat.total)}원</td>
                  <td>{formatAmount(stat.average)}원</td>
                  <td>{stat.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 관계별 통계 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">관계별 통계</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>관계</th>
                <th>건수</th>
                <th>총 금액</th>
                <th>평균 금액</th>
                <th>비율</th>
              </tr>
            </thead>
            <tbody>
              {relationStats.filter(s => s.count > 0).map(stat => (
                <tr key={stat.category}>
                  <td>{stat.category}</td>
                  <td>{stat.count}건</td>
                  <td>{formatAmount(stat.total)}원</td>
                  <td>{formatAmount(stat.average)}원</td>
                  <td>{stat.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 연도별 통계 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">연도별 통계</h3>

        {/* 시각화 바 */}
        <div className="mb-6 space-y-2">
          {yearlyStats.slice(-8).map(stat => {
            const maxTotal = Math.max(...yearlyStats.map(s => s.total));
            const percentage = maxTotal > 0 ? (stat.total / maxTotal) * 100 : 0;

            return (
              <div key={stat.year} className="flex items-center gap-3">
                <span className="w-12 text-sm font-medium text-gray-700">{stat.year}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded transition-all duration-500"
                    style={{ width: `${Math.max(percentage, 2)}%` }}
                  />
                </div>
                <span className="w-24 text-sm text-gray-600 text-right">{formatAmount(stat.total)}원</span>
                <span className="w-16 text-sm text-right">
                  {stat.change !== null && (
                    <span className={stat.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {stat.change >= 0 ? '+' : ''}{stat.change}%
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>연도</th>
                <th>건수</th>
                <th>총 금액</th>
                <th>평균 금액</th>
                <th>전년대비</th>
              </tr>
            </thead>
            <tbody>
              {[...yearlyStats].reverse().map(stat => (
                <tr key={stat.year}>
                  <td>{stat.year}년</td>
                  <td>{stat.count}건</td>
                  <td>{formatAmount(stat.total)}원</td>
                  <td>{formatAmount(stat.average)}원</td>
                  <td>
                    {stat.change !== null ? (
                      <span className={stat.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {stat.change >= 0 ? '+' : ''}{stat.change}%
                      </span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
