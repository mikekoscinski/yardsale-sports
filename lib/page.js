import { isGallery, addNavButtonListener, insertGalleryHTML, makeGalleryLive } from "./util.js";

addNavButtonListener();

if (isGallery) {
	insertGalleryHTML();
	makeGalleryLive();
}
