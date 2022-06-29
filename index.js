const http = require('http')
const fs = require('fs')
const port = 8080

let option = 'index.html'

const server = http.createServer((req, res) => {
    const curLink = req.url
    console.log(curLink)
    if (curLink !== '/style.css') {
        if (curLink === '/') {
            option = 'index.html'
        } else if (curLink === '/about' || curLink === '/contact-me') {
            option = `${curLink.slice(1)}.html`
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



