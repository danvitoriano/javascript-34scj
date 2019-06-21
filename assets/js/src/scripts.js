const posts = (function () {
    const url = "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs";

    return {
        sendSearch: () => {
            let searchTerm = document.querySelector("#searchTerm").value;

            fetch(url + `?search=${searchTerm}`)
                .then(response => response.json())
                .then(json => {
                    let searchResult = document.querySelector("#searchResult");
                    let result = json.map(item => {
                     return `<li>${item.title}</li>`
                    });
                    //searchResult.style.visibility = "visible";
                    searchResult.innerHTML = result;
                });

            //let searchResult = document.querySelector("#searchResult");
            //searchResult.innerHTML = searchTerm;
        },
        getPosts: () => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        response.json()
                            .then(
                                (data) => {
                                    var blogWrapper = document.getElementById("demo");
                                    var allPosts = data;
                                    blogWrapper.innerHTML = allPosts.map(item => {

                                        var capitalLetter = item.title.charAt(0).toUpperCase();

                                        var title = `<h2 class='blog-post-title'>${capitalLetter + item.title.slice(1)}</h2>`;
                                        var body = `<p>${item.body}</p>`;
                                        var meta = `<p class='blog-post-meta'>Post #<a href='#'>${item.id}</a></p>`;
                                        var blogPost = `<div class='blog-post'>${title + body + meta}</div>`
                                        return blogPost;
                                    })
                                        .splice(0, 4)
                                        .join("");
                                }
                            )
                    }
                });
        }
    }
}());

const search = (function () {
    return {
        openSearch: () => {
            document.querySelector("#searchLink")
                .addEventListener("click", () => {
                    let form = document.querySelector("#searchBox > div");
                    let input = document.querySelector("#searchBox > div > input");
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
                })
        }
    }
}());

posts.getPosts();
search.openSearch();