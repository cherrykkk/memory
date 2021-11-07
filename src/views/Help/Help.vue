<template>
  <div class='description'>
    <div class='icon'>?</div>
    <div class='description-text'>
      说明<br>
      <span v-for="(e,i) in description" :key="i">
        {{e}}<br>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    pageTitle: String
  },
  data () {
    return {
      description:[
        "1)当前账号公用，卡组也公用。",
        "2)切换到选中页后，在两个输入框内添加一对单词与释义，然后点击提交。",
        "3)选中想要进行记忆的卡组，然后点击 start game，开始配对游戏吧！"
      ]
    }
  },
  created(){
    if(this.pageTitle=="index"){
      this.description = [
        "1)当前账号公用，卡组也公用。",
        "2)切换到选中页后，在两个输入框内添加一对单词与释义，然后点击提交。",
        "3)选中想要进行记忆的卡组，然后点击 start game，开始配对游戏吧！"
      ]
    }
    else if(this.pageTitle=="gameTwo"){
      this.description = [
        "点击静止的词义，捕捉飞动中的对象吧"
      ]
    }
  }

}
</script>


<style lang="less" scoped>
.description{
  position:fixed;
  top:10px;
  right:10px;
  z-index: 10;
  .icon{
    height:24px;
    width:24px;
    line-height: 24px;
    border-radius: 12px;
    color: white;
    background-color: grey;
  }
  .description-text{
    position:fixed;
    display: none;
    width:80%;
    padding:5%;
    right:1%;
    color: white;
    background-color: grey;
    border-radius: 12px;
    text-align: left;
  }
  &:hover{
    .description-text{
      display: block;
    }
  }
}

</style>