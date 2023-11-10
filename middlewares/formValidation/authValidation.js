import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
export const validateAuthentication = async (req, res, next) => {
    const { userinfo, password } = req.body;

    if (!userinfo || !password) {
        return res.status(401).json({
            error: "Authentication failed",
        });
    } else {
        if (userinfo) {
            const user = await User.findOne({
                $or: [{ email: userinfo }, { cell: userinfo }, { username: userinfo }],
            });
            if (user) {
                const comparePassword = await bcrypt.compare(password, user.password);
                if (comparePassword) {
                    next();
                }
            } else {
                next("Authentication failed");
            }
        } else {
            next("Authentication failed");
        }
    }
};
