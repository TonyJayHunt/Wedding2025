document.addEventListener('DOMContentLoaded', function() {
  // Vue.js initialization
  const app = new Vue({
  el: '#app',
  data() {
    return {
    images: [
      'emblem.png',
      'parking.jpg',
      'penguin.png',
      'us2.jpg'
    ],
    currentImage: 0
    };
  },
  methods: {
    nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
    },
    prevImage() {
    this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
    }
  }
  });
})

