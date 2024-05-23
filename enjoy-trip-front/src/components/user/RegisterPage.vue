<script setup>
import { ref, onMounted, watch } from 'vue'
import http from '@/common/axios-config.js'
import { useRouter } from 'vue-router'
import { useTravelStore } from '@/stores/travelStore'

// Vue Router instance
const router = useRouter()

let cityBtnText = ref('시, 도를 선택해주세요')
let townBtnText = ref('구, 군을 선택해주세요')

let isActiveCity = ref(false)
let isActiveTown = ref(false)

let checkPassword = ref('')

const cityActivechange = () => {
    isActiveCity.value = !isActiveCity.value
}
const townActivechange = () => {
    isActiveTown.value = !isActiveTown.value
}

const travelStore = useTravelStore()
const { getSidoList, getGugunList } = travelStore

// 시, 도 리스트 먼저 가져오기
onMounted(async () => {
    await getSidoList()
})

// 시, 도를 선택하면 해당 시, 도에 속한 구, 군 가져오기
watch(
    () => travelStore.sidoObj,
    async (newSido) => {
        if (newSido.sidoCode) {
            await getGugunList()
        }
    }
)

const selectCity = (sido) => {
    cityBtnText.value = sido.sidoName
    travelStore.sidoObj = sido
    townBtnText.value = '구, 군을 선택해주세요'
}

const selectTown = (gugun) => {
    townBtnText.value = gugun.gugunName
    travelStore.gugunObj = gugun
}

