import jwt from "jsonwebtoken";
import { config } from "dotenv";
import prisma from '../lib/db.js'
config();

export async function ProtectRoute(req, res, next) {
    try {
        // Take token from cookie
        const cookieToken = req.cookies["Task1"];
        
        // Take token from header
        const authHeader = req.headers.authorization;
        const headerToken = authHeader && authHeader.split(" ")[1];

        // If token is not found in both cookie and header
        if (!cookieToken && !headerToken) {
            return res
                .status(401)
                .json({ message: "You don't have a token. Please log in ‼️" });
        }

        // Check token (from cookie or header)
        const token = cookieToken || headerToken;
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decode) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decode.UserId,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error with protectRoute Middleware:", error.message);
        res.status(500).json({ message: "Server error ❌" });
    }
}