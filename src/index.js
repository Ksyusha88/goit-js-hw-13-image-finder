import './styles.css';
import articlesTpl from "./tamplete/articles.hbs";
import apiService from './js/apiService.js';
import * as basicLightbox from 'basiclightbox';
require('basiclightbox/dist/basicLightbox.min.css');
// import { error, success } from '@pnotify/core/dist/PNotify.js';
// const { defaults } = require('@pnotify/core');

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery-container'),
    loadMoreBtn: document.querySelector('.js-load-more'),
    galleryContainer: document.querySelector('.gallery-container'),
    query: document.querySelector('.query')
}

refs.searchForm.addEventListener('submit', event =>{
    event.preventDefault();
    const form = event.currentTarget;
    apiService.query = form.elements.query.value

    refs.gallery.innerHTML = " ";
    form.reset(); //чистим форму 

    apiService.resetPage();
    refs.loadMoreBtn.classList.add('is-hidden');


    apiService.fetchGallery().then(hits =>{
        updatePic(hits);
    refs.loadMoreBtn.classList.remove('is-hidden');
    scrollElem();   
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

function modalLightbox() {
    const instance = basicLightbox.create(`
      <div class="modal">
      <img src="${event.target.dataset.source}" >
      </div>
  `);
    instance.show();
  }
  refs.gallery.addEventListener('click', modalLightbox);

  function scrollElem() {
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    }

  

  