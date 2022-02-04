<template>
  <div class="vInputDiv">
    <input
      :type="type_.length > 0 ? type_ : 'input'"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :class="'vInputInput' + (inputClass ? ' ' + inputClass : '')"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "VInput",
  props: {
    type: {
      validator: function (value) {
        return ["password", "input", ""].indexOf(value) !== -1;
      },
    },
    autocomplete: String,
    placeholder: String,
    inputClass: String,
    modelValue: String,
  },
  computed: {
    type_() {
      return this.type ? this.type : "";
    },
  },
};
</script>

<style scoped>
.vInputInput {
  display: block;
  border-width: 0;
  color: var(--color-text);
  border-bottom: 1px hidden #aaac;
  border-radius: 0;
  background-color: transparent;
  flex-shrink: 1;
  width: 100%;
}
.vInputInput:focus-within {
  border-bottom: 1px solid #aaac;
  outline: none;
}
.vInputDiv {
  display: flex;
  background-color: var(--color-background-soft);
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}
.vInputDiv:focus-within {
  outline: none;
  background-color: var(--color-background-mute);
}
</style>
