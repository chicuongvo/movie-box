import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Catalog.module.css";
import { Link } from "react-router-dom";
import mockPoster from "../../assets/poster.jpg";
import { Pagination } from "@mui/material";

const API_URL = "https://api.themoviedb.org/3/movie/now_playing";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          const res = await fetch(`${API_URL}?api_key=${API_KEY}&page=${page}`);
          const data = await res.json();
          console.log(data.results);
          setMovies(data.results);
        } catch (error) {
          console.error(error);
        }
      }

      fetchMovies();
    },
    [page]
  );

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          if (!searchQuery) return;
          const res = await fetch(
            `${SEARCH_API}?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
          );
          const data = await res.json();
          console.log(data.results);
          setMovies(data.results);
        } catch (error) {
          console.error(error);
        }
      }

      fetchMovies();
    },
    [searchQuery, page]
  );

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };

  return (
    <div className={styles["catalog-wrapper"]}>
      <h1 className={styles.heading}>Watch movies online</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <MovieList movies={movies} />
      <Pagination
        count={20}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
        page={page}
        size="large"
        className={styles["paginate"]}
      />
    </div>
  );
}

function SearchBar({
  setSearchQuery,
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [input, setInput] = useState("");
  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();
        setSearchQuery(input);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={styles["search-icon"]}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      <input
        className={styles.input}
        placeholder="Search..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      {/* <select className={styles.select}>
        <option value="all">All categories</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="fantasy">Fantasy</option>
        <option value="horror">Horror</option>
      </select> */}
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
        <img
          src={posterSrc ? `${IMG_URL}${posterSrc}` : mockPoster}
          className={styles.poster}
        />
      </Link>
      <Link to={`/movies/${id}`} className={styles["movie-link"]}>
        <h2 className={styles["movie-title"]}>{title}</h2>
      </Link>
      <p className={styles["release-date"]}>
        {releaseDate ? releaseDate?.slice(0, 4) : "Unknown"}
      </p>
      <span>{vote.toFixed(1)} ⭐ </span>
      <span>{vote_count} ratings</span>
    </div>
  );
}
