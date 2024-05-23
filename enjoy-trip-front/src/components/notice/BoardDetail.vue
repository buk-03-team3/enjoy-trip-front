<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNoticeStore } from '@/stores/noticeStore'
import { formatDate } from "@/api/util"
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const noticeStore = useNoticeStore()

const { noticeId } = route.params
const { notice } = storeToRefs(noticeStore)

const getArticle = async () => {
    await noticeStore.noticeDetail(noticeId);    
}

function moveList() {
    router.push({ name: 'article-list' })
}

function moveModify() {
    router.push({ name: 'article-modify', params: { noticeId } })
}

function onDeleteArticle() {
    noticeStore.noticeDelete(noticeId)
    moveList();
}

onMounted(() => {
    noticeStore.hitNotice()
    getArticle()
})

</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
        
            <div class="col-lg-8 text-start">
                <div class="row my-2">
                    <h2 class="text-secondary">{{  }}</h2>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="clearfix align-content-center">
                            <img class="avatar me-2 float-md-start bg-light p-2" src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
                            <p>
                                <h3 class="fw-bold">{{ notice.title }}</h3>
                                
                            </p>
                            
                        </div>
                    </div>
                    <div class="col-md-4 align-self-center text-end">
                        <span class="fw-light">{{ formatDate(notice.regDate) }}</span>&nbsp;&nbsp;&nbsp;
                                <span class="fw-light">조회: {{ notice.readCount }}</span>
                    </div>
                </div>
                <div class="divider mb-3"></div>
                <div class="bm-eulji">
                    {{ notice.content }}
                </div>
                <div class="divider mt-3 mb-3"></div>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-primary mb-3 me-1" @click="moveList">글 목록</button>
                    <button type="button" class="btn btn-outline-success mb-3 me-1" v-show="notice.sameUser" @click="moveModify">글 수정</button>
                    <button type="button" class="btn btn-outline-danger mb-3" v-show="notice.sameUser || notice.admin" @click="onDeleteArticle">글 삭제</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Adjusting styles to make it more visually appealing */
.sky {
    background-color: #87ceeb;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    color: #fff;
}
.avatar {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
}
.divider {
    border-top: 1px solid #ccc;
}
</style>
