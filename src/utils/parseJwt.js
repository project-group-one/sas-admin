import jwt from 'jsonwebtoken';

export default function parseJwt(token) {
  const decoded = jwt.decode(token, {
    complete: true,
  });
  return decoded.payload;
}
