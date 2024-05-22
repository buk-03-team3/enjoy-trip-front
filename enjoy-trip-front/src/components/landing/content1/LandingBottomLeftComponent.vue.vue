<template>
    <div class="container py-5">
        <div class="mx-auto text-center mb-5" style="max-width: 900px">
            <h5 class="section-title px-3 kakao-bold">Hot Post</h5>
            <h1 class="mb-4 kakao-bold">🔥 인기 글 🔥</h1>
        </div>
        <div class="tab-class text-center">
            <div class="tab-content">
                <div class="row">
                    <table class="table" id="article-table">
                        <thead>
                            <tr class="table-head-text">
                                <th class="title col-6 kakao-bold"><a>제목</a></th>
                                <th class="hashtag col-2 kakao-bold"><a>작성자</a></th>
                                <th class="user-id kakao-bold"><a>작성일</a></th>
                                <th class="hit kakao-bold"><a>조회</a></th>
                            </tr>
                        </thead>
                        <tbody class="table-head-text">
                            <tr v-for="article in sortedHotCommunityList" :key="article.communityId">
                                <td class="title kakao-regular">
                                    <router-link :to="`/community/view/${article.communityId}`" @click="setCommunity(article)">
                                        {{ article.title }}
                                    </router-link>
                                </td>
                                <td class="user-name kakao-regular">{{ article.name }}</td>
                                <td class="created-at kakao-regular"><time>{{ formatDate(article.regDt) }}</time></td>
                                <td class="hit kakao-regular">{{ article.readCount }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLandingStore } from '@/stores/landingStore.js'
import { useCommunityStore } from '@/stores/communityStore.js'

const { landingStore, getTopThreeCommunityList } = useLandingStore()
const { communityStore } = useCommunityStore()

const hotCommunityList = ref([])

onMounted(async () => {
    await getTopThreeCommunityList()
    hotCommunityList.value = landingStore.hotCommunityList
})

const sortedHotCommunityList = computed(() => {
    return hotCommunityList.value.slice().sort((a, b) => b.readCount - a.readCount)
})

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('ko-KR', options)
}

function setCommunity(article) {
    communityStore.community = article
}
</script>

<style scoped>
.table-head-text {
    color: #222;
    font-size: 1.2rem;
}
.table-body-text {
    color: #111;
    font-size: 1rem;
}
.search-form {
    width: 80%;
    margin: 0 auto;
    margin-top: 1rem;
}

.search-form input {
    height: 100%;
    background: transparent;
    border: 0;
    display: block;
    width: 100%;
    padding: 1rem;
    height: 100%;
    font-size: 1rem;
}

.search-form select {
    background: transparent;
    border: 0;
    padding: 1rem;
    height: 100%;
    font-size: 1rem;
}

.search-form select:focus {
    border: 0;
}

.search-form button {
    height: 100%;
    width: 100%;
    font-size: 1rem;
}

.search-form button svg {
    width: 24px;
    height: 24px;
}

.card-margin {
    margin-bottom: 1.875rem;
}

@media (min-width: 992px) {
    .col-lg-2 {
        flex: 0 0 16.66667%;
        max-width: 16.66667%;
    }
}

.card {
    border: 0;
    box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #ffffff;
    background-clip: border-box;
    border: 1px solid #e6e4e9;
    border-radius: 8px;
}
</style>
