import { useLoaderData, Form, redirect } from "react-router"
import type { Route } from "./+types/products.$id"
import { fetchProductById } from "../lib/api"
import { addToCart } from "../lib/cart.server"

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data?.product?.title ?? "Product" },
  ]
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = Number(params.id)
  const product = await fetchProductById(id)
  return { product }
}
export async function action({ request, params }: Route.ActionArgs) {
  const id = Number(params.id)
  const product = await fetchProductById(id)
  
  const cookie = await addToCart(request, {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
  })
  
  return redirect("/cart", {
    headers: { "Set-Cookie": cookie },
  })
}

export default function ProductDetail() {
  const { product } = useLoaderData()

  return (
    <main className="max-w-7xl mx-auto px-12 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-24">
        
        {/* Imagem*/}
        <div className="bg-[#ebebeb] flex items-start justify-center p-12 h-[500px]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Info*/}
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a4a]">{product.title}</h1>
          <p className="text-2xl font-bold text-[#1b2a4a] mt-1">${product.price}</p>
          
          <Form method="post">
            <button type="submit" className="w-full bg-[#1b2a4a] text-white py-2.5 mt-4 text-sm hover:bg-[#2d3f63]">
              Add to Cart
            </button>
          </Form>

          <div className="border-t border-[#e2e2e2] mt-6 pt-4">
            <p className="text-sm font-semibold text-[#1b2a4a] mb-2">Product Details</p>
            <p className="text-sm text-[#888888] leading-relaxed">{product.description}</p>
          </div>
        </div>

      </div>
    </main>
  )
}
