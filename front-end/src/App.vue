<script setup lang="ts">
import CreatePatient from './components/CreatePatient.vue';
import Header from './components/Header.vue';
import ListPatient from './components/ListPatient.vue';
import UpdatePatient from './components/UpdatePatient.vue';
</script>

<template>
    <Header />
    <main>
      <CreatePatient />
      <UpdatePatient />
      <ListPatient />
    </main>
</template>
