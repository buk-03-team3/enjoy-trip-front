<script setup>
// ckeditor
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { Link } from '@ckeditor/ckeditor5-link'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { Indent } from '@ckeditor/ckeditor5-indent'
import { List } from '@ckeditor/ckeditor5-list'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed'
import { Table, TableColumnResize, TableToolbar } from '@ckeditor/ckeditor5-table'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize } from '@ckeditor/ckeditor5-image'
import UploadAdapter, { deleteImageFromServer } from '../../../api/meetingImageUploadAdapter.js'
import CKEditor from '@ckeditor/ckeditor5-vue'

// vue, store
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMeetingStoreVer1 } from '@/stores/meetingStoreVer1.js'
import { useAuthStore } from '@/stores/authStore'
import { useTravelStore } from '@/stores/travelStore.js'

// DatePicker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const startDate = ref()
const endDate = ref()

let previousImages = []

function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        const uploadAdapter = new UploadAdapter(loader, '')
        return {
            upload: () => uploadAdapter.upload()
        }
    }

    editor.model.document.on('change:data', () => {
        const content = editor.getData()
        previousImages = detectRemovedImages(content)
    })
}

function detectRemovedImages(currentContent) {
    const imageUrlRegex = /<img[^>]+src="([^">]+)"/g
    const currentImages = []
    let match

    while ((match = imageUrlRegex.exec(currentContent)) !== null) {
        currentImages.push(match[1])
    }

    const removedImages = previousImages.filter((url) => !currentImages.includes(url))
    removedImages.forEach((url) => {
        const imageName = url.substring(url.lastIndexOf('/') + 1) // Extract the correct image name with UUID
        deleteImageFromServer(imageName)
    })

    return currentImages
}

function removeImageAttributes(content) {
    return content.replace(/<img([^>]*)\s(width="[^"]*")\s(height="[^"]*")([^>]*)>/g, '<img$1$4>')
}

const ckeditor = CKEditor.component
const editor = ClassicEditor
const editorConfig = {
    extraPlugins: [CustomUploadAdapterPlugin],
    plugins: [
        Essentials,
        Bold,
        Italic,
        Link,
        Paragraph,
        BlockQuote,
        Indent,
        List,
        Table,
        TableToolbar,
        TableColumnResize,
        TextTransformation,
        Alignment,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        ImageResize,
        MediaEmbed
    ],
    toolbar: {
        items: ['bold', 'italic', 'link', 'imageUpload', 'indent', 'outdent', 'numberedList', 'bulletedList', 'alignment', 'blockQuote', 'mediaEmbed', 'undo', 'redo', 'insertTable']
    },
    image: {
        toolbar: ['imageTextAlternative', 'toggleImageCaption', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side']
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    }
}

const meetingStore = useMeetingStoreVer1()
const { authStore } = useAuthStore()
const travelStore = useTravelStore()

const router = useRouter()
const props = defineProps({ type: String })
const titleErrMsg = ref('')
const contentErrMsg = ref('')

watch(
    () => meetingStore.meeting.title,
    (value) => {
        let len = value.length
        if (len == 0 || len > 30) {
            titleErrMsg.value = '제목을 확인해 주세요!!!'
        } else titleErrMsg.value = ''
    },
    { immediate: true }
)

watch(
    () => meetingStore.meeting.content,
    (value) => {
        let len = value.length
        if (len == 0 || len > 3000) {
            contentErrMsg.value = '내용을 확인해 주세요!!!'
        } else contentErrMsg.value = ''
    },
    { immediate: true }
)

function onSubmit() {
    if (titleErrMsg.value) {
        alert(titleErrMsg.value)
    } else if (contentErrMsg.value) {
        alert(contentErrMsg.value)
    } else {
        meetingStore.meeting.content = removeImageAttributes(meetingStore.meeting.content)
        props.type === 'regist' ? writeArticle() : updateArticle()
    }
}

function writeArticle() {
    let result = meetingStore.registMeeting(meetingStore.meeting)
    let msg = '글 등록 처리 문제 발생'
    if ((result = 'success')) {
        msg = '글 등록 완료'
        moveList()
    }
    alert(msg)
}

function updateArticle() {
    console.log(meetingStore.meeting.meetingId + '번글 수정하자!!')
    let result = meetingStore.modifyMeeting(meetingStore.meeting)
    let msg = '글 수정 처리 문제 발생'
    if ((result = 'success')) {
        router.push(`/meeting/view`)
        msg = '글 수정 완료'
    }
    alert(msg)
}

function moveList() {
    meetingStore.meeting.userId = authStore.userId
    meetingStore.meeting.userName = authStore.name
    meetingStore.meeting.userProfileImageUrl = authStore.userProfileImageUrl
    router.replace({ name: 'meeting-list' })
}

const startFormat = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${year}년 ${month}월 ${day}일`
}
const endFormat = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${year}년 ${month}월 ${day}일`
}

