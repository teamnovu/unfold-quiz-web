<template>
  <button class="group flex items-center rounded-full p-1 pl-3 lg:justify-end">
    <div
      class="relative h-7 w-7 shrink-0 transition-transform ease-in-out group-hover:-translate-x-2 sm:h-12 sm:w-12"
    >
      <!-- ARROW -->
      <ArrowIcon
        class="absolute left-1/2 top-1/2 w-3 -translate-x-1/2 -translate-y-1/2 rotate-180 transform text-custom-gold-light transition-colors ease-in-out group-hover:text-custom-gold sm:w-5"
      />
    </div>
    <span
      class="typo-400 text-base text-custom-gold-light transition-colors ease-in-out group-hover:text-custom-gold sm:text-xl"
    >
      <slot />
    </span>
  </button>
</template>
