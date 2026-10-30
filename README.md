# Next Generation Network Training Centre (NGNTC)
### Enterprise Learning & Training Platform for AI, 5G/6G Networks, Cloud Systems & Cyber Defense

![NGNTC Full Brand Logo](branding/ngntc-logo-full.svg)

---

## 🌟 What's New in this Release

1. **Student Signup & Automated Resource Allocation**:
   - Students can register with their name, email, and preferred track.
   - Generates unique student credentials (`NGN-XXXX-SEC`) and immediately provisions assigned GPU cloud sandboxes, virtual P4 switch appliances, lab manuals, and exam vouchers.
   - Dedicated **[Assigned Resources Dashboard](frontend/src/pages/AssignedResources.jsx)** with 1-click sandbox launch.

2. **Trainer / Instructor Signup & Profiling**:
   - Comprehensive faculty registration with academic credentials, industry certifications (CCIE, AWS SA Pro, CKS, PhD), specializations, ratings, and social links.
   - **[Trainer Studio](frontend/src/pages/TrainerStudio.jsx)**: Manage cohort student rosters, review progress, and schedule classes.

3. **How Students Join via Invitation Links**:
   - **[JoinLinkModal](frontend/src/components/JoinLinkModal.jsx)**: Students can paste or click an invite URL (e.g. `https://ngntc.edu/join?code=NGN-AI-2026-ALPHA`).
   - Instantly validates the cryptographic token and auto-enrolls the student into their cohort, unlocking all required resources.

4. **Free Open-Source & Multi-Platform Meeting Creator**:
   - Trainers can generate zero-cost meeting links using **Jitsi Meet (100% Free Open Source)** with zero account requirement, unlimited meeting duration, and HD screen share.
   - Also supports **Google Meet**, **Microsoft Teams**, **Zoom**, **Cisco Webex**, and **On-Demand streaming**.
   - Generates sharable student links, 1-click copy buttons, and automated alerts to enrolled batches.

5. **Website Multi-Theme Customizer**:
   - Switch between **4 custom themes** anytime with 1 click in the top navigation bar:
     - ⚡ **Cyber Dark (Default)**: Deep Obsidian & Electric Cyan
     - 🟢 **Matrix Terminal**: True Black & Emerald Hacker Mode
     - 🟣 **Neural Violet**: Deep Space Violet for AI & Neural modeling
     - ☀️ **Enterprise Light**: Clean White/Slate for corporate boardroom presentations

---

## 🏗️ Platform Feature Matrix

| Feature | Implementation | Capabilities |
| :--- | :--- | :--- |
| **Student Signup & Resources** | [`AssignedResources.jsx`](frontend/src/pages/AssignedResources.jsx) | Dedicated sandboxes, BMv2 switch emulators, exam vouchers, live sessions. |
| **Trainer Profiling & Studio** | [`TrainerStudio.jsx`](frontend/src/pages/TrainerStudio.jsx) | Bio, credentials (CCIE, PhD), ratings, batch rosters, class creator. |
| **Join Link Flow** | [`JoinLinkModal.jsx`](frontend/src/components/JoinLinkModal.jsx) | Cryptographic invite tokens with 1-click auto-enrollment. |
| **Free Meeting Generator** | Jitsi Meet, Google Meet, Teams, WebEx, Zoom | Free open-source rooms (`meet.jit.si`) or enterprise video conferencing. |
| **Multi-Theme Switcher** | [`Navbar.jsx`](frontend/src/components/Navbar.jsx) & [`index.css`](frontend/src/index.css) | Cyber Dark, Matrix Terminal, Neural Violet, Enterprise Light. |
| **Live Training Streamer** | [`LiveClass.jsx`](frontend/src/pages/LiveClass.jsx) | WebRTC live stream player, live Q&A chat, collaborative code editor. |
| **Class Video Share** | [`VideoLectures.jsx`](frontend/src/pages/VideoLectures.jsx) | HLS player with **Dynamic Student ID Watermarking** to stop leaks. |
| **Timed Exam Engine** | [`ExamPortal.jsx`](frontend/src/pages/ExamPortal.jsx) | 45-min timer, question navigator, auto-grading, verifiable certificates. |
| **Payment Options** | [`Payments.jsx`](frontend/src/pages/Payments.jsx) | Credit/Debit (Stripe), MFS (bKash/Nagad), PayPal, Corporate PO. |
| **Separate Database** | Multi-Tenant Isolated DB Instances | Primary Master (Writes) + 6 Read-Replicas + PgBouncer (50k conns). |
| **Backup Process** | Automated Daily Encrypted Snapshots | Zstd level 9, AES-256-GCM, off-site geo-replicated S3 cold storage. |
| **1M Concurrent Scale** | Distributed Cloud-Native Infrastructure | Kubernetes HPA (up to 1,000 pods), Redis Cluster L1/L2, Anycast CDN. |

---

## 🚀 Running the Platform

### Start Web Application (Frontend)
```bash
cd frontend
npm install
npm run dev
# Running at http://localhost:3000
```

### Start Backend API Service
```bash
cd backend
npm install
npm run dev
# Running at http://localhost:5000
```

---
© 2026 Next Generation Network Training Centre (NGNTC). All Rights Reserved.
