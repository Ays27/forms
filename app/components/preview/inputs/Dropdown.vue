<template>
  <select class="border p-2 rounded w-full">
    <option
      v-for="(opt, i) in question.options"
      :key="i"
    >
      {{ opt.text }}
    </option>
  </select>
</template>