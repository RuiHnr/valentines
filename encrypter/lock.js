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
const togglePwBtn = document.getElementById('toggle-password');
const errorMsg = document.getElementById('error');
const hintToggle = document.querySelector('.hint-toggle');
const hintText = document.querySelector('.hint-text');

const eyeOpen = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const eyeClosed = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22"></path><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path></svg>`;

// event listeners
document.getElementById("unlock-btn").addEventListener('click', attemptDecrypt);

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') attemptDecrypt();
});

togglePwBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';

    passwordInput.type = isPassword ? 'text' : 'password';

    togglePwBtn.innerHTML = isPassword ? eyeClosed : eyeOpen;
});

hintToggle.addEventListener('click', () => {
    const hintIndex = Math.min(Math.max(0, failCounter - 2), HINTS.length - 1);

    const isHidden = hintText.classList.toggle('hidden');
    hintToggle.innerHTML = isHidden ? HINTS[hintIndex].label : "Hide";

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

        if (!decryptedString || !decryptedString.trim().startsWith('<'))
            throw new Error("Wrong Password");

        // success
        console.log('Success! Unlocking page.');
        console.log("Decrypted String:", decryptedString.substring(0, 500));
        document.open();
        document.write(decryptedString);
        document.close();

    } catch (e) {
        console.log(e);
        handleFailure();
    }
}

function handleFailure() {
    errorMsg.classList.remove('hidden');
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
