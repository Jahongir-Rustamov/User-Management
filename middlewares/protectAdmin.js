export async function ProtectAdmin(req, res, next) {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Only Admin can access this route ❌" });
    }
}