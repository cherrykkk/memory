<template>
  <div class="controller">
    <div v-for="(e,i) in option" :key="i" class="card" @click="e.fun">
    {{e.name}}
    </div>
  </div>
</template>
<script>
export default {
  props: ["option"],
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.controller {
  position: absolute;
  bottom: 10px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  .card {
    box-shadow: 0 0 2px 2px;
  }
}
</style>