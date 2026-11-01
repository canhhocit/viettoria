export interface ArchitecturalHotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'roof' | 'column' | 'foundation' | 'bracket' | 'history';
  coordinate?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface AssemblyStep {
  step: number;
  title: string;
  nameVi: string;
  description: string;
  detail: string;
  highlight: string;
}

export interface HeritageSKU {
  id: string;
  code: string; // e.g. "VT-HN-001"
  name: string;
  subName: string;
  epoch: string; // e.g. "Thời Lý (1049)"
  location: string;
  significance: string;
  price: number;
  scale: string; // "1:120"
  heightCm: number;
  widthCm: number;
  weightGrams: number;
  material: string;
  finishing: string;
  partsCount: number;
  heroImage: string;
  galleryImages: string[];
  explodedLayers: {
    layerIndex: number;
    title: string;
    description: string;
    image: string;
  }[];
  overview: string;
  historySummary: string;
  architecturalStory: string;
  hotspots: ArchitecturalHotspot[];
  assemblyGuide: AssemblyStep[];
  audioGuide: {
    title: string;
    narrator: string;
    durationSeconds: number;
    transcript: string;
  };
  provenance: {
    edition: string;
    certificationNumber: string;
    materialGrade: string;
    releaseDate: string;
  };
}
