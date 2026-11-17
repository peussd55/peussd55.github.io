// src/App.js
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Entry from "./Entry";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaSun, FaMoon } from "react-icons/fa";
import {
  SiPython, SiTensorflow, SiPytorch, SiNumpy, SiPandas,
  SiJavascript, SiTypescript, SiReact,
  SiPostgresql, SiDocker, SiGit, SiFigma, SiKeras,
  SiScikitlearn, SiJquery, SiGithubactions, SiJupyter,
  SiFastapi, SiFlask, SiSpring, SiSpringboot, SiAmazonaws,
  SiVercel, SiLinux, SiPodman, SiMongodb, SiSubversion
} from "react-icons/si";

const withBase = (relPath) => `${process.env.PUBLIC_URL}${relPath}`;

/** 프로필 이미지: public/profile.jpg 가 있으면 노출, 없으면 자동 숨김 */
function ProfileAvatar() {
  const imgRef = useRef(null);
  return (
    <img
      ref={imgRef}
      src="/profile.jpg"
      alt="Profile"
      onError={() => imgRef.current && (imgRef.current.style.display = "none")}
      style={{
        width: 108, height: 108, borderRadius: "50%",
        objectFit: "cover", border: "1px solid #e5e7eb"
      }}
    />
  );
}

export default function App() {
  // ===== 테마 =====
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    // OS 설정 확인
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    // <html> 태그에 data-theme 속성 적용 및 localStorage에 저장
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  // ===== 언어 토글 =====
  const [lang, setLang] = useState("KOR"); // 'KOR' | 'ENG'
  const [aboutExpanded, setAboutExpanded] = useState(true);
  const t = {
    KOR: {
      name: "RAG·LLM 서비스에 특화된 AI 엔지니어",
      title: "검색엔진 엔지니어로 시작해 인텐트 챗봇을 거쳐 LLM 에이전트를 만들고 있습니다. 지금은 AI 컨택센터 솔루션 회사에서 실시간 AI 콜봇 · 챗봇과 에이전트를 개발하고 운영합니다.",
      tagline: "AI 기술로 현실의 문제를 해결하는 엔지니어",
      aboutTitle: "소개",
      aboutTextLines: [
        "일하는 방식: 먼저 재고, 잰 값으로 결정합니다. 평가셋과 기준선을 만든 뒤에 고칩니다.",
        "주무기: 검색과 RAG. 검색 품질을 재고 고치는 일에서 출발해 에이전트로 넓혀 왔습니다.",
      ],
      // aboutFocus: ["키워드 : RAG, LLM, NLP, VLM, Agent"],
      aboutToggleExpand: "펴기↘",
      aboutToggleCollapse: "접기↗",
      education: "교육",
      experience: "경력",
      awardsCertifications: "수상이력 & 자격증",
      projects: "프로젝트",
      paperReviews: "논문리뷰",
      achievements: "대회",
      skills: "보유 기술",
      mainProjects: "주요 프로젝트",
      expandAll: "전체 펼치기",
      collapseAll: "전체 접기",
      paperReviewsMore: "더보기",
      paperReviewsLess: "접기",
    },
    ENG: {
      name: "AI Engineer specialized in RAG/LLM Services",
      title: "I started as a search engine engineer, moved through intent-based chatbots, and now build LLM agents. I currently develop and operate real-time AI voice bots, chatbots and agents at an AI contact-center solution company.",
      tagline: "An engineer who solves real-world problems with AI technology.",
      aboutTitle: "About",
      aboutTextLines: [
        "How I work: measure first, then decide. I build an evaluation set and a baseline before changing anything.",
        "Core strength: search and RAG. I started by measuring and improving retrieval quality, then extended that into agents.",
      ],
      // aboutFocus: ["Keyword : RAG, LLM, NLP, VLM, Agent"],
      aboutToggleExpand: "Expand↘",
      aboutToggleCollapse: "Collapse↗",
      education: "Education",
      experience: "Experience",
      awardsCertifications: "Awards & Certifications",
      projects: "Projects",
      paperReviews: "Paper Reviews",
      achievements: "Competitions",
      skills: "Skills",
      mainProjects: "Main Projects",
      expandAll: "Expand All",
      collapseAll: "Collapse All",
      paperReviewsMore: "Show more",
      paperReviewsLess: "Show less",
    },
  };

  const aboutTextLines = t[lang].aboutTextLines;
  const ABOUT_PREVIEW_LINE_LIMIT = 2;
  const shouldTruncateAbout = aboutTextLines.length > ABOUT_PREVIEW_LINE_LIMIT;
  const aboutLinesToDisplay =
    aboutExpanded || !shouldTruncateAbout
      ? aboutTextLines
      : aboutTextLines.slice(0, ABOUT_PREVIEW_LINE_LIMIT);
  const showAboutEllipsis = !aboutExpanded && shouldTruncateAbout;

  // --- 교육
  const educationEntries  = [
    {
      id: "ibm",
      title:
        lang === "KOR" ? "[IBM x RedHat] AX(AI Transformation)" : "[IBM x RedHat] AX (AI Transformation)",
      location: lang === "KOR" ? "서울, 대한민국" : "Seoul, Korea",
      dates: lang === "KOR" ? "2025.05 - 2025.11 (수료)" : "May 2025 – Nov 2025 (Completed)",
      details:
        lang === "KOR"
          ? [
              "TensorFlow/PyTorch로 DNN·CNN·RNN·NLP 실습 및 모델 아키텍처 구현",
              "API 또는 HuggingFace의 오픈소스 모델을 활용한 AI 어플리케이션 개발",
              "FastAPI, Docker, GitHub Actions, AWS를 활용한 CI/CD 파이프라인 구축 및 운영 경험",
              "Transformer, GPT, BERT 등 유명 논문 리뷰 및 코드 구현",
            ]
          : [
              "Deep dive into LLM/RAG, prompt engineering, and agent orchestration.",
              "Hands-on DNN/CNN/RNN/NLP with TensorFlow/PyTorch.",
              "FastAPI/Docker/AWS for serving & deployment.",
              "Famous papers and structures such as Transformer, GPT, and BERT",
            ],
      },
  ];

  // --- 경력
  const exp_example = [
    {
      title: lang === "KOR" ? "AI 컨택센터 솔루션 회사" : "AI Contact-Center Solution Company",
      location: lang === "KOR" ? "AI 엔지니어" : "AI Engineer",
      dates: lang === "KOR" ? "2025.11 - 현재" : "2025.11 - Present",
      summary: lang === "KOR" ?
        [
          "실시간 음성 에이전트: 음성인식 · LLM · 음성합성을 잇는 실시간 파이프라인, 의료 도메인 콜봇 실서비스 운영",
          "RAG와 에이전트: 평가셋으로 검색 품질을 재고 개선, 대화 흐름은 코드가 관리하고 LLM은 답변만 맡는 구조, 되돌릴 수 없는 작업 앞의 사람 승인 게이트",
          "LLM 서빙과 평가: 온프레미스 LLM 서빙, 성능 벤치마크, 모델 비교 평가",
          "사내 AX: LLM 게이트웨이와 사내 AI 채팅 도구 도입 · 운영(팀별 예산과 모델 정책 관리)"
        ] :
        [
          "Real-time voice agents: streaming pipeline connecting speech recognition, LLM and speech synthesis; operating a production voice bot in the healthcare domain",
          "RAG and agents: measuring and improving retrieval quality with evaluation sets; dialogue flow managed in code with the LLM generating answers only; human approval gate before irreversible actions",
          "LLM serving and evaluation: on-premises LLM serving, performance benchmarks, model comparison",
          "In-house AI adoption: rolled out and operate an LLM gateway and an internal AI chat tool (per-team budgets and model policies)"
        ],
      projects: []
    },
    {
      title: lang === "KOR" ? "WISENUT" : "WISENUT",
      location: lang === "KOR" ? "솔루션 구축 및 웹개발" : "Solution building and web development",
      dates: "2020.09 - 2024.04",
      summary: lang === "KOR" ? 
        [
          "검색엔진 구축 및 웹(API)개발 (2년 6개월)",
          "챗봇 구축 및 웹개발 (1년)"
        ] : 
        [
          "Search engine development and web (API) development (2 years and 6 months)",
          "Chatbot building and web development (1 year)"
        ],
      projects: [
        {
          title: lang === "KOR" ? "검색엔진 구축 및 웹(API)개발 (2년 6개월)" : "Search engine development and web (API) development (2 years and 6 months)",
          dates: "2020.10 - 2024.04",
          details: lang === "KOR" ? 
            [
              "(구축/운영) 자사 검색엔진 솔루션(SF-1)을 활용한 IR 시스템 구축 및 고객사 요구사항에 맞게 커스터마이징",
              "(데이터 파이프라인) RDB(Oracle/MySQL)에서 데이터를 수집/색인하는 데이터 파이프라인 설계 및 운영",
              "(백엔드) 검색엔진 API를 활용하여, JSP/Spring MVC 환경에서 통합검색 백엔드 로직 및 API(JSON, XML) 개발",
              "(프론트엔드) 고객사 요구사항에 맞춘 통합검색 UI(JSP, jQuery) 개발",
            ] : 
            [
              "(Implementation/Operation) Built and operated IR systems using the in-house search solution (SF-1), customizing them to meet client requirements.",
              "(Data Pipeline) Designed and operated data pipelines for collecting and indexing data from RDBs (Oracle/MySQL).",
              "(Backend) Developed integrated search backend logic and APIs (JSON, XML) in a JSP/Spring MVC environment, utilizing search engine APIs.",
              "(Frontend) Developed integrated search UI (JSP, jQuery) tailored to client requirements.",
            ],
        },
        {
          title: lang === "KOR" ? "챗봇 구축 및 웹개발 (1년)" : "Chatbot building and web development (1 year)",
          dates: "2020.10 - 2024.04",
          details: lang === "KOR" ?
            [
              "(구축/운영) 자사 챗봇 솔루션(WISE iChat) 설치, 운영 및 고객사 요구사항에 맞춘 커스텀 개발 (Java)",
              "(검색 연계) 챗봇의 인텐트 답변 한계를 극복하기 위해, 검색엔진(SF-1)을 챗봇 시나리오와 연계하는 시스템 개발",
              "(경험) 이 과정에서 키워드/인텐트 기반 시스템의 명확한 한계를 실무에서 경험 (LLM/RAG 전환의 핵심 동기)",
              "(협업) 지식구축팀, 기획팀과 협업하여 인텐트 적재 및 관리도구 커스터마이징 수행",
            ] :
            [
              "(Implementation/Operation) Installed and operated the in-house chatbot solution (WISE iChat), performing custom development (Java) to meet client requirements.",
              "(Search Integration) Developed a system integrating the search engine (SF-1) with chatbot scenarios to overcome the limitations of intent-based responses.",
              "(Experience) Gained hands-on experience with the clear limitations of keyword/intent-based systems, which became a key motivation for the transition to LLM/RAG.",
              "(Collaboration) Collaborated with knowledge-building and planning teams to customize tools for intent loading and management.",
            ],
        },
      ]
    },
  ];

  // --- 수상이력 & 자격증
  const awardsCertifications = [
    {
      title: lang === "KOR" ? "2026 SK하이닉스 AI 해커톤 도전상(Top 20)" : "2026 SK hynix AI Hackathon – Challenge Award (Top 20)",
      location: lang === "KOR" ? "주최: SK하이닉스" : "Hosted by: SK hynix",
      dates: "2026.11",
      details: lang === "KOR"
        ? ["도전상 수상"]
        : ["Challenge Award"],
    },
    {
      title: lang === "KOR" ? "정보처리기사" : "Engineer Information Processing",
      location: lang === "KOR" ? "한국산업인력공단" : "HRD Korea",
      dates: "2019.11",
      details: lang === "KOR"
        ? ["자격 취득"]
        : ["Acquired Qualification"],
    },
    {
      title: lang === "KOR" ? "데이터분석 준전문가(ADsP)" : "Advanced Data Analytics Semi-Professional (ADsP)",
      location: lang === "KOR" ? "한국데이터산업진흥원" : "Korea Data Agency",
      dates: "2024.11",
      details: lang === "KOR"
        ? ["자격 취득"]
        : ["Acquired Qualification"],
    },
    {
      title: lang === "KOR" ? "2024 뉴스빅데이터 해커톤 우수상" : "2024 News Big Data Hackathon Excellence Award",
      location: lang === "KOR" ? "주최: 한국언론진흥재단" : "Hosted by: Korea Press Foundation",
      dates: "2024.11",
      details: lang === "KOR" ? 
          [
            "한국언론진흥재단 이사장상",
            "팀명 : 사기컷",
          ] :
          [
            "President of the Korea Press Foundation",
            "Team: Scam Cut",
          ],
    },
  ];

  // --- 프로젝트
  const pj_lawI = {
    title: lang === "KOR" ? "법률 도메인 특화 Agentic LLM 서비스" : "Agentic LLM Service for Legal Domain",
    location: lang === "KOR" ? "Team / 5인" : "Team / 5 members",
    dates: lang === "KOR" ? "2025" : "2025",
    details:
      lang === "KOR"
        ? [
            // "RAG 파이프라인 설계: Llama-3-8B 모델과 RAG를 결합하여 법률 질의응답 성능을 최적화하고, 법령·판례 텍스트를 도메인 구조에 맞게 정제·청킹하여 검색 정확도를 향상",
            // "Agentic 아키텍처 구축: LangChain 기반 에이전트 오케스트레이션으로 Retrieval, 추론, 문서 작성 등 모듈을 유연하게 조율하고, 동적 툴 라우팅을 구현",
            // "데이터베이스 및 배포: ChromaDB를 활용한 Vector DB와 PostgreSQL(RDBMS)을 구축했으며, GitHub Actions와 AWS EC2를 통해 CI/CD 파이프라인을 자동화하고 서비스를 배포.",
            "[개요]",
            "- (1) 지능형 리서치: 특정 법률 도메인 문서(법령: 민법, 형법 / 판례: 민사, 형사)를 기반으로 사용자의 복잡한 자연어 질의에 대해 정확하고 근거 있는 답변을 생성.",
            "- (2) 모의 재판 시뮬레이션: IRAC(Issue, Rule, Application, Conclusion) 기반 법률 모의 시뮬레이터 (A 페르소나 vs B 페르소나 가상 법률 공방).",
            "[핵심 기술]",
            "- Python, LangGraph, LangChain, FastAPI, VectorDB (Chroma/Qdrant), Docker",
            "[주요 역할 및 기여]",
            "- 전체적인 시스템 설계.",
            "- LangGraph를 이용한 Agentic RAG 파이프라인 아키텍처 설계 및 상태 관리 로직 구현.",
            "- 법률 문서 특성을 고려한 Chunking 전략 수립 및 VectorDB 인덱싱 파이프라인 구축.",
            "- FastAPI를 활용하여 Agent 핵심 기능을 외부에서 호출할 수 있는 API 엔드포인트 개발.",
          ]
        : [
            // "Designed RAG Pipeline: Optimized legal Q&A performance by combining the Llama-3-8B model with RAG, and improved search accuracy by refining and chunking legal texts.",
            // "Built Agentic Architecture: Orchestrated modules like Retrieval, Reasoning, and Drafting using LangChain, and implemented dynamic tool routing.",
            // "Database & Deployment: Established a Vector DB with ChromaDB and a PostgreSQL RDBMS. Automated the CI/CD pipeline and deployed the service using GitHub Actions and AWS EC2.",
            "[Overview]",
            "- (1) Intelligent Research: Generates accurate and well-grounded answers to complex user queries based on specific legal domain documents (Statutes: Civil Act, Criminal Act / Precedents: Civil, Criminal).",
            "- (2) Mock Trial Simulation: An IRAC (Issue, Rule, Application, Conclusion)-based legal simulator featuring a virtual legal debate between Persona A and Persona B.",
            "[Key Technologies]",
            "- Python, LangGraph, LangChain, FastAPI, VectorDB (Chroma/Qdrant), Docker",
            "[Key Roles & Contributions]",
            "- Led the overall system architecture design.",
            "- Designed the Agentic RAG pipeline architecture using LangGraph and implemented state management logic.",
            "- Established a chunking strategy tailored to the characteristics of legal documents and built the VectorDB indexing pipeline.",
            "- Developed API endpoints using FastAPI to expose the Agent's core functionalities for external calls.",
          ],
    images: [
        withBase("/images/lawai_01.png"),
        withBase("/images/lawai_02.png"),
        withBase("/images/lawai_03.png"),
        withBase("/images/lawai_04.png"),
        withBase("/images/lawai_06.png"),
      ],
  };

  const pj_bindq = {
    title: lang === "KOR" ? "BindQ Studio" : "BindQ Studio",
    location: lang === "KOR" ? "Team / 5인" : "Team / 5 members",
    dates: "2025",
    details:
      lang === "KOR"
        ? [
            // "프로젝트 진행기간 : 2025.01 - 2025.03",
            // "단백질 구조기반 신약 개발을 위한 De novo 단백질 설계 플랫폼(MVP) 개발",
            // "복잡한 생물정보학 연구 도구들을 하나의 FastAPI·Gradio 기반 화면으로 묶어, 다섯 개 탭을 따라가며 설계할 수 있는 여정을 개발",
            // "타겟 단백질정보를 입력, 타겟의 각 아미노산별 결합 부위 예측 -> 다음 설계  단계의 파라미터값 도출",
            // "파라미터를 활용해 타겟에 결합할 바인더의 백본 설계",
            // "생성한 바인더 백본에 잔기(아미노산 서열)생성",
            // "결합 구조에서 타겟과 바인더의 결합 친화도 확인",
            "[개요]",
            "- 단백질 결합부위 탐지부터 서열 설계, 도킹 검증까지 단일 FastAPI·Gradio 애플리케이션으로 제공하는 구조 기반 결합제 설계 플랫폼.",
            "- 사이드바 기반 5단계 파이프라인(Home, 결합부위 예측, RFdiffusion, ProteinMPNN, Prodigy)을 통해 실험·분석을 일괄 수행.",
            "[핵심 기술]",
            "- Python, FastAPI, Gradio, Docker, ScanNet, DeepBSRPred, RFdiffusion, ProteinMPNN, PRODIGY, Mol*, 3Dmol.js",
            "[주요 역할 및 기여]",
            "- 구조 기반 결합부위 예측 모듈 개발: ScanNet Flask API와 DeepBSRPred 로컬 스크립트를 통합하여 결합 확률을 가중 평균하는 파이프라인 구현, 연속 잔기 필터링과 Top-N 후보 선정을 자동화.",
            "- 도킹 및 결합 친화도 검증 파트 구축: 업로드된 PDB·ZIP 입력을 체인 보정 후 PRODIGY CLI로 실행하고 ΔG, Kd, 상호작용 지표를 표·CSV로 제공하는 FastAPI 백엔드 및 Gradio UI 흐름 개발.",
            "- 3D 시각화 및 UX 강화: Gradio 탭과 Mol*/3Dmol.js 기반 뷰어를 연계하여 결합부위 하이라이트, 도킹 결과, 모델 출력 구조를 실시간으로 시각화.",
            <a href="https://github.com/peussd55/BindQ" target="_blank" rel="noopener noreferrer">
              GitHub 저장소 바로가기
            </a>,
          ]
        : [
            // "Project Period: 2025.01 - 2025.03",
            // "Development of a De novo Protein Design Platform (MVP) for Structure-Based Drug Discovery",
            // "Developed a guided design journey by integrating complex bioinformatics research tools into a single interface based on FastAPI and Gradio, structured as a simple five-tab workflow.",
            // "Input target protein information to predict binding sites for each amino acid, which in turn derives the parameters for the subsequent design phase.",
            // "Utilize these parameters to design the backbone of a binder that will attach to the target.",
            // "Generate residues (the amino acid sequence) for the newly created binder backbone.",
            // "Confirm the binding affinity between the target and the binder in the resulting complex structure.",
            "[Overview]",
            "- A structure-based binder design platform providing services from protein binding site detection, sequence design, to docking verification within a single FastAPI/Gradio application.",
            "- Performs batch experiments and analysis through a sidebar-based 5-stage pipeline (Home, Binding Site Prediction, RFdiffusion, ProteinMPNN, Prodigy).",
            "[Key Technologies]",
            "- Python, FastAPI, Gradio, Docker, ScanNet, DeepBSRPred, RFdiffusion, ProteinMPNN, PRODIGY, Mol*, 3Dmol.js",
            "[Key Roles & Contributions]",
            "- Developed the structure-based binding site prediction module: Implemented a pipeline integrating the ScanNet Flask API and local DeepBSRPred scripts to calculate weighted average binding probabilities, automating continuous residue filtering and Top-N candidate selection.",
            "- Built the docking and binding affinity verification component: Developed the FastAPI backend and Gradio UI flow to process uploaded PDB/ZIP inputs (with chain correction), execute them via the PRODIGY CLI, and provide $\Delta G$, $K_d$, and interaction metrics in tables and CSV format.",
            "- Enhanced 3D visualization and UX: Linked Gradio tabs with Mol*/3Dmol.js-based viewers to enable real-time visualization of highlighted binding sites, docking results, and model output structures.",
            <a href="https://github.com/peussd55/BindQ" target="_blank" rel="noopener noreferrer">
              View GitHub Repository
            </a>,
          ],
    images: [
      withBase("/images/bindq_01.png"),
      withBase("/images/bindq_02.png"),
      withBase("/images/bindq_03.png"),
      withBase("/images/bindq_05.png"),
      withBase("/images/bindq_06.png"),
    ],
  };

  const pj_scamcut = {
    title: lang === "KOR" ? "사기컷: 전자금융사기 예방 뉴스 큐레이터" : "ScamCut: A News Curator for Online Financial Scam Prevention",
    location: lang === "KOR" ? "Team / 5인" : "Team / 5 members",
    dates: "2024",
    details:
      lang === "KOR"
        ? [
            "프로젝트 진행기간 : 2024.10 - 2024.11",
            "2024 뉴스 빅데이터 해커톤 우수상 수상작",
            "융합 데이터 활용을 통한 취약 사기 진단 기반 맞춤형 AI 가공 뉴스 콘텐츠 제공 서비스 프로토타입 개발",
            "빅카인즈 사기 뉴스를 KoBERT 파인튜닝(+ GPT API 싱글턴 제로샷 프롬프팅)을 통해 유형별로 정밀 분류",
            "뉴스 임베딩 벡터 간 코사인 유사도를 계산하여 의미 기반의 디수의 중복 기사 제거",
            "사용자의 입력받은 메타정보와 어느 유형의 사람이 어느 유형의 사기에 취약한지 매핑된 프로필간의 거리를 계산하여 가장 연관성 높은 사기 유형을 진단(매칭)",
            "생성형AI도구(DALL-E 등)를 기반으로 뉴스 기반 요약 삽화와 숏폼 영상을 제작",
            // <a href="https://www.kpf.or.kr/synap/skin/doc.html?fn=1735016238208.pdf&rs=/synap/result/board/" target="_blank" rel="noopener noreferrer">
            //   수상작 모음집
            // </a>,
          ]
        : [
            "Project Period: 2024.10 - 2024.11",
            "2024 News Big Data Hackathon Excellence Award-winning project",
            "Development of a service prototype providing customized, AI-processed news content based on fraud vulnerability diagnosis using converged data.",
            "Precisely classifying BIG KINDS fraud news by type through KoBERT fine-tuning (+ GPT API singleton zero-shot prompting).",
            "Removing semantically duplicate articles by calculating cosine similarity between news embedding vectors.",
            "Diagnosing (matching) the most relevant fraud type by calculating the distance between user-inputted metadata and profiles that map which types of people are vulnerable to which types of fraud.",
            "Producing news-based summary illustrations and short-form videos using generative AI tools (e.g., DALL-E).",
            <a href="https://www.kpf.or.kr/synap/skin/doc.html?fn=1735016238208.pdf&rs=/synap/result/board/" target="_blank" rel="noopener noreferrer">
              Award-Winning Collection
            </a>,
          ],
    images: [
      withBase("/images/scamcut_01.png"),
      withBase("/images/scamcut_02.png"),
      withBase("/images/scamcut_03.png"),
      withBase("/images/scamcut_04.png"),
    ],
  };

  const pj_estandard = {
    title: lang === "KOR" ? "국가기술표준원 e나라표준인증" : "Korean Agency for Technology and Standards (KATS), e-Korean Standards Certification",
    location: lang === "KOR" ? "국가기술표준원" : "Korean Agency for Technology and Standards (KATS)",
    dates: "2022~2023 / 2023~2024",
    details:
      lang === "KOR"
        ? [
            "1차 프로젝트 진행기간 : 2022.09 - 2023.02",
            "2차 프로젝트 진행기간 : 2023.11 - 2024.02",
            "국가기술표준원의 대국민 서비스 e나라표준인증 구축/개편 프로젝트",
            "검색엔진을 활용한 통합검색 기능의 JSON API 개발을 담당",
            "검색엔진과 연계된 스마트 챗봇의 국가표준 카테고리 개발",
            "솔루션 커스터마이징 및 데이터 수집을 위한 컬렉션 구축 담당",
            "Tech Stack: Java, Spring, Vue.js, MariaDB, Wisenut Solution(Search Engine/Chatbot)",
            <a href="https://www.standard.go.kr/KSCI/portalindex.do" target="_blank" rel="noopener noreferrer">
              서비스 바로가기
            </a>,
          ]
        : [
            "1st Project: Sep 2022 - Feb 2023",
            "2nd Project: Nov 2023 - Feb 2024",
            "A renewal project for e-KS Certification, a public service by KATS",
            "Developed the JSON API for the integrated search function using a search engine",
            "Developed the National Standard category for the smart chatbot",
            "Handled solution customization and collection building for data processing",
            "Tech Stack: Java, Spring, Vue.js, MariaDB, Wisenut Solution(Search Engine/Chatbot)",
            <a href="https://www.standard.go.kr/KSCI/portalindex.do" target="_blank" rel="noopener noreferrer">
              Go to Service
            </a>,
          ],
      images: [
        withBase("/images/estandard_1.png"),
        withBase("/images/estandard_2.png"),
        withBase("/images/estandard_3.png"),
      ],
  };

  const pj_side =
  lang === "KOR"
    ? { label: "프로젝트 더 보러가기", href: "https://github.com/peussd55" }
    : { label: "Go to Side Project", href: "https://github.com/peussd55" };
  const PAPER_REVIEW_MAX_VISIBLE = 4;
  const paperReviews = [
    {
      id: "transformer",
      title: {
        KOR: "Transformer & Seq2Seq with Attention 리뷰",
        ENG: "Transformer & Seq2Seq with Attention Review",
      },
      summary: {
        KOR: "RNN 기반 Seq2Seq with Attention과 Transformer(Self-Attention)의 구조와 차이를 비교",
        ENG: "A Comparison of the Structure and Differences between RNN-based Seq2Seq with Attention and Transformer (Self-Attention)",
      },
      href: "https://peussd55.github.io/lemonade_paper_review_repo/Transformer.pdf",
    },
    {
      id: "gpt-bert",
      title: {
        KOR: "GPT-1·2·3 & BERT 사전학습 패러다임 리뷰",
        ENG: "Pre-training Paradigms: GPT-1/2/3 & BERT",
      },
      summary: {
        KOR: "Autoregressive(GPT)와 Masked LM(BERT)의 구조와 차이를 비교",
        ENG: "A Comparison of the Structure and Differences between Autoregressive (GPT) and Masked LM (BERT)",
      },
      href: "https://peussd55.github.io/lemonade_paper_review_repo/Bert_GPT.pdf",
    },
    {
      id: "vit-swin",
      title: {
        KOR: "Vision Transformer & Swin Transformer v1/v2 리뷰",
        ENG: "Vision Transformer & Swin Transformer v1/v2 Review",
      },
      summary: {
        KOR: "ViT 패치 임베딩과 Swin의 시프트 윈도우·계층적 구조 개선을 비교",
        ENG: "Reviews ViT patch embeddings versus Swin's shifted window and hierarchical upgrades across v1/v2.",
      },
      href: "https://peussd55.github.io/lemonade_paper_review_repo/Vision-Transformer.pdf",
    },
    {
      id: "sam",
      title: {
        KOR: "SAM & SAM 2 세그멘테이션 리뷰",
        ENG: "Segmentation Review: SAM & SAM 2",
      },
      summary: {
        KOR: "프롬프트 기반 세그멘테이션 파이프라인과 SAM/SAM 2의 데이터셋, 마스크 생성 전략 비교",
        ENG: "Covers promptable segmentation pipelines, datasets, and mask generation in SAM and SAM 2.",
      },
      href: "https://peussd55.github.io/lemonade_paper_review_repo/SAM2.pdf",
    },
    {
      id: "two-stage",
      title: {
        KOR: "2-Stage Detector: R-CNN 계열 리뷰",
        ENG: "2-Stage Detectors: R-CNN Family Review",
      },
      summary: {
        KOR: "R-CNN → Fast/Faster/Mask R-CNN의 제안 영역과 특징 추출 개선 포인트를 단계별로 정리",
        ENG: "Steps through R-CNN, Fast/Faster, and Mask R-CNN to highlight proposal and feature refinement upgrades.",
      },
      href: "https://peussd55.github.io/lemonade_paper_review_repo/2-Stage.pdf",
    },
    {
      id: "yolo",
      title: {
        KOR: "YOLO v1·v3·v5·v11 진화 리뷰",
        ENG: "Evolution of YOLO v1/v3/v5/v11",
      },
      summary: {
        KOR: "YOLO 계열의 백본·헤드 구조 변화와 성능/경량화 트렌드를 따라가며 정리",
        ENG: "Tracks YOLO backbone/head upgrades and performance-versus-efficiency trends from v1 to v11.",
      },
      href: "https://peussd55.github.io/lemonade_paper_review_repo/YOLO.pdf",
    },
  ];

  const projectKeys = ["lawI", "pj_bindq", "pj_scamcut", "pj_estandard"];

  const sectionKeyMap = {
    education: educationEntries.map((edu) => edu.id),
    experience: exp_example.map((_, idx) => `exp${idx}`),
    awardsCertifications: awardsCertifications.map((_, idx) => `item${idx}`),
    projects: projectKeys,
    achievements: [],
  };

  const mapKeysToValue = (keys = [], value) =>
    keys.reduce((acc, key) => {
      acc[key] = value;
      return acc;
    }, {});

  const buildExpandedState = (isExpanded) => ({
    education: mapKeysToValue(sectionKeyMap.education, isExpanded),
    experience: mapKeysToValue(sectionKeyMap.experience, isExpanded),
    awardsCertifications: mapKeysToValue(sectionKeyMap.awardsCertifications, isExpanded),
    projects: mapKeysToValue(sectionKeyMap.projects, isExpanded),
    achievements: mapKeysToValue(sectionKeyMap.achievements, isExpanded),
  });

  const [expandedEntries, setExpandedEntries] = useState(() => buildExpandedState(true));
  const [showAllPaperReviews, setShowAllPaperReviews] = useState(false);
  const hasMorePaperReviews = paperReviews.length > PAPER_REVIEW_MAX_VISIBLE;
  const visiblePaperReviews = showAllPaperReviews ? paperReviews : paperReviews.slice(0, PAPER_REVIEW_MAX_VISIBLE);

  const toggleEntry = (section, key) =>
    setExpandedEntries((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section]?.[key] },
    }));

  const handleExpandAll = () => {
    setExpandedEntries(buildExpandedState(true));
    if (shouldTruncateAbout) setAboutExpanded(true);
  };
  const handleCollapseAll = () => {
    setExpandedEntries(buildExpandedState(false));
    if (shouldTruncateAbout) setAboutExpanded(false);
  };

  // --- 스킬

  // ===== UI =====
  return (
    <div className="App">
      {/* 헤더 */}
      <header className="App-header">
        <div className="header-top">
          <div className="header-left">
            <ProfileAvatar />
            <div>
              <h1>{t[lang].name}</h1>
              <div className="header-subtitle">{t[lang].title}</div>
            </div>
          </div>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'light' ? (
              <FaMoon size={20} />
            ) : (
              <FaSun size={20} />
            )}
          </button>
        </div>

        {/* 언어 토글 */}
        <div className="lang-toggle" aria-label="Language toggle" style={{ margin: "10px 0 16px" }}>
          <div
            className="lang-indicator"
            style={{ transform: `translateX(${lang === "ENG" ? "0" : "100%"})` }}
          />
          <button className={`lang-btn ${lang === "ENG" ? "active" : ""}`} onClick={() => setLang("ENG")}>
            ENG
          </button>
          <button className={`lang-btn ${lang === "KOR" ? "active" : ""}`} onClick={() => setLang("KOR")}>
            KOR
          </button>
        </div>

        <div className="expand-controls">
          <button type="button" onClick={handleExpandAll}>{t[lang].expandAll}</button>
          <button type="button" onClick={handleCollapseAll}>{t[lang].collapseAll}</button>
        </div>

        {/* 연락처 */}
        <div className="contact-icons">
          <a href="mailto:balet99c@gmail.com" aria-label="Email">
            <FaEnvelope size={28} style={{ margin: "0 12px" }} />
          </a>
          {/* <a href="tel:010-2579-0517" aria-label="Phone">
            <FaPhone size={28} style={{ margin: "0 12px" }} />
          </a> */}
          <a href="https://github.com/peussd55" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={28} style={{ margin: "0 12px" }} />
          </a>
          {/* <a href="https://www.linkedin.com/in/eunsu-park-680a792a8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={28} style={{ margin: "0 12px" }} />
          </a> */}
        </div>
      </header>

      {/* About */}
      {/* <section className="About-section">
        <h2>{t[lang].aboutTitle}</h2>
        <p>{t[lang].aboutTextLines.join(" ")}</p>
      </section> */}
      <section className="About-section">
        <h2>{t[lang].aboutTitle}</h2>
        <p>
          {aboutLinesToDisplay.map((line, idx) => (
            <React.Fragment key={`about-line-${idx}`}>
              {line}
              {idx < aboutLinesToDisplay.length - 1 && <br />}
            </React.Fragment>
          ))}
          {showAboutEllipsis && " ..."}
        </p>
        {shouldTruncateAbout && (
          <button
            type="button"
            className="about-toggle"
            onClick={() => setAboutExpanded((prev) => !prev)}
          >
            {aboutExpanded ? t[lang].aboutToggleCollapse : t[lang].aboutToggleExpand}
          </button>
        )}
        {t[lang].aboutFocus?.length > 0 && (
          <div className="about-focus">
            {/* <span>{lang === "KOR" ? "관심 기술 스택:" : "Focus Areas:"}</span> */}
            <ul>
              {t[lang].aboutFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>


      {/* Education */}
      <section className="Education-section">
        <h2>{t[lang].education}</h2>
        <div className="section-content entry-list">
          {educationEntries.map((edu) => (
            <Entry
              key={edu.id}
              title={edu.title}
              location={edu.location}
              dates={edu.dates}
              details={edu.details}
              isExpanded={expandedEntries.education[edu.id]}
              onClick={() => toggleEntry("education", edu.id)}
            />
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="Experience-section">
        <h2>{t[lang].experience}</h2>
        <div className="section-content entry-list">
          {exp_example.map((exp, index) => (
            <Entry
              key={index}
              title={exp.title}
              location={exp.location}
              dates={exp.dates}
              isExpanded={expandedEntries.experience[`exp${index}`]}
              onClick={() => toggleEntry("experience", `exp${index}`)}
              details={
                <>
                  <ul>
                    {exp.summary.map((item, i) => <li key={`s-${i}`}>{item}</li>)}
                  </ul>
                  {exp.projects.length > 0 && (
                    <div className="project-list">
                      {exp.projects.map((proj, pIndex) => (
                        <div key={pIndex} className="project-item">
                          <div className="project-title">{proj.title} <span className="project-dates">({proj.dates})</span></div>
                          <ul>{proj.details.map((d, i) => <li key={`p-${i}`}>{d}</li>)}</ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              }
            />
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="Awards-section">
        <h2>{t[lang].awardsCertifications}</h2>
        <div className="section-content entry-list">
          {awardsCertifications.map((item, index) => (
            <Entry
              key={index}
              {...item}
              isExpanded={expandedEntries.awardsCertifications[`item${index}`]}
              onClick={() => toggleEntry("awardsCertifications", `item${index}`)}
            />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="Project-section">
        <h2>{t[lang].projects}</h2>
        <div className="section-content entry-list">
          <Entry
            title={pj_lawI.title}
            location={pj_lawI.location}
            dates={pj_lawI.dates}
            details={pj_lawI.details}
            images={pj_lawI.images}
            isExpanded={expandedEntries.projects.lawI}
            onClick={() => toggleEntry("projects", "lawI")}
          />
          <Entry
            title={pj_bindq.title}
            location={pj_bindq.location}
            dates={pj_bindq.dates}
            details={pj_bindq.details}
            images={pj_bindq.images}
            isExpanded={expandedEntries.projects.pj_bindq}
            onClick={() => toggleEntry("projects", "pj_bindq")}
          />
          <Entry
            title={pj_scamcut.title}
            location={pj_scamcut.location}
            dates={pj_scamcut.dates}
            details={pj_scamcut.details}
            images={pj_scamcut.images}
            isExpanded={expandedEntries.projects.pj_scamcut}
            onClick={() => toggleEntry("projects", "pj_scamcut")}
          />
          <Entry
            title={pj_estandard.title}
            location={pj_estandard.location}
            dates={pj_estandard.dates}
            details={pj_estandard.details}
            images={pj_estandard.images}
            isExpanded={expandedEntries.projects.pj_estandard}
            onClick={() => toggleEntry("projects", "pj_estandard")}
          />
          {/* Side project link card */}
          <a
            className="side-project-card"
            href={pj_side.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pj_side.label}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* Paper Reviews */}
      <section className="PaperReview-section">
        <h2>{t[lang].paperReviews}</h2>
        <div className="section-content entry-list">
          {visiblePaperReviews.map((item) => (
            <a
              key={item.id}
              className="paper-review-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <h3 className="entry-title">{item.title[lang]}</h3>
                {item.summary?.[lang] && (
                  <p className="entry-meta">{item.summary[lang]}</p>
                )}
              </div>
              <span className="paper-review-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
          {hasMorePaperReviews && (
            <button
              type="button"
              className="side-project-card"
              onClick={() => setShowAllPaperReviews((prev) => !prev)}
            >
              {showAllPaperReviews ? t[lang].paperReviewsLess : t[lang].paperReviewsMore}
              <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
