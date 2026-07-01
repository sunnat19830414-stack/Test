export default function ProductCard({ product, design }) {
  const { primaryColor, accentColor, textColor, mutedColor, cardBackground, borderRadius, showPrices, showSKU, showDescription, showSpecs, bodyFont, headingFont, fontSize } = design;

  return (
    <div
      className="product-card"
      style={{
        backgroundColor: cardBackground,
        borderRadius,
        color: textColor,
        fontFamily: bodyFont + ', sans-serif',
        fontSize,
      }}
    >
      <div className="card-image-wrap" style={{ borderRadius: `${borderRadius}px ${borderRadius}px 0 0` }}>
        {product.badge && (
          <span className="card-badge" style={{ backgroundColor: accentColor }}>
            {product.badge}
          </span>
        )}
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="card-image" />
        ) : (
          <div className="card-image-placeholder" style={{ backgroundColor: primaryColor + '22' }}>
            <span style={{ color: primaryColor }}>📦</span>
          </div>
        )}
      </div>

      <div className="card-body">
        {showSKU && product.sku && (
          <span className="card-sku" style={{ color: mutedColor }}>
            {product.sku}
          </span>
        )}

        <h3 className="card-name" style={{ fontFamily: headingFont + ', sans-serif', color: textColor }}>
          {product.name}
        </h3>

        {showDescription && product.description && (
          <p className="card-desc" style={{ color: mutedColor }}>{product.description}</p>
        )}

        {showSpecs && product.specs?.length > 0 && (
          <table className="card-specs">
            <tbody>
              {product.specs.map((s, i) => (
                <tr key={i}>
                  <td style={{ color: mutedColor }}>{s.key}</td>
                  <td style={{ color: textColor }}>{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showPrices && (product.price || product.oldPrice) && (
          <div className="card-pricing">
            {product.oldPrice && (
              <span className="card-old-price" style={{ color: mutedColor }}>{product.oldPrice}</span>
            )}
            {product.price && (
              <span className="card-price" style={{ color: primaryColor }}>{product.price}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
