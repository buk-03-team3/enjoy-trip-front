<template>
    <div class="container py-5">
        <div class="mx-auto text-center mb-5" style="max-width: 900px">
            <h5 class="section-title px-3 kakao-bold">Hot Post</h5>
            <h1 class="mb-4 kakao-bold">🔥 인기 글 🔥</h1>
        </div>
        <div class="tab-class text-center">
            <div class="tab-content">
                <div class="row">
                    <!-- <div class="card card-margin search-form">
                        <div class="card-body p-0">
                            <form id="search-form">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row no-gutters">
                                            <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                                <label for="search-type" hidden>검색 유형</label>
                                                <select class="form-control" id="search-type" name="searchType">
                                                    <option>제목</option>
                                                    <option>본문</option>
                                                    <option>id</option>
                                                    <option>닉네임</option>
                                                    <option>해시태그</option>
                                                </select>
                                            </div>
                                            <div class="col-lg-8 col-md-6 col-sm-12 p-0">
                                                <label for="search-value" hidden>검색어</label>
                                                <input type="text" placeholder="검색어..." class="form-control" id="search-value" name="searchValue" />
                                            </div>
                                            <div class="col-lg-1 col-md-3 col-sm-12 p-0">
                                                <button type="submit" class="btn btn-base">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-search"
                                                    >
                                                        <circle cx="11" cy="11" r="8"></circle>
                                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> -->
                </div>

                <div class="row">
                    <table class="table" id="article-table">
                        <thead>
                            <tr class="table-head-text">
                                <th class="title col-6 kakao-bold"><a>제목</a></th>
                                <th class="hashtag col-2 kakao-bold"><a>작성자</a></th>
                                <th class="user-id kakao-bold"><a>작성일</a></th>
                                <th class="hit kakao-bold"><a>조회</a></th>
                            </tr>
                        </thead>
                        <tbody class="table-head-text">
                            <tr>
                                <td class="title kakao-regular"><a>첫글</a></td>
                                <td class="user-name kakao-regular">김재경</td>
                                <td class="created-at kakao-regular"><time>2024-05-10</time></td>
                                <td class="hit kakao-regular">10</td>
                            </tr>
                            <tr>
                                <td class="title kakao-regular"><a>두번째글</a></td>
                                <td class="user-name kakao-regular">이현수</td>
                                <td class="created-at kakao-regular"><time>2024-05-10</time></td>
                                <td class="hit kakao-regular">9</td>
                            </tr>
                            <tr>
                                <td class="title kakao-regular"><a>세번째글</a></td>
                                <td class="user-name kakao-regular">홍길동</td>
                                <td class="created-at kakao-regular"><time>2024-05-10</time></td>
                                <td class="hit kakao-regular">8</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- <div class="row">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <a class="btn btn-primary me-md-2" role="button" id="write-article">글쓰기</a>
                    </div>
                </div>

                <div class="row">
                    <nav id="pagination" aria-label="Page navigation">
                        <ul class="pagination justify-content-center">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style scope>
.table-head-text {
    color: #222;
    font-size: 1.2rem;
}
.table-body-text {
    color: #111;
    font-size: 1rem;
}
.search-form {
    width: 80%;
    margin: 0 auto;
    margin-top: 1rem;
}

.search-form input {
    height: 100%;
    background: transparent;
    border: 0;
    display: block;
    width: 100%;
    padding: 1rem;
    height: 100%;
    font-size: 1rem;
}

.search-form select {
    background: transparent;
    border: 0;
    padding: 1rem;
    height: 100%;
    font-size: 1rem;
}

.search-form select:focus {
    border: 0;
}

.search-form button {
    height: 100%;
    width: 100%;
    font-size: 1rem;
}

.search-form button svg {
    width: 24px;
    height: 24px;
}

.card-margin {
    margin-bottom: 1.875rem;
}

@media (min-width: 992px) {
    .col-lg-2 {
        flex: 0 0 16.66667%;
        max-width: 16.66667%;
    }
}

.card {
    border: 0;
    box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #ffffff;
    background-clip: border-box;
    border: 1px solid #e6e4e9;
    border-radius: 8px;
}
</style>
