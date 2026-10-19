import { useNavigate } from "react-router-dom";

export default function OrchidCard({ orchid, onShowDetail }) {
  const { id, name, image, origin, color, isSpecial, rating, category } = orchid;
  const navigate = useNavigate();

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
        {/* Lab 2: mở modal (popup) xem nhanh */}
        <button onClick={() => onShowDetail(orchid)}>Quick view</button>
        {/* Lab 5: sang trang /detail/<id> (id nằm trên URL) */}
        <button onClick={() => navigate(`/detail/${id}`)}>Details</button>
        <p className="orchid-rating">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </p>
      </div>
    </div>
  );
}
