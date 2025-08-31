export const logger=(req,res,next)=>{
    console.log("Path",req.url);
    console.log("Method",req.method);
    console.log("Time",new Date());
    next();
}