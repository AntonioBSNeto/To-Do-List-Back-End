import { Module } from '@nestjs/common';
import { MembroModule } from './module/membro/membro.module';
import { TarefaModule } from './module/tarefa/tarefa.module';

@Module({
  imports: [MembroModule, TarefaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
