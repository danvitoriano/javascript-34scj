const url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs';

fetch(url)
    .then(function(response){
        if (response.ok){
            response.json()
                .then(
                    function(data){
                        var blogWrapper = document.getElementById("demo");
                        var allPosts = data.map(item => {
                            var title = `<h2 ='blog-post-title'>${item.title}</h2>`;
                            var body = `<p>${item.body}</p>`;
                            var meta = `<p class='blog-post-meta'>Post #<a href='#'/>${item.id}</p>`;
                            var blogPost = `<div class='blog-post'>${title + meta + '<hr/>' + body}</div>`;
                            return blogPost;
                        })
                        .join("")
                        
                        blogWrapper.innerHTML = allPosts;
                    }
                )
        }
})

//function reqListener() {
//    console.log(this.responseText);
//}
//var oReq = new XMLHttpRequest();
//oReq.onload = reqListener;
//oReq.open('GET', 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs', true);
//oReq.send();