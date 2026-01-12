const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'ObraRadar API is running' });
});

// Seed Initial Data (Plans)
app.post('/api/admin/seed', async (req, res) => {
    try {
        const plansCount = await prisma.plan.count();
        if (plansCount === 0) {
            await prisma.plan.createMany({
                data: [
                    { name: 'Gratuito', price: 0, limits: JSON.stringify({ leadsPerMonth: 10, alerts: false }) },
                    { name: 'Profissional', price: 99.9, limits: JSON.stringify({ leadsPerMonth: 9999, alerts: true }) },
                    { name: 'Empresarial', price: 499.9, limits: JSON.stringify({ leadsPerMonth: 9999, alerts: true, multiUser: true }) },
                ]
            });
            return res.json({ message: 'Plans seeded successfully' });
        }
        res.json({ message: 'Plans already exist' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Public Leads endpoint (Limited for MVP)
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20
        });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Vercel Support: Only listen if run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
