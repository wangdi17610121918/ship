<template>
  <div>
      <div v-map-drag-dialog class="map_dialog"  :style="{width, left, top, bottom ,right}" v-show="visible" ref="dialog">
         <header class="map_dialog_title">
            <slot name="title"></slot>
            <i @click="handleClose"><svg-icon className="close"  icon-class="close" /></i>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer class="map_dialog_footer">
            <slot name="footer"></slot>
          </footer>
    </div>
  </div>

</template>
<script>
import mapDragDialog from '@/directive/map-dragDialog'
export default {
  name: 'mapDialog-demo',
  directives: {

    mapDragDialog

  },
  props: {
    dialogTableVisible: {
      type: Boolean
    },
    visible: {
      type: Boolean
    },
    width: {
      type: String
    },
    beforeClose: {
      type: Function
    },
    left: {
      type: String
    },
    right: {
      type: String
    },
    top: {
      type: String
    },
    bottom: {
      type: String
    }
  },
  data() {
    return {
      closed: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
      }
    }
  },
  methods: {
    // // v-el-drag-dialog onDrag callback function
    // handleClose() {
    //   if (typeof this.beforeClose === 'function') {
    //       this.beforeClose(this.dialogTableVisible = false);
    //     } else {
    //       this.dialogTableVisible = false
    //     }
    // }
    handleClose: function handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide: function hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper: function updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    }
  },
  mounted() {}
}
</script>
<style>
.map_dialog {
  /* position: relative; */
  /* width: 500px; */
  /* height: 200px; */
<<<<<<< HEAD
  background-color:  rgba(33,33,33,0.80);
  /* opacity: .8; */
=======
  background-color: rgba(33, 33, 33, .8);
>>>>>>> 60a83e1fbd6264ba3dcb60037246a39e188a936f
  /* top:100px;
  left: 50%; */
  z-index:3
}

.map_dialog_content{
  height: 150px;
  width: 100%;
  background: blueviolet;
}
.map_dialog_footer{
  padding: 10px;
  text-align: center;
}
 .el-dialog__headerbtn {
    top: 15px;
    }
  .close{
     position: absolute;
    top: 12px;
    right:10px;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
}
</style>
