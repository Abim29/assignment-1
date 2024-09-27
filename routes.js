const { log } = require('console');
const fs = require('fs');
const renderHTML = (path, res) => {
    fs.readFile(`.${path}.html`, (err, data) =>{
        if (err){
            res.writeHead(404);
            res.write('Error, file not found.');
        } else {
            res.writeHead(200);
            res.write(data);
        }
        res.end();
    });
}

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        renderHTML('/home', res);
        console.log('Welcome to Home Page');
    } 
    if (url === '/users') {
        renderHTML(url, res)
        console.log('Welcome Users');
    } 
    
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        });
    }
}



module.exports = requestHandler;