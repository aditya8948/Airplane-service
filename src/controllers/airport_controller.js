const { StatusCodes } = require('http-status-codes');
const { airportService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

/**
 * post airport
 * request body {name : Indira Gandhi International Airport, code : DEL , cityId : 12 , address <>}
 */
async function createAirport(req, res) {
    try {
        const response = await airportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            cityId: req.body.cityId,
            address: req.body.address
        });
        return res
                .status(StatusCodes.CREATED)
                .json(new SuccessResponse(response, 'successfully created airport'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Something went wrong while creating airport'));
    }
}

/**
 * get airport
 * req-body {}
 */
async function getAirports(req, res) {
    try {
        const response = await airportService.getAirports();
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(response, 'successfully fetched all airports'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot fetch airport data'));
    }
}

/**
 * GET airport/:id
 * req-body {id : 5}
 */
async function getAirport(req, res) {
    try {
        const response = await airportService.getAirport(req.params.id);
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(response, 'successfully fetched the airport details'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot fetch airport details'));
    }
}

/**
 * Delete : /airport/:id
 * req-body :{}
 */
async function deleteAirport(req, res) {
    try {
        const airport = await airportService.deleteAirport(req.params.id);
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(airport, 'successfully deleted the airport'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot delete airport'));
    }
}

/**
 * UPDATE /airport/:id
 *  req-body {name : Indira Gandhi International Airport, code : DEL , cityId : 12 , address <>}
 */
async function updateAirport(req, res) {
    try {
        const response = await airportService.updateAirport(req.params.id, {
            name: req.body.name,
            code: req.body.code,
            cityId: req.body.cityId,
            address: req.body.address
        });
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(response, 'Successfully updated the airport details'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.NOT_FOUND)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot update airport details'));
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    deleteAirport,
    updateAirport
};