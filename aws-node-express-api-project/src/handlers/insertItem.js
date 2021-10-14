"use strict"

const {v4} = require('uuid');
const AWS = require('aws-sdk');
const middleware = require('../lib/middleware')
const createError = require('http-errors')
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const insertItem = async (event) => {
    const {item} = event.body;
    const createdAt = new Date().toISOString;
    const id = v4();

    const novoItem ={
        id,
        item,
        createdAt,
        itemStatus: false
    }
    try{
        await dynamoDB.put({
            TableName: "ItemTableNew",
            Item: novoItem
        }).promise();
    
        return {
            statusCode: 201,
            body: JSON.stringify(novoItem)
        }

    }catch(err){
        console.log(err);
        throw new createError.InternalServerError(err);
    }    
}

export const handler = middleware(insertItem)
   