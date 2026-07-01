import { create } from 'zustand';

const defaultDesign = {
  templateId: 'modern',
  primaryColor: '#2563eb',
  secondaryColor: '#1e40af',
  accentColor: '#f59e0b',
  backgroundColor: '#ffffff',
  cardBackground: '#f8fafc',
  textColor: '#1e293b',
  mutedColor: '#64748b',
  headingFont: 'Inter',
  bodyFont: 'Inter',
  fontSize: 14,
  borderRadius: 12,
  columns: 3,
  showPrices: true,
  showSKU: true,
  showDescription: true,
  showSpecs: true,
  companyName: 'Моя Компания',
  catalogTitle: 'Каталог товаров',
  catalogSubtitle: '2024',
  logoUrl: null,
  coverImage: null,
};

const useCatalogStore = create((set) => ({
  products: [],
  design: defaultDesign,
  categories: [],
  selectedCategory: 'all',

  addProduct: (product) =>
    set((s) => ({ products: [...s.products, { ...product, id: Date.now().toString() }] })),

  updateProduct: (id, data) =>
    set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...data } : p)) })),

  deleteProduct: (id) =>
    set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

  reorderProducts: (products) => set({ products }),

  updateDesign: (data) => set((s) => ({ design: { ...s.design, ...data } })),

  addCategory: (cat) =>
    set((s) => ({ categories: [...s.categories.filter((c) => c !== cat), cat] })),

  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  importProducts: (products) => set({ products }),

  resetDesign: () => set({ design: defaultDesign }),
}));

export default useCatalogStore;
