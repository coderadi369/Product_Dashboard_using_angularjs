angular.module('productApp', ['ui.router','ngCookies','productAppController'])
  
 .config(function($stateProvider){
  $stateProvider.state('productview', {
    url: '/product/:id/view',
    templateUrl: 'partials/product-view.html',
    controller:'singleproductcontroller'
  }).state('products', {
    url: '/products',
    templateUrl: 'partials/productlist.html',
    controller:'productlistcontroller'
  }).state('newproduct', {
    url: '/newproduct',
    templateUrl: 'partials/productadd.html',
    controller:'Productadditioncontroller'
  });

  

 })
  .run(function($state) {
  $state.go('products'); 
});
