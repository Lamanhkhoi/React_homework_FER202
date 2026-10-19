import { useReducer, useState } from "react";

export default function BaseReducer() {
    // const [age, setAge] = useState(18)
    const [profile, setProfile] = useState({age:20}) 

    // useReducer
    // const [ state, dispatch ] = useReducer(reducer, initialArg)
    // 1. state là giá trị của đối tượng cần quản lí trạng thái
    // 2. initialArg là giá trị mặc định đầu tiên của stage
    // 3. reducer là hàm/function xử lý cập nhật giá trị của state
    // - hàm reducer nhận vào 2 đối số, 1 là state hay còn gọi là currentState, 2 là Object action được nhận từ Dispatch
    // Hàm Reducer luân trả về 1 state mới
    
    //4. Dispatch là : hàm kích hoạt / yêu cầu hàm reducer xử lý cập nhật giá trị cho 
    //- dispatch khi gọi reducer , sẽ truyền object action cho reducer 
    // - object action gồm có : type (hành động muốn xử lý) và payload (giá trị muốn cập nhật cho state)

    const [profile2, dispatch] = useReducer(reducer, { age2: 5})
    
    function reducer(state, action){
        // logic xử lí để cập nhật giá trị state cụ thể là object profile2
        if(action.type === "increse"){
            return {
                // age2: state.age2 + 1
                age2: action.payload
            }
        }
        throw Error("unknow type: " + action.type)
    }
    
    return(
        <>
            <h1> Base Reduecer</h1>
            <h3> My age is: {profile.age}</h3>
            <button onClick={() => setProfile({ age: profile.age + 1 })}> Increse Age</button>

            <h3> My age 2 is: {profile2.age2}</h3>
            <button onClick={() => dispatch({ type: "increse", payload: 18 })}> Increse 2 Age</button>
        </>
    )
}