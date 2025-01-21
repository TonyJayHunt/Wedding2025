new Vue({
  el: '#app',
  data() {
    return {
      // "choices" each with its own unlockDate
      choices: [
        {
          id: 1,
          title: "Invitation and RSVP",
          description: "",
          unlockDate: "2025-06-01"
        },
        {
          id: 2,
          title: "Important Information",
          description: "",
          unlockDate: "2025-01-18"
        },
        {
          id: 3,
          title: "Upload Your Photos",
          description: "",
          unlockDate: "2025-06-01"
        }
      ],
      // RSVP form data
      rsvpform: {
        isModalOpen: false,
        code: ''
      },
      // Modal control
      showModalFlag: false,
      selectedchoicesItem: {},
      // Additional modal content
      modalContent: {
        image: '',
        text: '',
        message: '',
        map: null
      },
      message: "Nicki & Tony's Wedding 2025",
      showMap: false,  // used if we need a map displayed in modal
      map: null,

      // Invite code logic
      inviteMessage: "",
      inviteLink: "",
      showInviteResult: false,
      buttontext: "",

      // Fetched from Google Sheets
      orderOfTheDay: [],

      // Date controlling the Honeymoon Fund link
      honeymoonUnlockDate: "2025-08-01"
    };
  },

  computed: {
    /**
     * Returns only choices that are unlocked by today's date.
     */
    filteredChoices() {
      const now = new Date();
      return this.choices.filter(choice => {
        if (!choice.unlockDate) return true;
        const unlock = new Date(choice.unlockDate);
        return now >= unlock;
      });
    },

    /**
     * Determines if the Honeymoon Fund link is visible in the navbar.
     */
    isHoneymoonUnlocked() {
      const now = new Date();
      const unlock = new Date(this.honeymoonUnlockDate);
      return now >= unlock;
    }
  },

  created() {
    this.fetchSheetData();
  },

  methods: {
    /**
     * Parses a gviz/tq date string like "Date(2025,3,1,12,0,0)" into "12:00 PM" etc.
     */
    parseGvizDate(dateStr) {
      if (typeof dateStr === 'string' && dateStr.startsWith('Date(')) {
        const match = /Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/.exec(dateStr);
        if (match) {
          const [, year, month, day, hour, minute, second] = match.map(Number);
          const dateObj = new Date(year, month, day, hour, minute, second);
          return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
      }
      return dateStr;
    },

    /**
     * Opens Google Maps at The Green House Hotel.
     */
    goToGreenHouseHotel() {
      const lat = 50.7193677;
      const lng = -1.8683981;
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    },

    /**
     * Fetch "Order of the Day" data from a public Google Sheet using the gviz/tq endpoint.
     */
    fetchSheetData() {
      const sheetUrl =
        'https://docs.google.com/spreadsheets/d/1H6-RA-PLdJ3y0rQHHhwRamgSseAr4wIMzVTbRT40WiY/gviz/tq?sheet=<Timeline>';

      fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
          const jsonData = JSON.parse(data.substr(47).slice(0, -2));
          const rows = jsonData.table.rows;
          const result = rows.map(row => {
            const rawTime = row.c[0]?.v || '';
            return {
              time: this.parseGvizDate(rawTime),
              activity: row.c[1]?.v || ''
            };
          });
          this.orderOfTheDay = result;
        })
        .catch(err => {
          console.error('Error fetching Google Sheet data:', err);
        });
    },

    /**
     * Open the modal for a given choice.
     */
    showModal(choice) {
      this.showModalFlag = true;
      this.selectedchoicesItem = choice;
      this.message = "Nicki & Tony's Wedding 2025";

      // If RSVP is chosen (id=1), open RSVP form in the modal
      if (choice.id === 1) {
        this.selectedchoicesItem.message = 'Invite & RSVP';
        this.selectedchoicesItem.text = 'Please enter your code:';
        this.openRSVPModal();
        this.showMap = true;
      } else {
        this.showMap = false;
      }

      // Reset code & invite details each time modal opens
      this.rsvpform.code = "";
      this.inviteMessage = "";
      this.inviteLink = "";
      this.showInviteResult = false;
      this.buttontext = "";
    },

    openRSVPModal() {
      this.rsvpform.isModalOpen = true;
    },

    /**
     * Closes the currently open modal and resets relevant data.
     */
    closeModal() {
      this.showModalFlag = false;
      this.rsvpform.isModalOpen = false;
      this.selectedchoicesItem = {};
      this.modalContent = { image: '', text: '', message: '', map: null };
      this.message = "Nicki & Tony's Wedding 2025";
      this.showMap = false;
    },

    /**
     * Handles RSVP code submission (e.g., day vs evening invite).
     */
    submitForm() {
      const codeValue = this.rsvpform.code.trim().toLowerCase();

      if (codeValue === "j0u?") {
        // Day invite
        this.inviteMessage = `Nicki and Tony are delighted to invite you to celebrate their wedding day with them:

Date: 13th December 2025
Venue: The Green House Hotel - address
Start Time: Guest Arrival 12.30pm (for 1pm Ceremony)
Finishing Time: Midnight
`;
        this.inviteLink = "./pages/dayinvite.html"; // Link to your day invite form/page
        this.showInviteResult = true;
        this.buttontext = "Click Here To RSVP & Make Menu Choices";
      } else if (codeValue === "n0ch£") {
        // Evening invite
        this.inviteMessage = `Nicki and Tony are delighted to invite you to celebrate the Evening Reception of their wedding day with them:

Date: 13th December 2025
Venue: The Green House Hotel - address
Start Time: Guest Arrival 7pm
Finishing Time: Midnight
`;
        this.inviteLink = "./pages/eveninginvite.html"; // Link to your evening invite form/page
        this.showInviteResult = true;
        this.buttontext = "Click Here To RSVP";
      } else {
        alert("Invalid code. Please try again.");
      }
    },

    /**
     * Opens the inviteLink in a new tab, then closes the modal.
     */
    goToInviteLink() {
      window.open(this.inviteLink, '_blank');
      this.closeModal();
    }
  }
});
