## Objetivo

O objetivo deste projeto é avaliar o código quanto à funcionalidade, usabilidade e aderência aos requisitos estabelecidos.

## Funcionalidades
1. Implementação dos atributos e suas restrições para a classe Tarefa
2.  Implementação dos atributos e suas restrições para a classe Membro
3. Autenticação de Membro
4. Restrições de edição e deleção

## Instalação de dependências

```bash
$ pnpm install
```

## Configurando o ambiente

É preciso configurar duas variáveis de ambiente, uma para gerar o token JWT e outra com a URL do MySQL.

1. Crie um arquivo `.env`
2. Crie as seguintes variáveis de ambiente ```DATABASE_URL``` e ```JWT_CONSTANT```
3. Atribua a elas os respectivos valores

## Executando o app

```bash
# Executar as Migrações
pnpm prisma migrate dev

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```
