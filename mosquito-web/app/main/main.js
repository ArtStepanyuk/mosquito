//ToDo babel transpiler maybe to use imports? or mayber commonJs for require
//ToDo pretty html
const template =  `
<div class="col">
    <h3>Messages</h3>
    <div>
        <p ng-repeat="message in $ctrl.messages">: {{message}}</p>
    </div>
</div>
<div>
    <input type="text" ng-model="$ctrl.message"/>
    <button type="button" class="btn btn-info" ng-click="$ctrl.sendMessage()">Send</button>

</div>

`;

//ToDo: rename to messenger move to components
class MainCtrl {
    // @ngInject
    constructor($scope, socket) {
        this.socket = socket;
        this.messages = [];

        this.socket.on('notification', (data) => {
            $scope.$apply(() => this.messages.push(data.message));
        })
    }

    sendMessage() {
        console.log(this.message);
        this.socket.emit('add-message', this.message);
    };
}

angular.module('app.main').component('messenger', {
    bindings: {},
    controller: MainCtrl,
    controllerAs: '$ctrl',
    template
});