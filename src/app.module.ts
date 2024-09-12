import { Module } from '@nestjs/common';
import { MembroModule } from './module/membro/membro.module';
import { TarefaModule } from './module/tarefa/tarefa.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [MembroModule, TarefaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
