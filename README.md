<div align="center">
  <img src="./logo.svg" alt="Recon Extension Logo" width="180" />

  <p><strong>사용자의 웹서핑 경험에 안전을 보장합니다.</strong></p>
  <p>피싱 위험이 있는 웹사이트를 실시간으로 탐지하고 차단하여 안전한 인터넷 환경을 제공하는 브라우저 확장 프로그램입니다.</p>

  <p>
    <a href="https://github.com/bean-noodles/recon-extension/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Recon Extension is released under the MIT license." />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.8-blue" alt="TypeScript" />
    </a>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-19.1-61dafb" alt="React" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-6.3-646cff" alt="Vite" />
    </a>
  </p>
</div>

## 🛠️ 기술 스택 (Tech Stack)

- **Fremework**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Package Manager**: [PNPM](https://pnpm.io/)
- **Build System**: [Turbo Repo](https://turbo.build/)
- **Extension**: Manifest V3

> 이 프로젝트는 [Jonghakseo/chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)를 기반으로 제작되었습니다.

## 👥 개발자 (Developers)

| [<img src="https://github.com/SID12g.png" width="100px;"/><br /><sub><b>SID12g</b></sub>](https://github.com/SID12g) | [<img src="https://github.com/dodo07070707.png" width="100px;"/><br /><sub><b>dodo07070707</b></sub>](https://github.com/dodo07070707) |
| :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: |

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 전제 조건 (Prerequisites)

이 서비스는 정상적인 작동을 위해 **백엔드 서버**가 필요합니다.

- [Node.js](https://nodejs.org/) (v22.15.1 이상)
- [PNPM](https://pnpm.io/) (Package Manager)

### 설치 (Installation)

1. 저장소를 클론합니다.

   ```bash
   git clone https://github.com/bean-noodles/recon-extension.git
   cd recon-extension
   ```

2. 의존성을 설치합니다.
   ```bash
   pnpm install
   ```

### 빌드 (Build)

프로덕션 배포를 위해 확장 프로그램을 빌드합니다.

```bash
pnpm build
```

빌드된 파일은 `dist` 디렉토리에 생성됩니다.

## 📂 프로젝트 구조 (Project Structure)

이 프로젝트는 Monorepo 구조로 관리됩니다.

```
recon-extension/
├── chrome-extension/   # 확장 프로그램 Manifest 및 설정
├── packages/           # 공유 패키지 및 유틸리티
│   ├── ui/             # 공통 UI 컴포넌트
│   ├── shared/         # 공유 로직
│   └── ...
├── pages/              # 확장 프로그램 페이지 (Popup, Options 등)
└── ...
```
