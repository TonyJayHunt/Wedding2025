new Vue({
  el: '#app',
  data() {
    return {
      choices: [
        {
          id: 1,
          title: "Invitation and RSVP",
          description: "",
          unlockDate: "2024-12-01"
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
          unlockDate: "2024-12-01"
        }
      ],
      rsvpform: {
        isModalOpen: false,
        code: ''
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
      showMap: false,
      map: null,

      // For invite code logic
      inviteMessage: "",
      inviteLink: "",
      showInviteResult: false,
      buttontext: "", // Added so we can set custom button text

      // Array from Google Sheets
      orderOfTheDay: [],

      // NEW: unlock date for Honeymoon Fund
      honeymoonUnlockDate: "2025-01-01"
    };
  },

  computed: {
    /**
     * Return only the choices that are "unlocked" by today's date.
     * Each choice has its own "unlockDate".
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
     * Determines if the Honeymoon Fund link in the nav should be visible.
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

    goToGreenHouseHotel() {
      window.open("http://www.thegreenhousehotel.com/", "_blank");
    },

    fetchSheetData() {
      const sheetUrl = 'https://docs.google.com/spreadsheets/d/1H6-RA-PLdJ3y0rQHHhwRamgSseAr4wIMzVTbRT40WiY/gviz/tq?sheet=<Timeline>';

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

    showModal(choice) {
      this.showModalFlag = true;
      this.selectedchoicesItem = choice;
      this.message = "Nicki & Tony's Wedding 2025";

      // If RSVP choice, open the RSVP form
      if (choice.id === 1) {
        this.selectedchoicesItem.message = 'Invite & RSVP';
        this.selectedchoicesItem.text = 'Please enter your code:';
        this.openRSVPModal();
        this.showMap = true;
      } else {
        this.showMap = false;
      }

      // Reset code + invite message each time the modal opens
      this.rsvpform.code = "";
      this.inviteMessage = "";
      this.inviteLink = "";
      this.showInviteResult = false;
      this.buttontext = "";
    },

    openRSVPModal() {
      this.rsvpform.isModalOpen = true;
    },

    closeModal() {
      this.showModalFlag = false;
      this.rsvpform.isModalOpen = false;
      this.selectedchoicesItem = {};
      this.modalContent = { image: '', text: '', message: '', map: null };
      this.message = "Nicki & Tony's Wedding 2025";
      this.showMap = false;
    },

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
        this.inviteLink = "./pages/dayinvite.html";
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
        this.inviteLink = "./pages/eveninginvite.html";
        this.showInviteResult = true;
        this.buttontext = "Click Here To RSVP";
      } else {
        alert("Invalid code. Please try again.");
      }
    },

    goToInviteLink() {
      window.open(this.inviteLink, '_blank');
      this.closeModal();
    }
  }
});
