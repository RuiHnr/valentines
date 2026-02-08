import '../styles/screens/final.css';
import { showScreen } from '../utils/navigation';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let closeTimeout: number | undefined;

let envelope: HTMLElement | null = null;
let letter: HTMLElement | null = null;
let letterContent: HTMLElement | null = null;
let arrow: HTMLElement | null = null;
let track: HTMLElement | null = null;
let scrollWindow: HTMLElement | null = null;
let slideTop: HTMLElement | null = null;

export function initFinal() {
    arrow = document.getElementById('scroll-arrow');
    track = document.getElementById('slider-track');
    scrollWindow = document.getElementById('slider-window');
    slideTop = document.getElementById('slide-top')
    envelope = document.getElementById('envelope');
    letterContent = document.getElementById('letter-content');
    letter = document.getElementById('letter');

    // logic for scrolling
    if (arrow && track) {
        arrow.addEventListener('click', () => {
            if (envelope?.classList.contains('open')) {
                toggleEnvelope();
            }

            track?.classList.toggle('scrolled');
            arrow?.classList.toggle('rotate-up');
        })
    }

    // logic for opening letter
    if (envelope) {
        envelope.addEventListener('click', () => toggleEnvelope());
    }
}

export function startFinalLoading(optionId: string) {
    showScreen('final-screen');

    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('loading-text');
    const subtext = document.getElementById('loading-subtext');
    const loadContainer = document.getElementById('loading-container');
    const successContainer = document.getElementById('success-container');

    loadLetter(optionId);

    if (!bar || !text || !subtext || !loadContainer || !successContainer) return;

    // reset state
    loadContainer.classList.remove('hidden');
    successContainer.classList.add('hidden');
    arrow?.classList.add('hidden');
    bar.style.width = '0%';
    text.textContent = "Das Date wird vorbereitet...";

    // loading sequence
    (async () => {

        // 1. start: fast to 10%
        await wait(900);
        bar.style.width = '10%';
        text.textContent = 'Checke Kalender...';

        // 2. jump to 40%
        await wait(1200);
        bar.style.width = '45%';
        text.textContent = 'Checke Geldbeutel...';
        subtext.textContent = "sieht bissl knapp aus";

        // 3. longer pause, then jump to 80%
        await wait(1400);
        bar.style.width = '80%';
        subtext.textContent = 'Fast fertig...';

        // 4. the last bit
        await wait(1300);

        bar.style.width = '100%';
        text.textContent = 'Fertig!';

        // short pause at 100%
        await wait(500);


        // switch to success
        loadContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');

        if (arrow) {
            arrow.classList.remove('hidden');
        }

        // load letter text
    })();
}

function toggleEnvelope() {
    const isClosed = envelope?.classList.toggle('open');
    letter?.classList.toggle('hidden');

    if (!isClosed) {
        // closing the letter, need to wait before hiding overflow
        closeTimeout = setTimeout(() => {
            slideTop?.classList.remove('invisible');
            scrollWindow?.classList.remove('allow-overflow');
        }, 800);
    } else {
        if (closeTimeout) clearTimeout(closeTimeout);
        // to allow the letter to overflow the scroll window, the top slider has to be invisible
        slideTop?.classList.add('invisible');
        scrollWindow?.classList.add('allow-overflow');
    }
}

function loadLetter(optionId: string) {
    let location;
    switch (optionId) {
        case 'chinese':
            location = "Chinese restaurant";
            break;

        case 'korean':
            location = "Korean restaurant";
            break;

        case 'home':
            location = "Bei mir zuhause";
            break;

        case 'indonesian':
            location = "Indonesian Restaurant";
            break;

        case 'surprise-food':
            location = "Surprise";
            break;

        case 'alice':
            location = "Bei mir zuhause";
            break;

        case 'qyfddf':
            location = "Bei mir zuhause";
            break;

        case 'maomao':
            location = "Bei mir zuhause";
            break;

        case 'horror-movie':
            location = "Bei mir zuhause";
            break;

        case 'surprise-movie':
            location = "Surprise";
            break;

        case 'convenience-store':
            location = "Store";
            break;

        case 'iceskating':
            location = "Park";
            break;

        case 'shopping':
            location = "Unqilo";
            break;

        case 'museum':
            location = "Museum";
            break;

        case 'surprise-outdoor':
            location = "Surprise";
    }

    const letterContent = document.getElementById('letter-content');

    if (!letterContent) return;

    letterContent.innerHTML = `
        <div class="letter-header">Date Einladung</div>

        <div class="invite-grid">
            <span class="invite-label">An:</span>
            <span class="invite-value">Cutest person in the world</span>

            <span class="invite-label">Wo:</span>
            <span class="invite-value">${location}</span>
    
            <span class="invite-label">Wann:</span>
            <span class="invite-value">Samstag, 14.02</span>

            <span class="invite-label">Mit:</span>
            <span class="invite-value">Mir</span>
        </div>
            <div class="letter-footer">
                Love you, Ruirui
            </div>
    `;
    letterContent.classList.remove('hidden');
}