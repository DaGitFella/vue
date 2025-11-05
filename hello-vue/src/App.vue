<template>
  <h1>Selecione a atividade que deseja exibir</h1>

  <section class="show-buttons-list">
    <button @click="exibirAtividadeUm = !exibirAtividadeUm">
      {{ exibirAtividadeUm ? 'Ocultar' : 'Mostrar' }} Contador Simples
    </button>
    <button @click="exibirAtividadeDois = !exibirAtividadeDois">
      {{ exibirAtividadeDois ? 'Ocultar' : 'Mostrar' }} Listagem da atividade 2
    </button>
    <button @click="exibirAtividadeTres = !exibirAtividadeTres">
      {{ exibirAtividadeTres ? 'Ocultar' : 'Mostrar' }} Card de mensagens
    </button>
    <button @click="exibirAtividadeQuatro = !exibirAtividadeQuatro">
      {{ exibirAtividadeQuatro ? 'Ocultar' : 'Mostrar' }} Contador do ciclo de vida
    </button>
    <button @click="exibirAtividadeCinco = !exibirAtividadeCinco">
      {{ exibirAtividadeCinco ? 'Ocultar' : 'Mostrar' }} Form de mensagens
    </button>
  </section>

  <!--  Atividade do módulo 1-->
  <section v-if="exibirAtividadeUm">
    <h2>Contador simples</h2>
    <atividadeUm />
  </section>

  <!--  Atividade do módulo 2-->
  <section v-if="exibirAtividadeDois" class="grey-background">
    <h2>Listagem simples</h2>
    <atividade-dois />
  </section>

  <!--  Exemplo do módulo 3-->
  <section v-if="exibirAtividadeTres">
    <div class="container">
      <h1 class="titulo">Lista de mensagens</h1>
      <div v-if="mensagens.length > 0">
        <MensagemCard v-for="mensagem in mensagens" :key="mensagem.id" :id="mensagem.id" @remover="removerMensagem">
          <template #titulo>{{ mensagem.titulo }}</template>
          <template #conteudo>{{ mensagem.texto }}</template>
          <template #autor>{{ mensagem.autor }}</template>
          <template #data>{{ mensagem.dataHoraIso }}</template>
        </MensagemCard>
      </div>
      <p v-else>Nenhuma mensagem registrada.</p>
    </div>
  </section>

  <!--  Outro exemplo do módulo 3-->
  <section v-if="exibirAtividadeQuatro">
    <Contador></Contador>
  </section>

  <!--  Atividade do módulo 3-->
  <section v-if="exibirAtividadeCinco">
    <h1 class="titulo">Formulário de mensagens</h1>
    <MensagemForm @adicionar="adicionarMensagem" @limpar="limparMensagens" :showClear="mensagens.length > 0"
      :categorias="categorias" />

    <div v-if="mensagens.length > 0" class="card-items">
      <div class="filtros-container">
        <button @click="showFilter = !showFilter"><i class="fa-solid fa-filter"></i></button>
        <div v-if="showFilter" class="filtros">
          <select v-model.trim="categoria">
            <option value="">Mostrar todos</option>

            <option v-for="catg in categorias" :key="catg.id">{{ catg.categoria }}</option>
          </select>
        </div>
      </div>
      <MensagemCard v-for="mensagem in mensagensFiltradas" :key="mensagem.id" :id="mensagem.id"
        @remover="removerMensagem">
        <template #titulo>{{ mensagem.titulo }}</template>
        <template #conteudo>{{ mensagem.texto }}</template>
        <template #autor>{{ mensagem.autor }}</template>
        <template #data>{{ formatarDataHora(mensagem.dataHoraIso) }}</template>
        <template #categoria>{{ mensagem.categoria }}</template>
      </MensagemCard>
      <p v-if="!mensagensFiltradas.length">Nenhuma mensagem encontrada nessa categoria.</p>
      <p v-else class="destaque">Exibindo {{ mensagensFiltradas.length }} de {{ mensagens.length }}</p>
    </div>
    <p v-else class="vazio">Nenhuma mensagem registrada.</p>
  </section>

  <!-- Exemplo do módulo 4 -->
  <div class="container">
    <h1 class="titulo">📬 Mensagens da API</h1>

    <!-- Formulário para criar mensagens -->
    <MensagemForm @adicionar="adicionarMensagem" />

    <!-- Estado de carregamento -->
    <div v-if="carregando" class="estado carregando">
      <p>⏳ Carregando mensagens...</p>
    </div>

    <!-- Estado de erro -->
    <div v-else-if="erro" class="estado erro">
      <p>⚠️ {{ erro }}</p>
      <button @click="carregarMensagens">Tentar novamente</button>
    </div>

    <!-- Estado vazio -->
    <div v-else-if="mensagens.length === 0" class="estado vazio">
      <p>🗒️ Nenhuma mensagem encontrada.</p>
      <small>Dica: adicione uma nova mensagem usando o formulário!</small>
    </div>

    <!-- Lista de mensagens -->
    <div v-else class="lista">
      <MensagemCard v-for="msg in mensagens" :key="msg.id">
        <template #titulo>{{ msg.titulo }}</template>
        <template #conteudo>{{ msg.texto }}</template>
        <template #autor>{{ msg.autor }}</template>
        <template #data>{{ formatarDataHora(msg.dataHoraIso) }}</template>
      </MensagemCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import atividadeUm from '@/components/atividadeUm.vue';
