const http = require('http');
const url = require('url');
const queryString = require('querystring');
let static = require('node-static');

let fileServer = new static.Server('.');

const onDigits = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache'
    });

    const write = () => {
        i++;

        if (i === 4) {
            res.write(`event: bye \n data: bye-bye\n\n`);
            clearInterval(timer);
            res.end();
            return;
        }

        res.write(`data: ${i} \n\n`);
    }

    let i = 0;
    let timer = setInterval(write, 100);
    write();
}

const accept = (req, res) => {
    if (req.url == '/digits') {
        onDigits(req, res);
        return;
    }

    fileServer.serve(req, res);
}

if (!module.parent) {
    http.createServer(accept).listen(8080);
} else {
    exports.accept = accept;
}  