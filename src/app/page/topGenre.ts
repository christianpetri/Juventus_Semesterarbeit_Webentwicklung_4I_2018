import {addMovies , makeUrlForAPI} from "../common";

export function renderTopGenrePage() {
    $( '#content' ).empty();
    $( '<div>' ).appendTo( '#content' ).addClass( 'row' ).attr( 'id' , 'mainGridBodyGenre' );
    $( '<div>' ).appendTo( '#mainGridBodyGenre' ).addClass( 'col-sm-5' ).attr( 'id' , 'leftSide' );
    $( '<div>' ).appendTo( '#leftSide' ).addClass( 'row' ).attr( 'id' , 'nestedSequence' );
    $( '<div>' ).appendTo( '#nestedSequence' ).attr( 'id' , 'genres' ).addClass( 'col-sm-4' );
    $( '<h1>' ).appendTo( '#genres' ).text( 'Genre' ).addClass( 'media-heading' ).addClass( 'page-header-blue' );
    $( '<div>' ).appendTo( '#nestedSequence' ).attr( 'id' , 'titleTopMovies' ).addClass( 'col-md-8' );
    $( '<div>' ).appendTo( '#titleTopMovies' ).attr( 'id' , 'resultMovieListTitle' );
    $( '<div>' ).appendTo( '#titleTopMovies' ).attr( 'id' , 'resultMovieList' );
    $( '<div>' ).appendTo( '#mainGridBodyGenre' ).attr( 'id' , 'resultMovieListDetail' ).addClass( 'col-md-7' );

    fetch(makeUrlForAPI('genre/movie/list'))
        .then( response => response.json())
        .then( response => {
            const genre = response.genres;
            for (let i = 0; i < genre.length; i++) {
                let genreID: number = genre[i].id;
                $( '<div>' ).appendTo( '#genres' )
                    .text( genre[i].name )
                    .addClass( 'movie-list-item' )
                    .on( 'click' , () => {
                        $( '#resultMovieListTitle' ).empty();
                        doSearchForGenres(genreID);
                        $( '<h1>' ).appendTo( '#resultMovieListTitle' ).text( genre[i].name ).addClass( 'media-heading' ).addClass( 'page-header-blue' );
                    } );
            }
        }).catch( error => console.warn( error ) );
}

function doSearchForGenres(genreID: number) {
    $( '#resultMovieListDetail' ).empty();
    $( '<h1>' ).appendTo( '#resultMovieList' ).text( '' ).addClass( 'media-heading' );
    //const url = 'https://api.themoviedb.org/3/discover/movie?&api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + genreID;

    //addMovies( url );
    addMovies( makeUrlForAPI('discover/movie' , '&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=' + genreID) );
}

