import useCatalogStore from '../store/catalogStore';
import { TEMPLATES, TEMPLATE_DEFAULTS, GOOGLE_FONTS } from '../templates';

export default function DesignPanel() {
  const { design, updateDesign, resetDesign } = useCatalogStore();

  const applyTemplate = (id) => {
    updateDesign({ templateId: id, ...TEMPLATE_DEFAULTS[id] });
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateDesign({ logoUrl: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleCover = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateDesign({ coverImage: ev.target.result });
    reader.readAsDataURL(file);
  };

  return (
    <div className="design-panel">
      <div className="panel-section">
        <h3>Шаблон дизайна</h3>
        <div className="template-grid">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={`template-card ${design.templateId === t.id ? 'active' : ''}`}
              onClick={() => applyTemplate(t.id)}
            >
              <div className={`template-thumb ${t.preview}`} />
              <span className="template-name">{t.name}</span>
              <span className="template-desc">{t.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3>Данные каталога</h3>
        <div className="form-group">
          <label>Название компании</label>
          <input value={design.companyName} onChange={(e) => updateDesign({ companyName: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Заголовок каталога</label>
          <input value={design.catalogTitle} onChange={(e) => updateDesign({ catalogTitle: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Подзаголовок</label>
          <input value={design.catalogSubtitle} onChange={(e) => updateDesign({ catalogSubtitle: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Логотип</label>
          <input type="file" accept="image/*" onChange={handleLogo} />
          {design.logoUrl && <img src={design.logoUrl} alt="logo" style={{ height: 40, marginTop: 6 }} />}
        </div>
        <div className="form-group">
          <label>Обложка</label>
          <input type="file" accept="image/*" onChange={handleCover} />
        </div>
      </div>

      <div className="panel-section">
        <h3>Цвета</h3>
        <div className="color-grid">
          {[
            ['primaryColor', 'Основной'],
            ['secondaryColor', 'Дополнительный'],
            ['accentColor', 'Акцент'],
            ['backgroundColor', 'Фон страницы'],
            ['cardBackground', 'Фон карточки'],
            ['textColor', 'Текст'],
            ['mutedColor', 'Второстепенный текст'],
          ].map(([key, label]) => (
            <div key={key} className="color-item">
              <label>{label}</label>
              <div className="color-input-row">
                <input type="color" value={design[key]} onChange={(e) => updateDesign({ [key]: e.target.value })} />
                <input type="text" value={design[key]} onChange={(e) => updateDesign({ [key]: e.target.value })} className="color-hex" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3>Шрифты</h3>
        <div className="form-group">
          <label>Шрифт заголовков</label>
          <select value={design.headingFont} onChange={(e) => updateDesign({ headingFont: e.target.value })}>
            {GOOGLE_FONTS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Шрифт текста</label>
          <select value={design.bodyFont} onChange={(e) => updateDesign({ bodyFont: e.target.value })}>
            {GOOGLE_FONTS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Размер шрифта: {design.fontSize}px</label>
          <input type="range" min={11} max={18} value={design.fontSize} onChange={(e) => updateDesign({ fontSize: +e.target.value })} />
        </div>
      </div>

      <div className="panel-section">
        <h3>Макет</h3>
        <div className="form-group">
          <label>Колонок в строке: {design.columns}</label>
          <input type="range" min={1} max={4} value={design.columns} onChange={(e) => updateDesign({ columns: +e.target.value })} />
        </div>
        <div className="form-group">
          <label>Скругление углов: {design.borderRadius}px</label>
          <input type="range" min={0} max={24} value={design.borderRadius} onChange={(e) => updateDesign({ borderRadius: +e.target.value })} />
        </div>
        <div className="toggle-group">
          {[
            ['showPrices', 'Показывать цены'],
            ['showSKU', 'Показывать артикулы'],
            ['showDescription', 'Показывать описания'],
            ['showSpecs', 'Показывать характеристики'],
          ].map(([key, label]) => (
            <label key={key} className="toggle-label">
              <input type="checkbox" checked={design[key]} onChange={(e) => updateDesign({ [key]: e.target.checked })} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <button className="btn-outline full-width" onClick={resetDesign}>Сбросить настройки</button>
      </div>
    </div>
  );
}
