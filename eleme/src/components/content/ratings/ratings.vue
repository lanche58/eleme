<template>
	<div class="ratings" ref='ratings'>
		<div class="ratings-content">
			<div class="ratings-content-header">
				<div class="ratings-content-header-left">
					<p class="ratings-content-header-left-p-01">{{seller.score}}</p>
					<p class="ratings-content-header-left-p-02">综合评价</p>
					<p class="ratings-content-header-left-p-03">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="ratings-content-header-right">
					<p class="ratings-content-header-right-p-01 clearfix"><span class="p-span-01 fl">服务态度</span><star :size=36 :score='seller.serviceScore' class="fl"></star><span class="p-span-02 fl">{{seller.serviceScore}}</span></p>
					<p class="ratings-content-header-right-p-01 clearfix"><span class="p-span-01 fl">商品口味</span><star :size=36 :score='seller.foodScore' class="fl"></star><span class="p-span-02 fl">{{seller.foodScore}}</span></p>	
					<p class="ratings-content-header-right-p-01 clearfix"><span class="p-span-01 fl">送达时间</span><span class="p-span-03 fl">{{seller.deliveryTime}}分钟</span></p>	
				</div>
			</div>
			<div class="ratings-content-main">
				<comments :desc = 'desc' :ratings = 'ratingsData' ref="comments"></comments>
				<div class="comments-wrapper">
					<ul class="comments-wrapper-ul">
						<li class="comments-wrapper-li" v-for="item in ratingsData" v-show="selectShow(item.rateType,item.text)" :key='item.index'>
							<div class="comments-wrapper-li-left">
								<img :src="item.avatar" class="comments-wrapper-li-left-avatar"/>
							</div>
							<div class="comments-wrapper-li-right">
								<div class="comments-wrapper-li-right-div-01 clearfix">
									<span class="comments-wrapper-li-right-div-01-span-01 fl">{{item.username}}</span>
									<span class="comments-wrapper-li-right-div-01-span-02 fr">{{item.rateTime | formatDates}}</span>
								</div>
								<div class="comments-wrapper-li-right-div-02 clearfix">
									<star :size=24 :score='item.score' class='fl'></star>
									<span class="comments-wrapper-li-right-div-02-span fl" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
								</div>
								<p class="comments-wrapper-li-righ-p" v-show="item.text">{{item.text}}</p>
								<div class="comments-wrapper-li-right-div-03">
									<span :class="{'icon-thumb_down':item.rateType===1,'icon-thumb_up':item.rateType===0,'down-color':item.rateType===1,'up-color':item.rateType===0}" class="fl icon-thumb"></span>
									<ul class="comments-wrapper-li-right-div-03-ul clearfix">
										<li class="comments-wrapper-li-right-div-03-li fl" v-for="rec in item.recommend" :key='rec.index'>
											{{rec}}
										</li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BetterScroll from 'better-scroll';
	import Star from '../../star/star';
	import Comments from '../../comments/comments';
	import {formatDate} from '../../../common/js/formatDate.js';
	
	const NO_ERR = 0;
	// eslint-disable-next-line
	const POSITIVE = 0;
	// eslint-disable-next-line
	const NEGATIVE = 1;
	// eslint-disable-next-line
	const ALL = 2;
	
	export default {
		name: 'Ratings',
		props: {
			seller: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data() {
			return {
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				},
				ratings: [],
				ratingsData: []
			};
		},
		created() {	
			this.getRatingsAjax();
			this.$nextTick(() => {				
				this.ratings = new BetterScroll(this.$refs.ratings, {
		      		click: true
		    	});		    	
			});	
			let self = this;
			setTimeout(function(){
				self.ratingsData = self.ratings;
			},0);			
		},
		methods: {
			getRatingsAjax() {
				let successCallback = (response) => {
					response = response.body;
					if (response.errno === NO_ERR) {
						this.ratings = response.data;
					}
				};
				let errorCallback = (response) => {
					console.log('server error');
				};
				this.$http.get('api/ratings').then(successCallback, errorCallback);
			},
			selectShow(type,text) {
				if (this.$refs.comments.hasContentData === true && !text){
					return false;
				} else if (this.$refs.comments.selectTypeData === ALL){
					return true;
				} else {
					return this.$refs.comments.selectTypeData === type;
				}				
			}
		},
		components: {
			'star': Star,
			'comments': Comments
		},
		filters: {
			formatDates(time){
				let now = new Date(time);
				return formatDate(now,'yyyy-MM-dd hh:mm');
			}
		}
	};
