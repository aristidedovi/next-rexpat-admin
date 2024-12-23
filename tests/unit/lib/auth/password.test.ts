import { describe, it, expect } from 'vitest';
import { hash } from 'bcrypt';

//import { hashPassword } from '@/lib/auth/password';

describe('password utils', () => {
  it('should hash password correctly', async () => {
    const password = 'testPassword123';
    const hashedPassword = await hash(password, 12);
    
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword.length).toBeGreaterThan(0);
  });
});