// modulo por si no encuentra la pagina nos pone no hallada.

export default (req,res,next)=>{
    res.status(404).json({error:"not found"});
};

