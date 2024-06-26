import { BlobOptions } from "buffer";
import { Mongoose } from "mongoose";
import { Type } from "typescript";
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

interface IUserSchemaType {
    name:{
        type:string,
        required:boolean,
        min:Array<any>,
        max:number
    },
    email:{
        type:string,
        required:boolean,
        min:Array<any>,
        max:number,
        match:Array<RegExp>,
        unique:boolean
    },
    password:{
        type:string,
        required:Array<any>,
        minLength:number
    },
    avatar:{
        type:string,
        required:boolean
    }
}

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:[3, 'Name must be more than three characters'],
        maxLength:50
    },
    email:{
        type:String,
        required:[true, 'Please provide email'],
        min:[3, 'Character must be more than three'],
        maxLength:[50, 'Character must not be more than 30'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid mail'
        ],
        unique:true

    },
    passwordHash:{
        type:String,
        required:[true, 'Please provide password'],
        minLength:6
    },
    avatar:{
        type:String,
        require:[true, "kindly upload an avatar"]
    }
})

userSchema.set('toJSON', {
    transform: (_document: any, returnedObject:any) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  module.exports = mongoose.model('User', userSchema)