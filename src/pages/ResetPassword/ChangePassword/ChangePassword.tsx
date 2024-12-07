import { useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css";
import { useState } from "react";

const URL = "https://backend-movie-app-0pio.onrender.com";
// const URL = "http://localhost:3002";

export default function ChangPassword() {
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const username = queryParams.get("username");
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const handleClick = () => {
    if (info.newPassword != info.confirmPassword) {
      alert("Password is not equal to confirm password");
      return;
    }
    const URI =
      URL + `/user/reset-password?username=${username}&token=${token}`;
    fetch(URI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword: info.newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log(data, "@#!@");
        if (data.statusCode === 200) {
          navigate("/login");
        }
      });
  };
  return (
    <div className={`${styles["change-password-container"]}`}>
      <h2> Reset password</h2>
      <div className={`${styles["user-input"]}`}>
        <label>New password</label>
        <input
          type="password"
          onChange={(event) => {
            setInfo({ ...info, newPassword: event.target.value });
          }}
        ></input>
      </div>
      <div className={`${styles["user-input"]}`}>
        <label>Confirm password</label>
        <input
          type="password"
          onChange={(event) => {
            setInfo({ ...info, confirmPassword: event.target.value });
          }}
        ></input>
      </div>
      <button onClick={handleClick}>Change</button>
    </div>
  );
}
