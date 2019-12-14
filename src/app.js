const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static resources to serve
app.use(express.static(publicDirPath))


// express routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Henry Jao'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Henry Jao'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Henry Jao'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        const { location } = data
        forecast(data, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address,
                location,
                forecast
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Henry Jao',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Henry Jao',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})