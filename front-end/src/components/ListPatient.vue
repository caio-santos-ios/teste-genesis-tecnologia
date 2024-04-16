<script setup lang="ts">
import { IPatient } from '../@types/patient';
import { api } from '../service/api';
import { useModalUpdate } from '../store/modal';
import { usePatient } from '../store/patient';
import { onMounted } from "vue";

const patients: { listPatient: IPatient[], addPatient: any } = usePatient()
const modalUpdate = useModalUpdate()

onMounted(async () => {
    try {
        const res = await api.get("/patients")
        res.data.map((el: IPatient) => {
            patients.addPatient(el)
        })
    } catch (error) { }
})

const openModalUpdate = (id: any) => {
  id = id.target.id
  console.log(id)
  modalUpdate.openModal(!modalUpdate.isOpenModal)
  const myPatient = patients.listPatient.find(el => el.id == Number(id))
  localStorage.setItem("patient", JSON.stringify(myPatient))
}

const deletePatient = async (id: any) => {
  id = id.target.id
  try {
    await api.delete(`/patients/${id}`)
    patients.listPatient = patients.listPatient.filter(el => el.id != id)
  } catch (error) {}
}
</script>

<template>
    <v-table class="table">
      <thead>
        <tr>
          <th class="text-left">
            Nome
          </th>
          <th class="text-left">
            CPF
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Telefone
          </th>
          <th class="text-left">
            Genero
          </th>
          <th class="text-left">
            Altura
          </th>
          <th class="text-left">
            Peso
          </th>
          <th class="text-left">
            
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients.listPatient" :key="patient.id">
          <td>{{ patient.name }}</td>
          <td>{{ patient.cpf }}</td>
          <td>{{ patient.email }}</td>
          <td>{{ patient.telephone }}</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.height }}</td>
          <td>{{ patient.weight }}</td>
          <div class="container">
            <button class="btn update" :id="String(patient.id)" @click="(e) => openModalUpdate(e)" color="warning" type="submit">
              Editar
            </button>
            <button class="btn delete" :id="String(patient.id)" @click="(e) => deletePatient(e)" color="warning" type="submit">
              Excluir
            </button>
          </div>
        </tr>
      </tbody>
    </v-table>
</template>

<style>
  .table {
    width: 80vw;
    margin: 0 auto;
  }

  .container {
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: 0.3rem;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3rem;
    padding: 0.3rem;
  }
  
  .update {
    background-color: rgba(0, 0, 255, 0.767);
  }

  .delete {
    background-color: rgba(255, 0, 0, 0.863);
  }
</style>