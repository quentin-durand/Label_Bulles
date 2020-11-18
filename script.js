var app = angular.module('myApp', ['ngRoute']); // création de la variable app, lancement du module, je lui met la directive ngRoute

app.run(['$rootScope', function($rootScope) { // lancement de .run avec la function, je $rootScope
  $rootScope.cart = []; // je créer un tableau vide, que je $rootScope
}]);

app.controller('myCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) { // création du controller avec $scope, $http et $rootScope
  $http.get('articles.json').then(function(reponse) { // je récupère le JSON
    $scope.articles = reponse.data; // je récupère les données du JSON
  });

  // Ajoute les items au panier, permet d'incrémenter la quantité et d'éviter d'avoir plusieurs fois le même objet.

  $rootScope.showCart = false; // ng-show showCart est caché au lancement
  $rootScope.hideEmptyCart = true; // ng-show hideEmpty est

  $scope.pushItem = function(itemInCart) { // je scope mon bouttons, je lui met une fonction
    var foundItems = $rootScope.cart.find(found => found.ref == itemInCart.ref); // création variable, je scope le tableau et je cherche les id, si ma fonction est strictement égal à itemInCart

    if (foundItems) { // si ma variables foundItems
      var indexItem = $rootScope.cart.indexOf(foundItems); // création variable indexItem = rootscope le tableau cart, indexOf avec ma variables founditems
      $rootScope.cart[indexItem].qty++; // rootscope le tableau cart, je rajoute indexItem et j'incrément la qty
    } else { // sinon
      $rootScope.cart.push(angular.copy(itemInCart)); // Je push
    }
    if ($rootScope.cart.qtyls
       === 0) {
      $rootScope.showCart = false;
      $rootScope.hideEmptyCart = true;
    } else {
      $rootScope.showCart = true;
      $rootScope.hideEmptyCart = false;
    }
  };

  // Gère le prix total

  $rootScope.totalPrice = function() {
    var total = 0;
    for (i = 0; i < $rootScope.cart.length; i++) {
      total += $rootScope.cart[i].qty * $scope.cart[i].price;
    }
    return total;
  };

  // Gère la suppression des items

  $rootScope.removeItem = function(removeItems) {
    $rootScope.cart.splice(removeItems, 1);
    if($rootScope.cart== 0){
         $rootScope.showCart = false;
         $rootScope.hideEmptyCart = true;
  };
};
}]);

app.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider
      .when('/', {

        templateUrl: 'partials/home.html',
        controller: 'myCtrl'

      })
      .when('/livre', {

        templateUrl: 'partials/livre.html',
        controller: 'myCtrl'

      })
      .when('/jeux', {

        templateUrl: 'partials/jeux.html',
        controller: 'myCtrl'

      })
      .when('/goodies', {

        templateUrl: 'partials/goodies.html',
        controller: 'myCtrl'

      })
      .otherwise({

        redirectTo: '/',

      });
  }
]);

// $rootScope.removeItem = function(index) {
//   $rootScope.cart.splice(index, 1);
//   console.log(index);
// };

// $rootScope.pushItem = function(articles) {
//
//   articles.qty = articles.qty + 1;
//
//   if (articles.qty == 1) {
//
//     $rootScope.cart.push({
//       name: articles.name,
//       price: articles.price,
//       ref: articles.ref,
//       qty: articles.qty,
//       image: articles.image
//     });
//   }
// };
