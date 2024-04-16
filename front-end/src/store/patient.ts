import { defineStore } from "pinia"
import { ref } from "vue"
import { IPatient } from "../@types/patient"


export const usePatient = defineStore('patient', () => {
    const listPatient = ref([])

    const addPatient = (patient: IPatient) => {
        listPatient.value.push(patient);
    }
  
    return { addPatient, listPatient }
})