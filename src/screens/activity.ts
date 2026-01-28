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

    // set screen title
    if (!titleEl || !containerEl) return;

    // empty container
    titleEl.textContent = data.title;

    // insert new buttons
    data.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option.text;
        btn.className = 'btn-primary';
        btn.style.width = '100%';

        btn.addEventListener('click', () => {
            showScreen('final-screen');
        });
    });
    showScreen('activity-screen');
}