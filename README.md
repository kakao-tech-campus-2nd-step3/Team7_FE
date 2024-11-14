# Team7_FE
인플레이스

### Repository Info
![GitHub language count](https://img.shields.io/github/languages/count/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub top language](https://img.shields.io/github/languages/top/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub repo size](https://img.shields.io/github/repo-size/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub open issues](https://img.shields.io/github/issues/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub closed issues](https://img.shields.io/github/issues-closed/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/kakao-tech-campus-2nd-step3/Team7_FE)

### Installation
현재 프로젝트는 Kakao 지도 API를 사용해서 환경 변수 설정이 필요합니다. 아래 명령어를 실행하고, 키값을 입력해야 합니다.<br/>
`cp .env.example .env`

### 폴더 구조 설명
```bash
.root
├── node_modules
├── public
├── src
│   ├── api
│   │   ├── hooks       // api 호출과 관련된 custom hook
|   │   ├── libs       // react에서 제공하는 기능에 의존하지 않는 함수
│   │   ├── instance    // 기본 api의 axios instance
│   ├── assets          // 이미지, 폰트 등 미디어 파일
│   ├── components      // 주요 컴포넌트
│   │   ├── common    // 여러 페이지에서 공통으로 사용되는 컴포넌트
│   │   ├── Main    // 페이지별 사용되는 컴포넌트
│   │   ├── Influencer    // 페이지별 사용되는 컴포넌트
│   ├── provider
│   │   ├── Auth    // 사용자 정보 전역 상태로 관리
│   ├── routes
│   │   ├── component    // 토큰이 필요한 라우트를 위한 컴포넌트
│   ├── hooks           // 커스텀 훅
│   ├── pages           // 페이지 컴포넌트
│   └── utils           // 공통함수, 상수 등
└── └── types           // 타입
```

### Contributor
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<table>
  <tr>
    <td align="center">
       <b>Frontend</b><br />
    </td>
    <td align="center">
       <b>Frontend</b><br />
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/userjmmm"><img src="https://avatars.githubusercontent.com/u/141299582?v=4" width="80px;" alt=""/><br /><sub><b>이정민</b></sub></a>
    </td>
    <td align="center">
      <a href="https://github.com/Hyoeunkh"><img src="https://avatars.githubusercontent.com/u/102338613?v=4" width="80px;" alt=""/><br /><sub><b>이효은</b></sub></a>
    </td>
  </tr>
</table>
<table>
  <tr>
    <td align="center">
      <b>Backend</b><br />
    </td>
    <td align="center">
      <b>Backend</b><br />
    </td>
    <td align="center">
      <b>Backend</b><br />
    </td>
    <td align="center">
      <b>Backend</b><br />
    </td>
    <td align="center">
      <b>Backend</b><br />
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/sanghee0820"><img src="https://avatars.githubusercontent.com/u/102018082?v=4" width="80px;" alt=""/><br /><sub><b>이상희</b></sub></a>
    </td>
    <td align="center">
      <a href="https://github.com/dong-yxxn"><img src="https://avatars.githubusercontent.com/u/129285999?v=4" width="80px;" alt=""/><br /><sub><b>김동윤</b></sub></a>
    </td>
    <td align="center">
      <a href="https://github.com/suhyeon7497"><img src="https://avatars.githubusercontent.com/u/137245467?v=4" width="80px;" alt=""/><br /><sub><b>정수현</b></sub></a>
    </td>
    <td align="center">
      <a href="https://github.com/wndlthsk"><img src="https://avatars.githubusercontent.com/u/80496766?v=4" width="80px;" alt=""/><br /><sub><b>우현서</b></sub></a>
    </td>
    <td align="center">
      <a href="https://github.com/BaeJunH0"><img src="https://avatars.githubusercontent.com/u/114082026?v=4" width="80px;" alt=""/><br /><sub><b>배준호</b></sub></a>
    </td>
  </tr>
</table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

### 기술 스택
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat-square&logo=chakraui&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-C865B9?style=flat-square&logo=emotion&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?style=flat-square&logo=testing-library&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Context API](https://img.shields.io/badge/Context%20API-61DAFB?style=flat-square&logo=react&logoColor=black)
![Day.js](https://img.shields.io/badge/Day.js-FF5F57?style=flat-square&logo=dayjs&logoColor=white)
![date-fns](https://img.shields.io/badge/date--fns-00897B?style=flat-square&logo=date-fns&logoColor=white)
![React Datepicker](https://img.shields.io/badge/React%20Datepicker-61DAFB?style=flat-square&logo=react&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
