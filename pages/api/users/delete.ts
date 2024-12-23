import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { deteleUserByEmail } from "@/lib/api/users";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    //const { name, email, password } = req.body;
    // Vérifier la session de l'utilisateur
    //const session = await getSession({ req });
    //const session = await auth();
    const session = await getServerSession(req, res, authOptions)
    // //console.log(session);

    if (!session) {
      return res.status(401).json({ error: "Non autorisé. Veuillez vous connecter." });
    }
    //const session = await getSession({ req });

    if (!session || session?.user?.role !== "ADMIN") {
      // Si l'utilisateur n'est pas connecté ou n'est pas un ADMIN
      return res.status(403).json({ error: "Accès interdit. Vous devez être un administrateur." });
    }


    const email = req.body.email;
    //const password = await hash(req.body.password, 12);

    try {
      const deleteUser = deteleUserByEmail(email)
      // const newUser = await prisma.user.create({
      //   data: {
      //     name,
      //     email,
      //     password, // À hash pour une production sécurisée !
      //     role,
      //   },
      // });

      res.status(201).json({ user: deleteUser });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
