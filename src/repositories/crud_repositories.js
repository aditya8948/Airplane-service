const { StatusCodes } = require('http-status-codes');
const {Logger} = require('../config');
const AppError = require('../utils/errors/app_error');

class crudRepository {
    constructor(model){
        this.model = model;
    }


async create(data){
        const response = await this.model.create(data);
        return response;
    
 }

async destroy(data){
        const response = await this.model.destroy({
            where:{
                id: data
            }
        });
        if(!response){
             throw new AppError('Not able to found the resource ', StatusCodes.NOT_FOUND);
        }
        return response;
    
}

async get(data){
        const response = await this.model.findByPk(data);
        if(!response){
            throw new AppError('Not able to found the resource ', StatusCodes.NOT_FOUND);
        }
        return response;
    
}

async getAll(){
        const response = await this.model.findAll();
        return response;
   
}

async update(id, data){
        const record = await this.model.findByPk(id);
        if(!record){
            throw new AppError('Not able to find the resource with the given id', StatusCodes.NOT_FOUND);
        }
        const response = await record.update(data);
        return response;
}

}

module.exports = crudRepository;
