<template>
  <div class='view'>
    <help pageTitle="gameTwo"></help>
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
import Help from '../Help/Help'
export default {
  components:{
    Help
  },
  data () {
    return {
      currentGroup: null,
      currentIndex: 0,
      flyingPosition:{
        left: "20px",
        top: "30px"
      },
      flyingMoveHandler: null,
      flyingChangeHandler: null
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
      this.newFlyingCard()
    },
    newFlyingCard(){
      if( this.currentGroup.length>0 ){
        this.currentIndex = Math.floor(Math.random()*this.currentGroup.length)
        clearTimeout(this.flyingChangeHandler)
        clearTimeout(this.flyingMoveHandler)
        this.flyingChangeHandler = setInterval( ()=>this.newFlyingCard(), 10000)
        this.flyingMoveHandler = setInterval( ()=>this.flyMove(), 3000)
      }
      else{
        this.currentIndex = -1
      }
    },
    flyMove(){
      this.flyingPosition.top = Math.floor(Math.random()*400)+'px'
      this.flyingPosition.left = Math.floor(Math.random()*225)+'px'
    },
    shoot(e){
      if(e.id==this.currentGroup[this.currentIndex].id){
        this.currentGroup.splice(this.currentIndex,1)
        this.newFlyingCard()
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
  border: #99CCFF solid 1px;
  margin: 0 auto;
  .card {
    position: absolute;
    width: 75px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    border: #99CCFF solid 1px;
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