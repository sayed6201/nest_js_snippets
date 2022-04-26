import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { CreateBreedDto } from './create-breed.dto';
//used to capture body of the request
//for updating the breed collection , 
/*
{
"name" : "sam",
"age" : 21
}
*/
export class UpdateBreedDto extends PartialType(CreateBreedDto) {
    @MinLength(4,{
        message: 'Name should be at least 4 char long',
    })
    @IsNotEmpty({
        message: 'Name must not be empty'
    })
    name: string;

    @IsDefined()
    @IsNumber()
    age: number;
}
