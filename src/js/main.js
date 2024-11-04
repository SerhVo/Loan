import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/form";

window.addEventListener("DOMContentLoaded", () => {
  // Main Slider
  try {
    const slider = new MainSlider({ btns: ".next", container: ".page" });
    slider.render();
  } catch (e) {
    // console.error("Main slider container not found");
  }

  try {
    const modulePageSlider = new MainSlider({
      btns: ".next",
      container: ".moduleapp",
    });
    modulePageSlider.render();
  } catch (e) {}

  //ShowUp Mini Slider
  try {
    const showUpSlider = new MiniSlider({
      container: ".showup__content-slider",
      prev: ".showup__prev",
      next: ".showup__next",
      activeClass: "card-active",
      animate: true,
    });

    showUpSlider.init();
  } catch (e) {
    // console.error("ShowUp mini slider container not found");
  }

  // Modules Mini Slider

  try {
    const modulesSlider = new MiniSlider({
      container: ".modules__content-slider",
      prev: ".modules__info-btns .slick-prev",
      next: ".modules__info-btns .slick-next",
      activeClass: "card-active",
      animate: true,
      autoplay: true,
    });

    modulesSlider.init();
  } catch (e) {
    console.error("Modules mini slider container not found");
  }

  // Feed Mini Slider
  try {
    const feedSlider = new MiniSlider({
      container: ".feed__slider",
      prev: ".feed__slider .slick-prev",
      next: ".feed__slider .slick-next",
      activeClass: "feed__item-active",
    });

    feedSlider.init();
  } catch (e) {}

  // Video Player
  const player = new VideoPlayer(".showup .play", ".overlay");
  if (player.overlay) {
    player.init();
  } else {
    console.error("Video player overlay not found");
  }

  // Difference
  new Difference(".officerold", ".officernew", ".officer__card-item").init();
  new Form(".form").init();
});
