const posts = (function () {
    const url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs';

    return {
        get_posts: function(){
            fetch(url)
            .then(function(response){
                if (response.ok){
                    response.json()
                    .then(
                        function(data){
                            var blogWrapper = document.getElementById("demo");
                            var allPosts = data.map(item => {
                                var capitalLetter = item.title.charAt(0).toUpperCase(0);
                                
                                var title = `<h2 ='blog-post-title'>${capitalLetter + item.title.slice(1)}</h2>`;
                                var meta = `<p class='blog-post-meta'>Post #${item.id}</p>`;
                                var body = `<p>${item.body}</p>`;
                                
                                var blogPost = `<div class='blog-post'>${title + meta + body + '<hr/>' + body}</div>`;
    
                                return blogPost;
                            })
                            .splice(0,4)
                            .join("")
                            
                            blogWrapper.innerHTML = allPosts;
                    })
                }
            })
        }
    }
})()

const search = (function () {
    const url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs';

    return {
        sendSearch: function(){
            console.log("Search foi chamada");
            let searchTerm = document.querySelector("#searchTerm").value;
            fetch(url + `?search=${searchTerm}`)
            .then(response => response.json())
            .then(json => {
                let searchResult = document.querySelector("#searchResult");
                let result = json.map(item => (
                    `<li>${item.title}</li>`
                )).join()
                searchResult.innerHTML = result;
            })
        },
        openSearch: function(){
            document.querySelector('#searchLink')
            .addEventListener('click', () => {
                let form = document.querySelector("#searchBox > div");
                let input = document.querySelector("#searchBox > div > input");
                let submitSearch = document.querySelector("#searchBox > div > #submitSearch");

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
                    this.sendSearch();
                })
            });
        }
    }
})()

search.openSearch();
posts.get_posts();