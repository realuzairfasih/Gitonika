<template>
  <div class="changes-subcontainer">
    <span class="header">
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M7,10L12,15L17,10H7Z" />
        </svg>
      </button>
      <p>{{ kind }} Changes ({{ content.length }})</p>
      <button :class="(kind == 'Unstaged' ? 'stage' : 'unstage') + '-button'" @click="overhaulStage" >{{ kind == 'Unstaged' ? 'Stage' : 'Unstage' }} All Changes</button>
    </span>
    <div class="files">
      <span class="file" v-for="(file, index) in content" :key="index">
        <div class="file-icon" @click="modifyStage(file.filename)">
          <svg v-if="kind != 'Unstaged'" viewBox="0 0 24 24">
            <path fill="red" d="M19,13H5V11H19V13Z" />
          </svg>
          <svg v-else viewBox="0 0 24 24">
            <path fill="green" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </div>
        <p>{{ (file.filename.length > 55 ? file.filename.substr(0, 55) + '...' : file.filename) }}</p>
        <!-- <button :class="(kind == 'Unstaged' ? 'stage' : 'unstage') + '-button'" >Stage File</button> -->
      </span>
    </div>
  </div>
</template>

<script>
import { addFileToStage, removeFileFromStage, stageAllFiles, unstageAllFiles } from '../../../../../../controllers/git-controls/basics'
import { mapGetters } from 'vuex' 
export default {
  props: ['kind', 'content'],
  computed: {
    ...mapGetters({
      repo_path: 'GetRepoPath'
    })
  },
  methods: {
    modifyStage (filename) {
      if (this.kind == 'Unstaged') {
        addFileToStage(this.repo_path, filename, () => {
          console.log('The file was added')
        })
      } else {
        removeFileFromStage(this.repo_path, filename, () => {
          console.log('The file was removed')
        })
      }
    },
    overhaulStage () {
      if (this.kind == 'Unstaged') {
        stageAllFiles(this.repo_path, () => {
          console.log('All files were added')
        })
      } else {
        unstageAllFiles(this.repo_path, () => {
        console.log('All files were removed')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.changes-subcontainer {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  &:last-of-type {
    margin-bottom: 1rem;
  }
  
  .header {
    display: flex;
    flex-direction: row;
    color: #FFF;
    margin: .5rem 1rem;
    align-items: center;

    p {
      flex: 1 1 auto;
      padding: 0 .5rem;
      font-size: .85rem;
    }

    button {
      cursor: pointer;
      font-family: 'Montserrat', sans-serif;

      &:first-of-type {
        width: 1.25rem;
        height: 70%;
        background: none;
        border: none;
        
        svg {
          fill: #FFF;
        }
      }
    }
  }
  
  .stage-button {
    padding: .25rem .35rem;
    background: rgba(137, 209, 133, .25);
    color: #FFF;
    font-size: .7rem;
    border: 1px solid rgb(110, 243, 103);
    border-radius: 2px;
    
      &:hover {
        background-color: #89D185;
      }
  }
  
  .unstage-button {
    padding: .25rem .35rem;
    color: #FFF;
    font-size: .7rem;
    border-radius: 2px;
    border: 1px solid #E44D26;
    background-color: rgba(241, 72, 72, .25);
    border-radius: 2px;
    cursor: pointer;
    
    &:hover {
      background-color: #E44D26;
    }
  }

  .files {
    display: flex;
    flex-direction: column;
    background-color:#1D212F;
    height: 10rem;
    margin: 0 .75rem;
    width: calc(100% - 1.5rem);
  }
}

.files {
  display: flex;
  flex-direction: column;
  padding: .35rem 0;
  flex: 1 1 auto;

  .file {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .35rem .5rem;
    cursor: pointer;
    transition: 0.1s ease-in-out;

    .file-icon {
      height: 100%;
      width: 1.5rem;
      position: relative;

      svg {
        top: 0; left: 0; right: 0; bottom: 0;
        position: absolute;
        margin: auto;
        height: 1.2rem;
      }
    }

    p {
      flex: 1 1 auto;
      padding: 0 .25rem;
      color: #FFF;
      font-size: .8rem;
      height: 100%;
    }
    
    .unstage-button, .stage-button {
      display: none;
    }

    &:hover {
      background-color: #4E5367;

      .unstage-button, .stage-button {
        display: block;
      }
    }
  }
}
</style>