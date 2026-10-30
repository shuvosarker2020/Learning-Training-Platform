# Next Generation Network Training Centre (NGNTC) Mobile App
**Native iOS and Android Architecture with Offline Cache & Zero-Trust Sync**

## Key Capabilities
1. **Biometric Zero-Trust Authentication**: FaceID / Fingerprint unlock tied to hardware secure enclave.
2. **WebRTC Live Class Streamer**: Low-latency video classroom with live chat, hand-raising, and audio toggle.
3. **Encrypted Video Player**: HLS adaptive bitrate with dynamic student ID watermarking overlay to prevent mobile screen captures.
4. **Offline Course Materials**: Downloadable PDFs, slide decks, and lab manuals cached via SQLite / WatermelonDB with AES-256 local encryption.
5. **Push Notifications**: Instant push triggers via Google Firebase Cloud Messaging (FCM) and Apple Push Notification service (APNs) for live session reminders and exam releases.

## Getting Started
```bash
cd mobile-app
npm install
npm run android # or npm run ios
```
