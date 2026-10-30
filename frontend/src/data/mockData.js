// Next Generation Network Training Centre - Mock Enterprise Data

export const CURRENT_STUDENT = {
  id: "NGN-9842-SEC",
  name: "Alex Rahman",
  email: "alex.rahman@enterprise.ngntc.edu",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  role: "student",
  headline: "Senior Systems & Network Engineer Trainee",
  enrolledDate: "2026-02-15",
  overallProgress: 78,
  ipAddress: "198.51.100.42 (Protected VPN)",
  securityLevel: "Level-3 Zero Trust Verified",
  creditsEarned: 48,
  activeEnrolledCount: 4,
  certificatesEarned: 3,
  assignedBatch: "Batch-2026-ALPHA (AI & Networking)",
  skills: [
    { name: "5G/6G Core Networks", score: 88, color: "bg-cyan-500" },
    { name: "AI & Neural Architectures", score: 82, color: "bg-purple-500" },
    { name: "Kubernetes & Cloud Systems", score: 91, color: "bg-emerald-500" },
    { name: "Zero-Trust Cybersecurity", score: 95, color: "bg-rose-500" },
    { name: "High-Performance Go/Rust", score: 76, color: "bg-amber-500" },
  ]
};

// Trainer / Instructor Profile
export const CURRENT_TRAINER = {
  id: "TRN-5012-FAC",
  name: "Dr. Elena Rostova",
  email: "elena.rostova@faculty.ngntc.edu",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
  role: "trainer",
  title: "Principal AI Research Scientist & Distinguished Faculty Lead",
  department: "Autonomous Systems & Network Intelligence",
  bio: "Former DeepMind AI Systems Fellow and MIT Laboratory for Information and Decision Systems researcher with 12+ years pioneering reinforcement learning for autonomous packet fabrics and terabit network telemetry.",
  rating: 4.96,
  totalStudentsTrained: 18450,
  activeBatches: 3,
  credentials: [
    { title: "Ph.D. in Computer Science & Artificial Intelligence", org: "MIT CSAIL", year: "2018" },
    { title: "Cisco Certified Internetwork Expert (CCIE #49284)", org: "Cisco Systems", year: "2020" },
    { title: "Certified Kubernetes Security Specialist (CKS)", org: "CNCF / Linux Foundation", year: "2022" },
    { title: "AWS Certified Solutions Architect – Professional", org: "Amazon Web Services", year: "2024" }
  ],
  specializations: [
    "Autonomous Reinforcement Learning (PPO, DDPG)",
    "P4 Data Plane Programmability",
    "High-Throughput eBPF/XDP Kernel Bypass",
    "Large Language Model AIOps Telemetry",
    "Zero-Trust SDN Control Planes"
  ],
  socials: {
    github: "https://github.com/elena-rostova-ai",
    linkedin: "https://linkedin.com/in/dr-elena-rostova",
    scholar: "https://scholar.google.com/citations?user=ngntc_rostova"
  },
  publishedTracks: [
    "AI-301: Enterprise AI & Autonomous Network Intelligence",
    "SYS-501: Hyper-Scale Cloud Systems & Kubernetes Engineering"
  ],
  createdSessionsCount: 42
};

// Student's Assigned Resources
export const ASSIGNED_STUDENT_RESOURCES = [
  {
    id: "res-1",
    title: "AI-301 Dedicated Cloud Sandbox (GPU Node 8x A100)",
    type: "Lab Sandbox",
    status: "Active (24/7 Available)",
    accessUrl: "https://labs.ngntc.internal/sandbox/alex-ai-301",
    expiry: "2026-12-31",
    badge: "Assigned Lab"
  },
  {
    id: "res-2",
    title: "P4 Programmable Switch BMv2 Virtual Appliance",
    type: "Virtual Appliance",
    status: "Ready to Launch",
    accessUrl: "ssh://student9842@switch-p4.labs.ngntc.internal",
    expiry: "2026-12-31",
    badge: "Hardware Emulation"
  },
  {
    id: "res-3",
    title: "Proprietary 5G Core Standalone Architecture Manual",
    type: "Document",
    status: "Unlocked",
    accessUrl: "/vault/doc-1",
    expiry: "Permanent Access",
    badge: "Encrypted PDF"
  },
  {
    id: "res-4",
    title: "Proctored NGN-CNA Certification Exam Voucher",
    type: "Exam Voucher",
    status: "2 Attempts Remaining",
    accessUrl: "/exams/exam-net-cert",
    expiry: "2026-11-30",
    badge: "Official Exam"
  }
];

