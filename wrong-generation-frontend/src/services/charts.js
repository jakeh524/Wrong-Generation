import axios from 'axios'
const baseUrl = '/api/charts'
//const baseUrl = 'http://localhost:3001/api/charts'

const getChart = (date, length) => {
    const request = axios.get(baseUrl, { params: { chart_date: date, length: length } })
    return request.then(response => response.data)
}

export default { getChart }