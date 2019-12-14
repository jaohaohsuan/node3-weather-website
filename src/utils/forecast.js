const request = require('request')

const forecast = ({ latitude, longitude }, callback) => {
    const url = `https://api.darksky.net/forecast/99d495cc1bb178238d7a074da70aff9c/${latitude},${longitude}?units=si&lang=en`

    request({ url, json: true }, (error, { body }) => {
        const { temperature, precipProbability } = body.currently
        const { hourly: { data: [now] } } = body

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)

        } else {
            callback(undefined, `${now.summary}. It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast