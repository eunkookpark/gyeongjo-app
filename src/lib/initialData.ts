import { GyeongjoRecord } from '@/types';

// 초기 샘플 데이터 (기존 엑셀 데이터 일부)
export const initialData: Omit<GyeongjoRecord, 'id' | 'createdAt'>[] = [
  { date: '2012-11-03', category: '결혼', eventName: '결혼식', person: '이은숙', relation: '교우', amount: 50000, type: '지출', memo: '진형이결혼식' },
  { date: '2013-04-27', category: '결혼', eventName: '결혼식', person: '이흥서/민혜숙', relation: '노회', amount: 50000, type: '지출', memo: '온라인송금' },
  { date: '2013-10-03', category: '결혼', eventName: '결혼식', person: '박용수형님', relation: '친척', amount: 500000, type: '지출', memo: '서울 더 베네치아3층' },
  { date: '2013-11-10', category: '조의', eventName: '장례식', person: '노덕오', relation: '교우', amount: 50000, type: '지출', memo: '사천장례식장' },
  { date: '2013-11-12', category: '조의', eventName: '장례식', person: '이정희', relation: '기타', amount: 500000, type: '지출', memo: '집에서' },
  { date: '2013-11-23', category: '결혼', eventName: '결혼식', person: '김정수장로', relation: '노회', amount: 50000, type: '지출', memo: '시동제일교회' },
  { date: '2013-12-25', category: '결혼', eventName: '결혼식', person: '박용수형님', relation: '친척', amount: 300000, type: '지출', memo: '울산mbc컨벤션' },
  { date: '2014-09-05', category: '결혼', eventName: '결혼식', person: '고병길장로', relation: '교우', amount: 100000, type: '지출', memo: '정택이결혼' },
  { date: '2015-04-25', category: '결혼', eventName: '결혼식', person: '최덕화 둘째 딸', relation: '교우', amount: 50000, type: '지출', memo: '포항에서' },
  { date: '2015-08-08', category: '결혼', eventName: '결혼식', person: '박만오 딸', relation: '거래처', amount: 100000, type: '지출', memo: '' },
  { date: '2016-06-18', category: '칠순', eventName: '칠순잔치', person: '김연희집사남편', relation: '교우', amount: 50000, type: '지출', memo: '돈우마을에서' },
  { date: '2017-06-10', category: '결혼', eventName: '결혼식', person: '김정숙권사', relation: '교우', amount: 100000, type: '지출', memo: '딸결혼' },
  { date: '2018-03-03', category: '결혼', eventName: '결혼식', person: '김미영성도', relation: '교우', amount: 50000, type: '지출', memo: '딸결혼' },
  { date: '2019-05-11', category: '결혼', eventName: '결혼식', person: '최정래권사', relation: '교우', amount: 100000, type: '지출', memo: '아들결혼' },
  { date: '2020-02-22', category: '결혼', eventName: '결혼식', person: '김종한', relation: '친척', amount: 100000, type: '지출', memo: '아들결혼' },
  { date: '2022-03-26', category: '결혼', eventName: '결혼식', person: '주호진', relation: '교우', amount: 50000, type: '지출', memo: '아들결혼식' },
  { date: '2023-08-29', category: '조의', eventName: '장례식', person: '김대섭집사', relation: '교우', amount: 100000, type: '지출', memo: '모친소천' },
  { date: '2024-10-11', category: '조의', eventName: '장례식', person: '황기정권사', relation: '교우', amount: 50000, type: '지출', memo: '시모 소천' },
  { date: '2024-11-15', category: '개업', eventName: '구순감사예배', person: '김차순권사', relation: '친척', amount: 4000000, type: '지출', memo: 'SL호텔부페,타올,케잌' },
  { date: '2025-04-21', category: '개업', eventName: '목사안수', person: '최인기', relation: '교우', amount: 100000, type: '지출', memo: '춘천에서 안수식' },
  { date: '2025-10-04', category: '칠순', eventName: '칠순', person: '최승선목사', relation: '노회', amount: 200000, type: '지출', memo: '' },
  { date: '2025-11-22', category: '결혼', eventName: '결혼식', person: '김희성장로', relation: '노회', amount: 100000, type: '지출', memo: '온라인송금' },
  { date: '2025-12-20', category: '결혼', eventName: '결혼식', person: '에벤에셀 딸', relation: '거래처', amount: 100000, type: '지출', memo: '청주에서 딸결혼' },
];
