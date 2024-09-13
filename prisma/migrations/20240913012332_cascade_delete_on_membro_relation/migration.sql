-- DropForeignKey
ALTER TABLE `tarefa` DROP FOREIGN KEY `Tarefa_membroId_fkey`;

-- AddForeignKey
ALTER TABLE `Tarefa` ADD CONSTRAINT `Tarefa_membroId_fkey` FOREIGN KEY (`membroId`) REFERENCES `Membro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
