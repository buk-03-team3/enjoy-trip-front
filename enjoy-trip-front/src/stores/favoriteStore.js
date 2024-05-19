// src/stores/authStore.js

import { reactive } from 'vue'
import { defineStore } from 'pinia'
import http from '@/common/axios-config.js'

export const useFavoriteStore = defineStore('favoriteStore', () => {
    const favoriteStore = reactive({
        favoriteList: []
    })

    const getFavoriteList = async (userId) => {
        try {
            let { data } = await http.get(`/favorite/${userId}`)
            console.log(data)
            if (data.result === 'success') {
                favoriteStore.favoriteList = data.list
                console.log('즐겨찾기 목록 조회 성공')
            } else {
                console.log('즐겨찾기 목록 조회 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteFavorite = async (favoriteId) => {
        try {
            let { data } = await http.delete(`/favorite/${favoriteId}`)
            if (data.result === 'success') {
                console.log('즐겨찾기 삭제 성공')
                // 여기서 해당 아이템을 즐겨찾기 목록에서 삭제하는 로직을 추가
            } else {
                console.log('즐겨찾기 삭제 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { favoriteStore, getFavoriteList, deleteFavorite }
})
