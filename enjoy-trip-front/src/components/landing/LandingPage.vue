<script setup>
import NavBar from './../../layout/NavBar.vue'
import LandingRightComponent from './content1/LandingRightComponent.vue'
import LandingTopLeftComponent from './content1/LandingTopLeftComponent.vue'
import LandingBottomLeftComponent from './content1/LandingBottomLeftComponent.vue.vue'
import BlogContent from './content2/BlogComponent.vue'
</script>
<template>
    <NavBar />
    <br />
    <!-- Explore Tour Start -->
    <div class="container-fluid ExploreTour py-5">
        <div class="row">
            <div class="col-md-6">
                <LandingTopLeftComponent />
                <LandingBottomLeftComponent />
            </div>
            <div class="col-md-6">
                <LandingRightComponent />
            </div>
            <BlogContent />
        </div>
    </div>
    <!-- Explore Tour End -->
</template>

<style scope></style>
