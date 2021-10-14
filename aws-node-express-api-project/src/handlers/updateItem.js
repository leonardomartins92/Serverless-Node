"use strict"

const AWS = require('aws-sdk');
const createError = require('http-errors');
const middleware = require('../lib/middleware')
const {getItemById} = require('./fetchItem')
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const updateItem = async (event) => {

    const { itemStatus } = event.body
    const { id } = event.pathParameters

    const item = await getItemById(id);
   
    try {
        await dynamoDB.update({
            TableName: "ItemTableNew",
            Key: { id },
            UpdateExpression: 'set itemStatus = :itemStatus',
            ExpressionAttributeValues: {
                ':itemStatus': itemStatus
            },
            ReturnValues: "ALL_NEW"
        }).promise()

        return {
            statusCode: 200,
            body: JSON.stringify({ msg: 'Item updated' })
        }
    } catch (err) {
        throw new createError.InternalServerError(err);
    }

}

module.exports = {
    handler: middleware(updateItem)
}