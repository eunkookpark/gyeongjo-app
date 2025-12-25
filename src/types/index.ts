export interface GyeongjoRecord {
  id: string;
  date: string;
  category: '결혼' | '조의' | '돌' | '칠순' | '개업' | '기타';
  eventName: string;
  person: string;
  relation: '교우' | '친척' | '거래처' | '노회' | '친구' | '이웃' | '직장' | '기타';
  amount: number;
  type: '지출' | '수입';
  memo: string;
  createdAt: string;
}

export interface CategoryStats {
  category: string;
  count: number;
  total: number;
  average: number;
  percentage: number;
}

export interface YearlyStats {
  year: number;
  count: number;
  total: number;
  average: number;
  change: number | null;
}
