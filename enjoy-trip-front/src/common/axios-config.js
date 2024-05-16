import axios from 'axios'
export default axios.create({
    //options
    // base url 주기....
    // `url`이 절대값이 아닌 경우 `baseURL`은 URL 앞에 붙습니다.
    // 상대적인 URL을 인스턴스 메서드에 전달하려면 `baseURL`을 설정하는 것은 편리합니다.
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json' // json으로 request를 보내겠다. (form www-urlencoded로 보내지 않음..)
    }
})
