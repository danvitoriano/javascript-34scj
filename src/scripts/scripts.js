
// function reqListener() {
//   console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();

// oReq.onload = reqListener;
// oReq.open('get', 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs');
// oReq.send();

const posts = (function() {
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
  
  function fetchPosts() {
    const url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs';
    fetch(url)
      .then(response => response.ok ? (response.json()
      .then(data => data.splice(0, 4).forEach(element => appendElement(document.getElementById("demo"), element))))
      : console.log('Error'));
  }

  return {
    getPosts: fetchPosts
  }
}().getPosts())