<template>
    <!-- Header End -->
    <!-- Services Start -->

    <div class="container-fluid search-bar position-relative" style="top: -50%; transform: translateY(-50%)">
        <div class="container">
            <div class="position-relative rounded-pill align-items-center mx-auto p-3" style="background: rgba(19, 53, 123, 0.8)">
                <div class="row">
                    <div class="col md-4">
                        <select id="sidoList" class="form-select btn btn-primary rounded-pill dropdown-togglecontentsButton" type="button" aria-expanded="false">
                            <option value="">시도 ▼</option>
                        </select>
                    </div>
                    <div class="col md-4">
                        <select id="gugunList" class="form-select btn btn-primary rounded-pill dropdown-toggle contentsButton" type="button" aria-expanded="false">
                            <option value="">구군 ▼</option>
                        </select>
                    </div>

                    <div class="col md-4">
                        <select id="contentType" class="form-select btn btn-primary rounded-pill dropdown-toggle contentsButton" type="button" aria-expanded="false">
                            <option value="">컨텐츠</option>
                            <option value="12" style="color: white">관광지</option>
                            <option value="14" style="color: white">문화시설</option>
                            <option value="15" style="color: white">축제공연행사</option>
                            <option value="25" style="color: white">여행코스</option>
                            <option value="28" style="color: white">레포츠</option>
                            <option value="32" style="color: white">숙박</option>
                            <option value="38" style="color: white">쇼핑</option>
                            <option value="39" style="color: white">음식점</option>
                        </select>
                    </div>
                    <button onclick="#" type="button" class="btn btn-primary rounded-pill col md-4">검색</button>
                </div>
            </div>
        </div>
    </div>
</template>
