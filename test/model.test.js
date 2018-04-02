
//import model from '../src/app/movie-model'
import {DefaultMovieModel} from "../src/app/movie-model";
import 'jest';


test('model is created', ()=> {
	expect(DefaultMovieModel).toBeDefinded;
});