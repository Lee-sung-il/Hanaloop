# HanaLoop: 탄소 배출량 대시보드 과제
안녕하세요, HanaLoop 프론트엔드 개발자 과제에 참여한 **이성일**입니다. 본 프로젝트는 Next.js, TypeScript, Tailwind CSS를 기반으로, 과제 명세서에 제시된 탄소 배출량 데이터를 시각화하는 단일 페이지 웹 애플리케이션입니다.

## ✨ 주요 기능

- 기업 목록 조회
- 월별 온실가스 배출량을 포함한 기업별 상세 정보 확인
- 각 월별 배출량 기록에 대한 노트 추가, 수정 및 조회
- 다크 모드 지원
- 다양한 화면 크기에 대응하는 반응형 디자인

## 🛠️ 기술 스택

- **프레임워크**: [Next.js](https://nextjs.org/)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 컴포넌트**: [Shadcn/ui](https://ui.shadcn.com/)
- **데이터 페칭 & 상태 관리**: [TanStack Query](https://tanstack.com/query/latest)
- **폼 관리**: [React Hook Form](https://react-hook-form.com/)
- **스키마 검증**: [Zod](https://zod.dev/)

## 🚀 시작하기

### 준비물

- [Node.js](https://nodejs.org/) (v18.x 이상 권장)
- [npm](https://www.npmjs.com/) 또는 [yarn](https://yarnpkg.com/)

### 설치

1.  레포지토리를 복제합니다:
    ```bash
    git clone <repository-url>
    ```
2.  프로젝트 디렉터리로 이동합니다:
    ```bash
    cd hanaloop-dashboard
    ```
3.  의존성을 설치합니다:
    ```bash
    npm install
    ```

### 개발 서버 실행

다음 명령어를 실행하여 개발 서버를 시작합니다:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 주소를 열어 결과를 확인하세요.

## 📂 프로젝트 구조

```
.
├── public/              # 정적 에셋
├── src/
│   ├── app/             # Next.js 앱 라우터 페이지 및 레이아웃
│   ├── components/      # 재사용 가능한 리액트 컴포넌트 (UI, 레이아웃, 차트)
│   ├── data/            # 개발용 시드 데이터
│   ├── hooks/           # 커스텀 리액트 훅 (예: useCompany, usePosts)
│   └── lib/             # 핵심 로직, API 함수, 타입 및 유틸리티
├── package.json         # 프로젝트 의존성 및 스크립트
└── ...
```
