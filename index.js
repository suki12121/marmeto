document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON from the response
    })
    .then((data) => {
      const productVendor = document.querySelector(".product-vendor");
      const productTitle = document.querySelector(".product-title");
      const price = document.querySelector(".price");
      const comparePrice = document.querySelector(".compare-price");
      const productImages1 = document.querySelector(".product-images1");
      const productImages = document.querySelector(".product-images");
      const colorContainer = document.querySelector(".color-container");
      const sizeContainer = document.querySelector(".size-container");
      const description = document.querySelector(".description");

      // Populate product details
      productTitle.textContent = data.product.title;
      productVendor.textContent = `${data.product.vendor}`;
      price.textContent = `${data.product.price}`;
      comparePrice.textContent = `${data.product.compare_at_price}+.00`;
      description.innerHTML = data.product.description;

      const img = document.createElement("img");
      img.src = data.product.images[0].src;
      img.classList.add("img-bg1");
      productImages1.appendChild(img);
      // Populate product images
      data.product.images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.src;
        img.alt = "Product Image";
        img.classList.add("img-bg");
        productImages.appendChild(img);
      });

      data.product.options
        .find((option) => option.name === "Color")
        .values.forEach((color) => {
          const colorDiv = document.createElement("div");
          colorDiv.classList.add("color");
          colorDiv.style.backgroundColor = Object.values(color)[0];
          colorDiv.setAttribute("data-color", Object.keys(color)[0]);
          colorContainer.appendChild(colorDiv);
        });

      data.product.options
        .find((option) => option.name === "Size")
        .values.forEach((size) => {
          const conatiner = document.createElement("div");
          const sizeRadio = document.createElement("input");
          sizeRadio.type = "radio";
          sizeRadio.name = "size";
          sizeRadio.value = size;
          sizeRadio.classList.add("size-container1");
          const label = document.createElement("label");
          label.textContent = size;
          sizeContainer.appendChild(sizeRadio);
          sizeContainer.appendChild(label);
          label.classList.add("size-container1");
        });

      // Handle Add to Cart functionality
      const addToCartButton = document.querySelector(".add-to-cart-btn");
      const addToCartMessage = document.querySelector(".add-to-cart-message");
      addToCartButton.addEventListener("click", () => {
        const selectedColor = document.querySelector(".selected-color");
        const selectedSize = document.querySelector(
          'input[name="size"]:checked'
        );
        const selectedQuantity = document.querySelector(".quantity-selector")
          .value;
        productTitle1 = data.product.title;
        // Perform actions like adding to cart, displaying message, etc.
        addToCartMessage.textContent = `${productTitle1} Added ${selectedQuantity} ${selectedSize} ${selectedColor} to cart!`;
        addToCartMessage.classList.add("add-to-cart-message1");
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
