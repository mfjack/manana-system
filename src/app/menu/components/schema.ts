import z from "zod";

export const formAddProductSchema = z.object({
  name: z.string().min(3, "O nome do item é obrigatório"),
  description: z.string().min(10, "A descrição do item é obrigatória"),
  price: z.string().min(1, "O preço do item é obrigatório"),
  picture: z.any().optional(),
});

export type FormAddProduct = z.infer<typeof formAddProductSchema>;
