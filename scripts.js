new Vue({
    el: '#app',
    data: {
      choices: [
        { id: 1, title: "R.S.V.P.", description: "RSVP and let us know you are coming to have fun with us on this day." },
        { id: 2, title: "Pick From The Menu", description: "If you have agreed to join us, then we agree to feed you if you are coming for the evening or the whole day here you will see whats on offer." },
        { id: 3, title: "Upload Your Photos", description: "We actively encourage you to take photo's but we would really like you to share them with us soo... upload them here please." }
      ],
      rsvpform: {
        isModalOpen: false,
        firstName: '',
        lastName: '',
        email: '',
        guestFirstName: '',
        guestLastName: '',
        attending: false
      },
      showModalFlag: false,
      selectedchoicesItem: {},
      modalContent: {
        image: '',
        text: '',
        message: '',
        map: null
      },
      message: "Nicki & Tony's Wedding 2025",
      showMap: false, // Added property to control map visibility
      map: null // Added property to hold Google Map instance
    },
    methods: {
      showModal(choicesItem) {
        this.message = "Nicki & Tony's Wedding 2025";
        this.showModalFlag = true;
        this.selectedchoicesItem = choicesItem;
        
        // Check if the selected item requires a map
        if (this.selectedchoicesItem.id === 1) {
          this.selectedchoicesItem.message = 'R.S.V.P. Form';
          this.selectedchoicesItem.text = 'Please fill out the RSVP form below:';
          this.openRSVPModal();
          this.showMap = true; // Show the map when RSVP button is clicked
          this.initGoogleMap(); // Initialize Google Map
        } else {
          this.showMap = false; // Hide map for other choices
        }
      },
      openRSVPModal() {
        this.rsvpform.isModalOpen = true;
      },
      closeModal() {
        this.message = "Nicki & Tony's Wedding 2025";    
        this.showModalFlag = false;
        this.modalContent = {
          image: '',
          text: '',
          message: '',
          map: null
        };
        this.showMap = false; // Ensure map is hidden when modal is closed
      },
      submitForm() {
        // Send form data to backend for processing
        const formData = {                
          firstName: this.rsvpform.firstName,
          lastName: this.rsvpform.lastName,
          Email: this.rsvpform.email,
          guestFirstName: this.rsvpform.guestFirstName,
          guestLastName: this.rsvpform.guestLastName,
          attending: this.rsvpform.attending
        };
        // Here you would make an AJAX request to your backend to store the data in a database
        console.log('Form submitted with data:', formData);
        // After successful submission, close the modal
        this.closeModal();
      },
      initGoogleMap() {
        // Initialize Google Map
        if (!this.map) {
          this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 50.7193677, lng: -1.8683981 }, 
            zoom: 10,
          });
        }
      }
    }
  });
  