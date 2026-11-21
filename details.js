const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getProduct = async () => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response;
};

const displayProduct = async () => {
    try {
        const { data: product } = await getProduct();
        document.querySelector(".product-details").innerHTML = `
        <div class="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm p-6">
            <div>
                <div class="h-80 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                    <img id="main-image" src="${product.thumbnail}" alt="${product.title}"
                         class="w-full h-full object-contain">
                </div>
                <div class="flex gap-2 mt-3 overflow-x-auto">
                    ${product.images.map(img => `
                        <img src="${img}" data-thumb
                             class="w-16 h-16 object-contain bg-gray-50 rounded-lg cursor-pointer border hover:border-emerald-600">
                    `).join("")}
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <span class="text-sm text-gray-400 capitalize">${product.category}</span>
                <h1 class="text-3xl font-bold text-gray-800">${product.title}</h1>
                <p class="text-gray-500">${product.description}</p>

                <div class="flex items-center gap-4">
                    <span class="text-3xl font-bold text-emerald-600">$${product.price}</span>
                    <span class="text-gray-500">★ ${product.rating}</span>
                </div>

                <p class="text-sm text-gray-400">Brand: ${product.brand ?? "N/A"}</p>
                <p class="text-sm text-gray-400">In Stock: ${product.stock}</p>

                <button class="bg-gray-900 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition">
                    Add to Cart
                </button>
            </div>
        </div>`;
    } catch {
        document.querySelector(".product-details").innerHTML =
            `<p class="text-red-500">Failed to load product.</p>`;
    }
}

displayProduct();