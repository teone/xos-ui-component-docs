"use strict";!function(){angular.module("xos.uiComponents",[])}(),function(){angular.module("xos.uiComponents").directive("xosTable",function(){return{restrict:"E",scope:{data:"=",config:"="},template:'\n          <div ng-show="vm.data.length > 0">\n            <div class="row" ng-if="vm.config.filter == \'fulltext\'">\n              <div class="col-xs-12">\n                <input\n                  class="form-control"\n                  placeholder="Type to search.."\n                  type="text"\n                  ng-model="vm.query"/>\n              </div>\n            </div>\n            <table ng-class="vm.classes" ng-show="vm.data.length > 0">\n              <thead>\n                <tr>\n                  <th ng-repeat="col in vm.columns">\n                    {{col.label}}\n                    <span ng-if="vm.config.order">\n                      <a href="" ng-click="vm.orderBy = col.prop; vm.reverse = false">\n                        <i class="glyphicon glyphicon-chevron-up"></i>\n                      </a>\n                      <a href="" ng-click="vm.orderBy = col.prop; vm.reverse = true">\n                        <i class="glyphicon glyphicon-chevron-down"></i>\n                      </a>\n                    </span>\n                  </th>\n                  <th ng-if="vm.config.actions">Actions</th>\n                </tr>\n              </thead>\n              <tbody ng-if="vm.config.filter == \'field\'">\n                <tr>\n                  <td ng-repeat="col in vm.columns">\n                    <input\n                      class="form-control"\n                      placeholder="Type to search by {{col.label}}"\n                      type="text"\n                      ng-model="vm.query[col.prop]"/>\n                  </td>\n                  <td ng-if="vm.config.actions"></td>\n                </tr>\n              </tbody>\n              <tbody>\n                <tr ng-repeat="item in vm.data | filter:vm.query | orderBy:vm.orderBy:vm.reverse | pagination:vm.currentPage * vm.config.pagination.pageSize | limitTo: (vm.config.pagination.pageSize || vm.data.length) track by $index">\n                  <td ng-repeat="col in vm.columns">{{item[col.prop]}}</td>\n                  <td ng-if="vm.config.actions">\n                    <a href=""\n                      ng-repeat="action in vm.config.actions"\n                      ng-click="action.cb(item)"\n                      title="{{action.label}}">\n                      <i\n                        class="glyphicon glyphicon-{{action.icon}}"\n                        style="color: {{action.color}};"></i>\n                    </a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <xos-pagination\n              ng-if="vm.config.pagination"\n              page-size="vm.config.pagination.pageSize"\n              total-elements="vm.data.length"\n              change="vm.goToPage">\n              </xos-pagination>\n          </div>\n          <div ng-show="vm.data.length == 0 || !vm.data">\n            <div class="alert alert-info">\n              No data to show.\n            </div>\n          </div>\n        ',bindToController:!0,controllerAs:"vm",controller:function(){var n=this;if(!this.config)throw new Error('[xosTable] Please provide a configuration via the "config" attribute');if(!this.config.columns)throw new Error("[xosTable] Please provide a columns list in the configuration");this.columns=this.config.columns,this.classes=this.config.classes||"table table-striped table-bordered",this.config.actions,this.config.pagination&&(this.currentPage=0,this.goToPage=function(e){n.currentPage=e})}}})}(),function(){angular.module("xos.uiComponents").directive("xosPagination",function(){return{restrict:"E",scope:{pageSize:"=",totalElements:"=",change:"="},template:'\n        <div class="row" ng-if="vm.pageList.length > 1">\n          <div class="col-xs-12 text-center">\n            <ul class="pagination">\n              <li\n                ng-click="vm.goToPage(vm.currentPage - 1)"\n                ng-class="{disabled: vm.currentPage == 0}">\n                <a href="" aria-label="Previous">\n                    <span aria-hidden="true">&laquo;</span>\n                </a>\n              </li>\n              <li ng-repeat="i in vm.pageList" ng-class="{active: i === vm.currentPage}">\n                <a href="" ng-click="vm.goToPage(i)">{{i + 1}}</a>\n              </li>\n              <li\n                ng-click="vm.goToPage(vm.currentPage + 1)"\n                ng-class="{disabled: vm.currentPage == vm.pages - 1}">\n                <a href="" aria-label="Next">\n                    <span aria-hidden="true">&raquo;</span>\n                </a>\n              </li>\n            </ul>\n          </div>\n        </div>\n      ',bindToController:!0,controllerAs:"vm",controller:["$scope",function(n){var e=this;this.currentPage=0,this.goToPage=function(n){0>n||n===e.pages||(e.currentPage=n,e.change(n))},this.createPages=function(n){for(var e=[],r=0;n>r;r++)e.push(r);return e},n.$watch(function(){return e.totalElements},function(){e.totalElements&&(e.pages=Math.ceil(e.totalElements/e.pageSize),e.pageList=e.createPages(e.pages))})}]}}).filter("pagination",function(){return function(n,e){return n&&angular.isArray(n)?(e=parseInt(e,10),n.slice(e)):n}})}(),function(){angular.module("xos.uiComponents").directive("xosAlert",function(){return{restrict:"E",scope:{config:"=",show:"=?"},template:'\n        <div class="alert alert-{{vm.config.type}}" ng-show="vm.show">\n          <button type="button" class="close" ng-if="vm.config.closeBtn" ng-click="vm.dismiss()">\n            <span aria-hidden="true">&times;</span>\n          </button>\n          <p ng-transclude></p>\n        </div>\n      ',transclude:!0,bindToController:!0,controllerAs:"vm",controller:["$timeout",function(n){var e=this;if(!this.config)throw new Error('[xosAlert] Please provide a configuration via the "config" attribute');this.show=this.show!==!1,this.dismiss=function(){e.show=!1},this.config.autoHide&&!function(){var r=n(function(){e.dismiss(),n.cancel(r)},e.config.autoHide)}()}]}})}(),function(){function n(n,e,r){n.interceptors.push("SetCSRFToken"),e.startSymbol("{$"),e.endSymbol("$}"),r.defaults.stripTrailingSlashes=!1}n.$inject=["$httpProvider","$interpolateProvider","$resourceProvider"],angular.module("bugSnag",[]).factory("$exceptionHandler",function(){return function(n,e){window.Bugsnag?Bugsnag.notifyException(n,{diagnostics:{cause:e}}):console.error(n,e,n.stack)}}),angular.module("xos.helpers",["ngCookies","ngResource","bugSnag","xos.uiComponents"]).config(n)}(),function(){angular.module("xos.helpers").service("vSG-Collection",["$resource",function(n){return n("/api/service/vsg/")}])}(),function(){angular.module("xos.helpers").service("vOLT-Collection",["$resource",function(n){return n("/api/tenant/cord/volt/:volt_id/",{volt_id:"@id"})}])}(),function(){angular.module("xos.helpers").service("Users",["$resource",function(n){return n("/api/core/users/")}])}(),function(){angular.module("xos.helpers").service("Truckroll-Collection",["$resource",function(n){return n("/api/tenant/truckroll/:truckroll_id/",{truckroll_id:"@id"})}])}(),function(){angular.module("xos.helpers").service("Subscribers",["$resource",function(n){return n("/api/tenant/cord/subscriber/:subscriber_id/",{subscriber_id:"@id"})}]).service("Subscriber-features",["$resource",function(n){return n("/api/tenant/cord/subscriber/:subscriber_id/features/",{subscriber_id:"@id"})}]).service("Subscriber-features-uplink_speed",["$resource",function(n){return n("/api/tenant/cord/subscriber/:subscriber_id/features/uplink_speed/",{subscriber_id:"@id"})}]).service("Subscriber-features-downlink_speed",["$resource",function(n){return n("/api/tenant/cord/subscriber/:subscriber_id/features/downlink_speed/",{subscriber_id:"@id"})}]).service("Subscriber-features-cdn",["$resource",function(n){return n("/api/tenant/cord/subscriber/:subscriber_id/features/cdn/",{subscriber_id:"@id"})}]).service("Subscriber-features-uverse",["$resource",function(n){return n("/api/tenant/cord/subscriber/:subscriber_id/features/uverse/",{subscriber_id:"@id"})}]).service("Subscriber-features-status",["$resource",function(n){return n("/api/tenant/cord/subscriber/:subscriber_id/features/status/",{subscriber_id:"@id"})}])}(),function(){angular.module("xos.helpers").service("ONOS-Services-Collection",["$resource",function(n){return n("/api/service/onos/")}])}(),function(){angular.module("xos.helpers").service("ONOS-App-Collection",["$resource",function(n){return n("/api/tenant/onos/app/")}])}(),function(){function n(){return{request:function(n){return-1===n.url.indexOf(".html")&&(n.url+="?no_hyperlinks=1"),n}}}angular.module("xos.helpers").factory("NoHyperlinks",n)}(),function(){function n(n){return{request:function(e){return"GET"!==e.method&&(e.headers["X-CSRFToken"]=n.get("xoscsrftoken")),e}}}n.$inject=["$cookies"],angular.module("xos.helpers").factory("SetCSRFToken",n)}();