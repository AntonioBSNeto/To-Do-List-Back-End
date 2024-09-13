import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TarefaService } from "./tarefa.service";
import { TarefaDTO } from "./dto/tarefa.dto";
import { Tarefa } from "@prisma/client";
import { UpdateTarefaDTO } from "./dto/tarefa-update.dto";
import { AuthGuard } from "../auth/auth.guard";


@UseGuards(AuthGuard)
@ApiTags('Tarefa')
@Controller('tarefa')
export class TarefaController {
  constructor(private tarefaServie: TarefaService) {}

  @Post()
  @ApiOperation({ summary: 'Create tarefa' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiBody({
    type: TarefaDTO,
    description: 'Json structure for tarefa object'
  })
  create(@Body() body: TarefaDTO) {
    return this.tarefaServie.create(body)
  }

  @Get()
  @ApiOperation({ summary: 'Get all taarefas' })
  @ApiResponse({ status: 200, description: 'Returns all tarefas.' })
  findAll(): Promise<Tarefa[]> {
    return this.tarefaServie.findAll();
  }

  @Get('membro/:id')
  @ApiOperation({ summary: 'Find tarefas by membro ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the membro' })
  @ApiResponse({ status: 200, description: 'Returns tarefas with the specified membro ID.' })
  findAllByMembroId(@Param('id') id: string): Promise<Tarefa[]> {
    return this.tarefaServie.findAllByMembroId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find tarefa by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the tarefa' })
  @ApiResponse({ status: 200, description: 'Returns a tarefa with the specified ID.' })
  findOne(@Param('id') id: string): Promise<Tarefa> {
    return this.tarefaServie.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tarefa' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the tarefa' })
  @ApiResponse({ status: 200, description: 'The tarefa has been successfully updated.' })
  @ApiBody({
    type: UpdateTarefaDTO,
    description: 'Json structure for updating tarefa object',
  })
  update(@Req() request, @Param('id') id: string, @Body() updateTarefaDTO: UpdateTarefaDTO) {
    return this.tarefaServie.updateTarefa(id, updateTarefaDTO, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tarefa' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the tarefa' })
  @ApiResponse({ status: 200, description: 'The tarefa has been successfully deleted.' })
  delete(@Req() request, @Param('id') id: string) {
    return this.tarefaServie.deleteTarefa(id, request);
  }

}