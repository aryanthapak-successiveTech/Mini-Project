export class ApiError extends Error{
    constructor(status,message){
        super(message);
        this.status=status;
    }
}

export const AppError=(err,req,res,next)=>{
    const statusCode=err.status||500;
    const message=err.message||"Something went wrong";

    console.error(err.stack);

    return res.status(statusCode).json({
        status:"Failed",
        message
    })
}