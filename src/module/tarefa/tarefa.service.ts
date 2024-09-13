import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Membro, Tarefa } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { TarefaDTO } from "./dto/tarefa.dto";
import { UpdateTarefaDTO } from "./dto/tarefa-update.dto";
import { Request } from 'express';

@Injectable()
export class TarefaService {
  constructor(private prismaService: PrismaService) { }

  private async findTarefaById(id: string): Promise<Tarefa> {
    const tarefa = await this.prismaService.tarefa.findUnique({ where: { id } });

    if (!tarefa) {
      throw new NotFoundException(`Tarefa with ID ${id} not found`);
    }

    return tarefa
  }

  private async validMembroId(membroId: string): Promise<Membro> {
    const membro = this.prismaService.membro.findUnique({ where: { id: membroId }})
    return membro
  }

  async create(tarefaDTO: TarefaDTO): Promise<Tarefa> {
    const membro = await this.validMembroId(tarefaDTO.membroId)
    if (!membro) {
      throw new NotFoundException('Cannot create task with invalid member id')
    }
    return await this.prismaService.tarefa.create({
      data: tarefaDTO
    })
  }

  async findAll(): Promise<Tarefa[]> {
    return await this.prismaService.tarefa.findMany();
  }

  async findOne(id: string): Promise<Tarefa> {
    return await this.findTarefaById(id);
  }

  async findAllByMembroId(membroId: string): Promise<Tarefa[]> {
    return await this.prismaService.tarefa.findMany({ where: { membroId } });
  }

  async updateTarefa(id: string, updateTarefaDTO: UpdateTarefaDTO, request: any): Promise<Tarefa> {
    return this.prismaService.$transaction(async (prisma) => {
      const tarefa = await this.findTarefaById(id)

      if (tarefa.id !== request.user.userId) {
        throw new ForbiddenException('Access Denied: You do not have permission to modify this task')
      }

      if (tarefa.finalizada) {
        throw new ConflictException('The Tarefa has already been completed and cannot be updated.')
      }

      const { nome, descricao, finalizada, membroId, prioridade } = updateTarefaDTO

      const data: { [key: string]: any } = {}
      if (updateTarefaDTO.descricao !== undefined) data.descricao = descricao
      if (updateTarefaDTO.nome !== undefined) data.nome = nome
      if (updateTarefaDTO.finalizada !== undefined) data.finalizada = finalizada
      if (updateTarefaDTO.membroId !== undefined) data.membroId = membroId
      if (updateTarefaDTO.prioridade !== undefined) data.prioridade = prioridade
      
      return await prisma.tarefa.update({
        where: { id },
        data
      })
    })
  }

  async deleteTarefa(id: string, request: any): Promise<Tarefa> {
    const tarefa = await this.findTarefaById(id)

    if (tarefa.id !== request.user.userId) {
      throw new ForbiddenException('Access Denied: You do not have permission to modify this task')
    }

    return await this.prismaService.tarefa.delete({
      where: { id }
    })
  }

}