import { useLoaderData } from "react-router"
import type { Route } from "./+types/home"
import { fetchProducts, fetchProductsByCategory, fetchCategories } from "../lib/api"
import ProductCard from "../components/ProductCard"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Online Store" },
    { name: "description", content: "Browse products" },
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const category = url.searchParams.get("category")
  const sortBy = url.searchParams.get("sortBy") ?? "title"
  const order = url.searchParams.get("order") ?? "asc"
  const page = Number(url.searchParams.get("page") ?? 1)
  const limit = 9
  const skip = (page - 1) * limit

  const [productsData, categories] = await Promise.all([
    category
      ? fetchProductsByCategory({ category, limit, skip, sortBy, order })
      : fetchProducts({ limit, skip, sortBy, order }),
    fetchCategories(),
  ])

  return { productsData, categories, page, sortBy, order, category }
}

export default function Home() {
  const { productsData, categories, page, sortBy, order, category } = useLoaderData()
  const products = productsData?.products ?? []
  const total = productsData?.total ?? 0
  const totalPages = Math.ceil(total / 9)
  const cats = Array.isArray(categories) ? categories : []

  return (
    <main className="max-w-8xl mx-auto px-12 py-8 flex gap-12">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <select
            name="sortBy"
            className="border border-[#e2e2e2] text-sm text-[#1b2a4a] px-3 py-1.5 rounded cursor-pointer"
            defaultValue={sortBy + "-" + order}
            onChange={(e) => {
              const parts = e.target.value.split("-")
              const field = parts[0]
              const ord = parts[1]
              window.location.href = "/?sortBy=" + field + "&order=" + ord + (category ? "&category=" + category : "")
            }}
          >
            <option value="title-asc">Sort by: Name (A-Z)</option>
            <option value="title-desc">Sort by: Name (Z-A)</option>
            <option value="price-asc">Sort by: Price (Low-High)</option>
            <option value="price-desc">Sort by: Price (High-Low)</option>
          </select>
          <p className="text-sm text-[#888888]">
            Showing {(page - 1) * 9 + 1}-{Math.min(page * 9, total)} of {total}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {page > 1 && (
            <a
              href={"/?page=" + (page - 1) + "&sortBy=" + sortBy + "&order=" + order + (category ? "&category=" + category : "")}
              className="w-7 h-7 flex items-center justify-center text-sm border border-[#e2e2e2] text-[#1b2a4a] hover:border-[#1b2a4a]"
            >
              {"<"}
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p >= page - 2 && p <= page + 2)
            .map((p) => {
              const isActive = p === page
              const baseClass = "w-7 h-7 flex items-center justify-center text-sm border"
              const activeClass = "bg-[#1b2a4a] text-white border-[#1b2a4a]"
              const inactiveClass = "text-[#1b2a4a] border-[#e2e2e2] hover:border-[#1b2a4a]"
              const pageUrl = "/?page=" + p + "&sortBy=" + sortBy + "&order=" + order + (category ? "&category=" + category : "")
              return (
                <a key={p} href={pageUrl} className={baseClass + " " + (isActive ? activeClass : inactiveClass)}>
                  {p}
                </a>
              )
            })}
          {page < totalPages && (
            <a
              href={"/?page=" + (page + 1) + "&sortBy=" + sortBy + "&order=" + order + (category ? "&category=" + category : "")}
              className="w-7 h-7 flex items-center justify-center text-sm border border-[#e2e2e2] text-[#1b2a4a] hover:border-[#1b2a4a]"
            >
              {">"}
            </a>
          )}
        </div>
      </div>

      <div className="w-48 shrink-0">
        <p className="text-sm font-semibold text-[#1b2a4a] mb-4">Categories</p>
        <div className="flex flex-col gap-2">
          {cats.map((cat: any) => (
            <label
              key={cat.slug}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                if (category === cat.slug) {
                  window.location.href = "/?sortBy=" + sortBy + "&order=" + order
                } else {
                  window.location.href = "/?category=" + cat.slug + "&sortBy=" + sortBy + "&order=" + order
                }
              }}
            >
              <input
                type="checkbox"
                checked={category === cat.slug}
                className="w-3 h-3 cursor-pointer"
                readOnly
              />
              <span className="text-sm text-[#1b2a4a]">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>
    </main>
  )
}
