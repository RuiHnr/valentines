import '../styles/screens/dateChoice.css'
import type { ActivityCategory } from '../activities';
import { loadActivity } from './activity';


export function initDateChoice() {

    document.querySelectorAll('.date-card').forEach(card =>
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category') as ActivityCategory;

            if (category) {
                loadActivity(category);
            }
        })
    );
}