</script>

<style scoped="scoped">	
	@import url("../../../common/css/style.css");
	.ratings{
		position: absolute;
		left: 0;
		top: 1.75rem;
		bottom: 0.48rem;
		width: 100%;
		overflow: hidden;
		background: rgb(243,245,247);
	}
	.ratings-content-header{
		display: flex;
		background: white;
		margin-bottom: 0.18rem;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.ratings-content-header-left{
		flex: 0 0 1.38rem;
		width: 1.38rem;
		border-right: 1px solid rgba(7,17,27,0.1);
		text-align: center;
		margin: 0.18rem 0;
	}
	.ratings-content-header-left-p-01{
		font-size: 0.24rem;
		line-height: 0.28rem;
		color: rgb(255,153,0);
	}
	.ratings-content-header-left-p-02{
		font-size: 0.12rem;
		line-height: 0.12rem;
		color: rgb(7,17,27);
		margin-top: 0.06rem;
	}
	.ratings-content-header-left-p-03{
		font-size: 0.1rem;
		line-height: 0.1rem;
		color: rgb(147,153,159);
		margin: 0.08rem 0 0.06rem;
	}
	.ratings-content-header-right{
		flex: 1;
		margin: 0.18rem 0 0 0.24rem;
		font-size: 0.12rem;
		line-height: 0.18rem;
		color: rgb(7,17,27);
	}
	.p-span-01{
		margin-right: 0.12rem;
	}
	.p-span-02{
		margin-left: 0.12rem;
		color: rgb(255,153,0);
	}
	.p-span-03{
		color: rgb(147,153,159);
	}
	.ratings-content-main{
		background: white;
		padding: 0 0.18rem;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.comments-wrapper-li{
		margin-top: 0.18rem;
		display: flex;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding-bottom: 0.18rem;
	}
	.comments-wrapper-li-left{
		flex: 0 0 0.4rem;
		width: 0.4rem;
	}
	.comments-wrapper-li-left-avatar{
		width: 0.28rem;
		border-radius: 100%;
	}
	.comments-wrapper-li-right{
		flex: 1;
	}
	.comments-wrapper-li-right-div-01-span-01{
		font-size: 0.1rem;
		line-height: 0.12rem;
		color: rgb(7,17,27);
	}
	.comments-wrapper-li-right-div-01-span-02,.comments-wrapper-li-right-div-02-span{
		font-size: 0.1rem;
		line-height: 0.12rem;
		color: rgb(147,153,159);
		font-weight: lighter;
	}
	.comments-wrapper-li-right-div-01{
		margin-bottom: 0.04rem;
	}
	.comments-wrapper-li-right-div-02-span{
		margin-left: 0.06rem;
	}
	.comments-wrapper-li-righ-p{
		font-size: 0.12rem;
		line-height: 0.18rem;
		color: rgb(7,17,27);
		margin-top: 0.06rem;
	}
	.down-color{
		color: rgb(147,153,159);
	}
	.up-color{
		color: rgb(0,160,220);
	}
	.icon-thumb{
		font-size: 0.12rem;
		line-height: 0.16rem;
		margin-right: 0.08rem;
	}
	.comments-wrapper-li-right-div-03{
		margin-top: 0.08rem;
	}
	.comments-wrapper-li-right-div-03-li{
		font-size: 0.09rem;
		line-height: 0.165rem;
		color: rgb(147,153,159);
		padding: 0 0.06rem;
		margin: 0 0.08rem 0.04rem 0;
		border: 1px solid rgba(7,17,27,0.1);
		border-radius: 1px;
	}
</style>
