import {addMovies , makeUrlForAPI , renderStandardMovieTemplate} from "../common";

export function renderTopRatedMoviesPage() {
    renderStandardMovieTemplate( 'Top Rated Movies' );
    addMovies( makeUrlForAPI('movie/top_rated') );
}