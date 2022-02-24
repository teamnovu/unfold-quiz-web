<template>
  <div>
    <div class="absolute w-full">
      <div class="w-full h-full gradient rounded-full aspect-square">asd</div>
    </div>
    <div class="-translate-x-4 -translate-y-4">
      <ul class="sliceWrapper">
        <li v-for="(question, index) in questionsC" :key="index" :style="{'transform': `rotate(${(index) *slicedeg}deg) skewY(${slicedeg+90}deg);`}">
          <div class="slice"></div>
        </li>
        <!-- <li>
          <div class="slice"></div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            questions: 3,
            questionsC: 1,
        }
    },
    computed: {
        slicedeg() {
            return 360 / this.questions
        }
    }

 

};
</script>

<style scoped>
.gradient {
  background: transparent
    conic-gradient(
      from 0deg at 50% 50%,
      #ede9db 0%,
      #e9e2cb 18.23%,
      #f0e8cb 33%,
      #d5c283 56.65%,
      #d5c283 74.38%,
      #e5d087 84.73%,
      #ebdfb7 100%
    )
    0% 0% no-repeat padding-box;
}
</style>

<style lang="scss">


// 360/5=72 -> rotate
// rotate+90=162 -> skewY



.sliceWrapper {
  position: relative;
  padding: 0;
  width: 22rem;
  transform: rotate(315deg);
  height: 22rem;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
}

.slice {
  position: absolute;
  left: -100%;
  width: 200%;
  height: 200%;
}

li {
  overflow: hidden;
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  transform-origin: 0% 100%;
  border:1px #EEEAD9 solid;
  background: #EEEAD9;
}

// @for $i from 1 through 25 {
//   li:nth-child(#{$i}) {
//     transform: rotate(calc((#{$i}-1) * var(--slice-deg) + 0deg))
//       skewY(calc(var(--slice-deg) + 90deg));
//   }
// }

// @for $i from 1 through $questionsCorect {
//   li:nth-child(#{$i}) {
//     background: #EEEAD9;
//     border: 1px #EEEAD9 solid;
//   }
// }
</style>