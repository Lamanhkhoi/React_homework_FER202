import OrchidList from "../Orchids/OrchidList";
import { ListOfOrchids } from "../data/ListOfOrchids";

export default function Natural() {
  const naturals = ListOfOrchids.filter((o) => o.isNatural);

  return (
    <>
      <h2 className="text-center my-3">Natural orchids ({naturals.length})</h2>
      <OrchidList orchids={naturals} />
    </>
  );
}
