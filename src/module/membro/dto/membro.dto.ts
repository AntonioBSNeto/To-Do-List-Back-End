import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class MembroDTO {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nome: string;

  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  senha: string;

}