import axios from 'axios'
const baseUrl = '/api/charts'

const getChart = (date) => {
    const request = axios.get(baseUrl, { params: { chart_date: date } })
    return request.then(response => response.data)
}

export default { getChart }