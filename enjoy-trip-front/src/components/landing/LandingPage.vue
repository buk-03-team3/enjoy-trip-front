<script setup>
import LandingRightComponent from './content1/LandingRightComponent.vue'
import LandingTopLeftComponent from './content1/LandingTopLeftComponent.vue'
import LandingBottomLeftComponent from './content1/LandingBottomLeftComponent.vue.vue'
</script>
<template>
    <!-- Explore Tour Start -->
    <div class="container-fluid ExploreTour">
        <div class="row">
            <div class="col-md-6">
                <LandingTopLeftComponent />
                <LandingBottomLeftComponent />
            </div>
            <div class="col-md-6">
                <LandingRightComponent />
            </div>
        </div>
    </div>
    <!-- Explore Tour End -->
</template>

<style scope></style>
