<template>
  <div>
    <div>
      <span>Endereço</span>
      <input class="input" type="text" placeholder="CEP" />
      <div>
        <input class="input" type="text" placeholder="Rua" />
        <input class="input" type="number" placeholder="Numero" />
        <input class="input" type="text" placeholder="Referencia" />
      </div>
      <input class="input" type="text" placeholder="Bairro" />
      <input class="input" type="text" placeholder="Cidade" />
      <input class="input" type="text" placeholder="UF"/>
    </div>
    <div>
      <span>Contato</span>
      <input class="input" type="text" placeholder="Telefone Comercial" />
      <input class="input" type="text" placeholder="Celular" />
      <input class="input" type="text" placeholder="Email" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
    };
  },
};
</script>