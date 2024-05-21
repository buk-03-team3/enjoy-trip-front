<script setup>
import CommunityFormItem from './item/CommunityFormItem.vue'
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    <!-- <mark class="sky">글쓰기</mark> -->
                    글쓰기
                </h2>
            </div>
            <div class="col-lg-10 text-start">
                <CommunityFormItem type="regist" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
