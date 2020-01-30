<template>
  <div class="dashboard">
    <div class="function-container">
      <Navigationbar />
      <div class="sub-container">
        <GenericPanel />
        <Flowchart />
        <ChangesPanel />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar/index'
import Navigationbar from './Navigationbar/index'
import GenericPanel from './GenericPanel/index'
import Flowchart from './Flowchart/index'
import ChangesPanel from './ChangesPanel/index'
export default {
  components: {
    Sidebar,
    Navigationbar,
    GenericPanel,
    Flowchart,
    ChangesPanel
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.function-container {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.sub-container {
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
}
</style>