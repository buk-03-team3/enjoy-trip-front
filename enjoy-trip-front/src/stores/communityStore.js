import { reactive } from 'vue'
import { defineStore } from 'pinia'
import http from '@/common/axios-config.js'

export const useCommunityStore = defineStore('communityStore', () => {
    const communityStore = reactive({
        communityList: [],
        community: {}
    })

    const getCommunityList = async (limit, offset, searchWord) => {
        try {
            const params = { limit, offset, searchWord }
            let { data } = await http.get(`/community`, { params })
            console.log(data)
            if (data.result === 'success') {
                communityStore.communityList = data.communityList
                console.log('커뮤니티 목록 조회 성공')
            } else {
                console.log('커뮤니티 목록 조회 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getCommunityDetail = async (communityId) => {
        try {
            const { data } = await http.get(`/community/${communityId}`)
            console.log(data.community)
            if (data.result == 'success') {
                communityStore.community = data.community
            } else {
                console.log('커뮤니티 상세 조회 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteCommunity = async (communityId) => {
        try {
            await http.delete(`/community/${communityId}`).then((response) => {
                if (response.data.result == 'success') alert('삭제 성공')
                else {
                    alert('서버 오류')
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const registCommunity = async () => {}

    const modifyCommunity = async (community) => {
        try {
            await http.put(`/community/${community.communityId}`, community).then((response) => {
                let msg = '글수정 처리시 문제 발생했습니다.'
                if (response.status == 200) {
                  return "success"
                } else {
                  return "fail"
                }
                alert(msg)
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    return { communityStore, getCommunityList, getCommunityDetail, deleteCommunity, registCommunity, modifyCommunity }
})
