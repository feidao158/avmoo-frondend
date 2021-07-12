<template>
  <div>
    <div class="action">
      <button @click="prevData" @keyup.left="prevData">prev</button>
      <button @click="nextData" @keyup.right="nextData">next</button>
    </div>

    <div>
      <input type="text" :value="formatCategoryInfo" />
     
    </div>
    <div class="header">
      <h1>{{ categoryInfo.title }}</h1>
      <img :src="categoryInfo.src" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,computed } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    let categoryInfo = ref({})

    document.addEventListener('keydown',(res)=> {
     
      if(res.keyCode==39){
        nextData()
      }

      if(res.keyCode==37) {
        prevData()
      }
    })

    let initValue = ref(0)

    let cacheIndex = localStorage.getItem('currentIndex')
    if(cacheIndex!=null) {
      console.log(cacheIndex)
      initValue.value = parseInt(cacheIndex)
    }

    

    const formatCategoryInfo = computed(()=>`apns-${preZeroFill(initValue.value,3)}`)


    function preZeroFill (num:any, size:any) {
    if (num >= Math.pow(10, size)) { //如果num本身位数不小于size位
        return num.toString();
    } else {
        var _str = Array(size + 1).join('0') + num;
        return _str.slice(_str.length - size);
    }
}


    function updateData() {
     
      fetch(`http://localhost:5000/info?category=${formatCategoryInfo.value}`).then((res) => {
        res.json().then((resData) => {
          categoryInfo.value = resData.data.detail_info
        });
      });
    }

  function nextData() {
    initValue.value +=1
    localStorage.setItem('currentIndex',initValue.value+'')
    updateData()
  }

  function prevData() {
    initValue.value -=1
    localStorage.setItem('currentIndex',initValue.value+'')
    updateData()
  }

  updateData()



    return {
      categoryInfo,
      updateData,
      nextData,
      formatCategoryInfo,
      prevData
    };
  },
});
</script>

<style lang="scss">
.action {
  display: flex;
  width: 120px;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
