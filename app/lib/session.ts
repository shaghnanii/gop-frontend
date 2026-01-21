// import { SignJWT, jwtVerify } from 'jose'
// import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#imports'

export type SessionPayload = {
  id: string
  accessToken: string
  refreshToken: string
  created: string
  expiration: string
  expiresIn: number
}

// export async function encrypt(payload: SessionPayload) {
//   const config = useRuntimeConfig()
//   const secretKey = "config.sessionSecret"
//   if (!secretKey) throw new Error('Missing SESSION_SECRET')
//
//   const encodedKey = new TextEncoder().encode(secretKey)
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('7d')
//     .sign(encodedKey)
// }
//
// export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
//   const config = useRuntimeConfig()
//   const secretKey = "config.sessionSecret"
//   if (!secretKey) throw new Error('Missing SESSION_SECRET')
//
//   const encodedKey = new TextEncoder().encode(secretKey)
//
//   try {
//     if (!session) {
//       console.log('No session token provided')
//       return null
//     }
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ['HS256'],
//     })
//     return payload as SessionPayload
//   } catch (error) {
//     console.log('Failed to verify session:', error)
//     return null
//   }
// }
//
// export async function createSession(payload: SessionPayload) {
//   const cookie = useCookie('session', {
//     httpOnly: true,
//     sameSite: 'lax',
//     path: '/',
//     secure: process.env.NODE_ENV === 'production',
//   })
//
//   const sessionToken = await encrypt(payload)
//   const expiresAt = new Date(payload.expiration)
//
//   cookie.value = sessionToken
//   cookie.options.expires = expiresAt
// }
//
// export async function updateSession() {
//   const cookie = useCookie('session')
//   const session = cookie.value
//   const payload = await decrypt(session)
//
//   if (!session || !payload) {
//     return null
//   }
//
//   // Create new expiration (7 days from now)
//   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   cookie.value = session // Keep the same token for now; or re-encrypt if you want to refresh token content
//   cookie.options.expires = expires
// }
//
// export async function deleteSession() {
//   const cookie = useCookie('session')
//   cookie.value = null
//   cookie.options.expires = new Date(0)
// }
