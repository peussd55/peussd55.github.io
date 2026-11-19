// 프로필 화면의 내용. 화면 배치(src/pages/index.astro)와 나눠 둔다 — 내용을 고칠 때는 이 파일만 고친다.

export const headline = 'RAG·LLM 서비스에 특화된 AI 엔지니어';

export const lead =
  '검색엔진 엔지니어로 시작해 인텐트 챗봇을 거쳐 LLM 에이전트 개발 중. 지금은 AI 컨택센터 솔루션 회사에서 실시간 AI 콜봇 · 챗봇과 에이전트 개발 · 운영.';

// 한눈에
export const glance = {
  career: [
    { date: '2025.11 – 현재', text: 'AI 컨택센터 솔루션 회사 · AI 엔지니어' },
    { date: '2025.05 – 2025.11', text: '[IBM x RedHat] AX(AI Transformation) 과정 수료' },
    { date: '2020.09 – 2024.04', text: '검색 · 챗봇 솔루션 회사 · 솔루션 구축 및 웹개발' },
  ],
  awards: [
    {
      date: '2026.11',
      text: 'SK하이닉스 AI 해커톤 2026 AI Challenge상(도전상) · Top 20',
      note: '수여: SK하이닉스 대표이사 사장',
    },
    {
      date: '2024.11',
      text: '2024 뉴스빅데이터 해커톤 우수상',
      note: '수여: 한국언론진흥재단 이사장 · 팀 수상',
    },
    { date: '2024.11', text: '데이터분석 준전문가(ADsP)', note: '한국데이터산업진흥원' },
    { date: '2019.11', text: '정보처리기사', note: '한국산업인력공단' },
  ],
  doing: ['실시간 음성 에이전트', 'RAG와 에이전트', 'LLM 서빙과 평가', '사내 AX'],
};

// 소개 — hl: true 인 조각만 강조색으로 굵게 나온다.
export const about = [
  [
    { t: '일하는 방식: 측정 먼저, 측정값으로 결정. ' },
    { t: '평가셋과 기준선', hl: true },
    { t: '을 만든 뒤 수정.' },
  ],
  [
    { t: '주무기: ' },
    { t: '검색과 RAG', hl: true },
    { t: '. 검색 품질 측정 · 개선에서 출발해 에이전트로 확장.' },
  ],
];

// 경력 연표
export const career = [
  {
    date: '2025.11 – 현재',
    title: 'AI 컨택센터 솔루션 회사',
    role: 'AI 엔지니어',
    topics: [],
    subs: [
      {
        title: '실시간 AI 콜봇 · 챗봇과 에이전트 개발 및 운영',
        topics: [
          {
            k: '구축/운영',
            v: '전화 교환기와 AI 콜봇 · 챗봇을 통합한 컨택센터 솔루션 개발, 의료 도메인 등 복수 고객사 실서비스 운영',
          },
          {
            k: '실시간 음성',
            v: '음성인식(STT) · LLM · 음성합성(TTS)을 잇는 스트리밍 파이프라인 구축, 통화 기록 전수로 응답 지연을 측정하는 지표 체계 구축',
          },
          {
            k: '에이전트',
            v: '단계 전환과 도구 호출은 코드가 관리하고 LLM은 판단과 답변을 맡는 구조 설계, 되돌릴 수 없는 작업 앞의 사람 승인 게이트 설계 및 구현',
          },
          {
            k: '평가',
            v: '평가셋과 기준선으로 검색 · 응답 품질을 측정한 뒤 수정, 고객사 평가지를 자동으로 재연해 반복 채점',
          },
          {
            k: 'LLM 서빙',
            v: '온프레미스 공유 GPU 한 장으로 LLM 서빙, 동시 처리 용량을 판정하는 벤치마크 설계',
          },
          {
            k: '사내 AX',
            v: 'LLM 게이트웨이와 사내 AI 채팅 도구의 전사 도입 및 운영(팀별 예산과 모델 정책 관리)',
          },
          {
            k: '협업 방식',
            v: '코딩 에이전트와 상시 협업(방향과 끝의 기준을 정하고, 결과는 직접 써 보고 확인)',
          },
        ],
      },
    ],
  },
  {
    date: '2020.09 – 2024.04',
    title: '검색 · 챗봇 솔루션 회사',
    role: '솔루션 구축 및 웹개발',
    topics: [],
    subs: [
      {
        title: '검색엔진 구축 및 웹(API)개발 (2년 6개월)',
        topics: [
          {
            k: '구축/운영',
            v: '자사 검색엔진 솔루션을 활용한 IR 시스템 구축 및 고객사 요구사항에 맞게 커스터마이징',
          },
          {
            k: '데이터 파이프라인',
            v: 'RDB(Oracle/MySQL)에서 데이터를 수집/색인하는 데이터 파이프라인 설계 및 운영',
          },
          {
            k: '백엔드',
            v: '검색엔진 API를 활용하여, JSP/Spring MVC 환경에서 통합검색 백엔드 로직 및 API(JSON, XML) 개발',
          },
          { k: '프론트엔드', v: '고객사 요구사항에 맞춘 통합검색 UI(JSP, jQuery) 개발' },
        ],
      },
      {
        title: '챗봇 구축 및 웹개발 (1년)',
        topics: [
          {
            k: '구축/운영',
            v: '자사 챗봇 솔루션 설치, 운영 및 고객사 요구사항에 맞춘 커스텀 개발 (Java)',
          },
          {
            k: '검색 연계',
            v: '챗봇의 인텐트 답변 한계를 극복하기 위해, 검색엔진을 챗봇 시나리오와 연계하는 시스템 개발',
          },
          {
            k: '경험',
            v: '이 과정에서 키워드/인텐트 기반 시스템의 명확한 한계를 실무에서 경험 (LLM/RAG 전환의 핵심 동기)',
          },
          { k: '협업', v: '지식구축팀, 기획팀과 협업하여 인텐트 적재 및 관리도구 커스터마이징 수행' },
        ],
      },
    ],
  },
];

