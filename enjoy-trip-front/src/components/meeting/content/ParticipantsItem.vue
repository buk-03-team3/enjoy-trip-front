<template>
    <div class="card " style="box-shadow: 0px 6px 10px 2px rgba(0, 0, 0, 0.1);">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div>
                    <img v-if="participant.userProfileImageUrl != 'default'" :src="participant.userProfileImageUrl" alt="User Profile Image" class="avatar-md rounded-circle" />
                    <img v-else src="@/assets/default-user.png" alt="User Profile Image" class="avatar-md rounded-circle" />
                </div>
                <div class="flex-1 ms-3">
                    <h5 class="font-size-16 mb-1 t-left" style="padding-top: 0.5vmax">
                        <p class="text-dark kakao-regular" style="margin-left: 5px; margin-bottom: 0; border-bottom: 1px solid; border-top: 1px solid; width: fit-content">{{ participant.name }}</p>
                    </h5>
                    <span class="mb-0">&nbsp;{{ participant.email }}</span>
                    <br/>
                    <span class="badge badge-question mb-0 t-left">{{ participant.authority }}</span>
                </div>
            </div>
            </div>
        </div>

</template>

<script setup>

defineProps({ participant: Object });

</script>

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
    margin-top:5%;
    display: inline-block;
    padding: 0.25em 0.6em;
    font-size: 75%;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border: solid;
    border-width: medium;
    border-radius: 15px;
}
</style>
