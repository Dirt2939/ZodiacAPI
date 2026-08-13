import axios from "axios"
import { Response, Request } from "express"
import { find } from "geo-tz"
import { DateTime } from 'luxon'
import geoip from 'geoip-lite';
import { AppError } from "../shared/middlewares/ErrorHandler/AppError";

type countryData = {
    country?: string,
    error?: string,
}

export const searchCity = async (city: string, date: string, req: Request, country?: countryData) => {
    if (country?.country) country = getCountry(req)

    if (country?.error) throw new AppError("Ip not found", 404)
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: 'city',
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
        coordenadas.lat = Number(coordenadas.lat)
        coordenadas.lon = Number(coordenadas.lon)

        return getTimeZone(coordenadas.lat, coordenadas.lon)
    } catch (error) {
        throw error
    }
}

const getCountry = (req: Request) => {
    let ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';

    const geo = geoip.lookup(ip);

    if (geo) {
        return {
            country: geo.country
        }
    }
    return { error: "It was not possible to find an IP" }
}

const getTimeZone = (lat: number, lon: number) => {
    return find(lat, lon)
}

const transformUTC = () => {

}