import { useLoaderData, Form } from "react-router"
import type { Route } from "./+types/cart"
import { getCart, removeFromCart, updateQuantity } from "../lib/cart.server"
import { Trash2 } from "lucide-react"

export function meta() {
  return [{ title: "Shopping Cart" }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const items = await getCart(request)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = items.length > 0 ? 20 : 0
  const total = subtotal + shipping
  return { items, subtotal, shipping, total }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")
  const id = Number(formData.get("id"))

  let cookie: string

  if (intent === "remove") {
    cookie = await removeFromCart(request, id)
  } else if (intent === "update") {
    const quantity = Number(formData.get("quantity"))
    cookie = await updateQuantity(request, id, quantity)
  } else {
    return null
  }

  return new Response(null, {
    headers: { "Set-Cookie": cookie },
  })
}

export default function Cart() {
  const { items, subtotal, shipping, total } = useLoaderData()

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-12 py-16 text-center">
        <p className="text-lg text-[#1b2a4a]">Your cart is empty</p>
        <a href="/" className="text-sm text-[#888888] underline mt-4 inline-block">
          Continue shopping
        </a>
      </main>
    )
  }

  return (
    <main className="max-w-8xl mx-auto px-12 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-32">
        
        {/* Lista*/}
<div className="flex flex-col gap-6">
  {items.map((item: any) => (
    <div key={item.id} className="flex gap-6 border-b border-[#e2e2e2] pb-6">
      <div className="w-32 h-32 bg-[#ebebeb] flex items-center justify-center p-2 shrink-0">
        <img src={item.thumbnail} alt={item.title} className="max-w-full max-h-full object-contain" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-[#1b2a4a]">{item.title}</p>
          <p className="text-sm font-semibold text-[#1b2a4a]">${item.price}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* quantidade */}
          <div className="flex items-center border border-[#e2e2e2]">
            <Form method="post">
              <input type="hidden" name="intent" value="update" />
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="quantity" value={item.quantity - 1} />
              <button type="submit" className="px-3 py-1 text-sm hover:bg-[#f0f0f0]">−</button>
            </Form>
            
            <span className="px-4 text-sm">{item.quantity}</span>
            
            <Form method="post">
              <input type="hidden" name="intent" value="update" />
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="quantity" value={item.quantity + 1} />
              <button type="submit" className="px-3 py-1 text-sm hover:bg-[#f0f0f0]">+</button>
            </Form>
          </div>

          <Form method="post">
            <input type="hidden" name="intent" value="remove" />
            <input type="hidden" name="id" value={item.id} />
            <button type="submit" className="text-[#888888] hover:text-[#1b2a4a]">
              <Trash2 size={16} />
            </button>
          </Form>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* Summ */}
        <div className="border border-[#1b2a4a] rounded-lg p-6 h-fit">
        <p className="font-semibold text-[#1b2a4a] mb-4">Cart Summary</p>

        <div className="flex justify-between text-sm text-[#1b2a4a] py-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-[#1b2a4a] py-2">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-[#1b2a4a] py-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
        </div>

        <button className="w-full bg-[#1b2a4a] text-white py-2.5 mt-4 text-sm hover:bg-[#2d3f63]">
            Check out
        </button>
        <p className="text-center text-xs text-[#888888] mt-3">Or pay with PayPal</p>

        <div className="mt-6 border-t border-[#e2e2e2] pt-6">
            <p className="text-xs text-[#888888] mb-2">Promo code</p>
            <div className="flex gap-2">
            <input
                type="text"
                placeholder="Enter code"
                className="flex-1 border border-[#e2e2e2] px-2 py-1 text-sm"
            />
            <button className="bg-[#1b2a4a] text-white px-4 text-sm hover:bg-[#2d3f63]">
                Apply
            </button>
            </div>
        </div>
        </div>

      </div>
    </main>
  )
}