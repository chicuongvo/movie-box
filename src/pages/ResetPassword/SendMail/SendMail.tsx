import { useState } from "react";
import styles from "./SendMail.module.css";

const URL = "https://backend-movie-app-0pio.onrender.com";
// const URL = "http://localhost:3002";

export default function SendMail() {
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(10);

  const handleClick = () => {
    setIsButtonDisabled(true);
    const URI = URL + `/token/reset-password/${username}`;
    fetch(URI, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log(data);
        const countdown = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer <= 1) {
              clearInterval(countdown);
              setIsButtonDisabled(false);
              return 10;
            }
            return prevTimer - 1;
          });
        }, 1000);
      });
  };

  return (
    <div className={styles["send-mail-container"]}>
      <p>Enter username to receive the mail</p>
      <input
        onChange={(event) => setUsername(event.target.value)}
        value={username}
      />
      <button disabled={isButtonDisabled} onClick={handleClick}>
        {timer === 10 ? "SEND" : `${timer}s`}
      </button>
    </div>
  );
}
