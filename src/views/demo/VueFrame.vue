<template>
    <div style="width: 100%;height: 100%">
      <iframe :src="target"  ref="frame"
              frameborder="false" scrolling="no" width="100%" height="100%" allowtransparency="true"></iframe>
    </div>
</template>

<script>
  export default {
    props: {
      target: String
    },
    mounted () {
      let frame = this.$refs.frame
      let frameWindow = frame.contentWindow;
      let resize = () =>{
        let height = Math.max(frame.contentWindow.document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
        if( frame ) {
          frame.style.height = height + 'px';
        }
      }
      frameWindow.onresize = resize
      resize()
    }
  }
</script>

<style lang="less" scoped>

</style>
