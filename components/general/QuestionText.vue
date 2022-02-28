<template>
  <div>
    <h2 class="typo-600 inline-block pr-[10vw]">
      <span v-for="(el, index) in data" :key="index">
        <span
          v-if="el.type === 'text'"
          :key="index"
          v-html="removePTags(el.text)"
        />
        <RadioButton
          v-if="el.type === 'radio_buttons'"
          :value="true"
          class="inline-flex"
        />
        <Checkbox
          v-if="el.type === 'checkboxes'"
          :value="true"
          class="inline-flex"
        />
      </span>
    </h2>
  </div>
</template>

<script>
import { removePTags } from '~/utils'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    removePTags(text) {
      return removePTags(text)
    },
  },
}
</script>
