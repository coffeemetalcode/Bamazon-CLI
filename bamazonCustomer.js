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

// Connect to MySql. Run Bamazon.
connection.connect(function(err) {
  if (err) throw err;
  bamazon();
});

// I was having difficulty getting modified code from the class assignment to work, so I scrapped it and started with a basic function to test the database connection and get back data.

// testDB();

function testDB() {
  var query = "SELECT product_name, price FROM products WHERE item_id=1;";
  connection.query(query, function(err, res) {
    // console.log("Product: " + res.product_name + " Price: " + res.price);
    console.log("Product: " + res[0].product_name);
    // console.log(res);
  });
}

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
  // prompt user to select a product from the list.
  // Given time, I would make this into a type: 'list' for inquirer which would fetch all items from the store and allow the user to choose an item by highlighing it. Seems like a fun challenge to do this dynamically with a js for loop. Not sure if it's even possible.
    .prompt([
      {
        name: "product",
        type: "input",
        message: "Please specify a product ID."
      },
      // get the quantity.
      {
        name: "quantity",
        type: "input",
        message: "How many?"
      }
    ])
    .then(function(answers) {
      // a MySql query that resists attempts at injection
      var query =
        "SELECT product_name, price, stock_quantity FROM bamazon.products WHERE ?";
      connection.query(query, { item_id: answers.product }, function(err, res) {
        var onHand = res[0].stock_quantity;
        var desired = answers.quantity;
        if (onHand >= desired) {
          // I was already familiar with MySql and SQL qeuries, and I got this to work without having to fiddle with it. Pretty much from here all-the-way down, I was able to just write the rest of the function without having to look at references, which was a good feeling.
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