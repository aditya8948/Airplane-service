const { StatusCodes } = require('http-status-codes');
const { cityService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

/*
POST : /city
req-body {name : 'Delhi'}
*/
async function createCity(req, res) {
    try {
        const city = await cityService.createCity({ name: req.body.name });
        return res
                .status(StatusCodes.CREATED)
                .json(new SuccessResponse(city, 'successfully added city'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Something went wrong while creating city'));
    }
}

/*
DELETE : /city/:id
*/
async function deleteCity(req, res) {
    try {
        const response = await cityService.deleteCity(req.params.id);
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(response, 'successfully deleted the city'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot delete the city'));
    }
}

/*
update : city/:id
req-body: {name : 'New Delhi'}
*/
async function updateCity(req, res) {
    try {
        const response = await cityService.updateCity(req.params.id, {
            name: req.body.name
        });
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(response, 'successfully updated the city'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.NOT_FOUND)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot update the city'));
    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity
};
