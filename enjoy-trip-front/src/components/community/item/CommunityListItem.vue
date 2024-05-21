<script setup>
defineProps({ community: Object });

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

function getCategoryClass(category) {
    switch (category) {
        case '여행 후기':
            return 'badge-travel-review';
        case '여행 팁':
            return 'badge-travel-tip';
        case '맛집':
            return 'badge-restaurant';
        case '질문':
            return 'badge-question';
        case '기타':
            return 'badge-others';
        default:
            return 'badge-default';
    }
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div>
                    <img v-if="community.userProfileImageUrl !== 'default'" :src="community.userProfileImageUrl" alt="User Profile Image" class="avatar-md rounded-circle" />
                    <img v-else src="@/assets/default-user.png" alt="User Profile Image" class="avatar-md rounded-circle" />
                </div>
                <div class="flex-1 ms-3">
                    <h5 class="font-size-16 mb-1 t-left" style="padding-top: 0.5vmax">
                        <p class="text-dark kakao-regular" style="margin-left: 5px; margin-bottom: 0; border-bottom: 1px solid; border-top: 1px solid; width: fit-content">{{ community.name }}</p>
                    </h5>
                    <span class="mb-0 t-left">&nbsp;{{ formatDate(community.regDt) }}</span>
                    &nbsp;
                    <span :class="['badge', getCategoryClass(community.category), 'mb-0', 't-left']">{{ community.category }}</span>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between mt-3 pt-1">
                <p class="text-muted mb-0 text-center flex-grow-1">
                    <router-link :to="{ name: 'community-view', params: { communityId: community.communityId } }" class="link-dark subject-text bm-eulji">
                        {{ community.title }}
                    </router-link>
                </p>
                <div class="text-muted ml-auto" style="text-align: right;">
                    <i class="bi bi-eye"></i> {{ community.readCount }}
                </div>
                <!-- <p class="text-muted mb-0">{{ community.content }}</p> -->
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
    text-align: left;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #eff0f2;
    border-radius: 1rem;
}

.avatar-md {
    height: 4rem;
    width: 4vmax;
}

.rounded-circle {
    border-radius: 50% !important;
}

.img-thumbnail {
    padding: 0.25rem;
    background-color: #f1f3f7;
    border: 1px solid #eff0f2;
    border-radius: 0.75rem;
}

.avatar-title {
    align-items: center;
    background-color: #3b76e1;
    color: #fff;
    display: flex;
    font-weight: 500;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.bg-soft-primary {
    background-color: rgba(59, 118, 225, 0.25) !important;
}

a {
    text-decoration: none !important;
}

.badge-soft-danger {
    color: #f56e6e !important;
    background-color: rgba(245, 110, 110, 0.1);
}

.badge-soft-success {
    color: #48ad59 !important;
    background-color: rgba(99, 173, 111, 0.1);
}

.badge-travel-review {
    color: #a79e4e; /* 더 진한 분홍 */
    background-color: #ffebb7;
}

.badge-travel-tip {
    color: #704a00; /* 더 진한 노랑 */
    background-color: #fdcbd7;
}

.badge-restaurant {
    color: #004d99; /* 더 진한 파랑 */
    background-color: #b5daff;
}

.badge-question {
    color: #228b22; /* 더 진한 초록 */
    background-color: #d0e8d8;
}

.badge-others {
    color: #8e15ac; /* 보라 */
    background-color: #d2baff;
}

.mb-0 {
    margin-bottom: 0 !important;
}

.badge {
    display: inline-block;
    padding: 0.25em 0.6em;
    font-size: 75%;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.75rem;
}
</style>
