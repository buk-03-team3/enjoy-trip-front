<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import CommunityListItem from './item/CommunityListItem.vue'
import PageNavigation from '../commons/PageNavigation.vue'
onMounted(() => {
    getArticleList()
})

const articles = ref([])
const currentPage = ref(1)
const totalPage = ref(0)
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env
const param = ref({
    pgno: currentPage.value,
    spp: VITE_ARTICLE_LIST_SIZE,
    key: '',
    word: ''
})

const chunkedArticles = computed(() => {
    const chunkSize = 3
    const chunks = []
    for (let i = 0; i < articles.value.length; i += chunkSize) {
        chunks.push(articles.value.slice(i, i + chunkSize))
    }
    return chunks
})

// 가짜 데이터로 글목록 채우는 함수
const fillFakeArticles = () => {
    const fakeArticles = [
        {
            articleNo: 1,
            subject: '부산 해운대 여행 후기',
            userId: '홍길동',
            views: 50,
            createdAt: '2024-05-09'
        },
        {
            articleNo: 1,
            subject: '서울 청계천 여행 후기',
            userId: '이길동',
            views: 52,
            createdAt: '2024-05-14'
        },
        {
            articleNo: 2,
            subject: '제주도 여행 후기',
            userId: '박길동',
            views: 45,
            createdAt: '2024-05-11'
        },
        {
            articleNo: 3,
            subject: '경주 여행 후기',
            userId: '김길동',
            views: 48,
            createdAt: '2024-05-10'
        },
        // 나머지 가짜 데이터 추가
        {
            articleNo: 4,
            subject: '강릉 여행 후기',
            userId: '최길동',
            views: 60,
            createdAt: '2024-05-13'
        },
        {
            articleNo: 5,
            subject: '여수 여행 후기',
            userId: '정길동',
            views: 55,
            createdAt: '2024-05-12'
        },
        {
            articleNo: 6,
            subject: '평창 여행 후기',
            userId: '백길동',
            views: 58,
            createdAt: '2024-05-08'
        },
        {
            articleNo: 7,
            subject: '속초 여행 후기',
            userId: '오길동',
            views: 42,
            createdAt: '2024-05-07'
        },
        {
            articleNo: 8,
            subject: '여주 여행 후기',
            userId: '이길순',
            views: 49,
            createdAt: '2024-05-06'
        },
        {
            articleNo: 9,
            subject: '남해 여행 후기',
            userId: '김길순',
            views: 46,
            createdAt: '2024-05-05'
        },
        {
            articleNo: 10,
            subject: '태안 여행 후기',
            userId: '정길순',
            views: 51,
            createdAt: '2024-05-04'
        },
        // 나머지 가짜 데이터 추가
        {
            articleNo: 11,
            subject: '당진 여행 후기',
            userId: '윤길순',
            views: 47,
            createdAt: '2024-05-03'
        },
        {
            articleNo: 12,
            subject: '영덕 여행 후기',
            userId: '박길순',
            views: 53,
            createdAt: '2024-05-02'
        },
        {
            articleNo: 13,
            subject: '태백 여행 후기',
            userId: '오길순',
            views: 56,
            createdAt: '2024-05-01'
        },
        {
            articleNo: 14,
            subject: '순창 여행 후기',
            userId: '이길순',
            views: 59,
            createdAt: '2024-04-30'
        },
        {
            articleNo: 15,
            subject: '보령 여행 후기',
            userId: '최길순',
            views: 54,
            createdAt: '2024-04-29'
        },
        {
            articleNo: 16,
            subject: '충주 여행 후기',
            userId: '윤길동',
            views: 57,
            createdAt: '2024-04-28'
        },
        {
            articleNo: 17,
            subject: '김해 여행 후기',
            userId: '박길동',
            views: 61,
            createdAt: '2024-04-27'
        },
        {
            articleNo: 18,
            subject: '인제 여행 후기',
            userId: '오길동',
            views: 44,
            createdAt: '2024-04-26'
        },
        {
            articleNo: 19,
            subject: '통영 여행 후기',
            userId: '이길동',
            views: 43,
            createdAt: '2024-04-25'
        },
        {
            articleNo: 20,
            subject: '완도 여행 후기',
            userId: '홍길동',
            views: 62,
            createdAt: '2024-04-24'
        }
    ]
    articles.value = fakeArticles
}

const getArticleList = () => {
    console.log('서버에서 글목록 얻어오자!!!', param.value)
    // 실제 API 호출 대신 가짜 데이터로 채우기
    fillFakeArticles()
}

const onPageChange = (val) => {
    console.log(val + '번 페이지로 이동 준비 끝!!!')
    currentPage.value = val
    param.value.pgno = val
    getArticleList()
}

const router = useRouter()
const moveWrite = () => {
    router.push({ name: 'meeting-article-write' })
}
</script>

<style type="text/css" scope>
body {
    margin-top: 20px;
    background-color: #eee;
}

.card {
    margin-bottom: 24px;
    box-shadow: 0 2px 3px #e4e8f0;
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
<template>
    <div class="container my-3">
        
        <div>
            <a href="#" data-bs-toggle="modal" data-bs-target=".add-new" class="btn btn-primary" @click="moveWrite()"><i class="bx bx-plus me-1"></i> 글쓰기</a>
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
                        <input class="form-control border-primary rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="검색어 입력" />
                        <button type="button" class="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 px-4 mt-2 me-2">검색</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- searchbar end -->

        <!-- card start -->
        <div>
            <!-- 각 row에 3개의 col을 추가 -->
            <div class="row">
                <div class="col-xl-4 col-sm-6" v-for="(chunk, index) in chunkedArticles" :key="index">
                    <!-- 각 col에는 3개의 card를 렌더링 -->
                    <CommunityListItem v-for="article in chunk" :key="article.articleNo" :article="article" />
                </div>
            </div>
        </div>
        <!-- card end -->

        <!-- pagenation start -->
        <PageNavigation :current-page="currentPage" :total-page="totalPage" @pageChange="onPageChange"></PageNavigation>
        <!-- pagenation end -->
    </div>
</template>
