<template>
	<div class="header">
		<div class="subject-wrapper">
			<img :src="seller.avatar" class="logo"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		props: {
			seller: {
				type: Object
			}
		}
	};
</script>

<style>
	.logo{
		width: 17.07%;
	}
</style>
