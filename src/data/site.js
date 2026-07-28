export const EMAIL = 'mailto:alei0908@gmail.com';

export const NAV_LINKS = [
  { label: 'Work', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Resume', href: 'https://www.cakeresume.com/sandra-lai' },
];

export const FOOTER_LINKS = [
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/yatzusandralai/' },
  { label: 'Email', href: EMAIL },
];

export const HERO = {
  lines: ['Hi, I am Sandra.', 'Product Designer based in Taipei'],
  intro:
    '我是一位經驗豐富的產品設計師，致力於創造有意義的使用者體驗並為產品增加商業價值，專注於提供卓越的使用者體驗並實現產品優化目標。',
  cta: 'Get in touch',
};

/**
 * Order and slugs are the source of truth for the work grid, the routes and
 * the "More Work" sections. Covers are pending — a project without one falls
 * back to a placeholder tile.
 */
export const PROJECTS = [
  {
    slug: 'ruhachu',
    title: '嚕哈啾 Ruhachu',
    tags: '獨立產品・產品決策、設計、資料治理',
    description:
      '貓咪食品與生活用品的成分風險掃描 App。我獨立完成產品決策、流程與介面設計，並建立每週兩次的人工審核機制維持資料庫品質。目前停留在 TestFlight — 因為內測回饋指出真正的門檻在資料覆蓋率，不在介面。',
    cover: null,
  },
  {
    slug: 'opt',
    title: '歐趴雞排',
    tags: '唯一設計師・產品設計、平面視覺',
    description:
      '線上線下整合的活動體驗設計。我到現場旁觀十餘場活動、記錄使用者卡在哪裡，找出那個讓人找不到路徑回來的頁面。會員數自 4 萬增至 10 萬以上，現場雞排發放速度自約 150 片/小時提升至約 250 片/小時。',
    cover: null,
  },
  {
    slug: '1111',
    title: '1111 Recruitment Platform',
    tags: '資深 UI/UX 設計師',
    description:
      '在一個 20 多年沒改過流程的招募系統上，四個月內交付 MVP。改版涵蓋八大功能模組，我負責從產品流程定義到設計交付，並建立設計系統與元件原則，同時指導一位 junior 設計師。',
    cover: null,
  },
  {
    slug: 'sekaimen',
    title: 'Sekaimen 世界門',
    tags: 'UI/UX 設計・獨立接案',
    description:
      '代標代購平台改版與品牌識別重新設計。我把代購流程從 10 步收斂到 7 步，同時辨識出哪些複雜度來自產業的資料介接條件、不屬於介面層。這也是我學到「省下的研究時間會加倍還回來」的專案。',
    cover: null,
  },
  {
    slug: 'guardianpie',
    title: '守護派 Guardian Pie',
    tags: '獨立產品・Side Project',
    description:
      '台灣動保組織捐款整合平台，收錄約 100 個組織，其中相當比例連獨立網站都沒有。純公益、不做任何收入，每一筆名單都經我以「政府立案」與「捐款徵信」兩項判準審核後才收錄。',
    cover: null,
  },
];

export const ABOUT = {
  avatar: '/images/d5iOsQQLVNnptAzePagTK4YyQ0.jpg',
  heading: "Hello, I'm Sandra Lai.🤙",
  paragraphs: [
    '作為超過 5年經驗的產品設計師，我跨足了人力仲介、IoT和電商產業。精通產品開發全部流程，專注於創造卓越的使用者體驗，並善於結合品牌洞察，通過研究和創新設計實現產品優化。',
    '我認為持續學習和自我挑戰是成長的關鍵。成年後才學會騎腳踏車，展現我嘗試新事物的勇氣；而花費兩年多克服對水的恐懼，不僅鍛鍊我的毅力，也理解找出問題背後的問題，方可提出精準的解決方案。',
    '這些經歷塑造了我的專業方法。我將耐心、決心和創新精神融入每個設計項目，致力於突破常規，為使用者創造直觀且驚喜的體驗。我期待運用專業技能和個人特質為團隊創造商業價值。',
  ],
  quotesHeading: 'My Colleagues Describe Me',
  quotes: [
    {
      avatar: '/images/8nZRFYSnTadf6krAyB2WGxJJX10.png',
      name: 'Weiling Liu',
      role: 'Front-end Designer',
      text: 'Sandra 在 UI 設計上展現獨特美感，每個細節都充滿個人風格，且設計速度非常快速，能高效完成任務。在 UX 團隊討論和執行中，她樂於分享自身經驗，提供寶貴見解和建議，幫助團隊更好地理解和實現設計目標。',
    },
    {
      avatar: '/images/QPFDP0KouDlymCm7IFBeA.png',
      name: 'Chloe Mou',
      role: 'Product Manager',
      text: '在產品專案中，Sandra 總是能給我們系統化的設計規劃，讓我們可以應對多變的需求調整。同時，UX 上帶給我們她的經驗及市場上的設計分析，設計時還能同時兼顧使用者需求及開發難度。能與一個具備優秀溝通能力且專業有想法的設計師合作，真的很高興。',
    },
    {
      avatar: '/images/GEZbLag4i9hcy3K34TpQNwUYBhs.png',
      name: 'Jackie',
      role: 'Front-end Developer',
      text: 'Sandra 總能在需求調整或技術實現有困難時，與客戶進行有效溝通，並提供完整且精確的解決方案，確保各方滿意。她具備卓越的溝通能力，工作明確而高效，設計不僅符合 UI/UX 原則，還能滿足客戶需求且富有創新。與 Sandra 合作，我深感安心，並對她的專業能力讚不絕口。',
    },
  ],
};

export const CASE_SLUGS = PROJECTS.map((p) => p.slug);
