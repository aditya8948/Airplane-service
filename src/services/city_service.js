const {StatusCodes} = require('http-status-codes');
const {CityRepository} = require('../repositories');
const AppError = require('../utils/errors/app_error');

const cityRepository = new CityRepository();


// create new city

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
         if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=> {
                explanation.push(err.message);
            });
         throw new AppError(explanation , StatusCodes.BAD_REQUEST);
         }
         throw new AppError('cannot create a new city object ', StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

// delete city

async function deleteCity(id){
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
         if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to delete is not present ', StatusCodes.NOT_FOUND);
        }
         throw new AppError('Cannot fetch data of all the cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// update city name 

async function updateCity(id , data ){
    try {
        const response = await cityRepository.update(id , data);
        return response;
    } catch (error) {
         throw new AppError('The city you request to update is not present ' ,StatusCodes.NOT_FOUND);
    }

}

module.exports = {
    createCity,
    deleteCity,
    updateCity
}
