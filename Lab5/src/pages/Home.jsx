import OrchidList from "../Orchids/OrchidList";
import { ListOfOrchids } from "../data/ListOfOrchids";

export default function Home() {
  return <OrchidList orchids={ListOfOrchids} />;
}
