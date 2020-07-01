import express from "express";
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import imageToPdf from 'images-to-pdf';
import crypto from 'crypto';

import uploadConfig from './config/upload';

const upload = multer(uploadConfig);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Hello World'});
});

app.post('/upload', upload.single('file'), async (req, res) => {
    const hashedName =  crypto.randomBytes(10).toString('HEX');

    const fileHashedName = req.file.originalname + hashedName;

    await imageToPdf([`./uploads/${req.file.filename}`], `./pdfFiles/${fileHashedName}.pdf`);

    return res.json({ok:true});
});

app.listen(3333, () => {
    console.log("Server started! 🎈");
})