

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
            { id: 'chinese', text: '中餐', image: '../resources/xiaolongbao.jpg' },
            { id: 'korean', text: '한국', image: '../resources/bibimbap.jpg' },
            { id: 'home', text: 'Private Chef', image: '../resources/chef.jpg' },
            { id: 'indonesian', text: 'Indonesisch', image: '../resources/nasi-goreng.jpg' },

            { id: 'surprise-food', text: 'Surprise me' }
        ]
    },
    movie: {
        title: "Was willst du schauen?",
        options: [
            { id: 'alice', text: 'Alice in Borderland', image: '../resources/arisu.jpg' },
            { id: 'qyfddf', text: '去有风的地方', image: '../resources/hongdou.jpg' },
            { id: 'maomao', text: 'Maomao', image: '../resources/maomao.jpg' },
            { id: 'horror-movie', text: 'Horror Film', image: '../resources/clown.jpg' },

            { id: 'surprise-movie', text: 'Surprise Movie' }

        ]
    },
    outdoor: {
        title: "Was willst du machen?",
        options: [
            { id: 'convenience-store', text: 'Convenience Store Date', image: '../resources/conbini.jpg' },
            { id: 'iceskating', text: 'Eislaufen Date', image: '../resources/iceskaters.jpg' },
            { id: 'shopping', text: 'Shopping Date', image: '../resources/uniqlo.jpg' },
            { id: 'museum', text: 'Museum Date', image: '../resources/museum.jpg' },

            { id: 'surprise-outdoor', text: 'Surprise Me' }
        ]
    }
};