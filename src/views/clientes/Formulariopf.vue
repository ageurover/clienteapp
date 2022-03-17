<template>
  <section class="clientes">
    <div class="column is-10">
      <span class="title">Cadastro de Pessoa Física</span>
      <form @submit.prevent="salvar" @input="validaCampo">
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
          <label for="cnpjCpf" class="label"> CPF </label>
          <input
            type="text"
            class="input"
            v-model="currentCliente.cnpjCpf"
            id="cnpjCpf"
          />
        </div>
        <p class="endereco hidden">
          <Endereco @endereco="buscaEndereco" />
        </p>
        <p class="contato hidden">
          <Contato @contato="buscaContato" />
        </p>
        <p class="autorizacoes hidden">
          <Autorizacoes @autoriza="buscaAutorizacao" />
        </p>
        <br />
        <div class="button-hidden field hidden">
          <button class="button is-link" type="submit" @click="salvar">Salvar</button>
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
import validarFormMixin from "@/mixins/validarForm";

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
      //this.$router.push("/clientes");
      console.log(this.currentCliente);
      
    },
    validaCampo() {
      let cnpjCpf =  this.currentCliente.cnpjCpf.replace(/[./,-]/g, "");
      if(this.validaCpf(cnpjCpf) === true && cnpjCpf.length <= 11) {
        this.removeClass(".endereco", cnpjCpf, "hidden");
        return
      }
      if (cnpjCpf.length >= 11) {
        this.addClass('.endereco', 'hidden')
        this.notificar(
          tipoNotificacao.ATENCAO,
          "Verifique as Informações",
          "O CPF digitado nao é válido"
        );
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
      //REFATORAR ENQUANTO TIVER ALGUM CAMPO DO ENDERECO VAZIO O CONTATO FICAR INVISÍVEL
      this.removeClass(".contato", this.currentCliente.cidade, "hidden");
    },
    buscaContato(contato:ICliente){
      this.currentCliente.celular = contato.celular;
      this.currentCliente.telefoneComercial = contato.telefoneComercial;
      this.currentCliente.emailNfe = contato.emailNfe;
      this.currentCliente.emailContato = contato.emailContato;
      this.removeClass(
        ".autorizacoes",
        this.currentCliente.emailContato,
        "hidden"
      );
    },
    buscaAutorizacao(autoriza: ICliente){
      this.currentCliente.autorizaDadosLgpd = autoriza.autorizaDadosLgpd;
      this.currentCliente.autorizaMensagens = autoriza.autorizaMensagens;
      this.currentCliente.autorizaPublicidade = autoriza.autorizaPublicidade;
      this.removeClass(
        ".button-hidden",
        this.currentCliente.autorizaDadosLgpd,
        "hidden"
      );
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
  mixins: [validarFormMixin],
  components: { Endereco, Autorizacoes, Contato },
});
</script>

<style>
@import "../../assets/formStyle.css";
</style>