const axios = require('axios')
require('dotenv').config();
const m = new Map();
const getWeather = async() => {
    const date = new Date()
    const today = date.toISOString().split('T')[0];
    await axios
    .get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${process.env.CWB_TOKEN}&elementName=T&dataTime=${today}T12%3A00%3A00`)
    .then(res => {
        // console.log(`statusCode: ${res.status}`)
        for(var attributename in res.data.records.locations[0].location){
            m.set(res.data.records.locations[0].location[attributename].locationName, res.data.records.locations[0].location[attributename].weatherElement[0].time[0].elementValue[0].value)
        }
    })
    .catch(error => {
        return null
    })
    
    return m;
}

module.exports = getWeather;
