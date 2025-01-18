import * as jose from 'jose'

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET || ''),
}

export const isAuthenticated = async (req: Request) => {
  let token = req.headers.get('authorization') || req.headers.get('Authorization')

  if (token) {
    try {
      if (token.startsWith('Bearer')) {
        token = token.replace('Bearer ', '')
      }

      const decoded = await jose.jwtVerify(token, jwtConfig.secret)

      if (decoded.payload?._id) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error('isAuthenticated error: ', err)

      return false
    }
  } else {
    return false
  }
}

export const createToken = async (payload: any) => {
  return await new jose.SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).sign(jwtConfig.secret)
}

export default { isAuthenticated, createToken }