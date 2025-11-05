import type { MensagemEnviar } from '../interfaces/MensagmInterface'
import api from '../services/api'

export async function getMensagens() {
    try {
        const resposta = await api.get('/mensagens')
        return resposta.data
    } catch (erro) {
        throw erro.response?.data || {
            erro: 'NetworkError',
            message: 'Falha ao carregar mensagens',
            status: 500
        }
    }
}

export async function CriarMensagem(dados: MensagemEnviar) {
    try {
        const resposta = await api.post('/mensagens', dados)
        return resposta.data
    } catch (erro) {
        throw erro.response?.data || {
            erro: 'NetworkError',
            message: 'Falha ao criar mensagens',
            status: 500
        }
    }
}

export async function AtualizarMensagem(id: number, dados: MensagemEnviar) {
    try {
        const resposta = await api.post(`/mensagens/${id}`, dados)
        return resposta.data
    } catch (erro) {
        throw erro.response?.data || {
            erro: 'NetworkError',
            message: 'Falha ao atualizar mensagens',
            status: 500
        }
    }
}

export async function removerMensagem(id: number) {
  try {
    const resposta = await api.delete(`/mensagens/${id}`)
    return resposta.data
  } catch (erro) {
    throw erro.response?.data || {
      erro: 'NetworkError',
      message: 'Falha ao remover mensagem.',
      status: 500
    }
  }
}