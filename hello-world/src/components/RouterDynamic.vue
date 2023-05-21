<template>
    <h1> 传递过来的动态参数是：{{ $route.params.customerParam }} </h1>
    <router-link v-bind:to="{name: 'son'}">查看子路由</router-link><br>
    <router-view></router-view>
</template>