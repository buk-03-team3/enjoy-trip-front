<template>
    <!-- input text에 v:model 바인드로 searchWord 들 바인딩 하기 -->
    <!-- 바인딩 된 것들 파라미터로 store에 가져가기,, 또는 store에 있는 걸 직접 바인딩 -->
    <!-- 어떤 선택 버튼을 누를 지에 따라서 iuput text가 생겼다, 사라졌다..-->


        <div class="button-container container">
            <button @click="showInput(1)" :class="['custom-button', { active: searchOptions.searchTitle !='' || activeButton===1}] " class="ms-2">관광지</button>
            <button @click="showInput(2)" :class="['custom-button', { active: searchOptions.searchAddr !='' || activeButton === 2 }]" class="ms-2"> 주소</button>
            <button @click="showInput(3)" :class="['custom-button', { active: searchOptions.maxPeople !='' || activeButton === 3 }]" class="ms-2">인원</button>
            <button @click="showInput(4)" :class="['custom-button', { active: searchOptions.meetingPassword || activeButton === 4 }]" class="ms-2">공개범위</button>
            <button @click="showInput(5)" :class="['custom-button', { active: searchOptions.meetingStartDate || activeButton === 5 }]" class="ms-2">시작일</button>
            <button @click="showInput(6)" :class="['custom-button', { active: searchOptions.meetingEndDate || activeButton === 6 }]" class="ms-2">종료일</button>
        </div>
        <div class="container">
        <input v-if="activeButton === 1" type="text" class="custom-input show" v-model="searchOptions.searchTitle" placeholder="관광지 이름으로 검색">
        <input v-if="activeButton === 2" type="text" class="custom-input show" v-model="searchOptions.searchAddr" placeholder="주소로 검색">
        <input v-if="activeButton === 3" type="text" class="custom-input show" v-model="searchOptions.maxPeople" placeholder="최대 인원">
        <div  v-if="activeButton === 4" type="text" class="show custom-input" >
           <button v-if="activeButton === 4" v-bind:class="['password-button custom-button', { active: searchOptions.meetingPassword }]"
            @click="searchOptions.meetingPassword = !searchOptions.meetingPassword"> {{ searchOptions.meetingPassword ? '비밀방' : '일반방' }}</button>
        </div>        
        <div  v-if="activeButton === 5" type="text" class="custom-input show col-md-3" >
            <label for="userid" class="form-label">시작일</label>
            <VueDatePicker v-model="formatStartDate" :format="startFormat" locale="kr" cancel-text="취소" select-text="선택"></VueDatePicker>
        </div>

        <div v-if="activeButton ===6" type="text" class="custom-input show col-md-3">
                <label for="userid" class="form-label">종료일</label>
                <VueDatePicker v-model="formatEndDate" v-if="activeButton === 6" type="text" :format="endFormat" locale="kr" cancel-text="취소" select-text="선택"></VueDatePicker>
         </div>       
    </div>
            <button class="btn btn-primary" @click="search">검색</button>



</template>
<script setup>

import {ref, onMounted, reactive} from 'vue'
import { useMeetingStoreVer1 } from '@/stores/meetingStoreVer1'
import { useRouter } from 'vue-router'
const router = useRouter()
const formatStartDate = ref('')
const formatEndDate = ref('')
// DatePicker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const meetingStore = useMeetingStoreVer1();
const startFormat = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    formatStartDate.value = `${year}-${month}-${day}`
    searchOptions.meetingStartDate = formatStartDate;
    return `${year}년 ${month}월 ${day}일`
}
const endFormat = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    formatEndDate.value = `${year}-${month}-${day}`
    searchOptions.meetingEndDate = formatEndDate;
    return `${year}년 ${month}월 ${day}일`
}


    const searchOptions = reactive({
        searchTitle: '',
        searchAddr: '',
        meetingStartDate: '',
        meetingEndDate: '',
        meetingPassword: '',
        maxPeople: ''
    })


const activeButton = ref(1)
const showInput = function (buttonNumber) {
    console.log(searchOptions)
    this.activeButton = buttonNumber
};


const search = async () => {
    console.log(meetingStore.meetingList);
    meetingStore.listOption.offset = 0;
    meetingStore.clearList();
    meetingStore.searchOptions = searchOptions;
    await meetingStore.loadItems(searchOptions)
    console.log(meetingStore.meetingList);
    router.push({ name: 'meeting-list' })

}
</script>

<style scoped>        
body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .button-container {
            display: flex;
            gap: 10px;
        }

        .custom-button {
            padding: 10px 17px;
            border: 1px solid #ccc;
            border-radius: 20px;
            background-color: #f0f0f0;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
        }

        .custom-button.active {
            background-color: rgb(81, 189, 165);
            color: white;
        }

         .password-button.active {
            background-color: rgba(105, 22, 160, 0.719);
            color: white;
        }

        .custom-input {
          margin-top: 20px;
            width: calc(100% - 60px - 20px); /* 세 개의 버튼이 차지하는 너비와 간격을 계산 */
            max-width: 600px; /* 최대 너비를 설정하여 화면에 맞추기 */
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 10px; /* 입력 필드의 모서리를 덜 깎음 */
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* 안쪽 그림자 */
        }

        .custom-password {
             margin-top: 20px;
            width: calc(100% - 60px - 20px); /* 세 개의 버튼이 차지하는 너비와 간격을 계산 */
            max-width: 600px; /* 최대 너비를 설정하여 화면에 맞추기 */
            padding: 10px;
    
            border-radius: 10px; /* 입력 필드의 모서리를 덜 깎음 */
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* 안쪽 그림자 */
        }

        .custom-input.show {
            display: block;
        }
</style>