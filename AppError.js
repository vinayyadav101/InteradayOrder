class AppError extends Error{
    constructor(message ,statusCode) {
        this.message = message;
        this.statusCode = statusCode;
            super(message);

            Error.captureStackTrace(this , AppError)
            
        }    
}