// Trainer's Enrolled Students Roster
export const TRAINER_STUDENTS_ROSTER = [
  {
    id: "NGN-9842-SEC",
    name: "Alex Rahman",
    email: "alex.rahman@enterprise.ngntc.edu",
    batch: "Cohort Alpha",
    progress: 78,
    status: "Active",
    lastActive: "10 mins ago"
  },
  {
    id: "NGN-9843-SEC",
    name: "Tariq Mansoor",
    email: "tariq.m@globaltelecom.com",
    batch: "Cohort Alpha",
    progress: 92,
    status: "Active",
    lastActive: "1 hour ago"
  },
  {
    id: "NGN-9844-SEC",
    name: "Chloe Vane",
    email: "chloe.vane@cloudsec.io",
    batch: "Cohort Beta",
    progress: 65,
    status: "Active",
    lastActive: "Yesterday"
  },
  {
    id: "NGN-9845-SEC",
    name: "Liam O'Connor",
    email: "liam.oc@infra-systems.net",
    batch: "Cohort Alpha",
    progress: 84,
    status: "Active",
    lastActive: "3 hours ago"
  }
];

// Free Open Source & Commercial Meeting Providers
export const MEETING_PROVIDERS = [
  {
    id: "jitsi",
    name: "Jitsi Meet",
    type: "Open Source (100% Free)",
    badge: "Recommended Free",
    icon: "Globe",
    color: "text-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-950/40",
    description: "Instant encrypted meeting room. Zero account needed, no 40-min limit, HD video & screen share.",
    defaultUrlTemplate: "https://meet.jit.si/NGNTC-Room-"
  },
  {
    id: "gmeet",
    name: "Google Meet",
    type: "Commercial",
    badge: "Google Workspace",
    icon: "Video",
    color: "text-blue-400",
    border: "border-blue-500/40",
    bg: "bg-blue-950/40",
    description: "Enterprise video conferencing with Google Calendar sync & automated recording.",
    defaultUrlTemplate: "https://meet.google.com/"
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    type: "Commercial",
    badge: "Microsoft 365",
    icon: "Users",
    color: "text-indigo-400",
    border: "border-indigo-500/40",
    bg: "bg-indigo-950/40",
    description: "Deep enterprise integration with Microsoft 365, breakout rooms, and PowerPoint Live.",
    defaultUrlTemplate: "https://teams.microsoft.com/l/meetup-join/"
  },
  {
    id: "zoom",
    name: "Zoom Meeting",
    type: "Commercial",
    badge: "Cloud Conferencing",
    icon: "Video",
    color: "text-cyan-400",
    border: "border-cyan-500/40",
    bg: "bg-cyan-950/40",
    description: "High concurrency video classroom with AI summaries and multi-camera support.",
    defaultUrlTemplate: "https://zoom.us/j/"
  },
  {
    id: "webex",
    name: "Cisco Webex",
    type: "Commercial",
    badge: "Cisco Enterprise",
    icon: "Radio",
    color: "text-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-950/40",
    description: "Military-grade end-to-end encryption with real-time translation & noise removal.",
    defaultUrlTemplate: "https://webex.com/meet/"
  },
  {
    id: "ondemand",
    name: "On-Demand (Self-Paced)",
    type: "Asynchronous",
    badge: "Flexible Time",
    icon: "PlaySquare",
    color: "text-amber-400",
    border: "border-amber-500/40",
    bg: "bg-amber-950/40",
    description: "Pre-recorded 4K stream with chapter navigation, automated quizzes, and DRM protection.",
    defaultUrlTemplate: "https://ngntc.edu/video-stream/"
  }
];

