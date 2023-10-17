<template>
    <div>
        <div class="row">
            <div class="col-3" style="min-height: 90vh;">
                <NavbarApp />
            </div>
            <div class="col-9 position-relative"
                style="background: linear-gradient(to top, #000000, #363636); margin-left: -0.75rem; padding-bottom: 10%;">
                <HeaderContent/>
                <slot></slot>
            </div>
        </div>

            <PlayMusic />
        
           
        
    </div>
</template>

<script>
import HeaderContent from './HeaderContent.vue';
import NavbarApp from '@/components/NavbarApp.vue';
import PlayMusic from '@/components/PlayMusic.vue';
export default {
    components: {
        NavbarApp,
        PlayMusic,
        HeaderContent
    }
}

</script>