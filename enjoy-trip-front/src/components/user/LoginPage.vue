<script setup>
import { useAuthStore } from '@/stores/authStore'
import http from '@/common/axios-config.js'
import { useRouter } from 'vue-router'
const { authStore, setLogin } = useAuthStore()

const router = useRouter()

const home = () => {
    router.push('/register')
}

const login = async () => {
    let loginObj = {
        email: authStore.email,
        password: authStore.password
    }

    try {
        let { data } = await http.post('/auth/login', null, { params: loginObj })
        if (data.result == 'success') {
            setLogin({ isLogin: true, userName: data.user.name, userProfileImageUrl: data.user.userProfileImageUrl })
            router.push('/')
        } else if (data.result == 'fail') {
            alert('이메일 또는 비밀번호를 확인하세요.')
        }
    } catch (error) {
        console.log('LoginVue: error : ', error)
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
                <h1 class="mb-4 kakao-bold">로그인</h1>
            </div>
        </div>
        <form v-on:submit.prevent="login">
            <p class="kakao-regular login-form-field-text">이메일</p>
            <div class="first-input kakao-regular input__block first-input__block">
                <input type="email" placeholder="계정" class="input login-form-input-text kakao-regular" id="email" v-model="authStore.email" />
            </div>
            <br />
            <p class="kakao-regular login-form-field-text">패스워드</p>
            <div class="input__block">
                <input type="password" placeholder="비밀번호" class="input login-form-input-text kakao-regular" id="password" v-model="authStore.password" />
            </div>
            <div style="display: flex">
                <button type="button" class="signin__btn kakao-regular" @click="login">로그인</button>
                <button type="button" class="signup__btn kakao-regular" @click="home">회원가입</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.login-form-field-text {
    font-size: 1.2vmax;
    border-bottom: black 1px solid;
}
.login-form-input-text {
    border-bottom: black 1px solid;
}

form {
    width: 100%;
    max-width: 680px;
    margin: 40px auto 10px;
    .input__block {
        margin: 30px auto;
        display: block;
        position: relative;
        &.first-input__block {
            &::before {
                content: '';
                position: absolute;
                top: -15px;
                left: 50px;
                display: block;
                width: 0;
                height: 0;
                background: transparent;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-bottom: 15px solid rgba(#0f132a, 0.1);
                transition: 0.2s linear;
            }
        }
        &.signup-input__block {
            &::before {
                content: '';
                position: absolute;
                top: -15px;
                left: 150px;
                display: block;
                width: 0;
                height: 0;
                background: transparent;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-bottom: 15px solid rgba(#0f132a, 0.1);
                transition: 0.2s linear;
            }
        }
        input {
            display: block;
            width: 100%;
            height: 50px;
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

    .signin__btn {
        background: black;
        color: white;
        display: inline-block;
        width: 47.5%;
        max-width: 680px;
        height: 50px;
        border-radius: 8px;
        margin: 0 auto;
        border: none;
        cursor: pointer;
        font-size: 1vmax;
        font-weight: 400;
        box-shadow: 0 15px 30px rgba(#e91e63, 0.36);
        transition: 0.2s linear;
        &:hover {
            box-shadow: 0 0 0 rgba(#e91e63, 0);
        }
    }

    .signup__btn {
        background: black;
        color: white;
        display: inline-block;
        width: 47.5%;
        max-width: 680px;
        height: 50px;
        border-radius: 8px;
        margin: 0 auto;
        border: none;
        cursor: pointer;
        font-size: 1vmax;
        font-weight: 400;
        box-shadow: 0 15px 30px rgba(#e91e63, 0.36);
        transition: 0.2s linear;
        &:hover {
            box-shadow: 0 0 0 rgba(#e91e63, 0);
        }
    }
}

.separator {
    display: block;
    margin: 30px auto 10px;
    text-align: center;
    height: 40px;
    position: relative;
    background: transparent;
    color: rgba(#0f132a, 0.4);
    font-size: 13px;
    width: 90%;
    max-width: 680px;
    &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 0;
        background: rgba(#0f132a, 0.2);
        height: 1px;
        width: 45%;
    }
    &::after {
        content: '';
        position: absolute;
        top: 8px;
        right: 0;
        background: rgba(#0f132a, 0.2);
        height: 1px;
        width: 45%;
    }
}

.google__btn,
.github__btn {
    display: block;
    width: 90%;
    max-width: 680px;
    margin: 20px auto;
    height: 50px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    border-radius: 8px;
    border: none;
    line-height: 40px;
    &.google__btn {
        background: #5b90f0;
        color: white;
        box-shadow: 0 15px 30px rgba(#5b90f0, 0.36);
        transition: 0.2s linear;
        .fa {
            font-size: 20px;
            padding: 0 5px 0 0;
        }
        &:hover {
            box-shadow: 0 0 0 rgba(#5b90f0, 0);
        }
    }
    &.github__btn {
        background: #25282d;
        color: white;
        box-shadow: 0 15px 30px rgba(#25282d, 0.36);
        transition: 0.2s linear;
        .fa {
            font-size: 20px;
            padding: 0 5px 0 0;
        }
        &:hover {
            box-shadow: 0 0 0 rgba(#25282d, 0);
        }
    }
}
.content {
    padding-top: 2vmax; /* NavBar height */
}

footer {
    p {
        text-align: center;
        .fa {
            color: #e91e63;
        }
        a {
            text-decoration: none;
            font-size: 17px;
            margin: 0 5px;
            .fa-facebook {
                color: #3b5998;
            }
            .fa-twitter {
                color: #1da1f2;
            }
            .fa-instagram {
                color: #f77737;
            }
            .fa-linkedin {
                color: #0077b5;
            }
            .fa-behance {
                color: #1769ff;
            }
        }
    }
}
</style>
