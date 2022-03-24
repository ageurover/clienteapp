import { tipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin as n } from "@/mixins/notificar";

const validarForm = {
  methods: {
    validaCnpjCpf(cnpjCpf: string): string {
      cnpjCpf = cnpjCpf.replace(/\D/g, "");
      if (cnpjCpf.length <= 11) {
        cnpjCpf = this.maskCpf(cnpjCpf);
      } else if (cnpjCpf.length <= 14) {
        cnpjCpf = this.maskCnpj(cnpjCpf);
      }
      return cnpjCpf
    },
    validaTipoCli(cnpjCpf: string): string {
      if (cnpjCpf.length <= 14) {
        return "PF";
      } else if (cnpjCpf.length <= 18) {
        return "PJ";
      }
      return "";
    },
    maskCnpj(cnpj: string): string {
      cnpj = cnpj.replace(/\D/g, "");
      cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
      cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
      return cnpj;
    },
    maskCpf(cpf: string): string {
      cpf = cpf.replace(/\D/g, "");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      return cpf;
    },
    validarNulo(campo: string) {
      if (campo != "") {
        return false;
      } else {
        n.methods.notificar(
          tipoNotificacao.ATENCAO,
          "Verifique",
          "o campo " + campo + " nao pode ser nulo ou vazio"
        );
        return true;
      }
    },
  },
};

export default validarForm;
