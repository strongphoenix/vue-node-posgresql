<template>
    <div class="dashboard">
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="#">
            <img src="https://a.storyblok.com/f/39898/1024x1024/dea4e1b62d/vue-js_logo-svg.png" width="40" height="40">
            </a>
            <div>
            <img :src="$auth.user.picture" width="30" height="30">
            <span class="text-muted font-weight-light px-2">{{$auth.user.name}} </span>
            <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-left: 10px;"><a href="/">Home</a></button>
            <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-left: 10px;"><a href="/admin">Admin</a></button>
            <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-left: 10px;"><a href="/about">About</a></button>
            <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-left: 10px;" @click="$auth.logout()">Logout</button>
            </div>
        </nav>
        <div class="jumbotron">
            <div class="container">
            <h1 class="display-4">Hello, {{$auth.user.name}}!</h1>
            <hr class="my-4">
            <p class="lead">
                Welcome to homepage.
            </p>
            </div>
        </div>
        <div class="container">
            <div>
                <img style="
                    width: 40vw;
                    margin: auto;
                    display: block;
                    height: 50vh;
                " 
                src="https://a.storyblok.com/f/39898/1024x1024/dea4e1b62d/vue-js_logo-svg.png" width="40" height="40">
            </div>
        </div>
    </div>
    
</template>

<script>
</script>