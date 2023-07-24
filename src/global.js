const EN_LOCALE_ONLY = process.env.EN_LOCALE_ONLY === 'true'
const IN_BROWSER = typeof window !== 'undefined'
const IS_DEBUG = process.env.DEBUG === 'true'
const IS_PROD = process.env.NODE_ENV === 'production'

const USER_KEY = 'ALO47@#369QADB20%-'
const COMPANY_KEY = 'DAS668!@#DAS)(!@$A'

const API_URL = IS_PROD ? 'https://mtserver-api.onrender.com' : 'http://localhost:25505'

console.log(API_URL)

module.exports = {
  EN_LOCALE_ONLY,
  IN_BROWSER,
  IS_DEBUG,
  IS_PROD,
  USER_KEY,
  COMPANY_KEY,
  API_URL
}