import atividadeDois from '@/components/atividadeDois.vue';
import MensagemCard from "@/components/MensagemCard.vue";
import Contador from "@/components/Contador.vue";
import MensagemForm from '@/components/MensagemForm.vue';

import { type MensagemEnviar, type MensagemReceber } from './interfaces/MensagmInterface';
import { CriarMensagem, getMensagens } from './services/messageService';

const exibirAtividadeUm = ref(false)
const exibirAtividadeDois = ref(false)
const exibirAtividadeTres = ref(false)
const exibirAtividadeQuatro = ref(false)
const exibirAtividadeCinco = ref(false)

// teste de emit (módulo 3)
function removerMensagem(id: Number) {
  mensagens.value = mensagens.value.filter((mensagem) => mensagem.id !== id)
}

// função feia que nem o djabo pra gerar data local (módulo 3)
function formatarDataHora(isoString: Date) {
  if (!isoString) return ''
  const dt = new Date(isoString)
  return dt.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

// array de mensagens (módulo 3)
const mensagens = ref<MensagemReceber[]>([])

// let nextId: number = 0

// function adicionarMensagem(payload: MensagemEnviar) {
//   mensagens.value.push({
//     id: nextId++,
//     ...payload,
//   })
// }

// Atividade do módulo 3
const showFilter = ref(false);

function limparMensagens() {
  mensagens.value = []
}

const categorias = ref([
  { id: 1, categoria: 'Baesse pedro' },
  { id: 2, categoria: 'Pedro Baesse' },
  { id: 3, categoria: 'Criador' },
  { id: 4, categoria: 'Dexter Morgan' },
])

const categoria = ref('')

const mensagensFiltradas = computed(() => {
  if (!categoria.value || !categoria) {
    return mensagens.value
  }

  return mensagens.value.filter((mensagem) => {
    return mensagem.categoria.categoria === categoria.value
  })
})

// exemplo do módulo 4
const carregando = ref(true)
const erro = ref(null)

async function carregarMensagens() {
  carregando.value = true
  erro.value = null
  try {
    mensagens.value = await getMensagens()
  } catch (e) {
    erro.value = e?.message || 'Erro ao carregar mensagens.'
  } finally {
    carregando.value = false
  }
}

onMounted(carregarMensagens)

async function tentarNovamente() {
  await carregarMensagens()
}

async function adicionarMensagem(dados: MensagemEnviar) {
  try {
    const novaMensagem = await CriarMensagem(dados)
    mensagens.value.push(novaMensagem)
  } catch (e) {
    alert(e?.message || 'Falha ao enviar mensagem.')
  }
}
</script>

<style scoped>
section {
  margin-top: 50px;
}

.titulo {
  font-size: 1.6rem;
}

h2 {
  text-align: center;
}

.show-buttons-list {
  display: flex;
  gap: 20px;
}

.vazio {
  color: #777;
  margin: 8px 0 12px;
  font-style: italic;
}

.card-items {
  margin-top: 20px;
}

.filtros-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.destaque {
  text-align: center;
  font-size: 1.2rem;
}

.estado {
  text-align: center;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin: 16px 0;
  background: #fff;
}

.estado.carregando {
  color: #555;
}

.estado.erro {
  color: #b91c1c;
  background: #fef2f2;
  border-color: #fecaca;
}

.estado.vazio {
  color: #6b7280;
  background: #f9fafb;
}

button {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #379f72;
}
</style>