
const posts = (function () {
    var url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs';

    function _getPosts() {
        fetch(url).then(function (res) {
            console.log({ response: res });
            if (res.ok) {
                res.json().then(function (data) {
                    let blogWrapper = document.getElementById("demo");
                    let allPosts = data.map(function (item, idx, arr) {
                        console.log("data:item", item);
                        // var title = "";
                        let capitalLetter = item.title.charAt(0).toUpperCase();
                        return (
                            `<div class="blog-posts" id="${item.id}">
                        <h2>${capitalLetter + item.title.slice(1)}</h2>
                        <p>${item.body}</p>
                        <p class="blog-post-meta">Post  <a href="#${item.id}">#${item.id}</a></p>
                        </div>`
                        );
                    })
                        .splice(0, 4)
                        .join("\n");
                    console.debug({ data: data, posts: allPosts });
                    blogWrapper.innerHTML = allPosts;

                });
            }
        }).catch(function (reason) {
            console.log({ catch: reason });
        });
    }
    function _searchPost(q) {
        fetch(URL + `?search=${q}`)
            .then(response => response.json())
            .then(json => {
                let searchResult = document.querySelector("#searchResult");
                let result = json.map(result => (
                    `<li><a href='post.html?${result.id}'>${result.title + "<br>" + result.body}</a></li>`
                )).join("");
                searchResult.style.visibility = "visible";
                searchResult.innerHTML = result;
            })
    }
    return {
        get: _getPosts,
        searchPost: _searchPost
    }
}());


const search = (function () {
    var fn = (function () {
        document.querySelector('#searchLink')
            .addEventListener("click", (e) => {
                let form = document.querySelector("#searchBox");
                let input = document.querySelector("#searchBox > div > input");
                let submitSearch = document.querySelector("#submitSearch");
                if(form.classList.contains('d-none'))
                    form.classList.remove('d-none');
                else
                    form.classList.add('d-none');
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
                submitSearch.addEventListener("click", function () {
                    search.sendSearch();
                });
            });

    });
    return (
        {
            openSearch: fn,
            sendSearch: function () {
                let searchTerm = document.querySelector("#searchTerm").value;
                const posts1 = posts;
                posts1.searchPost(searchTerm);
            },
            updateButton: function () {
                const posts1 = posts;
                document.querySelector("#updateButton")
                    .addEventListener("click", function () { posts1.updateText(0, 50) });
            }
        }
    );
}());


search.openSearch();

posts.get();




/*
function reqListener(evt) {
    console.log(arguments, evt);
    console.debug(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open('GET', 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs');
oReq.send();

*/