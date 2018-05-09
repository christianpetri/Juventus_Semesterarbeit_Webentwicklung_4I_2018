import {addMovies , makeUrlForAPI , renderStandardMovieTemplate} from "../common";

export function renderPopularMoviesPage() {
    renderStandardMovieTemplate( 'Popular Movies' );
    addMovies( makeUrlForAPI('movie/popular') );
}