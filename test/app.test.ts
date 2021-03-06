import 'jest';
import {DefaultMovieModel} from '../src/app/Movie-Model';
import {Movie} from '../src/app/Movie';

let model = new DefaultMovieModel();

test('model is created', ()=> {
    expect(model).toBeDefined();
});

test('add Movie to []', ()=> {
    let movie = new Movie('13','Movie Title','20181402','overview', '10','100','http://image');
    model.resetMovieList();
    model.addMovie(movie);
    for (const movie of model.movieList) { //Show all the movies from the model
             expect(movie.title).toBe('Movie Title');
             expect(movie.id).toBe('13');
    }
});

