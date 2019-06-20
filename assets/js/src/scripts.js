const url = "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs";

fetch(url)
    .then(response => {
        // console.log("respose=>",response);
        if(response.ok){
            response
                .json()
                .then(data => { 
                    // console.log("data=> ",data);
                    var blogWrapper = document.getElementById("blog-posts");
                    var allPosts = data.map((post,index)=>{
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
                    .splice(0,4)
                    .join("");
                    blogWrapper.innerHTML = allPosts;
                });
        }
    });




// function reqListener() {
//     console.log("reqListener  -> responseText", this.responseText);
//     alert(this.responseText);
// }

// var xmlHttpRequest = new XMLHttpRequest();
// xmlHttpRequest.onload = reqListener;
// xmlHttpRequest.open("GET", url, true);
// xmlHttpRequest.send();