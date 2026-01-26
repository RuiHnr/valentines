export function showScreen(screenId: string) {
    // hide all screens
    document.querySelectorAll('.screen').forEach(e => e.classList.add('hidden'));

    // show target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hidden');
    }
}