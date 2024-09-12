import { PartialType } from '@nestjs/swagger';
import { MembroDTO } from './membro.dto';

export class UpdateMembroDTO extends PartialType(MembroDTO) {}