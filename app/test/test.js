// const db = require("../models");

// For write file and save file to csv
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb"
});

// Show Result from Database ##############################################

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM users", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

// Check Connet Database ##################################################

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "testdb"
// });
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

// Convert Database to .csv #########################################################

// open the MySQL connection
// con.connect(error => {
//   if (error) throw error;

//   // query data from MySQL
//   con.query("SELECT * FROM users", function(error, data, fields) {
//     if (error) throw error;

//     const jsonData = JSON.parse(JSON.stringify(data));
//     console.log("jsonData", jsonData);

    // TODO: export to CSV file
//   });
// });


// Save File to csv

con.connect(error => {
  if (error) throw error;

  // query data from MySQL
  con.query("SELECT * FROM roles", function(error, data, fields) {
    if (error) throw error;

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);

    const json2csvParser = new Json2csvParser({ header: true});
    const csv = json2csvParser.parse(jsonData);

    fs.writeFile("roles.csv", csv, function(error) {
      if (error) throw error;
      console.log("Write to roles.csv successfully!");
    });
  });
});
