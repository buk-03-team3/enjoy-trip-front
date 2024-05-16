<script setup>
import { useAuthStore } from '@/stores/authStore';
import http from '@/common/axios-config.js'
import { useRouter } from 'vue-router'
const { authStore, setLogin } = useAuthStore()
// $(document).ready(function () {
//     let signup = $('.links').find('li').find('#signup')
//     let signin = $('.links').find('li').find('#signin')
//     let reset = $('.links').find('li').find('#reset')
//     let first_input = $('form').find('.first-input')
//     let hidden_input = $('form').find('.input__block').find('#repeat__password')
//     let signin_btn = $('form').find('.signin__btn')

//     //----------- sign up ---------------------
//     signup.on('click', function (e) {
//         e.preventDefault()
//         $(this).parent().parent().siblings('h1').text('회 원 가 입')
//         $(this).parent().css('opacity', '1')
//         $(this).parent().siblings().css('opacity', '.6')
//         first_input.removeClass('first-input__block').addClass('signup-input__block')
//         hidden_input.css({
//             opacity: '1',
//             display: 'block'
//         })
//         signin_btn.text('회 원 가 입')
//     })

//     //----------- sign in ---------------------
//     signin.on('click', function (e) {
//         e.preventDefault()
//         $(this).parent().parent().siblings('h1').text('로 그 인')
//         $(this).parent().css('opacity', '1')
//         $(this).parent().siblings().css('opacity', '.6')
//         first_input.addClass('first-input__block').removeClass('signup-input__block')
//         hidden_input.css({
//             opacity: '0',
//             display: 'none'
//         })
//         signin_btn.text('로 그 인')
//     })

//     //----------- reset ---------------------
//     reset.on('click', function (e) {
//         e.preventDefault()
//         $(this).parent().parent().siblings('form').find('.input__block').find('.input').val('')
//     })

const router = useRouter()

const login = async () => {
  let loginObj = {
    email: authStore.email,
    password: authStore.password
  }

  try {
    let { data } = await http.post('/auth/login', null, { params: loginObj })
    if (data.result == 'success') {
      setLogin({ isLogin: true, userName: data.user.name, userProfileImageUrl: data.user.userProfileImageUrl })
      router.push("/")
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
    <h1 class="kakao-bold">로 그 인</h1>
    <ul class="links">
      <li><a href="#" id="signin">로그인</a></li>
      <li><a href="#" id="signup">회원가입</a></li>
      <li><a href="#" id="reset">초기화</a></li>
    </ul>
    <form v-on:submit.prevent="login">
      <div class="first-input input__block first-input__block">
        <input type="email" placeholder="계정" class="input" id="email" v-model="authStore.email" />
      </div>
      <div class="input__block">
        <input type="password" placeholder="비밀번호" class="input" id="password" v-model="authStore.password" />
      </div>
      <button type="button" class="signin__btn" @click="login">로그인</button>
    </form>
  </div>
</template>

<style scoped>
body {
    font-family: 'Montserrat', sans-serif;
    background: white;
}

.container {
    display: block;
    max-width: 680px;
    width: 80%;
    margin: 120px auto;
    border: 2px solid;
    border-radius: 30px;
}

h1 {
    color: #222;
    font-size: 48px;
    letter-spacing: -3px;
    text-align: center;
    margin: 30px 0 80px 30px;
    transition: 0.2s linear;
}

.links {
    list-style-type: none;
    li {
        display: inline-block;
        margin: 0 20px 0 0;
        transition: 0.2s linear;
        &:nth-child(2) {
            opacity: 0.6;
            &:hover {
                opacity: 1;
            }
        }
        &:nth-child(3) {
            opacity: 0.6;
            float: right;
            &:hover {
                opacity: 1;
            }
        }
        a {
            text-decoration: none;
            color: #0f132a;
            font-weight: bolder;
            text-align: center;
            cursor: pointer;
        }
    }
}

form {
    width: 100%;
    max-width: 680px;
    margin: 40px auto 10px;
    .input__block {
        margin: 20px auto;
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
            width: 90%;
            max-width: 680px;
            height: 50px;
            margin: 0 auto;
            border-radius: 8px;
            border: none;
            background: rgba(#0f132a, 0.1);
            color: rgba(#0f132a, 0.3);
            padding: 0 0 0 15px;
            font-size: 14px;
            font-family: 'Montserrat', sans-serif;
            &:focus,
            &:active {
                outline: none;
                border: none;
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
        background: #555;
        color: white;
        display: block;
        width: 92.5%;
        max-width: 680px;
        height: 50px;
        border-radius: 8px;
        margin: 0 auto;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-family: 'Montserrat', sans-serif;
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



<!-- repeat password input -->
            <!-- <div class="input__block" style="border-radius: 1px solid">
                <input type="password" placeholder="비밀번호 확인" class="input repeat__password" id="repeat__password" />
            </div> -->
            <!-- sign in button -->
            
        <!-- separator -->
        <!-- <div class="separator">
            <p>OR</p>
        </div> -->
        <!-- google button -->
        <!-- <button class="google__btn">
            <i class="fa fa-google"></i>
            Sign in with Google
        </button> -->
        <!-- google button -->
        <!-- <button class="github__btn">
            <i class="fa fa-github"></i>
            Sign in with GitHub
        </button> -->