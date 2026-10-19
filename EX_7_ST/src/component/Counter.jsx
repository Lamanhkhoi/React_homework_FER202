import { useReducer, useState } from "react";

// [LỖI 1] initialState và reducer phải khai báo TRƯỚC khi useReducer dùng (đặt ngoài component).
const initialState = [
  { id: 1, text: "Học useReducer", done: false },
  { id: 2, text: "Làm bài tập", done: false },
];

function reducer(state, action) {
  // [LỖI 2] Phải switch theo action.type (không phải action.id) vì dispatch({ type: "add", ... }).
  switch (action.type) {
    case "add":
      // [LỖI 3] "return" xuống dòng bị JS tự chèn ";" -> trả về undefined. Phải viết cùng 1 dòng.
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case "toggle":
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "delete":
      return state.filter((t) => t.id !== action.id);
    case "clear_completed":
      return state.filter((t) => !t.done);
    default:
      throw Error("unknown type: " + action.type);
  }
}

export default function TodoList() {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  return (
    <>
        <input value={text.trim()} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => { dispatch({ type: "add", payload: text }); setText(""); }}>
        Add
      </button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => dispatch({ type: "toggle", id: t.id })}
              style={{ textDecoration: t.done ? "line-through" : "none" }}
            >
              {t.text}
            </span>
            <button onClick={() => dispatch({ type: "delete", id: t.id })}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "clear_completed" })}>Xóa các việc đã xong</button>
      <p>Còn {tasks.filter((t) => !t.done).length} việc chưa làm</p>
    </>
    );
}
