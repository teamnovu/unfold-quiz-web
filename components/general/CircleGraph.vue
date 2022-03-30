<template>
  <div>
    <svg viewBox="0 0 20 20">
      <defs>
        <linearGradient
          :id="unique('color-1')"
          y1="0%"
          x1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stop-color="white" />
          <stop offset="22%" stop-color="red" />
          <stop offset="100%" stop-color="white" />
        </linearGradient>
        <linearGradient :id="unique('color-2')" y2="20">
          <stop offset="0%" stop-color="#F0E5BF" />
          <stop offset="100%" stop-color="#BEAD76" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow
            dx="0"
            dy="0.2"
            stdDeviation="1.8"
            flood-opacity=".18"
            flood-color="#796628"
          />
        </filter>
      </defs>
      <mask :id="unique('clip')">
        <circle r="8" cx="10" cy="10" fill="#fff" />
      </mask>
      <foreignObject
        x="0"
        y="0"
        width="20"
        height="20"
        :mask="`url(#${unique('clip')})`"
      >
        <div class="circle" />
      </foreignObject>
      <mask
        v-for="(data, index) in chartData"
        :id="unique(`datapoint-${index}`)"
        :key="index"
      >
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="white"
          stroke-width="10"
          :stroke-dasharray="`calc(${data.value} * 31.42 / 100) 31.42`"
          :transform="`rotate(${data.rotate})`"
          transform-origin="center"
        />
      </mask>
      <g v-for="(data, index) in chartData" :key="index" filter="url(#shadow)">
        <foreignObject
          x="0"
          y="0"
          width="20"
          height="20"
          :mask="`url(#${unique(`datapoint-${index}`)})`"
        >
          <div
            class="h-full shadow-md"
            :style="`background: ${data.background};`"
          />
        </foreignObject>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    values: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      colors: ['#EBDFB7', '#F1EFEA', '#FFFFFF'],
      gradients: [
        'linear-gradient(180deg, #FFFFFF 0%, #EBE7D3 22%, #FFFFFF 100%)',
        'linear-gradient(180deg, #F0E5BF 0%, #BEAD76 100%)',
      ],
    }
  },

  computed: {
    sortedValues() {
      return [...this.values].sort((a, b) => {
        return a - b
      })
    },

    chartData() {
      let offset = 0

      return this.sortedValues
        .slice(0, -1)
        .map((value, index) => {
          const valueOffset = (value * 360) / 100
          const rotate = -90 - offset - valueOffset

          offset += valueOffset
          return {
            value,
            rotate,
          }
        })
        .reverse()
        .map((item, index) => {
          return {
            ...item,
            background: this.gradients[index % this.gradients.length],
          }
        })
        .reverse()
    },
  },

  methods: {
    unique(string) {
      return `${string}-${this._uid}`
    },
  },
}
</script>

<style scoped>
.circle {
  background: conic-gradient(
    from 0deg at 50% 50%,
    #ede9db 0%,
    #e9e2cb 18.23%,
    #f0e8cb 33%,
    #d5c283 60.59%,
    #cbb260 81.28%,
    #e5d087 88.67%,
    #ebdfb7 100%
  );

  @apply h-full;
}
</style>
