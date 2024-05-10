<template>
    <!-- Header End -->
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
                    <button onclick="#" type="button" class="btn btn-primary rounded-pill col md-4">검색</button>
                </div>
            </div>
        </div>
    </div>
</template>
