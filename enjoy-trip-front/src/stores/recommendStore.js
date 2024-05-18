import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import http from '@/common/axios-config.js'
import axios from '@/common/axios-config'
export const useRecommendStore = defineStore('recommendStore', () => {
    
    const {authStore}= useAuthStore();
    //사용자 고유 아이디 얻어오기 
    const userId =ref('')
    const getUserId = async () => {
        let loginObj = {
            email: authStore.email,
            password: authStore.password
        }
        try {
            let { data } = await http.post('/auth/login', null, { params: loginObj })
            if (data.result == 'success') {
                    userId.value= data.user.userId;

            } else if (data.result == 'fail') {
                alert('이메일 또는 비밀번호를 확인하세요.')
            }
        } catch (error) {
            console.log('recommend: error : ', error)
            alert('여행지 추천 과정에서 오류가 발생했습니다.')
        }
    }
    const recommendList = ref(['']);
    const recommendListWithFavoriteAddr  = ref(['']);
    const recommendListWithFavoriteContent = ref(['']);
    // 사용자 주거 지역 근처 추천
    const recommendWithUserAddr = async () => {
        await getUserId();
        let url = `/recommend/${userId.value}`

        try {
            await axios.get(url).then((response) => {
                let { data } = response //destructuring 문법.. responce에 data 객체만 빼서 할당받겠다.
                recommendList.value = data.list;
                console.log(recommendList.value)
            })
        } catch (error) {
            console.log(error)
        }
    }
    //사용자 즐겨찾기한 지역 근처 추천
    const recommendWithFavoriteAddr = async () => {
        await getUserId();
        let url = `/recommend/region/${userId.value}`

        try {
            await axios.get(url).then((response) => {
                let { data } = response //destructuring 문법.. responce에 data 객체만 빼서 할당받겠다.
                recommendListWithFavoriteAddr.value = data.list;
                console.log(recommendList.value)
            })
        } catch (error) {
            console.log(error)
        }
    }
    //사용자 즐겨찾기한 컨텐츠 위주 추천 
    const recommendWithFavoriteContent = async () => {
        await getUserId();
        let url = `/recommend/type/${userId.value}`

        try {
            await axios.get(url).then((response) => {
                let { data } = response //destructuring 문법.. responce에 data 객체만 빼서 할당받겠다.
                recommendListWithFavoriteContent.value = data.list;
                console.log(recommendList.value)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    return { recommendWithUserAddr , recommendWithFavoriteAddr,recommendWithFavoriteContent, getUserId ,
        recommendListWithFavoriteContent, recommendListWithFavoriteAddr, recommendList}
})