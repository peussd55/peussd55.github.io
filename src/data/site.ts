// 사이트 전체에서 쓰는 값.
export const site = {
  name: '박은수',
  title: '박은수 · AI 엔지니어',
  description:
    '검색엔진 엔지니어로 시작해 인텐트 챗봇을 거쳐 LLM 에이전트 개발 중. 지금은 AI 컨택센터 솔루션 회사에서 실시간 AI 콜봇 · 챗봇과 에이전트 개발 · 운영.',
  github: 'https://github.com/peussd55',
  email: 'balet99c@gmail.com',
  // 공개된 글이 이 수보다 적으면 메뉴에 "글"을 내놓지 않는다.
  minPostsForList: 2,
};

// 글의 분류. 글 목록의 분류 메뉴와 프로필 "주요 업무"의 묶음이 이 이름을 쓴다.
export const categories = [
  '실시간 음성 에이전트',
  'RAG와 에이전트',
  'LLM 서빙과 평가',
  '사내 AX',
  '에이전트와 일하는 법',
  '그 밖에',
] as const;

// 글의 종류에 붙는 이름표. 글 머리말의 kind 값 → 글 탭의 종류 줄과 글 제목 위 꼬리표에 보이는 말.
export const kindLabels = {
  troubleshooting: '트러블슈팅',
  opinion: '견해',
} as const;
