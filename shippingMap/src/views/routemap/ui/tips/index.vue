<template>
  <div class="tips-warp-view"
       v-show="visible"
       :style="{width, height, bottom, right, left, top}">
    <div class="tips-warp-view-out">
      <div class="tips-warp-view-btns">
        <span @click="miniClose"  v-show='minimize'>
          <svg-icon class="icon-svg" icon-class="minimize"/>
        </span>
        <span @click="handleClose">
          <svg-icon class="icon-svg" icon-class="close"/>
        </span>
      </div>
      <main>
        <slot name="tipsContent"></slot>
      </main>
      <footer>
        <slot name="tipsfooter"></slot>
      </footer>
    </div>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'tips',
  props: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    bottom: {
      type: String
    },
    right: {
      type: String
    },
    visible: {
      type: Boolean
    },
    left: String,
    top: String,
    minimize: Boolean,
    minimizePramas: Object,
    beforeMinimize: Function,
    beforeClose: Function
  },
  data() {
    return {
      path: this.$route.path,
      routeName: this.$route.name,
      closed: true
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
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
    handleClose: function handleClose(key) {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    /**
     * minimizePramas
     * eq {
     * title: 'string' //i18n 的 key,
     * routeName: 'ship',
     * zoomAction: fn
     * }
     */
    miniClose() {
      if (typeof this.beforeMinimize === 'function') {
        store.dispatch('minimizeWindows', this.minimizePramas)
        this.beforeMinimize(this.hide)
      } else {
        this.hide()
      }
    }
  },
  mounted() {
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
<style>
.tips-warp-view {
  background-color: rgba(33, 33, 33, 0.7);
  padding: 10px 20px;
  min-width: 100px;
  min-height: 100px;
  position: fixed;
}
.tips-warp-view-btns {
  position: absolute;
  min-width: 20px;
  top: 10px;
  right: 10px;
}
.tips-warp-view-btns .icon-svg {
  cursor: pointer;
  color: #fff;
  width: 10px;
  height: 10px;
  margin: 0 5px;
}
</style>
