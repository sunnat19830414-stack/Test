import { useState } from 'react';
import useCatalogStore from '../store/catalogStore';
import ProductForm from './ProductForm';

export default function ProductList() {
  const { products, deleteProduct, categories, selectedCategory, setSelectedCategory, importProducts } = useCatalogStore();
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const filtered = selectedCategory === 'all' ? products : products.filter((p) => p.category === selectedCategory);

  const handleEdit = (p) => { setEditProduct(p); setShowForm(true); };
  const handleClose = () => { setShowForm(false); setEditProduct(null); };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const lines = ev.target.result.split('\n').filter(Boolean);
      const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
      const imported = lines.slice(1).map((line, i) => {
        const vals = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
        const obj = { id: Date.now().toString() + i, specs: [], imageUrl: '', badge: '' };
        headers.forEach((h, idx) => { obj[h] = vals[idx] || ''; });
        return obj;
      });
      importProducts(imported);
    };
    reader.readAsText(file);
  };

  return (
    <div className="product-list-panel">
      <div className="panel-header">
        <h2>Товары <span className="count-badge">{products.length}</span></h2>
        <div className="panel-actions">
          <label className="btn-outline small" title="Импорт CSV">
            📥 CSV
            <input type="file" accept=".csv" onChange={handleImportCSV} style={{ display: 'none' }} />
          </label>
          <button className="btn-primary small" onClick={() => setShowForm(true)}>+ Добавить</button>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="category-tabs">
          <button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => setSelectedCategory('all')}>Все</button>
          {categories.map((c) => (
            <button key={c} className={selectedCategory === c ? 'active' : ''} onClick={() => setSelectedCategory(c)}>{c}</button>
          ))}
        </div>
      )}

      <div className="products-scroll">
        {filtered.length === 0 ? (
          <div className="list-empty">
            <span>📦</span>
            <p>Нет товаров{selectedCategory !== 'all' ? ' в этой категории' : ''}</p>
            <button className="btn-outline small" onClick={() => setShowForm(true)}>Добавить первый товар</button>
          </div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="product-row">
              {p.imageUrl ? (
                <img src={p.imageUrl} alt={p.name} className="row-thumb" />
              ) : (
                <div className="row-thumb-placeholder">📦</div>
              )}
              <div className="row-info">
                <div className="row-name">{p.name}</div>
                <div className="row-meta">
                  {p.sku && <span>{p.sku}</span>}
                  {p.category && <span className="cat-tag">{p.category}</span>}
                  {p.price && <span className="price-tag">{p.price}</span>}
                </div>
              </div>
              <div className="row-actions">
                <button className="btn-icon" onClick={() => handleEdit(p)} title="Редактировать">✏️</button>
                <button className="btn-icon danger" onClick={() => deleteProduct(p.id)} title="Удалить">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && <ProductForm product={editProduct} onClose={handleClose} />}
    </div>
  );
}