export const COURSES = [
  {
    id: "ngn-ai-301",
    code: "AI-301",
    title: "Enterprise AI & Autonomous Network Intelligence",
    track: "Artificial Intelligence",
    badge: "Hot Track",
    level: "Advanced",
    duration: "14 Weeks (84 Hours)",
    instructor: "Dr. Elena Rostova",
    instructorTitle: "Principal AI Research Scientist, MIT / ex-DeepMind",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    rating: 4.9,
    enrolledCount: 14200,
    price: "$850",
    progress: 74,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    description: "Master autonomous reinforcement learning algorithms, predictive network telemetry with LLMs, and real-time inference optimization for terabit networks.",
    syllabus: [
      {
        week: "Week 1 - 2",
        title: "Deep Reinforcement Learning for Network Routing",
        topics: ["Markov Decision Processes in Packet Switching", "Q-Learning & PPO for Congestion Control", "Hands-on PyTorch Flow Simulation"]
      },
      {
        week: "Week 3 - 5",
        title: "LLMs & Agentic AIOps Infrastructure",
        topics: ["Autonomous Network Self-Healing Agents", "Vector Embeddings for Syslog Root Cause Analysis", "Fine-tuning Small Models on Telemetry Data"]
      },
      {
        week: "Week 6 - 9",
        title: "Edge AI Acceleration & TensorRT Deployment",
        topics: ["FPGA & GPU acceleration at Network Edges", "ONNX Runtime with C++ Pipeline", "Quantization & Low-Latency Inferencing (<1ms)"]
      },
      {
        week: "Week 10 - 14",
        title: "Capstone: Autonomous BGP Anomaly Detection Engine",
        topics: ["Real-time Kafka streaming", "Distributed Transformer Inference", "Production Deployment on Kubernetes"]
      }
    ]
  },
  {
    id: "ngn-net-401",
    code: "NET-401",
    title: "Next-Gen Software-Defined Networking & 5G/6G Core",
    track: "Networking",
    badge: "Flagship",
    level: "Expert",
    duration: "16 Weeks (96 Hours)",
    instructor: "Engr. Marcus Vance",
    instructorTitle: "Chief Network Architect, CCIE #49284 & 3GPP Delegate",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 4.95,
    enrolledCount: 22800,
    price: "$920",
    progress: 92,
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
    description: "Deep dive into OpenFlow, P4 programmable data planes, 5G Standalone (SA) core architecture, eBPF packet processing, and optical DWDM networks.",
    syllabus: [
      {
        week: "Week 1 - 3",
        title: "P4 Language & Programmable Switches",
        topics: ["V1Model & PSA architecture", "Custom Header parsing and VXLAN encapsulation", "Hardware switch emulation with BMv2"]
      },
      {
        week: "Week 4 - 7",
        title: "5G SA Core & Network Slicing",
        topics: ["AMF, SMF, UPF microservices", "SBA (Service Based Architecture) over HTTP/2", "Dynamic Network Slicing with QoS guarantees"]
      },
      {
        week: "Week 8 - 11",
        title: "Kernel Bypassing with DPDK & eBPF/XDP",
        topics: ["Zero-copy memory ring buffers", "High-throughput 100Gbps line-rate filtering", "Linux Kernel XDP drivers"]
      },
      {
        week: "Week 12 - 16",
        title: "Terabit Cloud Data Center Fabric Engineering",
        topics: ["EVPN-VXLAN spines & leaves", "SRv6 (Segment Routing over IPv6)", "High-Availability BFD Failover"]
      }
    ]
  },
  {
    id: "ngn-sys-501",
    code: "SYS-501",
    title: "Hyper-Scale Cloud Systems & Kubernetes Engineering",
    track: "Systems & Cloud",
    badge: "Popular",
    level: "Advanced",
    duration: "12 Weeks (72 Hours)",
    instructor: "Sarah Jenkins",
    instructorTitle: "Staff Infrastructure Engineer, CNCF Ambassador",
    instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    rating: 4.88,
    enrolledCount: 18400,
    price: "$790",
    progress: 60,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
    description: "Architect distributed systems scaling to millions of concurrent requests. Master K8s internals, etcd clustering, service mesh (Istio), and chaos engineering.",
    syllabus: [
      {
        week: "Week 1 - 3",
        title: "Kubernetes Control Plane Deep Dive",
        topics: ["API Server Raft consensus with etcd", "Custom Resource Definitions (CRDs) & Operators", "Scheduler algorithms & Affinity rules"]
      },
      {
        week: "Week 4 - 6",
        title: "Service Mesh Architecture & Envoy Proxy",
        topics: ["mTLS Zero-Trust communication", "Traffic splitting & Canary rollouts", "Distributed Tracing with OpenTelemetry & Jaeger"]
      },
      {
        week: "Week 7 - 9",
        title: "High-Volume Storage & Distributed Databases",
        topics: ["Ceph Rook storage operator", "PostgreSQL read-replica sharding with Citus", "Redis Cluster master-replica failover"]
      },
      {
        week: "Week 10 - 12",
        title: "Site Reliability & 1M User Load Simulation",
        topics: ["Locust & k6 load testing", "Prometheus alerts & Grafana dashboards", "Automated self-healing pipelines"]
      }
    ]
  },
  {
    id: "ngn-sec-601",
    code: "SEC-601",
    title: "Offensive Cyber Defense & Zero-Trust Architecture",
    track: "Cybersecurity",
    badge: "Critical",
    level: "Expert",
    duration: "14 Weeks (84 Hours)",
    instructor: "Dmitri Volkov",
    instructorTitle: "Former Cyber Warfare Consultant & Principal Threat Hunter",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 4.97,
    enrolledCount: 16900,
    price: "$890",
    progress: 85,
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    description: "Military-grade network defense, memory exploit analysis, cryptanalysis, zero-trust perimeter enforcement, and anti-data-exfiltration containment.",
    syllabus: [
      {
        week: "Week 1 - 3",
        title: "Data Exfiltration Channels & Mitigation",
        topics: ["DNS Tunneling & ICMP covert channels", "Encrypted SNI & TLS 1.3 Inspection", "Dynamic watermark steganography"]
      },
      {
        week: "Week 4 - 7",
        title: "Zero-Trust Network Access (ZTNA)",
        topics: ["BeyondCorp model implementation", "Continuous adaptive risk authentication", "Software-Defined Perimeters (SDP)"]
      },
      {
        week: "Week 8 - 11",
        title: "Threat Hunting & SIEM/SOAR Automation",
        topics: ["Wazuh & Elastic Security", "Automated playbooks for IP quarantine", "Memory forensics with Volatility"]
      },
      {
        week: "Week 12 - 14",
        title: "Red Team vs Blue Team War Games",
        topics: ["Simulated enterprise breach scenario", "Incident Response under pressure", "Post-mortem forensic report generation"]
      }
    ]
  }
];

