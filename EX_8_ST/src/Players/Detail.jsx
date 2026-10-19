import { Link, useParams } from "react-router-dom";
import { data } from "./ListOfPlayers";

export default function Detail() {
  const { id } = useParams();
  const player = data.find((obj) => String(obj.id) === id);

  if (!player) {
    return (
      <div className="container">
        <p>Player not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  const cost = player.cost.toLocaleString();

  return (
    <div className="container">
      <div className="product-card">
        <div className="badge">{player.name}</div>
        <div className="product-tumb">
          <img src={player.img} alt={player.name} />
        </div>
        <div className="product-details">
          <h4>{player.club}</h4>
          <div className="product-price">Market value: € {cost}</div>
          <p>{player.info}</p>
          <div className="product-bottom-details">
            <Link to="/">← Back to list</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
