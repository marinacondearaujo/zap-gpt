import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import dotenv from 'dotenv'
import { sendWhatsappMessage } from "./services/twilio"

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

dotenv.config()

app.post('/chat/send', async (req,resp)=>{
    const{to,body} = req.body
    try{
        const result = await sendWhatsappMessage(`whatsapp:${to}`, body)
        console.log(result)
        resp.status(200).json({success: true, body})
    }catch (error){
        resp.status(500).json({success: false, error})
    }
})

const port = 3000

app.listen(port, () =>{
    console.log(`O servidor está rodando na porta: ${port}`)
})
