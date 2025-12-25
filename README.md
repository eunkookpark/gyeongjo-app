# 경조사 관리 앱

경조사 내역을 쉽게 관리할 수 있는 웹 애플리케이션입니다.

## 기능

- ✏️ **신규 등록**: 경조사 내역 등록 (날짜, 구분, 대상자, 금액 등)
- 📋 **전체 데이터**: 등록된 모든 데이터 조회, 검색, 필터링
- 📊 **대시보드**: 구분별/관계별/연도별 통계 시각화
- 💾 **데이터 관리**: JSON 내보내기/불러오기, 샘플 데이터

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- LocalStorage (데이터 저장)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## Vercel 배포

1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. "New Project" 클릭
3. GitHub 저장소 연결 또는 "Import Git Repository"
4. 프로젝트 폴더 선택 (`gyeongjo-app`)
5. "Deploy" 클릭

## 데이터 저장

- 모든 데이터는 브라우저의 LocalStorage에 저장됩니다
- 브라우저/기기별로 데이터가 분리됩니다
- JSON 내보내기/불러오기로 백업 및 이동 가능

## 구조

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Dashboard.tsx
│   ├── DataManager.tsx
│   ├── DataTable.tsx
│   ├── Navigation.tsx
│   └── RegisterForm.tsx
├── lib/
│   ├── initialData.ts
│   ├── stats.ts
│   └── storage.ts
└── types/
    └── index.ts
```