const email = ref('')
const password = ref('')
const name = ref('')
// Function to handle registration
const register = async () => {
    const user = {
        email: email.value,
        password: password.value,
        name: name.value,
        sido: cityBtnText.value,
        gugun: townBtnText.value
    }

    try {
        let { data } = await http.post('/user', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(data.result)
        if (data.result === 'success') {
            alert('회원가입 성공')
            router.push('/')
        } else if (data.result === 'fail') {
            alert('이메일 또는 비밀번호를 확인하세요.')
        }
    } catch (error) {
        console.error('LoginVue: error: ', error)
        alert('로그인 과정에서 오류가 발생했습니다.')
    }
}
</script>

<template>
    <div class="container">
        <div class="content"></div>
        <div class="text-center mt-3 content">
            <div class="mx-auto text-center mb-5" style="max-width: 900px">
                <h5 class="section-title px-3 kakao-bold">login</h5>
                <h3 class="mb-4 kakao-bold">회원가입</h3>
            </div>
        </div>

        <div style="display: flex; gap: 2vmax">
            <form v-on:submit.prevent="login">
                <p class="kakao-regular sign-form-field-text">이름</p>
                <div class="first-input kakao-regular input__block first-input__block">
                    <input type="text" placeholder="이름" class="input login-form-input-text kakao-regular" id="name" v-model="name" />
                </div>

                <p class="kakao-regular sign-form-field-text">이메일</p>
                <div class="first-input kakao-regular input__block first-input__block">
                    <input type="email" placeholder="계정" class="input login-form-input-text kakao-regular" id="email" v-model="email" />
                </div>
                <br />
                <p class="kakao-regular sign-form-field-text">비밀번호</p>
                <div class="input__block">
                    <input type="password" placeholder="비밀번호" value="Abcd!2345"
                    class="input login-form-input-text kakao-regular" id="password" v-model="password" />
                </div>
                <p  value="Abcd!2345" class="kakao-regular sign-form-field-text">비밀번호 확인</p>
                <div class="input__block">
                    <input type="password" placeholder="비밀번호 확인" class="input login-form-input-text kakao-regular" id="check-password" v-model="checkPassword" />
                </div>
            </form>

            <form v-on:submit.prevent="login">
                <p class="kakao-regular sign-form-field-text-optional">거주지</p>
                <div style="display: flex; gap: 3vmax">
                    <div>
                        <p class="kakao-regular sign-form-text-optional">시, 도</p>
                        <div class="select-menu" :class="isActiveCity ? 'active' : 'default'" @click="cityActivechange">
                            <div id="select-btn" class="select-btn">
                                <span class="cityBtnText">{{ cityBtnText }}</span>
                                <i class="bx bx-chevron-down"></i>
                            </div>

                            <ul class="options" v-if="isActiveCity">
                                <li class="option" v-for="sido in travelStore.sidoList" :key="sido.sidoCode" @click="selectCity(sido)">
                                    <span class="option-text">{{ sido.sidoName }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <p class="kakao-regular sign-form-text-optional">구, 군</p>
                        <div class="select-menu" :class="isActiveTown ? 'active' : 'default'" @click="townActivechange">
                            <div class="select-btn">
                                <span class="townBtnText">{{ townBtnText }}</span>
                                <i class="bx bx-chevron-down"></i>
                            </div>

                            <ul class="options" v-if="isActiveTown">
                                <li class="option" v-for="gugun in travelStore.gugunList" :key="gugun.gugunCode" @click="selectTown(gugun)">
                                    <span class="option-text">{{ gugun.gugunName }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button type="button" class="signup__btn kakao-regular" @click="register" style="margin-top: 14.8vmax">회원등록</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.select-menu .select-btn {
    display: flex;
    height: 3rem;
    min-width: 15vmax;
    background: #fff;
    padding: 20px;
    font-size: 1vmax;
    font-weight: 400;
    border-radius: 8px;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.select-menu .options {
    position: absolute;
    width: 14vmax;
    overflow-y: auto;
    max-height: 12rem;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation-name: fadeInDown;
    -webkit-animation-name: fadeInDown;
    animation-duration: 0.35s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.35s;
    -webkit-animation-fill-mode: both;
}
.select-menu .options .option {
    display: flex;
    height: 3vmax;
    cursor: pointer;
    padding: 0 16px;
    border-radius: 8px;
    align-items: center;
    background: #fff;
}
.select-menu .options .option:hover {
    background: #f2f2f2;
}
.select-menu .options .option i {
    font-size: 1.4vmax;
    margin-right: 0.8vmax;
}
.select-menu .options .option .option-text {
    font-size: 1vmax;
    color: #333;
}

.select-btn i {
    font-size: 1.4vmax;
    transition: 0.3s;
}

.select-menu.active .select-btn i {
    border-color: green;
    transform: rotate(-180deg);
}
.select-menu.active .options {
    border-color: green;
    opacity: 0;
    z-index: 10;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-fill-mode: both;
}

@keyframes fadeInUp {
    from {
        transform: translate3d(0, 30px, 0);
    }
    to {
        border-color: green;
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
@keyframes fadeInDown {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        border-color: green;
        transform: translate3d(0, 20px, 0);
        opacity: 0;
    }
}
.sign-form-field-text {
    font-size: 1.2vmax;
    color: black;
    border-bottom: black 1px solid;
}
.login-form-input-text {
    border-bottom: black 1px solid;
}

.sign-form-field-text-optional {
    border-bottom: black 1px solid;
    font-size: 1.2vmax;
    color: #777;
}
.sign-form-text-optional {
    font-size: 1vmax;
    color: #777;
}

form {
    width: 100%;
    .input__block {
        margin: 30px auto;
        position: relative;

        input {
            display: block;
            width: 100%;
            height: 3rem;
            margin: 0 0;
            border-radius: 8px;
            border: none;
            background: rgba(#0f132a, 0.1);
            color: rgba(#0f132a, 0.3);
            padding: 0 0 0 15px;
            font-size: 1vmax;
            transition:
                background-color 0.6s,
                border-color 0.6s,
                color 0.6s;

            &:focus,
            &:active {
                outline: none;
                border: 2px solid #6998ee;
                background: rgba(#6998ee, 0.1);
                color: rgba(#0f132a, 1);
            }
            &.repeat__password {
                opacity: 0;
                display: none;
                transition: 0.2s linear;
            }
        }
    }

    .signup__btn {
        background: black;
        color: white;
        display: inline-block;
        width: 100%;
        height: 3rem;
        border-radius: 8px;

        border: none;
        cursor: pointer;
        font-size: 1vmax;
        font-weight: 400;
        transition: 0.2s linear;
    }
}

.content {
    padding-top: 2vmax; /* NavBar height */
}
</style>
