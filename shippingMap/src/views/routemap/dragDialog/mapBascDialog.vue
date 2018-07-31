<template>
  <map-dialog v-map-drag-dialog
  :width='width'
  :right='right'
  :left='left'
  :top='top'
  :bottom='bottom'
  :visible.sync="dialogTableVisible"
  :before-close="beforeClose">
    <header slot="title" class="map-dialog-title">
      <slot name="header"></slot>
    </header>
    <main>
       <slot></slot>
    </main>
    <footer slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
    </footer>
  </map-dialog>

</template>
<script>
import mapDragDialog from '@/directive/map-dragDialog'
import mapDialog from './mapDialog'
export default {
  name: 'dragDialog-demo',
  components: { mapDialog },
  directives: {

    mapDragDialog

  },
  props: {
    dialogTableVisible: {
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
  methods: {
    // v-el-drag-dialog onDrag callback function
    handleClose() {
      this.dialogTableVisible = false
    }
  }
}
</script>
<style>

  .el-dialog__header {

    /* padding: 20px 20px 10px; */
    font-size: 16px;

    border-bottom: 1px solid #383838;

    padding: 10px;

  }
   .el-dialog {

    background: #212121;

    color: #fff !important;

    opacity: .85;

  }
  .el-dialog__headerbtn .el-dialog__close {

    color: #fff;

  }
  .dialog-title{
    height: 25px;
    line-height: 25px;
  }
  .map_dialog {
    opacity: .85;
}

</style>
