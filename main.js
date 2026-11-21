const getProducts = async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response;
}

const displayProducts = async () => {
    try {
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
    } catch (error) {
        document.querySelector(".products").innerHTML = `<div class="w-full max-w-sm" role="status">
        <div class="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div class="h-full w-[80%] animate-pulse bg-indigo-600 dark:bg-indigo-300"></div>
        </div>

        <p class="mt-4 text-center font-medium text-black">Products Loading...</p>
        </div>`;
    }
}
displayProducts();

document.querySelector(".products").addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action="view-details"]');
    if (!btn) return;

    const card = btn.closest(".product-card");
    const id = card.dataset.productId;
    window.location.href = `details.html?id=${id}`;
})

const getCategories = async () => {
    const response = axios.get('https://dummyjson.com/products/categories')
    return response;
}

async function displayCategories() {

    try {
        const { data } = await getCategories();

        const result = data.map((category) => {
            return `<li><button type="button" data-category="${category.slug}" 
        class="block bg-white/70 hover:bg-white text-gray-800 font-semibold text-sm px-3 py-2 rounded-lg capitalize transition duration-150">${category.name}</button></li>`;
        }).join("");
        document.querySelector(".categories ul").innerHTML = result;
    } catch (error) {
        document.querySelector(".categories ul").innerHTML = `<button type="button" class="inline-flex items-center text-white bg-blue-950 border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary-soft shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
    <svg aria-hidden="true" class="w-4 h-4 text-neutral-tertiary animate-spin fill-brand me-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    Categories Loading...
</button>`;
    }
}
displayCategories();