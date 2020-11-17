var { Pool } = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/pawbook';
const SSL = process.env.NODE_ENV === 'production';
console.log("process.env.NODE_ENV", process.env.NODE_ENV);

class Database {
    constructor () {
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: { rejectUnauthorized: false }
        });

        // error handling
        this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
        });
    }

    query (query, ...args) {
        this._pool.connect((err, client, done) => {
            if (err) throw err;
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];


        console.log("params: ", params);
        console.log("callback: ", callback);

            client.query(query, params, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                    return callback({ error: 'Database error.'}, null);
                }
                callback({}, res.rows);
            });
        });
    }

    end () {
        this._pool.end(); // close the connection
    }
}

module.exports = new Database(); // returning a new instance