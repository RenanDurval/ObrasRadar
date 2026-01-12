# ObraRadar

**Plataforma de Inteligência de Mercado e Geração de Leads para Manutenção Industrial.**

O ObraRadar é um SaaS B2B projetado para automatizar a prospecção de obras e serviços industriais, conectando prestadores de serviços a oportunidades qualificadas em tempo real.

## Principais Recursos (MVP)

-   **Mineração de Leads**: Monitoramento automático de editais e oportunidades públicas.
-   **Classificação Inteligente**: Categorização de leads por região, tipo de serviço e valor estimado.
-   **Dashboard Comercial**: Visão geral de novas oportunidades e métricas de conversão.
-   **Gestão de Planos**: Diferentes níveis de acesso (Gratuito, Profissional, Empresarial).

## Estrutura do Projeto

Este repositório opera como um **Monorepo** contendo:

-   `/frontend`: Aplicação Web desenvolvida em **Next.js** (React).
-   `/backend`: API desenvolvida em **Node.js** com **Express** e **Prisma** (SQLite para dev).
-   `/documentacao-relatorios`: Documentação detalhada da arquitetura e regras de negócio.

## Tecnologias

-   **Frontend**: Next.js, Tailwind CSS, TypeScript.
-   **Backend**: Node.js, Express, Prisma ORM, JWT, Bcrypt.
-   **Banco de Dados**: SQLite (Desenvolvimento).

## Como Executar

### Pré-requisitos
-   Node.js (v18+)
-   NPM ou Yarn

### Instalação

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    cd backend && npm install
    cd ../frontend && npm install
    ```
3.  Inicie o Backend:
    ```bash
    cd backend
    npm start
    ```
4.  Inicie o Frontend:
    ```bash
    cd frontend
    npm run dev
    ```

---
Desenvolvido por Renan Durval.