import { exportToPDF, exportToHTML } from '../utils/pdf';
import useCatalogStore from '../store/catalogStore';

export default function Topbar({ activeTab, setActiveTab }) {
  const { products } = useCatalogStore();

  return (
    <header className="topbar">
      <div className="topbar-logo">
        <span className="logo-icon">📚</span>
        <span className="logo-text">КаталогПро</span>
      </div>

      <nav className="topbar-tabs">
        {[
          ['products', '📦 Товары'],
          ['design', '🎨 Дизайн'],
          ['preview', '👁 Просмотр'],
        ].map(([id, label]) => (
          <button
            key={id}
            className={`tab-btn ${activeTab === id ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="topbar-actions">
        <span className="products-count">{products.length} товаров</span>
        <button className="btn-outline" onClick={exportToHTML}>HTML</button>
        <button className="btn-primary" onClick={() => exportToPDF()}>📄 PDF</button>
      </div>
    </header>
  );
}
