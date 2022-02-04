<template>
  <div
    class="dialog-root"
    v-if="visible"
    @click="$emit('update:visible', false)"
  >
    <!-- Modal content -->
    <div :class="'dialog-content' + dialogClass_" @click.stop>
      <span
        class="close"
        @click="$emit('update:visible', false)"
        v-if="closable"
        >&times;</span
      >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VDialog",
  props: {
    visible: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    closable: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    dialogClass: {
      type: String,
      default: function () {
        return "";
      },
      validator: function (val) {
        return val.trim().length > 0;
      },
    },
  },
  computed: {
    dialogClass_() {
      return " " + this.dialogClass.trim();
    },
  },
};
</script>

<style scoped>
.dialog-root {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  display: flex;
}
.dialog-content {
  margin: auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid var(--color-border);
  background-color: rgba(var(--color-background-soft-tupel), 0.4);
}
.close {
  position: absolute;
  color: var(--color-text-highlight);
  top: 0;
  right: 10px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
.close:hover,
.close:focus {
  color: hsla(var(--color-text-highlight-hsl-tuple), 0.8);
  text-decoration: none;
}
</style>
