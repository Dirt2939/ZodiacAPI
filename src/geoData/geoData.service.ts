import axios from "axios"
import { Response } from "express"

export const searchCity = async (city: string, date: string) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: 'Esteio',
                countrycodes: 'br',
                format: 'jsonv2',
                limit: 1,
            },
            headers: {
                'User-Agent': 'openZodiac/1.0 (rafaelhunemeier@gmail.com)'
            }
        })

        const { lat, lon } = response.data[0]
        const coordenadas = { lat, lon }

        return coordenadas
    } catch (error) {
        throw error
    }
}