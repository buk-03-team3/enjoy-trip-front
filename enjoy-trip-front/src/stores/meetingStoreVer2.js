import { reactive } from 'vue'
import { defineStore } from 'pinia'
import http from '@/common/axios-config.js'

export const useMeetingStore = defineStore('meetingStore', () => {
    const meetingStore = reactive({
        meetingList: [],
        meeting: {}
    })

    const getMeetingList = async (limit, offset, searchWord) => {
        try {
            const params = { limit, offset, searchWord }
            let { data } = await http.get(`/meeting`, { params })
            console.log(data)
            if (data.result === 'success') {
                meetingStore.meetingList = data.meetingList
                console.log('커뮤니티 목록 조회 성공')
            } else {
                console.log('커뮤니티 목록 조회 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getMeetingDetail = async (meetingId) => {
        try {
            const { data } = await http.get(`/meeting/${meetingId}`)
            console.log(data.meeting)
            if (data.result == 'success') {
                meetingStore.meeting = data.meeting
            } else {
                console.log('커뮤니티 상세 조회 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteMeeting = async (meetingId) => {
        try {
            await http.delete(`/meeting/${meetingId}`).then((response) => {
                if (response.data.result == 'success') alert('삭제 성공')
                else {
                    alert('서버 오류')
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const registMeeting = async (meeting) => {
        try {
            await http.post(`/meeting`, meeting).then((response) => {
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
            await http.put(`/meeting/${meeting.meetingId}`, meeting).then((response) => {
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
    const clearMeeting = () => {
        meetingStore.meeting.userId = 0
        meetingStore.meeting.userName = ''
        meetingStore.meeting.title = ''
        meetingStore.meeting.content = ''
        meetingStore.meeting.meetingPassword = ''
        meetingStore.meeting.attractionId = 0
        meetingStore.meeting.meetingStartDate = ''
        meetingStore.meeting.meetingEndDate = ''
        meetingStore.meeting.thumbnailUrl = ''
        meetingStore.meeting.regDate = ''
    }

    return { meetingStore, getMeetingList, getMeetingDetail, deleteMeeting, registMeeting, modifyMeeting, clearMeeting }
})
