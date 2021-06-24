
const titleElem = document.getElementById('title');
const typeElem = document.getElementById('type');
const buttonElem = document.getElementById('button');
const containerElem = document.querySelector('.container');
const containerBodyElem = document.querySelector('.container-body');
const btnShowMovies = document.querySelector('.btn-show-movies');

const wrapMovieElem = document.createElement('div');
const posterElem = document.createElement('img');
const movieBodyElem = document.createElement('div');
const movieTypeElem = document.createElement('span');
const movieNameElem = document.createElement('h3');
const movieDateElem = document.createElement('p');
const buttonDetailsElem = document.createElement('button');

wrapMovieElem.classList.add('wrap-movie');
posterElem.classList.add('poster');
movieBodyElem.classList.add('wrap-movie-body');
movieTypeElem.classList.add('movie-type');
movieNameElem.classList.add('movie-name');
movieDateElem.classList.add('movie-date');
buttonDetailsElem.classList.add('button');

wrapMovieElem.append(posterElem, movieBodyElem);
movieBodyElem.append(movieTypeElem, movieNameElem, movieDateElem, buttonDetailsElem);

let request;
if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
} else {
	request = new ActiveXObject('Microsoft.XMLHTTP');
}

const getMovieList = () => {
	request.onload = () => {
		document.getElementById('error').textContent = '';
		if (request.status === 200 && request.response.Response === 'True') {

			const searchList = request.response.Search;
			for (let item of searchList) {
				const elemClone = wrapMovieElem.cloneNode(true);
				const posterCloneElem = elemClone.querySelector('.poster');
				const typeCloneElem = elemClone.querySelector('.movie-type');
				const nameCloneElem = elemClone.querySelector('.movie-name');
				const dateCloneElem = elemClone.querySelector('.movie-date');
				const buttonCloneElem = elemClone.querySelector('.button');

				posterCloneElem.src = item.Poster;
				typeCloneElem.textContent = item.Type;
				nameCloneElem.textContent = item.Title;
				dateCloneElem.textContent = item.Year;
				buttonCloneElem.textContent = 'Details';
				containerElem.firstElementChild.style.display = 'block';

				containerBodyElem.append(elemClone);

				btnShowMovies.style.display = 'block';
			}
		} else if (request.response.Response === 'False') {
			document.getElementById('error').textContent = 'Movie not found!';
		}

	};
};

buttonElem.onclick = () => {

	const url_1 = `http://www.omdbapi.com/?s=${titleElem.value}&type=${typeElem.value}&apikey=d3f86cad`;
	request.open('get', url_1);
	request.responseType = 'json';
	request.send();

	getMovieList();
};

containerBodyElem.addEventListener('click', (event) => {
	const wrapInfo = document.body.querySelector('.wrap-info');
	const titleInfo = document.body.querySelector('.title-film-info');

	if (wrapInfo) {
		wrapInfo.remove();
		titleInfo.remove();
	}

	if (event.target.tagName === 'BUTTON') {
		const titleInfo = event.target.closest('.wrap-movie-body').firstElementChild.nextElementSibling.textContent;
		const tipeInfo = event.target.closest('.wrap-movie-body').firstElementChild.textContent;
		const url_2 = `http://www.omdbapi.com/?t=${titleInfo}&type=${tipeInfo}&apikey=d3f86cad`;
		request.open('get', url_2);

		request.responseType = 'json';
		request.send();

		let html;
		request.onload = () => {
			if (request.status === 200) {
				console.log(request.response);
				html = `<h2 class="title-film-info">Film info:</h2><div class="wrap-info">
                    <img src="${request.response.Poster}" alt="" id="img-info">
                        <ul>
                            <li><p class="black-color">Title:</p><p class="title-info">${request.response
								.Title}</p></li>
                            <li><p class="black-color">Released:</p><p class="Released-info">${request.response
								.Released}</p></li>
                            <li><p class="black-color">Genre:</p><p class="Genre-info">${request.response
								.Genre}</p></li>
                            <li><p class="black-color">Country:</p><p class="Country-info">${request.response
								.Country}</p></li>
                            <li><p class="black-color">Director:</p><p class="Director-info">${request.response
								.Director}</p></li>
                            <li><p class="black-color">Writer:</p><p class="Writer-info">${request.response
								.Writer}</p></li>
                            <li><p class="black-color">Actors:</p><p class="Actors-info">${request.response
								.Actors}</p></li>
                            <li><p class="black-color">Awards:</p><p class="Awards-info">${request.response
								.Awards}</p></li>
                        </ul>
                </div>
                `;
			}
			btnShowMovies.insertAdjacentHTML('afterEnd', html);
		};
	}
});

let i = 2;
btnShowMovies.addEventListener('click', () => {
	const url_3 = `http://www.omdbapi.com/?s=${titleElem.value}&page=${i}&type=${typeElem.value}&apikey=d3f86cad`;
	request.open('get', url_3);
	request.responseType = 'json';
	request.send();

	getMovieList();
	i++;
});