export const UPCOMING_TRAININGS = [
  {
    id: "sess-101",
    courseId: "ngn-ai-301",
    title: "Live Lab: Real-time LLM Telemetry Stream Ingestion with Kafka & Rust",
    instructor: "Dr. Elena Rostova",
    date: "Today",
    time: "20:00 - 22:00 GMT+6",
    status: "Live in 45m",
    isLiveNow: true,
    platform: "jitsi",
    platformName: "Jitsi Meet (Free Open Source)",
    meetingUrl: "https://meet.jit.si/NGNTC-AI-301-KafkaRust-Lab",
    passcode: "NGNTC-2026",
    attendeesCount: 480
  },
  {
    id: "sess-102",
    courseId: "ngn-net-401",
    title: "Workshop: Building eBPF Packet Sniffers for 100Gbps Fabrics",
    instructor: "Engr. Marcus Vance",
    date: "Tomorrow",
    time: "19:00 - 21:30 GMT+6",
    status: "Scheduled",
    isLiveNow: false,
    platform: "gmeet",
    platformName: "Google Meet",
    meetingUrl: "https://meet.google.com/ngn-ebpf-fabric",
    passcode: "No passcode required",
    attendeesCount: 620
  },
  {
    id: "sess-103",
    courseId: "ngn-sys-501",
    title: "Deep Dive: Mitigating Split-Brain in Distributed etcd Clusters",
    instructor: "Sarah Jenkins",
    date: "Saturday",
    time: "15:00 - 17:30 GMT+6",
    status: "Scheduled",
    isLiveNow: false,
    platform: "teams",
    platformName: "Microsoft Teams",
    meetingUrl: "https://teams.microsoft.com/l/meetup-join/ngntc-etcd-splitbrain",
    passcode: "894 219",
    attendeesCount: 512
  }
];

