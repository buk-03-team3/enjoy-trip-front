<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommunityStore } from '@/stores/communityStore'

const { communityStore, registCommunity, modifyCommunity } = useCommunityStore()

const router = useRouter()

const props = defineProps({ type: String })

const community = communityStore.community

const titleErrMsg = ref('')
const contentErrMsg = ref('')
watch(
    () => community.title,
    (value) => {
        let len = value.length
        if (len == 0 || len > 30) {
            titleErrMsg.value = '제목을 확인해 주세요!!!'
        } else titleErrMsg.value = ''
    },
    { immediate: true }
)

watch(
    () => community.content,
    (value) => {
        let len = value.length
        if (len == 0 || len > 500) {
            contentErrMsg.value = '내용을 확인해 주세요!!!'
        } else contentErrMsg.value = ''
    },
    { immediate: true }
)

function onSubmit() {
    // event.preventDefault();

    if (titleErrMsg.value) {
        alert(titleErrMsg.value)
    } else if (contentErrMsg.value) {
        alert(contentErrMsg.value)
    } else {
        props.type === 'regist' ? writeArticle() : updateArticle()
    }
}

function writeArticle() {
    console.log('글등록하자!!', community.value)
    registCommunity(
        community.value,
        (response) => {
            let msg = '글등록 처리시 문제 발생했습니다.'
            if (response.status == 201) msg = '글등록이 완료되었습니다.'
            alert(msg)
            moveList()
        },
        (error) => console.log(error)
    )
}

function updateArticle() {
    console.log(community.communityId + '번글 수정하자!!')
    let result = modifyCommunity(community)
    // moveList()
    // router.push({ name: "community-view" });
    let msg = '글 수정 처리 문제 발생'
    if(result = "success") {
        router.push(`/community/view/${community.communityId}`)
        msg = "글 수정 완료"
    } 
    alert(msg)
    
}

function moveList() {
    router.replace({ name: 'community-list' })
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="userid" class="form-label">작성자 ID : </label>
            <input type="text" class="form-control" v-model="community.userId" placeholder="작성자ID" disabled />
        </div>
        <div class="mb-3">
            <label for="subject" class="form-label">제목 : </label>
            <input type="text" class="form-control" v-model="community.title" placeholder="제목" />
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">내용 : </label>
            <textarea class="form-control" v-model="community.content" rows="10"></textarea>
        </div>
        <div class="col-auto text-center">
            <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">글 작성</button>
            <button type="submit" class="btn btn-outline-success mb-3" v-else>글 수정</button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">목록</button>
        </div>
    </form>
</template>

<style scoped></style>
