import { db } from '../../db/index'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('FORM RESPONSE:', body)

  // later we will save properly in DB
  return { success: true }
})