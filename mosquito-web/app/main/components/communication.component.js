//ToDo babel transpiler maybe to use imports? or mayber commonJs for require
//ToDo pretty html
const template = `
<div class="container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2 form-group">
       <div class="input-group">
          <input type="text"
                 ng-model="$ctrl.message"
                 class ="form-control">
          <span class = "input-group-btn">
            <button ng-click="$ctrl.sendMessage()"
                    class="btn btn-info" type = "button">
               Send message
            </button>
          </span>
      </div>
    </div>
  </div>
	<div class="row">
        <div class="col-sm-12" col-md-12 ng-repeat="message in $ctrl.messages track by $index">
            <div class="card">
                <div class="message-card">
                    <div class="media-left">
                        <img class="media-object img-circle profile-img" src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png">
                    </div>
                    <div class="media-body">
                        <h2 class="media-heading">Anonymous</h2>
                        <span class="post-date">{{ ::message.postDate | date: 'medium' }}</span>
                        <div class="message-text">{{ ::message.text }}</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
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

