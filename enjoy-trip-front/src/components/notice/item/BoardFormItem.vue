<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNoticeStore } from '@/stores/noticeStore'

const  noticeStore  = useNoticeStore();
const router = useRouter()
const route = useRoute()
const props = defineProps({ type: String })

const { notice } = storeToRefs(noticeStore)

if (props.type === 'modify') {
    let { noticeId } = route.params
    console.log(noticeId + '번글 얻어와서 수정할거야')
}

const subjectErrMsg = ref('')
const contentErrMsg = ref('')
watch(
    () => notice.value.title,
    (value) => {
        let len = value.length
        if (len == 0 || len > 30) {
            subjectErrMsg.value = '제목을 확인해 주세요!!!'
        } else subjectErrMsg.value = ''
    },
    { immediate: true }
)
watch(
    () => notice.value.content,
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

    if (subjectErrMsg.value) {
        alert(subjectErrMsg.value)
    } else if (contentErrMsg.value) {
        alert(contentErrMsg.value)
    } else {
        props.type === 'regist' ? writeArticle() : updateArticle()
    }
}

function writeArticle() {
    
    noticeStore.noticeInsert(notice.value);
    moveList();

}

function updateArticle() {
    console.log(notice.value.noticeId + '번글 수정하자!!', notice.value)
    noticeStore.noticeUpdate();
    alert("글이 수정되었습니다. ")
    router.replace({name: 'article-view'})
}

function moveList() {
    router.replace({ name: 'article-list' })
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="userid" class="form-label">작성자 ID : </label>
            <input type="text" class="form-control" v-model="notice.userId" disabled placeholder="작성자ID..." />
        </div>
        <div class="mb-3">
            <label for="subject" class="form-label">제목 : </label>
            <input type="text" class="form-control" v-model="notice.title" placeholder="제목..." />
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">내용 : </label>
            <textarea class="form-control" v-model="notice.content" rows="10"></textarea>
        </div>
        <div class="col-auto text-center">
            <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">글작성</button>
            <button type="submit" class="btn btn-outline-success mb-3" v-else>글수정</button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">목록으로이동...</button>
        </div>
    </form>
</template>

<style scoped></style>
