<template>
  <div class="messagelist">
    <ChatMessage
      v-for="message in messages"
      v-bind:message="message"
      v-bind:key="messages.findIndex((element) => element === message)"
      v-bind:token="token"
    />
  </div>
</template>

<script>
import ChatMessage from "./ChatMessage.vue";
export default {
  name: "ChatMessageList",
  components: { ChatMessage },
  props: ["messages", "token"],
};
</script>

<style scoped>
.messagelist {
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: visible; /* should never happen */
  overflow-wrap: break-word;
  flex-grow: 1;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-hover)
    rgba(var(--color-background-mute-tupel), 64);
}

.messagelist::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  background-color: rgba(var(--color-background-mute-tupel), 64);
}

.messagelist::-webkit-scrollbar-thumb {
  background-color: var(--color-border-hover);
}
</style>
