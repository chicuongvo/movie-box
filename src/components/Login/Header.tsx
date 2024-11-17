import styles from "../../pages/Login/Login.module.css";

export default function Header() {
  return (
    <>
      <section className={`${styles["section-login"]} text--center`}>
        <div className="container">
          <h1>Welcome</h1>
        </div>
      </section>
    </>
  );
}
