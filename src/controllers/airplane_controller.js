const {StatusCodes} = require('http-status-codes');
const {airplaneService} = require('../services');

const{ErrorResponse , SuccessResponse} = require('../utils/common');

async function createAirplane(req , res){
    try {
        const airplane = await airplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        SuccessResponse.message = 'succesfully create a file ';
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = error.message || 'Something went wrong while creating airplane';
        ErrorResponse.error = error.explanation || error.message;
        return res
                  .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(ErrorResponse);
        
    }
}

module.exports = {
    createAirplane
}
