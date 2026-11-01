# VIETTORIA — Phygital Heritage Collectibles

> Tái hiện di sản kiến trúc Việt Nam dưới dạng mô hình in 3D tinh xảo kết hợp nền tảng số hóa 3D tương tác đa giác quan.  
> **Dự án:** Sáng tạo - Khởi nghiệp Phenikaa năm 2026 (PSI 2026)  
> **Khẩu hiệu:** *"Khắc dạ nhớ nguồn — Đưa sử Việt vươn xa"*

---

## 🏛️ Giới Thiệu Dự Án

VIETTORIA thu hẹp khoảng cách giữa các bảo vật kiến trúc ngàn năm và thế hệ trẻ/du khách hiện đại thông qua phương thức **Phygital (Physical + Digital)**:
- **Hiện vật vật lý:** Mô hình kiến trúc thu nhỏ (tỷ lệ 1:120, cao 10–15cm) in 3D bằng vật liệu sinh thái PETG an toàn, kết cấu mộng gỗ tháo lắp âm dương không dùng keo dán.
- **Trải nghiệm số tương tác:** Quét mã QR độc bản trên đế mô hình để mở khóa Bản sao số, thuyết minh âm thanh đa ngôn ngữ, cẩm nang kiến trúc và cẩm nang bảo quản hiện vật.

### Danh Mục Ngũ Đại Di Sản (MVP Series)
1. **Chùa Một Cột (Hà Nội)** — Mã: `VT-HN-001` (Năm 1049, Thời Lý) — *Hero Collectible*
2. **Khuê Văn Các (Hà Nội)** — Mã: `VT-HN-002` (Năm 1805, Thời Nguyễn)
3. **Cột Cờ Hà Nội** — Mã: `VT-HN-003` (Năm 1812, Kỳ đài Thăng Long)
4. **Ngọ Môn Huế** — Mã: `VT-HUE-004` (Năm 1833, Cố đô Huế)
5. **Bến Nhà Rồng (TP.HCM)** — Mã: `VT-SG-005` (Năm 1863, Cảng Sài Gòn)

---

## 💻 Cấu Trúc Mã Nguồn

```text
viettoria-FE/
├── .agents/                    # Bộ quy tắc thẩm mỹ và kỹ năng UI/UX (Được bỏ qua qua .gitignore)
├── public/                     # Tài nguyên tĩnh (ảnh WebP di sản, video ambient, favicon)
├── src/
│   ├── components/             # Header, Footer, Hero, Assembly, Map, QR Experience
│   ├── data/                   # Mock data kiến trúc chuẩn xác
│   ├── types/                  # TypeScript strict interfaces
│   ├── App.tsx                 # Root application component
│   └── index.css               # Token màu di sản & hiệu ứng giấy Dó
├── AGENTS.md                   # Kim chỉ nam kiến trúc giao diện di sản & Anti-AI-Slop
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Khởi Chạy Nhanh

```bash
# Cài đặt dependencies
npm install

# Chạy máy chủ dev
npm run dev

# Build kiểm tra kiểu và đóng gói
npm run build
```

Truy cập cục bộ: `http://localhost:5173`

---

## 🎨 Chuẩn Mực Thiết Kế (Anti-AI-Slop Standards)
- **Hình khối:** Góc vuông sắc sảo (`rounded-none` / `rounded-sm`), viền tranh bảo tàng (Passe-partout matting).
- **Màu sắc:** Nền Giấy Dó Ấm (`#FAF7F0`), Rêu Phong Cổ Tự (`#142820`), Thếp Vàng Đồng Cổ (`#B88A44`), Mực Tàu (`#1B1E1B`), Ngói Đỏ Gạch Vồ (`#9C3D28`).
- **Typography:** Tiêu đề `Cinzel` / `Playfair Display`, nội dung chuẩn bộ gõ Việt `Be Vietnam Pro`.
