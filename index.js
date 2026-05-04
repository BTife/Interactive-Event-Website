/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Query for the submit RSVP button
let submitButton = document.getElementById("submit-rsvp");

// RSVP count starts at 3
let count = 3;

const addParticipant = (person) => {

    /***let name = document.getElementById("name").value;
    let interest = document.getElementById("interest").value; ***/

    // Create new participant
    let newParticipant = document.createElement("p");

    newParticipant.textContent =
        "☁️ " + person.name + ", interested in " + person.interest + ", has RSVP'd.";

    let participantsDiv = document.querySelector(".participants");

    // Add participant first
    participantsDiv.appendChild(newParticipant);

    // Remove old count
    let oldCount = document.getElementById("rsvp-count");
    oldCount.remove();

    // Increase count
    count = count + 1;

    // Create new count
    let newCount = document.createElement("p");
    newCount.id = "rsvp-count";
    newCount.textContent =
        "⭐ " + count + " people have RSVP'd to this event!";

    // Add count to bottom
    participantsDiv.appendChild(newCount);
};
// Step 3: Add click event listener
//submitButton.addEventListener("click", addParticipant);

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
    event.preventDefault();

    let containsErrors = false;
    let rsvpInputs = document.getElementById("rsvp-form").elements;

    let person = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    interest: document.getElementById("interest").value
    };
    // Check all inputs
    for (let i = 0; i < rsvpInputs.length; i++) {

        if (rsvpInputs[i].type === "submit") {
            continue;
        }

        if (rsvpInputs[i].value.length < 2) {
            containsErrors = true;
            rsvpInputs[i].classList.add("error");
        } else {
            rsvpInputs[i].classList.remove("error");
        }
    }

    // Email validation
    let email = document.getElementById("email");

    if (!email.value.includes("@")) {
        containsErrors = true;
        email.classList.add("error");
    } else {
        email.classList.remove("error");
    }

    // If no errors
    if (containsErrors == false) {
        addParticipant(person);
        toggleModal(person);

        for (let i = 0; i < rsvpInputs.length; i++) {
            if (rsvpInputs[i].type !== "submit") {
                rsvpInputs[i].value = "";
            }
        }
    }
};

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
submitButton.addEventListener("click", validateForm);

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
    let modal = document.getElementById("success-modal");
    let modalContent = document.getElementById("modal-text");
    let closeButton = document.getElementById("close-modal");

    modal.style.display = "flex";

    // Personalized message
    modalContent.textContent =
        "Thanks for RSVPing, " + person.name + "! We can't wait to see you at the bootcamp!";

    let intervalId = setInterval(animateImage, 500);

    // Hide after 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 5000);
};
const closeModal = () => {
    let modal = document.getElementById("success-modal");
    modal.style.display = "none";
};

// TODO: animation variables and animateImage() function
let rotateFactor = 0;
let modalImage = document.querySelector(".modal-item img");

const animateImage = () => {
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }

    modalImage.style.transform = "rotate(" + rotateFactor + "deg)";
};
let closeButton = document.getElementById("close-modal");
closeButton.addEventListener("click", closeModal);
