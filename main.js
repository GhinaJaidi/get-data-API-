async function getProducts() {
    const response = await axios.get("https://dummyjson.com/products");

    const products = response.data.products;
    const result = products.map((product) => {
        return `
        <div class="flex flex-col gap-3 items-center text-center p-3 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-40 object-contain">
            <h2 class="text-lg font-bold text-gray-800 line-clamp-1">${product.title}</h2>
            <button class="bg-emerald-500 hover:bg-emerald-600 text-white text-base font-semibold w-1/2 p-2 rounded-2xl cursor-pointer transition">
                ${product.price}$
            </button>
        </div>
    `;
    }).join("");

    document.querySelector(".products").innerHTML = result;
}
getProducts();

async function getCategories() {
    const response = await axios.get("https://dummyjson.com/products/categories");

    const categories = response.data;
    const result = categories.map((category) => {
        return `
        <a href="#" class="block bg-white/70 hover:bg-white text-gray-800 font-semibold text-sm px-3 py-2 rounded-lg capitalize transition">
            ${category.name}
        </a>
    `;
    }).join("");

    document.querySelector(".categories").innerHTML = result;
}
getCategories();
