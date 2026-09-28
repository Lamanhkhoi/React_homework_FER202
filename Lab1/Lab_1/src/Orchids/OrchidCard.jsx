export default function OrchidCard({ orchid }) {
  const { name, image, origin, color, isSpecial, rating, category } = orchid;

  return (
    <div className="orchid-card">
      <div className="orchid-image-wrap">
        <img src={image} alt={name} className="orchid-image" />
        {isSpecial && <span className="orchid-badge">⭐ Special</span>}
      </div>
      <div className="orchid-info">
        <h3 className="orchid-name">{name}</h3>
        <p className="orchid-category">{category}</p>
        <div className="orchid-meta">
          <span
            className="orchid-color"
            style={{ backgroundColor: color }}
          ></span>
          <span>{origin}</span>
        </div>
        <p className="orchid-rating">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </p>
      </div>
    </div>
  );
}
