import { JWTPayload, jwtVerify } from 'jose';

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

  if (!secret) {
    throw new Error('JWT Secret key is not matched');
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
