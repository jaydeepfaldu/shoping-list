
app.run(function($rootScope){
	
		
	$rootScope.clearData = function(){
		localStorage.clear();
		location.reload();
		console.log("clear Data");
		
	}
			
});



app.directive('stringToNumber', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, element, attrs, ngModel) {
	      ngModel.$parsers.push(function(value) {
	        return '' + value;
	      });
	      ngModel.$formatters.push(function(value) {
	        return parseFloat(value);
	      });
	    }
	  };
	});

app.directive('isNumber', function () {
	return {
		require: 'ngModel',
		link: function (scope) {	
			scope.$watch('lst_shoplist.modifyPrice', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.lst_shoplist.modifyPrice = oldValue;
                }
            });
		}
	};
});

app.filter("customCurrency", function (numberFilter) {
	  function isNumeric(value) {
	    return (!isNaN(parseFloat(value)) && isFinite(value));
	  }
	 
	  return function (inputNumber, currencySymbol, decimalSeparator, thousandsSeparator, decimalDigits, prefixWithSymbol) {
	    if (isNumeric(inputNumber)) {
	      // Default values for the optional arguments
	      currencySymbol = (typeof currencySymbol === "undefined") ? "$" : currencySymbol;
	      decimalSeparator = (typeof decimalSeparator === "undefined") ? "." : decimalSeparator;
	      thousandsSeparator = (typeof thousandsSeparator === "undefined") ? "," : thousandsSeparator;
	      decimalDigits = (typeof decimalDigits === "undefined" || !isNumeric(decimalDigits)) ? 2 : decimalDigits;
	      prefixWithSymbol = (typeof prefixWithSymbol === "undefined") ? true : prefixWithSymbol;
	 
	      if (decimalDigits < 0) decimalDigits = 0;
	 
	      // Format the input number through the number filter
	      // The resulting number will have "," as a thousands separator
	      // and "." as a decimal separator.
	      var formattedNumber = numberFilter(inputNumber, decimalDigits);
	 
	      // Extract the integral and the decimal parts
	      var numberParts = formattedNumber.split(".");
	       
	      // Replace the "," symbol in the integral part
	      // with the specified thousands separator.
	      numberParts[0] = numberParts[0].split(",").join(thousandsSeparator);
	 
	      // Compose the final result
	      var result = numberParts[0];
	 
	      if (numberParts.length == 2) {
	        result += decimalSeparator + numberParts[1];
	      }
	 
	      return (prefixWithSymbol ? currencySymbol + " " : "") + result + (prefixWithSymbol ? "" : " " + currencySymbol);
	    } else {
	      return inputNumber;
	    }
	  };
	});

/**
 * this controller used in home.html
 */


app.controller("s1",function($scope){

	$scope.netprices = 0;
	$scope.totalqty = 0;	
	
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
	$scope.txtItemModifyPrice = 0.0;
	$scope.txtItemModifyTotalPrice = 0.0;
	
	
	var lists = angular.fromJson( localStorage.getItem("itemStore") );   
	
	
	$scope.shopingList = [];
	
    if ( lists ) {

    	for (var i = 0; i < lists.length; i++) {
            
      	  if (lists[i].itemId) {
                	$scope.shopingList.push(lists[i]);
                	$scope.totalqty = $scope.totalqty + lists[i].qty;
                	$scope.netprices = $scope.netprices +  lists[i].aspectTotalPrice;
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
		 	
		$scope.totalqty = $scope.totalqty + $scope.txtItemQty;
		$scope.netprices = $scope.netprices +  $scope.txtItemAspctTotalPrice;
		
		
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


/**
 * this controller used in instore.html
 */


app.controller("s2",function($scope){

	
	$scope.netprices = 0;
	$scope.totalqty = 0;
	$scope.totalitem = 0;
	
	var lists = angular.fromJson( localStorage.getItem("itemStore") );     
	
	console.log(lists);
	
	$scope.shopingListInBucker = [];
	
    if ( lists ) {
    	
      for (var i = 0; i < lists.length; i++) {
        
    	  if (lists[i].itemId) {
    		  
              	$scope.shopingListInBucker.push(lists[i]);
              	
            	$scope.netprices = $scope.netprices + lists[i].aspectTotalPrice;
            	$scope.totalqty =  $scope.totalqty + lists[i].qty;
            	
			  
            }

        
      }
      
      $scope.totalitem = lists.length;
    }
    
      
    
    // Update Statu of inBucket Item
    
    $scope.inBucket = function(itemId, inbkt)
    {
    	console.log(itemId);
    	
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


/**
 * this controller used in compare_price.html
 */



app.controller("s3",function($scope){
	
	
	$scope.wks =  {number: 1, validity: true}
	
	$scope.netprices = 0;
	$scope.totalqty = 0;
	$scope.totalitem = 0;
	$scope.netactualprices = 0;
	
	var lists = angular.fromJson( localStorage.getItem("itemStore") );
	
	console.log(lists);
	
	$scope.shopingListprice = [];
	var cnt = 0;
    if ( lists ) {
    	
      for (var i = 0; i < lists.length; i++) {
        
    	  if (lists[i].itemId ) {
    		 
              	$scope.shopingListprice.push(lists[i]);
              	
              if(lists[i].inBucket == 1)
   			  {
              	$scope.netprices = $scope.netprices + lists[i].aspectTotalPrice ;
            	$scope.totalqty = $scope.totalqty +lists[i].qty;            	
            	$scope.netactualprices = $scope.netactualprices + lists[i].modifyTotalPrice;
            	cnt++;
    		  }
            }

        
      }
      
      $scope.totalitem = cnt;
      
    }
	
    $scope.updatePrice = function(itemId, mvalue)
    {
    	console.log(itemId);
    	//$scope.shopingListprice[itemId-1].modifyPrice = mvalue;    	
    	
    	localStorage.setItem('itemStore',angular.toJson($scope.shopingListprice));
    };
    
    
    
});


