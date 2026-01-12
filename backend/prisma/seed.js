const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding plans...');
    const plans = [
        { name: 'Gratuito', price: 0, limits: JSON.stringify({ leadsPerMonth: 10, alerts: false }) },
        { name: 'Profissional', price: 99.9, limits: JSON.stringify({ leadsPerMonth: 9999, alerts: true }) },
        { name: 'Empresarial', price: 499.9, limits: JSON.stringify({ leadsPerMonth: 9999, alerts: true, multiUser: true }) }
    ];
    for (const plan of plans) {
        await prisma.plan.upsert({
            where: { id: plan.name },
            update: {},
            create: plan
        }).catch(async (e) => { await prisma.plan.create({ data: plan }); });
    }
    console.log('Seeding complete!');
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
