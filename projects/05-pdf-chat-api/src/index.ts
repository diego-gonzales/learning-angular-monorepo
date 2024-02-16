import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import fs from 'node:fs/promises'
import { textOutputDir } from './constants'

dotenv.config()
cloudinary.config({
  cloud_name: 'geodi',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max file(s) size
  })
)

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
const chat = model.startChat({
  history: [
    {
      role: 'user',
      parts:
        'Eres un investigador español experimentado, experto en interpretar y responder preguntas basadas en las fuentes proporcionadas. Utilizando el contexto proporcionado entre las etiquetas <context></context>, genera una respuesta concisa para una pregunta rodeada con las etiquetas <question></question>. Debes usar únicamente información del contexto. Usa un tono imparcial y periodístico. No repitas texto. Si no hay nada en el contexto relevante para la pregunta en cuestión, simplemente di "No lo sé". No intentes inventar una respuesta. Cualquier cosa entre los siguientes bloques html context se recupera de un banco de conocimientos, no es parte de la conversación con el usuario.',
    },
    {
      role: 'model',
      parts: 'Genial. ¿Qué puedo hacer por ti?',
    },
  ],
  generationConfig: {
    maxOutputTokens: 200,
  },
})

app.post('/api/ask', async (req, res) => {
  try {
    const { id, question } = req.body

    if (!id || !question) {
      res.status(400).json({ msg: 'id or question not found' })
    }

    const text = await fs.readFile(`public/text/${id}.txt`, 'utf-8')

    const result = await chat.sendMessage(
      `<context>${text}</context><question>${question}</question>`
    )

    const response = result.response
    const answer = response.text()

    res.status(200).json({ answer })
  } catch (error) {
    console.log(`errorcito: ${JSON.stringify(error)}`)
  }
})

app.post('/api/upload-pdf', async (req, res) => {
  const file = req.files?.['file'] as fileUpload.UploadedFile

  try {
    if (file === null) res.status(400).json({ msg: 'File not found' })

    const arrayBuffer = file.data.buffer
    const unit8Array = new Uint8Array(arrayBuffer)

    const result = await uploadStream(unit8Array, {
      folder: 'chat-pdf',
      ocr: 'adv_ocr',
    })
    const { secure_url: url, pages, asset_id: id, info } = result

    const data = info?.ocr?.adv_ocr?.data
    const text = data
      .map((blocks: { textAnnotations: { description: string }[] }) => {
        const textAnnotations = blocks.textAnnotations ?? []
        const firstTextAnnotation = textAnnotations[0] ?? {}
        const content = firstTextAnnotation.description ?? ''
        return content.trim()
      })
      .filter(Boolean) // remove empty strings
      .join('\n') // join each content with a new line

    console.log(text, '<- text')
    console.log(textOutputDir, '<- textOutputDir')

    // TODO: Save this info in a database. Better yet, save the info in a vector and do embeddings
    fs.writeFile(`${textOutputDir}/${id}.txt`, text, 'utf-8')

    res.status(201).json({ url, pages, id })
  } catch (error) {
    console.log(`errorcito: ${JSON.stringify(error)}`)
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

async function uploadStream(
  unit8Array: Uint8Array,
  options: { folder: string; ocr?: string }
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (result) return resolve(result)
        reject(error)
      })
      .end(unit8Array)
  })
}
