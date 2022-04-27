const http = require('http');
const fs = require('fs')
const os = require('os')

const host = '127.0.0.1'
const PORT = 3000;

const info = {
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
    numberOfCPUS: os.cpus().length,
    networkInterfaces: os.networkInterfaces(),
    uptime: os.uptime(),
}

const server = http.createServer((req, res) => {
    const urlPath = req.url;
    if (urlPath === '/' || urlPath === '/index') {
        fs.readFile('./pages/index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data);
            res.end()
        })
    } else if (urlPath === '/about') {
        fs.readFile('./pages/about.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data);
            res.end()
        })
    } else if (urlPath === '/sys') {
        fs.writeFile("osInfo.json", JSON.stringify(info, null, 2), err => {

            if (err) throw err;

        });
        res.writeHead(201, { 'Content-Type': 'text/plain' })
        res.end('Your OS info has been saved successfully!')
    } else {
        fs.readFile('./pages/404.html', (err, data) => {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.write(data);
            res.end()
        })
    }

})

server.listen(PORT, host, () => {
    console.log(`Server running at ${host}:${PORT}`)
})