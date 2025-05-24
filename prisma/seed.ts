import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Apaga os dados antigos
  await prisma.game.deleteMany()
  await prisma.category.deleteMany()

  // Criação das categorias
  const adventure = await prisma.category.create({
    data: { name: 'Aventura' },
  })
  const action = await prisma.category.create({
    data: { name: 'Ação' },
  })
  const puzzle = await prisma.category.create({
    data: { name: 'Puzzle' },
  })

  // Criação dos jogos do tipo SLIDE (destaques)
  const ori = await prisma.game.create({
    data: {
      title: 'Ori and the Blind Forest',
      imageUrl:
        'https://store-images.s-microsoft.com/image/apps.7767.14566546603801090.bfdd0400-3c33-4fef-8e32-472bcf6c08e6.91d25cc7-4edd-4a75-b85b-f5f704636066',
      videoUrl: 'https://youtu.be/-QFOJ_L6yFM?si=2Ofxebcwz8tOuBfn',
      logoUrl: 'https://ori.iam8bit.com/wp-content/uploads/2020/09/Ori-Logo-About.png',
      description:
        'Jogo de plataforma com visuais artísticos e narrativa comovente, onde você explora uma floresta mágica com desafios de precisão.',
      gamePageUrl: 'ori',
      buttonText: 'Jogar agora',
      displayArea: 'SLIDE',
      categories: {
        connect: { id: adventure.id },
      },
    },
  })

  const tinyGlade = await prisma.game.create({
    data: {
      title: 'Tiny Glade',
      imageUrl: 'https://cdn2.steamgriddb.com/hero/faa5aad41ef2c4db0f1a437408fcecaa.jpg',
      videoUrl: 'https://youtu.be/9HxPwQ4tjFc?si=PQd0JgtFVok1cM6l',
      logoUrl: 'https://cdn2.steamgriddb.com/logo_thumb/145820b8b519a60ff94f3536c837716f.png',
      description:
        'Simulador de construção onde você cria pequenos castelos e jardins de forma livre e criativa.',
      gamePageUrl: 'tiny_glade',
      buttonText: 'Construir agora',
      displayArea: 'SLIDE',
      categories: {
        connect: { id: puzzle.id },
      },
    },
  })

  const godOfWar = await prisma.game.create({
    data: {
      title: 'God of War',
      imageUrl:
        'https://c.wallhere.com/photos/80/d6/video_games_Video_Game_Art_God_of_War_God_of_War_2018_ultrawide_ultra_wide_Kratos-1405289.jpg!d',
      videoUrl: 'https://youtu.be/K0u_kAWLJOA?si=NUY7Vq16Lh06hLW4',
      logoUrl: 'https://cdn2.steamgriddb.com/logo_thumb/c3f7c464a6d899fcac5f76acf186807f.png',
      description:
        'Kratos e seu filho Atreus enfrentam deuses e monstros nórdicos em uma épica jornada de ação e emoção.',
      gamePageUrl: 'god_of_war',
      buttonText: 'Jogar agora',
      displayArea: 'SLIDE',
      categories: {
        connect: { id: action.id },
      },
    },
  })

  const hogwartsLegacy = await prisma.game.create({
    data: {
      title: 'Hogwarts Legacy',
      imageUrl: 'https://cdn2.steamgriddb.com/hero_thumb/8b33ab221257b074d1d967042ad1d9d0.jpg',
      videoUrl: 'https://youtu.be/1O6Qstncpnc?si=rSN5LfIOxkF_rXfW',
      logoUrl: 'https://cdn2.steamgriddb.com/logo_thumb/d2c5bd21bd0749daa5bb9edfdff68dc5.png',
      description:
        'Explore Hogwarts como um estudante do século XIX em um RPG cheio de magia, criaturas e escolhas.',
      gamePageUrl: 'hogwarts_legacy',
      buttonText: 'Explorar Hogwarts',
      displayArea: 'SLIDE',
      categories: {
        connect: { id: adventure.id },
      },
    },
  })

  const littleNightmares = await prisma.game.create({
    data: {
      title: 'Little Nightmares',
      imageUrl:
        'https://external-preview.redd.it/2k2IWr1LNL9amWwqDBm0plXMLyUV9I2fLKf6HGl0crs.png?format=pjpg&auto=webp&s=6cfa15f3a34d30f55a63149218867db84b68201c',
      videoUrl: 'https://youtu.be/AI9zBBTyX-E?si=dI-lzSgeRgqrsBFJ',
      logoUrl: 'https://cdn2.steamgriddb.com/logo_thumb/8cc76aa60d671138e037520930656242.png',
      description:
        'Aventure-se em um mundo sombrio com armadilhas e criaturas estranhas neste suspense de plataforma.',
      gamePageUrl: 'little_nightmares',
      buttonText: 'Iniciar aventura',
      displayArea: 'SLIDE',
      categories: {
        connect: { id: action.id },
      },
    },
  })

  console.log({
    ori,
    tinyGlade,
    godOfWar,
    hogwartsLegacy,
    littleNightmares,
  })
}

// Executa e trata erros
main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
