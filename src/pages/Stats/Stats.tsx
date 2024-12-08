import { useEffect, useState } from "react";

import styles from "./Stats.module.css";
import { MovieList } from "../Catalog/Catalog";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Movie {
  name: string;

  // other properties
}

const data = [
  { name: "Jan", sold: 12, addedToCart: 28, amt: 2400 },
  { name: "Feb", sold: 17, addedToCart: 25, amt: 2210 },
  { name: "Mar", sold: 14, addedToCart: 30, amt: 2290 },
  { name: "Apr", sold: 19, addedToCart: 26, amt: 2000 },
  { name: "May", sold: 13, addedToCart: 21, amt: 2181 },
  { name: "Jun", sold: 16, addedToCart: 22, amt: 2500 },
  { name: "Jul", sold: 11, addedToCart: 24, amt: 2100 },
  { name: "Aug", sold: 18, addedToCart: 27, amt: 2400 },
  { name: "Sep", sold: 15, addedToCart: 23, amt: 2210 },
  { name: "Oct", sold: 10, addedToCart: 29, amt: 2290 },
  { name: "Nov", sold: 10, addedToCart: 25, amt: 2000 },
  { name: "Dec", sold: 17, addedToCart: 28, amt: 2181 },
];

const top5Movies = [
  {
    adult: false,
    backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    genre_ids: [878, 28, 12],
    id: "912649",
    original_language: "en",
    original_title: "Venom: The Last Dance",
    overview:
      "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
    popularity: 9668.355,
    poster_path: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
    release_date: "2024-10-22",
    title: "Venom: The Last Dance",
    video: false,
    vote_average: 6.4,
    vote_count: 998,
  },
  {
    adult: false,
    backdrop_path: "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
    genre_ids: [16, 12, 10751, 35],
    id: "1241982",
    original_language: "en",
    original_title: "Moana 2",
    overview:
      "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
    popularity: 5251.103,
    poster_path: "/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg",
    release_date: "2024-11-21",
    title: "Moana 2",
    video: false,
    vote_average: 6.899,
    vote_count: 377,
  },
  {
    adult: false,
    backdrop_path: "/au3o84ub27qTZiMiEc9UYzN74V3.jpg",
    genre_ids: [28, 878, 53],
    id: "1035048",
    original_language: "en",
    original_title: "Elevation",
    overview:
      "A single father and two women venture from the safety of their homes to face monstrous creatures to save the life of a young boy.",
    popularity: 2726.518,
    poster_path: "/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg",
    release_date: "2024-11-07",
    title: "Elevation",
    video: false,
    vote_average: 6.4,
    vote_count: 115,
  },
  {
    adult: false,
    backdrop_path: "/h3fwlwHotd3JfV13HdW0mxDcxPD.jpg",
    genre_ids: [35, 10749, 10770],
    id: "957119",
    original_language: "en",
    original_title: "Sidelined: The QB and Me",
    overview:
      "Dallas, a burdened but headstrong dancer, is determined to get into the best dance school in the country—her late mother’s alma mater. However, that dream is suddenly derailed when the cheeky yet secretly grieving football star, Drayton, crashes into her life with a unique story of his own. Will the two of them be able to grow into their dreams together, or will their dreams be sidelined?",
    popularity: 1722.466,
    poster_path: "/f8H9sLin46B7ka4DEqjemGuiCOB.jpg",
    release_date: "2024-11-29",
    title: "Sidelined: The QB and Me",
    video: false,
    vote_average: 6.764,
    vote_count: 53,
  },
];

export default function Stats() {
  const [soldMovies, setSoldMovies] = useState<Movie[]>([]);

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
        <h3 className={styles["stats-header"]}>Top 4 best seller movies:</h3>
        <MovieList movies={top5Movies} />
      </div>
      <div>
        <h3 className={`${styles["stats-header"]} ${styles["chart-label"]}`}>
          Selling chart:
        </h3>
        <LineChart width={800} height={400} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="sold" stroke="#ff7300" yAxisId={0} />
          <Line
            type="monotone"
            dataKey="addedToCart"
            stroke="#387908"
            yAxisId={0}
          />
          <Tooltip />
          <Legend />
        </LineChart>
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
