<template>
    <DefaultLayout>
        <div class="text-light fs-2 fw-bold" style="padding-top: 10%;">
            BXH Nhạc Mới
            <span @click="playList">
                <i class="fa-regular fa-circle-play"></i>
            </span>
        </div>
        <div v-for="(item, index) in listTopHit" :key="index" class="position-relative item__lineDown"
            @click="emitPlayList(index)" :class="itemPlayBG(item.title)">
            <ItemContent :music="item" :index="index" />
        </div>
    </DefaultLayout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import axios from 'axios';
import ItemContent from '@/components/ItemContent.vue';
import DefaultLayout from '@/components/DefaultLayout'
export default {
    data() {
        return {
            listTopHit: []
        }
    },
    components: {
        DefaultLayout,
        ItemContent
    },
    computed: {
        ...mapGetters(['getIdPlay']),
    },
    created() {
        this.getTopHit()
    },
    methods: {

        async getTopHit() {
            const res = await axios.get(`https://api.jsonstorage.net/v1/json/408d6271-d488-49a0-b66b-6d425e49f6ab/6d643de7-232c-4881-9ef4-a256315726c5`)
            this.listTopHit = res.data.song
        },
        ...mapMutations(['updateSharedData','updateAudioInfo']),
        playList() {
            const data = this.listTopHit.map(item => item)
            const num = 0   
            this.updateSharedData({ data, num })
        },
        emitPlayList(index) {
            const data = this.listTopHit.map(item => item)
            const num = index
            this.updateSharedData({ data, num })
            this.updateAudioInfo({data,num})
        },
        itemPlayBG(index) {
            if (index === this.getIdPlay) return 'item__playing'
        }
    }
}
</script>