//used in service as
    /*
    constructor(@InjectModel(Breed.name) private breedModel: Model<BreedDocument>) {}
    async create(createBreedDto: CreateBreedDto): Promise<Breed>{
        return new this.breedModel(createBreedDto).save();
    }
    */
   //this is same as Breed in the schema  .. 
export class Breed {}
