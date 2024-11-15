# Inplace ( Team7_FE )

<p align="center">
  <img src="https://i.ibb.co/CVBQHPg/image-2.png" alt="메인 이미지">
</p>

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

# 목차

1. [**프로젝트 개요**](#-프로젝트-개요)
   > 1.1 [**프로젝트 목적**](#-프로젝트-목적)
   >
   > 1.2 [**서비스 정보**](#-서비스-정보)
   >
   > 1.3 [**배포 주소**](#-배포-주소)

2. [**프로그램 구조**](#%EF%B8%8F-프로그램-구조)
   > 2.1 [**설치**](#-설치)
   >
   > 2.2 [**폴더 구조**](#-폴더-구조)
   > 
   > 2.3 [**프로그램 구조도**](#%EF%B8%8F-프로그램-구조도)
   >
   > 2.4 [**API & ERD**](#-api--erd)

4. [**개발 정보**](#-개발-정보)
   > 3.1 [**개발 기간**](#-개발-기간)
   >
   > 3.2 [**팀원**](#-팀원)
   >
   > 3.3 [**저장소 정보**](#-저장소-정보)

5. [**기술 정보**](#%EF%B8%8F-기술-정보)
   > 4.1 [**주요 종속성 버전**](#-주요-종속성-버전)
   >
   > 4.2 [**기술 스택**](#-기술-스택)

6. [**테스트**](#-테스트)

7. [**기능 및 사용 예시**](#-기능-및-사용-예시)
   > 6.1 [**세부 기능 흐름**](#-세부-기능-흐름)
   >
   > 6.2 [**사용 예시**](#-사용-예시)

---

# 📝 프로젝트 개요

## 🙌 프로젝트 목적

> 저희의 아이디어는 **데이트 코스의 단조로움**을 어떻게 하면 해소할 수 있을까? 💡 라는 생각에서 시작했습니다.
>
> 아이디어를 구체화하는 과정에서 저희는 **장소**에 관련된 소재로 인스타, 유튜브 등의 SNS 및 동영상 플랫폼 📱의 성장과 함께 등장한 **인플루언서** 라는 개념에 집중하게
> 되었습니다.
>
> 이는 **인플루언서가 방문한 장소에 대한 정보를 서비스 해보자!** 📍 라는 생각으로 이어졌습니다.
>
> 이를 통해 사용자가 관심있는 **인플루언서를 등록하고, 이에 따른 장소 추천 및, 장소에 대한 리뷰 기능** 📋을 제공하여, **Inplace** 라는 저희만의 웹
> 애플리케이션으로 구현해보았습니다.

## 📋 서비스 정보

> 긴 영상은 필요 없어요 인플루언서가 다녀간 쿨플, 한눈에 쏙!

1. **회원가입 및 로그인**
    - Spring Security를 이용한 OAuth 2.0 카카오 로그인 기능을 사용합니다
    - 쿠키에 Access, Refresh Token을 담아 사용하며, Refresh 동작을 수행할 수 있습니다
2. **현재 위치 기반 서비스**
    - 웹 페이지의 위치 정보 사용에 동의시, 카카오 API와 내 위치 정보를 사용하여 주변의 장소 정보와, 자동 지도 위치 설정을 사용할 수 있습니다
3. **통합 검색 서비스**
    - Elastic Search를 사용한 인플루언서, 장소, 비디오 이름에 대한 통합 검색 기능을 사용할 수 있습니다
4. **관심 인플루언서 등록 및 이를 토대로 한 서비스**
    - 최초 로그인 시 & 인플루언서 페이지에서 관심 인플루언서를 등록할 수 있습니다
    - 이를 토대로 메인 페이지에서 관심 인플루언서의 최신 방문 장소를 확인할 수 있습니다
5. **지도 기반 검색 서비스**
    - 지도 API를 이용하여 장소를 검색할 수 있습니다
        - 관심 등록하지 않은 인플루언서 및 주소, 장소 태그를 이용하여 세부 검색이 가능합니다
6. **장소 세부 정보 서비스**
    - 장소의 세부 정보를 열람할 수 있습니다
    - 장소에 달린 다른 유저들의 리뷰를 확인할 수 있습니다
    - 장소에 대한 좋아요 기능을 사용할 수 있습니다
    - 장소 세부 페이지에서 장소에 대한 정보를 카카오톡 메세지로 받아 볼 수 있습니다
7. **리뷰 기능**
    - 장소 정보를 받은 후 3일 뒤, 해당 장소에 대한 리뷰 링크를 받아 리뷰를 작성할 수 있습니다
    - 위 기능들은 카카오톡 메세지 보내기 API를 이용하며, 카카오톡으로 전송되는 링크는 모바일 뷰를 지원합니다
8. **마이 페이지 기능**
    - 좋아요 표시한 장소, 인플루언서를 관리할 수 있습니다
    - 내가 작성한 리뷰를 관리할 수 있습니다
    - 사용자 닉네임을 변경할 수 있습니다

## 🌐 배포 주소

> **BackEnd** : [**_api.inplace.my_**](https://api.inplace.my)
>
> **FrontEnd**: [**_inplace.my_**](https://inplace.my)

---

# 🏗️ 프로그램 구조

## ✨ 설치
현재 프로젝트는 Kakao 지도 API를 사용해서 환경 변수 설정이 필요합니다. 아래 명령어를 실행하고, 키값을 입력해야 합니다.
<br/>`cp .env.example .env`

## 📜 폴더 구조
```bash
.root
├── node_modules
├── public
├── src
│   ├── 📜 api
│   │   ├── hooks       // api 호출과 관련된 custom hook
│   │   ├── instance    // 기본 api의 axios instance
│   ├── 📜 assets          // 이미지, 폰트 등 미디어 파일
│   ├── 📜 components      // 주요 컴포넌트
│   │   ├── common    // 여러 페이지에서 공통으로 사용되는 컴포넌트
│   │   ├── Main    // 페이지별 사용되는 컴포넌트
│   │   ├── ...
│   ├── 📜 hooks           // 커스텀 훅
|   ├── 📜 libs       // react에서 제공하는 기능에 의존하지 않는 함수
|   ├── 📜 mocks     // mock 데이터 핸들러
│   ├── 📜 pages           // 페이지 컴포넌트
│   ├── 📜 provider
│   │   ├── Auth    // 사용자 정보 전역 상태로 관리
│   ├── 📜 routes
│   │   ├── component    // 토큰이 필요한 라우트를 위한 컴포넌트
│   └── 📜 types           // 타입 정의
│   ├── 📜 pages           // 페이지 컴포넌트
└── └── 📜 utils           // 공통함수, 상수 등

```
## 🖼️ 프로그램 구조도

## 📊 API & ERD

![image](https://github.com/user-attachments/assets/ce11ff39-8294-4eda-aa58-7b5bd0ac1620)

- [🚗 Visit Team7 API](https://www.notion.so/API-9e96d1ef1475414b861a50d0e4ca366e)

![image](https://github.com/user-attachments/assets/333c9f3b-6678-48a6-b32d-b9b36d8cb182)

- [🙋‍♂️ Visit Team7 ERD](https://www.notion.so/ERD-36ec8e40cb264abe87588e97ae77ac55)

---

# 👨‍💻 개발 정보

## 📅 개발 기간

> **_2024.08.22 ~ 2024.11.15_**

## 👥 팀원

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

## 📂 저장소 정보

> **Using Language**
>
![GitHub language count](https://img.shields.io/github/languages/count/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub top language](https://img.shields.io/github/languages/top/kakao-tech-campus-2nd-step3/Team7_FE)

> **Repo, Code Volume**
>
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub repo size](https://img.shields.io/github/repo-size/kakao-tech-campus-2nd-step3/Team7_FE)

> **Commit Avg**
>
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/kakao-tech-campus-2nd-step3/Team7_FE)

> **Issues**
>
![GitHub open issues](https://img.shields.io/github/issues/kakao-tech-campus-2nd-step3/Team7_FE)
![GitHub closed issues](https://img.shields.io/github/issues-closed/kakao-tech-campus-2nd-step3/Team7_FE)

> **PRs**
>
![GitHub pull requests](https://img.shields.io/github/issues-pr/kakao-tech-campus-2nd-step3/Team7_FE?label=open%20pull%20requests)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/kakao-tech-campus-2nd-step3/Team7_FE?label=closed%20pull%20requests)

---

# 🛠️ 기술 정보

## 🧩 주요 종속성 버전

## 🚀 기술 스택

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

---

# ✅ 테스트

> **테스트 시나리오** : https://www.notion.so/9ed68b292c004fc69f7eaad513054d96
>
> **테스트 결과보고서** : https://www.notion.so/08a520d3b8c44154a19425b0bcc16f6f

---

# 🎬 기능 및 사용 예시

## 🔍 세부 기능 흐름

## 📱 사용 예시

> 실제 유저 사용 페이지 흐름 보여주기 ( 영상 x )
