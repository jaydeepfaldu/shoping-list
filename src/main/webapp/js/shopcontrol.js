<<<<<<< HEAD
app.run(function($rootScope){
	$rootScope.clearData = function(){
		localStorage.clear();
		location.reload();
		console.log("clear Data");
		
	}
			
});



app.controller("s1",function($scope){

	$scope.storeList = [{name:'Bidronga',contact_no:'123'}, 
						{name:'Jabka',contact_no:'123'},
						{name:'Fresh',contact_no:'123'}];
	

	$scope.txtItemId = 1;
	$scope.txtItemName = "";
	$scope.txtStoreName = "";
	$scope.txtItemQty = 0;
	$scope.txtItemAspctPrice = 0;
	$scope.txtItemAspctTotalPrice = 0;
	$scope.txtItemInBucket = 0;
	$scope.txtItemModifyPrice = 0;
	$scope.txtItemModifyTotalPrice = 0;
	
	
	var lists = angular.fromJson( localStorage.getItem("itemStore") );   
	
	
	$scope.shopingList = [];
	
    if ( lists ) {

    	for (var i = 0; i < lists.length; i++) {
            
      	  if (lists[i].itemId) {
                	$scope.shopingList.push(lists[i]);
              }
    	
	
    }
    	
    	$scope.txtItemId =  lists.length + 1;
    	
    }
	
	
	
	
		
	$scope.addItem = function()
	{
		$scope.shopingList.push({'itemId':$scope.txtItemId,
								 'itemName':$scope.txtItemName,
								 'storeName':$scope.txtStoreName,
								 'qty':$scope.txtItemQty,
								 'aspectPrice':$scope.txtItemAspctPrice,
								 'aspectTotalPrice':$scope.txtItemAspctTotalPrice,
								 'inBucket':$scope.txtItemInBucket,
								 'modifyPrice':$scope.txtItemModifyPrice,
								 'modifyTotalPrice':$scope.txtItemModifyTotalPrice,								 
								 });
		 	
		
		
		
		localStorage.setItem('itemStore',angular.toJson($scope.shopingList));    
		
		
		$scope.txtItemId =  $scope.txtItemId + 1;
		$scope.txtItemName = "";
		$scope.txtStoreName = "";
		$scope.txtItemQty = 0;
		$scope.txtItemAspctPrice = 0;
		$scope.txtItemAspctTotalPrice = 0;
		
	};
		
	
	$scope.cleanForm = function()
	{
		
		$scope.txtItemName = "";
		$scope.txtStoreName = "";
		$scope.txtItemQty = 0;
		$scope.txtItemAspctPrice = 0;
		$scope.txtItemAspctTotalPrice = 0;
		
	};
	
	
	
	
	
});






app.controller("s2",function($scope){

	var lists = angular.fromJson( localStorage.getItem("itemStore") );     
	
	console.log(lists);
	
	$scope.shopingListInBucker = [];
	
    if ( lists ) {
    	
      for (var i = 0; i < lists.length; i++) {
        
    	  if (lists[i].itemId) {
    		  
              	$scope.shopingListInBucker.push(lists[i]);
			  
            }

        
      }
    }
    
      
    
    // Update Statu of inBucket Item
    
    $scope.inBucket = function(itemId, inbkt)
    {
    	if(inbkt == 1)
    	{
    		$scope.shopingListInBucker[itemId-1].inBucket = 0;
    		
    	}
    	else
    	{
    		$scope.shopingListInBucker[itemId-1].inBucket = 1;
    		
    	}
    	
    	localStorage.setItem('itemStore',angular.toJson($scope.shopingListInBucker));
    	//localStorage.setItem('itemStoree',angular.toJson($scope.shopingListInBucker));
    	    	
    };    
	  	
});



app.controller("s3",function($scope){
	
	
	var lists = angular.fromJson( localStorage.getItem("itemStore") );
	
	console.log(lists);
	
	$scope.shopingListprice = [];
	
    if ( lists ) {
    	
      for (var i = 0; i < lists.length; i++) {
        
    	  if (lists[i].itemId ) {
    		  if(lists[i].inBucket == 1)
    			  {
              	$scope.shopingListprice.push(lists[i]);
    			  }
            }

        
      }
    }
	
});


=======
app.controller("s1",function($scope){
	
});
>>>>>>> branch 'master' of https://github.com/jaydeepfaldu/shoping-list.git
