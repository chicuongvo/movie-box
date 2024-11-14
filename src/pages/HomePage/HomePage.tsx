import FeedbackList from "./FeedbackList/FeedbackList";
import styles from "./HomePage.module.css";
import React, { useState, useEffect } from "react";
interface Cast {
  id: string;
  movie_id: number;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
}

interface Movie {
  id: string;
  movie_id: number;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  casts: Cast[];
}

const MovieCard1 = ({ movie }: { movie: Movie }) => (
  <div className={styles["featured-movies"]}>
    <img src={movie.backdrop_path} alt={movie.original_title} />
    <div className={styles["featured-movies-title"]}>
      {movie.original_title}
    </div>
    <div className={styles["featured-movies-description"]}>
      Release Date: {movie.release_date}
    </div>
  </div>
);

const MovieCard2 = ({ movie }: { movie: Movie }) => (
  <div className={styles["list-movies"]}>
    <img src={movie.poster_path} alt={movie.original_title} />
    <div className={styles["list-movies-title"]}>{movie.original_title}</div>
    <div className={styles["list-movies-description"]}>
      Release Date: {movie.release_date}
    </div>
  </div>
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
        <span className={styles["bold-text"]}>IDMB:</span> {movie.vote_average}
      </div>
      <div>{movie.overview}</div>
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

  useEffect(() => {
    const URL = "https://jsonfakery.com/movies/paginated/";
    console.log(URL);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.data);
        setSlides(createSlides(data.data));
        displayRandomMovies(data.data); // Default display for "Top Rated"
        setComingSoonMovie(pickRandomComingMovie(data.data));
      });
  }, []);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubscribe();
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["featured-movies-container"]}>
        <div className={styles["featured-movies-wrapper"]}>
          {slides[currentSlide]?.map((movie) => (
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
          {displayedMovies.map((movie) => (
            <MovieCard2 key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      <div className={styles["coming-soon"]}>
        <div className={styles["coming-soon-title"]}>COMING SOON</div>
        <hr className={styles["divider"]} />
        {comingSoonMovie && (
          <div className={styles["coming-soon-container"]}>
            <div className={styles["coming-soon-video-box"]}></div>
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
            onChange={(e) => setEmail(e.target.value)}
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
