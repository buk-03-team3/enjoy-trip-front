<script setup>
import BoardFormItem from './item/BoardFormItem.vue'
import { useNoticeStore } from '@/stores/noticeStore'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore';
const noticeStore = useNoticeStore();
const { notice } = storeToRefs(noticeStore)
const { authStore } = useAuthStore()
notice.value = {
    'userId': authStore.userId,
    'title': ' ',
    'content': ' '
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    <mark class="sky">글쓰기</mark>
                </h2>
            </div>
            <div class="col-lg-10 text-start">
                <BoardFormItem type="regist" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
