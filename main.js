const getProducts = async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response;
}

const displayProducts = async () => {
    const { data } = await getProducts();
    const result = data.products.map((product) => {
        return `
        <div class="product-card flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition" data-product-id="${product.id}">

            <div class="h-48 bg-gray-50 rounded-xl flex items-center justify-center p-3">
                <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-full object-contain">
            </div>

            <div class="flex flex-col gap-2">
                <h3 class="text-lg font-bold text-gray-800 line-clamp-1">
                    ${product.title}
                </h3>

                <p class="text-sm text-gray-500 line-clamp-2">
                    ${product.description}
                </p>
            </div>

            <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-emerald-600">
                    $${product.price}
                </span>

                <span class="text-sm text-gray-500">
                    ★ ${product.rating}
                </span>
            </div>

            <p class="text-xs text-gray-400">
                In Stock: ${product.stock}
            </p>

            <button type="button" data-action="view-details"
                class="w-full bg-gray-900 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition">
                View Details
            </button>

        </div>
    `;
    }).join("");


    document.querySelector(".products").innerHTML = result;
}
displayProducts();

const getCategories = () => {
    const response = axios.get('https://dummyjson.com/products/categories')
    return response;
}

async function displayCategories() {
    const { data } = await getCategories();

    const result = data.map((category) => {
        return `<li><button type="button" data-category="${category.slug}" 
        class="block bg-white/70 hover:bg-white text-gray-800 font-semibold text-sm px-3 py-2 rounded-lg capitalize transition duration-150">${category.name}</button></li>`;
    }).join("");
    document.querySelector(".categories ul").innerHTML = result;
}
displayCategories();
