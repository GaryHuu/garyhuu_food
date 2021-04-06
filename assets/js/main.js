// Get Modal and Modal Body
var modalOverlay = document.querySelector('.modal__overlay');
var modalBody = document.querySelector('.modal__body');
var searchOption = document.querySelector('.search-option')

// Search Click
var buttonSearch = document.querySelector('.header__search');
buttonSearch.addEventListener('click', () => {
    modalOverlay.classList.remove('d-n');
    modalBody.classList.remove('d-n');
    searchOption.classList.remove('d-n-i');
    itemDeleteProduct.style.opacity = "0";
    modalOverlay.addEventListener('click', () => {
        itemDeleteProduct.style.opacity = "1";
        setTimeout( function () {
            modalOverlay.classList.add('d-n');
            modalBody.classList.add('d-n');
        }, 150);
        searchOption.classList.add('d-n-i');
    });
});

// Get User Element and List
var userElement = document.querySelector('.user-icon-click');
var userList = document.querySelector('.header__user-lists');

// User click
userElement.addEventListener('click', () => {
    userList.classList.toggle('header__user-show');
});

// User Outside Click
window.addEventListener('click', e => {
    if (!userList.contains(e.target) && e.target !== userElement) {
        userList.classList.remove('header__user-show'); 
    }
});

// Get Setting Element and List
var buttonSetting = document.querySelector('.setting-icon-click');
var settingList = document.querySelector('.header__setting-lists');

// Setting click
buttonSetting.addEventListener('click', () => {
    settingList.classList.toggle('d-b');
});

// Setting Outside Click
window.addEventListener('click', e => {
    if (!settingList.contains(e.target) && e.target !== buttonSetting) {
        settingList.classList.remove('d-b'); 
        moneyEUR.classList.remove('d-b');
        languageRTL.classList.remove('d-b');
    }
});

// Get Setting money and Language
var settingMoney = document.querySelector('.header__setting-money');
var settingLanguage = document.querySelector('.header__setting-language');
var moneyEUR = document.querySelector('.setting-money-eur');
var languageRTL = document.querySelector('.setting-language-rtl');

// SettingMoney Click
settingMoney.addEventListener('click', () => {
    moneyEUR.classList.toggle('d-b');
});

// Setting Language Click
settingLanguage.addEventListener('click', () => {
    languageRTL.classList.toggle('d-b');
});

// Get element cart
var buttonCart = document.querySelector('.cart-item-click');
var bodyCart = document.querySelector('.header__cart-content');
var closeCart = document.querySelector('.cart__times');

// Check click button cart
buttonCart.addEventListener('click', () => {
    bodyCart.classList.toggle('d-b');
});

// Cart Outside Click
window.addEventListener('click', e => {
    if (!bodyCart.contains(e.target) 
    && e.target !== buttonCart 
    && !modalBody.contains(e.target)
    && e.target !== modalOverlay
    && !buttonCart.contains(e.target)
    || e.target === closeCart) {
        bodyCart.classList.remove('d-b'); 
    }
});


// Tool Tip
var toolTip = document.querySelectorAll('.product__img-link-tooltip');
window.onmousemove = function (e) {
    toolTip.forEach(element => {    
        var x = e.clientX,
            y = e.clientY;
        element.style.top = (y + 15) + 'px';
        element.style.left = (x + 15) + 'px';
    });
};

// Product Display
var cartProduct = document.querySelectorAll('.product__details-item');

// Popup Delete Product in Cart 
var itemDeleteProduct = document.querySelector('.popup-delete-product-cart');
var acceptDelete = document.querySelector('.accept-delete');
var notAcceptDelete = document.querySelector('.not-accept-delete');
var closeButtonDeleteProduct = document.querySelector('.close-delete-product');
var openDeleteProduct = document.querySelectorAll('.product__qty-delete');

// Counter Product
function couterProduct () {
    return document.querySelectorAll('.product__details-item').length;
}

