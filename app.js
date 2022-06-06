const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(express.json({ extendes: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/event', require('./routes/event.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()
