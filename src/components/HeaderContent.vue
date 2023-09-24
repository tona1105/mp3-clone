<template>
    <div style="height: 10%; z-index: 10;" class="d-flex justify-content-between align-items-center text-light headerContent pb-4">
        <div class="search__bg px-3 py-1 rounded">
            <i class="fas fa-search mx-2" @click="routeToSearch"></i>
            <input type="text" v-model="nameSearch" placeholder="Tìm kiếm bài hát">
        </div>
        <div>
            <div class="icon-user">
                icon
            </div>
            <ul class="bg-primary d-none">
                <li>Toàn</li>
                <li>Chỉnh sửa thông tin</li>
                <div class="btn primary-btn">Đăng xuất</div>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nameSearch: ''
        }
    },
    methods: {
        routeToSearch() {
            this.$router.push({
                name: 'searchMusic',
                params: {
                    slug: this.nameSearch
                }
            })
        }
    }
}
</script>