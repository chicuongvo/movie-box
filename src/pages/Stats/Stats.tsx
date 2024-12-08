import { useEffect, useState } from "react";

import styles from "./Stats.module.css";

export interface Movie {
  name: string;

  // other properties
}

export default function Stats() {
  const [soldMovies, setSoldMovies] = useState<Movie[]>([]);

  const result = soldMovies.reduce<{ name: string; count: number }[]>(
    (acc, { name }) => {
      const found = acc.find(item => item.name === name);
      if (found) {
        found.count += 1;
      } else {
        acc.push({ name, count: 1 });
      }
      return acc;
    },
    []
  );

  const top5Movies = result
    .sort((a, b) => b.count - a.count) // Sắp xếp theo count giảm dần
    .slice(0, 5);

  console.log(top5Movies);

  useEffect(() => {
    async function fetchSoldMovies() {
      const res = await fetch(
        "https://backend-movie-app-0pio.onrender.com/order"
      );
      const data = await res.json();
      const movies = data.data.flatMap((user: any) => user.products);

      setSoldMovies(movies);
    }
    fetchSoldMovies();
  }, []);

  return (
    <div className={styles["stats-wrapper"]}>
      <div className={styles["top-5-movs"]}>
        <h3 className={styles["stats-header"]}>Top 5 best seller movies:</h3>
        <ul>
          {top5Movies.map(mov => (
            <li key={mov.name}>
              <span className={styles["top-5-mov"]}>
                {mov.name} - 💸 {mov.count} sold
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className={`${styles["stats-header"]} ${styles["income-label"]}`}>
          Total movies sold:
        </h3>
        <p className={styles["stats-income"]}>🎬{soldMovies.length}</p>
      </div>
      <div>
        <h3 className={`${styles["stats-header"]} ${styles["income-label"]}`}>
          Total income:
        </h3>
        <p className={styles["stats-income"]}>$ {soldMovies.length * 29}</p>
      </div>
    </div>
  );
}
