<template>
  <div>
    <div class="absolute w-full">
      <div v-if="showResult" class="absolute cursor-pointer bg-white rounded-sm text-black shadow-lg  px-4 py-2 z-50 pr-6 before:w-3 before:h-3 before:absolute before:rotate-45 before:left-1/2 before:-bottom-1.5 before:-ml-1.5 before:bg-white ml-[-5%] mt-[30%] pointer-events-none"><span class="font-semibold">Falsch</span>
        <div class="text-custom-gray-dark">{{round(100 / amountQuestions * (amountQuestions - result))}}%</div>
      </div>
      <div
        class="gradient aspect-square h-full w-full rounded-full"
        @click="clickResult()"
        @mouseenter="clickResult()"
        @mouseleave="reset()"

      />
    </div>
    <div class="pointer-events-none -translate-x-4 -translate-y-4">
      <div v-if="showCorrect" class="absolute bg-white rounded-sm text-black shadow-lg px-4 py-2 z-50 ml-[60%] pr-6 before:w-3 before:h-3 before:absolute before:rotate-45 before:left-1/2 before:-bottom-1.5 before:-ml-1.5 before:bg-white pointer-events-none"><span class="font-semibold">Richtig</span>
        <div class="text-custom-gray-dark">{{round(100 / amountQuestions * result)}}%</div>
      </div>
      <ul class="sliceWrapper group">
        <li
          v-for="(question, index) in questionsCorect"
          :key="index"
          class="pointer-events-auto z-30 first-of-type:z-[29] first-of-type:shadow-lg last-of-type:z-[29] last-of-type:shadow-lg transition-all group-hover:first-of-type:shadow-[0px_98px_18px_-6px_rgba(0,0,0,0.5)] transition-all group-hover:last-of-type:shadow-[0px_0px_18px_-6px_rgba(0,0,0,0.4)]"
          :style="{
            transform: `rotate(${index * slicedeg}deg) skewY(${
              slicedeg + 90
            }deg)`,
          }"
          @click="clickCorrect()"
          @mouseenter="clickCorrect()"
          @mouseleave="reset()"
        >
          <!-- <div class="slice" /> -->
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
  props: {
    result: {
      type: Number,
      default: 0,
    },

    amountQuestions: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showResult: false,
      showCorrect: false
    }
  },

  computed: {
    questions() {
      return this.amountQuestions * 2
    },

    questionsCorect() {
      return this.result * 2
    },

    slicedeg() {
      return 360 / this.questions
    },
  },
  methods: {
    clickResult() {
      this.showResult = !this.showResult
      this.showCorrect = false
    },
    reset() {
      this.showCorrect = false
      this.showResult = false

    },
    clickCorrect() {
      this.showResult = false
      this.showCorrect = !this.showCorrect
    },
    round(num) {
      return Math.round(num * 100) / 100
    }
  }
}
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
  border: 1px #eeead9 solid;
  background: #eeead9;
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
