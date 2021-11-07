<template>  
  <div class='view'>
    <help pageTitle="index"></help>
    <div class='tag-bar' ref='pageTags'>
      <div v-for='(e,i) in memoryData' :key='i'
        class='page-tag' :class='[{selected:selectedIndex==i}]'
        @click='selectedIndex = i'>
          {{e.pageName}}
      </div>
      <div class='page-tag' @click='addPage()'>+</div>
    </div>
    <div class='memory-show' v-if='memoryData[selectedIndex]'>
      <div v-for='(e,i) in memoryData[selectedIndex].pageCards' :key='i'>
        {{e.part1}} = {{e.part2}}
        <span class='remove' 
        @click='removeMemory(e.id)'>
          x
        </span>
      </div>
    </div>
    <div>
      <div class='inputs'>
        <input v-model='input1' @change='debounce=false'/> 
        <br> = <br>
        <input v-model='input2' @change='debounce=false'/>
      </div>
      <div>
        <div class='btn'
        @click='clearInput()'>清空</div>
        <div class='btn'
        @click='addMemory()'>提交</div>
      </div>
    </div>
    <div class="start-container">
      <div class='start-botton' @click='startGame(1)'>游戏1</div>
      <div class='start-botton' @click='startGame(2)'>游戏2</div>
    </div>
  </div>
</template>

<script>
import Help from './Help/Help'
export default {
  components:{Help},
  data () {
    return {
      memoryData:{},
      selectedIndex:0,
      input1:'',
      input2:'',
      debounce: false //true代表进入防抖状态，此时提交无效。
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      fetch(`../api/getMemory.php`)
      .then((response)=>response.json())
      .then((data)=>{
        this.memoryData = data;
        console.log(this.memoryData)
      });
    },
    addMemory(){
      if(this.debounce){
        console.log("请不要重复提交")
        return 
      }
      else  
        this.debounce = true
      let pageId = this.selectedIndex
      if(this.input1 == '' || this.input2 == ''){
        console.log("不可为空")
        return 
      }
      if(pageId == -1)
        pageId = 'newPage'

      fetch(`../api/addMemory.php?part1=${this.input1}&part2=${this.input2}&pageId=${pageId}`)
      .then(response => response.json()) //response只能读一次，如果在这一行console.log了，下一行就读不到纯数据了
      .then(response=>{
        console.log(response)
        this.init()
      })
    },
    clearInput(){
      this.input1 = this.input2 = ''
    },
    removeMemory(id){
      //判断当前删除的是否是当前页的最后一个词
      if(this.memoryData[this.selectedIndex].pageCards.length == 1)
        this.selectedIndex--;

      fetch(`../api/removeMemory.php?id=${id}`)
      .then(response => response.json()) //response只能读一次，如果在这一行console.log了，下一行就读不到纯数据了
      .then(response=>{
        console.log(response)
        this.init()
      })
    },
    startGame(type){
      localStorage.setItem("currentGroup",JSON.stringify(this.memoryData[this.selectedIndex].pageCards))
      if(type==1)
        this.$router.push({path:'/Game',query:{sets:JSON.stringify(this.memoryData[this.selectedIndex].pageCards)}})
      else if(type==2)
        this.$router.push({path:'/GameTwo'})
    },
    addPage(){
      this.memoryData.push({
        pageId:-1,
        pageName:"默认分组",
        pageCards:[]
      })
      this.selectedIndex = this.memoryData.length-1
    },
  }
}

</script>

<style lang='less' scoped>
.view{
  margin-top:40px;
}
.tag-bar{
  position: relative;
  display: flex;
  margin: 0 30px;
  z-index: 1;
  height:20px;
  .page-tag{
    box-shadow:-3px -3px 3px -3px,3px -3px 3px -3px;
    padding: 0 4px;
    margin-right: 4px;
    height:24px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .selected{
    background-color: white;
    height:26px;
  }
}
.memory-show{
  margin: 0 30px;
  padding: 10px 0;
  box-shadow: 0 0 3px 0px;
}
.remove{
  position: absolute;
  right:10px;
}
.inputs{
  margin:20px;
}
.btn{
  display:inline-block;
  width:49%;
}
.start-container {
  width: 100%;
  display: flex;
  .start-botton{
    margin:30px;
    padding:20px;
    border-radius: 50%;
    box-shadow:0 0 3px 0px black;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      box-shadow:0 0 1px 0px black;
    }
  }
}

</style>