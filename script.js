const lengthSlider = document.querySelector(".lengthSlider input");
const options = document.querySelectorAll(".option input");
const optionsArr = Array.from(options);
const copyText = document.querySelector(".passwordInput span");
const passLengthCounter = document.querySelector(".lengthSlider span");
const passwordInput = document.querySelector(".passwordInput input");
const passIndicator = document.querySelector(".passIndicator");
const generateBtn = document.querySelector(".generateBtn");


// object of letters, numbers & symbols
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excludeDuplicate = false;
    let passLength = lengthSlider.value;

    optionsArr.map((option) => {
        if (option.checked) {
            if (option.id !== "excDuplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += ` ${staticPassword} `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            if (!randomPassword.includes(randomChar) || randomChar == " ") {
                randomPassword += randomChar;
            } else {
                i--
            }
        } else {
            randomPassword += randomChar;
        };
    };

    // passing randomPassword to passwordInput value
    passwordInput.value = randomPassword;
};

// update password Indicator
const upadatePassIndicator = () => {
    if (lengthSlider.value <= 8) {
        passIndicator.id = "weak"
    } else if (lengthSlider.value <= 16) {
        passIndicator.id = "medium"
    } else {
        passIndicator.id = "strong"
    }
}


// passing slider value as counter text and initial calling of generatePassword and upadatePassIndicator function
const updateSlider = () => {
    passLengthCounter.innerText = lengthSlider.value;
    upadatePassIndicator();
    generatePassword();
}
updateSlider();


const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); // copying random password

    // changing copy text to copied
    copyText.innerText = "Copied";
    copyText.style.color = "#4285F4";

    // after 1500 ms, changing Copied text back to copy
    setTimeout(() => {
        copyText.innerText = "Copy";
        copyText.style.color = "#707070";
    }, 1500);
}

copyText.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);