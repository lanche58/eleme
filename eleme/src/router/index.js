import Vue from 'vue';
import Router from 'vue-router';
import Seller from '../components/content/seller/seller';
import Goods from '../components/content/goods/goods';
import Ratings from '../components/content/ratings/ratings';

Vue.use(Router);

export default new Router({
  routes: [
		{
			path: '/seller',
			name: 'Seller',
			component: Seller
  	},
		{
			path: '/',
			name: 'Goods',
			component: Goods
  	},
		{
			path: '/ratings',
			name: 'Ratings',
			component: Ratings
  	}
  ]
});
