<template>
  <div id="kgp">
    {{showkg(loadData)}}
  </div>

</template>

<script>
import {load} from './graph.js'
import {update} from './update'

export default {
  name: 'kgPlot',
  props: {
    loadData: Object,
    wide: Number
  },
  methods: {
    showkg(datad) {
      update()
      load(datad, this.wide)
    }
  }
}




</script>

<style scoped>
</style>
