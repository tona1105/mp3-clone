<template>
    <DefaultLayout>
        <div class="h-50">
            <img src="@/assets/img/top10.jpg"
                alt="" class="w-100 h-100">
        </div>
        <div class="row">
            <div v-for="(item,index) in listInfoTop10" :key=index class="col-3" >
                <div @click="navigateToDetail(item),emitInfo(item)">
                    <img :src=item.thumbnail alt="" class="w-100 img-top10">
                </div>
                <div class="text-light">
                    <div class="item-title fw-bold text-light d-block" @click="navigateToDetail(item),emitInfo(item)">
                        {{ item.title }}
                    </div>
                    <div class="item-title">
                        <span v-for="(item2,index) in item.artists" :key="index" >
                            <span v-if="index !== item.artists.length - 1" style="font-size: 0.75rem; color: #8A8690" >
                                {{ item2.name }},
                            </span>
                            <span v-else style="font-size: 0.75rem; color: #8A8690" >
                                {{ item2.name }}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import DefaultLayout from '@/components/DefaultLayout.vue';
export default {
    data() {
        return {
            listInfoTop10: [
            ]      
        }
    },
    components: {
        DefaultLayout,
    },
    created() {
        this.getInfoTop10()
    },
    methods: {
        ...mapMutations(['updateInfoTop10']),
        async getInfoTop10() {
            const res = await axios.get(`https://api.jsonstorage.net/v1/json/408d6271-d488-49a0-b66b-6d425e49f6ab/b14f5191-eb2f-4aaa-8949-eeffd06d9098`)
            this.listInfoTop10 = res.data.data
        },
        navigateToDetail(item){
            this.$router.push({
                name: 'detailTop10',
                params: {slug: item.slug}
            })
        },
        emitInfo(item) {
            console.log('abc');
            this.updateInfoTop10(item)
            
        }
    }
    
}
</script>