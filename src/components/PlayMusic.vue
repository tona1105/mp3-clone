<template>
    <div class="fixed-bottom bg-dark text-light row" style="height: 10%;">
        <div class="col-4 d-flex align-items-center">
            <div v-if="itemThumb">
                <img :src="itemThumb" alt="" style="height: 50px; width: 50px;" class="cd_thumb"
                    :class="isPlayed ? 'cd__spin' : ''">
            </div>
            <div class="text-light mx-3">
                <div class="item-title__play">{{ itemTitle }}</div>
                <div class="item-title__play">{{ itemArtist }}</div>
            </div>
        </div>
        <div class="control text-center text-light col-5">
            <div class="btn btn-repeat text-light" @click="loopSong" :style="isLoop ? { backgroundColor: '#018da1' } : ''">
                <i class="fas fa-redo fs-5"></i>
            </div>
            <div class="btn btn-prev" @click="previousSong">
                <i class="fas fa-step-backward fs-5"></i>
            </div>
            <div class="btn btn-toggle-play" :style="!isPlayed ? { display: 'none' } : ''" @click="pauseAudio()">
                <i class="fas fa-pause icon-pause"></i>
            </div>
            <div class="btn btn-toggle-play" :style="isPlayed ? { display: 'none' } : ''" @click="playAudio()">
                <i class="fas fa-play icon-play"></i>
            </div>
            <div class="btn btn-next" @click="nextSong">
                <i class="fas fa-step-forward fs-5"></i>
            </div>
            <div class="btn btn-random" @click="toggleRandom" :style="isRandom ? { backgroundColor: '#018da1' } : ''">
                <i class="fas fa-random fs-5"></i>
            </div>
            <vue-slider id="progress" class="progress" type="range" step="1" :min="0" :max="100" v-model="progress"
                @change="changeProgress" />
            <audio ref="audio" @timeupdate="updateProgress" @ended="onAudioEnd"></audio>
        </div>
        <div class="volume col-3 d-flex align-items-center">
            <i class="fas fa-volume-up volume-btn"></i>
            <vue-slider type="range" ref="volume" class=" w-75 volume-range" :min="0" :max="100" v-model="vol"
                @change="changeVol" />
        </div>


    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VueSlider from 'vue-slider-component'
export default {
    data() {
        return {
            listDetailItem: [],
            itemThumb: '',
            itemTitle: '',
            itemArtist: '',
            itemPlaying: '',
            isPlayed: false,
            vol: 100,
            progress: 0,
            isListReady: false,
            isLoop: false,
            isRandom: false
        }
    },
    created() {
        // Add a global event listener for the 'keydown' event
        window.addEventListener('keydown', this.handleKeyDown);
    },
    destroyed() {
        // Remove the event listener when the component is destroyed
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    components: {
        VueSlider
    },
    computed: {
        ...mapState(['listPlay', 'idPlay', 'typePlay']),
    },
    watch: {
        listPlay: {
            handler(newValue) {
                // Khi dữ liệu từ Vuex thay đổi, bạn có thể cập nhật listPlayItem
                this.listDetailItem = [...newValue]; // Sử dụng spread operator để tạo một bản sao của mảng
                this.isListReady = true;
            },

        },
        idPlay: {
            handler(newValue) {
                setTimeout(() => {
                    this.setSong(newValue);
                    this.playAudio();
                }, 1000); // Đợi 1 giây trước khi thực hiện
            },

        },
    },
    methods: {

        ...mapMutations(['nextPlay', 'previousPlay', 'randomPlay']),
        setSong(id) {
            const item = this.listDetailItem[id]
            this.$refs.audio.src = require('@/assets/music/all/' + item.source)
            this.itemThumb = item.thumbnail
            this.itemTitle = item.title
            if (item.artists_names) {
                this.itemArtist = item.artists_names
            }
            else {
                this.itemArtist = item.artistsNames
            }

        },
        playAudio() {
            this.$refs.audio.play()
            this.isPlayed = true
        },
        pauseAudio() {
            this.$refs.audio.pause()
            this.isPlayed = false

        },
        changeVol() {
            this.$refs.audio.volume = this.vol / 100
            console.log(this.vol);
        },
        updateProgress() {
            const audio = this.$refs.audio;
            const duration = audio.duration;
            const currentTime = audio.currentTime;
            if (!isNaN(duration) && isFinite(duration)) {
                this.progress = (currentTime / duration) * 100;
            }
            else {
                this.progress = 0
            }
        },
        changeProgress() {
            const time = this.$refs.audio.duration * this.progress / 100
            this.$refs.audio.currentTime = time
        },
        nextSong() {
            if (this.isRandom) this.randomPlay()
            else this.nextPlay()
        },
        previousSong() {
            if (this.isRandom) this.randomPlay()
            else this.previousPlay()
        },
        toggleRandom() {
            if (this.isRandom) this.isRandom = false
            else this.isRandom = true
            console.log(this.isRandom);
        },
        loopSong() {
            if (this.isLoop) this.isLoop = false
            else this.isLoop = true
        },
        onAudioEnd() {
            if (this.isLoop) {
                this.$refs.audio.currentTime = 0
                this.playAudio()
            }
            else this.nextSong()
        },
        handleKeyDown(event) {
            console.log(event.keyCode);
            if (event.key === ' ' || event.keyCode === 32) {
                event.preventDefault()
                // Check for the spacebar key using the 'key' property or 'keyCode'
                this.isPlayed === true ? this.pauseAudio() : this.playAudio()
            }
        }
    }
}
</script>
