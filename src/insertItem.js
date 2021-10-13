"use strict"

const {v4} = require('uuid');
const AWS = require('aws-sdk')

const insertItem = async (event) => {
    const {item} = JSON.parse(event.body);
    const createdAt = new Date().toISOString;
    const id = v4();

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const novoItem ={
        id,
        item,
        createdAt,
        itemStatus: false
    }
    
    dynamoDB.put({
        TableName: "ItemTableNew",
        Item: novoItem
    })

    return {
        statusCode: 200,
        body: JSON.stringify(novoItem)
    }
}

module.exports = {
    handler: insertItem
}