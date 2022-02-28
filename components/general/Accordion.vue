<template>
  <div class="cursor-pointer" @click="toggleAccordion">
    <!-- TITLE -->
    <div class="mb-4 flex items-center justify-between">
      <slot name="header" />
      <!-- ICON -->
      <PlusMinus
        :plus="selected"
        class="h-3 w-3 self-start sm:h-5 sm:w-5 sm:self-auto"
      />
    </div>

    <!-- CONTENT -->
    <div>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div
          v-show="selected"
          class="text-sm transition-all ease-in-out sm:px-20 sm:text-lg"
        >
          <slot name="content" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selected: this.open,
    }
  },

  watch: {
    open(value) {
      this.selected = value
    },
  },

  methods: {
    toggleAccordion() {
      this.selected = !this.selected
      if (this.selected) {
        this.$emit('open')
      }
    },

    beforeEnter(el) {
      el.style.opacity = '0'
      el.style.height = '0'
    },

    enter(el) {
      el.style.height = el.scrollHeight + 'px'
    },

    afterEnter(el) {
      el.style.opacity = '1'
    },

    beforeLeave(el) {
      el.style.opacity = '1'
      el.style.height = el.scrollHeight + 'px'
      // Required to force recalculation. Without it first closing is not smooth.
      // eslint-disable-next-line
      el.scrollHeight
    },

    leave(el) {
      el.style.opacity = '0'
      el.style.height = '0'
    },
  },
}
</script>
