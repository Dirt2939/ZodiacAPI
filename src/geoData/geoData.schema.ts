import z from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

export const user = z.object({
    date: z.string().nonempty("A data deve ser uma string no formato YYYY-MM-DDTHH:MM:SS")
        .regex(dateRegex, "Insira uma data válida no formato YYYY-MM-DDTHH:MM:SS")
        .refine((val) => {
            const m = val.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/);
            if (!m) return false;
            const y = Number(m[1]);
            const mm = Number(m[2]);
            const d = Number(m[3]);
            const dt = new Date(y, mm - 1, d);
            if (!(dt.getFullYear() === y && dt.getMonth() === mm - 1 && dt.getDate() === d)) return false;
            const hh = Number(m[4]);
            const mi = Number(m[5]);
            const ss = Number(m[6]);
            if (hh < 0 || hh > 23) return false;
            if (mi < 0 || mi > 59) return false;
            if (ss < 0 || ss > 59) return false;
            return true;
        }, { message: "Data inválida" }),
    city: z.string().nonempty("A cidade deve ser uma string").min(4, "A cidade deve ter ao mínimo 4 caracteres")
});