// 주요 업무 — 이름 붙은 묶음. name 은 글의 분류(src/data/site.ts)와 같아야 하고, 그 분류의 글 제목이 묶음 아래에 자동으로 붙는다.
// 구체적인 수치는 여기에 적지 않고 글에서 보여 준다.
export const work = [
  {
    name: '실시간 음성 에이전트',
    summary: 'STT · LLM · TTS를 잇는 실시간 파이프라인, 의료 도메인 콜봇 실서비스 운영',
  },
  {
    name: 'RAG와 에이전트',
    summary:
      '평가셋으로 검색 품질을 측정 · 개선, 대화 흐름은 코드가 관리하고 LLM은 답변만 맡는 구조, 되돌릴 수 없는 작업 앞의 사람 승인 게이트',
  },
  {
    name: 'LLM 서빙과 평가',
    summary: '온프레미스 LLM 서빙, 성능 벤치마크, 모델 비교 평가',
  },
  {
    name: '사내 AX',
    summary:
      'LLM 게이트웨이와 사내 AI 채팅 도구 도입 · 운영(팀별 예산과 모델 정책 관리), 한도 · 모델 요청을 처리하는 운영 포털 개발',
  },
];

// 그 밖에 — 제목만
export const projects = [
  {
    title: '국가기술표준원 e나라표준인증',
    href: 'https://www.standard.go.kr/KSCI/portalindex.do',
    note: '통합검색 · 챗봇 개발 참여',
  },
];

const paperBase = 'https://peussd55.github.io/lemonade_paper_review_repo';
export const papers = [
  { title: 'Transformer & Seq2Seq with Attention 리뷰', href: `${paperBase}/Transformer.pdf` },
  { title: 'GPT-1·2·3 & BERT 사전학습 패러다임 리뷰', href: `${paperBase}/Bert_GPT.pdf` },
  {
    title: 'Vision Transformer & Swin Transformer v1/v2 리뷰',
    href: `${paperBase}/Vision-Transformer.pdf`,
  },
  { title: 'SAM & SAM 2 세그멘테이션 리뷰', href: `${paperBase}/SAM2.pdf` },
  { title: '2-Stage Detector: R-CNN 계열 리뷰', href: `${paperBase}/2-Stage.pdf` },
  { title: 'YOLO v1·v3·v5·v11 진화 리뷰', href: `${paperBase}/YOLO.pdf` },
];
