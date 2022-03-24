<template>
  <section class="clientes">
    <div class="column is-10">
      <span class="title"> Cadastrar Cliente {{ tipoCli }} </span>
      <button class="button is-danger" v-show="idCli" @dblclick="deleteCli">
        DELETE
      </button>
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
          <label for="cnpjCpf" class="label"> CNPJ/CPF</label>
          <input
            type="text"
            class="input"
            v-model="currentCliente.cnpjCpf"
            id="cnpjCpf"
            @input="findByCnpjCpf(currentCliente.cnpjCpf)"
          />
        </div>
        <p class="endereco" v-show="currentCliente.cnpjCpf">
          <Endereco @endereco="buscaEndereco" :endereco="currentCliente" />
        </p>
        <p class="contato" v-show="currentCliente.cidade">
          <Contato @contato="buscaContato" />
        </p>
        <p class="autorizacoes" v-show="currentCliente.emailContato">
          <Autorizacoes @autoriza="buscaAutorizacao" />
        </p>
        <br />
        <div class="field" v-show="currentCliente.autorizaPublicidade">
          <button class="button is-link" type="submit">Salvar</button>
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
import Autorizacoes from "@/components/Autorizacoes.vue";
import Contato from "@/components/Contato.vue";
import ClienteDataService from "@/services/ClienteDataService";
import ResponseData from "@/interfaces/ResponseData";
import validarForm from "@/mixins/validarForm";

export default defineComponent({
  name: "Formulario",
  data() {
    return {
      currentCliente: {} as ICliente,
      tipoCli: "",
      idCli: "",
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const cliente = this.store.state.clientes.find(
        (cli) => cli.id == this.id
      );

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
      } else {
        this.notificar(
          tipoNotificacao.FALHA,
          "Atenção",
          "cliente não localizado"
        );
      }
    }
    console.log(this.id);
    
    this.searchCliByID();
  },
  methods: {
    salvar() {
      this.validaCpf();
      if (this.idCli) {
        this.store.commit(ALTERA_CLIENTE, {
          id: this.currentCliente.id,
          nome: this.currentCliente.razaoSocial,
        });
        ClienteDataService.update(
          this.currentCliente.id,
          this.currentCliente
        ).then(
          (response: ResponseData) => {
            console.log(response);
          },
          (e: Error) => {
            console.log(e);
          }
        );
        this.notificar(
          tipoNotificacao.SUCESSO,
          "Alterar",
          "Cliente alterado com sucesso"
        );
      } else {
        if (!this.findByCnpjCpf(this.currentCliente.cnpjCpf)) {
          ClienteDataService.create(this.currentCliente).then(
            (response: ResponseData) => {
              console.log(response);
              this.store.commit(ADICIONA_CLIENTE, this.currentCliente);
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
        } else {
          this.notificar(
            tipoNotificacao.ATENCAO,
            "Duplicado",
            "CPF/CNPJ " + this.currentCliente.cnpjCpf + " ja existe"
          );
        }
      }
      console.log(this.currentCliente);
    },
    buscaEndereco(endereco: ICliente) {
      this.currentCliente.cep = endereco.cep;
      this.currentCliente.numero = endereco.numero;
      this.currentCliente.tipoImovel = endereco.tipoImovel;
      this.currentCliente.logradouro = endereco.logradouro;
      this.currentCliente.bairo = endereco.bairo;
      this.currentCliente.pontoReferencia = endereco.pontoReferencia;
      this.currentCliente.estado = endereco.estado;
      this.currentCliente.cidade = endereco.cidade;
      this.currentCliente.quantidadeCheckout = "1";
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
    searchCliByID() {      
      this.idCli = window.location.hash.replace(/[/#clientesnovo]/g, "");
      ClienteDataService.get(this.idCli).then((response: ResponseData) => {
        console.log(response.data);
        this.currentCliente = response.data;
      });
    },
    async deleteCli() {
      await ClienteDataService.delete(this.currentCliente.id).then(
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
          console.log(e.stack);
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
    validaCpf() {
      !validarForm.methods.validarNulo(this.currentCliente.cnpjCpf)
        ? (this.currentCliente.tipoPJF = validarForm.methods.validaTipoCli(
            this.currentCliente.cnpjCpf
          ))
        : false;
    },
    findByCnpjCpf(cnpjCpf: string): boolean {
      ClienteDataService.findByCnpjCpf(cnpjCpf).then(
        (response: ResponseData) => {
          if (response.data.content[0]) {
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
  /* created() {
        this.currentCliente.tipoPJF = "PF";
        this.currentCliente.numero = "1234";
        this.currentCliente.bairo = "Setor 05";
        this.currentCliente.cidade = "cliente.cidade";
        this.currentCliente.pontoReferencia = "cliente.pontoReferencia";
        this.currentCliente.emailNfe = "cliente.emailNfe";
        this.currentCliente.emailContato = "cliente.emailContato";
        this.currentCliente.celular = "cliente.celular";
        this.currentCliente.telefoneComercial = "cliente.telefoneComercial";
        this.currentCliente.quantidadeCheckout = "cliente.quantidadeCheckout";
        this.currentCliente.autorizaDadosLgpd = true;
        this.currentCliente.cnpjCpf = "03936781214";
        this.currentCliente.autorizaMensagens = true;
        this.currentCliente.autorizaPublicidade = true;
        this.currentCliente.autorizaConsultaCredito =true;
        this.currentCliente.autorizaConsultaReferencia = true;
        this.currentCliente.tipoImovel = eTipoImovel.ALUGADO;
        this.currentCliente.referencias =  {} as IReferencia;
        this.currentCliente.inscricaoEstadual = "cliente.inscricaoEstadual";
        this.currentCliente.razaoSocial = "GUILHERME";
        this.currentCliente.nomeFanstasia = "cliente.nomeFanstasia";
        this.currentCliente.ramoAtividade ="cliente.ramoAtividade";
        this.currentCliente.cep = "76870684";
        this.currentCliente.estado = "cliente.estado";
        this.currentCliente.logradouro = "cliente.logradouro";
  }, */
  components: { Endereco, Autorizacoes, Contato },
});
</script>

<style>
@import "../../assets/formStyle.css";
</style>