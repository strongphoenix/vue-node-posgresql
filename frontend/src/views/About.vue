<template>
    <div>
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
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="$auth.logout()">Logout</button>
          </div>
        </nav>
        <div style="text-align: center; margin-top: 40vh;">
            <h3 >This is about page.</h3>
            <h5>Read more about us.</h5>
        </div>
    </div>
</template>
<script>

</script>