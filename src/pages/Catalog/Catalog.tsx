import { useEffect, useState } from "react";
import styles from "./Catalog.module.css";
import { Rating } from "@mui/material";

const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = "62bc7d3ed0ea9939e69e5832789c8d7b";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: string;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

type MovieCardProps = {
  posterSrc: string;
  title: string;
  releaseDate: string;
  vote: number;
};

export default function Catalog() {
  const [movies, setMovies] = useState([]);

  useEffect(function () {
    async function fetchMovies() {
      try {
        const res = await fetch(`${API_URL}?api_key=${API_KEY}`);
        const data = await res.json();
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={styles["catalog-wrapper"]}>
      <h1 className={styles.heading}>Watch movies online</h1>
      <SearchBar />
      <MovieList movies={movies} />
    </div>
  );
}

function SearchBar() {
  return (
    <form className={styles.form}>
      <input className={styles.input} placeholder="Search..." />
      <select className={styles.select}>
        <option value="all">All categories</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="fantasy">Fantasy</option>
        <option value="horror">Horror</option>
      </select>
      <button className={styles.button}>Search</button>
    </form>
  );
}

function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <ul className={styles["list-movies"]}>
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          posterSrc={movie.poster_path}
          title={movie.original_title}
          releaseDate={movie.release_date}
          vote={movie.vote_average / 2}
        />
      ))}
    </ul>
  );
}

function MovieCard({ posterSrc, title, releaseDate, vote }: MovieCardProps) {
  return (
    <div className={styles["card-movie"]}>
      <img src={`${IMG_URL}${posterSrc}`} className={styles.poster} />
      <h2>{title}</h2>
      <p className={styles["release-date"]}>{releaseDate}</p>
      <Rating name="read-only" value={vote} readOnly sx={{ mt: 1 }} />
    </div>
  );
}
