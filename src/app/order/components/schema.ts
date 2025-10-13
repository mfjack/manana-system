import z from "zod";

export const formOrderSchema = z.object({
  orderName: z.string().min(2, { message: "Digite o nome da comanda" }),
  orderNumber: z.string().min(1, { message: "Digite o número da comanda" }),
});

export type FormOrderSchema = z.infer<typeof formOrderSchema>;