const search = async () => {
    travelStore.searchCategory = 'keyword'
    await travelStore.searchTravelKeyword()
    currentPage.value = 1
}

const isModalOpen = ref(false)
const currentAttractionName = ref('목적지를 검색해주세요!')

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const selectDestination = (name, id, image) => {
    currentAttractionName.value = name
    meetingStore.meeting.attractionId = id
    meetingStore.meeting.thumbnailUrl = image
    meetingStore.meeting.userProfileImageUrl = authStore.userProfileImageUrl
    isModalOpen.value = false
}

const currentPage = ref(1)
const itemsPerPage = 9

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return travelStore.travelList.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(travelStore.travelList.length / itemsPerPage)
})

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1
    }
}

const numbers = [2, 3, 4, 5, 6]
const numberBtnText = ref('인원 수를 정해주세요')
let isActiveNumber = ref(false)

const numberActiveChange = () => {
    console.log(isActiveNumber.value)

    isActiveNumber.value = !isActiveNumber.value
}

const selectNumber = (number) => {
    numberBtnText.value = number
    isActiveNumber.value = false
    meetingStore.meeting.maxPeople = numberBtnText.value
}
</script>

<template>
    <div class="edit-container">
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label for="userid" class="form-label">작성자</label>
                <!-- <input type="text" class="form-control" v-model="meeting.userId" placeholder="작성자 ID" disabled style="color: black" /> -->
                <input type="text" class="form-control" v-model="meetingStore.meeting.userName" placeholder="작성자 이름" disabled style="color: black" />
            </div>
            <hr />
            <div class="d-flex col-md-12">
                <div class="col-md-4">
                    <div>
                        <label for="userid" class="form-label">목적지</label>
                        <br />
                        <div class="d-flex">
                            <button type="button" class="btn btn-dark bm-hanna-air" @click.prevent="openModal">목적지 검색</button>
                            <button type="text" class="btn bm-hanna-air" style="font-size: 1.2vmax; color: black" disabled>{{ currentAttractionName }}</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-3">
                    <label for="userid" class="form-label">시작일</label>
                    <VueDatePicker v-model="meetingStore.meeting.meetingStartDate" :format="startFormat" locale="kr" cancel-text="취소" select-text="선택"></VueDatePicker>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-3">
                    <label for="userid" class="form-label">종료일</label>
                    <VueDatePicker v-model="meetingStore.meeting.meetingEndDate" :format="endFormat" locale="kr" cancel-text="취소" select-text="선택"></VueDatePicker>
                </div>
            </div>

            <hr />
            <div class="mb-3">
                <label for="userid" class="form-label">소모임 제목</label>
                <input type="text" class="form-control" v-model="meetingStore.meeting.title" placeholder="제목" style="color: black" />
            </div>
            <hr />
            <div class="select-menu">
                <label for="number" class="form-label">인원 수</label>
                <button type="button" class="select-btn" @click="numberActiveChange($event)">
                    <span class="numberBtnText">{{ numberBtnText }}</span>
                    <i class="bx bx-chevron-down"></i>
                </button>

                <ul class="options" v-if="isActiveNumber">
                    <li class="option" v-for="number in numbers" :key="number" @click="selectNumber(number, $event)">
                        <span class="option-text">{{ number }}</span>
                    </li>
                </ul>
            </div>
            <hr />

            <div class="mb-3">
                <label for="userid" class="form-label">참여 코드</label>
                <input type="password" class="form-control" v-model="meetingStore.meeting.meetingPassword" placeholder="소모임 참여코드" style="color: black" />
            </div>
            <hr />
            <div class="mb-3">
                <ckeditor :editor="editor" v-model="meetingStore.meeting.content" :config="editorConfig" style="color: black"></ckeditor>
            </div>
            <br />
            <div class="col-auto text-center">
                <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">글 작성</button>
                <button type="submit" class="btn btn-outline-success mb-3" v-else>글 수정</button>
                <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">목록</button>
            </div>
        </form>
    </div>
    <div :class="['modal-container', { show: isModalOpen }]" @click="closeModal">
        <div class="modal-window" @click.stop>
            <div class="card-container">
                <h2 class="kakao-bold" style="padding-bottom: 2vmax">목적지 검색</h2>
                <!-- 검색 시작 -->
                <div class="d-flex col-md-8">
                    <input type="text" class="col-md-8 form-control" v-model="travelStore.searchKeyword" placeholder="검색어 입력" style="color: black" />
                    <div class="col-md-1"></div>
                    <button @click="search" class="col-md-4 btn kakao-bold" style="background-color: #fee500; color: black; border-color: #fee500">검색</button>
                </div>
                <!-- 검색 끝 -->
                <!-- 검색 결과 시작 -->
                <div class="search-results mt-3">
                    <div class="d-flex flex-column">
                        <br />
                        <div class="d-flex justify-content-between mb-2">
                            <button
                                v-for="item in paginatedList.slice(0, 3)"
                                type="button"
                                class="btn btn-dark search-result-button-text"
                                @click="selectDestination(item.title, item.attractionId, item.firstImage)"
                            >
                                {{ item.title }}
                            </button>
                        </div>
                        <br />
                        <div class="d-flex justify-content-between mb-2">
                            <button
                                v-for="item in paginatedList.slice(3, 6)"
                                type="button"
                                class="btn btn-dark search-result-button-text"
                                @click="selectDestination(item.title, item.attractionId, item.firstImage)"
                            >
                                {{ item.title }}
                            </button>
                        </div>
                        <br />
                        <div class="d-flex justify-content-between">
                            <button
                                v-for="item in paginatedList.slice(6, 9)"
                                type="button"
                                class="btn btn-dark search-result-button-text"
                                @click="selectDestination(item.title, item.attractionId, item.firstImage)"
                            >
                                {{ item.title }}
                            </button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center mt-4">
                        <button @click="prevPage" :disabled="currentPage === 1" class="btn" style="background-color: #666; color: white">이전</button>

                        <button @click="nextPage" :disabled="currentPage >= totalPages" class="btn ms-3" style="background-color: #666; color: white">다음</button>
                    </div>
                </div>
                <!-- 검색 결과 끝 -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.ck-editor__main {
    min-height: 600px;
    height: 600px;
}
.ck-editor__editable {
    min-height: 600px !important;
    height: 600px;
}

