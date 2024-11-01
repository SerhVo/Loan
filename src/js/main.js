import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";

window.addEventListener("DOMContentLoaded", () => {
  // Main Slider
  const slider = new MainSlider({ btns: ".next", container: ".page" });
  if (slider.container) {
    slider.render();
  } else {
    console.error("Main slider container not found");
  }

  //ShowUp Mini Slider
  const showUpSlider = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true,
  });
  if (showUpSlider.container) {
    showUpSlider.init();
  } else {
    console.error("ShowUp mini slider container not found");
  }

  // Modules Mini Slider
  const modulesSlider = new MiniSlider({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    animate: true,
    autoplay: true,
  });
  if (modulesSlider.container) {
    modulesSlider.init();
  } else {
    console.error("Modules mini slider container not found");
  }

  // Feed Mini Slider
  const feedSlider = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active",
  });
  if (feedSlider.container) {
    feedSlider.init();
  } else {
    console.error("Feed mini slider container not found");
  }

  // Video Player
  const player = new VideoPlayer(".showup .play", ".overlay");
  if (player.overlay) {
    player.init();
  } else {
    console.error("Video player overlay not found");
  }
});
