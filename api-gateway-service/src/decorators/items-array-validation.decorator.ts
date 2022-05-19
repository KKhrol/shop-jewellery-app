import { registerDecorator, ValidationOptions } from 'class-validator';
import { ItemInOrder } from '../orders/interfaces/create-order.interface';

function CheckTypes(value: any): boolean {
  if (Array.isArray(value)) {
    return value.every((it) => it instanceof ItemInOrder);
    /*let found = false;
    value.forEach(function (item) {
      if (!(item instanceof ItemInOrder)) {
        found = true;
      }
    });
    if (!found && value.length > 0) {
      return true;
    }*/
  }
}

export function IsArrayOfItems(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsArrayOfItems',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return CheckTypes(value);
          //return value[0] instanceof ItemInOrder;
        },
      },
    });
  };
}
