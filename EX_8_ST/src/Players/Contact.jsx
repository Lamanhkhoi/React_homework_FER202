import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="contact">
      <h2>Contact us</h2>
      {sent ? (
        <p>Thank you! We will get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your name" required />
          <input type="email" placeholder="Your email" required />
          <textarea placeholder="Your message" rows="4" required />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}
