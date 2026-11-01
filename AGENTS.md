# VIETTORIA — Frontend Rules & Anti-AI-Slop Architecture Guidelines

> **Project Mandate:** VIETTORIA tái hiện di sản kiến trúc Việt Nam dưới dạng mô hình in 3D tinh xảo kết hợp nền tảng 3D số hóa (Phygital Heritage Collectibles).
> Giao diện phải mang đẳng cấp **Heritage Atelier / Luxury Editorial**, tôn vinh giá trị thủ công và lịch sử, tuyệt đối không dùng mẫu giao diện AI đại trà.

---

## 1. Luật Cấm "AI Slop" & Định Hình Thẩm Mỹ

### ❌ CẤM TUYỆT ĐỐI CÁC AI TROPES:
1. **Không bo góc lớn:** Cấm `rounded-2xl`, `rounded-3xl`, `rounded-full` trên card và khối nội dung. Toàn bộ khối kiến trúc dùng **`rounded-none`** hoặc tối đa **`rounded-[2px]`** (mô phỏng đá phiến, mộng gỗ, khung tranh bảo tàng).
2. **Không màu AI:** Cấm tuyệt đối gradient tím/xanh neon (`indigo`, `purple`, `violet`, `cyan`), cấm hiệu ứng glassmorphism bóng bẩy công nghệ.
3. **Không font chữ AI:** Cấm dùng mặc định Inter/Roboto/Arial phẳng lì. Bắt buộc:
   - **Tiêu đề:** `Cinzel` hoặc `Playfair Display` (Serif cổ điển, uy nghiêm, vương triều).
   - **Nội dung:** `Be Vietnam Pro` (Bộ gõ Việt Nam tinh tế, chân thực).
4. **Không icon Emoji:** Không bao giờ dùng emoji (🚀, 🔥, 🏯) làm icon UI. Dùng SVG nét đơn 1.5px (Lucide).
5. **Không số liệu ảo:** Không bịa đặt chỉ số ("99.9% uy tín", "10x tốc độ"). Chỉ dùng thông số kiến trúc thật (tỷ lệ 1:120, chiều cao 12cm, năm 1049, v.v.).

---

## 2. Hệ Thống Màu Chất Liệu Thực (Tactile Palette)

- **Do Paper Warm Canvas:** `#FAF7F0` (Nền giấy dó ấm áp, nhã nhặn).
- **Imperial Lacquer & Moss:** `#142820` / `#0D1C16` (Xanh rêu cổ tự, sơn then trầm).
- **Antique Brass & Gold Leaf:** `#B88A44` / `#C49A45` (Vàng son thếp vàng, viền đồng cổ).
- **Chinese Ink Charcoal:** `#1B1E1B` (Chữ màu mực tàu sắc sảo).
- **Terracotta Brick:** `#9C3D28` (Đỏ ngói mũi hài, gạch vồ Thăng Long).

---

## 3. Kiến Trúc Kỹ Thuật
- Vite + React 18 + TypeScript (Strict mode).
- Tailwind CSS với bộ token ngữ nghĩa cấu hình riêng.
- Fallback 3 tầng cho 3D Viewer (Full GLB -> 360 Turntable Canvas -> Exploded 2.5D Blueprint).

