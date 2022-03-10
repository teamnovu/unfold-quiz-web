<template>
  <label class="flex w-fit cursor-pointer items-center">
    <div
      class="relative z-10 flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full border-2 border-custom-gold-light p-1 text-black transition-colors ease-in-out sm:h-7 sm:w-7 sm:min-w-[1.75rem]"
    >
      <input
        v-model="checked"
        type="checkbox"
        class="relative z-0 h-6 w-6 min-w-[1.5rem] cursor-pointer rounded-full bg-transparent outline-none ring-custom-gold-light ring-offset-custom-gray-darker focus:ring-1 sm:h-7 sm:w-7 sm:min-w-[1.75rem]"
        :disabled="disabled"
        @change="onChange"
      />
      <transition name="bounce">
        <div
          v-if="checkedProxy"
          class="absolute inset-0 m-1 rounded-full bg-custom-gold-light"
        />
      </transition>
    </div>

    <span class="typo-400">
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

    disabled: {
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
