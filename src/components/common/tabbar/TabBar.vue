<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: white;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.8);
}

</style>