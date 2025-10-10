<script setup lang="ts">
import {computed, ref} from "vue";

const contador = ref(0)

const contadorDois = ref(1)

const somaContadores = computed(() => contador.value + contadorDois.value)

const classContadorUm = computed(() => contador.value > contadorDois.value ? 'destaque' : '')
const classContadorDois = computed(() => contadorDois.value > contador.value ? 'destaque' : '')

const incrementar = () => {
  contador.value++
}

const decrementar = () => {
  contador.value > 0 ? contador.value-- : 0
}

const incrementar2 = () => {
  contadorDois.value++
}

const decrementar2 = () => {
  contadorDois.value > 0 ? contadorDois.value-- : 0
}
</script>

<template>
  <div>
    <p :class="classContadorUm">Contador: {{ contador }}</p>
    <button @click="incrementar">Incrementar</button>
    <button @click="decrementar">Decrementar</button>
  </div>

  <div>
    <p :class="classContadorDois">Contador 2: {{ contadorDois }}</p>
    <button @click="incrementar2">Incrementar</button>
    <button @click="decrementar2">Decrementar</button>
  </div>

  <p>Soma dos contadores: {{ somaContadores }}</p>
</template>

<style scoped>

.destaque {
  font-weight: bold;
  color: red;
}

</style>