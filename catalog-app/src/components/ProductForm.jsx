import { useState } from 'react';
import useCatalogStore from '../store/catalogStore';

const emptyProduct = {
  name: '',
  sku: '',
  category: '',
  price: '',
  oldPrice: '',
  description: '',
  specs: [{ key: '', value: '' }],
  imageUrl: '',
  badge: '',
};

export default function ProductForm({ product, onClose }) {
  const [form, setForm] = useState(product ? { ...product } : { ...emptyProduct });
  const { addProduct, updateProduct, addCategory } = useCatalogStore();

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const setSpec = (i, field, val) => {
    const specs = [...form.specs];
    specs[i] = { ...specs[i], [field]: val };
    set('specs', specs);
  };

  const addSpec = () => set('specs', [...form.specs, { key: '', value: '' }]);
  const removeSpec = (i) => set('specs', form.specs.filter((_, idx) => idx !== i));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('imageUrl', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedSpecs = form.specs.filter((s) => s.key.trim());
    const data = { ...form, specs: cleanedSpecs };
    if (form.category) addCategory(form.category);
    if (product) {
      updateProduct(product.id, data);
    } else {
      addProduct(data);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>{product ? 'Редактировать товар' : 'Добавить товар'}</h2>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-group full">
              <label>Фото товара</label>
              <div className="image-upload">
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="" className="image-preview" />
                )}
                <input type="file" accept="image/*" onChange={handleImage} />
                {!form.imageUrl && <span className="upload-hint">Нажмите или перетащите фото</span>}
              </div>
            </div>

            <div className="form-group full">
              <label>Название товара *</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Название товара" />
            </div>

            <div className="form-group">
              <label>Артикул / SKU</label>
              <input value={form.sku} onChange={(e) => set('sku', e.target.value)} placeholder="SKU-001" />
            </div>

            <div className="form-group">
              <label>Категория</label>
              <input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Электроника" />
            </div>

            <div className="form-group">
              <label>Цена</label>
              <input value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="1 990 ₽" />
            </div>

            <div className="form-group">
              <label>Старая цена</label>
              <input value={form.oldPrice} onChange={(e) => set('oldPrice', e.target.value)} placeholder="2 490 ₽" />
            </div>

            <div className="form-group">
              <label>Бейдж</label>
              <input value={form.badge} onChange={(e) => set('badge', e.target.value)} placeholder="Хит, Новинка, -20%..." />
            </div>

            <div className="form-group full">
              <label>Описание</label>
              <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Описание товара..." />
            </div>

            <div className="form-group full">
              <label>Характеристики</label>
              <div className="specs-list">
                {form.specs.map((spec, i) => (
                  <div key={i} className="spec-row">
                    <input value={spec.key} onChange={(e) => setSpec(i, 'key', e.target.value)} placeholder="Параметр" />
                    <input value={spec.value} onChange={(e) => setSpec(i, 'value', e.target.value)} placeholder="Значение" />
                    <button type="button" className="btn-icon danger" onClick={() => removeSpec(i)}>✕</button>
                  </div>
                ))}
                <button type="button" className="btn-outline small" onClick={addSpec}>+ Добавить параметр</button>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn-primary">{product ? 'Сохранить' : 'Добавить'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