export const VIDEO_LECTURES = [
  {
    id: "vid-1",
    title: "Module 4.2: Writing Custom P4 Match-Action Tables for VXLAN",
    course: "Next-Gen Software-Defined Networking & 5G/6G Core",
    duration: "48:15",
    resolution: "4K 60FPS (HLS Adaptive Stream)",
    uploadedAt: "Yesterday",
    views: 3410,
    completed: true,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
    chapters: [
      { time: "00:00", title: "Introduction & Packet Pipeline" },
      { time: "08:20", title: "V1Model Ingress Parsing Architecture" },
      { time: "18:45", title: "Defining Match-Action Keys in P4" },
      { time: "31:10", title: "Hardware Table Compilation Benchmark" },
      { time: "42:00", title: "Lab Verification & Q&A" }
    ]
  },
  {
    id: "vid-2",
    title: "Module 2.4: Training Deep Q-Networks for Dynamic BGP Path Routing",
    course: "Enterprise AI & Autonomous Network Intelligence",
    duration: "52:40",
    resolution: "1080p 60FPS",
    uploadedAt: "3 days ago",
    views: 4890,
    completed: true,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    chapters: [
      { time: "00:00", title: "Problem Formulation: Asymmetric Route Failures" },
      { time: "12:15", title: "Reward Function Design for Packet Loss & Jitter" },
      { time: "25:30", title: "Experience Replay Buffer Optimization" },
      { time: "44:00", title: "Live Simulation Comparison vs OSPF" }
    ]
  },
  {
    id: "vid-3",
    title: "Module 5.1: Zero-Trust SDP Controller Configuration with WireGuard",
    course: "Offensive Cyber Defense & Zero-Trust Architecture",
    duration: "41:30",
    resolution: "1080p 60FPS",
    uploadedAt: "5 days ago",
    views: 2950,
    completed: false,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    chapters: [
      { time: "00:00", title: "Why Traditional VPNs Fail Zero-Trust" },
      { time: "10:10", title: "Public Key Cryptography in WireGuard" },
      { time: "22:40", title: "Dynamic Ephemeral Access Tokens" },
      { time: "35:15", title: "Hardening Against Man-in-the-Middle" }
    ]
  }
];

export const EXAMS_LIST = [
  {
    id: "exam-net-cert",
    title: "NGNTC Certified Next-Gen Network Architect (NGN-CNA)",
    course: "NET-401",
    totalQuestions: 15,
    durationMinutes: 45,
    passingScore: 80,
    difficulty: "Advanced",
    dueDate: "2026-11-15",
    attemptsLeft: 2,
    status: "Available",
    questions: [
      {
        id: 1,
        question: "In P4 (Programming Protocol-Independent Packet Processors), which architectural stage handles packet cloning and recirculation before egress queuing?",
        options: [
          "Parser Engine",
          "Ingress Deparser",
          "Traffic Manager / Queuing Engine",
          "Egress Deparser"
        ],
        correct: 2,
        explanation: "The Traffic Manager (TM) sits between Ingress and Egress pipelines in the V1Model, performing buffering, queuing, replication, and packet cloning."
      },
      {
        id: 2,
        question: "To scale an enterprise training platform to 1,000,000 concurrent active users with sub-50ms latency, which database architecture pattern is critical?",
        options: [
          "Single monolithic relational database with maximum CPU allocation",
          "PgBouncer connection pooling with read-replica clusters and distributed Redis caching",
          "Writing all transactional data directly to flat CSV files on NFS",
          "Relying solely on client-side localStorage synchronization"
        ],
        correct: 1,
        explanation: "Connection pooling (PgBouncer), read-replicas for query offloading, and multi-tier Redis caching reduce database locks and allow millions of concurrent queries."
      },
      {
        id: 3,
        question: "What is the primary mechanism to protect proprietary training video streams from illegal redistribution and screen capture leaks?",
        options: [
          "Simply disabling the right-click mouse button in HTML",
          "Tokenized DRM signed URLs combined with dynamic student ID steganographic watermarking overlay",
          "Uploading all video files directly to an open public FTP folder",
          "Using HTTP Basic Authentication without encryption"
        ],
        correct: 1,
        explanation: "Short-lived signed tokens prevent unauthorized URL sharing, while dynamic client-tied watermarking deters physical and digital screen recording."
      },
      {
        id: 4,
        question: "In a Zero-Trust Network Architecture (ZTNA), what does the core tenet 'Never Trust, Always Verify' mandate?",
        options: [
          "Trust any device as long as it is connected via an office Ethernet cable",
          "Authenticate and authorize every transaction based on continuous device health, identity, and context, regardless of location",
          "Only ask for passwords once a year",
          "Grant blanket administrator rights once a user completes multi-factor auth"
        ],
        correct: 1,
        explanation: "Zero-Trust assumes the network is perpetually hostile; identity, device posture, and session context are verified continuously for every resource access."
      },
      {
        id: 5,
        question: "When deploying an automated database disaster recovery pipeline, what does RPO (Recovery Point Objective) measure?",
        options: [
          "The maximum acceptable amount of data loss measured in time between backup snapshots or WAL logs",
          "The total hours required to buy new server hardware",
          "The speed of network download cables",
          "The number of database tables present"
        ],
        correct: 0,
        explanation: "RPO specifies the maximum age of files or data transactions that must be recovered from backup storage for normal operations to resume without unacceptable loss."
      }
    ]
  },
  {
    id: "exam-ai-cert",
    title: "AI Telemetry & Autonomous Infrastructure Specialist (NGN-AIS)",
    course: "AI-301",
    totalQuestions: 20,
    durationMinutes: 60,
    passingScore: 85,
    difficulty: "Expert",
    dueDate: "2026-11-20",
    attemptsLeft: 3,
    status: "Upcoming"
  }
];

