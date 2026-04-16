import { createCookieSessionStorage } from "react-router"

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__cart",
      secrets: ["cart-secret-123"],
      sameSite: "lax",
      httpOnly: true,
    },
  })

export type CartItem = {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
}

export { getSession, commitSession, destroySession }