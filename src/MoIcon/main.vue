<template>
  <svg class="dy-icon">
    <use :href="name" />
  </svg>
</template>
<script>
export default {
  name: 'MoIcon',
  props: {
    name: {type:String, default: null, required: true}
  }
}
</script>