.edit-container:deep(.ck-editor__editable) {
    min-height: 300px !important;
}

.edit-container:deep(.thumbnail-wrapper) {
    margin-top: 5px;
}

.edit-container:deep(.thumbnail-wrapper img) {
    width: 100px !important;
    margin-right: 5px;
    max-width: 100%;
}

.modal-container {
    z-index: -100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: visible;
    transition: 0.3s;
}

.modal-container.show {
    opacity: 1;
    visibility: visible;
    z-index: 100;
}

.modal-window {
    z-index: 100;
    position: relative;
    background: #ffffff;
    color: #000000;
    padding: 48px 40px;
    width: 700px;
    height: 500px;
    border-radius: 12px;
}

.search-result-button-text {
    color: white;
    font-size: 0.9vmax;
    border-radius: 30px;
}

.select-menu .select-btn {
    display: flex;
    height: 3rem;
    min-width: 15vmax;
    background: #fff;
    padding: 20px;
    font-size: 1vmax;
    font-weight: 400;
    border-radius: 8px;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.select-menu .options {
    position: absolute; /* 변경 */

    overflow-y: auto;
    max-height: 12rem;
    padding: 10px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation-name: fadeInDown;
    -webkit-animation-name: fadeInDown;
    animation-duration: 0.35s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.35s;
    -webkit-animation-fill-mode: both;
    width: 14vmax; /* 필요에 따라 너비 조정 */
    z-index: 1000; /* 가려지지 않도록 z-index 최상단으로 설정 */
}

.select-menu .options .option {
    display: flex;
    height: 3vmax;
    cursor: pointer;
    padding: 0 16px;
    border-radius: 8px;
    align-items: center;
    background: #fff;
}
.select-menu .options .option:hover {
    background: #f2f2f2;
}
.select-menu .options .option i {
    font-size: 1.4vmax;
    margin-right: 0.8vmax;
}
.select-menu .options .option .option-text {
    font-size: 1vmax;
    color: #333;
}

.select-btn i {
    font-size: 1.4vmax;
    transition: 0.3s;
}

.select-menu.active .select-btn i {
    border-color: green;
    transform: rotate(-180deg);
}
.select-menu.active .options {
    border-color: green;
    opacity: 0;
    z-index: 10;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-fill-mode: both;
}

@keyframes fadeInUp {
    from {
        transform: translate3d(0, 30px, 0);
    }
    to {
        border-color: green;
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
@keyframes fadeInDown {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        border-color: green;
        transform: translate3d(0, 20px, 0);
        opacity: 1;
    }
}
</style>
