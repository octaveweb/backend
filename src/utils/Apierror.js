class ApiError extends Error{
    constructor(
        statusCode,
        massage = "Somthing went wrong",
        errors = [],
        statck = ""
    ){
         super(massage)
         this.statusCode = statusCode
         this.data = null
         this.massage = massage
         this.success = false
         this.errors = errors

         if (this.stack) {
            this.stack = statck
         }else{
            Error.captureStackTrace(this,this.constructor)
         }
    }
}

export {ApiError}