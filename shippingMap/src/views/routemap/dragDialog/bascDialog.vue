<template>
  <el-dialog v-el-drag-dialo
  :close-on-click-modal='true'
  :width='width'
  :visible.sync="dialogTableVisible"
  :modal-append-to-body="false"
  :modal="false"
  :before-close="beforeClose" style="left:auto;right:0px;">
    <header slot="title" class="dialog-title">
      <slot name="header"></slot>
    </header>
    <main>
       <slot></slot>
    </main>
    <footer slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
    </footer>

  </el-dialog>

</template>
<script>
import elDragDialog from '@/directive/el-dragDialog'
export default {
  name: 'dragDialog-demo',

  directives: {

    elDragDialog

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
  .el-dialog__headerbtn {
    top: 15px;}
</style>
