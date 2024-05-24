function zoomImage() {
  var img = document.getElementById("zoomable-image");
  img.classList.toggle("zoomed");
}

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");

  let scrollWidth = imageList.scrollWidth - imageList.clientWidth;
  let isDragging = false;
  let startX;
  let scrollLeft;
  let imgPadding = 36;

  slideButtons.forEach((btn) => {
    btn.style.display = "flex";
  });

  const handleScroll = () => {
    const scrollLeft = imageList.scrollLeft;
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const thumbWidth =
      (imageList.clientWidth / imageList.scrollWidth) * imageList.clientWidth;
    scrollbarThumb.style.width = `${thumbWidth}px`;
    scrollbarThumb.style.transform = `translateX(${
      (scrollLeft / maxScrollLeft) * (imageList.clientWidth - thumbWidth)
    }px)`;
    slideButtons[0].style.display = scrollLeft > 0 ? "flex" : "none";
    slideButtons[1].style.display =
      scrollLeft < maxScrollLeft ? "flex" : "none";
  };

  const handleButtonClick = (direction) => {
    const slideWidth =
      imageList.querySelector(".image-item").clientWidth + imgPadding;
    imageList.scrollBy({
      left: direction === "next" ? slideWidth : -slideWidth,
      behavior: "smooth",
    });
  };

  const handleDragStart = (e) => {
    isDragging = true;
    startX = e.pageX - imageList.offsetLeft;
    scrollLeft = imageList.scrollLeft;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - imageList.offsetLeft;
    const walk = (x - startX) * 2;
    imageList.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    isDragging = false;
  };

  const handleThumbMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - scrollbarThumb.offsetLeft;
    scrollLeft = scrollbarThumb.offsetLeft;
    document.body.style.userSelect = "none";
  };

  const handleThumbMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - startX;
    const maxScrollLeft = imageList.clientWidth - scrollbarThumb.clientWidth;
    const scrollRatio = x / maxScrollLeft;
    imageList.scrollLeft = scrollRatio * scrollWidth;
  };

  const handleThumbMouseUp = () => {
    isDragging = false;
    document.body.style.userSelect = "";
  };

  slideButtons[0].addEventListener("click", () => handleButtonClick("prev"));
  slideButtons[1].addEventListener("click", () => handleButtonClick("next"));
  imageList.addEventListener("scroll", handleScroll);
  imageList.addEventListener("mousedown", handleDragStart);
  imageList.addEventListener("mousemove", handleDragMove);
  imageList.addEventListener("mouseup", handleDragEnd);
  imageList.addEventListener("mouseleave", handleDragEnd);
  scrollbarThumb.addEventListener("mousedown", handleThumbMouseDown);
  document.addEventListener("mousemove", handleThumbMouseMove);
  document.addEventListener("mouseup", handleThumbMouseUp);

  handleScroll();
};

window.addEventListener("load", initSlider);
