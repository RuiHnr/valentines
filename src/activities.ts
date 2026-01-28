

export type ActivityCategory = 'dinner' | 'movie' | 'outdoor';

interface ActivityOption {
    id: string;
    text: string;
    image?: string;
}

interface CategoryData {
    title: string;
    options: ActivityOption[];
}

export const ACTIVITIES: Record<ActivityCategory, CategoryData> = {
    dinner: {
        title: "What do you wanna eat?",
        options : [
            { id: 'chinese', text: 'Chinese' },
            { id: 'korean', text: 'Korean' },
            { id: 'home', text: 'Ich koche für dich' },
            { id: 'pick-food', text: 'Du kannst entscheiden' }
        ]
    },
    movie: {
        title: "Was willst du schauen?",
        options: [
            { id: 'alice', text: 'Alice in Borderland' },
            { id: 'qyfddf', text: 'Meet Yourself' },
            { id: 'maomao', text: 'Maomao' },
            { id: 'pick-movie', text: 'Du kannst entscheiden' }
        ]
    },
    outdoor: {
        title: "Was willst du machen?",
        options: [
            { id: 'shopping', text: 'Shoppen gehen' },
            { id: 'iceskating', text: 'Eislaufen gehen' },
            { id: 'walk', text: 'Spazieren gehen' },
            { id: 'pick-outdoor', text: 'Entscheide du😭' }
        ]
    }
};