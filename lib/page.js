import { createNavButtonListeners, createAddToCartButtonListeners, animateGallery, animateCart } from "./util.js";

animateGallery();

animateCart();

// TODO: Can I move these into animateGallery?
createNavButtonListeners();
createAddToCartButtonListeners();
