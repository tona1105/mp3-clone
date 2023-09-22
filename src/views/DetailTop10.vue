<template>
    <DefaultLayout>
        <div class="row" style="padding-top: 10%;">
            <div class="col-4">
                <div class=" position-relative">
                    <div class="img-top10" @click="emitPlayList()">
                        <img :src=infoTop10.thumbnail alt="" class="w-100 ">
                        <i class="fas fa-play icon-play position-absolute top10-playButton"></i>
                    </div>
                    <div class="fs-4 fw-bold text-center text-light">
                        {{ infoTop10.title }}
                    </div>
                    <div class="text-center">
                        <span v-for="(item, index) in infoTop10.artists" :key="index">
                            <span v-if="index !== infoTop10.artists.length - 1" style="font-size: 1rem; color: #8A8690">
                                {{ item.name }},
                            </span>
                            <span v-else style="font-size: 1rem; color: #8A8690">
                                {{ item.name }}
                            </span>
                        </span>
                    </div>
                    <div class="text-center" style="color: #8A8690">
                        {{ infoTop10.like }} người yêu thích
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="text-light">
                    Lời tựa: {{ infoTop10.sortDescription }}
                </div>
                <!-- xài flex !!! -->
                <div class="d-flex text-light justify-content-between align-items-end item__newRelease"
                    style="padding: 10px;">
                    <div class="position-relative w-50">
                        Bài hát
                    </div>
                    <div style="text-align: start; min-width: 16rem;">
                        Album
                    </div>
                    <div style="width: 5rem; text-align: center;">
                        Thời gian
                    </div>
                </div>
                <div>
                    <div v-for="(item, index) in listDetail" :key=index @click="emitPlayListWithId(index)">
                        <ItemTop10 :music=item />
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import ItemTop10 from '@/components/ItemTop10.vue';
import DefaultLayout from '@/components/DefaultLayout.vue';
export default {
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            listDetail: []
        }
    },
    components: {
        DefaultLayout,
        ItemTop10
    },
    computed: {
        ...mapState(['infoTop10'])
    },
    created() {
        console.log(this.slug);
        if (this.slug === 'vpop') this.getDetailVPop()
        else if (this.slug === 'kpop') this.getDetailKPop()
        else this.getDetailEDM()
    },
    methods: {
        getDetail(slug) {
            if (slug === 'vpop') this.getDetailVPop()
            else if (slug === 'kpop') this.getDetailKPop()
            else this.getDetailEDM()

        },
        async getDetailVPop() {
            const res = await axios.get(`https://api.jsonstorage.net/v1/json/408d6271-d488-49a0-b66b-6d425e49f6ab/de904ab9-dccc-4167-bba9-872d5cdd1cd8`)
            this.listDetail = res.data.data
            console.log('go');
        },
        async getDetailKPop() {
            const res = await axios.get(`https://api.jsonstorage.net/v1/json/408d6271-d488-49a0-b66b-6d425e49f6ab/9a2de4b3-23c2-4619-968d-125a4dfb7804`)
            this.listDetail = res.data.data
        },
        async getDetailEDM() {
            const res = await axios.get(`https://api.jsonstorage.net/v1/json/408d6271-d488-49a0-b66b-6d425e49f6ab/5df60f4d-3f82-4b0c-9009-3657abcb3a23`)
            this.listDetail = res.data.data
        },
        ...mapMutations(['updateSharedData']),
        emitPlayListWithId(index) {
            const data = this.listDetail.map(item => item)
            const num = index
            const type = 'top10' + this.slug
            this.updateSharedData({ data, type, num })
        },
        emitPlayList() {
            const data = this.listDetail.map(item => item)
            const num = 0
            const type = 'top10' + this.slug
            this.updateSharedData({ data, type, num })
        },

    }
}
</script>