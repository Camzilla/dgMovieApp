import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie/movie';

const SEARCH_API_ENDPOINT = 'https://www.omdbapi.com/?s=Batman';
const DETAIL_API_ENDPOINT = 'https://www.omdbapi.com/?i=';
const API_KEY = '&apikey=f143f2af';

@Injectable({
    providedIn: 'root'
})
export class MovieApiService {

    constructor(private http: HttpClient) { }

    searchMovies() {
        return this.http.get(SEARCH_API_ENDPOINT + API_KEY);
    }
    getMovieDetailsById(id: string) {
        return this.http.get<Movie>(DETAIL_API_ENDPOINT + id + API_KEY);
    }
}
