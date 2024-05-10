

<style type="text/css" scope>
        body {
            margin-top: 20px;
            background-color: #eee;
        }

        .card {
            margin-bottom: 24px;
            box-shadow: 0 2px 3px #e4e8f0;
        }

        .card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid #eff0f2;
            border-radius: 1rem;
        }

        .avatar-md {
            height: 4rem;
            width: 4rem;
        }

        .rounded-circle {
            border-radius: 50% !important;
        }

        .img-thumbnail {
            padding: 0.25rem;
            background-color: #f1f3f7;
            border: 1px solid #eff0f2;
            border-radius: 0.75rem;
        }

        .avatar-title {
            align-items: center;
            background-color: #3b76e1;
            color: #fff;
            display: flex;
            font-weight: 500;
            height: 100%;
            justify-content: center;
            width: 100%;
        }

        .bg-soft-primary {
            background-color: rgba(59, 118, 225, .25) !important;
        }

        a {
            text-decoration: none !important;
        }

        .badge-soft-danger {
            color: #f56e6e !important;
            background-color: rgba(245, 110, 110, .1);
        }

        .badge-soft-success {
            color: #63ad6f !important;
            background-color: rgba(99, 173, 111, .1);
        }

        .mb-0 {
            margin-bottom: 0 !important;
        }

        .badge {
            display: inline-block;
            padding: 0.25em 0.6em;
            font-size: 75%;
            font-weight: 500;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.75rem;
        }
</style>
<template>
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <div class="mb-3">
                    <h5 class="card-title">Contact List <span class="text-muted fw-normal ms-2">(834)</span></h5>
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                    <div>
                        <ul class="nav nav-pills">
                            <li class="nav-item">
                                <a href="#" class="nav-link" data-bs-toggle="tooltip" data-bs-placement="top"
                                    title="List"><i class="bx bx-list-ul"></i></a>
                            </li>
                            <li class="nav-item">
                                <a aria-current="page" href="#"
                                    class="router-link-active router-link-exact-active nav-link active"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Grid"><i
                                        class="bx bx-grid-alt"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <a href="#" data-bs-toggle="modal" data-bs-target=".add-new" class="btn btn-primary"><i
                                class="bx bx-plus me-1"></i> Add New</a>
                    </div>
                    <div class="dropdown">
                        <a class="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false"><i
                                class="bx bx-dots-horizontal-rounded"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3 col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="dropdown float-end">
                            <a class="text-muted dropdown-toggle font-size-16" href="#" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true"><i
                                    class="bx bx-dots-horizontal-rounded"></i></a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Remove</a>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div>
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt
                                    class="avatar-md rounded-circle img-thumbnail" />
                            </div>
                            <div class="flex-1 ms-3">
                                <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">글쓴이</a></h5>
                                <span class="badge badge-soft-success mb-0">날짜</span>
                            </div>
                        </div>
                        <div class="mt-3 pt-1">
                            <p class="text-muted mb-0"><i
                                    class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i>
                                제목
                            </p>
                            <p class="text-muted mb-0 mt-2"><i
                                    class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> <a
                                    href="/cdn-cgi/l/email-protection" class="__cf_email__"
                                    data-cfemail="2c7c44554040455f6b4d584045426c5f5c55024f4341">내용 요약</a>
                            </p>
                        </div>
                        <div class="d-flex flex-column pt-4"> <!-- 버튼과 조회수를 세로로 정렬 -->
                            <button type="button" class="btn btn-soft-primary btn-sm mb-2 align-items-center"><i
                                    class="bx bx-user me-1"></i> 글보기</button>
                            <div class="text-muted ml-auto inline-block; text-align: right;"> <!-- 조회수를 오른쪽으로 정렬 -->
                                조회수
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</template>