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
    topics: [
      {
        k: '실시간 음성 에이전트',
        v: '음성인식 · LLM · 음성합성을 잇는 실시간 파이프라인, 의료 도메인 콜봇 실서비스 운영',
      },
      {
        k: 'RAG와 에이전트',
        v: '평가셋으로 검색 품질을 재고 개선, 대화 흐름은 코드가 관리하고 LLM은 답변만 맡는 구조, 되돌릴 수 없는 작업 앞의 사람 승인 게이트',
      },
      { k: 'LLM 서빙과 평가', v: '온프레미스 LLM 서빙, 성능 벤치마크, 모델 비교 평가' },
      {
        k: '사내 AX',
        v: 'LLM 게이트웨이와 사내 AI 채팅 도구 도입 · 운영(팀별 예산과 모델 정책 관리)',
      },
    ],
    subs: [],
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

// 한 일 — 전 → 후 흐름도. post 는 글 파일 이름이고, 그 글이 공개돼 있을 때만 "글로 읽기"가 붙는다.
export const flows = [
  {
    title: '흐름은 코드가, 답변은 모델이',
    before: '지시문만으로 대화 흐름을 맡김',
    after: '단계 전환과 도구 호출은 코드가, 모델은 의도 판단과 답변만',
    metrics: [
      { k: '시나리오 통과', from: '28/30', to: '30/30' },
      { k: '턴 지연 중앙값', from: '2,745ms', to: '1,565ms' },
    ],
    post: '',
  },
  {
    title: '음성 상담봇의 검색 품질을 평가셋으로 측정 · 개선',
    before: '색인을 만든 질문으로 시험',
    after: '색인에 쓰지 않은 질문 묶음으로 고칠 때마다 측정',
    metrics: [
      { k: '정답 1위', from: '58.4%', to: '69.8%' },
      { k: '3위 안', from: '76.2%', to: '88.6%' },
    ],
    post: 'search-quality-evalset',
  },
];

// 한 일 — 제목과 한 줄
export const cases = [
  {
    title: '되돌릴 수 없는 작업 앞에 사람 승인을 두기',
    summary:
      '주문 취소처럼 되돌릴 수 없는 도구 호출 앞에 사람 승인을 두고, 응답이 없으면 실행하지 않도록 구현',
  },
  {
    title: '나눠 쓰는 GPU 한 장으로 26B 모델을 서빙하고 용량 측정',
    summary:
      '다른 팀과 나눠 쓰는 GPU 한 장의 3분의 1 예산으로 26B 오픈소스 모델을 1초 안팎 응답으로 서빙, GPU를 전부 쓸 때의 한계 동시 접속은 별도 측정',
  },
  {
    title: '사내 모델 게이트웨이를 전사에 도입하고 운영하기',
    summary:
      '여러 모델을 한 창구로 쓰는 게이트웨이를 개발팀 시범에서 전사로 확대, 팀별 예산과 허용 모델은 스크립트로 관리',
  },
  {
    title: '실시간 음성 연결의 60분 상한 넘기기',
    summary:
      '실시간 음성 모델 연결이 시작 60분에 끊기는 것을 기록으로 확인, 대화를 이어 붙여 새 연결로 전환',
  },
];

// 그 밖에 — 제목만
export const projects = [
  { title: '법률 도메인 특화 Agentic LLM 서비스', href: '' },
  { title: 'BindQ Studio', href: 'https://github.com/peussd55/BindQ' },
  { title: '사기컷: 전자금융사기 예방 뉴스 큐레이터', href: '' },
  { title: '국가기술표준원 e나라표준인증', href: 'https://www.standard.go.kr/KSCI/portalindex.do' },
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
