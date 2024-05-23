<template>
    <div class="container" style="background-color: white; border-radius: 100px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div class="row justify-content-center ">
            <div class="col-lg-10">
                <h2 class="bm-hanna-pro"style="padding-top: 3.5vmax;  text-align: left;">
                    📜 {{ communityStore.community.communityId }}번째 게시글
                </h2>
            </div>
            <hr />
            
            <div style="border-bottom: 2px solid #666; width:82%" />
            <div class="col-lg-10 text-start" style="padding-top: 1.5vmax">
                <div class="row">
                    <div>
                        <div class="d-flex align-items-center" >
                            <img
                                v-if="communityStore.community.userProfileImageUrl !== 'default'"
                                :src="communityStore.community.userProfileImageUrl"
                                alt="User Profile Image"
                                class="avatar-md rounded-circle"
                            />
                            <img v-else src="@/assets/default-user.png" alt="User Profile Image" class="avatar-md rounded-circle" />
                            <p class="ms-3 mb-0 bm-hanna-pro">
                                <span style="color: #222; font-size: 1.6vmax;">{{ communityStore.community.title }}</span> <br />
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
                    <div style="border-bottom: 2px solid #666; width:100%" />
                    <!-- <div class="col-md-4 align-self-center text-end">댓글 : 17</div> -->
                    <div class="divider mb-3"></div>
                    <div style="color: black; font-size: 1.2vmax; " class="bm-eulji" v-html="communityStore.community.content"></div>
                    <div class="divider mt-3 mb-3"></div>
                    <div class="d-flex justify-content-end">
                        <button v-if="communityStore.community.sameUser" type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">수정</button>
                        <button v-if="communityStore.community.sameUser" type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteArticle">삭제</button>
                        &nbsp;<button type="button" class="btn btn-outline-primary mb-3" @click="moveList">목록</button>
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
const { communityStore, getCommunityDetail, deleteCommunity, hitCommunity, deleteCommunityImage } = useCommunityStore()
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

const onDeleteCommunityImage = async () => {
    // meeting.content에서 이미지 URL 추출
    const content = communityStore.community.content
    const imageUrls = [...content.matchAll(/<img[^>]+src="([^">]+)"/g)].map((match) => match[1])

    // URL에서 파일 이름만 추출
    const fileNames = imageUrls
        .map((url) => {
            const match = url.match(/community\/([^/]+)$/)
            return match ? match[1] : null
        })
        .filter((fileName) => fileName !== null) // null 값 필터링

    // 각 이미지 URL을 삭제
    for (const fileName of fileNames) {
        console.log(fileName)
        await deleteCommunityImage(fileName)
    }
}

async function onDeleteArticle() {
    await onDeleteCommunityImage()
    await deleteCommunity(communityId)
    moveList()
}
</script>

<style scoped>
.avatar-md {
    height: 5rem;
    width: 5vmax;
}

.rounded-circle {
    border-radius: 50px !important;
}
</style>
