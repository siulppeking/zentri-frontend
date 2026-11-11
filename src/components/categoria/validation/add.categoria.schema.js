import { z } from 'zod';

export const addCategoriaSchema = z.object({
    nombre: z.string()
        .trim()
        .min(1, 'El nombre es obligatorio')
        .min(3, 'El nombre debe tener entre 3 y 20 caracteres')
        .max(20, 'El nombre debe tener entre 3 y 20 caracteres')
});