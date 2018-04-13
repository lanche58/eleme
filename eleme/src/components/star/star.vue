<template>
	<ul class="star" :class="starType">
		<li v-for="starItem in starItems" :class="starItem" class="starStyle" :key='starItem.index'></li>
	</ul>
</template>

<script>
	const LEN = 5;
	const START_ON = 'star-on';
	const START_HALF = 'star-half';
	const START_OFF = 'star-off';
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType () {
				return 'star-' + this.size;
			},
			starItems () {
				let result = [];
				let score = Math.floor(this.score * 2) / 2;
				let isHalf = ((score % 1) !== 0);
				let intScore = Math.floor(score);
				for (let i = 0; i < intScore; i++) {
					result.push(START_ON);
				};
				if (isHalf) {
					result.push(START_HALF);
				};
				while (result.length < LEN) {
					result.push(START_OFF);
				};
				return result;
			}
		}
	};
</script>

<style scoped="scoped">
	.star{
		font-size: 0;
		
	}
	.star-48 .starStyle{
		width: 0.2rem;
		height: 0.2rem;
		margin-right: 0.22rem;
	}	
	.star-36 .starStyle{
		width: 0.15rem;
		height: 0.15rem;
		margin-right: 0.06rem;
	}
	.star-24 .starStyle{
		width: 0.1rem;
		height: 0.1rem;
		margin-right: 0.03rem;
	}
	.starStyle{
		display: inline-block;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.starStyle:last-child{
		margin-right: 0;
	}
	.star-48 .star-on{
		background-image: url(star48_on@2x.png);
	}
	.star-48 .star-half{
		background-image: url(star48_half@2x.png);
	}
	.star-48 .star-off{
		background-image: url(star48_off@2x.png);
	}
	.star-36 .star-on{
		background-image: url(star36_on@2x.png);
	}
	.star-36 .star-half{
		background-image: url(star36_half@2x.png);
	}
	.star-36 .star-off{
		background-image: url(star36_off@2x.png);
	}
	.star-24 .star-on{
		background-image: url(star24_on@2x.png);
	}
	.star-24 .star-half{
		background-image: url(star24_half@2x.png);
	}
	.star-24 .star-off{
		background-image: url(star24_off@2x.png);
	}
	@media only screen and (-webkit-min-device-pixel-ratio:3) and (min-device-pixel-ratio:3) {
		.star-48 .star-on{
			background-image: url(star48_on@3x.png);
		}
		.star-48 .star-half{
			background-image: url(star48_half@3x.png);
		}
		.star-48 .star-off{
			background-image: url(star48_off@3x.png);
		}
		.star-36 .star-on{
			background-image: url(star36_on@3x.png);
		}
		.star-36 .star-half{
			background-image: url(star36_half@3x.png);
		}
		.star-36 .star-off{
			background-image: url(star36_off@3x.png);
		}
		.star-24 .star-on{
			background-image: url(star24_on@3x.png);
		}
		.star-24 .star-half{
			background-image: url(star24_half@3x.png);
		}
		.star-24 .star-off{
			background-image: url(star24_off@3x.png);
		}
	}
</style>
