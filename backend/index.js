const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const pool = require('./config/db.js');

require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

//TEST  MySQL DB connection
/*
pool.getConnection((err, conn) => {
    if(err) {
        console.log(err);
        throw err;
    }
    const user = 'sebastiaanLabijn';
    const fullname = 'Sebastiaan Labijn';
    const qry = 'INSERT INTO users (username, fullname, entry_date) VALUES (?, ?, NOW())';
    conn.query(qry, [user, fullname], (err, result) => {
        conn.release();
        if(err) {
            console.log(err);
            throw err;
        }
        console.log(result);
    });
});
*/

const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});