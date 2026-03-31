const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

const numbers = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

const symbols = [
    "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]",
    ",", "|", ":", ";", "<", ">", ".", "?", "/"
];

let inpPwdLength = document.getElementById("numip-pwd-length");
let btnGenerate = document.getElementById("btn-generate");
let resultElements = document.getElementsByClassName("result");
let cbxNumbers = document.getElementById("cbx-numbers");
let cbxSymbols = document.getElementById("cbx-symbols");
let resultsContainer = document.getElementById("results-container");
let btnThemeSwitcher = document.getElementById("theme-switcher");

let passwordLength = 15;
let includeNumbers = false, includeSymbols = false;
let allowedCharsRangeIndex = 52;

inpPwdLength.value = passwordLength;

btnGenerate.addEventListener("click", generateRandomPassword);
inpPwdLength.addEventListener("focusout", enforceInputLimits);
cbxNumbers.addEventListener("change", () => { includeNumbers = !includeNumbers });
cbxSymbols.addEventListener("change", () => { includeSymbols = !includeSymbols });
resultsContainer.addEventListener("click", copyTextToClipboard);
btnThemeSwitcher.addEventListener("click", toggleDarkTheme);


function generateRandomPassword() {
    let characters = alphabets;
    if (includeNumbers) {
        characters = characters.concat(numbers);
    }

    if (includeSymbols) {
        characters = characters.concat(symbols);
    }

    let generatedPassword;

    for (let n = 0; n < 2; n++) {
        generatedPassword = "";

        for (let i = 0; i < passwordLength; i++) {
            let randomIndex = Math.floor(Math.random() * characters.length);
            generatedPassword += characters[randomIndex];
        }

        resultElements[n].textContent = generatedPassword;
    }
}

function enforceInputLimits() {
    if (inpPwdLength.value < 8) {
        inpPwdLength.value = 8;
    } else if (inpPwdLength.value > 24) {
        inpPwdLength.value = 24;
    }

    // get password length
    passwordLength = inpPwdLength.value;
}

let isCopying = false;

function copyTextToClipboard(event) {
    // clicking locked while copying acknowledgement ("copied!") being presented (for 1000ms)
    if (isCopying) { return };

    // engage (click) lock
    isCopying = true;

    let resultContainer = event.target.closest('.result-container');

    // CSS cooldown (visually unclickable)
    resultContainer.classList.add('is-unclickable');

    if (resultContainer !== null) {
        let originalText = resultContainer.textContent.trim();
        navigator.clipboard.writeText(originalText)
            .then(() => {
                let childSpan = resultContainer.querySelector('span');
                childSpan.textContent = "Copied!";

                setTimeout(function () {
                    childSpan.textContent = originalText;

                    resultContainer.classList.remove('is-unclickable');

                    // disengage (click) lock (after successful copying)
                    isCopying = false;
                }, 1000);
            })
            .catch((err) => {
                console.error(err.name, err.message);

                resultContainer.classList.remove('is-unclickable');

                // disengage (click) lock (in-case copying fails)
                isCopying = false;
            });
    }
}

function toggleDarkTheme(event) {
    let isDarkTheme = document.body.classList.toggle('dark-theme');
    event.currentTarget.textContent = (isDarkTheme) ? "☀️" : "🌑";
}
