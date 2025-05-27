
const authorizedRoles = (role) =>(req,res,next)=>{
    if (req.user.role!== role) {
        return res.status(403).json({
            message: `Access denied. You must be a ${role} to perform this action.`
        });
    }
    next();
}

export {
    authorizedRoles
}