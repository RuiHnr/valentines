// lock.js

const HINTS = [
    { label: "Need a hint?", text: "It's a date" },
    { label: "Still stuck?", text: "The format is DDMMYYYY, e.g. 01012026" },
    { label: "Final clue",  text: "You really need another hint?! It's between our birthdays" }
];

// state
let failCounter = 0;

/* elements */
const passwordInput = document.getElementById('passwordInput');
const errorMsg = document.getElementById('error');
const hintToggle = document.querySelector('.hint-toggle');
const hintText = document.querySelector('.hint-text');

// event listeners
document.getElementById("unlock-btn").addEventListener('click', attemptDecrypt);

document.getElementById("passwordInput").addEventListener('keypress', (e) => {
    if (e.key === 'Enter') attemptDecrypt();
});

hintToggle.addEventListener('click', () => {
    const hintIndex = Math.min(Math.max(0, failCounter - 2), HINTS.length - 1);

    const isHidden = hintText.classList.toggle('hidden');
    toggle.innerHTML = isHidden ? HINTS[hintIndex].label : "Hide";

});

function attemptDecrypt() {
    const encryptedData = window.ENCRYPTED_BLOB;
    const password = passwordInput.value;

    if (!encryptedData || encryptedData === '__ENCRYPTED_PAYLOAD__') {
        alert("Error: No encrypted data found.");
        return;
    }

    try {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, password);
        const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedString) throw new Error("Wrong Password");

        // success
        document.open();
        document.write(decryptedString);
        document.close();

    } catch (e) {
        handleFailure();
    }
}

function handleFailure() {
    errorMsg.style.display = 'block';
    console.log("Decryption failed");

    passwordInput.value = '';
    passwordInput.focus();

    failCounter++;

    // update hint logic
    const hintIndex = failCounter - 2;

    if (hintIndex >= 0 && hintIndex < HINTS.length) {
        // reveal the hint button if its the first time
        hintToggle.classList.remove('hidden');

        // update text immediately
        hintText.innerHTML = HINTS[hintIndex].text;

        // reset UI state: hide text, show new label

        // change and hide text
        hintText.classList.add('hidden');
        hintToggle.innerHTML = HINTS[hintIndex].label;

        // optional: shake animation
        hintToggle.style.animation = 'none';
        void hintToggle.offsetWidth; // trigger reflow
        hintToggle.style.animation = 'shake 0.5s';
    }
    else if (hintIndex >= HINTS.length) {
        hintToggle.classList.add('hidden');
        hintText.classList.add('hidden');
    }
}
