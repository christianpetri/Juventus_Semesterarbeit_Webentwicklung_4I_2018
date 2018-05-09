
import {apiKey} from "./constants";
import {addMovie , renderMovies , renderStandardMovieTemplate} from "./common";


export function renderFavoriteMoviePage(){
    renderStandardMovieTemplate( 'Favorite Movie' );
    getfavoriteMovies( 'http://localhost:3000/moviefavorite' );
}

function getfavoriteMovies(url: string) {
    fetch( url , {
        method: 'get'
    } ).then( (response) => response.json())
        .then( (responses) => {
            //model.resetMovieList();
            let i = 0;
            for (const response of responses) {
                i++;
                if (i == responses.length) {
                    addMovie( 'http://api.themoviedb.org/3/movie/' + response.id + '?api_key=' + apiKey ).then( () => {
                        renderMovies();
                    } );
                } else {
                    addMovie( 'http://api.themoviedb.org/3/movie/' + response.id + '?api_key=' + apiKey );
                }
            }
        } ).catch( (err) => {
        console.log( err );
    } );
}