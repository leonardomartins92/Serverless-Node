"use strict"

const {v4} = require('uuid');
const AWS = require('aws-sdk');
const createError = require('http-errors')
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function processItems(event){
    
}

export const handler = processItems; 