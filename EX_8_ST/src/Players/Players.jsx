import { data } from "./ListOfPlayers";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Players() {
  const [player, setPlayer] = useState({});

  return (
    <>
      <div className="grid">
        {data.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.img} alt={p.name} />
            <p className="name">{p.name}</p>
            <p className="club">{p.club}</p>
            <a href="#popup1" onClick={() => setPlayer(p)}>
              <button>Detail</button>
            </a>
          </div>
        ))}
      </div>

      <div id="popup1" className="overlay">
        <div className="popup">
          <img src={player.img} alt={player.name} />
          <h2>{player.name}</h2>
          <a className="close" href="#">&times;</a>
          <div className="content">{player.info}</div>
          <Link to={`/detail/${player.id}`}>
            <p><button>Detail</button></p>
          </Link>
        </div>
      </div>
    </>
  );
}
