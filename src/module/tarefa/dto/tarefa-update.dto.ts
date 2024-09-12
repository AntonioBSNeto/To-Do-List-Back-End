import { PartialType } from "@nestjs/swagger";
import { TarefaDTO } from "./tarefa.dto";

export class UpdateTarefaDTO extends PartialType(TarefaDTO) {}