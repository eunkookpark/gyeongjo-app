import { GyeongjoRecord, CategoryStats, YearlyStats } from '@/types';

export const calculateCategoryStats = (records: GyeongjoRecord[]): CategoryStats[] => {
  const categories = ['결혼', '조의', '돌', '칠순', '개업', '기타'];
  const total = records.length;

  return categories.map(category => {
    const filtered = records.filter(r => r.category === category);
    const count = filtered.length;
    const sum = filtered.reduce((acc, r) => acc + r.amount, 0);

    return {
      category,
      count,
      total: sum,
      average: count > 0 ? Math.round(sum / count) : 0,
      percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
    };
  });
};

export const calculateRelationStats = (records: GyeongjoRecord[]): CategoryStats[] => {
  const relations = ['교우', '친척', '거래처', '노회', '친구', '이웃', '직장', '기타'];
  const total = records.length;

  return relations.map(relation => {
    const filtered = records.filter(r => r.relation === relation);
    const count = filtered.length;
    const sum = filtered.reduce((acc, r) => acc + r.amount, 0);

    return {
      category: relation,
      count,
      total: sum,
      average: count > 0 ? Math.round(sum / count) : 0,
      percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
    };
  });
};

export const calculateYearlyStats = (records: GyeongjoRecord[]): YearlyStats[] => {
  const yearMap = new Map<number, { count: number; total: number }>();

  records.forEach(record => {
    const year = new Date(record.date).getFullYear();
    const existing = yearMap.get(year) || { count: 0, total: 0 };
    yearMap.set(year, {
      count: existing.count + 1,
      total: existing.total + record.amount,
    });
  });

  const years = Array.from(yearMap.keys()).sort((a, b) => a - b);

  return years.map((year, index) => {
    const data = yearMap.get(year)!;
    const prevData = index > 0 ? yearMap.get(years[index - 1]) : null;

    return {
      year,
      count: data.count,
      total: data.total,
      average: data.count > 0 ? Math.round(data.total / data.count) : 0,
      change: prevData && prevData.total > 0
        ? Math.round(((data.total - prevData.total) / prevData.total) * 1000) / 10
        : null,
    };
  });
};

export const getTotalStats = (records: GyeongjoRecord[]) => {
  const totalCount = records.length;
  const totalAmount = records.reduce((acc, r) => acc + r.amount, 0);
  const avgAmount = totalCount > 0 ? Math.round(totalAmount / totalCount) : 0;

  return { totalCount, totalAmount, avgAmount };
};

export const getIncomeExpenseStats = (records: GyeongjoRecord[]) => {
  const incomeRecords = records.filter(r => r.type === '수입');
  const expenseRecords = records.filter(r => r.type === '지출');

  const incomeTotal = incomeRecords.reduce((acc, r) => acc + r.amount, 0);
  const expenseTotal = expenseRecords.reduce((acc, r) => acc + r.amount, 0);
  const netAmount = incomeTotal - expenseTotal;

  return {
    incomeCount: incomeRecords.length,
    incomeTotal,
    incomeAvg: incomeRecords.length > 0 ? Math.round(incomeTotal / incomeRecords.length) : 0,
    expenseCount: expenseRecords.length,
    expenseTotal,
    expenseAvg: expenseRecords.length > 0 ? Math.round(expenseTotal / expenseRecords.length) : 0,
    netAmount,
  };
};
