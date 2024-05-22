import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import http from '@/common/axios-config.js'
import { dasherize } from 'i/lib/methods'

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
    /*
 startPageIndex, endPageIndex, prev, next 
*/
    //페이지네이션을 위한
    const startPageIndex = ref('')
    const endPageIndex = ref('')
    const prev = ref('')
    const next = ref('')

    //페이지네이션 끝

    const notices = reactive({
        list: [],
        limit: 10,
        offset: 0,
        searchWord: '',
        searchOption: '',

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

    const setOffset = (currentPageIndex) => {
        notices.offset = notices.listRowCount * (currentPageIndex - 1)
    }

    const searchList = async () => {
        notices.offset = 0
        let params = {
            limit: notices.limit,
            offset: notices.offset,
            searchWord: notices.searchWord,
            searchOption: notices.searchOption
        }

        try {
            let { data } = await http.get('/notice/boards', { params }) // params: params shorthand property, let response 도 제거
            console.log('noticeStore: data : ')
            console.log(data)
            if (data.result == 'login') {
                router.push('/login')
            } else if (data.result == 'success') {
                notices.list = data.noticeList
                totalListCount()
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
    const noticeList = async () => {
        setOffset(notices.currentPageIndex)
        console.log(notices.searchWord)
        let params = {
            limit: notices.limit,
            offset: notices.offset,
            searchWord: notices.searchWord,
            searchOption: notices.searchOption
        }

        try {
            let { data } = await http.get('/notice/boards', { params }) // params: params shorthand property, let response 도 제거
            console.log('noticeStore: data : ')
            console.log(data)
            if (data.result == 'login') {
                router.push('/login')
            } else if (data.result == 'success') {
                notices.list = data.noticeList
                totalListCount()
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

    const totalListCount = async () => {
        let { data } = await http.get('/notice/noticeListTotalCnt?searchWord=' + notices.searchWord + '&searchOption=' + notices.searchOption)
        try {
            if (data.result == 'success') {
                console.log(data.totalCnt)
                notices.totalListItemCount = data.totalCnt
            } else {
                alert('글 전체 개수를 조회하는 중 오류가 발생했습니다.')
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

    const noticeInsert = async (article) => {
        notice.value = article
        console.log('아티클: ', article.content)
        try {
            let { data } = await http.post('/notice/boards', notice.value)
            if (data.result == 'login') {
                router.push('/login')
            } else if (data.result == 'success') {
                console.log('글 등록 성공 ')
                noticeList()
            } else {
                alert('글 등록 중 오류가 발생했습니다.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const noticeUpdate = async () => {
        try {
            let { data } = await http.put('/notice/boards', notice.value)
            if (data.result == 'login') {
                router.push('/login')
            } else if (data.result == 'success') {
                console.log('글 수정 성공 ')
                noticeList()
            } else {
                alert('글 수정 중 오류가 발생했습니다.')
            }
        } catch (error) {
            console.log(error)
        }
    }


       const hitNotice = async () => {
           try {
               await http.put(`/notice/hit/${notice.value.noticeId}`).then((response) => {
                   if (response.status == 200) {
                       return 'success'
                   } else {
                       return 'fail'
                   }
               })
           } catch (error) {
               console.error(error)
           }
       }

       return { noticeList, notices, noticeDetail, notice, noticeDelete, noticeInsert, noticeUpdate, searchList, hitNotice }
})
