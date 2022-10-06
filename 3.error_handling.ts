
// ===================================================================
// Duplicate username error handling
  // TypeORM, postgreSQL database
// ===================================================================

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {


  //--------------------------------------------------------------------------
  //  This method can be used in authservice rather than UsersRepository..
  //  you will have to use this.Usersrepo.create() -> rather than this.create()
  //--------------------------------------------------------------------------
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}


    // -----------------------------------------------------
    // src\schemas\breed_schema.ts
    // -----------------------------------------------------

      import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
      import { Document } from 'mongoose';

      export type BreedDocument = Breed & Document;

      @Schema()
      export class Breed {

        //this will throw an error
        //check error code in service.ts file
        @Prop({unique:true})
        name: string;

        @Prop()
        age: number;
      }

      export const BreedSchema = SchemaFactory.createForClass(Breed);



// ===================================================================
// Login Password and Username error checking
// ===================================================================

 async login(UserDTO: LoginDto) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user)
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }