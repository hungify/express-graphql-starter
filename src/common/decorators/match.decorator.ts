import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  equals,
  registerDecorator,
} from 'class-validator';

export const Match =
  <T>(property: keyof T, options?: ValidationOptions) =>
  (object: unknown, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [property],
      validator: MatchConstraint,
    });

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    return equals(validationArguments.constraints[0], value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.constraints[0]} and ${validationArguments.property} does not match`;
  }
}
