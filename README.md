# coingecko_test react18 + typescript
코인게코 api를 이용한 가상자산 리스트

### 주요 환경 셋팅 🐈
- react18
- typescript
- axios (API 통신)
- React Query (Server 상태관리)
- zustand (내부 상태관리)

### 최초 다운로드 후 해야할 것들 🐈
1. npm install -g yarn (yarn 설치)
2. yarn install(node_modules 다운로드) <!-- 글로벌 npm 설치 되어있을 경우 2번부터 실행 ->
3. yarn start

### 기능요구사항 🐈
1. 가상자산 시세 리스트
  - 코인게코에서 제공하는 마켓 api 사용
  - 가격은 소수점 2자리수 까지 표시
  - sort기능 추가
  - 필터 추가
  - toast ui(라이브러리X) 추가
  - 북마크 coin id 쿠키 저장
2. 북마크 리스트
  - 저장된 북마크 리스트 화면 출력
3. 코인 디테일
