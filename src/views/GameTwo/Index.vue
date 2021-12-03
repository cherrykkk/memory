<template>
  <div class='view' style="backgroundImage: url(static/sea.jpg)">
    <help pageTitle="gameTwo"></help>
    <div class="game-container">
      <div class="flying card"
       v-if="currentIndex!=-1"
       :style="flyingPosition"
      >{{currentGroup[currentIndex][type1]}}</div>
      <div v-for="(e,i) in currentGroup" :key="i"
       class="card2"
       :style="{ top: Math.floor(e.position/4)*50+'px',left: (e.position%4)*75+'px'  }"
       @click="shoot(e,$event.target)"
      >
        {{e[type2]}}
      </div>
    </div>
    <controller :option="controllerOption" class="controller"></controller>
  </div>    
</template>

<script>
import Help from '../Help/Help'
import Controller from "@/views/Controller/Controller.vue"
export default {
  components:{
    Help,
    Controller
  },
  data () {
    return {
      type1: "part1",
      type2: "part2",
      currentGroup: null,
      currentIndex: 0,
      flyingPosition:{
        left: "20px",
        top: "30px"
      },
      flyingMoveHandler: null,
      flyingChangeHandler: null,
      controllerOption: [
        {
          name: "退出",
          func: ()=>{
            this.$router.push({path:'/'})
          }
        },{
          name: "切换",
          func: ()=>{
            let temp = this.type1
            this.type1 = this.type2
            this.type2 = temp
          }
        }
      ]
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
    shoot(e,el){

      let deleteCard = ()=>{
        el.classList.remove("match-right")
        this.currentGroup.splice(this.currentIndex,1)
        this.newFlyingCard()
        el.removeEventListener("animationend",deleteCard)
      }

      if(e.id==this.currentGroup[this.currentIndex].id){
        el.classList.add("match-right")
        el.addEventListener("animationend",deleteCard)
      }
      else {
        //el.style.animationName = "matchWrong"
        //el.style.animation = "matchWrong 1s"
        el.classList.add("match-error")
        el.addEventListener("animationend",()=>{
          //el.style.animationName = ""
          el.classList.remove("match-error")
        })
      }
    }
  }
      
}
</script>

<style lang="less" scoped>

.view {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  .game-container {
    position: relative;
    width: 300px;
    height: 500px;
    margin: 0 auto;
    .card {
      position: absolute;
      width: 75px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      border: #99CCFF solid 1px;
      background-color: rgba(255,255,255,0.6);
    }
    .card2 {
      position: absolute;
      width: 65px;
      height: 40px;
      line-height: 40px;
      border-radius: 6px;
      border: rgba(255,255,255,0.2) solid 1px;
      background-color: rgba(255,255,255,0.1);
      box-shadow: 0 5px 35px rgba(0,0,0,0.4);
      color: white;
    }
    .flying{
      border: slateblue solid 1px;
      transition: 2s;
      background-color: rgba(0,225,255,0.8);
      z-index: 1;
    }
  }
  .controller {
    position: absolute;
    bottom: 0;
    background-color: rgba(255,255,255,0.6);
    box-shadow: 0 0 2px 2px white;
    color: white;
  }
}

.match-error {
  animation: 
    matchWrong 0.3s,
    flutter 0.2s ease-in-out 0s 30 normal;
}
.match-right {
  animation: match-right 0.3s;
}

@keyframes matchWrong
{
	0%   {
    box-shadow: 0 0 0 0 rgb(255, 1, 1);
  }
	100% {
    box-shadow: 0 0 2px 10px rgba(255, 1, 1,0);
  }
}

@keyframes match-right
{
	0%   {
    box-shadow: 0 0 0 0 rgb(153, 204, 255); 
  }
	100% {
    box-shadow: 0 0 2px 10px rgba(153, 204, 255,0);
  }
}

@keyframes flutter {
  0% {
    transform: translateX(-1px);
  }
  100% {
    transform: translateX(1px);
  }
}

</style>