export const DOCUMENTS_VAULT = [
  {
    id: "doc-1",
    title: "5G Core Standalone Architecture & NFV Specification (v17.4)",
    type: "PDF",
    size: "14.8 MB",
    category: "Architecture Blueprint",
    course: "NET-401",
    downloads: 1240,
    security: "Encrypted AES-256",
    updatedAt: "2026-10-18"
  },
  {
    id: "doc-2",
    title: "High-Throughput eBPF/XDP Packet Filter Source Code & Lab Guide",
    type: "ZIP / C Code",
    size: "6.2 MB",
    category: "Hands-on Lab",
    course: "NET-401",
    downloads: 980,
    security: "Signature Verified",
    updatedAt: "2026-10-22"
  },
  {
    id: "doc-3",
    title: "PyTorch Model Weights: Predictive BGP Route Flap Classifier",
    type: "PT Model",
    size: "142 MB",
    category: "AI Model Checkpoint",
    course: "AI-301",
    downloads: 654,
    security: "Restricted Access",
    updatedAt: "2026-10-25"
  },
  {
    id: "doc-4",
    title: "Zero-Trust Infrastructure Hardening Guide & CIS Benchmark",
    type: "PDF",
    size: "8.4 MB",
    category: "Security Standard",
    course: "SEC-601",
    downloads: 2150,
    security: "Encrypted AES-256",
    updatedAt: "2026-10-27"
  },
  {
    id: "doc-5",
    title: "Kubernetes Production Manifests for 1M Concurrent Scale",
    type: "YAML / Tar",
    size: "3.1 MB",
    category: "DevOps / IaC",
    course: "SYS-501",
    downloads: 1890,
    security: "SHA-256 Checksum",
    updatedAt: "2026-10-29"
  }
];

export const NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Live Training Session Starting Soon",
    body: "Dr. Elena Rostova's session 'Real-time LLM Telemetry Stream Ingestion' begins in 45 minutes on Jitsi Meet.",
    time: "15m ago",
    type: "live",
    unread: true
  },
  {
    id: "notif-2",
    title: "Certification Exam Available",
    body: "You have completed 90% of NET-401! The NGN-CNA Certification Exam is now unlocked.",
    time: "2h ago",
    type: "exam",
    unread: true
  },
  {
    id: "notif-3",
    title: "Payment Receipt Confirmed",
    body: "Invoice #NGN-INV-2026-881 for Semester Course Track has been processed successfully via Secured Gateway.",
    time: "Yesterday",
    type: "payment",
    unread: false
  },
  {
    id: "notif-4",
    title: "Security Shield: Zero-Trust Session Renewed",
    body: "Your hardware device posture passed compliance audit. Zero-Trust security token rotated seamlessly.",
    time: "2 days ago",
    type: "security",
    unread: false
  }
];

export const SYSTEM_METRICS_1M_SCALE = {
  activeConcurrentUsers: 1042890,
  peakCapacityLimit: 2500000,
  avgResponseLatencyMs: 16.4,
  redisCacheHitRatio: "98.7%",
  edgeCdnBandwidthGbps: "418 Gbps",
  activeK8sPods: 842,
  databaseStatus: {
    primary: "Healthy (Read-Write 12% CPU)",
    replicas: 6,
    avgReplicaLagMs: "1.8ms",
    pgBouncerPoolUsage: "28%"
  },
  lastAutomatedBackup: "2026-10-30 04:00 UTC (S3 Offsite Encrypted AES-256)",
  backupSize: "48.2 GB (Compressed)",
  rpoStatus: "< 60 seconds (Continuous WAL Archiving)",
  rtoStatus: "< 12 minutes (Automated Kubernetes Failover)"
};
