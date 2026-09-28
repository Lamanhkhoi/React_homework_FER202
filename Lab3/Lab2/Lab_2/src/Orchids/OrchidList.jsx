import OrchidCard from "./OrchidCard";
import { ListOfOrchids } from "../data/ListOfOrchids";
import "./Orchids.css";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

export default function OrchidList() {
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleShowDetail = (orchid) => {
    setSelectedOrchid(orchid);
  };

  const handleClose = () => {
    setSelectedOrchid(null);
  };
  return (
    <>
      <div className="orchid-list">
        {ListOfOrchids.map((orchids) => (
          <OrchidCard
            key={orchids.id}
            orchid={orchids}
            onShowDetail={handleShowDetail}
          />
        ))}
      </div>

      <Modal show={selectedOrchid !== null} onHide={handleClose}>
        {selectedOrchid && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedOrchid.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <img
                src={selectedOrchid.image}
                alt={selectedOrchid.name}
                style={{ width: "100%" }}
              />
              <p>Origin: {selectedOrchid.origin}</p>
              <p>Color: {selectedOrchid.color}</p>
              <p>Category: {selectedOrchid.category}</p>
              <p>Rating: {selectedOrchid.rating}</p>
              <p>Special: {selectedOrchid.isSpecial ? "Yes" : "No"}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
