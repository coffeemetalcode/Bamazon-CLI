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
  bamazon();
});

// testDB();

function testDB() {
  var query = "SELECT product_name, price FROM products WHERE item_id=1;";
  connection.query(query, function(err, res) {
    // console.log("Product: " + res.product_name + " Price: " + res.price);
    console.log("Product: " + res[0].product_name);
    // console.log(res);
  });
}

// bamazon();

// the listProd function
function listProd() {
  // fetch all the available store items from db here and display them to the user
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      // TODO: Figure out a way to improve the output formatting
      console.log(
        `ID: ${res[i].item_id}, Item: ${res[i].product_name}, Department: ${
          res[i].department_name
        }, Price: ${res[i].price}`
      );
    }
  });
}

// the bamazon function
function bamazon() {
  listProd();
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "Please specify a product ID."
      },
      {
        name: "quantity",
        type: "input",
        message: "How many?"
      }
    ])
    .then(function(answers) {
      var query =
        "SELECT product_name, price, stock_quantity FROM bamazon.products WHERE ?";
      connection.query(query, { item_id: answers.product }, function(err, res) {
        var onHand = res[0].stock_quantity;
        var desired = answers.quantity;
        if (onHand >= desired) {
          connection.query(
            `UPDATE products SET stock_quantity=${onHand -
              desired} WHERE item_id=${answers.product}`
          );
          console.log(
            `${desired} ${
              res[0].product_name
            } added to your cart for ${desired *
              res[0].price}. Thank you for shopping.`
          );
        } else {
          console.log(
            "Sorry, there aren't enough " + res[0].product_name + "."
          );
        }
      });
    });
}