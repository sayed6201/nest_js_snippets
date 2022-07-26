/*
Custom pipes#
-------------
As mentioned, you can build your own custom pipes. While Nest provides a robust built-in ParseIntPipe and ValidationPipe, 
let's build simple custom versions of each from scratch to see how custom pipes are constructed.

We start with a simple ValidationPipe. Initially, 
we'll have it simply take an input value and immediately return the same value, 
behaving like an identity function.

validation.pipe.ts JS
*/
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}


/*
Custom pipes #2
gto-validation.pipe.ts
-------------
custom validatoin samples
*/
import { ArgumentMetadata, Injectable, Optional, PipeTransform, ValidationPipeOptions } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DtoValidationException } from '../validations/dto-validation.exception';

@Injectable()
export class DtoValidationPipe implements PipeTransform<any> {
    options: ValidationPipeOptions;

    constructor(@Optional() options?: ValidationPipeOptions) {
        this.options = options || {};
    }

    private static toValidate(metatype: any): boolean {
        const types: any[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !DtoValidationPipe.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object, this.options);
        if (errors.length > 0) {
            throw new DtoValidationException(errors, 'DTO Validation Error');
        }
        return value;
    }
}
