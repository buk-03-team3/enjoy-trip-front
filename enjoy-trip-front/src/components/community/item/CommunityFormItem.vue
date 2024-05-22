<script setup>
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
import UploadAdapter, { deleteImageFromServer } from '../../../api/communityUploadAdapter.js'
import CKEditor from '@ckeditor/ckeditor5-vue'

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCommunityStore } from '@/stores/communityStore'
import { useAuthStore } from '@/stores/authStore'

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

const { communityStore, registCommunity, modifyCommunity } = useCommunityStore()
const { authStore } = useAuthStore()
const router = useRouter()

const props = defineProps({ type: String })

const community = communityStore.community

const titleErrMsg = ref('')
const contentErrMsg = ref('')
watch(
    () => community.title,
    (value) => {
        let len = value.length
        if (len == 0 || len > 30) {
            titleErrMsg.value = '제목을 확인해 주세요!!!'
        } else titleErrMsg.value = ''
    },
    { immediate: true }
)

watch(
    () => community.content,
    (value) => {
        let len = value.length
        if (len == 0 || len > 500) {
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
        props.type === 'regist' ? writeArticle() : updateArticle()
    }
}

function writeArticle() {
    let result = registCommunity(community)
    let msg = '글 등록 처리 문제 발생'
    if ((result = 'success')) {
        msg = '글 등록 완료'
        moveList()
    }
    alert(msg)
}

function updateArticle() {
    console.log(community.communityId + '번글 수정하자!!')
    let result = modifyCommunity(community)
    let msg = '글 수정 처리 문제 발생'
    if ((result = 'success')) {
        router.push(`/community/view/${community.communityId}`)
        msg = '글 수정 완료'
    }
    alert(msg)
}

function moveList() {
    router.replace({ name: 'community-list' })
}

const categories = ['여행 후기', '여행 팁', '맛집', '질문', '기타']
const categoryBtnText = ref('카테고리를 선택하세요')
let isActiveCategory = ref(false)

const categoryActiveChange = () => {
    console.log(isActiveCategory.value)

    isActiveCategory.value = !isActiveCategory.value
}

const selectCategory = (category) => {
    categoryBtnText.value = category
    isActiveCategory.value = false
    communityStore.community.category = categoryBtnText.value
}
</script>

<template>
    <div class="edit-container">
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label for="userid" class="form-label">작성자 ID</label>
                <input type="text" class="form-control" v-model="community.userId" placeholder="작성자ID" disabled style="color: black" />
            </div>
            <hr />
            <div class="select-menu">
                <label for="category" class="form-label">카테고리</label>
                <button type="button" class="select-btn" @click="categoryActiveChange($event)">
                    <span class="categoryBtnText">{{ categoryBtnText }}</span>
                    <i class="bx bx-chevron-down"></i>
                </button>

                <ul class="options" v-if="isActiveCategory">
                    <li class="option" v-for="category in categories" :key="category" @click="selectCategory(category, $event)">
                        <span class="option-text">{{ category }}</span>
                    </li>
                </ul>
            </div>
            <hr />
            <div class="mb-3">
                <input type="text" class="form-control" v-model="community.title" placeholder="제목" style="color: black" />
            </div>
            <hr />
            <div class="mb-3">
                <ckeditor :editor="editor" v-model="community.content" :config="editorConfig" style="color: black"></ckeditor>
            </div>

            <br />
            <div class="col-auto text-center">
                <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">글 작성</button>
                <button type="submit" class="btn btn-outline-success mb-3" v-else>글 수정</button>
                <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">목록</button>
            </div>
        </form>
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
