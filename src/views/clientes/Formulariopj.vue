<template>
  <section class="clientes">
    <div class="column is-10">
      <form @submit.prevent="salvar">
      <div class="field is-horizontal">
        <label for="razaoSocial" class="label"> Razão Social </label>
        <input
          type="text"
          class="input"
          v-model="currentCliente.razaoSocial"
          id="razaoSocial"
        />
      </div>
      <div class="field is-horizontal">
        <label for="ramoAtividade" class="label"> Ramo de Atividade </label>
        <input
          type="text"
          class="input"
          v-model="currentCliente.ramoAtividade"
          id="ramoAtividade"
        />
      </div>
      <Endereco/>
      <Contato/>
      <Autorizacoes/>
      <br>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { ADICIONA_CLIENTE, ALTERA_CLIENTE } from "@/store/tipo-mutacao";
import { tipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import ICliente from "@/interfaces/ICliente";
import Endereco from "@/components/Endereco.vue";
import Contato from "@/components/Contato.vue";
import Autorizacoes from "@/components/Autorizacoes.vue";

export default defineComponent({
    name: "Formulario",
    data() {
        return {
            currentCliente: {} as ICliente,
        };
    },
    props: {
        id: {
            type: String,
        },
    },
    mounted() {
        if (this.id) {
            const cliente = this.store.state.clientes.find((cli) => cli.id == this.id);
            if (cliente != null) {
                this.currentCliente.id = cliente.id;
                this.currentCliente.tipoPJF = cliente.tipoPJF;
                this.currentCliente.numero = cliente.numero;
                this.currentCliente.bairo = cliente.bairo;
                this.currentCliente.cidade = cliente.cidade;
                this.currentCliente.pontoReferencia = cliente.pontoReferencia;
                this.currentCliente.emailNfe = cliente.emailNfe;
                this.currentCliente.emailContato = cliente.emailContato;
                this.currentCliente.celular = cliente.celular;
                this.currentCliente.telefoneComercial = cliente.telefoneComercial;
                this.currentCliente.quantidadeCheckout = cliente.quantidadeCheckout;
                this.currentCliente.autorizaDadosLgpd = cliente.autorizaDadosLgpd;
                this.currentCliente.cnpjCpf = cliente.cnpjCpf;
                this.currentCliente.autorizaMensagens = cliente.autorizaMensagens;
                this.currentCliente.autorizaPublicidade = cliente.autorizaPublicidade;
                this.currentCliente.autorizaConsultaCredito =
                    cliente.autorizaConsultaCredito;
                this.currentCliente.autorizaConsultaReferencia =
                    cliente.autorizaConsultaReferencia;
                this.currentCliente.tipoImovel = cliente.tipoImovel;
                this.currentCliente.referencias = cliente.referencias;
                this.currentCliente.inscricaoEstadual = cliente.inscricaoEstadual;
                this.currentCliente.razaoSocial = cliente.razaoSocial;
                this.currentCliente.nomeFanstasia = cliente.nomeFanstasia;
                this.currentCliente.ramoAtividade = cliente.ramoAtividade;
                this.currentCliente.cep = cliente.cep;
                this.currentCliente.estado = cliente.estado;
                this.currentCliente.logradouro = cliente.logradouro;
            }
            else {
                this.notificar(tipoNotificacao.FALHA, "Atenção", "cliente não localizado");
            }
        }
    },
    methods: {
        salvar() {
            /* if (this.id) {
              this.store.commit(ALTERA_CLIENTE, {
                id: this.id,
                nome: this.razaoSocial,
              });
              this.notificar(
                tipoNotificacao.SUCESSO,
                "Alterar",
                "Cliente alterado com sucesso"
              );
            } else {
              this.store.commit(ADICIONA_CLIENTE, this.razaoSocial);
              this.notificar(
                tipoNotificacao.SUCESSO,
                "Novo",
                "Cliente alterado com sucesso"
              );
            }*/
            //this.razaoSocial = "";
            this.$router.push("/clientes");
        },
    },
    setup() {
        const store = useStore();
        const { notificar } = useNotificador();
        return {
            store,
            notificar,
        };
    },
    components: { Endereco, Contato, Autorizacoes }
});
</script>