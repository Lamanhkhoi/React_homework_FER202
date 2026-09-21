
import { Players } from "./ListOfPlayers";
import { useState } from "react";

export default function Player() {
  const [player, setPlayer] = useState([]);

  return (
    <>
      <div className="row g-4">
        {Players.map((player) => (
          <div className="col-6 col-md-4" key={player.id}>
            <div className="card h-100 border-0">
              <div className="product-img">
                <img src={player.img} alt={player.name} className="w-100 h-100" style={{ objectFit: "cover" }} />
              </div>
              <div className="card-body px-0">
                <p className="card-text mb-1 fw-bold">{player.name}</p>
                <p className="title text-muted mb-2">{player.club}</p>
                <a href="#popup1" className="btn btn-outline-secondary btn-sm" onClick={() => setPlayer(player)}>
                  Detail
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="popup1" className="overlay">
        <div className="popup">
          <img src={player.img} alt="players" />
          <h2>{player.name}</h2>
          <a className="close" href="#">&times;</a>
          <div className="content">{player.info}</div>
        </div>
      </div>
    </>
  );
}
