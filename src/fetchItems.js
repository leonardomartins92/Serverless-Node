"use strict"

const AWS = require('aws-sdk')

const fetchItems = async(event)=>{
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
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
        return{
            statusCode: 400,
        }
    }
}

module.exports ={
    handler: fetchItems
}