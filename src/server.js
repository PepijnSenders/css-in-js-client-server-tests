import React from 'react';
import Hapi from 'hapi';
import cxs from 'cxs';
import inert from 'inert';
import path from 'path';
import Root from './common';
import { renderToString } from 'react-dom/server';

const server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000,
});

server.route({
    method: 'GET',
    path: '/',
    handler(request, reply) {
        const html = renderToString(<Root />);

        reply(`
            <html>
                <head>
                    <style>${cxs.css}</style>
                </head>
                <body>
                    Hello Pep

                    ${html}

                    <script type="text/javascript" src="/dist/bundle.js"></script>
                </body>
            </html>
        `);

        cxs.reset();
    },
});

server.register(inert, (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: path.join(__dirname, '..', 'public'),
            },
        },
    });
});

server.start(err => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});
