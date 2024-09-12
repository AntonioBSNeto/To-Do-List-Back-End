import { Prioridade } from "@prisma/client";
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class TarefaDTO {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  nome: string;

  @IsString()
  @MaxLength(140)
  descricao: string;

  @IsBoolean()
  @IsNotEmpty()
  finalizada: boolean;

  @IsDateString()
  @IsOptional()
  dataFinalizada?: Date;

  @IsString()
  @IsNotEmpty()
  membroId: string;

  @IsNotEmpty()
  @IsEnum(Prioridade)
  prioridade: Prioridade = 'BAIXA';
}