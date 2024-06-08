const { constants } = require("../constants");

const errorHandler = (err, req, res, next) =>  {
 const  statusCode = res.statusCode ? res.statusCode : 500

 switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({ title : "validation failed",  message : err.message, stackTrace : err.stack})
  break;

  case constants.NOT_FOUND:
  res.json({ title : "Not found",  message : err.message, stackTrace : err.stack})

  case constants.UN_AUTHORISED:
    res.json({ title : "Not authorised",  message : err.message, stackTrace : err.stack})

    case constants.FORBIDDEN:
        res.json({ title : "forbidden",  message : err.message, stackTrace : err.stack})

        case constants.SERVER_ERROR:
            res.json({ title : "Server  errpr",  message : err.message, stackTrace : err.stack})

 
    default:
        console.log("no error  all good")
        break;
 }
   
}

module.exports = {errorHandler}