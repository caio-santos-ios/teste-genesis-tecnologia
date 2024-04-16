<script setup lang="ts">
import { useModalCreate } from "../store/modal";

    const modal = useModalCreate()

</script>

<template>
    <header class="header">
        <v-btn @click="modal.openModal(!modal.isOpenModal)" color="success" type="submit">
            Cadastrar
        </v-btn>
    </header>
</template>

<style>
    .header {
        background-color: #d1d1d1;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }
</style>