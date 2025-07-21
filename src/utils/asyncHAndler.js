const asyncHandler = (requestHendler)=>{
    (req, res, next)=>{
        Promise.resolve(requestHendler(req, res, next)).catch((error) => next( error))
    }
}

export { asyncHandler }


/*
    const asyncHandler = (fn) => {}
    const asyncHandler = (fn) => () => {}
    const asyncHandler = (fn) => async () => {}
*/
/*  const asyncHandler2 = (fn) => async (req, res, next) => {
        try {
            await fn(req,res,next)
        } catch (error) {
            res.status(error.code || 500).json({
                success: false,
                massage:error.massage
            })
        }
       }
*/