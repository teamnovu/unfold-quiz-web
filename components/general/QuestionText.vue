<template>
  <div>
        <h1
        class="typo-600 pr-[10vw] inline-block">
    <template v-for="(el, index) in data" >
      <span
      :key="index"
        v-if="el.type === 'text'"
        v-html="removePTags(el.text)"
      />
      <RadioButton
        v-if="el.type === 'radio_buttons'"
        class="
          min-h-[4rem]
          rounded-full
          inline-flex
          bg-white bg-opacity-15
          px-6
          py-4
          space-x-0
          sm:min-h-[5rem]
        "
      >
      </RadioButton>
      <Checkbox
        v-if="el.type === 'checkboxes'"
        class="
          typo-400
          space-x-0
          min-h-[4rem]
          rounded-full
          inline-flex
          bg-white bg-opacity-15
          px-6
          py-4
          sm:min-h-[5rem]
        "
      >
      </Checkbox>
    </template>
        </h1>
  </div>
</template>

<script>

import { removePTags } from '~/utils'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    removePTags(c) {
      return removePTags(c)
    },
  },
};
</script>