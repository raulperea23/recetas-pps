import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("./scripts/serviceAccount.json", "utf-8"),
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const recetas = JSON.parse(readFileSync("./scripts/recetas.json", "utf-8"));

async function importar() {
  console.log(`Importando ${recetas.length} recetas...`);

  for (const receta of recetas) {
    const recetaCompleta = {
      ...receta,
      fechaPublicacion: new Date(),
    };

    await db.collection("recetas").add(recetaCompleta);
    console.log(`✅ Importada: ${receta.nombre}`);
  }

  console.log("🎉 Importación completada");
  process.exit(0);
}

importar().catch((err) => {
  console.error("❌ Error durante la importación:", err);
  process.exit(1);
});
