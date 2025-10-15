import React, { useContext } from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = () => {
  const { upcomingMovieIds } = useContext(MoviesContext);

  const upcomingMovieQueries = useQueries({
    queries: upcomingMovieIds.map((id) => {
      return {
        queryKey: ["movie", { id }],
        queryFn: () => getMovie(id),
      };
    }),
  });

  const isLoading = upcomingMovieQueries.some((query) => query.isLoading);
  const isError = upcomingMovieQueries.some((query) => query.isError);
  const movies = upcomingMovieQueries.map((query) => query.data).filter(Boolean);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading upcoming movies.</p>;

  return (
    <MovieListPageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => null} // или твоя кнопка
    />
  );
};

export default UpcomingMoviesPage;
