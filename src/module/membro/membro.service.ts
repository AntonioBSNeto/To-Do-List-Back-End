import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { MembroDTO } from "./dto/membro.dto";
import { Membro } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
import { UpdateMembroDTO } from "./dto/update-membro.dto";
import { MembroSemSenha } from "./util/membroSemSenha";

@Injectable()
export class MembroService {
  constructor(private prismaService: PrismaService) { }

  private async findMembroById(id: string): Promise<MembroSemSenha> {
    const membro = await this.prismaService.membro.findUnique({ where: { id }, select: {
      email: true,
      nome: true,
      senha: false,
      createdAt: true,
      updatedAt: true,
      id: true,
      tarefas: true
    } });
    if (!membro) {
      throw new NotFoundException(`Membro with ID ${id} not found`);
    }

    return membro;
  }

  async create(membroDTO: MembroDTO): Promise<Membro> {
    const { email, nome, senha } = membroDTO
    const hashedPassword = await bcrypt.hash(senha, 10)

    return await this.prismaService.$transaction(async (prisma) => {
      const existMembro = await prisma.membro.findUnique({ where: { email }})

      if (existMembro) {
        throw new ConflictException("Email is already registred")
      }

      const user = await prisma.membro.create({
        data: {
          id: randomUUID(),
          email,
          senha: hashedPassword,
          nome
        }
      })

      delete user.senha
      return user
    })
  }

  async findAll(): Promise<MembroSemSenha[]> {
    return await this.prismaService.membro.findMany({ select: {
      email: true,
      nome: true,
      senha: false,
      createdAt: true,
      updatedAt: true,
      id: true,
      tarefas: true
    }});
  }

  async findOne(id: string): Promise<MembroSemSenha> {
    return await this.findMembroById(id);
  }

  async findOneByEmail(email: string): Promise<Membro> {
    return await this.prismaService.membro.findUnique({ where: { email } })
  }

  async updateMembro(id: string, updateMembroDTO: UpdateMembroDTO, request: any): Promise<Membro> {
    return this.prismaService.$transaction(async (prisma) => {
      await this.findMembroById(id)

      if (id !== request.user.userId) {
        throw new ForbiddenException('Access Denied: You do not have permission to modify this task')
      }
      
      const { email, nome, senha } = updateMembroDTO

      const data: { [key: string]: any } = {}
      if (updateMembroDTO.email !== undefined) data.email = email
      if (updateMembroDTO.nome !== undefined) data.nome = nome
      if (updateMembroDTO.senha !== undefined) data.senha = senha
      
      return await prisma.membro.update({
        where: { id },
        data
      })
    })
  }

  async deleteMembro(id: string, request: any): Promise<Membro> {
    await this.findMembroById(id)

    if (id !== request.user.userId) {
      throw new ForbiddenException('Access Denied: You do not have permission to modify this task')
    }

    return await this.prismaService.membro.delete({
      where: { id }
    })
  }

}