import { createClient } from './supabase';
import { GyeongjoRecord } from '@/types';

// DB 레코드를 앱 타입으로 변환
function mapToGyeongjoRecord(data: any): GyeongjoRecord {
  return {
    id: data.id,
    date: data.date,
    category: data.category,
    eventName: data.event_name || '',
    person: data.person,
    relation: data.relation,
    amount: data.amount,
    type: data.type,
    memo: data.memo || '',
    createdAt: data.created_at,
  };
}

export const database = {
  // 모든 레코드 가져오기
  async getRecords(): Promise<GyeongjoRecord[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('gyeongjo_records')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching records:', error);
      return [];
    }

    return (data || []).map(mapToGyeongjoRecord);
  },

  // 레코드 추가
  async addRecord(record: Omit<GyeongjoRecord, 'id' | 'createdAt'>): Promise<GyeongjoRecord | null> {
    const supabase = createClient();

    const insertData = {
      date: record.date,
      category: record.category,
      event_name: record.eventName || null,
      person: record.person,
      relation: record.relation,
      amount: record.amount,
      type: record.type || '지출',
      memo: record.memo || null,
    };

    console.log('Inserting data:', insertData);

    const { data, error } = await supabase
      .from('gyeongjo_records')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Error adding record:', error);
      return null;
    }

    console.log('Inserted successfully:', data);
    return mapToGyeongjoRecord(data);
  },

  // 레코드 삭제
  async deleteRecord(id: string): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
      .from('gyeongjo_records')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting record:', error);
      return false;
    }

    return true;
  },

  // 레코드 업데이트
  async updateRecord(id: string, updates: Partial<GyeongjoRecord>): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
      .from('gyeongjo_records')
      .update({
        date: updates.date,
        category: updates.category,
        event_name: updates.eventName,
        person: updates.person,
        relation: updates.relation,
        amount: updates.amount,
        type: updates.type,
        memo: updates.memo,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating record:', error);
      return false;
    }

    return true;
  },
};
