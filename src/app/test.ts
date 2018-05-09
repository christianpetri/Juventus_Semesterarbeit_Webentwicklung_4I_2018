import {apiKey , databaseURL} from "./constants";

export function renderTestPage(){
    $( '#content' ).empty();
    fetch( databaseURL , {
        method: 'get'
    } ).then( (response) => {
        if (response.status == 200) {
            $( '<div>' ).appendTo( '#content' ).text( 'Backend is online' );
        }
        return response.json();
    } ).then( (response) => {
        $( '<div>' ).appendTo( '#content' ).text( response.response );
    } ).catch( (err) => {
        $( '<div>' ).appendTo( '#content' ).text( 'Backend offline. (Restart Backend with npm run start)' );
        console.log( err );
    } );

    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&query=test';
    fetch( url , {
        method: 'get'
    } ).then( (response) => {
        console.log( response.status );
        if (response.status == 200) {
            $( '<div>' ).appendTo( '#content' ).text( 'Connected to the TMDb API' );
        }
        if (response.status == 401) {
            $( '<div>' ).appendTo( '#content' ).text( 'Not connected to the TMDb API (Do you have the correct API Key?' );
        }
    } ).catch( (err) => {
        $( '<div>' ).appendTo( '#content' ).text( 'Not connected to the TMDb API (Are you offline?)' );
        console.log( err );
    } );
}