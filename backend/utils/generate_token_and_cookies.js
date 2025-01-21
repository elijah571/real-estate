import jwt from "jsonwebtoken";

export const generate_token = async (res, id) => {
    const token = await jwt.sign({ id }, process.env.JWT_SECRETE, {
        expiresIn: '60d',
    });

    // Set cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
        maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days in milliseconds
    });
};
