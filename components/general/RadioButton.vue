<template>
  <label class="flex cursor-pointer items-center space-x-5">
    <div
      class="relative z-10 flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full border-2 border-custom-gold-light p-1 text-black transition-colors ease-in-out sm:h-7 sm:w-7 sm:min-w-[1.75rem]"
    >
      <input
        v-model="checked"
        type="checkbox"
        class="relative z-0 h-6 w-6 min-w-[1.5rem] cursor-pointer rounded-full bg-transparent outline-none ring-offset-2 ring-offset-black focus:ring sm:h-7 sm:w-7 sm:min-w-[1.75rem] sm:ring-offset-4"
        :value="radioValue"
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

    radioValue: {
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

  methods: {
    onChange(e) {
      this.$emit('input', this.checkedProxy)
    },
  },
}
</script>
