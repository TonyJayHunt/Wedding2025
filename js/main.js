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
          unlockDate: "2025-03-19"
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
          unlockDate: "2025-06-10"
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
      menuOpen: false,
      // Invite code logic
      inviteMessage: "",
      inviteLink: "",
      showInviteResult: false,
      buttontext: "",
      orderOfTheDay: [],
      currentImage: undefined,

      // Date controlling the Honeymoon Fund link
      honeymoonUnlockDate: "2025-03-01"
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
    prevImage() { /* placeholder to silence Vue warn */ },
    nextImage() { /* placeholder */ },
    /**
     * Fetch "Order of the Day" data from a public Google Sheet using the gviz/tq endpoint.
     */
    fetchSheetData() {
      const sheetUrl =
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2-oR8lC1tQV_Sp6mIADNqBnN5sdI6Th_kBEjDTysxgJ9x0NwnIiu48JZ2Xnfs4pAagPulWBSHnww1/pub?gid=0&single=true&output=csv';

      fetch(sheetUrl)
        .then(response => response.text())
        .then(csvData => {
          // Split the CSV into lines
          const lines = csvData.trim().split('\n');

          // Optional: if the first line is a header, remove it
          // e.g. if header is "time,activity"
          lines.shift();

          // Now parse each line
          const result = lines.map(line => {
            // Split columns by comma
            const [timeValue, activityValue] = line.split(',');

            // If you *still* need to parse a Date(...) string,
            // you can call your parseGvizDate function. Otherwise,
            // you can just store the raw string.

            return {
              time: timeValue,      // or: time: this.parseGvizDate(timeValue)
              activity: activityValue
            };
          });

          // Assign to your component data
          this.orderOfTheDay = result;
        })
        .catch(err => {
          console.error('Error fetching Google Sheet data:', err);
        });
    },
    /*─────────────────────────────────────────────┐
    │  goToGreenHouseHotel                        │
    │  Opens Google Maps centred on the hotel.    │
    └─────────────────────────────────────────────*/
    goToGreenHouseHotel() {
      window.open(
        'https://www.google.com/maps/search/?api=1&query=50.7193677,-1.8683981',
        '_blank'
      );
    },
    /*─────────────────────────────────────────────┐
  │  formatTime                                 │
  │  Converts 'HH:MM:SS' → 'h:MM am/pm'         │
  └─────────────────────────────────────────────*/
    formatTime(t) {
      if (!t) return t;
      const [hh, mm] = t.split(':');
      let h = parseInt(hh, 10);
      const ampm = h >= 12 ? 'pm' : 'am';
      h = h % 12 || 12;
      return `${h}:${mm} ${ampm}`;
    },

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
      }

      // Reset code & invite details each time modal opens
      this.rsvpform.code = "";
      this.inviteMessage = "";
      this.inviteLink = "";
      this.showInviteResult = false;
      this.buttontext = "";
    },

    /**
     * Handles RSVP code submission (e.g., day vs evening invite).
     */
    submitForm() {
      const codeValue = this.rsvpform.code.trim().toLowerCase();

      if (codeValue === "j0u?") {
        this.inviteMessage = `Nicki and Tony are delighted to invite you and a guest to their wedding day.`;
        this.inviteLink = "https://forms.gle/m8EH99vdze6rRAZp6";
        this.showInviteResult = true;
        this.buttontext = "Click Here To RSVP & Make Menu Choices";
      } else if (codeValue === "n0ch£") {
        this.inviteMessage = `Nicki and Tony are delighted to invite you and a guest to their evening reception.`;
        this.inviteLink = "https://forms.gle/PiYArfnSjdbsec5j9";
        this.showInviteResult = true;
        this.buttontext = "Click Here To RSVP";
      } else if (codeValue === "d1wrnodpr!od@ss3ngl") {
        this.inviteMessage = `Nicki and Tony are delighted to invite you to their wedding day.`;
        this.inviteLink = "https://forms.gle/DunbW6q3PdgfFvai8";
        this.showInviteResult = true;
        this.buttontext = "Click Here To RSVP";
      } else if (codeValue === "n0s0nbr!od@ss3ngl") {
        this.inviteMessage = `Nicki and Tony are delighted to invite you to their evening reception.`;
        this.inviteLink = "https://forms.gle/9tK2kMG1rV4Tf6WP8";
        this.showInviteResult = true;
        this.buttontext = "Click Here To RSVP";
      } else {
        alert("Invalid code. Please try again.");
      }
    },

    goToInviteLink() {
      window.open(this.inviteLink, '_blank');
      this.closeModal();
    },

    closeModal() {
      this.showModalFlag = false;
    }
  }
});
