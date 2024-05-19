<script setup>
import { ref, computed } from 'vue';

const arr = ref(Array.from({ length: 50 }, (_, i) => i + 1));
const pagenationCnt = ref(5);
const currentPage = ref(1);
const maxButtonInPage = ref(5);
const totalData = arr.value.length;

const maxPage = computed(() => Math.ceil(totalData / pagenationCnt.value));

const getData = () => {
    const startIndex = (currentPage.value - 1) * pagenationCnt.value;
    const endIndex = startIndex + pagenationCnt.value;
    return arr.value.slice(startIndex, endIndex);
};

const prevEvent = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};

const nextEvent = () => {
    if (currentPage.value < maxPage.value) {
        currentPage.value += 1;
    }
};

const getPageNumbers = () => {
    const totalButtons = Math.min(maxPage.value, maxButtonInPage.value);
    const half = Math.floor(totalButtons / 2);
    let start = Math.max(1, currentPage.value - half);
    let end = Math.min(maxPage.value, start + totalButtons - 1);

    if (end - start < totalButtons - 1) {
        start = Math.max(1, end - totalButtons + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
</script>

<template>
<nav aria-label="Page navigation example">
    <ul id="searchResults" class="list-group">
        <li class="list-group-item py-3 mr-3 kakao-regular d-flex align-items-center" 
            v-for="data in getData()" :key="data">{{ data }}</li>
    </ul>
    <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="prevEvent">Previous</a>
        </li>
        <li class="page-item" v-for="page in getPageNumbers()" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === maxPage.value }">
            <a class="page-link" href="#" @click.prevent="nextEvent">Next</a>
        </li>
    </ul>
</nav>
</template>