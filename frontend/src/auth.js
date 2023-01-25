import jsonwebtoken from "jsonwebtoken";

export const PRIVATE_KEY = '1010FFF'
export const user = {
  email: 'email@email.com',
  senha: 'larissa'
}

export function tokenValited(
  request,
  response,
  next
) {
  const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];
  
  if(!token) return response.status(401).send(' No token provided.');

  try {
    const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
    const userIdFromToken = typeof payload !== 'string' && payload.user;

    if(!user && !userIdFromToken) {
      return response.send(401).json({ message: 'Invalid token' });
    }

    request.headers['user'] = payload.user;

    return next();
  } catch(error) {
    console.log(error);
    return response.status(401).json({ message: 'Invalid token' });
  }
}
Footer
