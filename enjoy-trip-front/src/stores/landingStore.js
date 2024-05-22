import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '@/common/axios-config.js'

export const useLandingStore = defineStore('landingStore', () => {
    const landingStore = reactive({
        hotCommunityList: [],
        hotAttractionList: []
    })

    const getTopThreeCommunityList = async () => {
        try {
            let { data } = await http.get(`/community/communityListTop?limit=3`)
            console.log(data)
            if (data.result === 'success') {
                landingStore.hotCommunityList = data.communityList
                console.log('인기 게시글 목록 조회 성공')
            } else {
                console.log('인기 게시글 목록 조회 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getTopThreeAttractionList = async () => {
        try {
            const { data } = await http.get(`/travel/travelListTop`)
            console.log(data)
            if (data.result == 'success') {
                landingStore.hotAttractionList = data.travelList
                console.log('인기 관광지 목록 조회 성공')
            } else {
                console.log('인기 관광지 목록 조회 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { landingStore, getTopThreeAttractionList, getTopThreeCommunityList }
})
