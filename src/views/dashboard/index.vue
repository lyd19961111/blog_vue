<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      {{ test }}
    </div>
  </div>
</template>

<script>

import testApi from '@/api/test.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      test: {}
    }
  },
  created() {
    this.getTest()
  },
  methods: {
    getTest() {
      testApi.test().then(response => {
        this.test = response
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
