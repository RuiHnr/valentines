import '../styles/screens/dateChoice.css'
import type { ActivityCategory } from '../activities';
import { loadActivity } from './activity';
import { showScreen } from '../utils/navigation';


export function initDateChoice() {
    // date choices
    document.querySelectorAll('.date-card').forEach(card =>
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category') as ActivityCategory;

            if (category) {
                loadActivity(category);
            }
        })
    );

    // back button
    document.getElementById('back-to-intro-btn')?.addEventListener('click', () => {
        showScreen('intro-screen');
    });
}