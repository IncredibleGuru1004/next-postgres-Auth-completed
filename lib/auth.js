import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';

const SECRET_KEY = "your-secret-key"; // Use a safe way to store your secret, such as environment variables

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const generateToken = async(payload) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour

  return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(SECRET_KEY));
}

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return payload;
  } catch (error) {
    console.log("error: ", error)
  }
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
}