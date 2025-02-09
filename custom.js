// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// owl carousel 

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 6
        }
    }
})

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cek apakah produk sudah ada di keranjang
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1; // Tambah jumlah produk
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Simpan ke localStorage
    alert(productName + " telah ditambahkan ke keranjang!");
}

// Fungsi untuk menampilkan isi keranjang
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Bersihkan isi sebelumnya

    cart.forEach(item => {
        let cartItem = document.createElement("li");
        cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartContainer.appendChild(cartItem);
    });
}

// Fungsi untuk menghapus semua isi keranjang
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

// Panggil fungsi displayCart saat halaman dimuat
window.onload = displayCart;

document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('animalFilter').addEventListener('change', filterProducts);

function filterProducts() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const animalFilter = document.getElementById('animalFilter').value;

    document.querySelectorAll('.product').forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        const productAnimal = product.getAttribute('data-animal');

        const matchesSearch = productName.includes(searchQuery);
        const matchesAnimal = animalFilter === 'all' || productAnimal === animalFilter;

        if (matchesSearch && matchesAnimal) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
