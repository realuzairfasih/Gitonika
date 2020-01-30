<template>
  <div id="canvas-container" >
  </div>
</template>

<script>
export default {
  data () {
    return {
      viewPortAttributes: {
        height: 500,
        width: 500
      },
      nodeAttributes: {
        height: 60,
        width: 200,
        borderRadius: 5
      },
      levels: [
        [{
          type: 'commit',
          hash: '8a9ecc2ea99d607e92feae',
          parent: null,
          accent: 'DeepSkyBlue'
        }],
        [
          {
            type: 'commit',
            hash: '46secc24a99d607e92feae',
            parent: '8a9ecc2ea99d607e92feae',
            accent: '#ff015d'
          },
          {
            type: 'commit',
            hash: '8a9ecc2ea99d607e92asds',
            parent: '8a9ecc2ea99d607e92feae',
            accent: '#ffc107'
          },
          {
            type: 'commit',
            hash: '8a9ecc2ea99d607e92asds',
            parent: '8a9ecc2ea99d607e92feae',
            accent: '#9d27ae'
          },
          {
            type: 'commit',
            hash: '8a9ecc2ea99d6gas92asds',
            parent: '8a9ecc2ea99d607e92feae',
            accent: '#4cb051'
          }
        ],
        [
          {
            type: 'commit',
            hash: '46secc24a99d607e92feae',
            parent: '46secc24a99d607e92feae',
            accent: '#5f7d8c'
          },
          {
            type: 'commit',
            hash: '8a9ecc2ea99d607e92asds',
            parent: '46secc24a99d607e92feae',
            accent: '#5f7d8c'
          }
        ]
      ],
      nodes: [
        {
          type: 'commit',
          hash: '8a9ecc2ea99d607e92feae',
          parent: null,
          level: 0,
          accent: 'DeepSkyBlue'
        },
        {
          type: 'commit',
          hash: '46secc24a99d607e92feae',
          parent: '8a9ecc2ea99d607e92feae',
          level: 1,
          accent: '#ff015d'
        },
        {
          type: 'commit',
          hash: '8a9ecc2ea99d607e92asds',
          parent: '8a9ecc2ea99d607e92feae',
          level: 1,
          accent: '#ffc107'
        }
      ],
      stage: null,
    }
  },
  methods: {
    getMiddleFromParent (level, parent) {
      const parentNode = this.levels[level].filter(x => x.hash == parent)[0]
      return parentNode.top + ((this.nodeAttributes.height / 2) + 10)
    },
    addCommitToStage (type, hash, left, top, accent, HEAD) {
      const node = new createjs.Shape()

      const nodeContainer = new createjs.Container()

      // Add the boundaries for the node
      node.graphics.setStrokeStyle(1).beginStroke(accent).beginFill('#1d1c22')
      .drawRoundRectComplex (
        0, 
        0, 
        this.nodeAttributes.width,
        this.nodeAttributes.height,
        this.nodeAttributes.borderRadius,
        this.nodeAttributes.borderRadius,
        this.nodeAttributes.borderRadius,
        this.nodeAttributes.borderRadius
      )

      // Add an anchor for the left hook
      node.graphics.setStrokeStyle(5).beginStroke("#1d1c22").beginFill(accent).drawCircle(0, this.nodeAttributes.height / 2, 7, 7)
      
      // Add an anchor for the right hook
      node.graphics.setStrokeStyle(5).beginStroke("#1d1c22").beginFill(accent).drawCircle(this.nodeAttributes.width, this.nodeAttributes.height / 2, 7, 7)
      
      nodeContainer.addChild(node)

      // Add the text for the commit hash
      const commitLabel = new createjs.Text(type + (HEAD ? ' *' : ''), "bold 14px Arial", "#FFF")
      commitLabel.x = 20
      commitLabel.y = 15
      nodeContainer.addChild(commitLabel)
      const commitHash = new createjs.Text(hash, "12px Arial", "#79858c")
      commitHash.x = 20
      commitHash.y = 32
      nodeContainer.addChild(commitHash)

      nodeContainer.x = left
      nodeContainer.y = top
      this.stage.addChild(nodeContainer)
      this.stage.update()
    },
    init () {
      this.stage = new createjs.Stage("flowchart")
      this.stage.scale = 1
      let HEAD = '8a9ecc2ea99d607e92feae'

      // Add the nodes

      const vm = this
      // this.nodes.forEach(node => {
      //   if (vm.levels[node.level] == null) vm.levels[node.level] = 0
      //   else vm.levels[node.level] += 1

      //   console.log(
      //     (node.level * this.nodeAttributes.width) + 275,
      //     (middle + (this.nodeAttributes.height * vm.levels[node.level]))
      //   )

      //   vm.addCommitToStage(
      //     node.type,
      //     node.hash,
      //     (node.level * (this.nodeAttributes.width + 150)) + 275,
      //     (middle + ((this.nodeAttributes.height + 50) * vm.levels[node.level])),
      //     node.accent,
      //     HEAD == node.hash
      //   )
        
      // })
      this.levels.forEach((level, levelNumber) => {
        // if (vm.levels[node.level] == null) vm.levels[node.level] = 0
        // else vm.levels[node.level] += 1

        // console.log(
        //   (node.level * this.nodeAttributes.width) + 275,
        //   (middle + (this.nodeAttributes.height * vm.levels[node.level]))
        // )
        let middle = (this.viewPortAttributes.height - this.nodeAttributes.height) / 2
        let count = level.length
        level.forEach((node, index) => {
          
          if (node.parent != null) {
            middle = vm.getMiddleFromParent(levelNumber - 1, node.parent)
          }

          node.top = ((middle + ((this.nodeAttributes.height + 50) * index)) - (count * 50))
          vm.addCommitToStage(
            node.type,
            node.hash,
            (levelNumber * (this.nodeAttributes.width + 150)) + 275,
            node.top,
            node.accent,
            HEAD == node.hash
          )
        })
      })
      // Add the initial commit
      

      // this.addCommitToStage(
      //   'commit',
      //   '8a9ecc2ea99d607e92feae',
      //   this.nodeAttributes.width + 275,
      //   ((this.viewPortAttributes.height - this.nodeAttributes.height) / 2) - (this.nodeAttributes.height),
      //   '#ff015d',
      //   HEAD == '8a9ecc2ea99d607e92feae'
      // )

      // this.addCommitToStage(
      //   'commit',
      //   '8a9ecc2ea99d607e92asds',
      //   this.nodeAttributes.width + 275,
      //   ((this.viewPortAttributes.height - this.nodeAttributes.height) / 2) + (this.nodeAttributes.height),
      //   '#ffc107',
      //   HEAD == '8a9ecc2ea99d607e92asds'
      // )
    }
  },
  mounted () {
    const container = document.querySelector('#canvas-container')
    const flowchart = document.createElement('canvas')
    this.viewPortAttributes.height = container.clientHeight
    this.viewPortAttributes.width = container.clientWidth

    flowchart.setAttribute('id', 'flowchart')
    flowchart.setAttribute('width', this.viewPortAttributes.width)
    flowchart.setAttribute('height', this.viewPortAttributes.height)
    
    container.appendChild(flowchart)
    this.init()
  }
}
</script>

<style lang="scss">
#canvas-container {
  flex: 1 1 auto;
}

#flowchart {
  background-color: #191C27;
  // background-color: #191c27;
  // background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233d3d3d' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
}
</style>