new Vue({
  el: '#app',
  data: {
    message: "Nicki & Tony's Wedding 2025",
    isModalOpen: false,
    modalContent: {
      image: '',
      text: '',
      message: '',
	  map: null
    }
  },
  methods: {
    openModal(type) {
      this.message = "Nicki & Tony's Wedding 2025";
      this.isModalOpen = true;
      // Set modal content based on the type
      switch (type) {
        case 'rsvp':
		  //this.message = "Once Upon a Time";
          this.modalContent.message = 'Coming Soon';
          this.modalContent.image = 'penguin.png';
          this.modalContent.text = 'Sorry this link is still defrosting and will be with you soon';
          break;
        case 'location':
		  //this.message = "There was a Nickiness";
		  this.modalContent.message = 'Our Wedding will be held at <a href="https://www.thegreenhousehotel.co.uk/">The Green House Hotel</a> Bournemouth';
		  // Load the map when the location modal is opened
          this.$nextTick(() => {
            this.loadMap();
          });
          this.modalContent.image = 'parking.jpg';
          this.modalContent.text = 'Additional parking can be found highlighted on the image below';
          break;
        case 'menus':
		  //this.message = "And she met her Tonio";
          this.modalContent.message = 'Coming soon';
          this.modalContent.image = 'penguin.png';
          this.modalContent.text = 'Sorry this link is still defrosting and will be with you soon';
          break;
        case 'upload':
		  //this.message = "There were lots of ups and downs";
          this.modalContent.message = 'Coming Soon';
          this.modalContent.image = 'penguin.png';
          this.modalContent.text = 'Sorry this link is still defrosting and will be with you soon';
          break;
        case 'order':
		  //this.message = "but adventurely they fell deeply in love";
          this.modalContent.message = 'coming soon';
          this.modalContent.image = 'penguin.png';
          this.modalContent.text = 'Sorry this link is still defrosting and will be with you soon';
          break;
        case 'about':
		  //this.message = "And now they are getting married";
          this.modalContent.message = 'Nicki & Tony';
		  //this.loadTxtFile('About.txt');
          this.modalContent.paragraph = `
										<p>Tony had returned to Bournemouth from London.</p> 

										<p>Nicki had returned to Dorchester from Northumberland.</p>  

										<p>Both were attempting to rebuild themselves, after previously failed relationships and financial woes.</p> 

										<p>Tony the awkward geek and Nicki the liberal homebody.</p>  

										<p>There would really never have been a good reason for the two to meet.</p> 

										<p>However, the world of Internet dating, meant Tony came across Nicki one evening and enticed her with his wit and charm!</p>

										<p>There it began, something neither one ever predicted would result in much.</p>

										<p>Tony and Nicki met on the 8th June 2014....a date in Bournemouth, where a spark was ignited.</p> 

										<p>Now these 2 could not be more different.......Tony a factually based, black and white kind of guy, with a love for music, film and all things geeky.....and Nicki a morally righteous kind of girl, with a love for reality TV and tik tok.</p>

										<p>Both had commitment fears, character flaws and had made several previous unwise life decisions. So neither really had much to offer.</p>
										 
										<p>Yet despite this, something special started between them.</p>

										<p>Many may judge that Nicki is spoiled and Tony is soft. Actually there is a lot of mutual respect and support for each other. Some important aligned core values, such as compassion and trust, and so much laughter.</p>

										<p>Their differences have worked well at times. Nicki introduced Tony into a world of Christmas decorations and ethical debates and Tony supported Nicki's exploration of new foods and introduced her to Game of Thrones, which she will forever be grateful for.</p>

										<p>There remain many differences, Tony refuses to engage in Big Brother and Nicki declines anything with anime in it!</p>

										<p>This is maybe what makes it work, they are still two different people, but they have built a home and life together, that is unique to them.</p>

										<p>Certainly neither would say that there hasn't been some ups and downs along the way, and nearly 10 years down the line, their lives have both changed considerably.</p>

										<p>Both have progressed in their careers. They are both saving hard for their own house and in truth life is comfortable.</p>

										<p>What is more is rather than growing apart, they have grown together. They have supported each other's personal growth but those similar core values have remained and their life goals have become united.</p>

										<p>It is this that has resulted in Nicki and Tony deciding to make their relationship official and tie the knot, on the 13th December 2025.</p>
										`;
          //this.modalContent.image = 'us2.jpg';
		  break;
        default:
          // Default case
		  this.message = "how on earth have you hit default";	
          this.modalContent.message = 'Default Modal';
          this.modalContent.image = 'penguin.png';
          this.modalContent.text = 'Default text for the modal';
      }
    },
    closeModal() {
	  this.message = "Nicki & Tony's Wedding 2025";	
      this.isModalOpen = false;
      this.modalContent = {
        image: '',
        text: '',
        message: '',
        map: null
      };
    },
	  loadMap() {
      // Initialize the map
      const mapOptions = {
        center: { lat: 50.7193677, lng: -1.8683981 }, // GreenHouse Hotel
        zoom: 18,
      };
      this.modalContent.map = new window.google.maps.Map(document.getElementById('modal-map'), mapOptions);
      // Add a marker
      const marker = new window.google.maps.Marker({
        position: mapOptions.center,
        map: this.modalContent.map,
        title: 'Wedding Location'
      });
	  },
	 formatTextWithBulletPoints(text) {
      // Assuming text is a string with newline-separated bullet points
      const bulletPoints = text.split('\n').filter(point => point.trim() !== '');
      return `<ul>${bulletPoints.map(point => `<li>${point}</li>`).join('')}</ul>`;
	 },
	 loadTxtFile(fileName) {
       fetch(fileName)
          .then(response => response.text())
          .then(data => {
            // Parse the text content as HTML
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            // Set the HTML content
            this.modalContent.paragraph = htmlDoc.body.innerHTML;
          })
          .catch(error => {
            console.error('Error loading text file:', error);
            this.modalContent.paragraph = 'Failed to load the content.';
          });
	  }
  }
});



