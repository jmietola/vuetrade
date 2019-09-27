<template>
  <form v-on:submit.prevent="submit">
    <input type="text" placeholder="Ticker" v-model="tickerName"/>

    <button type="submit" v-bind:disabled="!canSubmit">OK</button>
    <button type="button" v-bind:disabled="!canCancel" v-on:click="clear">Cancel</button>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'input-component',
  data () {
    return {
      tickerName: undefined
    }
  },
  computed: {
    canSubmit () {
      return this.tickerName
    },
    canCancel () {
      return this.tickerName
    }
  },
  watch: {
  },
  methods: {
    submit () {
      const { tickerName } = this
      this.$emit('name-submitted', { tickerName })
      this.clear()
    },
    clear () {
      this.tickerName = undefined
    }
  }
}
</script>

<style scoped lang="scss">
  form {
    box-sizing: border-box;
    border: 1px solid #888;
    width: 100%;
    padding: 30px;
  }
  input[type="text"], button {
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
  }
  label.checkbox {
    display: block;
    width: 100%;
    padding: 5px;
    line-height: 15px;
  }
  ul.technology-list {
    padding-left: 0;
    > li {
      list-style: none;
    }
  }
</style>
