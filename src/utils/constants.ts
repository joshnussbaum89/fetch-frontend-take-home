/**
 * For code in production, use environment variables to store the API key and URL.
 * 
 * In Next JS, you can add a .env.local file to store the API key and URL.
 *
 * const FETCH_URL = `${process.env.NEXT_PUBLIC_FETCH_URL}/auth/login`
 *
 * const FETCH_API_KEY = process.env.NEXT_PUBLIC_FETCH_API_KEY
 */

const FETCH_URL = 'https://frontend-take-home-service.fetch.com'
const FETCH_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s'

export { FETCH_URL, FETCH_API_KEY }
