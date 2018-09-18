AUTO REPAIR app with CRUD operations.
Runs on Node.js, angularjs, mySQL.

## Installation
Clone or download zip to local machine and run:

npm install


## Setup mySQL and prepare some initial data:
1. Install mySQL on your local mashine
2. Create database:  CREATE DATABASE cars;
3. USE cars;

## create cars table and insert some data:
4. Create table and setup some data by importing car.sql into plates DATABASE with command:
mysql -u root -p cars < sql/car.sql
5. Insert data : 
mysql -u root -p cars < sql/car_insert.sql

## create repairs table and insert some data:
6. Create table and setup some data by importing car.sql into plates DATABASE with command: 
mysql -u root -p cars < sql/repairs.sql
7. Insert data : 
mysql -u root -p cars < sql/repairs_insert.sql

## triggers for insert and update data validation:
8. Create triggers 
mysql -u root -p cars < sql/trigger.sql
mysql -u root -p cars < sql/trigger_on_update.sql

## Database connection data located in server.js

host: 'localhost',
user: 'root',
password : 'root',
port : 3306, //port mysql
database:'cars'




