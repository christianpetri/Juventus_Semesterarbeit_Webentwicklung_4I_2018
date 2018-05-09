import {apiKey} from "./constants";
import {addMovies} from "./common";

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

    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US';
    $.get( url , function (data) { // URL with movies that meet the search criteria
        const genre = data.genres;
        for (let i = 0; i < genre.length; i++) {
            const genreID: number = genre[i].id;
            $( '<div>' ).appendTo( '#genres' )
                .text( genre[i].name )
                .addClass( 'movie-list-item' )
                .on( 'click' , () => {
                    $( '#resultMovieListTitle' ).empty();
                    $( '<h1>' ).appendTo( '#resultMovieListTitle' ).text( genre[i].name ).addClass( 'media-heading' ).addClass( 'page-header-blue' );
                    doSearchForGenres( {genreID: genreID} );
                } );
        }
    } );
}

function doSearchForGenres(parameters: { genreID: any }) {
    let genreID = parameters.genreID;
    //model.resetMovieList();
    $( '#resultMovieListDetail' ).empty();
    $( '<h1>' ).appendTo( '#resultMovieList' ).text( '' ).addClass( 'media-heading' );
    const url = 'https://api.themoviedb.org/3/discover/movie?&api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + genreID;
    addMovies( url );
}

