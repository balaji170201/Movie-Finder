const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc334763b2728667d188260824d8070b&page=1`;
const img_path = `https://image.tmdb.org/t/p/w1280`;
const search_url = `https://api.themoviedb.org/3/search/movie?api_key=cc334763b2728667d188260824d8070b&query="`;

let search = document.getElementById('search');
let form = document.getElementById('form');
let main = document.getElementById('main');

async function getMovies(url){
    let response = await fetch(url);
    let data = await response.json();
    
    console.log(data.results);
    displayMovies(data.results);
}
getMovies(url);

function displayMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview} = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            
            <img src="${img_path + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByVote(vote_average)}"><h4>${vote_average}</h4></span>
            </div>
            <div class="movie-overview">
                <h3>Overview</h3>
                ${overview}
            </div> `;

            main.appendChild(movieElement);
        })
}

function getClassByVote(vote){
    if(vote >= 8){
        return 'green';
    }
    else if(vote >= 6 && vote < 8){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm && searchTerm!= " "){
        getMovies(search_url + searchTerm);
        search.value = '';
    }
    else{
        window.location.reload();
        console.log("No movies found");
    }
})