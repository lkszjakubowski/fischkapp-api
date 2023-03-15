import { AnyZodObject } from 'zod';

interface RequestValidators {
  body?: AnyZodObject;
  params?: AnyZodObject;
}

export default RequestValidators;
