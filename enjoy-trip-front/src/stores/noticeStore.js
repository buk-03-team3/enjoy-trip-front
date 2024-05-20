import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import http from '@/common/axios-config.js'

export const useNoticeStore = defineStore('noticeStore', () => {
    const router = useRouter()
    const notice = ref({
        title: '',
        content: '',
        noticeId: '',
        readCount: '',
        regDate: '',
        userId: '',
        userName: '',
        userProfileImageUrl: ''
    })
    const notices = reactive({
        list: [],
        limit: 10,
        offset: 0,
        searchWord: '',

        // pagination
        listRowCount: 10,
        pageLinkCount: 10,
        currentPageIndex: 1,
        totalListItemCount: 0,

        // detail, update, delete
        boardId: 0,
        title: '',
        content: '',
        userName: '',
        regDate: '',
        regTime: '',
        readCount: 0,
        fileList: [],
        sameUser: false,
        admin: false
    })
    const noticeList = async () => {
        let params = {
            limit: notices.limit,
            offset: notices.offset,
            searchWord: notices.searchWord
        }

        try {
            let { data } = await http.get('/notice/boards', { params }) // params: params shorthand property, let response 도 제거
            console.log('noticeStore: data : ')
            console.log(data)
            if (data.result == 'login') {
                router.push('/login')
            } else if (data.result == 'success') {
                notices.list = data.noticeList
                // noticeStore.limit = data.result.noticeList
                // setBoardList(dataList.list)
                // setTotalListItemCount(dataList.count)
            } else {
                alert('글 조회 중 오류가 발생했습니다.')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const noticeDetail = async (noticeId) => {
        try {
            console.log(noticeId)
            let { data } = await http.get(`/notice/boards/${noticeId}`) // params: params shorthand property, let response 도 제거
            console.log('noticeStore: data : ')
            console.log(data)
            if (data.result == 'login') {
                router.push('/login')
            } else if (data.result == 'success') {
                notice.value = data.noticeDto
                console.log(notice.value)
            } else {
                alert('글 상세보기 중 오류가 발생했습니다.')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const noticeDelete = async (noticeId) => {
        try {
            ///boards/{noticeId}
            let { data } = await http.delete(`/notice/boards/${noticeId}`)
            if (data.result == 'success') {
                alert('글 삭제 완료')
            } else {
                alert('글 삭제 중 오류가 발생했습니다.')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { noticeList, notices, noticeDetail, notice, noticeDelete }
})
