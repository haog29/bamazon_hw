require("dotenv").config()
var inquirer = require('inquirer')

// Sets up connection to SQL server
const db = require('./config/keys')

//Inventory count :
var inventory = 0;

// Connecting to bamazon_db.....
db.connect(function(e) {
    if (e) throw e
    new Promise(function(resolve, reject) {

        //show all of the avail products
    db.query('SELECT * FROM products', function(e, r) {

            if (e) reject(e)
            resolve(r)

            console.log('=================== Bamazon Store ===================')
            console.log('|             "We got it all for you."               |')
            console.log('|               Available Products:                  |')
            console.log('=====================================================')

        })

        // log's the product's inventory :

    }).then(function(output) {

        output.forEach(function(prod) {
            inventory++;
         
            console.log('\nItem ID: ' + prod.item_id + 
                        ' | Product Name: ' + prod.product_name + 
                        ' | Price: ' + prod.price +'\n');
            console.log('_____________________________________________________')
        })


    }).then(function() {
        return cmd();

    }).catch(function(e) {
        console.log(e);

    })

})



// command to open bamazon...

function cmd() {

    inquirer.prompt([{
        name: 'open',
        message: 'Would you like to shop with us today?',
        type: 'list',
        choices: ['Yes', 'No']

    }]).then(function(ans) {

        // Customer choices Yes or No:
        //if Yes,

        if (ans.open === 'Yes') {

          itemChoice()

        } else {

        //if customer picks No... 
            console.log('______________________________________________')
            console.log('                                               ')
            console.log('     Comeback and shop with us again!')
            console.log(` We'll have more stocks and Goodies to come..`)
            console.log(`      Hope you liked the transaction!`)
            console.log('______________________________________________')
            process.exit()
            return

        }

    })

}



// product choices :

function itemChoice() {

    return inquirer.prompt([{
        name: 'item',
        message: 'Please enter the item number of the product you wish to purchase..',
        type: 'input',

        // Checks if the item number exists

        validate: function(num) {

            if (!num === false  && num <= inventory) 
            {
                return true;

            } else {

       console.log('\n\n Sorry, but that Number does not exists, Please check the number');

                return false;

            }

        }

    }, 
    {
        name: 'quantity',
        message: 'How many would you like to purchase?',
        type: 'input',

        validate:function(num) {

            if (!num === false) {

                return true;

            } else {
                console.log('\nSorry, You have entered a wrong number.');
                return false;

            }

        }

        //updates new data from mySQL bamazon database...
 
    }]).then(function(ans) {

        return new Promise(function(resolve, reject) {

            db.query('SELECT * FROM products WHERE ?', {item_id: ans.item }, function(e, r) 
            {
                if (e) reject(e);
                resolve(r);

            });

        //console log's output if there's no errors

        }).then(function(output) {

            var newData = {};

            if (parseInt(ans.quantity) <= parseInt(output[0].stock_quantity)) {
                newData.ans = ans;
                newData.output = output;

            } else if (parseInt(ans.quantity) > parseInt(output[0].stock_quantity)) {

                console.log('Sorry. Insufficient quantity!')
                console.log(`We'll do our best to get more  stocks ASAP!`)

            } else {

                console.log('An error occurred on your existing purchase')
                console.log('Your order was not completed.')
            }

            return newData;

            // will Update bamazon's databse for changes..

        }).then(function(newData) {

            if (newData.ans) {

                var newQuantity = parseInt(newData.output[0].stock_quantity) - parseInt(newData.ans.quantity);
                var productId = newData.ans.item;
                var reciept = parseInt(newData.output[0].price) * parseInt(newData.ans.quantity);

                db.query('UPDATE products SET ? WHERE ?', [{

                    stock_quantity: newQuantity

                }, {

                   item_id: productId

                }
              ], function(e, r) {

                    if (e) throw e

                    console.log(`==============Cashier: Your Order's====================`)
                    console.log('             Your total is $' + reciept + '.');
                    console.log('___________________Reciept_____________________________')

                    process.exit();

                })

            } else {
                cmd()
            }

              //catch the errors
        }).catch(function(e) {

            console.log(e)
            process.exit()
            

        });


    }).catch(function(e) {

        console.log(e)

        process.exit()

    });

}