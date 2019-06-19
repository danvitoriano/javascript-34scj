const url = 'https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs';

fetch(url)
    .then(function(response){
        if (response.ok){
            response.json()
                .then(
                    function(data){
                        var blogWrapper = document.getElementById("demo");
                        var allPosts = data.map(item => (
                                console.log("data => ", item)
                            )
                        )
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