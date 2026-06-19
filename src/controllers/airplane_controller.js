const {StatusCodes} = require('http-status-codes');
const {airplaneService} = require('../services');

const{ErrorResponse , SuccessResponse} = require('../utils/common');
const { json } = require('sequelize');

/*

POST : /airplane
req-body { modelNumber : 'airbusa30' , capacity: 200}
*/

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

/**
 * GET : /airplane/
 * req-body {}
 */
async function getAirplanes(req , res) {
    try {
        const AllAirplanes = await airplaneService.getAirplanes();
        SuccessResponse.data = AllAirplanes;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse); 
    } catch (error) {
        ErrorResponse.error = error;
        return res
                 .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                 .json(ErrorResponse);
    }
}

/**
 * GET : /airplane/:id
 * req-body {}
 */
async function getAirplane(req , res){
    try {
        const airplane = await airplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                 .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                 .json(ErrorResponse);
    }
}

/**
 * Delete : /airplane/:id
 * req-body :{}
 */
async function deleteAirplane(req , res){
    try {
        const airplane = await airplaneService.deleteAirplane(req.params.id);
        SuccessResponse.message = 'succesfully deleted a file ';
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(ErrorResponse);
        
    }
}

/**
 * PATCH : /airplane/:id
 * req-body :{ modelNumber: {} , capacity: {}}
 */

async function updateAirplane(req, res){
    try {
        const airplane = await airplaneService.updateAirplane(req.params.id ,
        {
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        }
        );
        SuccessResponse.message = "successfully updated the plane";
        SuccessResponse.data = airplane;
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message || 'id not present ';
        return res
                  .status(error.statusCode || StatusCodes.NOT_FOUND)
                  .json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}
