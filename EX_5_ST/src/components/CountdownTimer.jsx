import { useState, useEffect } from "react";

export default function CountdownTimer({ initialValue }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    if (timeRemaining <= 0) return; // về 0 thì không tạo interval nữa

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // cleanup
  }, [timeRemaining]);

  return <h3>Time Remaining: {timeRemaining}</h3>;
}