import HomePage from '@/views/HomePage.vue'
import TopHit from '@/views/TopHit.vue'
import Top10Music from '@/views/Top10Music.vue'
import DetailTop10 from '@/views/DetailTop10.vue'
import SearchItem from '@/views/SearchItem.vue'
export default [
    {
        path: '/',
        component: HomePage
    },
    {
        name: 'bxh-nhac-moi',
        path: '/bxh-nhac-moi',
        component: TopHit
    },
    {
        name: 'top10' ,
        path: '/top10',
        component: Top10Music,
    },
    {
        name: 'detailTop10',
        path: '/top10/:slug',
        component: DetailTop10,
        props: true
    },
    {
        name: 'searchMusic',
        path: '/search/:slug',
        component: SearchItem,
        props: true
    }
]