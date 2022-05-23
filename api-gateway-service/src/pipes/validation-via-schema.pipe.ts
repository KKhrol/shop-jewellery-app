import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'yup';
@Injectable()
export class ValidationViaSchemaPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema<any>) {}
  async transform(value: any) {
    try {
      await this.schema.validate(value, {
        abortEarly: false,
        strict: false,
      });
      return value;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
