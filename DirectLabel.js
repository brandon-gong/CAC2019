const fetch = require("node-fetch")

let opts = {"requests":[{"image":{
        "content":"<base64 string here>"
    },"features":[{"type":"LABEL_DETECTION","maxResults":10}]}]}
  

fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAr3tUJjFH9fXUfu7yA_o2KRWYRcfjC8Nk', {
    method: 'post',
    body: JSON.stringify(opts)
}).then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(JSON.stringify(data));
});
