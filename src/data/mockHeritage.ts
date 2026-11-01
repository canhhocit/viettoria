import type { HeritageSKU } from '../types/heritage';

export const HERITAGE_COLLECTION: HeritageSKU[] = [
  {
    id: 'chua-mot-cot',
    code: 'VT-HN-001',
    name: 'Chùa Một Cột',
    subName: 'Liên Hoa Đài — Diên Hựu Tự',
    epoch: 'Thời Lý (Năm 1049)',
    location: 'Ba Đình, Hà Nội',
    significance: 'Đóa sen ngàn năm ngự giữa lòng hồ Linh Chiểu, đỉnh cao triết lý Phật giáo và mộng gỗ Việt.',
    price: 675000,
    scale: '1:120',
    heightCm: 12,
    widthCm: 10,
    weightGrams: 185,
    material: 'Nhựa kỹ thuật sinh thái PETG (Food-grade, không độc hại, bền 15+ năm)',
    finishing: 'Phủ bóng mờ sáp ong, gờ ngói cổ chạm nổi, giả lập chất gỗ lim già',
    partsCount: 24,
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    ],
    explodedLayers: [
      {
        layerIndex: 1,
        title: 'Tầng 1: Hồ Sen Linh Chiểu & Trụ Đá Độc Tôn',
        description: 'Trụ đá đường kính 1.2m nguyên bản thời Lý, chân đế vuông vức mượn ý niệm Trời tròn - Đất vuông.',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
      },
      {
        layerIndex: 2,
        title: 'Tầng 2: Hệ Đòn Kèo & 8 Thanh Consol Bung Nở',
        description: 'Hệ consol xòe ra như 8 cánh sen nâng đỡ toàn bộ lầu Phật bằng liên kết mộng gỗ không keo dính.',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
      },
      {
        layerIndex: 3,
        title: 'Tầng 3: Liên Hoa Đài & Mái Ngói Mũi Hài Bay Bổng',
        description: '4 góc mái đao cong vút thanh thoát, bờ nóc đắp phù điêu lưỡng long chầu nguyệt tinh xảo.',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
      }
    ],
    overview: 'Chùa Một Cột (Diên Hựu Tự) được xây dựng vào mùa đông năm Kỷ Sửu (1049) dưới thời vua Lý Thái Tông. Tương truyền, vua chiêm bao thấy Phật Bà Quan Âm ngồi trên tòa sen dắt vua lên tòa. Khi tỉnh dậy, vua cho dựng chùa với trụ đá vươn lên giữa hồ Linh Chiểu như bông sen nghìn năm tỏa hương.',
    historySummary: 'Trải qua gần một thiên niên kỷ thăng trầm lịch sử, chùa Một Cột đã trở thành một trong những biểu tượng trường tồn nhất của Thăng Long ngàn năm văn vật. Bản mô hình thu nhỏ Viettoria tái hiện chuẩn xác tỷ lệ kiến trúc được đo đạc tỉ mỉ.',
    architecturalStory: 'Kết cấu kiến trúc độc nhất vô nhị trên thế giới: Toàn bộ ngôi chùa tựa trên một cột đá duy nhất. Hệ thống rường cột, xà nách và đòn tay được các nghệ nhân Viettoria module hóa thành 24 chi tiết mộng ăn khớp chính xác tới từng milimet.',
    hotspots: [
      {
        id: 'hs-roof',
        title: 'Mái Đao Uốn Cong',
        subtitle: 'Góc mái vút nhẹ mô phỏng cánh hoa sen nở',
        description: 'Đặc trưng kiến trúc thời Lý với độ võng mềm mại, ngói mũi hài xếp so le thoát nước tối ưu.',
        category: 'roof',
        coordinate: { x: 0, y: 1.8, z: 0 }
      },
      {
        id: 'hs-bracket',
        title: '8 Thanh Consol Gỗ Lim',
        subtitle: 'Hệ mộng đỡ chịu lực bung tỏa',
        description: '8 thanh gỗ lớn vươn ra từ đỉnh cột đá, đỡ sàn gỗ vững chãi mà không cần thêm bất kỳ trụ phụ nào.',
        category: 'bracket',
        coordinate: { x: 0, y: 0.9, z: 0 }
      },
      {
        id: 'hs-column',
        title: 'Cột Đá Trụ Tròn Đơn Nhất',
        subtitle: 'Đường kính tỷ lệ chuẩn 1:120',
        description: 'Mô phỏng 2 khối đá ghép liền mạch, bề mặt được mài mịn gợi nhớ kỹ thuật ghép đá Thăng Long thế kỷ 11.',
        category: 'column',
        coordinate: { x: 0, y: 0, z: 0 }
      },
      {
        id: 'hs-pond',
        title: 'Hồ Sen Linh Chiểu',
        subtitle: 'Bể nước vuông vức tượng trưng Đất mẹ',
        description: 'Thành bể bao quanh với lan can đá thấp, tạo điểm tựa thị giác cho đài sen thanh cao nở ở trung tâm.',
        category: 'foundation',
        coordinate: { x: 0, y: -0.8, z: 0 }
      }
    ],
    assemblyGuide: [
      {
        step: 1,
        title: 'Hồ Vuông & Khối Trụ Đá',
        nameVi: 'Khởi trụ liên hoa',
        description: 'Đặt đế hồ sen lên mặt phẳng, lắp khối cột đá đôi vào khớp rãnh trung tâm.',
        detail: 'Khớp khóa trục chống xoay 360 độ đảm bảo trụ thẳng đứng tuyệt đối.',
        highlight: 'Khối đế vững chãi'
      },
      {
        step: 2,
        title: 'Lắp 8 Cánh Tay Đòn Consol',
        nameVi: 'Bung cánh đòn gánh',
        description: 'Gài lần lượt 8 đòn tay gỗ vào các ngàm âm dương trên đỉnh trụ đá.',
        detail: 'Cảm nhận tiếng "tách" êm tai khi mộng khít vừa vặn không cần keo dán.',
        highlight: 'Mộng khóa âm dương'
      },
      {
        step: 3,
        title: 'Đặt Lầu Phật & Hệ Vách',
        nameVi: 'An vị Liên Hoa Đài',
        description: 'Hạ nhẹ nhàng gian thờ gỗ vuông vức lên mặt bằng hệ consol đỡ.',
        detail: 'Mặt trước có cửa mở nhìn vào tượng Quan Âm Bồ Tát ngự tọa.',
        highlight: 'Điện thờ trang nghiêm'
      },
      {
        step: 4,
        title: 'Úp Mái Đao Hoàng Triều',
        nameVi: 'Viên mãn đỉnh sen',
        description: 'Đặt khối mái ngói đao cong lên 4 cột góc của lầu Phật.',
        detail: 'Hoàn thiện tác phẩm mô hình di sản thu nhỏ kiêu hãnh trên lòng bàn tay bạn.',
        highlight: 'Đóa sen trọn vẹn'
      }
    ],
    audioGuide: {
      title: 'Hào Khí Thăng Long & Giấc Mơ Đài Sen',
      narrator: 'Nghệ nhân Thuyết minh Viettoria (Giọng Hà Nội truyền cảm)',
      durationSeconds: 195,
      transcript: 'Mùa đông năm 1049, kinh thành Thăng Long sương sớm bảng lảng. Vua Lý Thái Tông mộng thấy Phật Bà ngự trên tòa sen dắt vua bước lên. Sáng ra, triều thần bàn việc lập chùa Diên Hựu giữa lòng hồ sen bát ngát, cầu chúc cho xã tắc trường thọ thái bình...'
    },
    provenance: {
      edition: 'Ấn Bản Khởi Nguyên (Alpha Pilot 2026)',
      certificationNumber: 'VT-HN-001/2026-PSI',
      materialGrade: 'Eco-grade BioPETG Certified',
      releaseDate: '10/2026'
    }
  },
  {
    id: 'khue-van-cac',
    code: 'VT-HN-002',
    name: 'Khuê Văn Các',
    subName: 'Gác Sao Khuê — Văn Miếu Quốc Tử Giám',
    epoch: 'Thời Nguyễn (Năm 1805)',
    location: 'Đống Đa, Hà Nội',
    significance: 'Biểu tượng đỉnh cao của nền văn hiến và tinh thần hiếu học Thăng Long - Hà Nội.',
    price: 675000,
    scale: '1:120',
    heightCm: 13,
    widthCm: 11,
    weightGrams: 210,
    material: 'Nhựa sinh thái PETG kết hợp chi tiết thếp vàng đồng',
    finishing: 'Sơn son thếp vàng thủ công viền cửa tròn sao Khuê, mái ngói giả cổ',
    partsCount: 28,
    heroImage: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=800&q=80'
    ],
    explodedLayers: [],
    overview: 'Khuê Văn Các được Tổng trấn Nguyễn Văn Thành cho dựng năm 1805 tại Văn Miếu - Quốc Tử Giám. Gác gồm hai tầng: tầng dưới là 4 cột đá vuông vức biểu trưng cho Đất, tầng trên bằng gỗ với các cửa sổ tròn tỏa tia sáng biểu trưng cho Sao Khuê và Bầu Trời.',
    historySummary: 'Biểu tượng chính thức của Thủ đô Hà Nội, tôn vinh tinh hoa đạo học và truyền thống tôn sư trọng đạo.',
    architecturalStory: 'Kết cấu "Trời tròn Đất vuông" chuẩn mực triết học phương Đông với tám mái chồng diêm thanh thoát.',
    hotspots: [
      {
        id: 'hs-window',
        title: 'Cửa Sổ Tròn Sao Khuê',
        subtitle: 'Tia sáng tri thức tỏa chiếu',
        description: 'Các nan gỗ tỏa ra bốn phương tám hướng tựa như vầng sao Khuê chiếu rọi giếng Thiên Quang.',
        category: 'bracket'
      }
    ],
    assemblyGuide: [],
    audioGuide: {
      title: 'Sao Khuê Tỏa Sáng Đất Tràng An',
      narrator: 'Thuyết minh Viettoria',
      durationSeconds: 180,
      transcript: 'Khuê Văn Các soi bóng xuống giếng Thiên Quang phẳng lặng như gương soi lòng kẻ sĩ...'
    },
    provenance: {
      edition: 'Ấn Bản Sưu Tầm',
      certificationNumber: 'VT-HN-002/2026-PSI',
      materialGrade: 'Eco-grade BioPETG Certified',
      releaseDate: '11/2026'
    }
  },
  {
    id: 'cot-co-ha-noi',
    code: 'VT-HN-003',
    name: 'Cột Cờ Hà Nội',
    subName: 'Kỳ Đài Thăng Long',
    epoch: 'Thời Nguyễn (Năm 1812)',
    location: 'Hoàng Diệu, Hà Nội',
    significance: 'Chứng nhân lịch sử kiên cường qua hai cuộc kháng chiến, biểu tượng tự hào dân tộc.',
    price: 675000,
    scale: '1:150',
    heightCm: 16,
    widthCm: 12,
    weightGrams: 230,
    material: 'Nhựa sinh thái PETG vân gạch cổ',
    finishing: 'Màu gạch vồ Thăng Long, 39 lỗ hoa thị đón sáng tinh tế',
    partsCount: 18,
    heroImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [],
    explodedLayers: [],
    overview: 'Kỳ đài Hà Nội được xây dựng dưới thời vua Gia Long, gồm ba tầng đế hình chóp cụt vuông xếp chồng và thân cột bát giác cao vút.',
    historySummary: 'Một trong số ít những công trình còn nguyên vẹn trong khuôn viên Hoàng thành Thăng Long sau bao biến thiên thời gian.',
    architecturalStory: 'Kiến trúc phòng thủ và quan sát hoàn hảo với cầu thang xoắn 54 bậc dẫn lên đỉnh kỳ đài.',
    hotspots: [],
    assemblyGuide: [],
    audioGuide: {
      title: 'Hào Khí Kỳ Đài Thăng Long',
      narrator: 'Thuyết minh Viettoria',
      durationSeconds: 165,
      transcript: 'Ngọn cờ đỏ sao vàng tung bay trên đỉnh Cột Cờ Hà Nội trong ngày giải phóng Thủ đô 10/10/1954...'
    },
    provenance: {
      edition: 'Ấn Bản Sưu Tầm',
      certificationNumber: 'VT-HN-003/2026-PSI',
      materialGrade: 'Eco-grade BioPETG Certified',
      releaseDate: '12/2026'
    }
  },
  {
    id: 'ngo-mon-hue',
    code: 'VT-HUE-004',
    name: 'Ngọ Môn Huế',
    subName: 'Cổng Chính Hoàng Thành Cố Đô',
    epoch: 'Thời Nguyễn (Năm 1833)',
    location: 'Thành phố Huế',
    significance: 'Đỉnh cao nghệ thuật kiến trúc cung đình triều Nguyễn với Lầu Ngũ Phụng tráng lệ.',
    price: 675000,
    scale: '1:200',
    heightCm: 11,
    widthCm: 18,
    weightGrams: 260,
    material: 'Nhựa sinh thái PETG sơn thủ công',
    finishing: 'Ngói hoàng lưu ly vàng rực rỡ và ngói thanh lưu ly xanh biếc',
    partsCount: 32,
    heroImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [],
    explodedLayers: [],
    overview: 'Cổng chính phía nam của Hoàng thành Huế, nơi diễn ra các lễ tiết trọng đại của triều đình và là nơi vua Bảo Đại thoái vị năm 1945.',
    historySummary: 'Di sản thế giới được UNESCO công nhận, mang đậm chất thơ và sự tôn nghiêm của xứ Huế.',
    architecturalStory: 'Hệ mái lầu Ngũ Phụng chia làm hai tầng với 100 cây cột lim tượng trưng cho bách gia trăm họ.',
    hotspots: [],
    assemblyGuide: [],
    audioGuide: {
      title: 'Âm Sắc Cung Đình Bên Dòng Hương Giang',
      narrator: 'Thuyết minh Cố Đô Viettoria',
      durationSeconds: 210,
      transcript: 'Ngọ Môn trông về hướng nam theo dịch lý, nơi ánh mặt trời rực rỡ nhất soi bóng lầu Ngũ Phụng...'
    },
    provenance: {
      edition: 'Ấn Bản Sưu Tầm',
      certificationNumber: 'VT-HUE-004/2026-PSI',
      materialGrade: 'Eco-grade BioPETG Certified',
      releaseDate: '01/2027'
    }
  },
  {
    id: 'ben-nha-rong',
    code: 'VT-SG-005',
    name: 'Bến Nhà Rồng',
    subName: 'Bảo Tàng Hồ Chí Minh — Cảng Sài Gòn',
    epoch: 'Thời Cận Đại (Năm 1863)',
    location: 'Quận 4, TP. Hồ Chí Minh',
    significance: 'Nơi người thanh niên Nguyễn Tất Thành bước chân ra đi tìm đường cứu nước năm 1911.',
    price: 675000,
    scale: '1:180',
    heightCm: 12,
    widthCm: 16,
    weightGrams: 220,
    material: 'Nhựa sinh thái PETG mộc',
    finishing: 'Màu gạch cổ thuộc địa Pháp, đôi rồng gốm men xanh chầu trăng trên nóc nhà',
    partsCount: 22,
    heroImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [],
    explodedLayers: [],
    overview: 'Trụ sở của hãng Vận tải Đường biển Pháp xây dựng năm 1863 với đôi rồng ngậm ngọc trên nóc, ghi dấu mốc lịch sử vĩ đại của dân tộc.',
    historySummary: 'Điểm khởi đầu của hành trình 30 năm bôn ba giải phóng non sông của Chủ tịch Hồ Chí Minh.',
    architecturalStory: 'Giao thoa giữa kiến trúc Tân cổ điển Pháp với họa tiết mái vòm truyền thống Á Đông.',
    hotspots: [],
    assemblyGuide: [],
    audioGuide: {
      title: 'Khúc Tráng Ca Trên Bến Cảng Sài Gòn',
      narrator: 'Thuyết minh Viettoria',
      durationSeconds: 190,
      transcript: 'Ngày 5 tháng 6 năm 1911, con tàu Amiral Latouche-Tréville rời bến Nhà Rồng chở theo hoài bão cứu nước của người thanh niên 21 tuổi...'
    },
    provenance: {
      edition: 'Ấn Bản Sưu Tầm',
      certificationNumber: 'VT-SG-005/2026-PSI',
      materialGrade: 'Eco-grade BioPETG Certified',
      releaseDate: '02/2027'
    }
  }
];

export const MOCK_USER_SCAN = {
  scanCode: 'VT-HN-001',
  scanLocation: 'Hà Nội, Việt Nam',
  globalPoints: [
    { country: 'Việt Nam', city: 'Hà Nội', count: 420 },
    { country: 'Việt Nam', city: 'TP. Hồ Chí Minh', count: 310 },
    { country: 'Nhật Bản', city: 'Tokyo', count: 85 },
    { country: 'Hoa Kỳ', city: 'California', count: 64 },
    { country: 'Pháp', city: 'Paris', count: 42 },
    { country: 'Úc', city: 'Melbourne', count: 38 },
  ]
};
