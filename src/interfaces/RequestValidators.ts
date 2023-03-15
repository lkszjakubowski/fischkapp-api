import { AnyZodObject } from 'zod';

interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
}

export default RequestValidators;
