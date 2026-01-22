import JWT from "jsonwebtoken";

//load environment variables fro .env file
import dotenv from "dotenv";
dotenv.config();
const { JWT_EXPIRY, JWT_SECRET } = process.env;

const jwtToken = async (id, email, role) => {
  return JWT.sign({ id, email, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};
export default jwtToken;
