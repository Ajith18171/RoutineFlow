// // import mysql from "mysql2/promise";
// // import dotenv from "dotenv";

// // dotenv.config();


// // const db = mysql.createPool({

// //   host: process.env.DB_HOST,

// //   user: process.env.DB_USER,

// //   password: process.env.DB_PASSWORD,

// //   database: process.env.DB_NAME,


// //   dateStrings: true,

// //   timezone: "local",


// //   waitForConnections: true,

// //   connectionLimit: 10,

// //   queueLimit: 0

// // });



// // db.getConnection()

// // .then(connection=>{

// //   console.log("✅ MySQL Connected Successfully");

// //   connection.release();

// // })

// // .catch(err=>{

// //   console.log("❌ MySQL Connection Failed");

// //   console.log(err);

// // });



// // export default db;

// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// const db = mysql.createPool({

// host: process.env.DB_HOST,

// user: process.env.DB_USER,

// password: process.env.DB_PASSWORD,

// database: process.env.DB_NAME,

// dateStrings:true,

// timezone:"local",

// waitForConnections:true,

// connectionLimit:10,

// queueLimit:0

// });


// db.getConnection()
// .then(connection=>{

// console.log("✅ MySQL Connected Successfully");

// connection.release();

// })
// .catch(err=>{

// console.log("❌ MySQL Connection Failed");
// console.log(err);

// });


// export default db;

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ...(process.env.DB_SSL_CA
    ? {
        ssl: {
          ca: process.env.DB_SSL_CA
        }
      }
    : {}),

  dateStrings: true,
  timezone: "local",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection()
  .then((connection) => {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  })
  .catch((err) => {
    console.log("❌ MySQL Connection Failed");
    console.log(err);
  });

export default db;
