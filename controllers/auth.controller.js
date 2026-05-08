import argon2 from "argon2";
import prisma from "../lib/db.js";
import { signUpSchema } from "../validations/auth.validation.js";
import generateToken from "../generateToken/generateToken.js";
// Sign up controller
export async function SignUpController(req, res) {
    try {
        // 1. Validation
        const parsed = signUpSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation error:",
                errors: parsed.error.issues.map((issue) => issue.message),
            });
        }

        const { fullName, birthDate, email, password, role } = parsed.data;

        // 2. Check if email exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "This email is already registered",
            });
        }

        // 3. Hash password
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 65536, // 64 MB
            timeCost: 3,
            parallelism: 4,
        });

        // 4. Create user
        const user = await prisma.user.create({
            data: {
                fullName,
                birthDate: new Date(birthDate),
                email,
                password: hashedPassword,
                role,
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        });

        // 5. Generate JWT token
        generateToken(user.id, res);

        return res.status(201).json({
            message: "Successfully registered",
            data: user,
        });
    } catch (error) {
        console.error("SignUp error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Login controller
export async function LoginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //check isActive
        if (!user.isActive) {
            return res.status(403).json({ message: "You are blocked by admin" });
        }

        //check password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        generateToken(user.id, res);

        return res.status(200).json({
            message: "Successfully logged in",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Logout controller
export async function LogoutController(req, res) {
    try {
        res.clearCookie("Task1");
        return res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}