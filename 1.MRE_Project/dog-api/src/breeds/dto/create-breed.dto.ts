//used to capture body of the request
/*
{
"name" : "sam",
"age" : 21
}
*/
import { IsDefined, IsNotEmpty, IsNumber, isNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateBreedDto {
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
