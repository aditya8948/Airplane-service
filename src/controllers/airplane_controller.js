const { StatusCodes } = require('http-status-codes');
const { airplaneService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

/*
POST : /airplane
req-body { modelNumber : 'airbusa30' , capacity: 200}
*/
async function createAirplane(req, res) {
    try {
        const airplane = await airplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res
                .status(StatusCodes.CREATED)
                .json(new SuccessResponse(airplane, 'successfully created the airplane'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Something went wrong while creating airplane'));
    }
}

/**
 * GET : /airplane/
 * req-body {}
 */
async function getAirplanes(req, res) {
    try {
        const AllAirplanes = await airplaneService.getAirplanes();
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(AllAirplanes, 'successfully fetched all airplanes'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot fetch airplanes'));
    }
}

/**
 * GET : /airplane/:id
 * req-body {}
 */
async function getAirplane(req, res) {
    try {
        const airplane = await airplaneService.getAirplane(req.params.id);
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(airplane, 'successfully fetched the airplane'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot fetch airplane details'));
    }
}

/**
 * Delete : /airplane/:id
 * req-body :{}
 */
async function deleteAirplane(req, res) {
    try {
        const airplane = await airplaneService.deleteAirplane(req.params.id);
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(airplane, 'successfully deleted the airplane'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot delete airplane'));
    }
}

/**
 * PATCH : /airplane/:id
 * req-body :{ modelNumber: {} , capacity: {}}
 */
async function updateAirplane(req, res) {
    try {
        const airplane = await airplaneService.updateAirplane(req.params.id, {
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(airplane, 'successfully updated the airplane'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.NOT_FOUND)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot update airplane'));
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
};
