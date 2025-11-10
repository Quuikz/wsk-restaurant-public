/**
 * Used to create database tables automatically from given data structures.
 */
'use strict';

import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

import {user, order, meal} from './datastructures.js';

//database parameters
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const promisePool = pool.promise();
createTables(promisePool);


//get a connection
async function createTables (promisePool) {
    //connection
    const connection = await promisePool.getConnection();

    try {
        //start a transaction
        await connection.beginTransaction();

        //drop tables
        await connection.execute("DROP TABLE IF EXISTS users, orders, meals;");

        //user table
        const userTableRows = [];
        for (let key in user) {
            console.log(key, user[key]);
            userTableRows.push(key + ' ' + user[key]);
        }
        const userSql = 'CREATE TABLE users (' + [userTableRows] + ');';
        console.log('SQL: ' + userSql);
        const userResponse = await connection.execute(userSql);
        console.log(userResponse);


        //order table
        const orderTableRows = [];
        for (let key in order) {
            console.log(key, order[key]);
            orderTableRows.push(key + ' ' + order[key]);
        }
        const orderSql = 'CREATE TABLE orders (' + [orderTableRows] + ');';
        console.log('SQL: ' + orderSql);
        const orderResponse = await connection.execute(orderSql);
        console.log(orderResponse);


        //meal table
        const mealTableRows = [];
        for (let key in meal) {
            console.log(key, meal[key]);
            mealTableRows.push(key + ' ' + meal[key]);
        }
        const mealSql = 'CREATE TABLE meals (' + [mealTableRows] + ');';
        console.log('SQL: ' + mealSql);
        const mealResponse = await connection.execute(mealSql);
        console.log(mealResponse);

        //order_items link table to link order-meal-amount
        const orderItemsSql = 'CREATE TABLE meals (' + [mealTableRows] + ');';
        console.log('SQL: ' + orderItemsSql);
        const orderItemsSqlResponse = await connection.execute(orderItemsSql);
        console.log(mealResponse);




        //commit if ok
        if (userResponse.warningStatus === 0 && userResponse.warningStatus === 0 && userResponse.warningStatus === 0) {
            await connection.commit();
        }

    } catch (error) {
        console.log(error);
    } finally {
        connection.close();
    }

}
