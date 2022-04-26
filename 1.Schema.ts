========================================================================================
Schema decoration
========================================================================================
-------------------------------------------------------------
Todo app -> todo.schema.ts
-------------------------------------------------------------
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);




========================================================================================
Schema without decoration
========================================================================================
export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});



-------------------------------------------------------------
my-jwt-auth-project -> user.schema.ts
-------------------------------------------------------------
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},

})

UserSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });