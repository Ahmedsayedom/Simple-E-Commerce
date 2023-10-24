var allProducts = []
var cartCount = 0

function addToCart(product) {
  var cartItems = getCartItemsFromCookies()
  var existingItem = cartItems.find(item => item.id === product.id)

  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.push({ id: product.id, quantity: 1, ...product })
  }
  setCartItemsInCookies(cartItems)
  cartCount++
  setCookie("cartCount", cartCount)
  updateCartCounter()
}

function updateCartCounter() {
  var cartCount = parseInt(getCookie("cartCount")) || 0
  var itemCounter = document.querySelector(".item-counter")
  if (itemCounter) {
    itemCounter.textContent = cartCount
  }
}
function getCartItemsFromCookies() {
  var cartItems = JSON.parse(getCookie("cartItems") || "[]")
  // var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
  return cartItems
}

function setCartItemsInCookies(cartItems) {
  setCookie("cartItems", JSON.stringify(cartItems))
  // localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

function setCookie(name, value, days = 7) {
  var expires = new Date(Date.now() + days)
  document.cookie = name + "=" + value + "; expires=" + expires + ";path=/"
}
function setRemoveCookie(name, value, days = 7) {
  var expires = new Date(Date.now() - days)
  document.cookie = name + "=" + value + "; expires=" + expires + ";path=/"
}

var lastDate = new Date()
lastDate.setDate(lastDate.getDate() - 1)
function deleteCookie(key) {
  document.cookie = key + "=; expires=" + lastDate + "; path=/"
}

function getCookie(name) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=")
    return parts[0] === name ? parts[1] : r
  }, "")
}

function handleAddToCartClick(product) {
  addToCart(product)
}
function getproducts() {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://dummyjson.com/products?limit=28")
  xhr.send("")

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var response = xhr.response
        var data = JSON.parse(xhr.responseText)
        console.log(data.products)
        clearProductCards()
        allProducts = data.products
        createProductCards(allProducts)
      } else {
        console.log("Error fetching products")
      }
    }
  }
}

function filterProducts(category) {
  var filteredProducts = allProducts.filter(
    product => product.category === category
  )
  clearProductCards()
  createProductCards(filteredProducts)
}

function clearProductCards() {
  var productsContainer = document.getElementById("products")
  while (productsContainer.firstChild) {
    productsContainer.removeChild(productsContainer.firstChild)
  }
}

function createProductCards(products) {
  var productsContainer = document.getElementById("products")

  products.forEach(product => {
    var productCard = document.createElement("div")
    productCard.classList.add("product-card")
    var image = document.createElement("img")
    image.src = product.thumbnail
    image.alt = product.title

    var productInfo = document.createElement("div")
    productInfo.classList.add("product-info")

    var titleContainer = document.createElement("div")
    titleContainer.classList.add("title-container")
    var title = document.createElement("span")
    title.classList.add("product-title")
    title.textContent = product.title
    titleContainer.appendChild(title)

    var price = document.createElement("span")
    price.classList.add("product-price")
    price.textContent = "$" + product.price.toFixed(2)

    var stock = document.createElement("span")
    stock.classList.add("product-stock")
    stock.textContent = "Stock: " + product.stock

    var addToCartButton = document.createElement("button")
    addToCartButton.classList.add("add-to-cart-button")
    addToCartButton.textContent = "Add to Cart"
    addToCartButton.addEventListener("click", function () {
      handleAddToCartClick(product)
    })
    productInfo.appendChild(titleContainer)
    productInfo.appendChild(price)
    productInfo.appendChild(stock)
    productInfo.appendChild(addToCartButton)

    productCard.appendChild(image)
    productCard.appendChild(productInfo)

    productsContainer.appendChild(productCard)
  })
}

var SliderImg = document.getElementById("sliderimg")

function SliderNext() {
  var i = parseInt(SliderImg.getAttribute("src").match(/\d+/)[0])
  i++
  if (i > 4) {
    i = 1
  }
  SliderImg.setAttribute("src", "./images/" + i + ".jpg")
}
function SliderBack() {
  var i = parseInt(SliderImg.getAttribute("src").match(/\d+/)[0])
  i--
  if (i < 1) {
    i = 4
  }
  SliderImg.setAttribute("src", "./images/" + i + ".jpg")
}
function allProduct() {
  clearProductCards()
  createProductCards(allProducts)
}

// =============contact_us validation================

var name1 = document.getElementById("name")
var email = document.getElementById("email")
var password = document.getElementById("password")
var message = document.getElementById("Message")

var error1 = document.getElementById("error1")
var error2 = document.getElementById("error2")
var error3 = document.getElementById("error3")

var nameRegex = /^[A-Za-z\s]+$/gi
var emailRegx = /\b.{1,}@(gmail|outlook|yahoo)\.com\b/gi
var passRegx = /([A-Za-z\d]){8,}/gi
var messageRegex = /\b([A-Za-z\d]){1,150}\b/gi

function submitInfo() {
  if (!name1.value.match(nameRegex)) {
    error1.style.display = "block"
    name1.style.borderColor = "red"
  } else {
    error1.style.display = "none"
    name1.style.borderColor = "green"
  }
  if (!email.value.match(emailRegx)) {
    error2.style.display = "block"
    email.style.borderColor = "red"
  } else {
    error2.style.display = "none"
    email.style.borderColor = "green"
  }

  if (!password.value.match(passRegx)) {
    error3.style.display = "block"
    password.style.borderColor = "red"
  } else {
    error3.style.display = "none"
    password.style.borderColor = "green"
  }
  if (!message.value.match(messageRegex)) {
    error4.style.display = "block"
    message.style.borderColor = "red"
  } else {
    error4.style.display = "none"
    message.style.borderColor = "green"
  }
}
function resetinfo() {
  error1.style.display = "none"
  error2.style.display = "none"
  error3.style.display = "none"
  error4.style.display = "none"
  name1.value = ""
  email.value = ""
  password.value = ""
  message.value = ""
  name1.style.borderColor = "red"
  email.style.borderColor = "red"
  password.style.borderColor = "red"
  message.style.borderColor = "red"
}
// -------------------cart---------------------------
var cart = document.getElementById("cart")

var cartProducts = document.getElementById("ProductsInCart")

function clearCartItemCards(className) {
  var ProductsInCart = document.getElementById(className)
  while (ProductsInCart.firstChild) {
    ProductsInCart.removeChild(ProductsInCart.firstChild)
  }
}

var total = 0
function addedItem() {
  total = 0
  clearCartItemCards("ProductsInCart")
  var cartItems = getCartItemsFromCookies()

  var uniqueItems = {}
  if (cartItems.length == 0) {
    clearCartItemCards("cart")
    var cartEmptyDiv = document.createElement("div")
    cartEmptyDiv.setAttribute("id", "Empty")
    cartEmptyDiv.textContent = "Your cart is empty."
    cart.appendChild(cartEmptyDiv)
    infoDiv.remove()
  } else {
    cartItems.forEach(item => {
      if (!uniqueItems[item.id]) {
        uniqueItems[item.id] = {
          item: item,
          quantity: 1,
        }
      } else {
        uniqueItems[item.id].quantity++
      }
    })

    for (const itemId in uniqueItems) {
      var cartItem = uniqueItems[itemId]
      var item = cartItem.item
      var quantity = item.quantity

      var itemCardDiv = document.createElement("div")
      itemCardDiv.classList.add("itemCard")

      var ImageContainerDiv = document.createElement("div")
      ImageContainerDiv.classList.add("img-container")

      var imageDiv = document.createElement("img")
      imageDiv.src = item.thumbnail
      imageDiv.alt = item.title

      var itemInfoDiv = document.createElement("div")
      itemInfoDiv.classList.add("itemInfo")

      var itemNameDiv = document.createElement("div")
      itemNameDiv.classList.add("itemName")
      itemNameDiv.textContent = item.title

      var itemDesDiv = document.createElement("div")
      itemDesDiv.classList.add("itemDes")
      itemDesDiv.textContent = item.description

      var itemCtDiv = document.createElement("div")
      itemCtDiv.classList.add("itemCt")
      itemCtDiv.textContent = "Quantity: " + quantity

      var itemPriceDiv = document.createElement("div")
      itemPriceDiv.classList.add("itemPrice")
      itemPriceDiv.textContent = "$" + item.price.toFixed(2)

      var itemTotalDiv = document.createElement("div")
      itemTotalDiv.classList.add("itemTotal")
      itemTotalDiv.textContent = "Total: $" + (item.price * quantity).toFixed(2)

      var button_groupDiv = document.createElement("div")
      button_groupDiv.classList.add("button-group")

      var deleteItem = document.createElement("button")
      deleteItem.classList.add("deleteItem")
      deleteItem.textContent = "Delete"

      var removeOneItem = document.createElement("button")
      removeOneItem.classList.add("removeOneItem")
      removeOneItem.textContent = "-"

      var addOneItem = document.createElement("button")
      addOneItem.classList.add("addOneItem")
      addOneItem.textContent = "+"
      ;(function (item, quantity) {
        deleteItem.addEventListener("click", function () {
          deleteItemButton(item, quantity)

          refreshCartPage()
          updateCartUI()
        })

        removeOneItem.addEventListener("click", function () {
          decreaseItemButton(item)
          refreshCartPage()
          updateCartUI()
        })

        addOneItem.addEventListener("click", function () {
          handleAddToCartClick(item)
          refreshCartPage()
          updateCartUI()
        })
      })(item, quantity)
      cartProducts.appendChild(itemCardDiv)
      itemCardDiv.appendChild(ImageContainerDiv)
      ImageContainerDiv.appendChild(imageDiv)
      itemCardDiv.appendChild(itemInfoDiv)
      itemInfoDiv.appendChild(itemNameDiv)
      itemInfoDiv.appendChild(itemDesDiv)
      itemCardDiv.appendChild(itemCtDiv)
      itemCtDiv.appendChild(itemPriceDiv)
      itemCtDiv.appendChild(itemTotalDiv)
      itemCtDiv.appendChild(button_groupDiv)
      button_groupDiv.appendChild(deleteItem)
      button_groupDiv.appendChild(removeOneItem)
      button_groupDiv.appendChild(addOneItem)

      total += item.price * quantity
    }
  }
}

