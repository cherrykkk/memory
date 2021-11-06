<template>
  <div class='view'>
    <div class="game-container">
      <div class="flying card"
       v-if="currentIndex!=-1"
       :style="flyingPosition"
      >{{currentGroup[currentIndex].part2}}</div>
      <div v-for="(e,i) in currentGroup" :key="i"
       class="card"
       :style="{ top: Math.floor(e.position/4)*50+'px',left: (e.position%4)*75+'px'  }"
       @click="shoot(e)"
      >
        {{e.part1}}
      </div>
    </div>
    <div class='return' @click="$router.push({path:'/'})">
      退出
    </div>
  </div>    
</template>

<script>

export default {
  data () {
    return {
      currentGroup: null,
      currentIndex: 0,
      flyingPosition:{
        left: "20px",
        top: "30px"
      },
      flyingHandler: null
    }
  },
  created(){
    this.currentGroup = JSON.parse(localStorage.getItem("currentGroup"))
    this.upset()
    this.start()
  },
  methods:{
    upset(){
      let position = 0
      let arr = this.currentGroup
      for(let i in arr){
        let random = Number(i)+Math.floor(Math.random()*(arr.length-i))
        let temp = arr[random]
        arr[random] = arr[i]
        arr[i] = temp
        position += Math.floor(1+Math.random()*4)
        arr[i].position = position
      }
    },
    start(){
      this.currentIndex = Math.floor(Math.random()*this.currentGroup.length)
      this.flyingHandler = setInterval(()=>{
        if( this.currentGroup.length>0 )
          this.currentIndex = Math.floor(Math.random()*this.currentGroup.length)
        else{
          clearTimeout(this.flyingHandler)
        }
      },10000)
      setInterval(()=>{
        this.flyingPosition.top = Math.floor(Math.random()*400)+'px'
        this.flyingPosition.left = Math.floor(Math.random()*225)+'px'
      },3000)
    },
    shoot(e){
      if(e.id==this.currentGroup[this.currentIndex].id){
        this.currentGroup.splice(this.currentIndex,1)
        if(this.currentGroup.length>0)
          this.currentIndex = Math.floor(Math.random()*this.currentGroup.length)
        else{
          this.currentIndex = -1
        }
      }
    }
  }
      
}
</script>

<style lang="less" scoped>

.view {
  width:100%;
  margin-top:40px;
}
.game-container {
  position: relative;
  width: 300px;
  height: 500px;
  border: springgreen solid 1px;
  margin: 0 auto;
  .card {
    position: absolute;
    width: 75px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    border: springgreen solid 1px;
  }
  .flying{
    border: slateblue solid 1px;
    transition: 2s;
    background-color: white;
    z-index: 1;
  }
}
.return {
  position: fixed;
  bottom: 20px;
}

</style>