<script setup lang="ts">
import { ref } from 'vue';
import { useModalCreate } from '../store/modal';
import { api } from '../service/api';
import { usePatient } from '../store/patient';
import { watch } from 'vue';

const loading = ref(false)
const authCreate = ref(false)

const patientData = ref({
    name: "",
    cpf: "",
    email: "",
    gender: "",
    telephone: "",
    height: "",
    weight: "",
    observation: ""
})

const myCpf = ref();

const modal = useModalCreate()
const patient = usePatient()

const createPatient = async () => {
    loading.value = true;

    try {
        patientData.value.cpf = myCpf.value
        const res = await api.post("/patients", patientData.value)
        authCreate.value = false;
        loading.value = false;
        patient.addPatient(res.data)
        modal.openModal(!modal.isOpenModal)
        patientData.value = {
            name: "",
            cpf: "",
            email: "",
            gender: "",
            telephone: "",
            height: "",
            weight: "",
            observation: ""
        }
    } catch (error) {
        loading.value = false;
        console.log(error)
    }
}

const validatedCpf = () => {
    myCpf.value = patientData.value.cpf
    patientData.value.cpf = patientData.value.cpf.replace(/[^\d/]/, '')
    patientData.value.cpf = patientData.value.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const validatedTelephone = () => {
    patientData.value.telephone = patientData.value.telephone.replace(/[^\d/]/, '')
    patientData.value.telephone = patientData.value.telephone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4')
}

const validatedHeigth = () => {    
    patientData.value.height = patientData.value.height.replace(/[^\d/]/, '')
    patientData.value.height = patientData.value.height.replace(/(\d{1})(\d{2})/, '$1.$2')
}

const validatedWeigth = () => {    
    patientData.value.height = patientData.value.height.replace(/[^\d/]/, '')
}

watch(patientData.value, () => {
    if(patientData.value.cpf.length == 14 && patientData.value.telephone.length == 15 && patientData.value.gender.length > 1 && patientData.value.height.length >= 3 && patientData.value.weight.length >= 2 ){
        authCreate.value = true;
    }else {
        authCreate.value = false;
    }
})

</script>

<template>
    <div class="modal" v-if="modal.isOpenModal">
        <v-form class="form" @submit.prevent>
            <h3>Paciente</h3>
            <v-text-field v-model="patientData.name" label="Nome completo"></v-text-field>
            <v-text-field maxlength="11" @input="validatedCpf" v-model="patientData.cpf"label="CPF"></v-text-field>
            <v-text-field v-model="patientData.email" label="E-mail - opcional"></v-text-field>
            <v-text-field maxlength="11" @input="validatedTelephone" v-model="patientData.telephone" label="Celular"></v-text-field>
            <v-select v-model="patientData.gender" label="Genero" :items="['Masculino', 'Feminino']"></v-select>
            <v-text-field maxlength="3" @input="validatedHeigth" v-model="patientData.height" label="Altura"></v-text-field>
            <v-text-field maxlength="4" @input="validatedWeigth" v-model="patientData.weight" label="Peso"></v-text-field>
            <v-textarea v-model="patientData.observation" label="Observações"></v-textarea>
            <v-btn :disabled="!authCreate" @click="createPatient" class="mt-4" color="success" type="submit" block>
                <p v-if="!loading">Cadastrar</p>
                <p v-else>Cadastrando...</p>
            </v-btn>
            <v-btn :disabled="!authCreate" @click="modal.openModal(!modal.isOpenModal)" class="mt-4" color="error" type="submit" block>
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