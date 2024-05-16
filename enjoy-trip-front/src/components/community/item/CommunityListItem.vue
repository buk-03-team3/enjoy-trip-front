<script setup>
defineProps({ article: Object })
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div>
                    <!-- 유저 썸네일 -->
                    <img src="../../../../assets/img/default.png" alt class="avatar-md rounded-circle " /> 
                </div>
                <div class="flex-1 ms-3">
                    <h5 class="font-size-16 mb-1 t-left" style="padding-top: 0.5vmax;"><p class="text-dark kakao-regular" style="margin-bottom: 0">{{article.userId}}</p></h5>
                    <span class="badge badge-soft-success mb-0 t-left">{{article.createdAt}}</span>
                </div>
            </div>
            <div class="mt-3 pt-1">
                <p class="text-muted mb-0 t-left" style="margin-left: 1vmax;">
                    <router-link :to="{ name: 'article-view', params: { articleno: article.articleNo } }" class="link-dark subject-text kakao-bold">
                        {{ article.subject }}
                    </router-link>
                </p>
                <p class="text-muted mb-0">
                    
                    {{ article.content }}
                </p>
            </div>
            <div class="d-flex flex-column pt-4">
                <!-- 버튼과 조회수를 세로로 정렬 -->
                
                <div class="text-muted ml-auto inline-block; text-align: right;">
                    <!-- 조회수를 오른쪽으로 정렬 -->
                    조회수: {{ article.views }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
}

.subject-text {
    font-size: 1.5vmax;
    text-align: left;

}

.t-left {
    text-align: left
}
</style>
