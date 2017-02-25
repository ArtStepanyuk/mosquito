//ToDo babel transpiler maybe to use imports? or mayber commonJs for require
//ToDo pretty html
const template = `
<div class="col">
    <h3>Messages</h3>
    <div>
        <p ng-repeat="item in $ctrl.messages track by message.id">: {{item.message}}</p>
    </div>
</div>
<div>
    <input type="text" ng-model="$ctrl.message"/>
    <button type="button" class="btn btn-info" ng-click="$ctrl.sendMessage()">Send</button>

</div>

`;

class communicationCtrl {
  // @ngInject
  constructor($scope, socket) {
    this.socket = socket;
    this.messages = [];

    this.socket.on('notification', (data) => {
      $scope.$apply(() => this.messages.push(data));
    });
  }

  sendMessage() {
    this.socket.emit('add-message', this.message);
  }
}

angular.module('app.main').component('messenger', {
  bindings: {},
  controller: communicationCtrl,
  controllerAs: '$ctrl',
  template
});

