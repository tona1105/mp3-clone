<template>
    <div class="fixed-bottom bg-dark text-light row" style="height: 10%;">
        <div class="col-4 d-flex align-items-center">
            <div v-if="audioInfo.itemThumb">
                <img :src="audioInfo.itemThumb" alt="" style="height: 50px; width: 50px;" class="cd_thumb"
                    :class="isPlayed ? 'cd__spin' : ''">
            </div>
            <div class="text-light mx-3">
                <div class="item-title__play">{{ audioInfo.itemTitle }}</div>
                <div class="item-title__play">{{ audioInfo.itemArtist }}</div>
            </div>
        </div>
        <div class="control text-center text-light col-5">
            <div class="btn btn-repeat text-light" @click="loopSong" :style="isLoop ? { backgroundColor: '#018da1' } : ''">
                <i class="fas fa-redo fs-5"></i>
            </div>
            <div class="btn btn-prev" @click="previousSong">
                <i class="fas fa-step-backward fs-5"></i>
            </div>
            <div class="btn btn-toggle-play" :style="!audioInfo.isPlayed ? { display: 'none' } : ''" @click="pauseAudio()">
                <i class="fas fa-pause icon-pause"></i>
            </div>
            <div class="btn btn-toggle-play" :style="audioInfo.isPlayed ? { display: 'none' } : ''" @click="playAudio()">
                <i class="fas fa-play icon-play"></i>
            </div>
            <div class="btn btn-next" @click="nextSong">
                <i class="fas fa-step-forward fs-5"></i>
            </div>
            <div class="btn btn-random" @click="toggleRandom" :style="isRandom ? { backgroundColor: '#018da1' } : ''">
                <i class="fas fa-random fs-5"></i>
            </div>
            <vue-slider id="progress" class="progress" type="range" step="1" :min="0" :max="100"
                v-model="audioInfo.progress" @change="handleChangeProgress" />
            <audio ref="audio" :src="require('@/assets/music/all/' + audioInfo.src)" @timeupdate="handleUpdateProgress"
                @ended="onAudioEnd"></audio>
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
            isPlayed: '',
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
        audioInfo() {
            const audioInfo = this.$store.getters.audioInfo;
            console.log(audioInfo); // Kiểm tra audioInfo trong console
            return audioInfo;
        },
    },
    watch: {
        idPlay: {
            handler() {
                this.updateAudioInfo()
                this.setSong();
                setTimeout(() => {
                    this.playAudio()
                }, 200); // Đợi 0.2 giây trước khi thực hiện
            },

        },
        'audioInfo.isPlayed'() {
            this.isPlayed = this.audioInfo.isPlayed
        },
        'audioInfo.vol'() {
            this.$refs.audio.volume = this.audioInfo.vol
        },
        'audioInfo.progress'() {
            this.$refs.audio.progress = this.audioInfo.progress
        }
    },
    methods: {
        ...mapMutations(['nextPlay', 'previousPlay', 'randomPlay', 'updateAudioInfo', 'updateVol',
            'updateProgress', 'changeProgress', 'updatePlayorPause','updateRandomOrNot']),
        setSong() {
            // this.$refs.audio.src = null
            const item = this.audioInfo
            // this.$refs.audio.src = require('@/assets/music/all/' + item.src)
            // // const src = require('@/assets/music/all/' + item.source)
    
            this.itemThumb = item.itemThumb
            this.itemTitle = item.itemTitle
            if (item.artists_names) {
                this.itemArtist = item.artists_names
            }
            else {
                this.itemArtist = item.itemArtist
            }
           
        },
        playAudio() {
            this.updatePlayorPause(true)
            this.$refs.audio.play()
            console.log('play');
        },
        pauseAudio() {
            this.updatePlayorPause(false)
            this.$refs.audio.pause()
            
            const time = this.audioInfo.progress * this.$refs.audio.duration / 100
            console.log(time);
            this.$refs.audio.currentTime = time
            console.log('pause');
        },
        changeVol() {

            const volume = this.vol / 100
            this.updateVol(volume)
        },
        handleUpdateProgress() {
            const audio = this.$refs.audio;
            const duration = audio.duration;
            const currentTime = audio.currentTime;
    
            let progress = 0
            if (!isNaN(duration) && isFinite(duration)) {

                progress = (currentTime / duration) * 100;
            }
            else {

                progress = 0
            }
            console.log(progress);
            this.updateProgress(progress)
        },
        handleChangeProgress() {
            
            const time = this.$refs.audio.duration * this.audioInfo.progress / 100
            console.log(time);
            this.$refs.audio.currentTime = time

            const audio = this.$refs.audio;
            const duration = audio.duration;
            const currentTime = audio.currentTime;
    
            let progress = 0
            if (!isNaN(duration) && isFinite(duration)) {

                progress = (currentTime / duration) * 100;
            }
            else {

                progress = 0
            }
            this.changeProgress(progress)
           
            
        },
        nextSong() {
            if (this.isRandom) this.randomPlay()
            else this.nextPlay()
            console.log(this.$store.state.idPlay);
        },
        previousSong() {
            if (this.isRandom) this.randomPlay()
            else this.previousPlay()
        },
        toggleRandom() {
            if (this.isRandom) this.isRandom = false
            else this.isRandom = true
            this.updateRandomOrNot(this.isRandom)
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
        },
        
    }
}
</script>
