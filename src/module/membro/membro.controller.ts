import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MembroService } from "./membro.service";
import { MembroDTO } from "./dto/membro.dto";
import { MembroSemSenha } from "./util/membroSemSenha";
import { UpdateMembroDTO } from "./dto/update-membro.dto";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('Membro')
@Controller('membro')
export class MembroController {
  constructor(private membroService: MembroService) {}

  @Post()
  @ApiOperation({ summary: 'Create membro'})
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiBody({
    type: MembroDTO,
    description: 'Json structure for membro object'
  })
  create(@Body() body: MembroDTO) {
    return this.membroService.create(body)
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all membros' })
  @ApiResponse({ status: 200, description: 'Returns all membros.' })
  findAll(): Promise<MembroSemSenha[]> {
    return this.membroService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Find membro by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the membro' })
  @ApiResponse({ status: 200, description: 'Returns a membro with the specified ID.' })
  findOne(@Param('id') id: string): Promise<MembroSemSenha> {
    return this.membroService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a membro' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the membro' })
  @ApiResponse({ status: 200, description: 'The membro has been successfully updated.' })
  @ApiBody({
    type: UpdateMembroDTO,
    description: 'Json structure for updating membro object',
  })
  update(@Req() request, @Param('id') id: string, @Body() updateMembroDTO: UpdateMembroDTO) {
    return this.membroService.updateMembro(id, updateMembroDTO, request);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a membro' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the membro' })
  @ApiResponse({ status: 200, description: 'The membro has been successfully deleted.' })
  delete(@Req() request, @Param('id') id: string) {
    return this.membroService.deleteMembro(id, request);
  }

}