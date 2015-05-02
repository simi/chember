export function initialize(container, application) {
  application.inject('controller:chatroom', 'websocketService', 'service:websocket');
}

export default {
  name: 'websocket-service',
  initialize: initialize
};
