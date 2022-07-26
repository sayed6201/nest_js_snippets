===================================================================
Auth DTO
===================================================================

import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}


===================================================================
Task App
===================================================================
-------------------------------------------------------------
CreateTaskDto
-------------------------------------------------------------
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;


}

-------------------------------------------------------------
GetTasksFilterDto
-------------------------------------------------------------

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}

    -------------------
    ENUM
      - task-status.enum.ts
    -------------------
    export enum TaskStatus {
      OPEN = 'OPEN',
      IN_PROGRESS = 'IN_PROGRESS',
      DONE = 'DONE',
    }


-------------------------------------------------------------
UpdateTaskStatusDto
-------------------------------------------------------------

import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}




===================================================================
DOG API
  - CreateBreedDto 
===================================================================
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
    age: Int16Array;
}
