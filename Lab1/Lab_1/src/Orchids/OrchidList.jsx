import OrchidCard from "./OrchidCard"
import  {ListOfOrchids}  from "../data/ListOfOrchids"
import "./Orchids.css"

export default function OrchidList() {
    
    return(
        
        <div className="orchid-list">
            { ListOfOrchids.map((orchids) =>(
                <div className="column" key={orchids.id}>
                    <OrchidCard orchid={orchids} />
                </div>
            ))}
        </div>
        
    )
}