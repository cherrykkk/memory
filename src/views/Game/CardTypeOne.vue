<template>
    <div class="card" :style="{width:width+'px',height:height+'px'}"
    :class='{cardUp:cardUp}'>
        <div class="card-face" style="background-image: url(&quot;static/face1.jpg&quot;);">
            <div class="word">{{part}}</div>
        </div>
        <div class="card-back" style="background-image: url(&quot;static/back1.jpg&quot;);">
        </div>
    </div>
</template>

<script>

export default {
    props:{
        part:String,
        cardId:String,
        cardUp:Boolean,
        width:Number,
        height:Number
    },
    methods:{
    }
}

</script>

<style lang='less' scoped>
.card{
    /* position: relative; */
    float:left;
    /*宽高由 js 根据屏幕定义*/
    /* border:solid #999 2px; */
    text-align: center;
    .card-face,.card-back{
        transition: all 1s;
        background-size:100%;
        position: relative;
        width:98%;
        height:98%;
        margin:1%;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
    .card-face{
        background-color: red;
        z-index:1;
        transform: rotateY(180deg);
    }
    .card-back{
        top:-100%;
        background-color: blue;
    }
}
.cardUp{
    .card-face{
        transform: rotateY(0);
    }
    .card-back{
        transform: rotateY(180deg);
    }
}
</style>