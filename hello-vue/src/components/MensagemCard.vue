<script setup lang="ts">

const props = defineProps({
  id: Number
})

const emit = defineEmits(["remover"]);

function remover() {
  emit("remover", props.id);
}

</script>

<template>
  <div class="card-mensagem">
    <header>
      <span><slot name="titulo"></slot></span>
      <span><slot name="categoria"></slot></span>
    </header>


    <main>
      <slot name="conteudo"></slot>
    </main>

    <footer>
      <span>
        <slot name="autor"></slot>
      </span>
      <span>
        <slot name="data"></slot>
      </span>
      <button @click="remover" class="btn-remover">Remover</button>
    </footer>

  </div>
</template>

<style scoped>

.card-mensagem {
  border: 1px solid var(--cor-primaria);
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #fff;
}

header {
  width: 100%;
  font-weight: bold;
  color: var(--cor-primaria);
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

footer {
  font-size: 0.9rem;
  color: #555;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-remover {
  padding: 4px 10px;
  border: none;
  background-color: var(--cor-primaria);
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

.btn-remover:hover {
  opacity: 0.9;
}

</style>