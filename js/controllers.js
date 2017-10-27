angular.module('productAppController',['ngCookies'])
 .directive ('ratings',['$cookies',function($cookies){
 
    return  {
     restrict:'E',

     link:function(scope,element,attrs){
        scope.calculate_rating=function(outerindex){
                
                var x=scope.x.upvotes;
                var y=scope.x.downvotes;
                var z=x+y;
                var star=x/z;
                star=star*5;
                star=Math.floor(star);
                scope.x.stars="";
                for(var i=0;i<star;i++)
                {
                    scope.x.stars+="#";
                }
                
                var value=$cookies.getObject("data");
                value[outerindex]=scope.x;
                $cookies.putObject("data",value);
                
        };
        scope.upvote=function(data,outerindex){
            console.log(scope.x.upvotes);
            scope.x.upvotes+=1;
            scope.calculate_rating(outerindex);
            
        };

        scope.downvote=function(data,outerindex)
        {
            scope.x.downvotes+=1;
            scope.calculate_rating(outerindex);
        };
     }

      
    };

  }])
 .controller('Productadditioncontroller',function($scope,$state,$window,$cookies){

    console.log("Product additon controller called");

    console.log($cookies.getObject('data'));


    $scope.imageuploaded=0;
    $scope.imagefile="";

    $scope.productinfo=function(){

    	console.log($scope.productname);
    	console.log($scope.productdesc);
    	//console.log($scope.stepsModel[0]);

        var value=$cookies.getObject('data');
        if(value===undefined)
      {
        var obj=new Object();
        obj.productname=$scope.productname;
        obj.productimage=$scope.imagefile;
        obj.upvotes=0;
        obj.downvotes=0;
        obj.stars="";
        var x=[];
        x.push(obj);
        $cookies.putObject('data',x);
        var value=$cookies.getObject('data');
        console.log(value);
       } 

       else
       {
 
           var obj=new Object();
           obj.productname=$scope.productname;
           obj.productimage=$scope.imagefile;
           obj.upvotes=0;
           obj.downvotes=0;
           obj.stars="";
           var value=$cookies.getObject('data');
           value.push(obj);
           $cookies.putObject('data',value);
        }
     
    }
  
   
   

    $scope.imageUpload = function(event){

         $scope.stepsModel=[];

         var files = event.target.files; //FileList object
         
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.imageIsLoaded = function(e){
    	console.log("Entered here");
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
            $scope.imagefile=$scope.stepsModel[0];
        });
    }

  
})
 .controller('productlistcontroller',function($scope,$cookies){

     console.log('productlist controller called');
     $scope.value=$cookies.getObject('data');
     console.log(($scope.value));


 })
  .controller('singleproductcontroller',function($scope,$stateParams,$cookies){
          
          console.log("Single product controller called");
          console.log($stateParams.id);
          $scope.value=$cookies.getObject('data');
          $scope.x=$scope.value[$stateParams.id];
          console.log($scope.x);
  });