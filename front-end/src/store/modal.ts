import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalCreate = defineStore('modalCreate', () => {
    const isOpenModal = ref(false)

    const openModal = (state: boolean) => {
        isOpenModal.value = state;
    }

    return { isOpenModal, openModal }
})

export const useModalUpdate = defineStore('modalUpdate', () => {
    const isOpenModal = ref(false)
    
    const openModal = (state: boolean) => {
        isOpenModal.value = state;
    }
    
    return { isOpenModal, openModal }
})