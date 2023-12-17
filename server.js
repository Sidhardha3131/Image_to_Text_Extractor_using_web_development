const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/extract', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
    }

    const imageBuffer = req.file.buffer;

    Tesseract.recognize(
        imageBuffer,
        ['tel','eng'],
        { logger: info => console.log(info) }
    ).then(({ data: { text } }) => {
        res.json({ text });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
