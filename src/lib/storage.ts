import { GyeongjoRecord } from '@/types';

const STORAGE_KEY = 'gyeongjo-records';

export const storage = {
  getRecords: (): GyeongjoRecord[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveRecords: (records: GyeongjoRecord[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  },

  addRecord: (record: Omit<GyeongjoRecord, 'id' | 'createdAt'>): GyeongjoRecord => {
    const records = storage.getRecords();
    const newRecord: GyeongjoRecord = {
      ...record,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    records.push(newRecord);
    // 날짜순 정렬 (오래된 것부터)
    records.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    storage.saveRecords(records);
    return newRecord;
  },

  updateRecord: (id: string, updates: Partial<GyeongjoRecord>): void => {
    const records = storage.getRecords();
    const index = records.findIndex(r => r.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...updates };
      records.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      storage.saveRecords(records);
    }
  },

  deleteRecord: (id: string): void => {
    const records = storage.getRecords().filter(r => r.id !== id);
    storage.saveRecords(records);
  },

  exportToJSON: (): string => {
    const records = storage.getRecords();
    return JSON.stringify(records, null, 2);
  },

  importFromJSON: (json: string): void => {
    try {
      const records = JSON.parse(json);
      storage.saveRecords(records);
    } catch (e) {
      throw new Error('올바른 JSON 형식이 아닙니다.');
    }
  },

  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};
