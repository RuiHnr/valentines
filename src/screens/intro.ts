import '../styles/screens/intro.css';
import { showScreen } from '../utils/navigation';

export function initIntro() {
    const yesButton = document.querySelector<HTMLButtonElement>('#yes-btn')!;
    const noButton = document.querySelector<HTMLButtonElement>('#no-btn')!;

    let currentScale = 1;

    const moveButtonRandomely = () => {
    // calculate random positions within the visible window
    const x = Math.random() * (window.innerWidth - noButton.offsetWidth);
    const y = Math.random() * (window.innerHeight - noButton.offsetHeight);

    noButton.style.position = 'absolute';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;

    // scale yes button
    currentScale += 0.2;
    yesButton.style.setProperty('--btn-scale', currentScale.toString());
    }

    // add event listeners
    noButton.addEventListener('mouseover', () => moveButtonRandomely());
    noButton.addEventListener('click', () => moveButtonRandomely());

    yesButton.addEventListener('click', () => showScreen('date-choice-screen'));
}