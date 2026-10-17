// ============================================================
// PORTFOLIO CONFIGURATION — Edit this file to update all info
// ============================================================

export const personal = {
  name: "Nitesh Nitin Dere",
  firstName: "Nitesh",
  wordmark: "NITESH.DEV",
  role: "Computer Engineering Student | Aspiring Software Developer | Cloud & AWS Enthusiast",
  college: "MIT Academy of Engineering (MITAOE), Alandi",
  degree: "B.Tech in Computer Engineering",
  year: "Third Year",
  graduation: "2028",
  cgpa: "8.06",
  location: "Pune, Maharashtra, India",
  email: "202401040344@mitaoe.ac.in",
  phone: "+91 8668727370",
  linkedin: "https://www.linkedin.com/in/nitesh-dere",
  github: "https://github.com/Nitesh0720",
  // Update this path once you place your resume PDF in /public/
  resumeFilename: "Nitesh_Dere_SDE_Intern_Resume.pdf",
  resumePublicPath: "/Nitesh_Dere_SDE_Intern_Resume.pdf",
};

export const heroRoles = [
  "Aspiring Software Developer",
  "Computer Engineering Student",
  "Cloud & AWS Enthusiast",
];

export const skills = {
  programming: [
    { name: "C++", icon: "cpp" },
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "Antigravity (AI Dev)", icon: "ai" },
  ],
  cloud: [
    { name: "Amazon S3", note: "Hands-on lab" },
    { name: "Amazon EC2", note: "Hands-on lab" },
    { name: "AWS IAM", note: "Hands-on lab" },
    { name: "Amazon VPC", note: "Hands-on lab" },
    { name: "Internet Gateway", note: "Hands-on lab" },
    { name: "NAT Gateway", note: "Hands-on lab" },
    { name: "Amazon Athena", note: "Hands-on lab" },
  ],
  fundamentals: [
    { name: "Basic Linux & Terminal" },
    { name: "Data Structures & Algorithms (Practice)" },
  ],
};

export const projects = [
  {
    id: "civicfix",
    title: "CivicFix",
    subtitle: "AI-Assisted Civic Complaint Management",
    description:
      "CivicFix is a working prototype designed to help citizens report civic issues and support more structured complaint handling through AI-assisted categorization, priority scoring, duplicate detection, and department routing.",
    longDescription: `CivicFix is a working prototype that addresses the gap in civic complaint management by providing a structured, AI-assisted pipeline. Citizens can submit complaints about local civic issues, which are then processed through a series of AI/ML components.

The system includes:
• AI/ML-assisted complaint categorization that routes issues to the right department
• Priority scoring using formulas and ML components that factor in urgency, location, and complaint type
• Duplicate complaint detection combining semantic similarity with a 100-metre proximity requirement
• Location-based complaint handling for geo-contextualized processing
• Human review workflows for edge cases that require verification

The project was built using Antigravity as an AI-assisted coding agent to build and iterate on much of the implementation. The map-based location feature is still in development and not yet fully reliable.`,
    status: "Working Prototype",
    hackathon: "Selected among 20 teams from 132 teams — Global SDG + AI Hackathon 2026 (Offline Round)",
    features: [
      "Citizen complaint submission interface",
      "AI/ML-assisted complaint categorization",
      "Priority scoring & SLA-related scoring",
      "Duplicate detection (semantic + 100m proximity)",
      "Location-based complaint handling",
      "Department assignment & routing",
      "Human review for edge-case verification",
    ],
    techStack: [
      "React", "TypeScript", "FastAPI", "PostgreSQL",
      "Python", "ML / NLP components", "Antigravity (AI-assisted dev)",
    ],
    techNote: "Built with AI-assisted development using Antigravity. Technologies listed reflect the project stack, not individually claimed expertise.",
    githubUrl: "https://github.com/Nitesh0720",
    liveUrl: null, // No live deployment — leave null
    featured: true,
    workflow: [
      { step: "1", label: "Citizen Submits Complaint", desc: "Via web interface with location & description" },
      { step: "2", label: "AI Categorization", desc: "ML model assigns category and department" },
      { step: "3", label: "Duplicate Detection", desc: "Semantic similarity + 100m proximity check" },
      { step: "4", label: "Priority Scoring", desc: "Formula + ML scoring for urgency ranking" },
      { step: "5", label: "Department Routing", desc: "Assigned to relevant civic department" },
      { step: "6", label: "Human Review", desc: "Edge cases flagged for manual verification" },
    ],
  },
];

