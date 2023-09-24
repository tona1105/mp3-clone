<template>
    <div>
        <div style="padding-top: 10%;">
            <div class="">
                <div class="d-flex justify-content-between align-content-center">
                    <h4 class="text-light fw-bold">Shows to try</h4>
                    <p class="text-light" style="margin-top: 5px; margin-right: 10px;">Show all</p>
                </div>
                <div class="slide text-light row ">
                    <router-link :to="{name: item.route}" class="col btn" v-for="(item, index) in listAlbumRecommend" :key="index">
                        <div class="w-100 bg-info px-3 py-4 text-center rounded">
                            <h4>{{ item.name }}</h4>
                        </div>
                    </router-link>
                </div>
            </div>
            <div>
                <h4 class="text-light fs-1 my-5 fw-bold">New release</h4>
                <div class="d-flex text-light justify-content-between">
                    <div class="d-flex">
                        <div class="btn btn__newReleaseBg" @click="getAllNew"
                            :class="this.keyNewRelease === 'All' ? 'btn__purple' : ''">Tất cả
                        </div>
                        <div class="btn btn__newReleaseBg mx-3" @click="getAllNewInVietNam"
                            :class="this.keyNewRelease === 'VN' ? 'btn__purple' : ''">Việt Nam</div>
                        <div class="btn btn__newReleaseBg" @click="getAllNewInWorld"
                            :class="this.keyNewRelease === 'World' ? 'btn__purple' : ''">Quốc tế</div>
                    </div>
                   
                </div>
            </div>
            <div class="d-flex justify-content-between text-light position-relative item__lineDown2"
                style="padding:  10px;">
                <span class="w-50">Bài hát</span>
                <span>Thời gian</span>
            </div>
            <div v-for="(item, index) in listNewRelease" :key="index" class="position-relative item__lineDown"
                @click="emitPlayList(index)" :class="itemPlayBG(item.title)">
                <ItemNewRelease :music="item" :index="index"/>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex';
import ItemNewRelease from '@/components/ItemNewRelease.vue';

export default {
    data() {
        return {
            listAlbum: [],
            listAlbumRecommend: [
                {
                    name: 'BXH Nhạc Mới',
                    route: 'bxh-nhac-moi'
                },
                {
                    name: 'Top 10',
                    route: 'top10'
                },
                {
                    name: `Artist's Story`,
                    route: 'artists-story'
                },
                {
                    name: 'Chill/Thư giãn',
                    route: 'chill'
                }
                
            ],
            listNewRelease: [],
            filterList: [],
            keyNewRelease: 'All',
        }
    },
    components: {
        ItemNewRelease,
    },
    computed: {
        ...mapGetters(['getIdPlay']),
    },
    created() {
        this.getListNewRelease()
    },
    methods: {
        async getListNewRelease() {
            const res = await axios.get('https://api.jsonstorage.net/v1/json/408d6271-d488-49a0-b66b-6d425e49f6ab/f669d3ff-0751-4184-bc1e-d0b296e544ac')
            this.listNewRelease = res.data.data
            this.filterList = res.data.data
            this.isListChanged = true 
        },
        getAllNew() {
            this.listNewRelease = []
            this.keyNewRelease = 'All'
            this.getListNewRelease()
        },
        getAllNewInVietNam() {
            this.keyNewRelease = 'VN'
            const listVN = this.filterList.filter(item => item.isWorldWide === true)
            this.listNewRelease = listVN
            this.isListChanged = true 
        },
        getAllNewInWorld() {
            this.keyNewRelease = 'World'
            const listVN = this.filterList.filter(item => item.isWorldWide === false)
            this.listNewRelease = listVN
            this.isListChanged = true 
        },
        itemPlayBG(index) {
            if (index === this.getIdPlay) return 'item__playing'
        },
        ...mapMutations(['updateSharedData']),
        async emitPlayList(index) {
            const data = this.listNewRelease.map(item => item)
            const num = index
            this.updateSharedData({ data, num })
        },


    }
}
</script>