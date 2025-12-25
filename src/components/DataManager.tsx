'use client';

import { useRef } from 'react';
import { storage } from '@/lib/storage';
import { initialData } from '@/lib/initialData';

interface DataManagerProps {
  onDataChange: () => void;
}

export default function DataManager({ onDataChange }: DataManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = storage.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `경조사_백업_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        storage.importFromJSON(json);
        onDataChange();
        alert('데이터를 성공적으로 불러왔습니다.');
      } catch (error) {
        alert('파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadSampleData = () => {
    if (!confirm('샘플 데이터를 불러오시겠습니까? 기존 데이터에 추가됩니다.')) return;

    const records = storage.getRecords();
    if (records.length > 0) {
      if (!confirm('기존 데이터가 있습니다. 그래도 샘플 데이터를 추가하시겠습니까?')) return;
    }

    initialData.forEach(data => {
      storage.addRecord(data);
    });

    onDataChange();
    alert('샘플 데이터를 불러왔습니다.');
  };

  const handleClearAll = () => {
    if (!confirm('모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;

    storage.clearAll();
    onDataChange();
    alert('모든 데이터가 삭제되었습니다.');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">데이터 관리</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleExport}
          className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
        >
          📥 내보내기
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
        >
          📤 불러오기
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />

        <button
          onClick={handleLoadSampleData}
          className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
        >
          📝 샘플 데이터
        </button>

        <button
          onClick={handleClearAll}
          className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
        >
          🗑️ 전체 삭제
        </button>
      </div>
    </div>
  );
}
