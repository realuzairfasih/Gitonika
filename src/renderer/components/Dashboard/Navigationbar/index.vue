<template>
  <div class="navigationbar">
    <div class="section-1">
      <button class="open-project-folder" @click="SetPathWithExplorer">
        <svg viewBox="0 0 24 24">
          <path d="M12 12H14V10H16V12H18V14H16V16H14V14H12V12M22 8V18C22 19.11 21.11 20 20 20H4C2.89 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.11 6 22 6.89 22 8M20 8H4V18H20V8Z" />
        </svg>
      </button>
      <div class="dropdown-with-current">
        <span>repository</span>
        <p>
          <span>Sample_2</span>
          <svg viewBox="0 0 24 24">
            <path fill="#EEE" d="M7,10L12,15L17,10H7Z" />
          </svg>
        </p>
      </div>
      <div style="height: 100%">
        <svg style="width:24px; height:100%" viewBox="0 0 24 24">
          <path fill="#EEE" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </div>
      <div class="dropdown-with-current">
        <span>branch</span>
        <p>
          <span>master</span>
          <svg viewBox="0 0 24 24">
            <path fill="#EEE" d="M7,10L12,15L17,10H7Z" />
          </svg>
        </p>
      </div>
    </div>
    <!-- <div class="section-2">
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" />
        </svg>
        <p>Undo</p>
      </button>
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z" />
        </svg>
        <p>Redo</p>
      </button>
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M17,3A2,2 0 0,1 19,5V15A2,2 0 0,1 17,17H13V19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H7C5.89,17 5,16.1 5,15V5A2,2 0 0,1 7,3H17M12,14.5L16.5,10H13V6H11V10H7.5L12,14.5Z" />
        </svg>
        <p>Pull</p>
      </button>
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M17,3A2,2 0 0,1 19,5V15A2,2 0 0,1 17,17H13V19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H7C5.89,17 5,16.1 5,15V5A2,2 0 0,1 7,3H17M12,5.5L7.5,10H11V14H13V10H16.5L12,5.5Z" />
        </svg>
        <p>Push</p>
      </button>
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M13,14C9.64,14 8.54,15.35 8.18,16.24C9.25,16.7 10,17.76 10,19A3,3 0 0,1 7,22A3,3 0 0,1 4,19C4,17.69 4.83,16.58 6,16.17V7.83C4.83,7.42 4,6.31 4,5A3,3 0 0,1 7,2A3,3 0 0,1 10,5C10,6.31 9.17,7.42 8,7.83V13.12C8.88,12.47 10.16,12 12,12C14.67,12 15.56,10.66 15.85,9.77C14.77,9.32 14,8.25 14,7A3,3 0 0,1 17,4A3,3 0 0,1 20,7C20,8.34 19.12,9.5 17.91,9.86C17.65,11.29 16.68,14 13,14M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M17,6A1,1 0 0,0 16,7A1,1 0 0,0 17,8A1,1 0 0,0 18,7A1,1 0 0,0 17,6Z" />
        </svg>
        <p>Branch</p>
      </button>
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M16,10H14V7H10V10H8L12,14M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
        </svg>
        <p>Stash</p>
      </button>
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M14,14H10V11H8L12,7L16,11H14V14M16,11M5,15V5H19V15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3" />
        </svg>
        <p>Pop</p>
      </button>
    </div>
    <div class="section-3">

    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import watchman from '../../../../../controllers/preservers/watchman'

export default {
  computed: {
    ...mapGetters({
      repo_path: 'GetRepoPath'      
    })
  },
  methods: {
    ...mapActions({
      RefreshPath: 'RefreshPath',
      SetPathWithExplorer: 'SetPathWithExplorer'
    }),
  },
  watch: {
    repo_path: function (n, o) {
      console.log('Changed Path')
      watchman.watchdog(n, () => {
        console.log('Bark Bark bark')
      })
    }
  },
  mounted () {
    if (this.repo_path != null) {
      const vm = this
      watchman.watchdog(this.repo_path, () => {
        console.log('Bark Bark bark')
        vm.RefreshPath(this.repo_path)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navigationbar {
  height: 3.5rem;
  width: 100%;
  background-color: #242938;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 1px;
  justify-content: space-between;
}

.open-project-folder {
  background: none;
  height: 100%;
  width: 3.5rem;
  padding: 0 1rem;
  border: none;
  border-right: 1px solid #1D212F;
  cursor: pointer;
  position: relative;

  svg {
    height: 1.65rem;
    fill: #6E748D;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  
  &:hover > svg {
    fill: #A6ACCD;
  }
}

.dropdown-with-current {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 1rem;
  padding-right: .25rem;
  justify-content: center;
  cursor: pointer;

  &:last-of-type {
    border-right: 1px solid #1D212F;
  }

  &:hover {
    background-color: #191C27;
  }

  span {
    font-family: 'Montserrat', sans-serif;
    font-size: .65rem;
    color: #6E748D;
  }
  
  p {
    font-family: 'Open Sans', sans-serif;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: .85rem;
      color: #EEE;
    }

    svg {
      margin-left: 1rem;
      height: 1rem;
    }
  }
}

.section-1, .section-2 {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.section-2 {
  position: absolute;
  left: 0;
  right: 0;
  max-width: max-content;
  margin: auto;
  height: 3.5rem;

  button {
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #FFF;
    cursor: pointer;

    svg {
      height: 1.5rem;
      fill: #FFF;
    }

    p {
      font-size: .65rem;
      margin-top: .25rem;
    }

    &:hover {
      background-color: #191C27;
      box-shadow: inset 0 -1px 0px #27E8A7;
    }
  }
}
</style>