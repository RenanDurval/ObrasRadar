const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Use env variable in production

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, companyName } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Company and User (Transaction would be better but keeping simple for MVP)
        // Check/Create Default Plan (Free)
        let defaultPlan = await prisma.plan.findFirst({ where: { name: 'Gratuito' } });
        if (!defaultPlan) {
             // Fallback if seed wasn't run
             defaultPlan = await prisma.plan.create({
                data: { name: 'Gratuito', price: 0, limits: JSON.stringify({ leadsPerMonth: 10 }) }
             });
        }

        const newCompany = await prisma.company.create({
            data: {
                name: companyName,
                cnpj: Math.random().toString(36).substring(7), // Temporary Fake CNPJ
                planId: defaultPlan.id
            }
        });

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                companyId: newCompany.id,
                role: 'ADMIN' // First user is admin of company
            }
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ 
            where: { email },
            include: { company: true } 
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role, companyId: user.companyId },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { name: user.name, email: user.email, company: user.company.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

module.exports = router;
