const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app_error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=> {
                explanation.push(err.message);
            });
         throw new AppError(explanation , StatusCodes.INTERNAL_SERVER_ERROR);
         }
    }
}

async function getAirplanes(){
    try {
        const AllAirplane = await airplaneRepository.getAll();
        return AllAirplane;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present ', StatusCodes.NOT_FOUND);
        }
         throw new AppError('Cannot fetch data of all the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
         }
}


async function deleteAirplane(id){
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to delete is not present ', StatusCodes.NOT_FOUND);
        }
         throw new AppError('Cannot fetch data of all the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id , data ){
    try {
        const response = await airplaneRepository.update(id, data);
        return response;
    } catch (error) {
        throw new AppError('The airplane you request to update is not present ' ,StatusCodes.NOT_FOUND);
    }
}

module.exports ={
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}
