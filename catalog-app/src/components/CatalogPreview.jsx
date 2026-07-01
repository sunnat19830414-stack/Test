import useCatalogStore from '../store/catalogStore';
import ProductCard from './ProductCard';

export default function CatalogPreview() {
  const { products, design, selectedCategory } = useCatalogStore();

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const { backgroundColor, primaryColor, secondaryColor, textColor, mutedColor, headingFont, bodyFont, columns, catalogTitle, catalogSubtitle, companyName, logoUrl, coverImage, borderRadius } = design;

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: 24,
    padding: '24px 32px',
  };

  return (
    <div
      id="catalog-preview"
      style={{ backgroundColor, color: textColor, fontFamily: bodyFont + ', sans-serif', minHeight: '100%' }}
    >
      {/* Cover */}
      <div
        className="catalog-cover"
        style={{
          background: coverImage
            ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${coverImage}) center/cover`
            : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          color: '#fff',
          padding: '60px 48px',
          borderRadius: borderRadius,
          margin: '0 0 0 0',
        }}
      >
        {logoUrl && <img src={logoUrl} alt="logo" style={{ height: 64, marginBottom: 24, borderRadius: 8 }} />}
        <div className="cover-company" style={{ opacity: 0.85, fontFamily: bodyFont + ', sans-serif', fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
          {companyName}
        </div>
        <h1 className="cover-title" style={{ fontFamily: headingFont + ', sans-serif', fontSize: 42, fontWeight: 700, margin: '0 0 8px' }}>
          {catalogTitle}
        </h1>
        <div style={{ opacity: 0.8, fontSize: 18 }}>{catalogSubtitle}</div>
      </div>

      {/* Products */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 64 }}>📦</div>
          <h3 style={{ color: mutedColor }}>Добавьте товары для предпросмотра</h3>
          <p style={{ color: mutedColor }}>Используйте кнопку «Добавить товар» слева</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} design={design} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="catalog-footer"
        style={{ background: primaryColor, color: '#fff', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}
      >
        <span>{companyName}</span>
        <span>{catalogTitle} · {catalogSubtitle}</span>
        <span style={{ opacity: 0.7 }}>Страница 1</span>
      </div>
    </div>
  );
}
