import '../styles/screens/activity.css';
import { ACTIVITIES, type ActivityCategory } from "../activities";
import { showScreen } from "../utils/navigation";
import { startFinalLoading } from './final';


export function initActivityScreen() {
};

export function loadActivity(category: ActivityCategory) {
    const data = ACTIVITIES[category];
    const titleEl = document.getElementById('activity-title');
    const containerEl = document.getElementById('activity-options-container');

    if (!titleEl || !containerEl) return;

    // set screen title
    titleEl.textContent = data.title;

    // empty container
    containerEl.innerHTML = '';

    // insert new buttons
    data.options.forEach(option => {
        const card = document.createElement('div');
        card.textContent = option.text;
        card.className = 'activity-card';

        if (option.image) {
            const img = document.createElement('img');
            img.className = 'activity-icon';
            img.src = option.image;
            img.className = 'activity-icon';
            card.appendChild(img);
        }

        card.addEventListener('click', () => {
            startFinalLoading(option.id);
        });

        containerEl.appendChild(card);
    });
    showScreen('activity-screen');
}