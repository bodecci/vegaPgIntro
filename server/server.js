// requires
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
//pg is required for SQL
const pg = require('pg');
//uses
app.use( express.static( 'server/public/' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
//globals
const port = process.env.PORT || 5001;
const Pool = pg.Pool;
const pool = new Pool({
    database: 'music_library',
    host: 'locahost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});//end pool

//when we connect to database
pool.on('connect', ()=>{
    console.log('connected to DB');
})//end connect

pool.on('error', (err)=>{
    console.log('error with DB:', err);
    
})//end error

// spin up server
app.listen( port, ( req, res )=>{
    console.log( 'server up on:', port );
});

//test route
app.get('/test', (req,res)=>{
    console.log('/test GET hit');
    //create a query
    const queryStrings = 'SELECT*FROM songs;';
    //run the query on the pool
    pool.query(queryString).then((results)=>{
        //send results back to the client
        res.send(results.rows);
    }).catch((err)=> {
        //handle errors
        console.log('error retrieving data:', err);
    })
    //send results back to the client
    //handle any errors
    res.send('growl');
})