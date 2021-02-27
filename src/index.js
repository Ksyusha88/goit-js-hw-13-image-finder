import './styles.css';
import articlesTpl from "./tamplete/articles.hbs";
import apiService from './js/apiService.js';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery-container'),
    loadMoreBtn: document.querySelector('.js-load-more')
}

refs.searchForm.addEventListener('submit', event =>{
    event.preventDefault();
    const form = event.currentTarget;
    apiService.query = form.elements.query.value

    refs.gallery.innerHTML = " ";
    form.reset(); //чистим форму 

    apiService.resetPage();

    apiService.fetchGallery().then(hits =>{
        updatePic(hits);
    });
});


function updatePic(hits) {
    const markup = articlesTpl(hits)
    console.log(markup);
    refs.gallery.insertAdjacentHTML('beforeend', markup)
}




refs.loadMoreBtn.addEventListener('click', () =>{
    apiService.fetchGallery(searchQuery).then(hits => {
        updatePic(hits);
    });
});