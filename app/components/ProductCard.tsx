import { Link } from "react-router"

type Product = {
    id: number
    title: string
    price: number
    thumbnail: string
    category: string
}

export default function ProductCard ({ product }: { product: Product}) {
    return (
        <Link to={`/products/${product.id}`} className="group">
            <div className="w-full bg-[#ebebeb] flex items-center justify-center overflow-hidden p-4" style={{aspectRatio: "1"}}>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="mt-2">
                <p className="text-sm text-[#1b2a4a]">{product.title}</p>
                <p className="text-sm text-[#1b2a4a] font-semibold">${product.price}</p>
            </div>
        </Link>
    )
}