import { useEffect, useState } from "react";
import styles from "./Catalog.module.css";
import { Link } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = "62bc7d3ed0ea9939e69e5832789c8d7b";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: string;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

type MovieCardProps = {
  posterSrc: string;
  title: string;
  releaseDate: string;
  vote: number;
  id: string;
  vote_count: number;
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
          vote={movie.vote_average}
          id={movie.id}
          vote_count={movie.vote_count}
        />
      ))}
    </ul>
  );
}

function MovieCard({
  posterSrc,
  title,
  releaseDate,
  vote,
  id,
  vote_count,
}: MovieCardProps) {
  return (
    <div className={styles["card-movie"]}>
      <Link to={`/movies/${id}`}>
        <img src={`${IMG_URL}${posterSrc}`} className={styles.poster} />
      </Link>
      <Link to={`/movies/${id}`} className={styles["movie-link"]}>
        <h2 className={styles["movie-title"]}>{title}</h2>
      </Link>
      <p className={styles["release-date"]}>{releaseDate.slice(0, 4)}</p>
      <span>{vote.toFixed(1)} ⭐ </span>
      <span>{vote_count} ratings</span>
    </div>
  );
}
