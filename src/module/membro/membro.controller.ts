import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MembroService } from "./membro.service";
import { MembroDTO } from "./dto/membro.dto";
import { MembroSemSenha } from "./util/membroSemSenha";
import { UpdateMembroDTO } from "./dto/update-membro.dto";

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

  @Get()
  @ApiOperation({ summary: 'Get all membros' })
  @ApiResponse({ status: 200, description: 'Returns all membros.' })
  findAll(): Promise<MembroSemSenha[]> {
    return this.membroService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find membro by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the membro' })
  @ApiResponse({ status: 200, description: 'Returns a membro with the specified ID.' })
  findOne(@Param('id') id: string): Promise<MembroSemSenha> {
    return this.membroService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a membro' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the membro' })
  @ApiResponse({ status: 200, description: 'The membro has been successfully updated.' })
  @ApiBody({
    type: UpdateMembroDTO,
    description: 'Json structure for updating membro object',
  })
  update(@Param('id') id: string, @Body() updateMembroDTO: UpdateMembroDTO) {
    return this.membroService.updateMembro(id, updateMembroDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a membro' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the membro' })
  @ApiResponse({ status: 200, description: 'The membro has been successfully deleted.' })
  delete(@Param('id') id: string) {
    return this.membroService.deleteMembro(id);
  }

}