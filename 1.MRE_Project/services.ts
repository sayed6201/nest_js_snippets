===================================================================
src\breeds\breeds.service.ts
===================================================================

import { Injectable } from '@nestjs/common';
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
    return new this.breedModel(createBreedDto).save();
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
    ----------------------------------------------------------------------
    src\schemas\breed_schema.ts
    ----------------------------------------------------------------------
    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
    import { Document } from 'mongoose';

    export type BreedDocument = Breed & Document;

    @Schema()
    export class Breed {
      @Prop()
      name: string;

      @Prop()
      age: number;

    //   @Prop()
    //   breed: string;
    }

    export const BreedSchema = SchemaFactory.createForClass(Breed);