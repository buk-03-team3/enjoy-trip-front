<template>
    <div class="container">
        <div class="row justify-content-center">
            <!-- <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    {{ communityStore.community.title }}
                </h2>
            </div> -->
            <div class="col-lg-10 text-start">
                <div class="row">
                    <div>
                        <div class="d-flex align-items-center">
                            <img
                                v-if="communityStore.community.userProfileImageUrl !== 'default'"
                                :src="communityStore.community.userProfileImageUrl"
                                alt="User Profile Image"
                                class="avatar-md rounded-circle"
                            />
                            <img v-else src="@/assets/default-user.png" alt="User Profile Image" class="avatar-md rounded-circle" />
                            <p class="ms-3 mb-0 bm-hanna-pro">
                                <span style="color: #222; font-size: 2vmax;">{{ communityStore.community.title }}</span> <br />
                            </p>
                            <p class="ms-auto mb-0">
                                <span>{{ formatDate(communityStore.community.regDt) }} 작성</span>
                                <br />
                                <span style="text-align: right">조회 : {{ communityStore.community.readCount }}</span>
                            </p>
                        </div>
                        <br />
                    </div>
                    <hr />
                    <!-- <div class="col-md-4 align-self-center text-end">댓글 : 17</div> -->
                    <div class="divider mb-3"></div>
                    <div style="color: #222; font-size: 1.2vmax; border: 1px solid; " class="bm-hanna-air" v-html="communityStore.community.content"></div>
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
import { formatDate } from '../../api/util.js'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommunityStore } from '../../stores/communityStore'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()

const { communityId } = route.params
const { communityStore, getCommunityDetail, deleteCommunity, hitCommunity } = useCommunityStore()
const { authStore } = useAuthStore()

onMounted(() => {
    getCommunity()
    hitCommunity();
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
    deleteCommunity(communityId)
    moveList()
}
</script>

<style scoped>
.avatar-md {
    height: 4rem;
    width: 4vmax;
}

.rounded-circle {
    border-radius: 50% !important;
}
</style>
