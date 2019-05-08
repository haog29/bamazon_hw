DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;


USE bamazon;
CREATE TABLE products( 
  item_id INT  NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price decimal(20,2),
  stock_quantity decimal(20) default 20,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

USE bamazon;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
(1231, 'Notebook', 'School Supplies', 5.00, 20), 
(1232, 'Microwave', 'Kitchen', 100.00, 20), 
(1233, 'Ice Cream', 'Foods', 5.00, 30),
(1234, 'Toothbrush', 'Hygiene', 10.00, 10),
(1235, 'Toothpaste', 'Hygiene', 20.00, 10),
(1236, 'Ballpen', 'School supplies', 10.00, 10),
(1237, 'Oven Toaster', 'Kitchen', 100.00, 20),
(1238, 'Kit Kat', 'Food', 5.00, 20),
(1239, 'Bread', 'Food', 5.00, 5),
(12310, 'Air fryer', 'Kitchen', 150.00, 20)