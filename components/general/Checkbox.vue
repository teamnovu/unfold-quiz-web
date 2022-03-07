<template>
  <label class="flex w-fit cursor-pointer items-center space-x-3">
    <div
      class="pointer-events-none relative z-10 flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded text-black transition-colors ease-in-out sm:h-7 sm:w-7 sm:min-w-[1.75rem]"
    >
      <input
        v-model="checked"
        type="checkbox"
        class="ring-blue-custom-old pointer-events-auto relative z-0 h-6 w-6 min-w-[1.5rem] cursor-pointer rounded border-2 border-custom-gold-light outline-none focus:ring-1"
        :class="[checkedProxy ? 'bg-custom-gold-light' : 'bg-transparent']"
        @change="onChange"
      />
      <transition name="bounce">
        <CheckmarkIcon
          v-if="checkedProxy"
          class="absolute inset-0 z-10 h-full w-full p-1"
        />
      </transition>
    </div>

    <span class="typo-text-300">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      checkedProxy: this.value,
    }
  },

  computed: {
    checked: {
      get() {
        return this.value
      },

      set(val) {
        this.checkedProxy = val
      },
    },
  },

  watch: {
    value(newValue) {
      this.checkedProxy = newValue
    },
  },

  methods: {
    onChange(e) {
      this.$emit('input', this.checkedProxy)
    },
  },
}
</script>
