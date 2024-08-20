import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var app = express();
app.use(express.static(__dirname)); //__dir and not _dir
var port = 3000; // you can use any port
app.listen(port);
console.log('server on' + port);