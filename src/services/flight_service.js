const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories');
const AppError = require('../utils/errors/app_error');
const { Op } = require('sequelize');

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter  = {};
    const endingTripTime = "23:59:59"
    // trips = MUM-DEL
    if(query.trips){
        const parts = query.trips.split('-');
        if(parts.length === 2){
            const [departureAirportId, arrivalAirportId] = parts;
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;
        }
    }

    if(query.price){
        const [minPrice , maxPrice] = query.price.split("-");
        const min = parseInt(minPrice, 10) || 0;
        const max = (maxPrice == undefined) ? 20000 : (parseInt(maxPrice, 10) || 20000);
        customFilter.price = {
            [Op.between]: [min, max]
        }
    }
    if(query.travellers){
        const travellers = parseInt(query.travellers, 10) || 0;
        customFilter.totalSeats = {
            [Op.gte]: travellers
        }
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [
                `${query.tripDate} 00:00:00`,
                `${query.tripDate} ${endingTripTime}`
            ]
        };
    }

    let sortFilter;
    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.error('flightService.getAllFlights error:', error);
        throw new AppError('cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }


}

async function getFlight(id){
    try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError('The flight you requested is not present', StatusCodes.NOT_FOUND);
    }
    throw new AppError('Cannot fetch flightt data', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}



module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
};
