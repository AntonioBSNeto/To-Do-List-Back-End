import { Module } from "@nestjs/common";
import { TarefaController } from "./tarefa.controller";
import { TarefaService } from "./tarefa.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
  controllers: [TarefaController],
  providers: [TarefaService, PrismaService]
})
export class TarefaModule {}