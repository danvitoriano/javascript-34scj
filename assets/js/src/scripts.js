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