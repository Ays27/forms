import { auth } from '../../lib/auth'
import { toWebRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event)

  return auth.handler(request)
})