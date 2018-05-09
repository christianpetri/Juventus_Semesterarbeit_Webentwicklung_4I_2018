import {addMovie , makeUrlForAPI , renderMovies , renderStandardMovieTemplate} from "./common";

export function renderFavoriteMoviePage(){
    renderStandardMovieTemplate( 'Favorite Movie' );
    getFavoriteMovies( 'http://localhost:3000/moviefavorite' );
}

function getFavoriteMovies(url: string) {
    fetch( url )
        .then( (response) => response.json())
        .then( (responses) => {
            let i = 0;
            for (const response of responses) {
                i++;
                if (i == responses.length) {
                    addMovie( makeUrlForAPI('movie/' + response.id)).then( () => {
                        renderMovies();
                    });
                } else {
                    addMovie( makeUrlForAPI('movie/' + response.id));
                }
            }
        } ).catch( (err) => {console.warn( err );
    } );
}