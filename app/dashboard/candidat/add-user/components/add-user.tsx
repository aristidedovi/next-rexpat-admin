"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Utilisation de `next/navigation`
import { Role } from "@prisma/client";

// interface AddUserProps {
//   formData: {
//     name: string;
//     email: string;
//     password: string;
//     role: string;
//   };
//   message: string;
//   handleSubmit: (e: React.FormEvent) => void;
//   handleChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => void;
// }

const AddUser = () => {
  const [formData, setFormData] = useState({
    //    id: "",
    name: "",
    email: "",
    password: "",
    role: Role.USER,
    // createdAt: new Date(),
    // updatedAt: new Date(),
  });

  const [message, setMessage] = useState("");
  const { data: session, status } = useSession(); // Récupère la session de l'utilisateur
  const router = useRouter(); // Initialisez le hook pour naviguer

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //console.log(formData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // if (status !== "authenticated") {
    //   return setMessage(
    //     "Vous devez être connecté pour ajouter un utilisateur."
    //   );
    // }
    console.log(session);

    // Vérifie si l'utilisateur est authentifié
    if (status !== "authenticated" || !session?.user) {
      return setMessage(
        "Vous devez être connecté pour ajouter un utilisateur."
      );
    }

    // Vérification du rôle (ADMIN)
    if (session.user.role !== "ADMIN") {
      return setMessage(
        "Vous devez être un administrateur pour ajouter un utilisateur."
      );
    }
    console.log(formData);
    //router.push("/dashboard/users");
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Nouveau utilisateur créer");
        // Mettre à jour les données locales
        //const updatedData = tableData.filter((user) => user.email !== email);
        //setTableData(updatedData);
        //onDataChange(updatedData);
        //router.refresh(); // Rafraîchir la page pour obtenir les nouvelles données
        //setMessage("Utilisateur ajouté avec succès !");
        //setFormData({ name: "", email: "", password: "", role: Role.USER });
        // Rediriger après le succès
        setMessage("Utilisateur ajouté avec succès !");
        setFormData({ name: "", email: "", password: "", role: Role.USER });
        router.push("/dashboard/users");
      } else {
        setMessage("Erreur lors de l'ajout de l'utilisateur.");
        //setMessage("Erreur lors de l'ajout de l'utilisateur.");
      }

      // const newUser = await addNewUser(formData);

      // if (newUser) {
      //   // Si l'utilisateur a été ajouté avec succès
      //   setMessage("Utilisateur ajouté avec succès !");
      //   setFormData({ name: "", email: "", password: "", role: Role.USER });

      //   // Redirection après le succès
      //   router.push("/dashboard/users");
      // } else {
      //   // Si l'ajout échoue sans erreur explicite
      //   setMessage("Erreur lors de l'ajout de l'utilisateur.");
      // }
      // const response = await fetch("/api/users/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (response.ok) {
      //   setMessage("Utilisateur ajouté avec succès !");
      //   setFormData({ name: "", email: "", password: "", role: Role.USER });
      //   // Rediriger après le succès
      //   router.push("/dashboard/users");
      // } else {
      //   setMessage("Erreur lors de l'ajout de l'utilisateur.");
      // }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur réseau.");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
            value={formData.role}
          >
            <option disabled value="">
              Selectionnez
            </option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Ajouter
        </button>
        {message && <p className="text-center mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default AddUser;
