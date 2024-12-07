import styles from "./Footer.module.css";
import Logo from "../../assets/favicon.png";
import {
  Twitter,
  Facebook,
  Instagram,
  Pinterest,
  Vimeo,
  Google,
} from "../../assets/footer_icon/index";
export default function footer() {
  return (
    <div className={`${styles["footer-container"]}`}>
      <div className={`${styles["footer-logo"]} `}>
        <img src={Logo}></img>
        <div
          className={`${styles["display-column"]} `}
          style={{ marginLeft: "10px" }}
        >
          <span>Movie</span>
          <span>Box</span>
        </div>
      </div>

      <div className={`${styles["footer-icon-container"]}`}>
        <Facebook />
        <Twitter />
        <Pinterest />
        <Vimeo />
        <Google />
        <Instagram />
      </div>
      <p style={{ marginTop: "20px" }}>
        © 2024 All Rights Reserved. Terms of Use.
      </p>
    </div>
  );
}
