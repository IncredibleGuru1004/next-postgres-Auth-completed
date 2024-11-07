import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = "your-secret-key"; // Use a safe way to store your secret, such as environment variables

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return verify;
  } catch (error) {
    console.log(error,"====");
  }
};
