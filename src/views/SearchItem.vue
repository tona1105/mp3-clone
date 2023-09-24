<template>
    <DefaultLayout>
        <div style="padding-top: 10%;">
            <div v-show="resultAlbum.length > 0">
                <div class="text-light fs-4">
                    Album:
                </div>
                <div class="row">
                    <div v-for="(item, index) in resultAlbum" :key=index class="col-3">
                        <div @click="navigateToDetail(item), emitInfo(item)">
                            <img :src=item.thumbnail alt="" class="w-100 img-top10">
                        </div>
                        <div class="text-light">
                            <div class="item-title fw-bold text-light d-block"
                                @click="navigateToDetail(item), emitInfo(item)">
                                {{ item.title }}
                            </div>
                            <div class="item-title">
                                <span v-for="(item2, index) in item.artists" :key="index">
                                    <span v-if="index !== item.artists.length - 1"
                                        style="font-size: 0.75rem; color: #8A8690">
                                        {{ item2.name }},
                                    </span>
                                    <span v-else style="font-size: 0.75rem; color: #8A8690">
                                        {{ item2.name }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="resultMusic.length > 0">
                <div class="text-light fs-4">
                    Bài hát:
                </div>
                <div class="row">
                    <div v-for="(item, index) in resultMusic" :key="index" @click="emitMusic(item)" class="col-6">
                        <ItemSearch :music=item />
                    </div>
                </div>
            </div>
            <div v-show="resultAlbum.length <= 0 && resultMusic.length <= 0" class="text-light fs-3">
                Nothing !
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import axios from 'axios';
import ItemSearch from '@/components/ItemSearch.vue';
import DefaultLayout from '@/components/DefaultLayout.vue';
import { mapMutations } from 'vuex';
export default {
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            listAllMusic: [],
            listAllAlbum: [],
            resultMusic: [],
            resultAlbum: []
        }
    },
    components: {
        DefaultLayout,
        ItemSearch,

    },
    watch: {
        slug(newSlug) {
            this.searchItem(newSlug)
        }
    },
    created() {
        this.getAllMusic()
    },
    methods: {
        ...mapMutations(['updateSharedData']),
        async getAllMusic() {
            const res = await axios.get(`https://api.jsonstorage.net/v1/json/408d6271-d488-49a0-b66b-6d425e49f6ab/f2b48941-180a-4f66-a6f2-c2886d13514e`)
            this.listAllMusic = res.data.data
            const res2 = await axios.get(`https://api.jsonstorage.net/v1/json/408d6271-d488-49a0-b66b-6d425e49f6ab/b14f5191-eb2f-4aaa-8949-eeffd06d9098`)
            this.listAllAlbum = res2.data.data
            this.searchMusic(this.slug)
            this.searchAlbum(this.slug)
        },
        searchItem(newSlug) {
            this.searchMusic(newSlug)
            this.searchAlbum(newSlug)
        },
        searchMusic(newSlug) {
            this.resultMusic = this.listAllMusic.filter(item => {
                return item.title.toLowerCase().includes(newSlug.toLowerCase());
            });
            console.log(this.resultMusic);
        },
        searchAlbum(newSlug) {
            this.resultAlbum = this.listAllAlbum.filter(item => {
                return item.title.toLowerCase().includes(newSlug.toLowerCase());
            });
            console.log(this.resultAlbum);
        },
        emitMusic(item) {
            const data = [item]
            const num = 0
            this.updateSharedData({ data, num })
        }
    }

}
</script>