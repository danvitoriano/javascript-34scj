
// function reqListener() {
//   console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();

// oReq.onload = reqListener;
// oReq.open('get', 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs');
// oReq.send();

function appendElement(dom, data) {
  dom.insertAdjacentHTML('beforeend', `<h4>${data.title}</h4>`);
  dom.insertAdjacentHTML('beforeend', `<p>${data.body}</p>`);
}

const url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs';
fetch(url)
  .then(response => response.ok ? (response.json()
  .then(data => data.forEach(element => appendElement(document.getElementById("demo"), element))))
  : console.log('Error'));