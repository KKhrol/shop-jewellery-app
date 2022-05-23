import * as yup from 'yup';

export const itemSchema = yup.object({
  itemId: yup.string().defined().uuid(),
  image: yup.string().defined().url(),
  name: yup.string().defined().min(1).max(100),
  description: yup.string().defined().min(20).max(500),
  metalImage: yup.string().defined().url(),
  price: yup.number().defined().integer().positive(),
  quantity: yup.number().defined().integer().positive(),
});

export const createOrderSchema = yup.object({
  userId: yup.string().defined().uuid(),
  itemInOrder: yup.array().of(itemSchema),
  totalPrice: yup.number().defined().integer().positive(),
});
