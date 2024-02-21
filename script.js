let cartItems = [];

// Fonction pour ajouter un produit au panier
function addToCart(productName, price, addButton) {
    // Récupérer le panier depuis le stockage local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Créer un objet représentant le produit à ajouter au panier
    const product = {
        name: productName,
        price: price
    };

    // Ajouter le produit au panier
    cart.push(product);

    // Enregistrer le panier dans le stockage local
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCartDisplay();

    // Ajouter une classe d'animation au bouton "Ajouter au panier"
    addButton.classList.add('button-click-animation');

    // Ajouter une classe d'animation à l'image du produit associé au bouton
    const productImage = addButton.parentNode.querySelector('img');
    productImage.classList.add('rotate-on-add');

    // Retirer les classes d'animation après un certain délai
    setTimeout(() => {
        addButton.classList.remove('button-click-animation');
        productImage.classList.remove('rotate-on-add');
    }, 500); // Durée de l'animation en millisecondes
}

// Fonction pour supprimer un produit du panier
function removeFromCart(index) {
    // Récupérer le panier depuis le stockage local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Supprimer le produit correspondant à l'index spécifié
    cart.splice(index, 1);

    // Enregistrer le panier mis à jour dans le stockage local
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCartDisplay();
}

// Fonction pour calculer le total du prix des articles dans le panier
function calculateTotalPrice() {
    // Récupérer le panier depuis le stockage local
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let totalPrice = 0;
    
    // Parcourir tous les produits dans le panier et ajouter leur prix total au total
    cart.forEach(product => {
        totalPrice += product.price; // Ajouter le prix de chaque produit au total
    });

    return totalPrice.toFixed(2); // Retourner le total avec deux décimales
}

// Fonction pour mettre à jour l'affichage du panier avec le total du prix des articles
function updateCartDisplay() {
    // Vérifier si la page actuelle est "cart.html" pour afficher le panier
    const cartDisplay = document.querySelector('.cart-items');
    if (cartDisplay) {
        // Supprimer tous les éléments enfants de l'élément cartDisplay pour éviter les duplications
        cartDisplay.innerHTML = '';

        // Récupérer le panier depuis le stockage local
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Parcourir tous les produits dans le panier
        cart.forEach((product, index) => {
            // Créer un élément HTML pour afficher le produit dans le panier
            const productItem = document.createElement('div');
            productItem.classList.add('cart-item');

            // Remplir le contenu de l'élément productItem avec les informations du produit et le bouton de suppression
            productItem.innerHTML = `
                <span>${product.name}</span>
                <span>${product.price} €</span>
                <button class="remove-from-cart" onclick="removeFromCart(${index})">-</button>
            `;

            // Ajouter l'élément productItem à l'élément cartDisplay
            cartDisplay.appendChild(productItem);
        });

        // Mettre à jour le total du prix des articles dans le panier
        const totalPriceDisplay = document.getElementById('total-price');
        totalPriceDisplay.textContent = calculateTotalPrice(); // Appel de la fonction pour calculer le total du prix des articles
    }
}

// Appeler la fonction updateCartDisplay() pour mettre à jour l'affichage du panier lors du chargement de la page
updateCartDisplay();

// Fonction pour vider le panier
function clearCart() {
    localStorage.removeItem('cart');
    // Mettre à jour l'affichage du panier après avoir vidé le panier
    updateCartDisplay();
}


