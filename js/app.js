// Elementos do DOM
const userBtn = document.getElementById('user-btn');
const cartBtn = document.getElementById('cart-btn');
const userModal = document.getElementById('user-modal');
const cartModal = document.getElementById('cart-modal');
const userClose = document.getElementById('user-close');
const cartClose = document.getElementById('cart-close');
const modalOverlay = document.getElementById('modal-overlay');

// Estado do carrinho
let cart = [];

// Abrir Modal do Utilizador
userBtn.addEventListener('click', () => {
    openModal(userModal);
});

// Abrir Modal do Carrinho
cartBtn.addEventListener('click', () => {
    openModal(cartModal);
});

// Fechar Modal do Utilizador
userClose.addEventListener('click', () => {
    closeModal(userModal);
});

// Fechar Modal do Carrinho
cartClose.addEventListener('click', () => {
    closeModal(cartModal);
});

// Fechar Modal ao clicar no overlay
modalOverlay.addEventListener('click', () => {
    closeAllModals();
});

// Função para abrir modal
function openModal(modal) {
    closeAllModals(); // Fecha qualquer modal aberto
    modal.classList.remove('hidden');
    modal.classList.add('active');
    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Previne scroll
}

// Função para fechar modal
function closeModal(modal) {
    modal.classList.remove('active');
    modal.classList.add('hidden');
    modalOverlay.classList.remove('active');
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Permite scroll
}

// Função para fechar todos os modais
function closeAllModals() {
    userModal.classList.remove('active');
    userModal.classList.add('hidden');
    cartModal.classList.remove('active');
    cartModal.classList.add('hidden');
    modalOverlay.classList.remove('active');
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Adicionar ao Carrinho
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('€', ''));
        
        addToCart({
            id: Math.random().toString(36).substr(2, 9),
            name: productName,
            price: productPrice,
            quantity: 1
        });
        
        // Feedback visual
        const originalText = btn.textContent;
        btn.textContent = '✓ Adicionado!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
});

// Adicionar item ao carrinho
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }
    
    updateCart();
}

// Remover item do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar quantidade
function updateQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Atualizar visualização do carrinho
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Atualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar itens
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-message">Seu carrinho está vazio</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image"></div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Atualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Inicialização
updateCart();