function totalPrice() {
  var existingInfoDiv = document.getElementById("info")
  if (existingInfoDiv) {
    cart.removeChild(existingInfoDiv)
  }

  var infoDiv = document.createElement("div")
  infoDiv.setAttribute("id", "info")

  var totalDiv = document.createElement("div")
  totalDiv.textContent = "Total: $" + total.toFixed(2)

  var deleteAllCart = document.createElement("button")
  deleteAllCart.classList.add("deleteAllCart")
  deleteAllCart.textContent = "Delete all Items"
  deleteAllCart.addEventListener("click", function () {
    deleteCookie("cartCount")
    deleteCookie("cartItems")
    refreshCartPage()
  })
  infoDiv.appendChild(totalDiv)
  infoDiv.appendChild(deleteAllCart)
  cart.appendChild(infoDiv)

  refreshCartPage()
}

function updateCartUI() {
  updateCartCounter()
  addedItem()
  totalPrice()
}

function deleteItemButton(item, quantity) {
  var cartItems = getCartItemsFromCookies()
  var updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id)

  cartCount -= quantity
  setCookie("cartCount", cartCount)
  setCartItemsInCookies(updatedCartItems)
  refreshCartPage()
  updateCartUI()
}

function decreaseItemButton(item) {
  var cartItems = getCartItemsFromCookies()
  var updatedCartItems = [...cartItems]
  var index = updatedCartItems.findIndex(cartItem => cartItem.id === item.id)

  if (index !== -1) {
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--
    } else {
      updatedCartItems.splice(index, 1)
    }
  }

  setCartItemsInCookies(updatedCartItems)
  cartCount--
  setCookie("cartCount", cartCount)
  updateCartCounter()
}

function increaseItemButton(item) {
  var cartItems = getCartItemsFromCookies()
  var updatedCartItems = [...cartItems]
  var index = updatedCartItems.findIndex(cartItem => cartItem.id === item.id)

  if (index !== -1) {
    updatedCartItems[index].quantity++
  } else {
    updatedCartItems.push({ id: item.id, quantity: 1, ...item })
  }
  refreshCartPage()

  setCartItemsInCookies(updatedCartItems)
  cartCount++
  setCookie("cartCount", cartCount)
  updateCartCounter()
}

function refreshCartPage() {
  clearCartItemCards("ProductsInCart")
  addedItem()

  updateCartCounter()
}

window.onload = function () {
  cartCount = parseInt(getCookie("cartCount") || "0")
  getproducts()
  updateCartCounter()
  addedItem()
  totalPrice()
}

/******************Back to top button**************** */
var backToTopButton = document.getElementById("back-to-top")

backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    backToTopButton.style.display = "block"
  } else {
    backToTopButton.style.display = "none"
  }
})
