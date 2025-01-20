document.addEventListener('DOMContentLoaded', function() {
  // Vue.js initialization
  const app = new Vue({
  el: '#app',
  data() {
    return {
    images: [
      '../../public/images/us01.jpg',
      '../../public/images/us02.jpg',
      '../../public/images/us03.jpg',
      '../../public/images/us04.jpg',
      '../../public/images/us05.jpg',
      '../../public/images/us06.jpg',
      '../../public/images/us07.jpg',
      '../../public/images/us08.jpg',
      '../../public/images/us09.jpg',
      '../../public/images/us10.jpg'
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

