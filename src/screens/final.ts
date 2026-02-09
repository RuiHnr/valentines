import '../styles/screens/final.css';
import { showScreen } from '../utils/navigation';


let closeTimeout: number | undefined;
let loadingController: AbortController | null = null;

let envelope: HTMLElement | null = null;
let letter: HTMLElement | null = null;
let arrow: HTMLElement | null = null;
let track: HTMLElement | null = null;
let scrollWindow: HTMLElement | null = null;
let slideTop: HTMLElement | null = null;

const wait = (ms: number, signal: AbortSignal) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => resolve(true), ms);

        signal.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(new DOMException('Aborted', 'AbortError'));
        })
    })
};

export function initFinal() {
    arrow = document.getElementById('scroll-arrow');
    track = document.getElementById('slider-track');
    scrollWindow = document.getElementById('slider-window');
    slideTop = document.getElementById('slide-top')
    envelope = document.getElementById('envelope');
    letter = document.getElementById('letter');

    // logic for scrolling
    if (arrow && track) {
        arrow.addEventListener('click', () => {
            if (envelope?.classList.contains('open')) {
                toggleEnvelope();
            }

            track?.classList.toggle('scrolled');
            arrow?.classList.toggle('rotate-up');
            arrow?.classList.toggle('bouncing');
        })
    }

    // logic for opening letter
    if (envelope) {
        envelope.addEventListener('click', () => toggleEnvelope());
    }
}

export function startFinalLoading(optionId: string) {
    // kill old loading process if it's running
    if (loadingController) {
        loadingController.abort();
    }

    // create new controller
    loadingController = new AbortController();
    const signal = loadingController.signal;

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
    text.textContent = "The date is being prepared...";
    subtext.textContent = "Loading...";
    envelope?.classList.remove('open');
    letter?.classList.add('hidden');

    // loading sequence
    (async () => {
        try {
            // 1. start: fast to 10%
            await wait(1300, signal);
            bar.style.width = '10%';
            text.textContent = 'Checking Calender...';

            // 2. jump to 40%
            await wait(1800, signal);
            bar.style.width = '45%';
            text.textContent = 'Checking cash...';
            subtext.textContent = "sieht bissl knapp aus";

            // 3. longer pause, then jump to 80%
            await wait(2000, signal);
            bar.style.width = '80%';
            subtext.textContent = 'Almost done...';

            // 4. the last bit
            await wait(900, signal);

            bar.style.width = '100%';
            text.textContent = "All set!";

            // short pause at 100%
            await wait(900, signal);


            // switch to success
            loadContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');

            if (arrow) {
                arrow.classList.remove('hidden');
            }
        } catch {}
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
    let location: string = '';
    let was: string = '';
    switch (optionId) {
        case 'chinese':
            location = "Tbd";
            was = 'chinesisch essen';
            break;

        case 'korean':
            location = "Tbd";
            was = "koreanisch essen";
            break;

        case 'home':
            location = "bei mir zuhause";
            was = "dinner at home";
            break;

        case 'indonesian':
            location = "Diva Minang, Ismaninger Str. 17, München";
            was = "Indonesisch essen";
            break;

        case 'surprise-food':
            location = "Surprise";
            was = "dinner";
            break;

        case 'alice':
        case 'qyfddf':
        case 'maomao':
        case 'horror-movie':
        case 'surprise-movie':
            location = "Bei mir zuhause";
            was = "Movie night";
            break;

        case 'convenience-store':
            location = "Super K Convenience Store";
            was = "Essen + Shopping";
            break;

        case 'iceskating':
            location = "Prinzregentenstadion";
            was = "Eislaufen";
            break;

        case 'shopping':
            location = "In der Stadt";
            "Shopping"
            break;

        case 'museum':
            location = "Haus der Kunst, Prinzregentenstraße 1";
            was = "Museum";
            break;

        case 'surprise-outdoor':
            location = "Surprise";
            was = "Surprise";
            break;
    }

    const letterContent = document.getElementById('letter-content');

    if (!letterContent) return;

    letterContent.innerHTML = `
        <div class="letter-header">Date Einladung</div>

        <div class="invite-grid">
            <span class="invite-label">Was?</span>
            <span class="invite-value">${was}</span>

            <span class="invite-label">Wo?</span>
            <span class="invite-value">${location}</span>
    
            <span class="invite-label">Wann?</span>
            <span class="invite-value">Samstag, 14.02</span>

            <span class="invite-label">Mit?</span>
            <span class="invite-value">mir :)</span>
        </div>
            <div class="letter-footer">
                Love you, Ruirui♥️
            </div>
    `;
    letterContent.classList.remove('hidden');
}