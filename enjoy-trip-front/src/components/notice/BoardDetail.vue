<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { detailArticle, deleteArticle } from '@/api/board'
import { useNoticeStore } from '@/stores/noticeStore'
import { formatDate } from "@/api/util"
import { storeToRefs } from 'pinia'
const route = useRoute()
const router = useRouter()
const noticeStore = useNoticeStore();

const { noticeId } = route.params

const{notice} = storeToRefs(noticeStore) 

const getArticle =async () => {
    // const { articleno } = route.params;
        console.log(noticeId + '번글 얻으러 가자!!!')
   await noticeStore.noticeDetail(noticeId);

    
}

function moveList() {
    router.push({ name: 'article-list' })
}

function moveModify() {
    router.push({ name: 'article-modify', params: { noticeId } })
}

function onDeleteArticle() {
    // const { articleno } = route.params;
    console.log(noticeId + '번글 삭제하러 가자!!!')
    //delete 함수 호출
    noticeStore.noticeDelete(noticeId)
    // delete 성공하면 list로 이동 moveList() 
    moveList();
}

getArticle()
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    <mark class="sky">글보기</mark>
                </h2>
            </div>
            <div class="col-lg-10 text-start">
                <div class="row my-2">
                    <h2 class="text-secondary">{{ notice.noticeId }}. {{ notice.title }}</h2>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="clearfix align-content-center">
                            <img class="avatar me-2 float-md-start bg-light p-2" src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
                            <p>
                                <span class="fw-bold">{{notice.userName}}</span> <br />
                                <span class=" fw-light"> {{ formatDate(notice.regDate) }} </span>
                                <span class=" fw-light" > 조회 : {{ notice.readCount }} </span>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 align-self-center text-end">댓글 : 17</div>
                    <div class="divider mb-3"></div>
                    <div class="text-secondary">
                        {{ notice.content }}
                    </div>
                    <div class="divider mt-3 mb-3"></div>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">글목록</button>
                        <button type="button" class="btn btn-outline-success mb-3 ms-1" v-show="notice.sameUser || notice.admin" @click="moveModify">글수정</button>
                        <button type="button" class="btn btn-outline-danger mb-3 ms-1" v-show="notice.sameUser || notice.admin" @click="onDeleteArticle">글삭제</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
