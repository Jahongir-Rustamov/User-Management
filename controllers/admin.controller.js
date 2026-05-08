import prisma from "../lib/db.js";

// get all users
export async function GetAllUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            where: { role: "user" },
            omit: {
                password: true,
            },
        });
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in GetAllUsers controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

// get user by id
export async function GetUserById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await prisma.user.findUnique({
            where: { id },
            omit: {
                password: true,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in GetUserById controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

// block user
export async function BlockUser(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await prisma.user.update({
            where: { id },
            data: {
                isActive: false,
            },
            omit: {
                password: true,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in BlockUser controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

// unblock user
export async function UnBlockUser(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await prisma.user.update({
            where: { id },
            data: {
                isActive: true,
            },
            omit: {
                password: true,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in UnBlockUser controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

// get blocked users
export async function GetBlockedUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            where: { isActive: false, role: "user" },
            omit: {
                password: true,
            },
        });
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in GetBlockedUsers controller", error.message);
        res.status(500).json({ message: error.message });
    }
}
