// 사이트 전체에서 쓰는 값.
export const site = {
  name: '박은수',
  title: '박은수 · AI 엔지니어',
  description:
    '검색엔진 엔지니어로 시작해 인텐트 챗봇을 거쳐 LLM 에이전트를 만들고 있습니다. 지금은 AI 컨택센터 솔루션 회사에서 실시간 AI 콜봇 · 챗봇과 에이전트를 개발하고 운영합니다.',
  github: 'https://github.com/peussd55',
  email: 'balet99c@gmail.com',
  // 공개된 글이 이 수보다 적으면 메뉴에 "글"을 내놓지 않는다.
  minPostsForList: 2,
};

// 글의 분류. 글 목록의 분류 메뉴도 이 순서로 나온다.
export const categories = ['검색 · RAG', '에이전트', '서빙 · 평가', '운영'] as const;
