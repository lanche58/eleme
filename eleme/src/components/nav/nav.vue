<template>
	<div class="nav">
		<ul class="nav-ul">
			<li class="nav-li">
				<router-link to="/">商品</router-link>
			</li>
			<li class="nav-li">
				<router-link to="/ratings">评价</router-link>
			</li>
			<li class="nav-li">
				<router-link to="/seller">商家</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Nav'
	};
</script>

<style scoped="scoped">
	.nav{
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.nav-ul{
		display: flex;
	}
	.nav-li{
		flex: 1;
		font-size: 0.14rem;
		line-height: 0.4rem;
		text-align: center;
	}
	.nav-li a{
		color: rgb(77,85,93);
	}
	.nav .router-link-exact-active{
		color: rgb(240,20,20);
	}
</style>
