# HanaLoop: 탄소 배출량 대시보드 과제
안녕하세요, HanaLoop 프론트엔드 개발자 과제에 참여한 **이성일**입니다. 본 프로젝트는 Next.js, TypeScript, Tailwind CSS를 기반으로, 과제 명세서에 제시된 탄소 배출량 데이터를 시각화하는 단일 페이지 웹 애플리케이션입니다.

## 🌐 라이브 데모 (Live Demo)

프로젝트 결과는 다음 주소에서 확인하실 수 있습니다:
[hanaloop-prfpqis7a-lee-sung-ils-projects.vercel.app](https://hanaloop.vercel.app/)


![하나루프 메인](https://github.com/user-attachments/assets/7e2edc71-b026-4a76-9dff-59fae99e8d03)

![하나루프 회사 추가](https://github.com/user-attachments/assets/91fc1ac2-10b8-424c-b953-3be441089c09)

![하나루프 다크모드](https://github.com/user-attachments/assets/6a213d33-ccdb-4a97-9f6f-4bb88b52f2d9)


## ✨ 주요 기능

- 기업 목록 조회
- 월별 온실가스 배출량을 포함한 기업별 상세 정보 확인
- 각 월별 배출량 기록에 대한 노트 추가, 수정 및 조회
- 다크 모드 지원
- 다양한 화면 크기에 대응하는 반응형 디자인
- 회사 추가 기능

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
    git clone <https://github.com/Lee-sung-il/Hanaloop.git>
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
```
## 주요 설계 결정
데이터 보강 (Data Enrichment):

명세서의 GhgEmission 타입에 source 필드가 있었지만 예시 데이터에는 누락되어 있었습니다. '배출원 별 분석' 같은 더 풍부한 기능을 구현하기 위해, 시드 데이터에 source("Electricity", "Transport" 등) 정보를 자체적으로 추가했습니다. 이는 제품의 확장 가능성을 고려한 결정입니다.

상태 관리 (State Management):

서버 상태: TanStack Query (React Query)를 도입하여 API 데이터의 로딩/에러 상태 처리, 캐싱, 데이터 자동 새로고침(invalidateQueries)을 효율적으로 관리했습니다.

클라이언트 상태: useState 훅을 사용하여 모달의 열림/닫힘 같은 간단한 UI 상태를 관리했습니다.


UI/UX 및 디자인 시스템
shadcn/ui 선택의 적절성: '무거운 컴포넌트 라이브러리 사용 금지'라는 제약 조건에 맞춰, 컴포넌트의 소유권을 가지면서도 전문적인 디자인을 제공하는 shadcn/ui를 선택한 것은 매우 합리적인 결정입니다. 커스터마이징의 자유도와 요구사항 준수라는 두 마리 토끼를 모두 잡았습니다.

다크 모드 구현: **next-themes**를 활용하여 다크 모드를 지원한 것은, 사용자 경험(UX)을 향상시키려는 노력이 돋보이는 부분입니다.


아키텍처 개요
레이아웃: CSS Grid (grid-cols-[256px_1fr])를 사용하여 사이드바와 메인 콘텐츠 영역으로 구성된 안정적인 2단 레이아웃을 구현했습니다. 이는 다양한 화면 크기에서도 깨지지 않는 견고한 구조를 제공합니다.

데이터 흐름:

페이지 컴포넌트가 커스텀 훅(useCompanies, useCompany 등)을 호출합니다.

커스텀 훅은 내부적으로 TanStack Query를 사용해 /lib/api.ts의 API 함수를 호출합니다.

TanStack Query가 데이터 상태를 관리하고, 페이지는 이 상태에 따라 UI를 렌더링합니다

자체 평가 및 개선 계획 (트레이드오프)
주어진 시간 내에 핵심 기능 구현에 집중하기 위해 일부 요소를 생략했으나, 이들에 대한 개선 계획을 명확히 제시합니다.

테스트: 향후 Jest/RTL을 도입하여 /lib/api.ts (비즈니스 로직)와 useQuery 훅을 우선적으로 테스트하여 코드의 안정성을 높일 계획입니다.

사이드바 동적 생성: 회사 목록 증가에 대비하여 검색 기능과 React Virtualization을 적용하여 UX 및 성능을 개선할 예정입니다.
```