// Delete Rroduct click 
openDeleteProduct.forEach((element, index) => {
    element.addEventListener('click', () => {
        modalOverlay.classList.remove('d-n');
        modalBody.classList.remove('d-n');
        itemDeleteProduct.classList.add('popup-delete-product-cart-active');
        var numberTotalProduct = couterProduct();
        acceptDelete.onclick = function() {
            deleteProduct(index, numberTotalProduct);
            close();
        }
        closeButtonDeleteProduct.onclick = close
        modalOverlay.onclick = close;
        notAcceptDelete.onclick = close;
        function close () {
            itemDeleteProduct.classList.remove('popup-delete-product-cart-active');
            setTimeout( function () {
                modalOverlay.classList.add('d-n');
                modalBody.classList.add('d-n');
            }, 150);
        }

    });
});

// Update Total Price
function updateTotalPrice (total , numberProduct) {
    var productTotalPay = document.querySelector('#product__total-price');
    var productTotalPayDisplayCart = document.querySelector('.price-of-cart');
    var headerCartCounter = document.querySelector('.header__cart-couter');
    var productTotalNumber = document.querySelector('#product__total-couter');
    headerCartCounter.innerHTML = numberProduct;
    productTotalNumber.innerHTML = numberProduct;
    productTotalPay.innerHTML = total;
    productTotalPayDisplayCart.innerHTML = total;
    updateProgress(total);
}

// Update Progress
function updateProgress (total) {
    var totalProgress = document.querySelector('.product__page-price');
    var progressDisplay = document.querySelector('.product__page-progress-per');
    totalProgress.innerHTML = `$ ${total} / $70.00`;
    var width = (total / 70 * 100) + '%';
    progressDisplay.style.width = width;
}

// Check Click When update product in cart
var buttonUpdateProduct = document.querySelectorAll('.product__qty-update');
buttonUpdateProduct.forEach(button => {
    button.addEventListener('click', () => {
        var sum = totalPay();
        var number = counterNumberProduct();
        updateTotalPrice(sum, number);
    });
});

// Delete Product Function
function deleteProduct(index, length) {
    Array.from(cartProduct)[index].remove();
    if(--length === 0) {
        bodyCart.classList.add('cart--empty');
        bodyCart.classList.remove('cart--product');
    }
    var total = totalPay();
    var number = counterNumberProduct();
    updateTotalPrice(total, number);    
}

// Total Pay
function totalPay () {
    var cartProduct = document.querySelectorAll('.product__details-item');
    var total = 0;
    var length = couterProduct ();
    for (var i = 0; i < length; ++i) {
        total = total + (parseFloat(cartProduct[i].querySelector('.product__price-total').innerHTML)
                         * parseFloat(cartProduct[i].querySelector('.counter').value));
    }
    return total.toFixed(2);
}

// Count Number Product
function counterNumberProduct () {
    var cartProduct = document.querySelectorAll('.product__details-item');
    var numberProduct = 0;
    var length = couterProduct ();
    for (var i = 0; i < length; ++i) {
        numberProduct = numberProduct + parseInt(cartProduct[i].querySelector('.counter').value);
    }
    return numberProduct;
}

// Number Product Cart
var inputNumberProduct = document.querySelectorAll('.counter');
var productQtyUpdate = document.querySelectorAll('.product__qty-update');
inputNumberProduct.forEach((element, index) => {
    var currentValue = inputNumberProduct[index].value;
    element.addEventListener("input", () => {
        if(currentValue !== inputNumberProduct[index].value) {
            productQtyUpdate[index].classList.remove('d-n');
            productQtyUpdate[index].addEventListener('click', () => {
                productQtyUpdate[index].classList.add('d-n');
                currentValue = inputNumberProduct[index].value;
            });
        } else {
            productQtyUpdate[index].classList.add('d-n');
        }
    });
});


