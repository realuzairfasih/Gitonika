<template>
  <div class="changes">
    <div class="panel-header">
      <button>
        <svg viewBox="0 0 24 24">
            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
      </button>
      <p>1 file change on <b>atlas-mysql</b></p>
      <button>
        <svg viewBox="0 0 24 24">
          <path fill="#FFF" d="M8,6.2V4H7V2H17V4H16V12L18,14V16H17.8L14,12.2V4H10V8.2L8,6.2M20,20.7L18.7,22L12.8,16.1V22H11.2V16H6V14L8,12V11.3L2,5.3L3.3,4L20,20.7M8.8,14H10.6L9.7,13.1L8.8,14Z" />
        </svg>
      </button>
    </div>
    <changes-container 
      kind="Unstaged"
      :content="getUnstagedFiles()"
    />
    <changes-container
      kind="Staged"
      :content="getStagedFiles()"
    />
  </div>
</template>

<script>
import ChangesContainer from './local/changes-container'

import { mapGetters } from 'vuex'
export default {
  components: {
    ChangesContainer
  },
  computed: {
    ...mapGetters({
      stage: 'GetStage',
      dirfiles: 'GetFiles'
    })
  },
  data () {
    return {
      files: {}
    }
  },
  methods: {
    getStagedFiles () {
      let stagedFiles = []
      Object.values(this.files).forEach((file, index) => {
        if (file.staged) {
          stagedFiles.push(file)
        }
      })
      return stagedFiles
    },
    getUnstagedFiles () {
      let unstagedFiles = []
      const vm = this
      Object.values(this.files).forEach((file, index) => {
        if (!file.staged) {
          unstagedFiles.push({
            filename: Object.keys(vm.files)[index],
            staged: false
          })
        }
      })
      return unstagedFiles
    },
    updateRepoContext () {
      console.log('The context has changed')
      if (this.stage != null) {

        this.files = {}
        const vm = this
        if (this.dirfiles.files) {
          this.dirfiles.files.forEach(file => {
            vm.files[file.slice(0, 1).replace('/', '') + file.slice(1)] = {
              staged: false
            }
          });
        }

        this.stage.indices.forEach(file => {
          if (vm.files[file.filename]) {
            vm.files[file.filename] = {
              staged: true,
              ...file
            }
          }
        })

        console.log(this.files)
        // this.files = this.files.concat(this.stage.indices.map(file => ({ ...file, modified: true, staged: true })))
        // let unstagedFiles = this.dirfiles.filter(file =>)
      }
    }
  },
  watch: {
    dirfiles: function (n, o) {
      this.updateRepoContext(n)
    }
  },
  mounted () {
    this.updateRepoContext()
  }
}
</script>

<style lang="scss" scoped>
.changes {
  display: flex;
  flex-direction: column;
  width: 25rem;
  background-color: #242938;
  border-top: 1px solid #1d1c22;
  font-family: 'Open Sans', sans-serif;
}

.panel-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #1D212F;
  color: #FFF;
  padding: .4rem 1rem;
  font-size: .8rem;
  border-bottom: 1px solid #6E748D;

  button {
    background: none;
    border: none;
    position: relative;

    &:last-of-type {
      width: 1rem;

      svg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: .85rem;
        fill: white;
      }
    }

    &:first-of-type {
      border: 1px solid #E44D26;
      background-color: rgba(241, 72, 72, .25);
      width: 1.35rem;
      height: 1.15rem;
      border-radius: 2px;
      cursor: pointer;

      svg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: .85rem;
        fill: white;
      }
    }
  }
}

</style>