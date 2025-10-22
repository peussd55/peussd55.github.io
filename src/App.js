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
  const t = {
    KOR: {
      name: "Eunsu Park's Page",
      title: "AI 엔지니어",
      tagline: "AI 기술로 현실의 문제를 해결하는 엔지니어",
      aboutTitle: "소개",
      aboutText:
        "검색엔진 엔지니어를 거쳐 IBM x RedHat의 AX(AI Transformation) 과정을 통해 AI 전문가로 성장하고 있습니다. 데이터 기반의 문제 해결 능력과 새로운 기술에 대한 빠른 학습 능력을 바탕으로, 복잡한 비즈니스 요구사항을 해결하는 AI 솔루션을 만들고 싶습니다.",
      aboutFocus: ["키워드 : RAG, LLM, NLP, VLM, Agent"],
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
      name: "Eunsu Park's Page",
      title: "AI Engineer",
      tagline: "An engineer who solves real-world problems with AI technology.",
      aboutTitle: "About",
      aboutText:
        "Starting as a Search Engine Engineer, I am currently growing as an AI specialist through the AX (AI Transformation) course by IBM x RedHat. With strong data-driven problem-solving skills and a knack for quickly learning new technologies, I aim to create AI solutions that tackle complex business needs.",
      aboutFocus: ["Keyword : RAG, LLM, NLP, VLM, Agent"],
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

  // --- 교육
  const educationEntries  = [
    {
      id: "univ1",
      title:
        lang === "KOR" ? "한국교통대학교 나노화학소재공학과" : "Korea National University of Transportation – Department of Polymer science & Engineering",
      location: lang === "KOR" ? "충주, 대한민국" : "Chungju, Korea",
      dates: lang === "KOR" ? "2013 - 2020" : "2013 - 2020",
      details:
        lang === "KOR"
          ? [
              "금속, 세라믹, 폴리머 3대 재료 중 폴리머재료(고분자) 물질의 물리적/화학적 특성을 주로 공부",
            ]
          : [
              "Focused on the physical and chemical properties of polymer materials, one of the three major material classes (metals, ceramics, and polymers)",
            ],
    },
    {
      id: "univ2",
      title:
        lang === "KOR" ? "한국방송통신대학교 컴퓨터과학과" : "Korea National Open University – Department of Computer Science",
      location: lang === "KOR" ? "서울, 대한민국" : "Seoul, Korea",
      dates: lang === "KOR" ? "2021 - 재학 중" : "2021 - Present",
      details:
        lang === "KOR"
          ? [
              "C, C++, 소프트웨어공학, 운영체제, 이산수학, 컴퓨터구조, 딥러닝, 머신러닝, 클라우드",
            ]
          : [
              "C, C++, Software Engineering, Operating Systems, Discrete Mathematics, Computer Architecture, Deep Learning, Machine Learning, Cloud",
            ],
      },
    {
      id: "ibm",
      title:
        lang === "KOR" ? "[IBM x RedHat] AX(AI Transformation)" : "[IBM x RedHat] AX (AI Transformation)",
      location: lang === "KOR" ? "서울, 대한민국" : "Seoul, Korea",
      dates: lang === "KOR" ? "2025.05 - 현재" : "May 2025 – Present",
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
              "자사의 검색엔진 솔루션을 고객사의 리눅스서버에 설치합니다.",
              "고객사의 요구사항에 맞춰 검색엔진 커스터마이징을 진행합니다.",
              "고객사의 데이터베이스 SQL을 제공받고 SQL select문으로 검색엔진서버에 데이터를 수집합니다.",
              "컬렉션(검색대상), 검색조건, 검색 컬럼(필드)를 정의합니다.",
              "고객사의 피드백을 받습니다.",
              "공공데이터 API 유사한 형태로 JSON이나 XML형태로 파싱가능한 API형태로 제공합니다.",
              "고객사 내부의 통합 검색 화면을 직접 개발하며, 주로 JSP 또는 스프링 MVC 환경에서 검색 서버 및 솔루션 API와 데이터를 송수신하는 방식으로 구현합니다.",
            ] : 
            [
              "Install the search engine solution on the client's Linux server.",
              "Customize the search engine according to the client's requirements.",
              "Collect data for the search engine server using SQL select statements from the client's database.",
              "Define collections (search targets), search conditions, and search columns (fields).",
              "Receive and incorporate client feedback.",
              "Provide data through an API that can be parsed as JSON or XML, similar to public data APIs.",
              "Directly develop internal integrated search screens for clients, implementing data exchange with search servers and solution APIs, primarily using JSP or Spring MVC.",
            ],
        },
        {
          title: lang === "KOR" ? "챗봇 구축 및 웹개발 (1년)" : "Chatbot building and web development (1 year)",
          dates: "2020.10 - 2024.04",
          details: lang === "KOR" ?
            [
              "자사의 챗봇 솔루션을 고객사의 리눅스서버에 설치합니다. ",
              "고객사의 요구사항에 맞춰 검색엔진 커스터마이징을 진행합니다.",
              "지식구축팀이 고객과 소통하며 인텐트(사용자의도)를 구축하고 문서화합니다.",
              "개발팀이 챗봇 관리도구를 통해 인텐트를 적재합니다.",
              "챗봇 관리도구를 고객사의 요청에맞게 커스텀개발합니다.",
              "필요할 경우 검색엔진을 도입하여 검색기능을 챗봇에 연계합니다.",
              "챗봇 서비스 시스템(프론트엔드, 백엔드, 관리도구 DB 포함)을 개발하고 배포합니다.",
              "고객을 위한 사용자 가이드를 제공합니다.",
            ] :
            [
              "nstall the chatbot solution on the client's Linux server.",
              "Customize the search engine according to the client's requirements.",
              "Collaborate with the client to establish and document user intents through the knowledge-building team.",
              "Load the established intents using the chatbot management tool.",
              "Integrate search engine functionality into the chatbot as needed.",
              "Develop and deploy the chatbot service system (including the front-end, back-end, and admin tool database).",
              "Provide user guides for the client.",
            ],
        },
      ]
    },
  ];

  // --- 수상이력 & 자격증
  const awardsCertifications = [
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
    {
      title: lang === "KOR" ? "데이터분석 준전문가(ADsP)" : "Advanced Data Analytics Semi-Professional (ADsP)",
      location: lang === "KOR" ? "한국데이터산업진흥원" : "Korea Data Agency",
      dates: "2024.11",
      details: lang === "KOR"
        ? ["자격 취득"]
        : ["Acquired Qualification"],
    },
    {
      title: lang === "KOR" ? "정보처리기사" : "Engineer Information Processing",
      location: lang === "KOR" ? "한국산업인력공단" : "HRD Korea",
      dates: "2019.11",
      details: lang === "KOR"
        ? ["자격 취득"]
        : ["Acquired Qualification"],
    },
  ];

  // --- 프로젝트
  const pj_lawI = {
    title: lang === "KOR" ? "법률 도메인 특화 Agentic LLM 서비스" : "Agentic LLM Service for Legal Domain",
    location: lang === "KOR" ? "Team / 5인" : "Team / 5 members",
    dates: lang === "KOR" ? "2025 - 진행중" : "2025.09 - Present",
    details:
      lang === "KOR"
        ? [
            "RAG 파이프라인 설계: Llama-3-8B 모델과 RAG를 결합하여 법률 질의응답 성능을 최적화하고, 법령·판례 텍스트를 도메인 구조에 맞게 정제·청킹하여 검색 정확도를 향상",
            "Agentic 아키텍처 구축: LangChain 기반 에이전트 오케스트레이션으로 Retrieval, 추론, 문서 작성 등 모듈을 유연하게 조율하고, 동적 툴 라우팅을 구현",
            "데이터베이스 및 배포: ChromaDB를 활용한 Vector DB와 PostgreSQL(RDBMS)을 구축했으며, GitHub Actions와 AWS EC2를 통해 CI/CD 파이프라인을 자동화하고 서비스를 배포.",
          ]
        : [
            "Designed RAG Pipeline: Optimized legal Q&A performance by combining the Llama-3-8B model with RAG, and improved search accuracy by refining and chunking legal texts.",
            "Built Agentic Architecture: Orchestrated modules like Retrieval, Reasoning, and Drafting using LangChain, and implemented dynamic tool routing.",
            "Database & Deployment: Established a Vector DB with ChromaDB and a PostgreSQL RDBMS. Automated the CI/CD pipeline and deployed the service using GitHub Actions and AWS EC2.",
          ],
    images: [withBase("/images/lawai.png")],
  };

  const pj_bindq = {
    title: lang === "KOR" ? "BindQ Studio" : "BindQ Studio",
    location: lang === "KOR" ? "Team / 5인" : "Team / 5 members",
    dates: "2025",
    details:
      lang === "KOR"
        ? [
            "프로젝트 진행기간 : 2025.01 - 2025.03",
            "단백질 구조기반 신약 개발을 위한 De novo 단백질 설계 플랫폼(MVP) 개발",
            "복잡한 생물정보학 연구 도구들을 하나의 FastAPI·Gradio 기반 화면으로 묶어, 다섯 개 탭을 따라가며 설계할 수 있는 여정을 개발",
            "타겟 단백질정보를 입력, 타겟의 각 아미노산별 결합 부위 예측 -> 다음 설계  단계의 파라미터값 도출",
            "파라미터를 활용해 타겟에 결합할 바인더의 백본 설계",
            "생성한 바인더 백본에 잔기(아미노산 서열)생성",
            "결합 구조에서 타겟과 바인더의 결합 친화도 확인",
            <a href="https://github.com/peussd55/BindQ" target="_blank" rel="noopener noreferrer">
              GitHub 저장소 바로가기
            </a>,
          ]
        : [
            "Project Period: 2025.01 - 2025.03",
            "Development of a De novo Protein Design Platform (MVP) for Structure-Based Drug Discovery",
            "Developed a guided design journey by integrating complex bioinformatics research tools into a single interface based on FastAPI and Gradio, structured as a simple five-tab workflow.",
            "Input target protein information to predict binding sites for each amino acid, which in turn derives the parameters for the subsequent design phase.",
            "Utilize these parameters to design the backbone of a binder that will attach to the target.",
            "Generate residues (the amino acid sequence) for the newly created binder backbone.",
            "Confirm the binding affinity between the target and the binder in the resulting complex structure.",
            <a href="https://github.com/peussd55/BindQ" target="_blank" rel="noopener noreferrer">
              View GitHub Repository
            </a>,
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
            "빅카인즈 사기 뉴스를 KoBERT 파인튜닝(+LLM)을 통해 유형별로 정밀 분류",
            "분류된 뉴스와, '20대 여성' 등 정형적 사용자 정보를 텍스트 문장으로 변환하여, SBERT 임베딩으로 벡터화",
            "뉴스 임베딩 벡터 간 코사인 유사도를 계산하여 의미 기반의 중복 기사 제거",
            "사용자 프로필과 LLM으로 뉴스에서 추출한 '평균 피해자 프로필'간의 벡터 유사도를 계산하여 가장 연관성 높은 사기 유형을 진단(매칭)",
            "생성형AI도구(DALL-E 등)를 기반으로 뉴스 기반 요약 삽화와 숏폼 영상을 제작",
            <a href="https://www.kpf.or.kr/synap/skin/doc.html?fn=1735016238208.pdf&rs=/synap/result/board/" target="_blank" rel="noopener noreferrer">
              수상작 모음집
            </a>,
          ]
        : [
            "Project Period: 2024.10 - 2024.11",
            "2024 News Big Data Hackathon Excellence Award-winning project",
            "Developing a prototype service for tailored, AI-processed news content based on fraud vulnerability diagnosis using converged data",
            "Precisely classifying BIG KINDS fraud news by category through KoBERT fine-tuning (+LLM)",
            "Vectorizing classified news and structured user information (e.g., 'female in her 20s')—converted into text sentences—using SBERT embeddings",
            "Removing semantically duplicate articles by calculating cosine similarity between news embedding vectors",
            "Diagnosing (matching) the most relevant fraud type by calculating vector similarity between the user profile and the 'average victim profile' extracted from news via an LLM",
            "Creating news-based summary illustrations and short-form videos using generative AI tools (e.g., DALL-E)",
            <a href="https://www.kpf.or.kr/synap/skin/doc.html?fn=1735016238208.pdf&rs=/synap/result/board/" target="_blank" rel="noopener noreferrer">
              Award-Winning Collection
            </a>,
          ],
    images: [],
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
    // {
    //   id: "yolo",
    //   title: {
    //     KOR: "YOLO v1·v3·v5·v11 진화 리뷰",
    //     ENG: "Evolution of YOLO v1/v3/v5/v11",
    //   },
    //   summary: {
    //     KOR: "YOLO 계열의 백본·헤드 구조 변화와 성능/경량화 트렌드를 따라가며 정리",
    //     ENG: "Tracks YOLO backbone/head upgrades and performance-versus-efficiency trends from v1 to v11.",
    //   },
    //   href: "https://arxiv.org/abs/1506.02640",
    // },
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

  const [expandedEntries, setExpandedEntries] = useState(() => buildExpandedState(false));
  const [showAllPaperReviews, setShowAllPaperReviews] = useState(false);
  const hasMorePaperReviews = paperReviews.length > PAPER_REVIEW_MAX_VISIBLE;
  const visiblePaperReviews = showAllPaperReviews ? paperReviews : paperReviews.slice(0, PAPER_REVIEW_MAX_VISIBLE);

  const toggleEntry = (section, key) =>
    setExpandedEntries((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section]?.[key] },
    }));

  const handleExpandAll = () => setExpandedEntries(buildExpandedState(true));
  const handleCollapseAll = () => setExpandedEntries(buildExpandedState(false));

  // --- 스킬
  const skills =
    lang === "KOR"
      ? [
          { title: "AI / ML", items: [
            { Icon: SiJupyter, label: "Jupyter" },
            { Icon: SiPandas, label: "Pandas" },
            { Icon: SiPytorch, label: "PyTorch" },
            { Icon: SiTensorflow, label: "TensorFlow" },
            { Icon: SiKeras, label: "Keras" },
            { Icon: SiScikitlearn, label: "Scikitlearn" },
          ]},
          { title: "프론트엔드", items: [
            { Icon: SiReact, label: "React" },
            { Icon: SiJquery, label: "Jquery" },
            { Icon: SiFigma, label: "Figma" },
            { Icon: SiVercel, label: "Vercel" },
          ]},
          { title: "백엔드", items: [
            { Icon: SiFastapi, label: "Fastapi" },
            { Icon: SiFlask, label: "Flask" },
            { Icon: SiSpring, label: "Spring" },
            { Icon: SiSpringboot, label: "Springboot" },
          ]},
          { title: "데이터 / 인프라", items: [
            { Icon: SiLinux, label: "Linux" },
            { Icon: SiAmazonaws, label: "Amazonaws" },
            { Icon: SiPostgresql, label: "PostgreSQL" },
            { Icon: SiMongodb, label: "MongoDB" },
            { Icon: SiDocker, label: "Docker" },
            { Icon: SiPodman, label: "Podman" },
          ]},
          { title: "버전 관리", items: [
            { Icon: SiGit, label: "Git" },
            { Icon: SiSubversion, label: "Subversion" },
          ]},
        ]
      : [
          { title: "AI / ML", items: [
            { Icon: SiJupyter, label: "Jupyter" },
            { Icon: SiPandas, label: "Pandas" },
            { Icon: SiPytorch, label: "PyTorch" },
            { Icon: SiTensorflow, label: "TensorFlow" },
            { Icon: SiKeras, label: "Keras" },
            { Icon: SiScikitlearn, label: "Scikitlearn" },
          ]},
          { title: "Frontend", items: [
            { Icon: SiReact, label: "React" },
            { Icon: SiJquery, label: "Jquery" },
            { Icon: SiFigma, label: "Figma" },
            { Icon: SiVercel, label: "Vercel" },
          ]},
          { title: "Backend", items: [
            { Icon: SiFastapi, label: "Fastapi" },
            { Icon: SiFlask, label: "Flask" },
            { Icon: SiSpring, label: "Spring" },
            { Icon: SiSpringboot, label: "Springboot" },
          ]},
          { title: "Data / Infra", items: [
            { Icon: SiLinux, label: "Linux" },
            { Icon: SiAmazonaws, label: "Amazonaws" },
            { Icon: SiPostgresql, label: "PostgreSQL" },
            { Icon: SiMongodb, label: "MongoDB" },
            { Icon: SiDocker, label: "Docker" },
            { Icon: SiPodman, label: "Podman" },
          ]},
          { title: "Version Control", items: [
            { Icon: SiGit, label: "Git" },
            { Icon: SiSubversion, label: "Subversion" },
          ]},
        ];

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
        <p>{t[lang].aboutText}</p>
      </section> */}
      <section className="About-section">
      <h2>{t[lang].aboutTitle}</h2>
      <p>{t[lang].aboutText}</p>
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
                  <div className="project-list">
                    {exp.projects.map((proj, pIndex) => (
                      <div key={pIndex} className="project-item">
                        <div className="project-title">{proj.title} <span className="project-dates">({proj.dates})</span></div>
                        <ul>{proj.details.map((d, i) => <li key={`p-${i}`}>{d}</li>)}</ul>
                      </div>
                    ))}
                  </div>
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

      {/* Skills */}
      <section className="Skills-section">
        <h2>{t[lang].skills}</h2>
        <div className="section-content">
          <div className="skills-grid">
            {skills.map((g, i) => (
              <div className="skill-card" key={i}>
                <div className="skill-title">{g.title}</div>
                <div className="skill-items-wrap">
                  {g.items.map((it, idx) => (
                    <div className="skill-item" key={idx}>
                      <span className="skill-icon"><it.Icon size={18} /></span>
                      <span className="skill-label">{it.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
