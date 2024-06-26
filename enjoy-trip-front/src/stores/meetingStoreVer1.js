import { ref, reactive, isRef } from 'vue'
import { defineStore } from 'pinia'
import http from '@/common/axios-config.js'

export const useMeetingStoreVer1 = defineStore('meetingStoreVer1', () => {
    const meetingList = reactive([])
    const myMeetingList = reactive([])
    const myMeetingList2 = reactive([])
    const searchOptions = reactive({
        searchTitle: '',
        searchAddr: '',
        meetingStartDate: '',
        meetingEndDate: '',
        meetingPassword: '',
        maxPeople: ''
    })
    const listOption = reactive({
        limit: 10,
        offset: 0
    })
    const page = ref(1)

    const meeting = ref({
        meetingId: 0,
        userId: 0,
        userName: '',
        title: '',
        content: '',
        meetingPassword: '',
        attractionId: 0,
        meetingStartDate: '',
        meetingEndDate: '',
        thumbnailUrl: '',
        userProfileImageUrl: '',
        maxPeople: 0
    })

    const participants = ref([''])
    const oneParti = reactive({
        meetingId: 0,
        userId: 0,
        authority: ''
    })

    //검색 옵션이 존재하는지 확인...
    function isEmptyOptions(options) {
        let flag = true
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                if (options[key] != '') {
                    flag = false
                }
            }
        }
        if (flag) return true
        return false
    }

    //무한스크롤 + 10개씩 데이터 가져오기 ( limit 10 으로 해뒀음)
    const loadItems = async (searchOptions) => {
        let url
        if (isEmptyOptions(searchOptions)) {
            url = `/meeting/posts`
            url += `?limit=${listOption.limit}&offset=${listOption.offset}`
        } else {
            url = `/meeting/posts/search`
            url += `?limit=${listOption.limit}&offset=${listOption.offset}`
            url += `&searchTitle=${searchOptions.searchTitle}&searchAddr=${searchOptions.searchAddr}`
            url += `&meetingStartDate=${searchOptions.meetingStartDate}&meetingEndDate=${searchOptions.meetingEndDate}`
            url += `&maxPeople=${searchOptions.maxPeople}&meetingPassword=${searchOptions.meetingPassword}`
        }
        // console.log(searchOptions)
        // console.log(isEmptyOptions(searchOptions))
        try {
            let { data } = await http.get(url)
            console.log(url)
            console.log(data)
            if (data.result == 'success') {
                console.log(data.list.length)
                page.value += 1
                meetingList.push(...data.list)
                listOption.offset += listOption.limit
                console.log(meetingList, 'meetingListdd')
            } else {
                return false
            }
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
                meeting.value = data.meetingDetail.meetingDto
                participants.value = data.meetingDetail.partiList
                console.log(participants.value, 'partiData')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const registMeeting = async (meeting) => {
        try {
            await http.post(`/meeting/posts`, meeting).then((response) => {
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

    const modifyMeeting = async (meeting) => {
        try {
            await http.put(`/meeting/posts`, meeting).then((response) => {
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

    //모임 삭제
    const deleteMeeting = async (meetingId) => {
        try {
            let { data } = await http.delete(`/meeting/posts/${meetingId}`)
            console.log(data)
            if (data.result == 'success') {
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
    const joinMeeting = async (userId) => {
        try {
            //만약 현재 detail로 열어놓은 소모임에 비밀번호가 있으면 권한은 write, 아니면 read (임시로직)
            oneParti.authority = meeting.value.meetingPassword == null ? 'READ' : 'WRITE'
            //이 소모임에 가입하는 대상은 지금 로그인한 사용자
            oneParti.userId = userId
            //현재 소모임의 아이디
            oneParti.meetingId = meeting.value.meetingId

            console.log(oneParti)
            let { data } = await http.post(`/participants`, oneParti)
            console.log(data)
            if (data.result == 'success') {
                alert('모임에 가입되었습니다!!')
            } else {
                alert('가입에 실패했습니다.')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getSpecificUserMeeting = async (userId) => {
        try {
            let { data } = await http.get(`/meeting/write/${userId}`)
            if (data.result == 'success') {
                page.value += 1
                const processedMeetingList = data.meetingList.map((meeting) => {
                    return {
                        ...meeting,
                        firstImage: meeting.firstImage ? meeting.firstImage : ''
                    }
                })

                myMeetingList.value = processedMeetingList
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getMyMeeting = async (userId) => {
        try {
            let { data } = await http.get(`/meeting/my-meeting/${userId}`)
            if (data.result == 'success') {
                page.value += 1
                const processedMeetingList = data.meetingList.map((meeting) => {
                    return {
                        ...meeting,
                        firstImage: meeting.firstImage ? meeting.firstImage : ''
                    }
                })

                myMeetingList2.value = processedMeetingList
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
        }
    }

    const withdrawParticipant = async (userId, meetingId) => {
        const url = `/participants/${userId}/${meetingId}`

        try {
            let { data } = await http.delete(url)
            console.log(data)
            if (data.result == 'success') {
                clearMeeting()
                meetingList.length = 0
                listOption.offset = 0
                loadItems()
            } else {
                console.log('소모임 탈퇴 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteMeetingImage = async (imageUrl) => {
        try {
            let { data } = await http.get(`/meeting/delete-image/${imageUrl}`)
            console.log(data)
            if (data.result == 'success') {
                console.log('이미지 삭제 성공')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const clearMeeting = () => {
        meeting.value.meetingId = 0
        meeting.value.userId = 0
        meeting.value.userName = ''
        meeting.value.userProfileUrl = ''
        meeting.value.title = ''
        meeting.value.content = ''
        meeting.value.meetingPassword = ''
        meeting.value.attractionId = 0
        meeting.value.meetingStartDate = ''
        meeting.value.meetingEndDate = ''
        meeting.value.thumbnailUrl = ''
    }

    const clearList = () => {
        meetingList.length = 0
    }

    return {
        loadItems,
        page,
        meetingList,
        myMeetingList,
        myMeetingList2,
        getDetail,
        meeting,
        deleteMeeting,
        participants,
        joinMeeting,
        registMeeting,
        modifyMeeting,
        clearMeeting,
        getSpecificUserMeeting,
        getMyMeeting,
        withdrawParticipant,
        deleteMeetingImage,
        searchOptions,
        listOption,
        clearList
    }
})
