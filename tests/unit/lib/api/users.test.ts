// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { mockDeep } from 'vitest-mock-extended';
// import { PrismaClient, Role } from '@prisma/client';
// import { getUsers, getUserCount } from '@/lib/api/users';

// vi.mock('@/lib/prisma', () => ({
//   prisma: mockDeep<PrismaClient>(),
// }));

// describe('users API', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('should get users list', async () => {
//     const mockUsers = [
//       { name: 'Test User', email: 'test@example.com', role: Role.ADMIN },
//       { name: 'Another User', email: 'another@example.com', role: Role.USER  },
//     ];

//     vi.mocked(getUsers).mockResolvedValue(mockUsers);

//     const users = await getUsers();
    
//     expect(users).toHaveLength(2);
//     expect(users).toEqual(mockUsers);
//   });

//   it('should get user count', async () => {
//     vi.mocked(getUserCount).mockResolvedValue(5);

//     const count = await getUserCount();
    
//     expect(count).toBe(5);
//   });
// });



import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';
import { PrismaClient, Role, User } from '@prisma/client';
import { getUsers, getUserCount, deleteUser, updateUser, addNewUser, getUserByIdOrEmail, deteleUserByEmail } from '@/lib/api/users';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

vi.mock('@/lib/prisma', () => ({
  prisma: mockDeep<PrismaClient>(),
}));

describe('users API', async() => {
  const mockPrisma = prisma as DeepMockProxy<PrismaClient>;
//const password = await hash(req.body.password, 12);
  
  const mockUser: User = { 
    id: 'user-id-123',
    name: 'test user', 
    email: 'test@example.com', 
    role: Role.ADMIN,
    password: "Passer123@",
    createdAt: new Date(),
    updatedAt: new Date(),
 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should add a new user', async () => {
    // Mock the behavior of Prisma's user.create method
    mockPrisma.user.create.mockResolvedValue({
      ...mockUser,
      id: 'user-id-123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Call the function to add a new user
    const addedUser = await addNewUser(mockUser);
    //console.log(addedUser, newUser)

    // Assertions
    expect(addedUser).toHaveProperty('id');
    expect(addedUser.name).toBe(mockUser.name);
    expect(addedUser.email).toBe(mockUser.email);
    expect(addedUser.role).toBe(mockUser.role);
    //expect(addedUser.password).not.toBe(newUser.password); // Verify that the password was hashed
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: {
        name: mockUser.name,
        email: mockUser.email,
        password: expect.any(String), // Check that the password is hashed
        role: mockUser.role,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });

//   it("should add new user", async() => {
//         // Mock du comportement de Prisma pour la création d'un utilisateur
//         mockPrisma.user.create.mockResolvedValue(newUser);
//         //const response = await addNewUser(newUser)
//         const response = await fetch("/api/users", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newUser),
//           });
//         const data = await response.json();
//         //console.log(user);

//         expect(data.user).toHaveProperty("id"); // Vérifie si l'utilisateur a un ID généré
//         expect(data.user.name).toBe(newUser.name); // Vérifie si le nom correspond
//         expect(data.user.email).toBe(newUser.email); // Vérifie si l'email correspond
//         expect(data.user).not.toHaveProperty("Passer123@"); // Vérifie que le mot de passe brut n'est pas retourné

//          // Assertions
//          expect(mockPrisma.user.create).toHaveBeenCalledTimes(1); // Vérifie que create est appelé une fois
//          expect(mockPrisma.user.create).toHaveBeenCalledWith({
//              data: {
//                  id: newUser.id,
//                  name: newUser.name,
//                  email: newUser.email,
//                  role: newUser.role,
//                  createdAt: newUser.createdAt,
//                  updatedAt: newUser.updatedAt,
//                  password: expect.any(String), // Vérifie que le mot de passe est bien formaté (par exemple haché)
//              },
//          });
 
//          expect(data.user).toEqual(newUser); // Vérifie que l'utilisateur retourné correspond au mock
//   });

  it('should get users list', async () => {
    const mockUsers = [
        { name: 'Admin User', email: 'admin@example.com', role: Role.ADMIN },
        { name: 'superadmin', email: 'superadmin@gmail.com', role: Role.ADMIN  },
      ];

    mockPrisma.user.findMany.mockResolvedValue(mockUsers);

    const users = await getUsers();
    
    expect(users).toHaveLength(2);
  });

  it('should delete user by id', async () => {
    const userIdToDelete = 'user-id-123';
    
    // Mock the findUnique to simulate user being found
    mockPrisma.user.findUnique.mockResolvedValue({
      id: userIdToDelete,
      name: 'test user',
      email: 'test@example.com',
      role: Role.ADMIN,
      password: await hash('Passer123@', 12),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Mock the delete to simulate successful deletion
    mockPrisma.user.delete.mockResolvedValue({
      id: userIdToDelete,
      name: 'test user',
      email: 'test@example.com',
      role: Role.ADMIN,
      password: await hash('Passer123@', 12),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Simulate calling the delete function
    const deletedUser = await deleteUser(userIdToDelete);

    // Assertions
    expect(deletedUser).toHaveProperty('id', userIdToDelete);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userIdToDelete } });
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: userIdToDelete } });
  });

  it('should update user by id', async () => {
    const userIdToUpdate = 'user-id-123';
    const updatedData = { name: 'Updated User', email: 'updated@example.com' };

    // Mock the findUnique to simulate the user being found
    mockPrisma.user.findUnique.mockResolvedValue({
      id: userIdToUpdate,
      name: 'test user',
      email: 'test@example.com',
      role: Role.ADMIN,
      password: await hash('Passer123@', 12),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Mock the update to simulate successful update
    mockPrisma.user.update.mockResolvedValue({
      ...updatedData,
      id: userIdToUpdate,
      role: Role.ADMIN,
      password: await hash('Passer123@', 12),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Simulate calling the update function
    const updatedUser = await updateUser(userIdToUpdate, updatedData);

    // Assertions
    expect(updatedUser).toHaveProperty('id', userIdToUpdate);
    expect(updatedUser.name).toBe(updatedData.name);
    expect(updatedUser.email).toBe(updatedData.email);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userIdToUpdate } });
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: userIdToUpdate },
      data: updatedData,
    });
  });


  it('should get user count', async () => {
    mockPrisma.user.count.mockResolvedValue(5);

    const count = await getUserCount();
    
    expect(count).toBe(5);
    expect(mockPrisma.user.count).toHaveBeenCalled();
  });

  it('should get user by id', async () => {
    // Mock the behavior of Prisma's findUnique to return the mock user by ID
    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    // Call the function to get the user by ID
    const user = await getUserByIdOrEmail('user-id-123', undefined);

    // Assertions
    expect(user).toBeDefined();
    expect(user?.id).toBe(mockUser.id);
    expect(user?.email).toBe(mockUser.email);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-id-123' },
    });
  });

  it('should get user by email', async () => {
    // Mock the behavior of Prisma's findUnique to return the mock user by email
    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    // Call the function to get the user by email
    const user = await getUserByIdOrEmail(undefined, 'test@example.com');

    // Assertions
    expect(user).toBeDefined();
    expect(user?.email).toBe(mockUser.email);
    expect(user?.id).toBe(mockUser.id);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
  });

  it('should delete user by email', async() => {
    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    const userEmailToDelete = 'test@example.com'

    // Call the function to get the user by email
    const deleteUser = await deteleUserByEmail(userEmailToDelete);

        // Assertions
        expect(deleteUser).toHaveProperty('email', userEmailToDelete);
        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: userEmailToDelete } });
        //expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: userEmailToDelete } });

  })
});