---------------------------------
install using
---------------------------------
npm install bcrypt



===================================================================
Password hasing using bcrypt
===================================================================

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
  //This method can be used in authservice rather than UsersRepository..
  // you will have to use this.Usersrepo.create() -> rather than this.create()
  //--------------------------------------------------------------------------

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    //this bcrypts the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    }catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
