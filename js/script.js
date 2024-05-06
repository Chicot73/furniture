window.addEventListener('DOMContentLoaded', () => {

    //slider-1
    
    const slider = new Swiper('.slider-1', {
        loop: true,
        slidesPerView: 'auto',
        //freeMode: false,
        initialSlide: 1,
        loopedSlides: 2,
        spaceBetween: 23,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
            nextEl: '.introduce__next',
            prevEl: '.introduce__prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false
        } 
    });


    //slider-2
    
    const slider2 = new Swiper('.slider-2', {
        loop: true,
        slidesPerView: 'auto',
        initialSlide: 0,
        loopedSlides: 3,
        spaceBetween: 23,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
            nextEl: '.slider-2__next',
          },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            10: {
                spaceBetween: 19,
            },
            592: {
                spaceBetween: 23,
            },
        }
    });


    //slider-3
    
    const slider3 = new Swiper('.slider-3', {
        loop: true,
        slidesPerView: 'auto',
        initialSlide: 2,
        loopedSlides: 2,
        spaceBetween: 32,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
            nextEl: '.essays__next',
            prevEl: '.essays__prev',
          },
        breakpoints: {
            10: {
                spaceBetween: 22,
            },
            592: {
                spaceBetween: 32,
            },
        }
    });


    //slider-4
    
    const slider4 = new Swiper('.slider-4', {
        loop: false,
        slidesPerView: 'auto',
        freeMode: true,
        initialSlide: 2,
        loopedSlides: 2,
        spaceBetween: 20,
        centeredSlides: true,
        grabCursor: true,
        breakpoints: {
            10: {
                spaceBetween: 15,
            },
            592: {
                spaceBetween: 20,
            },
        }
    });

    

    //mobile menu

    const burger = document.querySelector('.header__burger'),
        cross = document.querySelector('.header__cross'),
        menuMob = document.querySelector('.header__menu'),
        menuBack = document.querySelector('.header__orange'),
        darker = document.querySelector('.header__darker'),
        action = document.querySelector('.introduce__action'),
        bodyM = document.querySelector('body');

    burger.addEventListener('click', (e) => {
        
        if (menuMob.classList.contains('header__menu--out')) {
            menuMob.classList.remove('header__menu--out');
        }; 
        if (menuBack.classList.contains('header__orange--out')) {
            menuBack.classList.remove('header__orange--out');
        };   
        
        menuMob.classList.add('header__menu--in');
        menuBack.classList.add('header__orange--in');
        darker.style.opacity = '1';
        action.style.opacity = '0.7';
        bodyM.style.overflow = 'hidden';
    }); 

    cross.addEventListener('click', (e) => {

        menuMob.classList.remove('header__menu--in');
        menuMob.classList.add('header__menu--out');
        menuBack.classList.remove('header__orange--in');
        menuBack.classList.add('header__orange--out');
        darker.style.opacity = '0';
        action.style.opacity = '1';
        bodyM.style.overflow = 'scroll';
    });  

    window.addEventListener('resize', (e) => { 
        if (menuMob.classList.contains('header__menu--out')) {
            menuMob.classList.remove('header__menu--out');
        }; 
        if (menuBack.classList.contains('header__orange--out')) {
            menuBack.classList.remove('header__orange--out');
        }; 
    });





    

    //Корзина товаров  + + + + + + + + + + + + + + + + + + + + + + + + 


       function toNum(str) {
        const num = Number(str.replace(/\D/g, ""));
        return num;
    }


    function toCurrency(num) {
        const format = new Intl.NumberFormat("en-EN", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(num);
        return format;
    } 

    const cardAddArr = Array.from(document.querySelectorAll(".card__basket")); 
    const cartNum = document.querySelector("#cart_num"); 
    const cart = document.querySelector("#cart");  
    const body = document.body;


    class Cart {
        products;
        constructor() {
            this.products = [];
        }
        get count() {
            return this.products.length;
        }
        addProduct(product) {
            this.products.push(product);
        }
        addLikeitem(likeItem) {
            this.products.push(likeItem);
        }
        removeProduct(product) {
            const findIndex = this.products.indexOf(product);
            if (findIndex !== -1) {
                this.products.splice([findIndex], 1);
            }
        }


        get costFinal() {
            const prices2 = this.products.map((product) => {
                return toNum(product.finalprice);
            });
            const sum2 = prices2.reduce((acc, num) => {
                return acc + num;
            }, 0);
            return sum2;
        }
    }

    
    class Product {
        imageSrc;
        name;
        desc;
        price;
        finalprice;
        id;
        valie;
        constructor(card) {
            this.imageSrc = card.querySelector(".card__image").children[0].src;
            this.name = card.querySelector(".card__title").innerText;
            this.desc = card.querySelector(".card__desc").innerText;
            this.price = card.querySelector(".card__newprice").innerText;
            this.finalprice = card.querySelector(".card__newprice").innerText;
            this.id = card.querySelector(".card__basket").dataset.id;
            this.valie = 1;
        }
    };


    const myCart = new Cart();

    if (localStorage.getItem("cart") == null) {
        localStorage.setItem("cart", JSON.stringify(myCart));
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    cartNum.textContent = myCart.count;


    
    myCart.products = cardAddArr.forEach((cardAdd) => {

        cardAdd.addEventListener("click", (e) => {

            e.preventDefault();
            const card = e.target.closest(".card");
            let product = new Product(card);
            const savedCart = JSON.parse(localStorage.getItem("cart"));
            myCart.products = savedCart.products;
            let cardId = e.target.dataset.id;  

            if (cardAdd.classList.contains("added")) {
                cardAdd.classList.remove("added");             
                cardAdd.innerHTML = "Add to cart";

                let newArray = myCart.products.filter((product) => product.id !== cardId); 
                myCart.products = newArray; 
                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.textContent = myCart.count;
                if (myCart.count == 0) {
                    if (cartNum.classList.contains("active")) {
                        cartNum.classList.remove("active");
                    };
                };
                basketBlockFill();
            } else {
                cardAdd.classList.add("added");
                cartNum.classList.add("active");
                cardAdd.innerHTML = "Remove from cart";

                let index = myCart.products.findIndex(el => el.id === cardId);
                if (index !== -1) {  

                    let alertBlock = document.createElement("div");
                    alertBlock.classList.add("favorites-alert__block");
                    alertBlock.classList.add("active");
                    alertBlock.innerHTML = 'Your item \"' + cardId + '\" has already been added to the cart';
                    let alertButton = document.createElement("button");
                    alertButton.classList.add("favorites-alert__button");
                    alertButton.innerHTML = "OK";
                    alertBlock.appendChild(alertButton);
                    card.appendChild(alertBlock);
                    body.style.overflow = 'hidden';

                    alertButton.addEventListener("click", (e) => {
                        e.preventDefault();
                        alertBlock.classList.remove("active");
                        body.style.overflow = 'scroll';
                        alertBlock = null;
                    })

                } else {
                    myCart.addProduct(product);
                    localStorage.setItem("cart", JSON.stringify(myCart));
                    cartNum.textContent = myCart.count; 
                }
            }; 
        });
    });


    const basketBack = document.querySelector(".basket__back");
    const basketClose = document.querySelector("#basket_cross");
    const basketСontent = document.querySelector("#basket_content");
    const basketPrice = document.querySelector("#final_price");
    const basketAmount = document.querySelector("#items_amount");
    const itemAmount = document.querySelector("#item_amount");


    function basketBlockFill() {
        basketСontent.innerHTML = null;
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        myCart.products = savedCart.products;

        let productsHTML = myCart.products.map((product) => {
          const productItem = document.createElement("div");
          productItem.classList.add("basket-item");
      
          const productWrap1 = document.createElement("div");
          productWrap1.classList.add("basket-item__left");
          const productWrap2 = document.createElement("div");
          productWrap2.classList.add("basket-item__right");
          const productWrap3 = document.createElement("div");
          productWrap3.classList.add("basket-item__text");
          const productWrap4 = document.createElement("div");
          productWrap4.classList.add("amount");
      
          const productImage = document.createElement("img");
          productImage.classList.add("basket-item__image");
          productImage.setAttribute("src", product.imageSrc);
      
          const productTitle = document.createElement("h6");
          productTitle.classList.add("basket-item__title");
          productTitle.innerHTML = product.name;

          const productDesc = document.createElement("p");
          productDesc.classList.add("basket-item__desc");
          productDesc.innerHTML = product.desc;

          const itemMinus = document.createElement("button");
          itemMinus.classList.add("amount__minus");
          itemMinus.innerHTML = "&#8722;";

          const itemWord = document.createElement("div");
          itemWord.classList.add("amount__word");
          itemWord.innerHTML = "quantity&nbsp;&nbsp;";

          const itemAmount = document.createElement("span");
          itemAmount.classList.add("amount__number");
          itemAmount.innerHTML = product.valie;

          const itemPlus = document.createElement("button");
          itemPlus.classList.add("amount__plus");
          itemPlus.innerHTML = "&#43;";
      
          const productPrice = document.createElement("div");
          productPrice.classList.add("basket-item__price");
          productPrice.innerHTML = toCurrency(toNum(product.finalprice));
      
          const productDelete = document.createElement("button");
          productDelete.classList.add("basket-item__off");
          productDelete.innerHTML = "&#10006;";
      
          productDelete.addEventListener("click", () => {
                myCart.removeProduct(product);
                let index = cardAddArr.findIndex(el => el.dataset.id === product.id);
                cardAdd = cardAddArr[index];
                cardAdd.innerHTML = "Add to cart";
                if (cardAdd.classList.contains("added")) {
                    cardAdd.classList.remove("added");
                } 
                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.textContent = myCart.count;
                basketBlockFill();
          });

          itemMinus.addEventListener("click", () => {
                if (product.valie-1 == 0) {
                    myCart.removeProduct(product);
                    let index = cardAddArr.findIndex(el => el.dataset.id === product.id);
                    cardAdd = cardAddArr[index];
                    cardAdd.innerHTML = "Add to cart";
                    if (cardAdd.classList.contains("added")) {
                        cardAdd.classList.remove("added");
                    }
                    localStorage.setItem("cart", JSON.stringify(myCart));
                    cartNum.textContent = myCart.count;
                    basketBlockFill();
                };
                product.valie--;
                itemAmount.textContent = String(product.valie);
                ariphMinus = toNum(product.price);
                productPrice.innerHTML = toCurrency(ariphMinus * product.valie);
                product.finalprice = toCurrency(ariphMinus * product.valie);
                basketPrice.textContent = toCurrency(myCart.costFinal);
                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.textContent = myCart.count;
          });
          
          itemPlus.addEventListener("click", () => {
                product.valie++;
                itemAmount.textContent = String(product.valie);
                ariphPlus = toNum(product.price);
                productPrice.innerHTML = toCurrency(ariphPlus * product.valie);
                product.finalprice = toCurrency(ariphPlus * product.valie);
                basketPrice.textContent = toCurrency(myCart.costFinal);
                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.textContent = myCart.count;
          });
        
      
          productWrap1.appendChild(productImage);
          productWrap1.appendChild(productWrap3);
          productWrap2.appendChild(productWrap4);
          productWrap3.appendChild(productTitle);
          productWrap3.appendChild(productDesc);
          productWrap4.appendChild(itemMinus);
          productWrap4.appendChild(itemWord);
          productWrap4.appendChild(itemAmount);
          productWrap4.appendChild(itemPlus);           
          productWrap2.appendChild(productPrice);
          productWrap2.appendChild(productDelete);
          productItem.appendChild(productWrap1);
          productItem.appendChild(productWrap2);

          return productItem;
          
        });
      
        productsHTML.forEach((productHTML) => {
            basketСontent.appendChild(productHTML);
        });


        basketAmount.textContent = myCart.count;
        basketPrice.textContent = toCurrency(myCart.costFinal);
    };


    cart.addEventListener("click", (e) => {
        e.preventDefault();
        basketBack.classList.add("active");
        body.style.overflow = 'hidden';
        basketBlockFill();
    });

    basketClose.addEventListener("click", (e) => {
        e.preventDefault();
        if (myCart.count == 0) {
            if (cartNum.classList.contains("active")) {
                cartNum.classList.remove("active");
            }
        };
        basketBack.classList.remove("active");
        body.style.overflow = 'scroll';
    });

    window.addEventListener('load', (e) => { 
        basketBlockFill(e);
        
        cartNum.classList.add("active");
        if (myCart.count == 0) {
            cartNum.classList.remove("active");
        };
    });
        



    



    // Список Faavorites  + + + + + + + + + + + + + + + + + + + + + + + + 


 

    const favoritesAddArr = Array.from(document.querySelectorAll("#card_like"));
    const favoritesNum = document.querySelector("#favorites_num");
    const favorites = document.querySelector("#like");  
    const fav_alertBlock = document.querySelector("#favorites-alert_block"); 
    const fav_alertClose = document.querySelector(".favorites-alert__button"); 


    class Like {
        likeItems; 
        constructor() {
            this.likeItems = [];
        }
        get count() {
            return this.likeItems.length;
        } 
        addProduct(likeItem) {
            this.likeItems.push(likeItem);
        }
        removeProduct(likeItem) {
            const findIndex = this.likeItems.indexOf(likeItem);
            if (findIndex !== -1) {
                this.likeItems.splice([findIndex], 1);
            } 
        }
    }

    
    class Item {
        imageSrc;
        name;
        desc;
        price;
        finalprice;
        id;
        valie;
        constructor(card) {
            this.imageSrc = card.querySelector(".card__image").children[0].src;
            this.name = card.querySelector(".card__title").innerText;
            this.desc = card.querySelector(".card__desc").innerText;
            this.price = card.querySelector(".card__newprice").innerText;
            this.finalprice = card.querySelector(".card__newprice").innerText;
            this.id = card.querySelector(".card__basket").dataset.id;
            this.valie = 1;
        }
    };


    const myLike = new Like();

    if (localStorage.getItem("like") == null) {
        localStorage.setItem("like", JSON.stringify(myLike));
    }

    const savedLike = JSON.parse(localStorage.getItem("like"));
    myLike.likeItems = savedLike.likeItems;
    favoritesNum.textContent = myLike.count;
    
    if (myLike.count == 0) {
        if (favorites.children[0].classList.contains("user__like--active")) {
            favorites.children[0].classList.remove("user__like--active");
        };
        favorites.children[0].classList.add("user__like--empty");
    } 
    else {
        if (favorites.children[0].classList.contains("user__like--empty")) {
            favorites.children[0].classList.remove("user__like--empty");
        };
        favorites.children[0].classList.add("user__like--active");
    };


    
    myLike.likeItems = favoritesAddArr.forEach((favoritesAdd) => {  

        favoritesAdd.addEventListener("click", (e) => {
            e.preventDefault();
            const card = e.target.closest(".card"); 
            const likeItem = new Item(card);
            const savedLike = JSON.parse(localStorage.getItem("like"));
            myLike.likeItems = savedLike.likeItems;
            let likeId = e.target.dataset.id;  

            if (favoritesAdd.classList.contains("card__like--active")) {
                favoritesAdd.classList.remove("card__like--active");

                let newArray2 = myLike.likeItems.filter((likeItem) => likeItem.id !== likeId);
                myLike.likeItems = newArray2; 

                localStorage.setItem("like", JSON.stringify(myLike));
                favoritesNum.textContent = myLike.count; 
                if (myLike.count == 0) {
                    if (favoritesNum.classList.contains("active")) {
                        favoritesNum.classList.remove("active");
                    };
                    if (favorites.children[0].classList.contains("user__like--active")) {
                        favorites.children[0].classList.remove("user__like--active");
                    };
                    favorites.children[0].classList.add("user__like--empty");
                };
                likeBlockFill();
            } else {
                favoritesAdd.classList.add("card__like--active");
                favoritesNum.classList.add("active");

                let index = myLike.likeItems.findIndex(el => el.id === likeId);
                if (index !== -1) {
                    let alertBlock = document.createElement("div");
                    alertBlock.classList.add("favorites-alert__block");
                    alertBlock.classList.add("active");
                    alertBlock.innerHTML = 'Your favorite item \"' + likeId + '\" has already been added to the favorites';
                    let alertButton = document.createElement("button");
                    alertButton.classList.add("favorites-alert__button");
                    alertButton.innerHTML = "OK";
                    alertBlock.appendChild(alertButton);
                    card.appendChild(alertBlock);
                    body.style.overflow = 'hidden';

                    alertButton.addEventListener("click", (e) => {
                        e.preventDefault();
                        alertBlock.classList.remove("active");
                        body.style.overflow = 'scroll';
                        alertBlock = null;
                    })
                } else {
                    if (favorites.children[0].classList.contains("user__like--empty")) {
                        favorites.children[0].classList.remove("user__like--empty");
                    };
                    favorites.children[0].classList.add("user__like--active");
                    myLike.addProduct(likeItem);
                    localStorage.setItem("like", JSON.stringify(myLike));
                    favoritesNum.textContent = myLike.count;
                }
            }; 
            if (myLike.removeProduct(likeItem)) {
                favoritesAdd.classList.remove("card__like--active");
            }
        });
    });



    const favoritesBack = document.querySelector(".favorites__back"); 
    const favoritesClose = document.querySelector("#favorites_cross"); 
    const favoritesСontent = document.querySelector("#favorites_content"); 
    const container = document.querySelector(".container");



    function likeBlockFill() {
        favoritesСontent.innerHTML = null;
        const savedLike = JSON.parse(localStorage.getItem("like"));
        myLike.likeItems = savedLike.likeItems;
        const itemsHTML = myLike.likeItems.map((likeItem) => {  
          const likeItemOne = document.createElement("div");  
          likeItemOne.classList.add("favorites-item");
      
          const likeItemWrap1 = document.createElement("div");
          likeItemWrap1.classList.add("favorites-item__left");
          const likeItemWrap2 = document.createElement("div");
          likeItemWrap2.classList.add("favorites-item__right");
      
          const likeItemImage = document.createElement("img");
          likeItemImage.classList.add("favorites-item__image");
          likeItemImage.setAttribute("src", likeItem.imageSrc);
      
          const likeItemTitle = document.createElement("h6");
          likeItemTitle.classList.add("favorites-item__title");
          likeItemTitle.innerHTML = likeItem.name;

          const likeItemDesc = document.createElement("p");
          likeItemDesc.classList.add("favorites-item__desc");
          likeItemDesc.innerHTML = likeItem.desc;
      
          const likeItemPrice = document.createElement("div");
          likeItemPrice.classList.add("favorites-item__price");
          likeItemPrice.innerHTML = likeItem.price;
      
          const likeitemBuy = document.createElement("button");
          likeitemBuy.classList.add("favorites__buy");
          likeitemBuy.innerHTML = "Add to cart";
      
          likeitemBuy.addEventListener("click", () => {
                if (localStorage.getItem("cart") == null) {
                    localStorage.setItem("cart", JSON.stringify(myCart));
                };
            
                const savedCart = JSON.parse(localStorage.getItem("cart"));
                myCart.products = savedCart.products;
                myCart.addLikeitem(likeItem);
                localStorage.setItem("cart", JSON.stringify(myCart));
                cartNum.classList.add("active");
                cartNum.textContent = myCart.count;
                let alertBlock = document.createElement("div");
                alertBlock.classList.add("favorites-alert__block2");
                alertBlock.classList.add("active");
                alertBlock.innerHTML = 'Your item \"' + likeItemTitle.innerHTML + '\" has been added to the cart';
                let alertButton = document.createElement("button");
                alertButton.classList.add("favorites-alert__button");
                alertButton.innerHTML = "OK";
                alertBlock.appendChild(alertButton);
                container.appendChild(alertBlock);
                body.style.overflow = 'hidden';
                myLike.removeProduct(likeItem);
                let index = favoritesAddArr.findIndex(el => el.dataset.id === likeItem.id);
                favoritesAdd = favoritesAddArr[index];
                if (favoritesAdd.classList.contains("card__like--active")) {
                    favoritesAdd.classList.remove("card__like--active");
                }
                localStorage.setItem("like", JSON.stringify(myLike));
                favoritesNum.textContent = myLike.count;
                likeBlockFill();

                alertButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    alertBlock.classList.remove("active");
                    body.style.overflow = 'scroll';
                    alertBlock = null;
                })    
          });

          const likeitemDelete = document.createElement("button");
          likeitemDelete.classList.add("favorites-item__off");
          likeitemDelete.innerHTML = "&#10006;";
      
          likeitemDelete.addEventListener("click", () => {
                myLike.removeProduct(likeItem);
                let index = favoritesAddArr.findIndex(el => el.dataset.id === likeItem.id);
                favoritesAdd = favoritesAddArr[index];
                if (favoritesAdd.classList.contains("card__like--active")) {
                    favoritesAdd.classList.remove("card__like--active");
                }
                localStorage.setItem("like", JSON.stringify(myLike));
                favoritesNum.textContent = myLike.count;
                likeBlockFill();

          });
      
          likeItemWrap1.appendChild(likeItemTitle);
          likeItemWrap1.appendChild(likeItemDesc);
          likeItemWrap2.appendChild(likeItemPrice);
          likeItemWrap2.appendChild(likeitemBuy);
          likeItemWrap2.appendChild(likeitemDelete);
          likeItemOne.appendChild(likeItemImage);
          likeItemOne.appendChild(likeItemWrap1);
          likeItemOne.appendChild(likeItemWrap2);
      
          return likeItemOne;
        });
      
        itemsHTML.forEach((itemHTML) => {
            favoritesСontent.appendChild(itemHTML);
        });
    };


    favorites.addEventListener("click", (e) => {
        e.preventDefault();
        favoritesBack.classList.add("active");
        body.style.overflow = 'hidden';
        likeBlockFill();
    });

    favoritesClose.addEventListener("click", (e) => {
        e.preventDefault();
        if (myLike.count == 0) {
            if (favoritesNum.classList.contains("active")) {
                favoritesNum.classList.remove("active");
            };
            if (favorites.children[0].classList.contains("user__like--active")) {
                favorites.children[0].classList.remove("user__like--active");
            };
            favorites.children[0].classList.add("user__like--empty");
        };
        favoritesBack.classList.remove("active");
        body.style.overflow = 'scroll';

    });

    window.addEventListener('load', (e) => {
        likeBlockFill(e);
        favoritesNum.classList.add("active");
        if (myLike.count == 0) {
            favoritesNum.classList.remove("active");
        };
    });

});//начальная функция 