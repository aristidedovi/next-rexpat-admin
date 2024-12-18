// import { Context } from "@/lib/context"

//import { Prisma } from "@prisma/client"

// interface CreateUser {
//   name: string
//   email: string
//   password: string
//   role: "USER" | "ADMIN"
//   //acceptTermsAndConditions: boolean
// }

// export async function createUser(user: CreateUser, ctx: Context) {
//   return await ctx.prisma.user.create({
//     data: user,
//   })
//   // if (user.acceptTermsAndConditions) {
    
//   // } else {
//   //   return new Error('User must accept terms!')
//   // }
// }

// interface UpdateUser {
//   id: string
//   name: string
//   email: string
//   role: "USER" | "ADMIN"
// }

// export async function updateUsername(user: UpdateUser, ctx: Context) {
//   return await ctx.prisma.user.update({
//     where: { id: user.id },
//     data: user,
//   })
// }


//import prisma from './client'
import {prisma} from "@/lib/prisma"


interface CreateUser {
  name: string
  email: string
  password: string
  role: "USER" | "ADMIN"
  //acceptTermsAndConditions: boolean
}

export async function createUser(user: CreateUser) {
    return await prisma.user.create({
        data: user,
      })
//   if (user.acceptTermsAndConditions) {

//   } else {
//     return new Error('User must accept terms!')
//   }
}

interface UpdateUser {
  id: string
  name: string
  email: string
}

export async function updateUsername(user: UpdateUser) {
  return await prisma.user.update({
    where: { id: user.id },
    data: user,
  })
}