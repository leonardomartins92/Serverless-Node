"use strict"

const AWS = require('aws-sdk');
const createError = require('http-errors');
const middleware = require('../lib/middleware')
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const validator = require('@middy/validator')
const getItemsSchema = require('../lib/schemas/getItemsSchema')

export async function getItemById(id){
    let item;
    try{
        const results = await dynamoDB.get({
            TableName: "ItemTableNew",
            Key: {id}
        }).promise()

        item = results.Item
        
    }catch(error){
        console.log(error)
        throw new createError.InternalServerError(err);
    }
    if(!item){
        throw new createError.NotFound('Item not found')
    }
    return item;
} 

const fetchItem = async(event)=>{
    
    const {id} = event.pathParameters
    const {status} = event.queryStringParameters;

    const item = await getItemById(id);

    return{
        statusCode: 200,
        body: JSON.stringify(item)
    }
}

export const handler = middleware(fetchItem)
.use(validator(
    {inputSchema: getItemsSchema,
    useDefaults: true}));
