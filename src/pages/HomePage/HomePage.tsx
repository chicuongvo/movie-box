import FeedbackList from "./FeedbackList/FeedbackList";
import styles from "./HomePage.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = "62bc7d3ed0ea9939e69e5832789c8d7b";
const IMG_URL = "https://image.tmdb.org/t/p/original";

interface Movie {
  id: string;
  poster_path: string;
  backdrop_path?: string; // Add this property
  original_title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
}

const MovieCard1 = ({ movie }: { movie: Movie }) => (
  <Link to={`/movies/${movie.id}`}>
    <div className={styles["featured-movies"]}>
      <img
        src={`${IMG_URL}${movie.backdrop_path}`}
        alt={movie.original_title}
      />
      <div className={styles["featured-movies-title"]}>
        {movie.original_title}
      </div>
      <div className={styles["featured-movies-description"]}>
        Release Date: {movie.release_date}
      </div>
    </div>
  </Link>
);

const MovieCard2 = ({ movie }: { movie: Movie }) => (
  <Link to={`/movies/${movie.id}`}>
    <div className={styles["list-movies"]}>
      <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.original_title} />
      <div className={styles["list-movies-title"]}>{movie.original_title}</div>
      <div className={styles["list-movies-description"]}>
        Release Date: {movie.release_date}
        <div className={styles["list-movies-vote"]}>
          <span>{movie.vote_average.toFixed(1)} ⭐ </span>
          <span>{movie.vote_count} ratings </span>
        </div>
      </div>
    </div>
  </Link>
);

const MovieCard3 = ({ movie }: { movie: Movie }) => (
  <div className={styles["coming-soon-movie"]}>
    <div className={styles["coming-soon-movie-title"]}>
      {movie.original_title}
    </div>
    <div className={styles["coming-soon-movie-description"]}>
      <div>
        <span className={styles["bold-text"]}>Release Date:</span>{" "}
        {movie.release_date}
      </div>
      <div>
        <span className={styles["bold-text"]}>IDMB:</span>{" "}
        {movie.vote_average.toFixed(1)}
      </div>
      <div className={styles["coming-soon-movie-overview"]}>
        {movie.overview}
      </div>
    </div>
  </div>
);

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [slides, setSlides] = useState<Movie[][]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [activeCategory, setActiveCategory] = useState("Top Rated");
  const [comingSoonMovie, setComingSoonMovie] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState<{ key: string }>({ key: "" });

  useEffect(function () {
    async function fetchMovies() {
      try {
        const res = await fetch(`${API_URL}?api_key=${API_KEY}`);
        const data = await res.json();
        console.log(data.results);
        setMovies(data.results);
        setSlides(createSlides(data.results));
        displayRandomMovies(data.results); // Default display for "Top Rated"
        setComingSoonMovie(pickRandomComingMovie(data.results));
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

  useEffect(() => {
    if (comingSoonMovie?.id) {
      async function fetchTrailer(id: number) {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
          );
          const data = await res.json();
          const trailer = data.results.find(
            (video: { type: string }) => video.type === "Trailer"
          );
          setTrailer(trailer || null);
        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      }
      fetchTrailer(Number(comingSoonMovie.id));
    }
  }, [comingSoonMovie]);

  const createSlides = (moviesArray: Movie[]) => {
    const slides = [];
    for (let i = 0; i < moviesArray.length; i += 2) {
      slides.push([moviesArray[i], moviesArray[i + 1]].filter(Boolean));
    }
    return slides;
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const displayRandomMovies = (
    allMovies: Movie[],
    category: string = "Top Rated"
  ) => {
    setActiveCategory(category); // Set the active category
    const shuffledMovies = [...allMovies].sort(() => 0.5 - Math.random());
    setDisplayedMovies(shuffledMovies.slice(0, 8));
  };

  const pickRandomComingMovie = (moviesArray: Movie[]) => {
    const randomIndex = Math.floor(Math.random() * moviesArray.length);
    return moviesArray[randomIndex];
  };

  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`You have successfully subscribed with: ${email}`);
      setEmail(""); // Clear email input
    } else {
      alert("Please enter your email address.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubscribe();
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["featured-movies-container"]}>
        <div className={styles["featured-movies-wrapper"]}>
          {slides[currentSlide]?.map(movie => (
            <MovieCard1 key={movie.id} movie={movie} />
          ))}
        </div>

        <div className={styles["dot-container"]}>
          {[...Array(3)].map((_, index) => (
            <span
              key={index}
              className={`${styles["dot"]} ${
                currentSlide === index ? styles["active"] : ""
              }`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className={styles["list-movies-container"]}>
        <div className={styles["list-movies-heading"]}>WATCH MOVIES ONLINE</div>
        <hr className={styles["divider"]} />

        <div className={styles["list-movie-option"]}>
          <button
            className={`${styles["list-movie-button"]} ${
              activeCategory === "Top Rated" ? styles["active-button"] : ""
            }`}
            onClick={() => displayRandomMovies(movies, "Top Rated")}
          >
            Top Rated
          </button>
          <button
            className={`${styles["list-movie-button"]} ${
              activeCategory === "New Releases" ? styles["active-button"] : ""
            }`}
            onClick={() => displayRandomMovies(movies, "New Releases")}
          >
            New Releases
          </button>
          <button
            className={`${styles["list-movie-button"]} ${
              activeCategory === "Coming Soon" ? styles["active-button"] : ""
            }`}
            onClick={() => displayRandomMovies(movies, "Coming Soon")}
          >
            Coming Soon
          </button>
        </div>

        <div className={styles["list-movies-wrapper"]}>
          {displayedMovies.map(movie => (
            <MovieCard2 key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      <div className={styles["coming-soon"]}>
        <div className={styles["coming-soon-title"]}>COMING SOON</div>
        <hr className={styles["divider"]} />
        {comingSoonMovie && trailer && (
          <div className={styles["coming-soon-container"]}>
            <div className={styles["coming-soon-video-box"]}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <MovieCard3 movie={comingSoonMovie} />
          </div>
        )}

        <button className={styles["add-to-watchlist"]}>
          ADD TO WATCH LIST
        </button>
      </div>

      <div className={styles["newsletter-form"]}>
        <div className={styles["newsletter-form-descrtiption"]}>
          Enter your email address to receive all news, updates on new arrivals,
          special offers and other discount information.
        </div>

        <div className={styles["newsletter-form-content"]}>
          <input
            type="email"
            placeholder="Your email address"
            className={styles["subscribe-form"]}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={styles["subscribe-button"]}
            onClick={handleSubscribe}
          >
            <div>SUBSCRIBE</div>
          </button>
        </div>
      </div>

      <FeedbackList />
    </div>
  );
}
