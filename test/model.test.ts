import 'jest';
import {DefaultMovieModel} from "../src/app/movie-model";
import 'typescript';


test('model is created', ()=> {
    expect(DefaultMovieModel).toBeDefined();
});

test('connected to the database', ()=> {
	var url = 'http://localhost:3000/';
	//fetch('http://google.com',{method : 'get'}).then((response) => {console.log(response)}).catch((err) => {console.log(err)});
	var expectedResponse = 'Connected successfully to database';
	$.get(url, function (data, status) {
		console.log(status);
        console.log( jest );
        const response = data;
		expect(response).toEqual(expectedResponse);} );

	/*
	fetch( url , {
		method: 'get'
	} ).then( (response) => {
		//console.log(response);

	} ).catch( (err) => {
		console.log( err );
	} );
	*/
});

test('expect', ()=> {
	var result = 'hello';
	expect(result).toEqual('hello');

});