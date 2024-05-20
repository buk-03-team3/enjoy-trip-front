<script setup>
defineProps({ community: Object })

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
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
                        <p class="text-dark kakao-regular" style="margin-bottom: 0">{{ community.name }}</p>
                    </h5>
                    <span class="badge badge-soft-success mb-0 t-left">{{ formatDate(community.regDt) }}</span>
                </div>
            </div>
            <div class="mt-3 pt-1">
                <p class="text-muted mb-0 t-left" style="margin-left: 1vmax">
                    <router-link :to="{ name: 'community-view', params: { communityId: community.communityId } }" class="link-dark subject-text kakao-bold">
                        {{ community.title }}
                    </router-link>
                </p>
                <p class="text-muted mb-0">
                    {{ community.content }}
                </p>
            </div>
            <div class="d-flex flex-column pt-4">
                <div class="text-muted ml-auto inline-block; text-align: right;">
                    조회수: {{ community.readCount }}
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
    color: #63ad6f !important;
    background-color: rgba(99, 173, 111, 0.1);
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
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.75rem;
}
</style>
