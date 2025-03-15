import jwt from "jsonwebtoken"; // ✅ Import jsonwebtoken

export const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify token

        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Access denied" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });    
    }
};
