import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Candidat } from "@/prisma/generated/client";
import { addNewCandidat } from "@/lib/api/candidat";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const requiredFields = [
      "nom",
      "prenom",
      "age",
      "genre",
      "situationMatrimoniale",
      "adresse",
      "numeroTelephone",
      "avecSansEnfant",
      "typeService",
      "zonePreference",
      "rayonAction",
      "frequencePrestation",
      "frequenceDescente"
    ];

    const missingFields = requiredFields.filter(field => {
      const value = req.body[field];
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Champs manquants",
        missingFields: missingFields.map(field => ({
          field,
          message: `Le champ "${field}" est requis`
        }))
      });
    }

    const {
      nom,
      prenom,
      age,
      genre,
      situationMatrimoniale,
      adresse,
      numeroTelephone,
      avecSansEnfant,
      typeService,
      zonePreference,
      rayonAction,
      frequencePrestation,
      frequenceDescente
    } = req.body;

    const candidatData: Omit<Candidat, "id" | "createdAt" | "updatedAt"> = {
      nom,
      prenom,
      age,
      genre,
      situationMatrimoniale,
      adresse,
      numeroTelephone,
      avecSansEnfant,
      typeService,
      zonePreference,
      rayonAction,
      frequenceDescente,
      frequencePrestation
    };

    try {
      const newCandidat = await addNewCandidat(candidatData);
      res.status(201).json({ candidat: newCandidat });
    } catch (error) {
      console.error("Erreur lors de l'ajout du candidat :", error);
      res.status(500).json({ 
        error: "Erreur lors de l'ajout du candidat",
        details: error instanceof Error ? error.message : "Une erreur inconnue est survenue"
      });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}