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

export async function getCart(request: Request): Promise<CartItem[]>{
  const session = await getSession(request.headers.get("Cookie"))
  return session.get("items") ?? []
}

export async function addToCart(request: Request, item: Omit<CartItem, "quantity">){
  const session = await getSession(request.headers.get("Cookie"))
  const items: CartItem[] = session.get("items") ?? []

  const existing = items.find((i) => i.id === item.id)
  if (existing) {
    existing.quantity +=1
  }else{
    items.push({...item, quantity: 1})
  }

  session.set("items",items)
  return commitSession(session)
}


export async function removeFromCart (request: Request, id: number) {
  const session = await getSession(request.headers.get("Cookie"))
  const items: CartItem[] = session.get("items") ?? []
  const filtered = items.filter((i) => i.id !== id)
  session.set("items", filtered)
  return commitSession(session)
}

export async function updateQuantity(request: Request, id: number, quantity: number) {
  const session = await getSession(request.headers.get("Cookie"))
  const items: CartItem[] = session.get("items") ?? []
  const item = items.find((i) => i.id === id)
  if (item) {
    if (quantity <= 0) {
      const filtered = items.filter((i) => i.id !== id)
      session.set("items", filtered)
    } else {
      item.quantity = quantity
      session.set("items", items)
    }
  }
  return commitSession(session)
}