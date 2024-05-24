import { Request, Response} from "express"

const errorHandler = (error:any, request:Request, response:Response, next:any) => {
    if(error.name === "CastError"){
       return response.status(400).json({error:"Malformed Id"})
    }else if (error.name === "ValidationError"){
        return response.status(400).json({error:error.message})
    }else if(error.name === "MongoServerError" && error.message.includes('E11000 duplicate key error')){
        return  response.status(400).json({error:"expected `email` to be unique"})
    }else if(error.name === "TokenExpiredError"){
        return response.status(400).send({
            error: 'token expired'
        })
    }else if(error.name === "TypeError" && error.message.includes('The "path" argument')){
        return response.status(500).json({error:'Upload an image'})
    }
    else if (error.name === 'JsonWebTokenError'){
        return response.status(400).send('jwt malformed')
    }
    next(error)
}

module.exports = errorHandler 