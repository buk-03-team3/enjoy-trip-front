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

    const deleteFavorite = async (favoritesId) => {
        try {
            const response = await http.delete(`/favorite/${favoritesId}`)
            if (response.data.result === 'success') {
                console.log('즐겨찾기 삭제 성공')
            } else {
                console.log('즐겨찾기 삭제 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const addFavorite = async (attractionId, attractionName, userId) => {
        console.log(attractionId)
        console.log(attractionName)
        console.log(userId)

        try {
            const response = await http.post('/favorite', {
                attractionId: attractionId,
                attractionName: attractionName,
                userId: userId
            })

            if (response.data.result === 'success') {
                console.log('즐겨찾기 추가 성공')
                getFavoriteList(userId)
            } else {
                console.log('즐겨찾기 추가 실패')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { favoriteStore, getFavoriteList, deleteFavorite, addFavorite }
})
