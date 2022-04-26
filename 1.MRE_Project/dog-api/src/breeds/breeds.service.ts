import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Breed, BreedDocument } from 'src/schemas/breed_schema';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
// import { Breed } from './entities/breed.entity';
import { Model } from 'mongoose';


@Injectable()
export class BreedsService {
  constructor(@InjectModel(Breed.name) private breedModel: Model<BreedDocument>) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed>{
    try{
      const user =  await new this.breedModel(createBreedDto).save();
      return user
    }catch(e){
      console.log('sayed: '+e.code)
      if(e.code === 11000){
         throw new ConflictException('Username Exists')
      }else{
        throw new InternalServerErrorException()
      }
    }
    
  }

 async findAll() {
    return this.breedModel.find();
  }

  async findOne(name: string) {
    // return this.breedModel.findOne(id);
    return this.breedModel.findOne({name});
  }

  async update(name: string, updateBreedDto: UpdateBreedDto) {
    return this.breedModel.updateOne({name},{$set:{...updateBreedDto}})
  }

  async remove( name: string) {
    return this.breedModel.deleteOne({name})
  }
}
