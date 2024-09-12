import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { MembroController } from "./membro.controller";
import { MembroService } from "./membro.service";

@Module({
  controllers: [MembroController],
  providers: [MembroService, PrismaService]
})
export class MembroModule {}
