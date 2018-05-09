import {addMovies , makeUrlForAPI , renderStandardMovieTemplate} from "./common";

export function renderUpcomingMovies(){
    renderStandardMovieTemplate( 'Upcoming Movies' );
    addMovies( makeUrlForAPI('movie/upcoming'));
}
