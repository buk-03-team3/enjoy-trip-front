<script setup>
defineProps({ notice: Object })
import {formatDate} from "@/api/util"
</script>

<template>
    <tr class="text-center">
        <th scope="row">{{ notice.noticeId }}</th>
        <td class="text-start">
            <router-link :to="{ name: 'article-view', params: { noticeId: notice.noticeId } }" class="article-title link-dark">
                {{ notice.title }}
            </router-link>
        </td>
        <td>{{ notice.userName }}</td>
        <td>{{ notice.readCount }}</td>
        <td>{{ formatDate(notice.regDate) }}</td>
    </tr>
</template>

<style scoped>
a {
    text-decoration: none;
}
</style>
