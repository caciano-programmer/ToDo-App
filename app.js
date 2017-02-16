/**
 * Created by Caciano on 2/15/2017.
 */

const http  = require("http");
const file = require("fs");

const server = http.createServer(function(req, res)
{
    if(req.url === "/")
        file.readFile("./views/login.html", "UTF-8", function(err, html)
        {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
            console.log("works!");
        });
}).listen(3000, function(){
    console.log("the server connected successfully!");
});


