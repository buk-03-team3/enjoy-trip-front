<script setup>
import MeetingFormItem from './content/MeetingFormItem.vue'
</script>

<template>
    <div class="container" style="z-index: -50">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center b">
                    <!-- <mark class="sky">글쓰기</mark> -->
                    소모임 모집 글 수정
                </h2>
            </div>
            <div class="col-lg-10 text-start">
                <MeetingFormItem type="modify" />
            </div>
        </div>
    </div>
</template>
