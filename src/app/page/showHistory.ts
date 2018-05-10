import {makeUrlForBackend , renderStandardMovieTemplate} from "../common";

export function renderShowHistoryPage() {
    $( '#content' ).empty();
    renderStandardMovieTemplate( 'Search History' );

    getMovieHistoryTemplate( '' , 'Last 5 search queries' , makeUrlForBackend( 'movie/query/sort/last/5/' ) );
    $( '<div>' ).appendTo( '#resultMovieList' ).text( 'Total Results: ' );
    getMovieHistoryTemplate( 'Total Results' , 'descending' , makeUrlForBackend( 'movie/query/sort/totalresults/desc' ) );
    getMovieHistoryTemplate( 'Total Results' , 'ascending' , makeUrlForBackend( 'movie/query/sort/totalresults/asc' ) );
    $( '<div>' ).appendTo( '#resultMovieList' ).text( 'Search Date: ' );
    getMovieHistoryTemplate( 'Search Date' , 'descending' , makeUrlForBackend( 'movie/query/sort/date/desc' ) );
    getMovieHistoryTemplate( 'Search Date' , 'ascending' , makeUrlForBackend( 'movie/query/sort/date/asc' ) );

    $( '<form>' ).appendTo( '#resultMovieList' ).attr( 'id' , 'searchDate' );
    $( '<div>' ).appendTo( '#searchDate' ).text( 'Search queries from ' );
    $( '<input>' ).appendTo( '#searchDate' ).attr( 'type' , 'date' ).attr( 'id' , 'searchDateFrom' ).prop( 'required' , true );
    $( '<div>' ).appendTo( '#searchDate' ).text( ' until now ' );
    $( '<input>' ).attr( 'type' , 'submit' ).attr( 'value' , 'submit' ).appendTo( '#searchDate' ).on( 'click' , () => {
        let date: any = $( '#searchDateFrom' ).val();
        if (date != '') {
            let dateFrom: any = new Date( date ).getTime();
            getMovieSearchHistory( makeUrlForBackend( 'movie/query/date/from/this/date/until/now' , 'timestampDateFrom=' + dateFrom ) );
            $( '#searchQueryTitle' ).empty();
            $( '<h2>' ).appendTo( '#searchQueryTitle' ).text( ' Date' );
        }
    } );

    $( '<div>' ).appendTo( '#resultMovieListDetail' ).attr( 'id' , 'searchQueryTitle' );
    $( '<h2>' ).appendTo( '#searchQueryTitle' ).text( ' Date' ).text( 'Last 5 search queries' );
    getMovieSearchHistory( makeUrlForBackend( 'movie/query/sort/last/5/' ) );
    $( '<table>' ).appendTo( '#resultMovieListDetail' ).addClass( 'table table-striped' ).attr( 'id' , 'searchHistory' );
    $( '<thead>' ).appendTo( '#searchHistory' ).html( '<tr><th scope=\'col\'>Search</th><th scope=\'col\'>Total Results</th><th scope=\'col\'>Search Date / Time</th></tr>' );
    $( '<tbody>' ).appendTo( '#searchHistory' ).attr( 'id' , 'searchHistoryBody' );

}

function getMovieHistoryTemplate(topic: string , description: string , url: string) {
    $( '<div>' ).appendTo( '#resultMovieList' ).html( description ).addClass( 'movie-list-item' ).css( 'margin-right' , '15px' ).on( 'click' , () => {
        getMovieSearchHistory( url );
        $( '#searchQueryTitle' ).empty();
        $( '<h2>' ).appendTo( '#searchQueryTitle' ).text( topic + ' ' + description );
    } );
}

function getMovieSearchHistory(url: string) {
    $( '#searchHistoryBody' ).empty();
    fetch( url )
        .then( (response) => response.json() )
        .then( (responses) => {
            for (const response of responses) { // Going over the results
                //console.log( response.searchString );
                let title = response.searchString;
                let total = response.totalResults;
                let date = new Date( response.ts );
                let dateString = date.toLocaleString();
                $( '<tr>' ).appendTo( '#searchHistoryBody' ).html( '<th scope=\'row\'>' + title + '</th><td>' + total + '</td><td>' + dateString + '</td>' );
            }
        } ).catch( (err) => {
        console.log( err );
    } );
}

