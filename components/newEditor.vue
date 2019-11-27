  
<template>
  <view class="container">
    <view class="page-body">
      <view class='wrapper'>
        <view class='toolbar'
              @tap="format">
          <view :class="formats.bold ? 'ql-active' : ''"
                class="iconfont icon-zitijiacu"
                data-name="bold"></view>
          <view :class="formats.italic ? 'ql-active' : ''"
                class="iconfont icon-zitixieti"
                data-name="italic"></view>
          <view :class="formats.underline ? 'ql-active' : ''"
                class="iconfont icon-zitixiahuaxian"
                data-name="underline"></view>

          <view :class="formats.color === '#0000ff' ? 'ql-active' : ''"
                class="iconfont icon-text_color"
                data-name="color"
                data-value="#0000ff"></view>

          <view class="iconfont icon-undo"
                @tap="undo"></view>
          <view class="iconfont icon-redo"
                @tap="redo"></view>

          <view class="iconfont icon-fengexian"
                @tap="insertDivider"></view>
          <!-- <view class="iconfont icon-charutupian"
                @tap="insertImage"></view> -->
          <view :class="formats.header === 1 ? 'ql-active' : ''"
                class="iconfont icon-format-header-1"
                data-name="header"
                :data-value="1"></view>
          <view class="iconfont icon-shanchu"
                @tap="clear"></view>

        </view>

        <editor id="editor"
                class="ql-container"
                placeholder="开始输入..."
                v-model="text"
                showImgSize
                showImgToolbar
                showImgResize
                @statuschange="onStatusChange"
                :read-only="readOnly"
                @ready="onEditorReady"
                @input="emitInput">
        </editor>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data () {
    return {
      formats: {},
      text: ''
    }
  },
  methods: {
    readOnlyChange () {
      this.readOnly = !this.readOnly
    },
    onEditorReady () {
      uni.createSelectorQuery().in(this).select('#editor').context((res) => {
        this.editorCtx = res.context
      }).exec()
    },
    undo () {
      this.editorCtx.undo()
    },
    redo () {
      this.editorCtx.redo()
    },
    format (e) {
      let {
        name,
        value
      } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      this.editorCtx.format(name, value)
    },
    onStatusChange (e) {
      const formats = e.detail
      this.formats = formats
    },
    insertDivider () {
      this.editorCtx.insertDivider({
        success: function () {
          // console.log('insert divider success')
        }
      })
    },
    clear () {
      this.editorCtx.clear({
        success: function (res) {
          // console.log("clear success")
        }
      })
    },

    insertImage () {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.editorCtx.insertImage({
            src: res.tempFilePaths[0],
            alt: '图像',
            success: function () {
              // console.log('insert image success')
            }
          })
        }
      })
    },

    emitInput () {
      this.editorCtx.getContents({
        success: res => {
          this.$emit('input', res.html)
        }
      })

    }
  },
  onLoad () {
    uni.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")'
    })
  },
}
</script>

<style lang="scss" scoped>
@import "./editor-icon.css";
.iconfont {
  display: inline-block;
  padding: 20rpx 40rpx 30rpx;
  width: 48rpx;
  height: 48rpx;
  cursor: pointer;
  font-size: 40rpx;
}
.toolbar {
  box-sizing: border-box;
  width: 100%;
  border-bottom: 0;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  border-radius: 12rpx 12rpx 0 0;
  background: #fff;
}
.ql-container {
  box-sizing: border-box;
  padding: 20rpx 30rpx;
  width: 100%;
  height: 30vh;
  border-radius: 0 0 12rpx 12rpx;
  background: #fff;
  font-size: 32rpx;
  line-height: 1.5;
}
.ql-active {
  color: $uni-color-primary;
}
</style>