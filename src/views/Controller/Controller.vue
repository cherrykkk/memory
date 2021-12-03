<template>
  <div class="controller">
    <div v-for="(e,i) in option" :key="i" class="card" @click="e.func">
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
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  .card {
    line-height: 40px;
  }
}
</style>