const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.utilisateur.upsert({
    where: { email: "alice@mail.com" },
    update: {},
    create: {
      email: "alice@mail.com",
      motDePasse:
        "$2b$12$/unaL6vg/dJkAiGCncteguVf8iyZ4hIBuf5eQuscF7MQhTwAPayv2",
      pseudo: "AliceOff",
      listeDeProximite: false,
    },
  });

  const michel = await prisma.utilisateur.upsert({
    where: { email: "michel@mail.com" },
    update: {},
    create: {
      email: "michel@mail.com",
      motDePasse:
        "$2b$12$yKRSSonVnjwYqkpkHrmnPechBgxTu5Vg56MZ91K4tmdlHfaGneebO",
      pseudo: "Bambino12",
      photo: "4c4d7ab4-541e-4a44-a653-c11ae4ccfa30",
      listeDeProximite: true,
    },
  });

  const christian = await prisma.utilisateur.upsert({
    where: { email: "christian@mail.com" },
    update: {},
    create: {
      email: "christian@mail.com",
      motDePasse:
        "$2b$12$NIFGPYH5JsKBJGmW.dvageF2IT2yfjjRWcitArH5FcEGx1QLJrEuS",
      pseudo: "ChristianVevo",
      photo: "c2285bbb-65dd-4b07-8e3f-45b2b4e47a6b",
      listeDeProximite: false,
    },
  });

  const geo1 = await prisma.geolocalisation.create({
    data: {
      id: 0,
      latitude: 48.8566,
      longitude: 2.3522,
    },
  });

  const geo2 = await prisma.geolocalisation.create({
    data: {
      id: 1,
      latitude: 48.8566,
      longitude: 2.3523,
    },
  });

  const geo3 = await prisma.geolocalisation.create({
    data: {
      id: 2,
      latitude: 48.8566,
      longitude: 2.3521,
    },
  });

  const diffusion1 = await prisma.diffusion.upsert({
    where: { id: "8457d296-c8e6-4a75-b71b-ff2d775e6465" },
    update: {},
    create: {
      id: "8457d296-c8e6-4a75-b71b-ff2d775e6465",
      direct: false,
      titre: "La dinguerie du chef ??",
      vue: 2,
      urgence: false,
      description: "Completement chobkar par ce que j'ai vu",
      public: true,
      geolocalisationId: geo1.id,
      createurEmail: alice.email,
    },
  });

  const diffusion2 = await prisma.diffusion.upsert({
    where: { id: "d2e66b87-41e0-4f01-99ba-d91a3fe17c28" },
    update: {},
    create: {
      id: "d2e66b87-41e0-4f01-99ba-d91a3fe17c28",
      direct: false,
      titre: "NoScope1v1Dust2.mp4",
      vue: 347,
      urgence: false,
      description: "wow !",
      public: true,
      createurEmail: christian.email,
    },
  });

  const diffusion3 = await prisma.diffusion.upsert({
    where: { id: "8d926c39-ef68-4efc-97fe-b0c3f3f32edb" },
    update: {},
    create: {
      id: "8d926c39-ef68-4efc-97fe-b0c3f3f32edb",
      direct: true,
      titre: "Encore quelque chose de fou..",
      vue: 4,
      urgence: false,
      description: "Donnez votre avis",
      geolocalisationId: geo2.id,
      public: true,
      createurEmail: alice.email,
    },
  });

  const diffusion4 = await prisma.diffusion.upsert({
    where: { id: "871d3376-ec0b-464f-a137-5886cc16be71" },
    update: {},
    create: {
      id: "871d3376-ec0b-464f-a137-5886cc16be71",
      direct: true,
      titre: "Venez vite !",
      vue: 2,
      urgence: true,
      description: "c'est affligeant..",
      public: true,
      geolocalisationId: geo3.id,
      createurEmail: michel.email,
    },
  });

  const like1 = await prisma.like.create({
    data: {
      utilisateurEmail: michel.email,
      diffusionId: diffusion1.id,
    },
  });

  const like2 = await prisma.like.create({
    data: {
      utilisateurEmail: christian.email,
      diffusionId: diffusion1.id,
    },
  });

  const commentaire = await prisma.commentaire.create({
    data: {
      utilisateurEmail: christian.email,
      diffusionId: diffusion1.id,
      commentaire: "C'était vraiment révoltant !!!",
    },
  });

  const tag1 = await prisma.tag.create({
    data: {
      tag: "Violence",
      diffusionId: diffusion1.id,
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      tag: "Ecole",
      diffusionId: diffusion1.id,
    },
  });

  const abonnementAliceMichel = await prisma.abonnement.upsert({
    where: {
      abonnementEmail_abonneEmail: {
        abonnementEmail: alice.email,
        abonneEmail: michel.email,
      },
    },
    update: {},
    create: {
      abonnementEmail: alice.email,
      abonneEmail: michel.email,
      notification: true,
    },
  });

  const abonnementAliceChristian = await prisma.abonnement.upsert({
    where: {
      abonnementEmail_abonneEmail: {
        abonnementEmail: alice.email,
        abonneEmail: christian.email,
      },
    },
    update: {},
    create: {
      abonnementEmail: alice.email,
      abonneEmail: christian.email,
      notification: false,
    },
  });

  const listeUrgence = await prisma.listeUrgence.create({
    data: {
      utilisateurEmetteurEmail: alice.email,
      utilisateurRecepteurEmail: christian.email,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
