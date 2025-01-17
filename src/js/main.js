// src/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      // Buttons or menu options displayed on the main view
      choices: [
        {
          id: 1,
          title: 'R.S.V.P.',
          description:
            'RSVP and let us know you are coming to have fun with us on this day.'
        },
        {
          id: 2,
          title: 'Pick From The Menu',
          description:
            'If you have agreed to join us, then we agree to feed you. Here you will see what’s on offer.'
        },
        {
          id: 3,
          title: 'Upload Your Photos',
          description:
            'We encourage you to take photos, and we’d love you to share them with us! Upload them here.'
        }
      ],

      // RSVP form data
      rsvpForm: {
        isModalOpen: false,
        firstName: '',
        lastName: '',
        email: '',
        guestFirstName: '',
        guestLastName: '',
        attending: false
      },

      // Modal control
      showModalFlag: false,
      selectedChoice: {},
      modalContent: {
        image: '',
        text: '',
        message: '',
        map: null
      },

      // Page messaging
      message: "Nicki & Tony's Wedding 2025",

      // Google Maps control
      showMap: false,
      map: null
    },

    methods: {
      /**
       * Handle click on a choice button, open the modal, and optionally show a map.
       * @param {Object} choice - The choice item clicked by the user.
       */
      showModal(choice) {
        this.message = "Nicki & Tony's Wedding 2025";
        this.showModalFlag = true;
        this.selectedChoice = choice;

        // If RSVP is clicked (id=1), open the RSVP form and show map
        if (choice.id === 1) {
          this.selectedChoice.message = 'R.S.V.P. Form';
          this.selectedChoice.text = 'Please fill out the RSVP form below:';
          this.openRSVPModal();
          this.showMap = true;
          this.initGoogleMap();
        } else {
          // Hide map for other choices
          this.showMap = false;
        }
      },

      /**
       * Open the RSVP modal portion.
       */
      openRSVPModal() {
        this.rsvpForm.isModalOpen = true;
      },

      /**
       * Close the active modal and reset relevant data.
       */
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

      /**
       * Submit the RSVP form data. Replace console.log with your backend call.
       */
      submitForm() {
        const formData = {
          firstName: this.rsvpForm.firstName,
          lastName: this.rsvpForm.lastName,
          email: this.rsvpForm.email,
          guestFirstName: this.rsvpForm.guestFirstName,
          guestLastName: this.rsvpForm.guestLastName,
          attending: this.rsvpForm.attending
        };

        // Send formData to your server here
        console.log('Form submitted with data:', formData);

        // Close modal upon submission
        this.closeModal();
      },
    }
  });
});
