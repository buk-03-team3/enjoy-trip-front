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
                    <h2 class="text-secondary px-5">{{ communityStore.community.communityId }}. {{ communityStore.community.title }}</h2>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="clearfix align-content-center">
                            <img class="avatar me-2 float-md-start bg-light p-2" src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
                            <p>
                                <span class="fw-bold">굿</span> <br />
                                <span class="text-secondary fw-light"> {{ communityStore.community.registerTime }}1 조회 : {{ communityStore.community.readCount }} </span>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 align-self-center text-end">댓글 : 17</div>
                    <div class="divider mb-3"></div>
                    <div class="text-secondary">
                        {{ communityStore.community.content }}
                    </div>
                    <div class="divider mt-3 mb-3"></div>
                    <div class="d-flex justify-content-end">
                        <button v-if="communityStore.community.sameUser" type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">수정</button>
                        <button v-if="communityStore.community.sameUser" type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteArticle">삭제</button>
                        <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">목록</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommunityStore } from '../../stores/communityStore'

const route = useRoute()
const router = useRouter()

const { communityId } = route.params
const { communityStore, getCommunityDetail } = useCommunityStore()


onMounted(() => {
    getCommunity()
})

const getCommunity = () => {
    getCommunityDetail(communityId)
}

function moveList() {
    router.push({ name: 'community-list' })
}

function moveModify() {
    router.push({ name: 'community-modify', params: { communityId } })
}

function onDeleteArticle() {
    communityStore.deleteCommunity(communityId, () => {
        moveList()
    })
}
</script>

<style scoped></style>
