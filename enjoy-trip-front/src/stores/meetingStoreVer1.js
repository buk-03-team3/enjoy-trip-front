import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import http from '@/common/axios-config.js'

export const useMeetingStoreVer1 = defineStore('meetingStoreVer1', () => {
    const meetingList = reactive([])
    const searchOptions = reactive({
        searchTitle: '',
        searchAddr: '',
        meetingStartDate: '',
        meetingEndDate: ''
    })
    const listOption = reactive({
        limit: 10,
        offset: 0
    })
    const page = ref(1)

    //무한스크롤 + 10개씩 데이터 가져오기 ( limit 10 으로 해뒀음)
    const loadItems = async () => {
        try {
            let url = `/meeting/posts`
            url += `?limit=${listOption.limit}&offset=${listOption.offset}`
            url += `&searchTitle=${searchOptions.searchTitle}`
            url += `&searchAddr=${searchOptions.searchAddr}`
            url += `&meetingStartDate=${searchOptions.meetingStartDate}`
            url += `&meetingEndDate=${searchOptions.meetingEndDate}`

            let { data } = await http.get(url)
            console.log(url)
            console.log(data)
            if (data.result == 'success') {
                console.log(data.list.length)
                page.value += 1
                meetingList.push(...data.list)
                listOption.offset += listOption.limit
            } else {
                console.log('소모임 목록 조회 실패')
                return false
            }
            console.log('소모임 목록 조회 성공')
            if (data.list.length > listOption.limit) return false
            return true
        } catch (error) {
            console.error(error)
        }
    }

    return { loadItems, page, meetingList }
})
