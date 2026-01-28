import '../styles/screens/activity.css';
import { ACTIVITIES, type ActivityCategory } from "../activities";
import { showScreen } from "../utils/navigation";


export function initActivityScreen() {
    document.getElementById('back-to-date-btn')?.addEventListener('click', () => {
        showScreen('date-choice-screen');
    });
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

        card.addEventListener('click', () => {
            showScreen('final-screen');
        });

        containerEl.appendChild(card);
    });
    showScreen('activity-screen');
}