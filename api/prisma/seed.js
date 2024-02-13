const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.utilisateur.upsert({
    where: { email: "alice@mail.com" },
    update: {},
    create: {
      email: "alice@mail.com",
      motDePasse:
        "$2b$12$pXPbvTz3cGJisuMAigo.vO.MBSul9jfVKYgocY/ys0VBCYhtlvYh6",
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
        "$2b$12$oL2/yN8mzja1MtCcuNBWMeiGFdkg6m/V40JE.FomIBuWwrlmZasQi",
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
        "$2b$12$uidNFgJqa0OVrOTkcvnUe.VGDXKZMMZz3Phn/alWATueIL1XguuC.",
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

  const diffusion1 = await prisma.diffusion.upsert({
    where: { id: "8457d296-c8e6-4a75-b71b-ff2d775e6465" },
    update: {},
    create: {
      id: "8457d296-c8e6-4a75-b71b-ff2d775e6465",
      direct: false,
      titre: "La dinguerie du chef ??",
      vue: 2,
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
      description: "wow !",
      public: true,
      geolocalisationId: geo2.id,
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
      description: "Donnez votre avis",
      public: true,
      createurEmail: alice.email,
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
