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
import CKEditor from '@ckeditor/ckeditor5-vue'

import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommunityStore } from '@/stores/communityStore'
import { useAuthStore } from '@/stores/authStore'

// import Upload Adapter
import UploadAdapter from '../../../api/uploadAdapter.js'

// Custom Upload Adapter Plugin function
function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader, '')
    }
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

</script>

<template>
    <div class="edit-container">
        <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="userid" class="form-label">작성자 ID</label>
            <input type="text" class="form-control " v-model="community.userId" placeholder="작성자ID" disabled style="color: black;"/>
        </div>
        <div class="mb-3">
            <label for="subject" class="form-label">제목</label>
            <input type="text" class="form-control" v-model="community.title" placeholder="제목" style="color: black;" />
        </div>
        
        <div class="mb-3">
            <ckeditor :editor="editor" v-model="community.content" :config="editorConfig" style="color: black;"></ckeditor>
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
</style>
