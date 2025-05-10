document.addEventListener('DOMContentLoaded', function() {
  // Vue.js initialization
  const app = new Vue({
  el: '#app',
  data() {
    return {
    images: [
      '../../public/images/us/us12.jpg',
      '../../public/images/us/us21.jpg',
      '../../public/images/us/us01.jpg',
      '../../public/images/us/us02.jpg',
      '../../public/images/us/us03.jpg',
      '../../public/images/us/us04.jpg',
      '../../public/images/us/us05.jpg',
      '../../public/images/us/us06.jpg',
      '../../public/images/us/us07.jpg',
      '../../public/images/us/us08.jpg',
      '../../public/images/us/us09.jpg',
      '../../public/images/us/us10.jpg',
      '../../public/images/us/us11.jpg',
      '../../public/images/us/us13.jpg',
      '../../public/images/us/us14.jpg',
      '../../public/images/us/us15.jpg',
      '../../public/images/us/us16.jpg',
      '../../public/images/us/us17.jpg',
      '../../public/images/us/us18.jpg',
      '../../public/images/us/us19.jpg',
      '../../public/images/us/us20.jpg'      
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

