const apiKey = '20422973-b315f24465f3cd4058b26d580';

//   function fetchGallery(searchQuery) {
    
//     const url = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&orientation=horizontal&q=${searchQuery}&&per_page=12`;
    
//     return fetch(url)
//         .then(res => res.json())
//         .then(({hits}) => hits)
//         .catch(error => console.log(error))
// };

// export default fetchGallery;


export default {
  searchQuery: " ",
  page: 1,

  fetchGallery(searchQuery) {
    
    const url = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12`;
    
    return fetch(url)
        .then(res => res.json())
        .then(({hits}) => {
          this.page += 1;
          return hits;
        });
        // .catch(error => console.log(error))
},
get query(){
  return this.searchQuery;
},

set query(newQuery){
  this.searchQuery = newQuery;
},

resetPage(){
  this.page = 1;
},

};