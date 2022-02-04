<template>
  <button type="button" class="vButton"><slot></slot></button>
</template>

<script>
export default {
  name: "VButton",
};
</script>

<style scoped>
.vButton {
  display: block;
  background-color: var(--color-background-soft);
  border-width: 0;
  border-radius: 5px;
  color: var(--color-text);
  padding: 5px;
  cursor: pointer;
}
.vButton:hover {
  background-color: var(--color-background-mute);
}
</style>
