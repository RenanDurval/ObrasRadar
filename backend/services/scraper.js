const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runScraper() {
    console.log('Starting Scraper...');

    const mockLeads = [
        {
            title: 'Fornecimento de Cabos de Cobre - Edital 001/2026',
            description: 'Aquisição de cabos de cobre isolados para manutenção da rede elétrica industrial.',
            sourceUrl: 'https://comprasnet.gov.br/editais/001-2026',
            region: 'São Paulo, SP',
            category: 'Eletrica',
            type: 'Edital',
            estimatedValue: 150000,
            urgencyScore: 3,
            summary: 'Compra de grande volume de cabos de cobre para SP.',
            fullContent: 'Conteúdo completo do edital aqui...'
        },
        {
            title: 'Manutenção de Bombas Hidráulicas - Chamada 02/2026',
            description: 'Chamada para fornecedores de peças de reposição para bombas hidráulicas industriais.',
            sourceUrl: 'https://industria.com.br/oportunidades/bombas',
            region: 'Joinville, SC',
            category: 'Hidraulica',
            type: 'Chamada de fornecimento',
            estimatedValue: 45000,
            urgencyScore: 2,
            summary: 'Peças para bombas hidráulicas em Santa Catarina.',
            fullContent: 'Conteúdo completo da chamada aqui...'
        }
    ];

    for (const lead of mockLeads) {
        await prisma.lead.create({
            data: lead
        });
    }

    console.log(`Scraper finished. Created ${mockLeads.length} leads.`);
}

module.exports = { runScraper };
