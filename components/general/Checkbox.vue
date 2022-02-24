<template>
  <label class="flex cursor-pointer items-center space-x-3">
    <div
      class="relative z-10 flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded p-1 text-black transition-colors ease-in-out sm:h-7 sm:w-7 sm:min-w-[1.75rem]"
      :class="[checkedProxy ? 'bg-custom-gold-light' : 'bg-transparent']"
    >
      <input
        v-model="checked"
        type="checkbox"
        class="ring-blue-custom-old relative z-0 h-6 w-6 min-w-[1.5rem] cursor-pointer rounded border-2 border-custom-gold-light bg-transparent outline-none ring-offset-2 ring-offset-custom-gray-darker focus:ring sm:ring-offset-4"
        :value="checkboxValue"
        @change="onChange"
      />
      <transition name="bounce">
        <CheckmarkIcon
          v-if="checkedProxy"
          class="absolute inset-0 z-10 h-full w-full p-px"
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

    checkboxValue: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      checkedProxy: false,
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
