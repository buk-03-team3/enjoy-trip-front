<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {useNoticeStore} from '@/stores/noticeStore'
import { storeToRefs } from 'pinia'
// import { listArticle } from '@/api/board.js' // 실제 API 호출 대신 주석 처리

import VSelect from '../commons/VSelect.vue'
import BoardListItem from './item/BoardListItem.vue'
import PageNavigation from '../commons/PageNavigation.vue'

const  noticeStore  = useNoticeStore();
const router = useRouter()

const selectOption = ref([
    { text: '검색조건', value: '' },
    { text: '글번호', value: 'noticeId' },
    { text: '제목', value: 'title' },
    { text: '작성자아이디', value: 'userId' }
])

const changeKey = (val) => {
    console.log('BoarList에서 선택한 조건 : ' + val)
    noticeStore.notices.searchOption = val;
}



const getArticleList = () => {
    console.log('서버에서 글목록 얻어오자')
    noticeStore.noticeList();

}

const onPageChange = (val) => {
    console.log(val + '번 페이지로 이동 준비 끝!!!')
    noticeStore.notices.currentPageIndex = val
    getArticleList()
}

const moveWrite = () => {
    noticeStore.notice.value ={
        title: '',
        content: '',
        noticeId: '',
        readCount: '',
        regDate: '',
        userId: '',
        userName: '',
        userProfileImageUrl: ''
    }

//     const movePage= (pageIndex) => {
//       console.log("BoardMainVue : movePage : pageIndex : " + pageIndex);
//       setBoardMovePage(pageIndex);
//       getArticleList();
//    }

    router.push({ name: 'article-write' })
}

  getArticleList()
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    <mark class="sky">글목록</mark>
                </h2>
            </div>
            <div class="col-lg-10">
                <div class="row align-self-center mb-2">
                    <div class="col-md-2 text-start">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="moveWrite">글쓰기</button>
                    </div>
                    <div class="col-md-5 offset-5">
                        <form class="d-flex">
                            <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control" v-model="noticeStore.notices.searchWord" placeholder="검색어..." />
                                <button class="btn btn-dark" type="button" @click="getArticleList">검색</button>
                            </div>
                        </form>
                    </div>
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">조회수</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <BoardListItem v-for="notice in noticeStore.notices.list" :key="notice.noticeId" :notice="notice"></BoardListItem>
                    </tbody>
                </table>
            </div>
            <PageNavigation  @pageChange="onPageChange"></PageNavigation>
        </div>
    </div>
</template>

<style scoped></style>
