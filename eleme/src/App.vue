<template>
  <div id="app">
		<v-header :seller='seller'></v-header>
		<v-nav></v-nav>
		<router-view :seller='seller'/>
		<v-footer :seller='seller'></v-footer>
  </div>
</template>

<script>
	import Header from './components/header/header';
	import Nav from './components/nav/nav';
	import Footer from './components/footer/footer';
	const NO_ERR = 0;
	export default {
		name: 'App',
		data () {
	    return {
	      seller: {}
	    };
	  },
	  created () {
		  this.getSellerAjax();		  
		},
	  methods: {
	    getSellerAjax() {
			  var successCallback = (response) => {
			  	response = response.body;
			  	if (response.errno === NO_ERR) {
			    	this.seller = response.data;
			  	}
			  };
			  var errorCallback = (response) => {
			      console.log('server error');
			  };
	      this.$http.get('api/seller').then(successCallback, errorCallback);
	    }
	  },
		components: {
			'v-header': Header,
			'v-nav': Nav,
			'v-footer': Footer
		}
	};
</script>

<style scoped="scoped">

</style>
