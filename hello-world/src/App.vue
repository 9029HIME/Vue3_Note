<template>
  <p>
    <router-link to="/A">选择A</router-link><br>
    <router-link to="/B">选择B</router-link><br>
    <router-link v-bind:to="{name: 'routerDynamic',params:{customerParam:'120'}}">参数120</router-link><br>
    <router-link v-bind:to="{name: 'routerDynamic',params:{customerParam:'abc'}}">参数abc</router-link><br>
    <!-- 根据上面的选择， 在RouterView展示结果 -->
    <router-view></router-view>
  </p>
</template>

<script>


export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
