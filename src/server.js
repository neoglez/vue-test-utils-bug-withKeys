import { createApp } from './app.js';
import { renderToString } from 'vue/server-renderer';
import * as Http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

const server = Http.createServer()
  .on('request', async (req, res) => {
    let html = '';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // parse URL
    let addr = req.url;
    const parsedUrl = new URL(addr ? addr : '', `http://${req.headers.host}`);
    // extract URL path
    let pathname = parsedUrl.pathname;

    if (pathname == '/') {
      // render the app
      const app = createApp();
      try {
        html = await renderToString(app);
        if (!html) {
          throw 'Failed SSR';
        }
      } catch (e) {
        html = 'Error';
        console.error('Failed SSR', e);
      }
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <link rel="stylesheet" href="/public/css/index.css">
            <title>Vue App</title>
            <script type="importmap">
              {
                "imports": {
                  "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
                }
              }
            </script>
            <script type="module" src="/src/client.js"></script>
          </head>
          <body>
            
            <noscript>
              <strong>We're sorry but Vue App doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
            </noscript>
            <div id="app">${html}</div>
          </body>
        </html>
        `);
    } else {
      // based on the URL path, extract the file extension. e.g. .js, .doc, ...
      const ext = path.parse(pathname).ext ? path.parse(pathname).ext : '';
      // maps file extension to MIME type
      /**
       * @typedef {Object.<string, string>} ExtMap
       * @type {ExtMap}
       */
      const map = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
      };

      // pathnames are relative to project root
      pathname = path.join(__dirname, '..', pathname);

      fs.access(pathname, fs.constants.R_OK, function (err) {
        if (err) {
          console.error('No Read access');
          res.statusCode = 404;
          res.end(`No Read access to file ${pathname}.!`);
          return;
        } else {
          console.info('OK: file can be read');
        }

        // read file from file system
        fs.readFile(pathname, function (err, data) {
          if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}. Pathname was ${pathname}. Working directory is ` + __dirname);
          } else {
            // if the file is found, set Content-type and send data
            res.setHeader('Content-type', map[ext] || 'text/plain');
            res.end(data);
          }
        });
      });
    }
  })
  .listen(3000, undefined, () => {
    console.log(`Server running on ${JSON.stringify(server.address())}`);
  });
