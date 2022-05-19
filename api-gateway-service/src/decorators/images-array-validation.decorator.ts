import { registerDecorator, ValidationOptions } from 'class-validator';

function validURL(str: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return !!pattern.test(str);
}

function CheckTypes(value: any): boolean {
  if (Array.isArray(value)) {
    let found = false;
    value.forEach(function (item) {
      if (!validURL(item)) {
        found = true;
      }
    });
    if (!found && value.length > 0) {
      return true;
    }
  }
}

export function IsArrayOfValidImages(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsArrayOfValidImages',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return CheckTypes(value);
        },
      },
    });
  };
}
