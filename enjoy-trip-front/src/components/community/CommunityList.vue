<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCommunityStore } from '@/stores/communityStore'
import CommunityListItem from './item/CommunityListItem.vue'
import PageNavigation from '../commons/PageNavigation.vue'

const { communityStore, getCommunityList, clearCommunity } = useCommunityStore()
const { authStore } = useAuthStore()

const communityList = ref([])
const currentPage = ref(1)
const totalPage = ref(0)
const { VITE_COMMUNITY_LIST_SIZE } = import.meta.env
const param = ref({
    pgno: currentPage.value,
    spp: VITE_COMMUNITY_LIST_SIZE,
    key: '',
    word: ''
})

onMounted(() => {
    getArticleList()
})

const getArticleList = async () => {
    console.log((3 - 1) * VITE_COMMUNITY_LIST_SIZE)
    await getCommunityList(VITE_COMMUNITY_LIST_SIZE, (currentPage.value - 1) * VITE_COMMUNITY_LIST_SIZE, param.value.word)
    communityList.value = communityStore.communityList
    totalPage.value = Math.ceil(communityStore.totalCount / VITE_COMMUNITY_LIST_SIZE) // 서버에서 받아오는 전체 글 개수
}

const onPageChange = (val) => {
    currentPage.value = val
    param.value.pgno = val
    getArticleList()
}

const router = useRouter()

const moveWrite = async () => {
    const isAuthenticated = await auth()

    if (isAuthenticated) {
        clearCommunity()
        communityStore.community.userId = authStore.userId
        communityStore.community.name = authStore.name
        communityStore.community.userProfileImageUrl = authStore.userProfileImageUrl
        router.push({ name: 'community-write' })
    } else {
        router.push({ name: 'login' })
    }
}
</script>

<template>
    <div class="container my-3">
        <div>
            <a href="#" class="btn btn-dark" @click="moveWrite()"><i class="bx bx-plus me-1"></i> 글쓰기</a>
        </div>
        <div class="row align-items-center">
            <div class="col-md-6">
                <div class="mb-3"></div>
            </div>
            <div class="col-md-6">
                <div class="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3"></div>
            </div>
        </div>
        <!-- searchbar start -->
        <div class="container-fluid py-2">
            <div class="container text-center py-2">
                <div class="mx-auto text-center" style="max-width: 900px">
                    <div class="position-relative mx-auto">
                        <input class="form-control border-primary rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="검색어 입력" v-model="param.word" />
                        <button type="button" class="btn btn-dark rounded-pill position-absolute top-0 end-0 py-2 px-4 mt-2 me-2" @click="getArticleList">검색</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- searchbar end -->

        <!-- card start -->
        <div class="row">
            <div class="col-xl-4 col-sm-6 mb-4" v-for="community in communityStore.communityList" :key="community.communityId">
                <CommunityListItem :community="community" />
            </div>
        </div>
        <!-- card end -->

        <!-- pagenation start -->
        <PageNavigation :current-page="currentPage" :total-page="totalPage" @pageChange="onPageChange"></PageNavigation>
        <!-- pagenation end -->
    </div>
</template>

<style type="text/css" scope>
body {
    margin-top: 20px;
}

.card {
    margin-bottom: 24px;
    box-shadow: 0 2px 3px #fffcf6;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #eff0f2;
    border-radius: 1rem;
}

.avatar-md {
    height: 4rem;
    width: 4rem;
}

.rounded-circle {
    border-radius: 50% !important;
}

.img-thumbnail {
    padding: 0.25rem;
    background-color: #f1f3f7;
    border: 1px solid #eff0f2;
    border-radius: 0.75rem;
}

.avatar-title {
    align-items: center;
    background-color: #3b76e1;
    color: #fff;
    display: flex;
    font-weight: 500;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.bg-soft-primary {
    background-color: rgba(59, 118, 225, 0.25) !important;
}

a {
    text-decoration: none !important;
}

.badge-soft-danger {
    color: #f56e6e !important;
    background-color: rgba(245, 110, 110, 0.1);
}

.badge-soft-success {
    color: #63ad6f !important;
    background-color: rgba(99, 173, 111, 0.1);
}

.mb-0 {
    margin-bottom: 0 !important;
}

.badge {
    display: inline-block;
    padding: 0.25em 0.6em;
    font-size: 75%;
    font-weight: 500;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.75rem;
}
</style>
