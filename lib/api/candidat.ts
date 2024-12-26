import { prisma } from "@/lib/prisma";
import { Candidat } from "@/prisma/generated/client";


export async function addNewCandidat(candidatData: Omit<Candidat, "id" | "createdAt" | "updatedAt">) {

  return prisma.candidat.create({
    data: {
      nom: candidatData.nom,
      prenom: candidatData.prenom,
      age: candidatData.age,
      genre: candidatData.genre,
      situationMatrimoniale: candidatData.situationMatrimoniale,
      adresse: candidatData.adresse,
      numeroTelephone: candidatData.numeroTelephone,
      avecSansEnfant: candidatData.avecSansEnfant,
      typeService: candidatData.typeService,
      zonePreference: candidatData.zonePreference,
      rayonAction: candidatData.rayonAction,
      frequenceDescente: candidatData.frequenceDescente,
      frequencePrestation: candidatData.frequencePrestation,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function getCandidats() {
  return prisma.candidat.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      nom: true,
      prenom: true,
      genre: true,
      createdAt: false,
    },
  });
}

// export async function getUsers() {
//   return prisma.user.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//     select: {
//       email: true,
//       name: true,
//       role: true,
//       createdAt: false,
//     },
//   });
// }

// export async function getUserCount() {
//   return prisma.user.count();
// }

// export async function addNewUser(formData: any) {
//     const response = await fetch("/api/users/create", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     return response;
// }

// export async function deleteUser(id: string) {
//   // Await the findUnique query to get the user object
//   const user = await prisma.user.findUnique({
//     where: {
//       id: id
//     }
//   });

//   // Check if the user exists before attempting to delete
//   if (user) {
//     // Await the delete operation
//     return await prisma.user.delete({
//       where: {
//         id: user.id
//       }
//     });
//   } else {
//     throw new Error('User not found');
//   }
// }

// In api/users.ts
// export async function updateUser(id: string, userData: Partial<User>) {
//   const user = await prisma.user.findUnique({
//     where: { id },
//   });

//   if (user) {
//     return await prisma.user.update({
//       where: { id },
//       data: userData,
//     });
//   } else {
//     throw new Error('User not found');
//   }
// }

//export async function addNewUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  // Hash the password before saving
  //const hashedPassword = await hash(userData.password,12);

//   return prisma.user.create({
//     data: {
//       name: userData.name,
//       email: userData.email,
//       password: userData.password,
//       role: userData.role,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   });
// }


// export async function getUserByIdOrEmail(id?: string, email?: string): Promise<User | null> {
//   if (id) {
//     return prisma.user.findUnique({
//       where: { id },
//     });
//   }

//   if (email) {
//     return prisma.user.findUnique({
//       where: { email },
//     });
//   }

//   return null; // Return null if neither id nor email is provided
// }


// export async function deteleUserByEmail(email: string) {
//   let user;

//   if (email === "admin@example.com") {
//       user = null;
//       console.log("User is admin no deleted")
//   } else {
//     user = await prisma.user.findUnique({
//       where: { email },
//     });
//   }

//   if(user) {
//     return deleteUser(user.id);
//   }

//   return null;
// }
