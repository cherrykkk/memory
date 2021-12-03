<template>  
  <div class='view'>
    <help pageTitle="index"></help>
    <div class='tag-bar' ref='pageTags'>
      <div v-for='(e,i) in memoryData' :key='i'
        class='page-tag' :class='[{selected:state.selectedIndex==i}]'
        @click='changePage(i)'>
          {{e.pageName}}
      </div>
      <div class='page-tag' @click='addPage()'>+</div>
    </div>
    <div class='memory-show' v-if='memoryData[state.selectedIndex]'>
      <div class="page-name" v-show="!state.pageNameEditing" @click="pageNameChange(true)">{{state.pageName}}</div>
      <input class="page-name" v-show="state.pageNameEditing" @blur="pageNameChange(false)" v-model="state.pageName" ref='pageNameInput'>
      <div v-for='(e,i) in memoryData[state.selectedIndex].pageCards' :key='i'>
        {{e.part1}} = {{e.part2}}
        <span class='remove' 
        @click='removeMemory(e.id)'>
          x
        </span>
      </div>
    </div>
    <div>
      <div class='inputs'>
        <input v-model='input1' @change='state.debounce=false'/> 
        <br> = <br>
        <input v-model='input2' @change='state.debounce=false'/>
      </div>
    <controller :option="controllerOption"></controller>
    </div>
    <div class="start-container">
      <div class='start-botton' @click='startGame(1)'>游戏1</div>
      <div class='start-botton' @click='startGame(2)'>游戏2</div>
    </div>
  </div>
</template>

<script>
import Controller from './Controller/Controller.vue'
import Help from './Help/Help'

export default {
  components:{Help,Controller},
  data () {
    return {
      memoryData:{},
      input1:'',
      input2:'',
      state: {
        debounce: false,//true代表进入防抖状态，此时提交无效。
        selectedIndex: 0,
        selectedPageId: -1,
        pageName: null,
        pageNameEditing: false
      },
      controllerOption: [
        {
          name: "清空",
          func: ()=>{
            this.input1 = this.input2 = ""
          }
        },{
          name: "提交",
          func: ()=>{
            const { state,input1,input2 } = this
            if(state.debounce){
              console.log("请不要重复提交")
              return 
            }
            else if( input1 == '' || input2 == ''){
              console.log("不可为空")
              return 
            }
            else {
              state.debounce = true
              fetch(`../api/addMemory.php?part1=${input1}&part2=${input2}&pageId=${state.selectedPageId}`)
              .then(response => response.json()) //response只能读一次，如果在这一行console.log了，下一行就读不到纯数据了
              .then(response=>{
                console.log(response)
                this.init()
              })
            }
          }
        }
      ]
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      const { state } = this
      fetch(`../api/getMemory.php`)
      .then((response)=>response.json())
      .then((data)=>{
        this.memoryData = data;
        if( !state.selectedIndex ) {
          state.selectedIndex = 0
        }
        this.changePage( state.selectedIndex )
      });
    },
    changePage(i) {
      const { state,memoryData } = this
      state.selectedIndex = i
      state.selectedPageId = memoryData[i].pageId
      state.pageName = memoryData[state.selectedIndex].pageName
    },
    pageNameChange(editing) {
      const { state } = this
      state.pageNameEditing=editing
      if( editing===true ) {
        setTimeout(()=>{
          this.$refs.pageNameInput.focus()
        },0) //无定时器的话 focus() 无法生效，也许设置了定时器后宏任务就一定调用在在 input 显示之后
      }
      else {
        state.pageName.trim()
        if(state.pageName==""){
          console.log("不可为空")
          return
        }
        fetch(`../api/changePageName.php?pageId=${state.selectedPageId}&pageName=${state.pageName}`)
        .then((response)=>response.json())
        .then((data)=>{
          // this.memoryData = data;
          console.log(data)
          if(data.success===true){
            this.init()
          }
        });
      }
    },
    removeMemory(id){
      //判断当前删除的是否是当前页的最后一个词
      const { state } = this
      if(this.memoryData[state.selectedIndex].pageCards.length == 1)
        state.selectedIndex--;

      fetch(`../api/removeMemory.php?id=${id}`)
      .then(response => response.json()) //response只能读一次，如果在这一行console.log了，下一行就读不到纯数据了
      .then(response=>{
        console.log(response)
        this.init()
      })
    },
    startGame(type){
      const { state } = this
      localStorage.setItem("currentGroup",JSON.stringify(this.memoryData[state.selectedIndex].pageCards))
      if(type==1)
        this.$router.push({path:'/Game',query:{sets:JSON.stringify(this.memoryData[state.selectedIndex].pageCards)}})
      else if(type==2)
        this.$router.push({path:'/GameTwo'})
    },
    addPage(){
      const { state } = this
      this.memoryData.push({
        pageId:-1,
        pageName:"默认分组",
        pageCards:[]
      })
      state.selectedIndex = this.memoryData.length-1
    }
  }
}


</script>

<style lang='less' scoped>
.view{
  padding-top: 40px;
  background: linear-gradient(-30deg,#03a9f4 0%,#3a78b7 50%,#262626 50%, #607d8b 100%);
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
  background-color: white;
  .page-name {
    margin: 10px;
    font-size: 20px;
  }
}
.remove{
  position: absolute;
  right:10px;
}
.inputs{
  margin:20px;
}
.start-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
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