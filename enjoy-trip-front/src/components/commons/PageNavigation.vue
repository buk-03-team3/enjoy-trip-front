<script setup>
import { computed } from "vue";
import { useNoticeStore } from '@/stores/noticeStore'

const  noticeStore  = useNoticeStore();

const navigationSize = 10;

const startPage = computed(() => {
  return parseInt((noticeStore.notices.currentPageIndex - 1) / navigationSize) * navigationSize + 1;
});

const pageCount = computed(() => { 
    return Math.ceil(noticeStore.notices.totalListItemCount / noticeStore.notices.listRowCount)
})
  
const endPage = computed(() => {
  let tempEndPageIndex = 0;

  if (noticeStore.notices.currentPageIndex % navigationSize === 0) {
    tempEndPageIndex = noticeStore.notices.currentPageIndex;
  } else {
    tempEndPageIndex = Math.floor(noticeStore.notices.currentPageIndex / navigationSize)
      * navigationSize + navigationSize;
  }

  // endPageIndex가 전체 pageCount(페이지 전체 수)보다 크면 페이지 전체 수로 보정
  if (tempEndPageIndex > pageCount.value) tempEndPageIndex = pageCount.value;

  return tempEndPageIndex ;
});


function range(start, end) {
  const list = [];
  for (let i = start; i <= end; i++) list.push(i);
  return list;
  //   return Array(end - start + 1)
  //     .fill()
  //     .map((val, i) => start + i);
}

function onPageChange(pg) {
  console.log(pg + "로 이동!!!");
  noticeStore.notices.currentPageIndex = pg
  noticeStore.noticeList();
}
</script>

<template>
  <div class="row">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" @click="onPageChange(1)">최신 </a>
      </li>
      <template v-for="pg in range(startPage, endPage)" :key="pg">

        <li :class="noticeStore.notices.currentPageIndex == pg ? 'page-item active' : 'page-item'">
          <a class="page-link" @click="onPageChange(pg)">{{ pg }}</a>
        </li>
      </template>
      <li class="page-item"><a class="page-link" @click="onPageChange(endPage)">마지막</a></li>
    </ul>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
