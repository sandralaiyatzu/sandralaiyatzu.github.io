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
  lines: ['👋Hi, I am Sandra Lai.', 'Product Designer, AI Builder'],
  intro: [
    '資深產品設計師，10 多年設計經歷、7 年 UI/UX 實務。擅長在技術債重、資源有限、時程緊迫的條件下，把複雜系統拆解成可執行的流程與可維護的設計資產。',
    '近年獨立運用 AI 工具完成兩項 0→1 產品並實際上線／內測，涵蓋產品定義、資訊架構、介面設計到資料治理。熟悉 AI 能加速什麼，也清楚它在哪些環節必須由人把關。',
  ],
  cta: 'Get in touch',
  workHeading: 'Selected Work',
};

/**
 * Order and slugs are the source of truth for the work grid, the routes and
 * the "More Work" sections. Covers are pending — a project without one falls
 * back to a placeholder tile.
 */
export const PROJECTS = [
  {
    slug: 'ruhachu',
    title: '01｜Ruhachu 嚕哈啾｜獨立開發 App',
    tags: 'Independent Product · 0→1 · Product Strategy, IA, Data Governance',
    description:
      '一款掃描貓咪食品與生活用品成分風險的 iOS App，由我獨立完成產品定義、資訊架構、介面設計與資料治理，AI 負責開發執行。這份案例談的是：當一個產品要對生命的健康提出警示時，如何設計出「可信但不越界」的判斷。',
    cover: null,
  },
  {
    slug: 'opt',
    title: '02｜OPT 歐趴糖｜歐趴雞排－線上線下整合的活動體驗',
    tags: 'Product Design · Field Research · Cross-functional',
    description:
      '活動現場，一小時只發得出一百多片雞排。瓶頸不在炸鍋，在一個使用者找不到路徑回來的頁面。這份案例談的是：當理想方案被工程時程否決時，如何決定該讓步的是什麼。',
    cover: null,
  },
  {
    slug: '1111',
    title: '03｜1111 人力銀行｜招募平台改版',
    tags: 'B2B System · IA · Design System · Mentoring',
    description:
      '一個 20 多年只做功能增刪、從未重新檢視流程的 B2B 招募系統。使用者形容它「像在迷宮裡找出口」。這份案例談的是：在技術債沉重的老系統上，設計師的優先順序判斷如何決定專案能不能推進，以及我當時做錯的那個決定。',
    cover: null,
  },
  {
    slug: 'sekaimen',
    title: '04｜Sekaimen 世界門｜代標代購平台改版',
    tags: 'E-commerce · Flow Simplification · Corporate Identity',
    description:
      '要在這個平台上買一件東西，使用者得走完十個步驟，中間還會被彈出視窗和新分頁打斷兩次。這份案例談的是：一個我在報價階段就低估了規模的專案，以及它教會我的事。',
    cover: null,
  },
  {
    slug: 'guardianpie',
    title: '05｜守護派 Guardian Pie｜動物捐款整合平台',
    tags: 'Independent Product · IA · Non-profit',
    description:
      'Google 搜尋動保捐款，排在前面的永遠是同幾個組織。還有一群組織連自己的網站都沒有，只能靠 Facebook 貼文募款。這份案例談的是：我做了一個解決能見度問題的平台，卻沒有替它爭取能見度。',
    cover: null,
  },
];

export const ABOUT = {
  avatar: '/images/d5iOsQQLVNnptAzePagTK4YyQ0.jpg',
  heading: '👋Hi, I am Sandra Lai.',
  paragraphs: [
    '我是一位產品設計師，目前在台北。10 多年設計經歷、7 年 UI/UX 實務，跨足人力仲介、IoT、電商與企業內部系統。',
    '我擅長的事情，多半發生在條件不理想的時候——技術債沉重的老系統、不可延期的檔期、外包的開發團隊，或是一個人從零開始。把複雜的東西拆解成可執行的流程，並留下團隊接得住的文件與規範，是我這幾年最主要的工作。',
  ],

  sections: [
    {
      heading: '我怎麼工作',
      items: [
        {
          title: '到真實的使用情境裡找答案',
          paragraphs: [
            '資料能告訴你發生了什麼，但站在現場看使用者卡在哪一步，能告訴你為什麼。',
            '我在一次線下活動中旁觀了十餘場、觀察上百位使用者，找出三個在辦公室測試時完全不會出現的斷點——排隊、網路壅塞、旁邊有人在等，這些條件會讓一個平常不痛不癢的跳頁變成整段體驗最大的斷層。做獨立產品時也一樣：內測者的一句「掃不到就不會再用」，比任何介面討論都更快讓我看清產品的真正瓶頸。',
          ],
        },
        {
          title: '先弄清楚限制，再決定優先序',
          paragraphs: [
            '我提過的方案被工程團隊否決過。當時我主張的做法體驗更完整，但需要改動架構、會拉長開發時程，而活動檔期不可延——與 PO 討論後，我們選擇了較不理想但能如期上線的版本。',
            '理解每個角色的實際限制之後再排優先序，通常比堅持自己的方案更能把事情推進。這也讓我在面對老舊系統時比較清楚：真正影響進度的往往不是設計品質，而是團隊有沒有在對的事情上排序。',
          ],
        },
        {
          title: '交付的東西要讓下一個人接得住',
          paragraphs: [
            '設計稿只是其中一部分。我習慣一併交付規格說明、元件使用原則或執行 SOP，讓工程能快速對齊，也讓後續接手的設計師理解既有頁面的邏輯。',
            '在 B2B 系統改版時我建立了設計系統與元件原則，在接案專案中交付了完整的品牌規範，在獨立產品裡則是資料的收錄與審核標準。形式不同，目的一樣：讓這份工作在我離開之後仍然可以被延續。',
          ],
        },
      ],
    },
    {
      heading: '關於 AI',
      items: [
        {
          paragraphs: [
            '我近年獨立完成了兩項 0→1 產品：一個動保組織捐款整合平台，以及一款貓咪用品成分風險掃描 App。開發與資料處理由 AI 執行，產品判斷與品質把關由我負責。',
            '這個過程讓我很清楚 AI 能加速什麼，也很清楚它在哪裡不能被信任。所以我在成分辨識這一環建立了人工審核機制——AI 給我的是產能，我要負責的是這個產能不會變成錯誤資料的來源。',
          ],
        },
      ],
    },
  ],

  contact: { lead: '有興趣聊聊的話，歡迎來信：', email: 'alei0908@gmail.com' },

  quotesHeading: 'My Colleagues Describe Me',
  quotes: [
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
    {
      avatar: '/images/8nZRFYSnTadf6krAyB2WGxJJX10.png',
      name: 'Weiling Liu',
      role: 'Front-end Designer',
      text: 'Sandra 在 UI 設計上展現獨特美感，每個細節都充滿個人風格，且設計速度非常快速，能高效完成任務。在 UX 團隊討論和執行中，她樂於分享自身經驗，提供寶貴見解和建議，幫助團隊更好地理解和實現設計目標。',
    },
  ],
};

export const CASE_SLUGS = PROJECTS.map((p) => p.slug);
