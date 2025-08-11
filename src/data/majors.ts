export type Major = {
  id: string;
  code: string;
  name: string;
  groups: string[]; // Khối thi phù hợp
  minScore: number; // Ngưỡng điểm tham khảo (3 môn)
  interests: string[];
  skills: string[];
  description: string;
  resources: { title: string; url: string }[];
};

export const MAJORS: Major[] = [
  {
    id: "cs",
    code: "7480101",
    name: "Khoa học Máy tính",
    groups: ["A00", "A01", "D07"],
    minScore: 24,
    interests: ["công nghệ", "logic", "giải quyết vấn đề"],
    skills: ["toán", "tin học", "tư duy phân tích"],
    description:
      "Nghiên cứu thuật toán, cấu trúc dữ liệu, trí tuệ nhân tạo, phát triển phần mềm và hệ thống thông minh.",
    resources: [
      { title: "Lộ trình học CS", url: "https://roadmap.sh" },
      { title: "CS50 Harvard", url: "https://cs50.harvard.edu" },
    ],
  },
  {
    id: "se",
    code: "7480103",
    name: "Kỹ thuật Phần mềm",
    groups: ["A00", "A01", "D07"],
    minScore: 23,
    interests: ["công nghệ", "xây dựng sản phẩm", "khởi nghiệp"],
    skills: ["toán", "tin học", "làm việc nhóm"],
    description:
      "Thiết kế, xây dựng, kiểm thử và vận hành phần mềm quy mô lớn theo quy trình hiện đại.",
    resources: [
      { title: "Frontend Roadmap", url: "https://roadmap.sh/frontend" },
      { title: "Backend Roadmap", url: "https://roadmap.sh/backend" },
    ],
  },
  {
    id: "ba",
    code: "7340101",
    name: "Quản trị Kinh doanh",
    groups: ["A00", "A01", "D01"],
    minScore: 21,
    interests: ["kinh doanh", "quản lý", "marketing"],
    skills: ["giao tiếp", "phân tích", "lãnh đạo"],
    description:
      "Học về quản trị, tài chính, tiếp thị, chiến lược và vận hành doanh nghiệp.",
    resources: [
      { title: "MarketingBasics", url: "https://www.google.com/primer" },
      { title: "Y Combinator Startup", url: "https://www.startupschool.org" },
    ],
  },
  {
    id: "fin",
    code: "7340201",
    name: "Tài chính - Ngân hàng",
    groups: ["A00", "A01", "D01"],
    minScore: 22,
    interests: ["kinh doanh", "đầu tư", "phân tích"],
    skills: ["toán", "phân tích", "giao tiếp"],
    description:
      "Phân tích tài chính, ngân hàng, đầu tư, quản trị rủi ro và thị trường vốn.",
    resources: [
      { title: "Khan Academy Finance", url: "https://www.khanacademy.org/economics-finance-domain" },
    ],
  },
  {
    id: "med",
    code: "7720101",
    name: "Y khoa",
    groups: ["B00"],
    minScore: 26,
    interests: ["sức khỏe", "giúp đỡ cộng đồng"],
    skills: ["sinh học", "hóa", "kiên nhẫn"],
    description:
      "Chẩn đoán, điều trị, chăm sóc sức khỏe cộng đồng và nghiên cứu y học.",
    resources: [
      { title: "NEJM Education", url: "https://knowledgeplus.nejm.org" },
    ],
  },
  {
    id: "pharm",
    code: "7720201",
    name: "Dược học",
    groups: ["B00", "A00"],
    minScore: 24,
    interests: ["sức khỏe", "hóa học", "nghiên cứu"],
    skills: ["hóa", "sinh học", "tỉ mỉ"],
    description:
      "Nghiên cứu, bào chế, kiểm nghiệm và quản lý thuốc, dược phẩm.",
    resources: [
      { title: "Pharmacology Basics", url: "https://www.youtube.com/@ArmandoHasudungan" },
    ],
  },
  {
    id: "law",
    code: "7380101",
    name: "Luật học",
    groups: ["C00", "D01"],
    minScore: 21,
    interests: ["xã hội", "pháp luật", "tranh biện"],
    skills: ["văn", "giao tiếp", "lập luận"],
    description:
      "Hệ thống pháp luật, tố tụng, luật dân sự, hình sự, thương mại và quốc tế.",
    resources: [
      { title: "Legal Resources", url: "https://www.coursera.org/browse/social-sciences/law" },
    ],
  },
  {
    id: "ir",
    code: "7310206",
    name: "Quan hệ Quốc tế",
    groups: ["D01", "C00"],
    minScore: 21,
    interests: ["xã hội", "ngoại giao", "ngoại ngữ"],
    skills: ["ngoại ngữ", "giao tiếp", "phân tích"],
    description:
      "Nghiên cứu chính trị, kinh tế và đối ngoại giữa các quốc gia, tổ chức quốc tế.",
    resources: [
      { title: "IR Basics", url: "https://www.coursera.org/browse/social-sciences/governance-and-society" },
    ],
  },
  {
    id: "design",
    code: "7210403",
    name: "Thiết kế Đồ họa",
    groups: ["V00", "H00", "D01"],
    minScore: 20,
    interests: ["sáng tạo", "nghệ thuật", "truyền thông"],
    skills: ["mỹ thuật", "tư duy hình ảnh", "phần mềm thiết kế"],
    description:
      "Thiết kế thương hiệu, UI/UX, minh họa và truyền thông trực quan.",
    resources: [
      { title: "Figma Learn", url: "https://help.figma.com/hc/en-us/articles/1500004362281-Get-started-with-Figma" },
    ],
  },
  {
    id: "psy",
    code: "7310401",
    name: "Tâm lý học",
    groups: ["B00", "C00", "D01"],
    minScore: 21,
    interests: ["xã hội", "giúp đỡ cộng đồng", "nghiên cứu"],
    skills: ["lắng nghe", "phân tích", "thấu cảm"],
    description:
      "Nghiên cứu hành vi, cảm xúc con người và ứng dụng trong trị liệu, giáo dục, nhân sự.",
    resources: [
      { title: "Psychology", url: "https://www.khanacademy.org/test-prep/mcat/behavior" },
    ],
  },
  {
    id: "eng",
    code: "7520201",
    name: "Kỹ thuật Điện - Điện tử",
    groups: ["A00", "A01"],
    minScore: 23,
    interests: ["công nghệ", "chế tạo", "robot"],
    skills: ["toán", "lý", "thực hành"],
    description:
      "Hệ thống điện, điện tử, viễn thông, điều khiển và tự động hóa.",
    resources: [
      { title: "EE Basics", url: "https://www.allaboutcircuits.com" },
    ],
  },
  {
    id: "lang",
    code: "7220201",
    name: "Ngôn ngữ Anh",
    groups: ["D01"],
    minScore: 20,
    interests: ["ngoại ngữ", "văn hóa", "truyền thông"],
    skills: ["ngoại ngữ", "giao tiếp", "viết"],
    description:
      "Nâng cao năng lực tiếng Anh, biên - phiên dịch, giảng dạy và truyền thông quốc tế.",
    resources: [
      { title: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish" },
    ],
  },
];