export const cloudLabs = [
  {
    id: "s3-hosting",
    title: "S3 Static Website Hosting",
    services: ["Amazon S3"],
    objective: "Host a static website using S3 bucket with public access and static hosting enabled.",
    configured: "S3 bucket creation, static website hosting settings, bucket policy for public read access, index and error document configuration.",
    learned: "How S3 serves static content, bucket policies, public access settings, and endpoint URLs.",
    status: "Completed",
    githubUrl: null,
  },
  {
    id: "s3-uploads",
    title: "S3 Uploads & Multipart Upload",
    services: ["Amazon S3"],
    objective: "Practice S3 object uploads including large-file multipart upload exercises.",
    configured: "Single-part uploads via console and CLI, multipart upload initiation and completion steps.",
    learned: "S3 object storage model, multipart upload process for large files, and storage classes overview.",
    status: "Completed",
    githubUrl: null,
  },
  {
    id: "ec2-setup",
    title: "EC2 Instance Setup & Network Connectivity",
    services: ["Amazon EC2", "Security Groups"],
    objective: "Launch an EC2 instance and verify network connectivity via SSH and HTTP.",
    configured: "Instance type selection, AMI selection, key pair, security group rules for SSH/HTTP, and instance launch.",
    learned: "EC2 lifecycle, security group rules, key-pair authentication, and basic instance connectivity.",
    status: "Completed",
    githubUrl: null,
  },
  {
    id: "vpc-networking",
    title: "VPC Networking with Public & Private Subnets",
    services: ["Amazon VPC", "Internet Gateway", "NAT Gateway", "Route Tables"],
    objective: "Design a VPC with public and private subnets, configure routing with Internet Gateway and NAT Gateway.",
    configured: "VPC CIDR block, public and private subnets across availability zones, Internet Gateway attachment, NAT Gateway in public subnet, route table associations.",
    learned: "VPC architecture, subnet segmentation, routing tables, how Internet Gateway enables public access, and how NAT Gateway enables private subnet outbound traffic.",
    status: "Completed",
    githubUrl: null,
  },
  {
    id: "iam-access",
    title: "IAM Permissions & Access Control",
    services: ["AWS IAM"],
    objective: "Understand IAM users, groups, roles, and policies; practice least-privilege access design.",
    configured: "IAM users, IAM groups, managed and inline policies, role creation and trust relationships.",
    learned: "IAM policy structure, least-privilege principle, difference between managed and inline policies, and role-based access patterns.",
    status: "Completed",
    githubUrl: null,
  },
  {
    id: "athena-queries",
    title: "AWS Athena Data Queries",
    services: ["Amazon Athena", "Amazon S3", "AWS Glue"],
    objective: "Run SQL queries against data stored in S3 using Athena, including partitioned and unpartitioned datasets.",
    configured: "S3 data source, Athena workgroup, database and table definitions, partitioned table setup, query execution.",
    learned: "Serverless query execution on S3, benefits of partitioning for query cost optimization, and Athena's integration with Glue Data Catalog.",
    status: "Completed",
    githubUrl: null,
  },
];

export const achievements = [
  {
    id: "hackathon",
    title: "Global SDG + AI Hackathon 2026",
    role: "Team Leader — CivicFix",
    description: "Selected among 20 teams from 132 teams for the offline round. Led the team building CivicFix, an AI-assisted civic complaint management prototype.",
    icon: "trophy",
    highlight: true,
  },
  {
    id: "sih",
    title: "Smart India Hackathon",
    role: "Participant",
    description: "Participated in SIH, gaining experience in national-level hackathon problem-solving and team collaboration.",
    icon: "code",
    highlight: false,
  },
  {
    id: "placement",
    title: "MITAOE Placement Cell",
    role: "Volunteer",
    description: "Supporting placement-related event coordination at MIT Academy of Engineering.",
    icon: "users",
    highlight: false,
  },
  {
    id: "leetcode",
    title: "Actively Practicing LeetCode",
    role: "Problem Solver",
    description: "Building problem-solving skills through regular coding practice, focusing on data structures, algorithms, and logical thinking.",
    icon: "terminal",
    highlight: false,
  },
];

export const certifications = [
  {
    id: "aiml-internship",
    title: "AI/ML Virtual Internship",
    provider: "Google Developers",
    period: "June – August 2026",
    type: "Virtual Internship",
    description: "Completed an AI/ML virtual internship program covering machine learning concepts and practical applications.",
    verifyUrl: null,
    icon: "google",
  },
  {
    id: "aws-solutions",
    title: "Solutions Architecture Job Simulation",
    provider: "AWS (Forage)",
    date: "June 24, 2025",
    type: "Job Simulation",
    description: "Completed AWS Solutions Architecture job simulation — a structured training exercise, not professional employment.",
    verifyUrl: null,
    icon: "aws",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering for Everyone (AI0117EN)",
    provider: "IBM Skills Network",
    date: "June 24, 2025",
    type: "Course Certificate",
    description: "Completed IBM's Prompt Engineering for Everyone course covering prompt design, LLM interaction, and practical AI usage.",
    verifyUrl: null,
    icon: "ibm",
  },
];
