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
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const CAST_NUM_PER_PAGE = 4;

export default function MovieDetail() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState([]);
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
      async function fetchTrailer(id: number) {
        try {
          const res = await fetch(`${API_URL}/${id}/videos?api_key=${API_KEY}`);
          const data = await res.json();
          const trailer = data.results.find(video => video.type === "Trailer");
          setTrailer(trailer);
        } catch (error) {
          console.error(error);
        }
      }
      fetchTrailer(id);
    },
    [id]
  );

  useEffect(
    function () {
      async function fetchReviews(id: number) {
        try {
          const res = await fetch(
            `${API_URL}/${id}/reviews?api_key=${API_KEY}`
          );
          const data = await res.json();
          const reviews = data.results.slice(0, 4);
          setReviews(reviews);
          console.log(reviews);
        } catch (error) {
          console.error(error);
        }
      }
      fetchReviews(id);
    },
    [id]
  );
  return (
    <div className={styles["movie-detail-wrapper"]}>
      <h1 className={styles.heading}>Movie Details</h1>
      {movie && <MovieCard movie={movie} />}
      <MovieTrailer trailer={trailer} />
      <ActorList actors={casts} />
      <Reviews reviews={reviews} />
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
          <div className={styles["movie-rating"]}>
            <Rating
              name="read-only"
              value={movie.vote_average / 2}
              readOnly
              sx={{ mt: 1 }}
            />
            <span>{movie.vote_count} votes</span>
          </div>
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

        <ul className={styles.movie_social}>
          <li>
            <span className={styles["movie-price"]}>$29.00</span>
          </li>
          <li>
            <button className="add-to-cart">Add to cart</button>
          </li>
        </ul>
      </div>
      <div
        className={`${styles.blur_back} ${styles.card_back}`}
        style={{
          backgroundImage: `url(${BACKDROP_URL}${movie.backdrop_path})`,
        }}
      ></div>
    </div>
  );
}

function MovieTrailer({ trailer }) {
  return (
    <div>
      <h2 className={styles.section}>Trailer</h2>
      <iframe
        width="1080"
        height="520"
        src={`https://www.youtube.com/embed/${trailer.key}`}
      />
    </div>
  );
}

function ActorList({ actors }) {
  return (
    <div>
      <h2 className={styles.section}>Actor cast</h2>
      <ul className={styles.actors_list}>
        {actors.map(actor => (
          <li key={actor.id}>
            <ActorCard actor={actor} />
          </li>
        ))}
      </ul>
    </div>
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

function Reviews({ reviews }) {
  return (
    <div>
      <h2 className={styles.section}>Review</h2>
      {reviews.map((review, i) => (
        <ReviewCard key={review.id} review={review} id={i}></ReviewCard>
      ))}
    </div>
  );
}

function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Format the date as DD/MM/YYYY
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

function ReviewCard({ review, id }) {
  return (
    <div className={styles["review-card"]}>
      <img
        className={styles["review-avt"]}
        src={`https://loremflickr.com/200/200?random=${id}`}
      />
      <div>
        <div className={styles["review-header"]}>
          <h3>{review.author}</h3>
          <span>{formatDate(review.created_at)}</span>
        </div>
        <p>{review.content.slice(0, 150)}</p>
      </div>
    </div>
  );
}
