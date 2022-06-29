const http = require('http')
const fs = require('fs')
const port = 8080

let option = 'index.html'

const server = http.createServer((req, res) => {
    if (req.url !== '/style.css') {
        if (req.url === '/') {
            option = 'index.html'
        } else if (req.url === '/about' || req.url === '/contact-me') {
            option = `${req.url.slice(1)}.html`
        } else {
            option = '404.html'
        }
        fs.readFile(option, function (err, data) {
            if (err) {
                console.error(err)
                return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.write(data)
            res.end()
        })
    }
    else {
        res.setHeader('Content-type', 'text/css');
        res.write(fs.readFileSync('style.css'));
        res.end();
    }

}).listen(port)



