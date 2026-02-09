export type Screen = (typeof SCREENS)[number];

const SCREENS = ['intro-screen', 'date-choice-screen', 'activity-screen', 'final-screen'] as const;

export function showScreen(screenId: Screen) {
    // hide all screens
    document.querySelectorAll('.screen').forEach(e => e.classList.add('hidden'));

    // show target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hidden');
    }

    updateBackButton(screenId);
}

function updateBackButton(screenId: Screen) {
    const backBtn = document.getElementById('global-back-btn');
    if (!backBtn) return;

    // find the previous screen
    const prevIndex = SCREENS.indexOf(screenId) - 1;

    // if we are at intro screen
    if (prevIndex < 0) {
        backBtn.classList.add('hidden');
        return;
    }

    backBtn.classList.remove('hidden');

    // remove old event listener by cloning button
    const newBtn = backBtn.cloneNode(true) as HTMLElement;
    backBtn.parentNode?.replaceChild(newBtn, backBtn);

    const prevScreen = SCREENS[prevIndex];
    newBtn.addEventListener('click', () => {
        showScreen(prevScreen);
    });
}