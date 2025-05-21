import dotenv from 'dotenv'
dotenv.config()

console.log('DATABASE_URL:', process.env.DATABASE_URL)

import cors from 'cors'
import express from 'express'

import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// GET: Buscar todos os jogos
app.get('/api/games', async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        categories: true, // Também busca categorias relacionadas
      },
    })
    res.json(games)
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar jogos')
  }
})

// Buscar jogo pelo buttonUrl
app.get('/api/games/button/:buttonUrl', async (req, res) => {
  const { buttonUrl } = req.params

  try {
    const game = await prisma.game.findFirst({
      where: {
        buttonUrl: {
          equals: buttonUrl,
          mode: 'insensitive', // Ignorar maiúsculas/minúsculas
        },
      },
      include: {
        categories: true,
      },
    })

    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado' })
    }

    res.json(game)
  } catch (error) {
    console.error('Erro ao buscar jogo:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// POST: Criar um novo jogo (usando nomes de categorias)
app.post('/api/games', async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      logoUrl,
      description,
      buttonUrl,
      buttonText,
      originalPrice,
      currentPrice,
      discount,
      isFavorite,
      displayArea,
      categoryNames, 
    } = req.body

    // Buscar categorias pelo nome
    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: categoryNames,
        },
      },
    })

    // Validação: se alguma categoria não foi encontrada
    if (categories.length !== categoryNames.length) {
      return res.status(400).json({
        error: 'Uma ou mais categorias não foram encontradas no banco de dados',
      })
    }

    const newGame = await prisma.game.create({
      data: {
        title,
        imageUrl,
        logoUrl,
        description,
        buttonUrl,
        buttonText,
        originalPrice,
        currentPrice,
        discount,
        isFavorite,
        displayArea,
        categories: {
          connect: categories.map(cat => ({ id: cat.id })),
        },
      },
    })

    res.json(newGame)
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao criar jogo')
  }
})

// PUT: Atualizar um jogo existente
app.put('/api/games/:id', async (req, res) => {
  const gameId = Number(req.params.id)

  try {
    const {
      title,
      imageUrl,
      logoUrl,
      description,
      buttonUrl,
      buttonText,
      originalPrice,
      currentPrice,
      discount,
      isFavorite,
      displayArea,
      categoryIds, // array de categorias atualizadas (opcional)
    } = req.body

    // Atualizar dados principais do jogo
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        title,
        imageUrl,
        logoUrl,
        description,
        buttonUrl,
        buttonText,
        originalPrice,
        currentPrice,
        discount,
        isFavorite,
        displayArea,
        categories: categoryIds
          ? {
              set: categoryIds.map(id => ({ id })), // substitui categorias antigas
            }
          : undefined,
      },
      include: {
        categories: true,
      },
    })

    res.json(updatedGame)
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao atualizar jogo')
  }
})

// GET: Buscar todas as categorias
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar categorias')
  }
})

// POST: Criar uma nova categoria
app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'O nome da categoria é obrigatório' })
    }

    const existing = await prisma.category.findUnique({
      where: { name },
    })

    if (existing) {
      return res.status(400).json({ error: 'A categoria já existe' })
    }

    const newCategory = await prisma.category.create({
      data: { name },
    })

    res.status(201).json(newCategory)
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao criar categoria')
  }
})

const PORT = 5000

async function testDbConnection() {
  try {
    const games = await prisma.game.findMany()
    console.log('Jogos encontrados:', games.length)
  } catch (e) {
    console.error('Erro ao conectar com o banco:')
    console.error(e) // Mostra o erro detalhado
  }
}

testDbConnection()
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
