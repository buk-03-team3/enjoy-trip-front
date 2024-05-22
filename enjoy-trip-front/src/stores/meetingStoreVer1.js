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

    const meeting = ref()
    const participants = ref([''])
    const oneParti = reactive({
        meetingId : '',
        userId: '',
        authority:''

    })
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

    const getDetail = async (meetingId) => {
        console.log(meetingId, 'meetingID')
        //동시성 문제가 있을 수도 있기 때문에 back에서 데이터를 가져오는 작업 있어야 함
        // userId만 떼서 활용
        try {
            let { data } = await http.get(`/meeting/posts/${meetingId}`)
            console.log(data)
            if (data.result == 'success') {
                console.log('소모임 상세보기 성공 ')
                meeting.value = data.meetingDetail.meetingDto
                participants.value = data.meetingDetail.partiList
                console.log(participants.value)
            } else {
                console.log('소모임 상세보기 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteMeeting = async (meetingId) => {
        try {
            let { data } = await http.delete(`/meeting/posts/${meetingId}`)
            console.log(data)
            if (data.result == 'success') {
                console.log('소모임 삭제 성공')
                meeting.value = ''
                meetingList.length = 0
                listOption.offset = 0
                loadItems()
            } else {
                console.log('소모임 삭제 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    // 소모임 참여하기 
    const joinMeeting = async (userId) =>{
        try {
            //만약 현재 detail로 열어놓은 소모임에 비밀번호가 있으면 권한은 write, 아니면 read (임시로직)
            oneParti.authority = meeting.value.meetingPassword == null ? "READ" : "WRITE"
            //이 소모임에 가입하는 대상은 지금 로그인한 사용자 
            oneParti.userId = userId;
            //현재 소모임의 아이디
            oneParti.meetingId = meeting.value.meetingId;

            console.log(oneParti);
            let { data } = await http.post(`/participants/join`,oneParti)
            console.log(data)
            if (data.result == 'success') {
                console.log('소모임 가입 성공')
                alert("모임에 가입되었습니다!!")

            } else {
                console.log('소모임 가입 실패')
                alert("가입에 실패했습니다.")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { loadItems, page, meetingList, getDetail, meeting, deleteMeeting, participants, joinMeeting }
})
