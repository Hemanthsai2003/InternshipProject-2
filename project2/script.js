let currentIndex = 0;
let autoSlideInterval;

const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const thumbnails = document.querySelectorAll('.thumbnails img');
const caption = document.querySelector('.caption');

function updateSlider(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  
    thumbnails.forEach((thumbnail, i) => {
      thumbnail.classList.toggle('active', i === index);
    });
  
    const activeSlide = slides[index];
    if (caption) {
      caption.textContent = activeSlide.dataset.caption;
      caption.classList.add('visible');
    }
}

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider(currentIndex);
}

function showPrevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider(currentIndex);
}



function handleThumbnailClick(event) {
  currentIndex = parseInt(event.target.dataset.index, 10);
  updateSlider(currentIndex);
  resetAutoSlide();
}

function handleTouchSwipe(startX, endX) {
  const threshold = 50; // Minimum distance for a swipe
  if (startX - endX > threshold) {
    showNextSlide();
  } else if (endX - startX > threshold) {
    showPrevSlide();
  }
  resetAutoSlide();
}

// Event Listeners
nextButton.addEventListener('click', () => {
  showNextSlide();
  resetAutoSlide();
});

prevButton.addEventListener('click', () => {
  showPrevSlide();
  resetAutoSlide();
});

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', handleThumbnailClick);
});

// Touch Events for Swipe
let touchStartX = 0;
let touchEndX = 0;

if ('ontouchstart' in window || navigator.maxTouchPoints) {
  slides.forEach(slide => {
    slide.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slide.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleTouchSwipe(touchStartX, touchEndX);
    });
  });
}

// Initialize
updateSlider(currentIndex);
