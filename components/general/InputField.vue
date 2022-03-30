<template>
  <ValidationProvider v-slot="field" class="relative" :rules="rules">
    <input
      v-model="innerValue"
      class="typo-400 peer block h-16 w-full translate-y-[0.625rem] rounded-full bg-transparent px-9 py-4 placeholder-transparent placeholder-shown:translate-y-0 focus:translate-y-[0.625rem] sm:h-20 sm:text-2xl"
      :type="type"
      :name="name"
      :placeholder="name"
    />
    <label
      class="pointer-events-none absolute top-3 left-9 text-xs text-custom-gray-dark transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs sm:text-base peer-placeholder-shown:sm:top-6 peer-placeholder-shown:sm:text-2xl peer-focus:sm:top-3 peer-focus:sm:text-base"
      :for="name"
    >
      {{ name }}
    </label>
    <!-- BACKGROUND -->
    <div
      class="pointer-events-none absolute inset-0 h-16 w-full rounded-full bg-white bg-opacity-15 sm:h-20"
    />
    <transition mode="out-in" name="slideRightIn">
      <div
        v-if="!field.valid && field.validated"
        :key="field.errors[0]"
        class="absolute w-full pl-9 text-sm text-red-500 sm:text-base"
      >
        {{ field.errors[0] }}
      </div>
    </transition>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      required: false,
    },

    rules: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      innerValue: '',
    }
  },

  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal)
    },

    value(newVal) {
      this.innerValue = newVal
    },
  },
}
</script>
