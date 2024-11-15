import { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import { Rating } from "@mui/material";

interface Movie {
  id: string;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  runtime: number;
  backdrop_path: string;
}

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "62bc7d3ed0ea9939e69e5832789c8d7b";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const CAST_NUM_PER_PAGE = 4;

export default function MovieDetail() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState("");
  const [casts, setCasts] = useState([]);

  const id = 533535;
  useEffect(
    function () {
      async function fetchMovie(id: number) {
        try {
          const res = await fetch(
            `${API_URL}/${id}?api_key=${API_KEY}&append_to_response=credits`
          );
          const data = await res.json();
          const { cast } = data.credits;
          setMovie(data);
          setCasts(cast.slice(0, CAST_NUM_PER_PAGE));
        } catch (error) {
          console.error(error);
        }
      }
      fetchMovie(id);
    },
    [id]
  );

  useEffect(
    function () {
      async function fetchMovie(id: number) {
        try {
          const res = await fetch(`${API_URL}/${id}/videos?api_key=${API_KEY}`);
          const data = await res.json();
          const trailer = data.results.find(video => video.type === "Trailer");
          setTrailer(trailer);
        } catch (error) {
          console.error(error);
        }
      }
      fetchMovie(id);
    },
    [id]
  );

  useEffect(function () {
    const bg = document.querySelector(`${styles.card_back}`);
    console.log(bg);
  }, []);
  return (
    <div className={styles["movie-detail-wrapper"]}>
      <h1 className={styles.heading}>Movie Details</h1>
      {movie && <MovieCard movie={movie} />}
      <h2 className={styles.section}>Trailer</h2>
      <iframe
        width="1080"
        height="520"
        src={`https://www.youtube.com/embed/${trailer.key}`}
      />
      <h2 className={styles.section}>Actor cast</h2>
      <ActorList actors={casts} />
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className={styles.movie_card} id="tomb">
      <div className={styles.info_section}>
        <div className={styles.movie_header}>
          <img
            className={styles.locandina}
            src={`${IMG_URL}${movie.poster_path}`}
            alt="Tomb Raider"
          />
          <h1>{movie.original_title}</h1>
          <Rating
            name="read-only"
            value={movie.vote_average / 2}
            readOnly
            sx={{ mt: 1 }}
          />
          <br />
          <span className={styles.minutes}>{movie.runtime} min</span>
          <p className={styles.type}>
            {movie.genres.map(genre => (
              <span key={genre.id}>{genre.name} - </span>
            ))}
          </p>
        </div>
        <div className={styles.movie_desc}>
          <p className={styles.text}>{movie.overview}</p>
        </div>
        <div className={styles.movie_social}>
          <ul>
            <li>
              <i className="material-icons">like</i>
            </li>
            <li>
              <i className="material-icons">share</i>
            </li>
            <li>
              <i className="material-icons">add_to_cart</i>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${styles.blur_back} ${styles.card_back}`}
        style={{ backgroundImage: `url(${IMG_URL}${movie.backdrop_path})` }}
      ></div>
    </div>
  );
}

function ActorList({ actors }) {
  console.log(actors);
  return (
    <ul className={styles.actors_list}>
      {actors.map(actor => (
        <li key={actor.id}>
          <ActorCard actor={actor} />
        </li>
      ))}
    </ul>
  );
}

function ActorCard({ actor }) {
  return (
    <div className={styles.actor_card}>
      <img
        className={styles.actor_img}
        src={`${IMG_URL}${actor.profile_path}`}
      />
      <p className={styles.actor_name}>{actor.name}</p>
    </div>
  );
}
