<script setup lang="ts">
import { ref } from 'vue';
import { useModalUpdate } from '../store/modal';
import { api } from '../service/api';

let patientLocal: any = localStorage.getItem("patient")
patientLocal = patientLocal && JSON.parse(patientLocal)
const loading = ref(false)

const patientData = ref({
    name: patientLocal.name,
    cpf: patientLocal.cpf,
    email: patientLocal.email,
    gender: patientLocal.gender,
    telephone: patientLocal.telephone,
    height: patientLocal.height,
    weight: patientLocal.weight,
    observation: patientLocal.observation
})

const modalUpdate = useModalUpdate()

const updatePatient = async () => {
    loading.value = true;

    if(patientLocal) {
        try {
            await api.patch(`/patients/${patientLocal.id}`, patientData.value)
            loading.value = false;
            modalUpdate.openModal(!modalUpdate.isOpenModal)
        } catch (error) {
            loading.value = false;
            console.log(error)
        }
    }
}

</script>

<template>
    <div class="modal" v-if="modalUpdate.isOpenModal">
        <v-form class="form" @submit.prevent>
            <h3>Paciente</h3>
            <v-text-field v-model="patientData.name" label="Nome"></v-text-field>
            <v-text-field v-model="patientData.cpf" label="CPF"></v-text-field>
            <v-text-field v-model="patientData.email" label="E-mail - opcional"></v-text-field>
            <v-text-field v-model="patientData.telephone" label="Celular"></v-text-field>
            <v-select v-model="patientData.gender" label="Genero" :items="['Masculino', 'Feminino']"></v-select>
            <v-text-field v-model="patientData.height" label="Altura"></v-text-field>
            <v-text-field v-model="patientData.weight" label="Peso"></v-text-field>
            <v-textarea v-model="patientData.observation" label="Observações"></v-textarea>
            <v-btn :disabled="loading" @click="updatePatient" class="mt-4" color="success" type="submit" block>
                <p v-if="!loading">Salvar</p>
                <p v-else>Salvando...</p>
            </v-btn>
            <v-btn :disabled="loading" @click="modalUpdate.openModal(!modalUpdate.isOpenModal)" class="mt-4" color="error" type="submit" block>
                Cancelar
            </v-btn>
        </v-form>    
    </div>
</template>

<style>
    .form {
        background-color: transparent;
        padding: 1rem;
        width: 100%;
        max-width: 35rem;
    }
</style>