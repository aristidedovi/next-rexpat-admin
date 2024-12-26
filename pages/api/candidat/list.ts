import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getCandidats } from "@/lib/api/candidat";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
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


    // const { name, email, role } = req.body;
    // const password = await hash(req.body.password, 12);
    // const userData: Omit<User, "id" | "createdAt" | "updatedAt"> = {
    //   name: name,
    //   email: email,
    //   role: role,
    //   password: password
    // }

    try {
      const candidats = await getCandidats();
      res.status(201).json({candidats});
    } catch (error) {
      console.error("Erreur lors de la récuperation des utilisateurs :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
