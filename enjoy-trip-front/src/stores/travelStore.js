import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/common/axios-config'
export const useTravelStore = defineStore('travelStore', () => {
    const sidoList = ref('시도')
    const gugunList = ref('구군')
    const sidoObj = ref('')
    const gugunObj = ref('')
    const travelList = ref('')
    const contentList = ref('')
    const selectContent = ref({ 12: false }, { 14: false }, { 15: false }, { 25: false }, { 28: false }, { 32: false }, { 38: false }, { 39: false })
    const searchKeyword = ref('')
    const searchCategory = ref('')
    const regionOrContent = () => {
        if (contentList.value == undefined) {
            searchKeyword.value = sidoObj.value.sidoName + ' ' + gugunObj.value.gugunName
        } else {
            searchKeyword.value = sidoObj.value.sidoName + ' ' + gugunObj.value.gugunName + ' ' + contentList.value
        }
    }

    const joinContent = computed(() => {
        // 첫 번째 객체를 가져옵니다.
        const content = selectContent.value

        // false 값인 키만 필터링합니다.
        const trueKeys = Object.keys(content).filter((key) => content[key] === true)
        // 키들을 문자열로 변환하여 결합합니다.
        return trueKeys.join('/')
    })

    console.log()

    const contentSelect = (contentCode) => {
        if (selectContent.value[contentCode] == false) {
            selectContent.value[contentCode] = true
        } else {
            selectContent.value[contentCode] = false
        }
    }
    const getSidoList = async () => {
        try {
            await axios.get('/trip/sidoCode').then((response) => {
                let { data } = response //destructuring 문법.. responce에 data 객체만 빼서 할당받겠다.
                sidoList.value = data.sidoList
                console.log(sidoList.value[1])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getGugunList = async () => {
        console.log(sidoObj.value.sidoCode)
        let url = `/trip/gugunCode/`
        let urlParams = sidoObj.value.sidoCode
        let urls = url + urlParams
        try {
            await axios.get(urls).then((response) => {
                let { data } = response //destructuring 문법.. responce에 data 객체만 빼서 할당받겠다.
                gugunList.value = data.gugunList
                console.log(gugunList)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const searchTravel = async () => {
        if (joinContent.value == '') {
            searchTravelRegion()
        } else {
            searchTravelContent()
        }
    }
    const searchTravelRegion = async () => {
        console.log('region')
        let url = `/travel/list?`
        let urlParams = `sidoCode=` + sidoObj.value.sidoCode + `&gugunCode=` + gugunObj.value.gugunCode
        // console.log(sidoObj.value + " " + gugunObj.value);
        try {
            await axios.get(url + urlParams).then((response) => {
                let { data } = response
                travelList.value = data.list
                console.log(travelList.value)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const searchTravelContent = async () => {
        let url = `/travel/content?`
        let urlParams = `sidoCode=` + sidoObj.value.sidoCode + `&gugunCode=` + gugunObj.value.gugunCode
        urlParams += `&contentType=` + joinContent.value

        console.log(urlParams)
        try {
            await axios.get(url + urlParams).then((response) => {
                let { data } = response
                travelList.value = data.list
                console.log(travelList.value)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const searchTravelKeyword = async () => {
        let url = `/travel/keyword?`
        let urlParams = `keyword=` + searchKeyword.value
        console.log(urlParams)

        try {
            await axios.get(url + urlParams).then((response) => {
                let { data } = response
                travelList.value = data.list
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        sidoList,
        gugunList,
        sidoObj,
        gugunObj,
        travelList,
        selectContent,
        joinContent,
        searchKeyword,
        searchCategory,
        contentSelect,
        getSidoList,
        getGugunList,
        searchTravelRegion,
        searchTravelContent,
        searchTravelKeyword,
        searchTravel,
        regionOrContent
    }
})
