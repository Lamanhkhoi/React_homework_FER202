import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { ListOfOrchids } from "../data/ListOfOrchids";

export default function Detail() {
  const { id } = useParams();            // id lấy từ URL: /detail/:id
  const navigate = useNavigate();
  const orchid = ListOfOrchids.find((o) => o.id === id);

  if (!orchid) {
    return (
      <div className="text-center my-5">
        <h3>Không tìm thấy hoa lan có id = {id}</h3>
        <Link to="/">Về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center my-4">
      <Card style={{ width: "26rem" }}>
        <Card.Img variant="top" src={orchid.image} alt={orchid.name} />
        <Card.Body>
          <Card.Title>{orchid.name}</Card.Title>
          <p>Origin: {orchid.origin}</p>
          <p>Color: {orchid.color}</p>
          <p>Category: {orchid.category}</p>
          <p>Rating: {orchid.rating}</p>
          <p>Special: {orchid.isSpecial ? "Yes" : "No"}</p>
          <p>Natural: {orchid.isNatural ? "Yes" : "No"}</p>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
