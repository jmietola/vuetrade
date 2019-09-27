<template>
  <div class="positions--list">
    <div
      class="p-4 shadow-md bg-white rounded border bg-white mb-2 list--item"
      v-for="position in positions"
      v-bind="{position}"
      :key="position.asset_id"
    >
      <slot v-bind="position"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'positions-list',
  props: {
    positions: {
      type: Array,
      required: true
    }
  }
}
</script>
