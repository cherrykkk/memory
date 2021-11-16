<template>
  <div class='view'>
    <div v-for='(e,i) in upseted' :key='i'>
        <card 
        :part='e.part' :cardId='e.id' :cardUp="e.up" @click.native='turnOver(e)'
        :width='cardWidth' :height='cardHeight'></card>
    </div>
    <controller :option="controllerOption"></controller>
  </div>    
</template>

<script>
import Card from './CardTypeOne.vue'
import Controller from "@/views/Controller/Controller.vue"

export default {
  components:{
    Card,
    Controller
  },
  data () {
    return {
      memorySets:[],
      upseted:[],
      memory:null,
      cardWidth:0,
      cardHeight:0,
      controllerOption: [
        {
          name: "返回",
          fun: ()=>{
            this.$router.push({path:'/'})
          }
        },{
          name: "选择皮肤",
          fun: ()=>{
            console.log("该功能还没做呢")
          }
        }
      ]
    }
  },
  created(){
    this.memorySets = JSON.parse(this.$route.query.sets)
    this.upset()
    this.initSize()
  },
  methods:{
    initSize(){
      let bodyWidth = document.body.clientWidth
      if (bodyWidth < 400){
          this.cardWidth = 90
      }
      else if (bodyWidth < 400){
          this.cardWidth = 108
      }
      else{
          this.cardWidth = 160
      }
      this.cardHeight = this.cardWidth*9/16
    },
    upset(){
      let set = []
      for( let e of this.memorySets ) {
        set.push({"part":e.part1,"id":e.id,"up":false,'lock':false})
        set.push({"part":e.part2,"id":e.id,"up":false,'lock':false})
      }
      for( let i in set ){
        let rand = Number(i)+Math.floor(Math.random()*(set.length-i))
        let temp = set[i]
        set[i] = set[rand]
        set[rand] = temp
      }
      this.upseted = set
    },
    turnOver(e){
      if(e.lock == false){
          e.up = true
      }
      this.testMatch(e)
    },
    testMatch(newCard){
      if(newCard.lock == true)
        return
      let memory = this.memory
      if(memory == null) {
        //没有已翻开但未固定的卡,则新卡保持向上，且锁定
        newCard.lock = true
        this.memory = newCard
        console.log("new card id is "+newCard.id)
      }
      else if( newCard.id != memory.id) {
        //有已翻开的卡但未匹配，则新卡与旧卡均在1s后翻回去,为了避免bug，临时锁一下
        this.waitToCover(newCard)
        this.waitToCover(this.memory)
        console.log("unmatch id are "+memory.id+" "+newCard.id)
        this.memory = null
      }
      else{
        //新翻开的卡与已翻开但未固定的卡匹配上了，都不翻回去
        console.log("match id are "+memory.id+" "+newCard.id)
        newCard.lock = true
        this.memory.lock = true
        this.memory = null
      }
    },
    waitToCover(e){
      e.lock = true
      setTimeout(()=>{
          e.up = false
          e.lock = false
      },1000)
    },
  }
      
}
</script>

<style scoped>

.view{
    width:100%;
    margin-top:40px;
}
.return{
    position: fixed;
    bottom: 20px;
}

</style>