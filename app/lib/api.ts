const BASE_URL = "https://dummyjson.com"
/*
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log);

fetch('https://dummyjson.com/products?limit=10&skip=10')

fetch('https://dummyjson.com/products/category/smartphones')
.then(res => res.json())
.then(console.log);

fetch('https://dummyjson.com/products/search?q=phone')
.then(res => res.json())
.then(console.log);

fetch('https://dummyjson.com/products/categories')
.then(res => res.json())
.then(console.log);
*/

export async function fetchProducts({
    limit = 9,
    skip= 0,
    sortBy = "title",
    order = "asc",
}: {
    limit?: number
    skip?: number
    sortBy?: string
    order?: string
}) {
    const res = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
  )
  return res.json()
}

export async function fetchProductsByCategory({
    category, 
    limit = 9,
    skip = 0,
    sortBy = "title",
    order = "asc",
} : {
    category: string
    limit?: number
    skip?: number
    sortBy?: string
    order?: string
}) {
    const res = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
  )
  return res.json()
}

// Produto único - não precisa de limit,...
export async function fetchProductById(
    id: number) {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    return res.json()
}

// vai buscar a lista de categorias, o URL é sempre igual
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`)
  return res.json()
}
