import app from '@server';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { logger } from '@shared';

// Start the server
const port = Number(process.env.PORT || 3000);

// app.listen(port, () => {
//     logger.info('Express server started on port: ' + port);
// });

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'ssl','server.crt')),
    key: fs.readFileSync(path.join(__dirname, 'ssl','server.key')),
}

https.createServer(httpsOptions, app).listen(port, ()=>{
    console.log(`HTTPS listening on ${port}`)
});