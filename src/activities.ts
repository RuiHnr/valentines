import baoImg from '../resources/xiaolongbao.jpg';
import bibimbapImg from '../resources/bibimbap.jpg';
import chefImg from '../resources/chef.jpg';
import gorengImg from '../resources/nasi-goreng.jpg';
import arisuImg from '../resources/arisu.jpg';
import hongdouImg from '../resources/hongdou.jpg';
import maomaoImg from '../resources/maomao.jpg';
import clownImg from '../resources/clown.jpg';
import conbiniImg from '../resources/conbini.jpg';
import iceskaterImg from '../resources/iceskaters.jpg';
import uniqloImg from '../resources/uniqlo.jpg';
import museumImg from '../resources/museum.jpg';

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
        title: "Choose a cuisine!",
        options : [
            { id: 'chinese', text: '中餐', image: baoImg },
            { id: 'korean', text: '한국', image: bibimbapImg },
            { id: 'home', text: 'Private Chef', image: chefImg },
            { id: 'indonesian', text: 'Indonesisch', image: gorengImg },

            { id: 'surprise-food', text: 'Surprise me' }
        ]
    },
    movie: {
        title: "Choose what you wanna watch!",
        options: [
            { id: 'alice', text: 'Alice in Borderland', image: arisuImg },
            { id: 'qyfddf', text: '去有风的地方', image: hongdouImg },
            { id: 'maomao', text: 'Maomao', image: maomaoImg },
            { id: 'horror-movie', text: 'Horror Film', image: clownImg },

            { id: 'surprise-movie', text: 'Surprise Movie' }

        ]
    },
    outdoor: {
        title: "Choose an activity!",
        options: [
            { id: 'convenience-store', text: 'Convenience Store Date', image: conbiniImg },
            { id: 'iceskating', text: 'Iceskating Date', image: iceskaterImg },
            { id: 'shopping', text: 'Shopping Date', image: uniqloImg },
            { id: 'museum', text: 'Museum Date', image: museumImg },

            { id: 'surprise-outdoor', text: 'Surprise Me' }
        ]
    }
};