"use strict"

const AWS = require('aws-sdk')
const middleware = require('../lib/middleware')
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const fetchItems = async(event)=>{
   
    let items;

    try{
        const results = await dynamoDB.scan({
            TableName: "ItemTableNew"
        }).promise()

        items = results.Items
        return{
            statusCode: 200,
            body: JSON.stringify(items)
        }
    }catch(error){
        console.log(error)
        throw new createError.InternalServerError(err);
    }
}

module.exports ={
    handler: middleware(fetchItems)
}