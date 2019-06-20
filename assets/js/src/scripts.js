
// function reqListener() {
//     console.log("reqListener  -> responseText", this.responseText);
//     alert(this.responseText);
// }
// var xmlHttpRequest = new XMLHttpRequest();
// xmlHttpRequest.onload = reqListener;
// xmlHttpRequest.open("GET", url, true);
// xmlHttpRequest.send();

const posts = (function () {

    const url = "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs";

    return {
        getPosts: function () {
            fetch(url)
                .then(response => {
                    // console.log("respose=>",response);
                    if (response.ok) {
                        response
                            .json()
                            .then(data => {
                                // console.log("data=> ",data);
                                var blogWrapper = document.getElementById("blog-posts");
                                var allPosts = data.map((post, index) => {
                                    //console.log("post=>",post);
                                    var postCreatedAt = new Date(post.createdAt).toDateString();
                                    var capitalLetter = post.title.charAt(0).toUpperCase();
                                    return `
                                <div class="blog-post">
                                    <h2 class="blog-post-title">${capitalLetter + post.title.slice(1)}</h2>
                                    <p class="blog-post-meta">Post#<a href="#">${post.id}</a> - ${postCreatedAt}</p>
                                    <hr>
                                    <p>${post.body} ${post.body} ${post.body} ${post.body} ${post.body} ${post.body}</p>
                                </div>                       
                            `;
                                })
                                    .splice(0, 4)
                                    .join("");
                                blogWrapper.innerHTML = allPosts;
                            });
                    }
                });
        },    
        sendSearch: () => {
            console.log("sendSearch","foi chamado");
            let searchTerm = document.querySelector("#searchTerm");
            fetch(url + `?search=${searchTerm.value}`)
                .then(response=>response.json())
                .then(json=>{
                    let searchResults = document.querySelector("#searchResults");
                    let result = json.map(item=> {
                         return `<li>${item.title}</li>`;   
                    });
                    searchResults.innerHTML = result;
                });
        }
    }
}());

const search = (function () {
    return {
        openSearch: () => {
            document.querySelector("#searchLink")
                .addEventListener("click", () => {
                    let form = document.querySelector("#searchBox");
                    let input = document.querySelector("#searchTerm");
                    let submitSearch = document.querySelector("#submitSearch");

                    form.style.display = "block";
                    form.animate(
                        [
                            // keyframes
                            { transform: "translateX(15px)" },
                            { transform: "translateX(0px)" }
                        ],
                        {
                            // timing options
                            duration: 300,
                            iterations: 1
                        }
                    );
                    input.focus();
                    submitSearch.addEventListener("click", () => {
                        posts.sendSearch();
                    });
                });
        }
    };
}());
posts.getPosts();
search.openSearch();