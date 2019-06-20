
// function reqListener() {
//   console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();

// oReq.onload = reqListener;
// oReq.open('get', 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs');
// oReq.send();

const posts = (() => {
  function appendElement(dom, data) {
    let capitalized = data.title.charAt(0).toUpperCase();

    const blogPost = `
      <div class='blog-post'>
        <h2 class='blog-post-title'>${capitalized + data.title.slice(1)}</h2>
        <p class='blog-post-meta'><a href='#'>Post #${data.id}</a></p>
        <p>${data.body}</p>
        <p>${data.body}</p>
        <p>${data.body}</p>
        <p>${data.body}</p>
        <p>${data.body}</p>
      <div>`;
    
    dom.insertAdjacentHTML('beforeend', blogPost);
  }

  function appendLiElement(dom, data) {
    let capitalized = data.title.charAt(0).toUpperCase();
    const blogPost = `<li>${capitalized + data.title.slice(1)}</li>`;
    dom.insertAdjacentHTML('beforeend', blogPost);
  }
  
  function fetchPosts() {
    const url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs';
    fetch(url)
      .then(response => response.ok ? (response.json()
      .then(data => data.splice(0, 4).forEach(element => appendElement(document.getElementById("demo"), element))))
      : console.log('Error'));
  }

  function fetchPostsByTerm(seartchTerm = '') {
    const url = `https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs?search=${seartchTerm}`;
    fetch(url)
      .then(response => response.ok ? (response.json()
      .then(data => {
        data.splice(0, 4).forEach(element => appendLiElement(document.getElementById("search-result"), element))
      }))
      : console.log('Error'));
  }

  return {
    getPosts: fetchPosts,
    getPostsByTerm: fetchPostsByTerm
  }
})();

const search = (() => {

  this.sendSearch = () => {
    const searchTerm = document.querySelector("#search-term").value;
    posts.getPostsByTerm(searchTerm);
  }

  return {
    
    openSearch: () => {
      document.querySelector("#search-link")
        .addEventListener('click', () => {
          const form = document.querySelector("#search-box > div");
          const input = document.querySelector("#search-box > div > input");
          const submitSearch = document.querySelector("#submit-search");

          form.style.display = form.style.display == 'block' ? 'none' : 'block';
          form.animate(
            [
                // keyframes
                { transform: "translateX(150px)" },
                { transform: "translateX(0px)" }
            ],
            {
                // timing options
                duration: 300,
                iterations: 1
            }
          );
          input.focus()
          submitSearch.addEventListener('click', () => this.sendSearch());
        });
    }
  }
})();

search.openSearch();

posts.getPosts();