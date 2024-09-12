import { Membro } from "@prisma/client";

export type MembroSemSenha = Omit<Membro, 'senha'>;