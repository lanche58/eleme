<template>
	<div class="comments">
		<div class="comments-type clearfix">
			<div class="all" :class="{'active': selectTypeData === 2}" @click="selectTypeData = 2">{{desc.all}}<span>{{totalCount}}</span></div>
			<div class="positive" :class="{'active': selectTypeData === 0}" @click="selectTypeData =0">{{desc.positive}}<span>{{positiveCount}}</span></div>
			<div class="negative" :class="{'active': selectTypeData === 1}" @click="selectTypeData =1">{{desc.negative}}<span>{{negativeCount}}</span></div>
		</div>
		<div class="hasContent clearfix" @click="hasContentData = !hasContentData">
			<span class="icon-check_circle fl select" :class="{'selected':hasContentData}"></span>
			<span class="fl text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	// eslint-disable-next-line
	const POSITIVE = 0;
	// eslint-disable-next-line
	const NEGATIVE = 1;
	// eslint-disable-next-line
	const ALL = 2;
	export default {
		name: 'Comments',
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		},
		computed: {
			positiveCount() {
				let count = 0;
				this.ratings.forEach((item) => {
					if (item.rateType === 0){
						count++;
					}
				});
				return count;
			},
			negativeCount() {
				let count = 0;
				this.ratings.forEach((item) => {
					if (item.rateType === 1){
						count++;
					}
				});
				return count;
			},
			totalCount() {
				return this.positiveCount + this.negativeCount;
			}
		},
		data() {
			return {
				selectTypeData: ALL,
				hasContentData: false
			};
		}
	};
</script>

<style>
	@import url("../../common/css/style.css");
	.comments-type{
		padding: 0.12rem 0 0.18rem;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.comments-type div{
		width: 0.6rem;
		height: 0.32rem;
		font-size: 0.12rem;
		line-height: 0.32rem;
		color:  rgb(77,85,93);
		text-align: center;
		float: left;
		margin-right: 0.08rem;
		border-radius: 2px;
	}
	.comments-type div span{
		font-size: 0.08rem;
		margin-left: 0.04rem;
	}
	.comments-type .all{
		background: rgba(0,160,220,0.2);
	}
	.comments-type .positive{
		background: rgba(0,160,220,0.2);
	}
	.comments-type .negative{
		background: rgba(77,85,93,0.2);
	}
	.comments-type .all.active,.comments-type .positive.active{
		background: rgb(0,160,220);
		color: rgb(255,255,255);
	}
	.comments-type .negative.active{
		background: rgb(77,85,93);
		color: rgb(255,255,255);
	}
	.hasContent{
		padding: 0.12rem 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		color: rgb(147,153,159);
	}
	.select{
		font-size: 0.24rem;
		line-height: 0.24rem;
		margin-right: 0.04rem;
	}
	.text{
		font-size: 0.12rem;
		line-height: 0.24rem;
	}
	.selected{
		color: #00c850;
	}
</style>