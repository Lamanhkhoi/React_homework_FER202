import { useState } from "react";
import UserPosts from "./components/UserPosts";
import CountdownTimer from "./components/CountdownTimer";

function App() {
  const [userId, setUserId] = useState(1);
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="container my-4">
      <h1>Exercise 10 - useEffect</h1>

      {/* Countdown: bật/tắt để thử unmount */}
      <button className="btn btn-secondary mb-2" onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "Hide timer" : "Show timer"}
      </button>
      {showTimer && <CountdownTimer initialValue={10} />}

      <hr />

      {/* Đổi userId để thử refetch */}
      <select
        className="form-select w-auto mb-3"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((id) => (
          <option key={id} value={id}>User {id}</option>
        ))}
      </select>
      <UserPosts userId={userId} />
    </div>
  );
}

export default App;