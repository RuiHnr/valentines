import '../styles/screens/final.css';
import { showScreen } from '../utils/navigation';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let envelope: HTMLElement | null = null;
let letterSection: HTMLElement | null = null;
let arrow: HTMLElement | null = null;

export function initFinal() {
    envelope = document.getElementById('envelope');
    letterSection = document.getElementById('letter-section');
    arrow = document.getElementById('scroll-arrow');

    // logic for opening letter
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope?.classList.toggle('open');
        });
    }

    // logic for scroll arrow
    if (arrow && letterSection) {
        arrow.addEventListener('click', () => {
            // make letter visible
            letterSection?.classList.remove('letter-section-hidden');
            letterSection?.classList.add('letter-section-visible');

            setTimeout(() => {
                letterSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            arrow!.style.opacity = '0';
        });
    }
}

export function startFinalLoading(activityText: string) {
    showScreen('final-screen');

    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('loading-text');
    const subtext = document.getElementById('loading-subtext');
    const loadContainer = document.getElementById('loading-container');
    const successContainer = document.getElementById('success-container');
    const detailsText = document.getElementById('final-details');

    if (!bar || !text || !subtext || !loadContainer || !successContainer || !detailsText) return;

    // reset state
    loadContainer.classList.remove('hidden');
    successContainer.classList.add('hidden');
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

        if (detailsText) {
            detailsText.textContent = `Wir machen: ${activityText}`;
        }

        if (arrow) {
            arrow.classList.remove('hidden');
        }
    })();
}