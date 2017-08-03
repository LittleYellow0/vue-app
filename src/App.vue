<template>
	<div>
		<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
			<router-view class="router-view"></router-view>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		computed: mapState([
			'direction'
		])
	}
</script>

<style lang="less">
	.router-view {
		width: 100%;
		position: absolute;
	}
	
	.vux-pop-in-enter-active,
	.vux-pop-in-leave-active,
	.vux-pop-out-enter-active,
	.vux-pop-out-leave-active {
		will-change: transform;
		-webkit-transition: all .5s;
		transition: all .5s;
	}
	
	.vux-pop-out-enter {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0)
	}
	
	.vux-pop-in-enter,
	.vux-pop-out-leave-active {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0)
	}
	
	.vux-pop-in-leave-active {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0)
	}
</style>