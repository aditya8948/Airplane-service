const crudRepository = require('./crud_repositories');
const{Flight,Airplane,Airport,City} = require('../models');
const AppError = require('../utils/errors/app_error');
const { StatusCodes } = require('http-status-codes');

class FlightRepository extends crudRepository {
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include:[
                {
                    model: Airplane,
                    required: true, // true => inner join , default outer join
                    as: 'airplane_detail'
                },
                {
                model: Airport,
                required: true,
                as: 'departure_airport',
                include: [{
                    model: City,
                    as: 'city',
                    required: true
                }]
                },
                 {
                model: Airport,
                required: true,
                as: 'arrival_airport',
                include: [{
                    model: City,
                    as: 'city',
                    required: true
                }]
                }
            ]
        })
        return response;
    }

    async UpdateRemainingSeats(flight_id, seats, dec = true, transaction){
        const flight = await Flight.findByPk(flight_id, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });
        if(!flight){
            throw new AppError('Not able to find the flight with the given id', StatusCodes.NOT_FOUND);
        }
        if(dec && flight.totalSeats < seats){
            throw new AppError('Not enough seats available on this flight', StatusCodes.BAD_REQUEST);
        }
        if(dec){
            await flight.decrement('totalSeats', {by: seats, transaction});
        }else{ 
            await flight.increment('totalSeats', {by: seats, transaction});
        }
        return await flight.reload({ transaction });
    }
        
}

module.exports = FlightRepository;
