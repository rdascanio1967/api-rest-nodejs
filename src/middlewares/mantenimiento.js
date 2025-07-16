export default (req,res,next)=>{
    res.json({message:"En mantenimiento"});
    next();
};