import { useState, useEffect } from 'react';
import Topbar from './components/Topbar';
import ProductList from './components/ProductList';
import DesignPanel from './components/DesignPanel';
import CatalogPreview from './components/CatalogPreview';
import useCatalogStore from './store/catalogStore';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('products');
  const { design } = useCatalogStore();

  useEffect(() => {
    const fonts = [...new Set([design.headingFont, design.bodyFont])];
    fonts.forEach((font) => {
      const id = 'gf-' + font.replace(/\s+/g, '-');
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700&display=swap`;
        document.head.appendChild(link);
      }
    });
  }, [design.headingFont, design.bodyFont]);

  return (
    <div className="app">
      <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-body">
        {activeTab === 'products' && (
          <div className="split-view">
            <div className="left-panel">
              <ProductList />
            </div>
            <div className="right-panel preview-bg">
              <CatalogPreview />
            </div>
          </div>
        )}
        {activeTab === 'design' && (
          <div className="split-view">
            <div className="left-panel scrollable">
              <DesignPanel />
            </div>
            <div className="right-panel preview-bg">
              <CatalogPreview />
            </div>
          </div>
        )}
        {activeTab === 'preview' && (
          <div className="preview-full preview-bg">
            <CatalogPreview />
          </div>
        )}
      </div>
    </div>
  );
}
