<script lang="ts">
export default {
  name: 'my-component',
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emit: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // {capitalize: true}
  },
  methods: {
    emitValue(e: any) {
      let value = e.target.value
      console.log(this)
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>