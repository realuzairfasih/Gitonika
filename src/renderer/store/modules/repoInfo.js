import { getBasicInfo } from '../../../../controllers/main'
import { getFilesInDirectory } from '../../../../controllers/decoders/FolderStructure'

const { dialog } = require('electron')

const state = {
  path: '',
  description: '',
  ref: null,
  stage: null,
  files: []
}

const mutations = {
  SAVE_REPO_INFORMATION (state, res) {
    if (res.status) {
      state.ref = res.ref
      state.description = res.description
      state.stage = res.stage
    }
  },
  SET_PATH (state, repoPath) {
    state.path = repoPath
  },
  SET_FILES (state, files) {
    state.files = files
  }
}

const actions = {
  SetPathWithExplorer ({ commit, dispatch }) {
    const repoPath = dialog.showOpenDialog({properties: ['openDirectory', 'showHiddenFiles']})
    if (repoPath.length > 0) {
      dispatch('SetPath', repoPath[0])
    }
  },
  SetPath ({ commit, dispatch }, repoPath) {
    commit('SET_PATH', repoPath)
    dispatch('RefreshPath')
  },
  RefreshPath ({ commit, dispatch }) {
    dispatch('GetBasicInfoOnRepo')
    dispatch('GetFilesInDirectory')
  },
  GetBasicInfoOnRepo ({ commit, state }) {
    const repoStatus = getBasicInfo(state.path)
    repoStatus.then(res => {
      commit('SAVE_REPO_INFORMATION', res)
    })
  },
  GetFilesInDirectory ({ commit, state }) {
    const filesPromise = getFilesInDirectory(state.path)
    filesPromise.then(res => {
      commit('SET_FILES', res)
    })
  }
}

const getters = {
  GetSnapshot: state => state,
  GetRepoPath: state => state.path,
  GetStage: state => state.stage,
  GetFiles: state => state.files
}

export default {
  state,
  mutations,
  actions,
  getters
}
