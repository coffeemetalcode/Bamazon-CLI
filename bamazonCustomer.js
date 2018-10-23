// requires
var mysql = require("mysql");
var inquirer = require("inquirer");

// set connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "david",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  listProd();
  // bamazon();
});

// the listProd function
function listProd() {
  // fetch all the available store items from db here and display them to the user
  connection.query("SELECT * FROM products", function(error, result) {
    for (var i = 0; i < result.length; i++) {
      // TODO: Figure out a way to improve the output formatting
      console.log(`ID: ${result[i].item_id}, Item: ${result[i].product_name}, Department: ${result[i].department_name}, Price: ${result[i].price}`);
    }
  });
}

// the bamazon function
function bamazon() {
  inquirer.prompt({
    name: ""
  });
}
