import { Module } from '@nestjs/common';
import { MembroModule } from './module/membro/membro.module';

@Module({
  imports: [MembroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
