const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGVucnlyYW8iLCJhIjoiY2s0MjY4YnFqMDFtNjNlbWswOXh1ejM4ZiJ9.gZOBeVj-8QcmTWKQJ2QD-g&limit=1`

    request({ url: url, json: true }, (error, { body: { features = [] }}) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const [{ place_name, center: [longitude, latitude] } ] = features
            callback(undefined, { latitude, longitude, location: place_name })
        }
    })

}

module.exports = geocode