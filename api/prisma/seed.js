const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.utilisateur.upsert({
    where: {email: 'alice@mail.com'},
    update: {},
    create: {
      email: 'alice@mail.com',
      motDePasse: '$2b$12$pXPbvTz3cGJisuMAigo.vO.MBSul9jfVKYgocY/ys0VBCYhtlvYh6',
      pseudo: 'AliceOff',
      listeDeProximite: false,
    },
  });

  const michel = await prisma.utilisateur.upsert({
    where: {email: 'michel@mail.com'},
    update: {},
    create: {
      email: 'michel@mail.com',
      motDePasse: '$2b$12$oL2/yN8mzja1MtCcuNBWMeiGFdkg6m/V40JE.FomIBuWwrlmZasQi',
      pseudo: 'Bambino12',
      photo: '4c4d7ab4-541e-4a44-a653-c11ae4ccfa30',
      listeDeProximite: true,
    },
  });

  const christian = await prisma.utilisateur.upsert({
    where: {email: 'christian@mail.com'},
    update: {},
    create: {
      email: 'christian@mail.com',
      motDePasse: '$2b$12$uidNFgJqa0OVrOTkcvnUe.VGDXKZMMZz3Phn/alWATueIL1XguuC.',
      pseudo: 'ChristianVevo',
      photo: 'c2285bbb-65dd-4b07-8e3f-45b2b4e47a6b',
      listeDeProximite: false,
    },
  });

  const diffusion = await prisma.diffusion.upsert({
    where: {id: '8457d296-c8e6-4a75-b71b-ff2d775e6465'},
    update: {},
    create: {
      id: '8457d296-c8e6-4a75-b71b-ff2d775e6465',
      direct: false,
      titre: 'La dinguerie du chef ??',
      vue: 0,
      description: "Completement chobkar par ce que j'ai vu",
      public: true,
      longitude: 6.161199,
      latitude: 48.683157,
      createurEmail: alice.email,
    },
  });

  const like1 = await prisma.like.create({
    data: {
      utilisateurEmail: michel.email,
      diffusionId: diffusion.id,
    },
  });

  const like2 = await prisma.like.create({
    data: {
      utilisateurEmail: christian.email,
      diffusionId: diffusion.id,
    },
  });

  const commentaire = await prisma.commentaire.create({
    data: {
      utilisateurEmail: christian.email,
      diffusionId: diffusion.id,
      commentaire: "C'était vraiment révoltant !!!",
    },
  });

  const tag1 = await prisma.tag.create({
    data: {
      tag: 'Violence',
      diffusionId: diffusion.id,
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      tag: 'Ecole',
      diffusionId: diffusion.id,
    },
  });

  const abonnementAliceMichel = await prisma.abonnement.upsert({
    where: {
      abonnementEmail_abonneEmail: {abonnementEmail: alice.email, abonneEmail: michel.email},
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
      abonnementEmail_abonneEmail: {abonnementEmail: alice.email, abonneEmail: christian.email},
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
