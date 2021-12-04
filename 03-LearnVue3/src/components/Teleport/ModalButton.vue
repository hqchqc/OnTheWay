<script lang="ts">
import HelloWorld from '../HelloWorld.vue'
import MyComonent from '../VModel/VModel.vue'

export default {
  name: "modalButton",
  data() {
    return {
      modalOpen: false,
      myText: ''
    };
  },
  components: {
    HelloWorld,
    MyComonent
  }
}
</script>

<template>
  <MyComonent v-model.capitalize="myText" />

  <button @click="modalOpen = true">Open full screen modal!</button>
  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a modal!(My parent is "body")
        <HelloWorld msg="teleport" />
        <button @click="modalOpen = false">Close</button>
      </div>
    </div>
  </teleport>

  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        B
        <HelloWorld msg="teleport" />
        <button @click="modalOpen = false">Close</button>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>