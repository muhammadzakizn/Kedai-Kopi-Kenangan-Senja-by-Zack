document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.jpg", price: 20000 },
      { id: 2, name: "Arabica Blend", img: "2.jpg", price: 25000 },
      { id: 3, name: "Primo Passo", img: "3.jpg", price: 30000 },
      { id: 4, name: "Aceh Gayo", img: "4.jpg", price: 35000 },
      { id: 5, name: "Sumatra Mandheling", img: "5.jpg", price: 40000 },
    ],
  }));

  Alpine.store('cart', {
    items: [], 
    total: 0,
    quantity: 0,
    add(newItem) {
      // Mengecek apakah ada barang yang sama di keranjang (cart)
        const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika belum ada atau keranjang (cart) masih kosong 
      if (!cartItem) {
        this.items.push({...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika sudah ada, mengecek kemabli apakah barang beda atau sama dengan yang ada di keranjang (cart)
        this.items = this.items.map((item) => {
          // Jika barang tersebut berbeda
          if (item.id !== newItem.id) {
            return item;
        } else {
          // Jika barang sudah ada, tambah quantity dan totalnya
          item.quantity++;
          item.total = item.price * item.quantity;
          this.quantity++;
          this.total += item.price;
          return item;
        }
      });
      }
    },
    remove(id) {
      // Mengambil item yang mau dihapus berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);
      
      // Jika item tersebut lebih dari 1
      if(cartItem.quantity > 1) {
        // Menelusuri 1 1
        this.items = this.items.map((item) => {
          // Jika bukan barang yang diklik
          if(item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if (cartItem.quantity === 1) {
        // Jika barangnya tersisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });
});

// Form Validasi
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
  for(let i = 0; i < form.elements.length; i++) {
    if(form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove('disabled');
      checkoutButton.classList.add('disabled');
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove('disabled');
});

// Mengirim data ketika tombol checkout di tekan
checkoutButton.addEventListener('click', async function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // const message = formatMessage(objData);
  // window.open('http://wa.me/6285156110231?text=' + encodeURIComponent(message))
  
  // Meminta token transaksi menggunakan Ajax/Fetch
  try {
    const response = await fetch('php/placeOrder.php', {
      method: 'POST',
      body: data,
    });
    const token = await response.text();
    window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

// Format kirim pesan via WhatsApp
const formatMessage = (obj) => {
  return `Data Costumer
  Nama: ${obj.name}
  Email: ${obj.email}
  No. HP: ${obj.phone}
  
Data Pesanan
  ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n` )}

TOTAL: ${rupiah(obj.total)}
Terima kasih.`;
};

// Konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};