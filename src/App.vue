<template>
  <div style="display:flex; justify-content:center; align-items:center; height:600px; flex-direction: column; background-color: #293133;">
  <h1 style="color: white;">Currency Converter (Frankfurter API)</h1>
      
      <div style="color: white;">
        <label>Amount:  </label>
        <input v-model.number="amount" type="number" placeholder="Example: 100" />
      </div>
      
      <br>
      
      <div>
        <label style="color: white;" >From: </label>
        <select v-model="from">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="TRY">TRY</option>
        </select>
      </div>
      
      <br>
      
      <div>
        <label style="color: white;" >To: </label>
        <select v-model="to">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="TRY">TRY</option>
        </select>
      
      </div>
      <br>
      
      <button @click="convert">
        <span v-if="loading">Converting...</span>
        <span v-else>Convert</span>
      </button>

      <br>

      <div v-if="result !== null" style="color: white;">
        Result: {{ result.toFixed(2) }} {{ to }}
      </div>

      <div v-if="error" style="color: red;">
        {{ error }}
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        amount: null,
        from: null,
        to: null,
        result: null,
        loading: false,
        error: '',
      }
    },
    methods: {
      async convert() {
        this.result = null
        this.error = ''
        this.loading = true

        try {
          const res = await fetch(https://api.frankfurter.app/latest?amount=${this.amount}&from=${this.from}&to=${this.to})
          const data = await res.json()
      
          if (this.from === this.to) {
            this.result = this.amount
          }else if (data.rates && data.rates[this.to]) {
            this.result = data.rates[this.to]
          } else {
            this.error = 'Failed to convert.'
          }
        } catch (err) {
          this.error = 'API Error'
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
