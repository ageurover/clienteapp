<template>
  <section class="clientes">
    <router-link to="/clientes">
      <Button
        icon="fa-arrow-left"
        tipo="is-link is-small is-outlined"
        name="Retornar"
        v-show="idCli"
      />
    </router-link>

    <div class="column is-10" @change="salvaStore">
      <span class="title"> Cadastro Cliente {{ tipoCli }} </span>
      <form @submit.prevent="salvar" class="box">
        <div class="field is-horizontal">
          <Button
            icon="fa-trash"
            tipo="is-danger is-small is-outlined"
            v-show="idCli"
            name="Excluir cliente"
            @action="deleteCli"
          />
          <Button
            icon="fa-pen"
            tipo="is-link is-small is-outlined"
            v-show="idCli"
            @action="edit = !edit"
            name="Editar cliente"
          />
        </div>
        <div class="field is-horizontal">
          <label for="razaoSocial" class="label"> Razão Social </label>
          <input
            type="text"
            class="input"
            v-model="currentCliente.razaoSocial"
            id="razaoSocial"
            :disabled="edit"
          />
        </div>
        <div class="field is-horizontal">
          <label for="cnpjCpf" class="label"> CNPJ/CPF</label>
          <input
            type="text"
            class="input"
            v-model="currentCliente.cnpjCpf"
            id="cnpjCpf"
            :disabled="edit"
            @input="validaCnpjCpf"
          />
        </div>
        <Endereco @endereco="buscaEndereco" v-show="!edit" />
        <Contato @contato="buscaContato" v-show="!edit" />
        <LimitePrazo @limite-prazo="buscaLimitePrazo" v-show="!edit" />
        <Autorizacoes
          @autoriza="buscaAutorizacao"
          :tipoCli="currentCliente.tipoPJF"
          v-show="!edit"
        />
        <div class="field">
          <Button
            name="Salvar"
            tipo="is-info is-outlined"
            icon="fa-plus"
            :disabled="edit"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import {
  ADICIONA_CLIENTE,
  ALTERA_CLIENTE,
  LIMPAR_LISTA,
} from "@/store/tipo-mutacao";
import { tipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import ICliente from "@/interfaces/ICliente";
import Endereco from "@/components/Endereco.vue";
import Autorizacoes from "@/components/Autorizacoes.vue";
import Contato from "@/components/Contato.vue";
import ClienteDataService from "@/services/ClienteDataService";
import ResponseData from "@/interfaces/ResponseData";
import validarForm from "@/mixins/validarForm";
import Button from "@/components/Button.vue";
import LimitePrazo from "@/components/LimitePrazo/LimitePrazo.vue";
import IReferencia from "@/interfaces/IReferencia";

export default defineComponent({
  name: "Formulario",
  data() {
    return {
      currentCliente: {} as ICliente,
      tipoCli: "",
      idCli: "",
      limitePrazo: false,
      edit: true,
    };
  },
  async mounted() {
    this.store.commit(LIMPAR_LISTA);
    this.idCli = validarForm.methods.buscaIdURL();
    this.idCli ? (this.edit = true) : (this.edit = false);
    await this.searchCliByID(this.idCli);
    if (this.idCli) {
      const cliente = this.store.state.clientes.find(
        async (cli) => cli.id == this.idCli
      );
      if (cliente != null) {
        this.currentCliente.id = cliente.id;
        this.currentCliente.tipoPJF = cliente.tipoPJF;
        this.tipoCli = this.currentCliente.tipoPJF;
        this.currentCliente.quantidadeCheckout = cliente.quantidadeCheckout;
        this.currentCliente.cnpjCpf = cliente.cnpjCpf;
        this.currentCliente.inscricaoEstadual = cliente.inscricaoEstadual;
        this.currentCliente.razaoSocial = cliente.razaoSocial;
        this.currentCliente.nomeFanstasia = cliente.nomeFanstasia;
        this.currentCliente.ramoAtividade = cliente.ramoAtividade;
      } else {
        this.notificar(
          tipoNotificacao.FALHA,
          "Atenção",
          "cliente não localizado"
        );
      }
    }
  },
  methods: {
    salvar() {
      this.validaCnpjCpf;
      if (this.idCli) {
        this.store.commit(ALTERA_CLIENTE, this.currentCliente);
        ClienteDataService.update(this.idCli, this.currentCliente).then(
          (response: ResponseData) => {
            console.log(response);
            this.notificar(
              tipoNotificacao.SUCESSO,
              "Sucesso",
              "Cliente alterado com sucesso"
            );
          },
          (e: Error) => {
            console.log(e);
            this.notificar(
              tipoNotificacao.FALHA,
              "Fahou",
              "Dados cliente nao foram atualizados " + e
            );
          }
        );
      } else {
        if (!this.findByCnpjCpf(this.currentCliente.cnpjCpf)) {
          this.notificar(
            tipoNotificacao.ATENCAO,
            "Duplicado",
            "CPF/CNPJ " + this.currentCliente.cnpjCpf + " ja existe"
          );
        } else {
          ClienteDataService.create(this.currentCliente).then(
            (response: ResponseData) => {
              this.store.commit(ADICIONA_CLIENTE, response.data);
              this.notificar(
                tipoNotificacao.SUCESSO,
                "Novo",
                "Cliente incluido com sucesso"
              );
              this.$router.push("/clientes");
            },
            (e: Error) => {
              console.log(e);
              this.notificar(
                tipoNotificacao.FALHA,
                "Erro",
                "Cliente nao foi incluido"
              );
            }
          );
        }
      }
      console.log(this.currentCliente);
    },
    salvaStore() {
      this.store.commit(ADICIONA_CLIENTE, this.currentCliente);
    },
    buscaEndereco(endereco: ICliente) {
      if (!this.idCli) {
        this.currentCliente.cep = endereco.cep;
        this.currentCliente.numero = endereco.numero;
        this.currentCliente.tipoImovel = endereco.tipoImovel;
        this.currentCliente.logradouro = endereco.logradouro;
        this.currentCliente.bairo = endereco.bairo;
        this.currentCliente.pontoReferencia = endereco.pontoReferencia;
        this.currentCliente.estado = endereco.estado;
        this.currentCliente.cidade = endereco.cidade;
        this.currentCliente.quantidadeCheckout = "1";
      }
    },
    buscaContato(contato: ICliente) {
      this.currentCliente.celular = contato.celular;
      this.currentCliente.telefoneComercial = contato.telefoneComercial;
      this.currentCliente.emailNfe = contato.emailNfe;
      this.currentCliente.emailContato = contato.emailContato;
    },
    buscaAutorizacao(autoriza: ICliente) {
      this.currentCliente.autorizaDadosLgpd = autoriza.autorizaDadosLgpd;
      this.currentCliente.autorizaMensagens = autoriza.autorizaMensagens;
      this.currentCliente.autorizaPublicidade = autoriza.autorizaPublicidade;
    },
    buscaLimitePrazo(limitePrazo: IReferencia) {
      this.currentCliente.referencias = limitePrazo;
    },
    async searchCliByID(idCli: string) {
      if (idCli) {
        await ClienteDataService.get(idCli).then(
          async (response: ResponseData) => {
            this.store.commit(LIMPAR_LISTA);
            this.store.commit(ADICIONA_CLIENTE, response.data);
          }
        );
      }
    },
    deleteCli() {
      ClienteDataService.delete(this.currentCliente.id).then(
        (response: ResponseData) => {
          console.log(response);
          this.notificar(
            tipoNotificacao.SUCESSO,
            "Deletado",
            "CLIENTE " +
              this.currentCliente.razaoSocial +
              " deletado com sucesso"
          );
          this.$router.push("/clientes");
        },
        (e: Error) => {
          console.log(e);
          this.notificar(
            tipoNotificacao.FALHA,
            "ERRO",
            "Não foi possivel deletar o cliente " +
              this.currentCliente.razaoSocial +
              " - " +
              e
          );
        }
      );
    },
    validaCnpjCpf() {
      if (!validarForm.methods.validarNulo(this.currentCliente.cnpjCpf)) {
        this.currentCliente.tipoPJF = validarForm.methods.validaTipoCli(
          this.currentCliente.cnpjCpf
        );
        if (this.currentCliente.tipoPJF == "PJ") this.limitePrazo = true;
        this.findByCnpjCpf(this.currentCliente.cnpjCpf);
      } else {
        false;
      }
    },
    findByCnpjCpf(cnpjCpf: string): boolean {
      ClienteDataService.findByCnpjCpf(cnpjCpf).then(
        (response: ResponseData) => {
          if (response.data.content.length > 0) {
            this.notificar(
              tipoNotificacao.FALHA,
              "Duplicado",
              "CPF/CNPJ " + this.currentCliente.cnpjCpf + " ja existe"
            );
            return true;
          }
        }
      );
      return false;
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      clientes: computed(() => store.state.clientes),
      store,
      notificar,
    };
  },
  components: { Endereco, Autorizacoes, Contato, Button, LimitePrazo },
});
</script>

<style>
@import "../../assets/formStyle.css";
</style>
