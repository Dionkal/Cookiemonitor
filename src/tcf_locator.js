(function() {

  let cmpFrame = window;

  // map of calls
  const cmpCallbacks = {};


 /**
  * Set up a __tcfapi proxy method to do the postMessage and map the callback.
  * From the caller's perspective, this function behaves identically to the
  * CMP API's __tcfapi call
  */

  window.wrappedJSObject.__tcfapi = function(cmd, version, callback, arg) {

    if (!cmpFrame) {

      callback({msg: 'CMP not found'}, false);

    } else {

      const callId = Math.random() + '';
      const msg = {
        __tcfapiCall: {
          command: cmd,
          parameter: arg,
          version: version,
          callId: callId,
        },
      };

      /**
       * map the callback for lookup on response
       */

      cmpCallbacks[callId] = callback;
      cmpFrame.postMessage(msg, '*');

    }

  };

  function postMessageHandler(event) {

  /**
    * when we get the return message, call the mapped callback
    */

    let json = {};

    try {

      /**
        * if this isn't valid JSON then this will throw an error
        */

      json = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

    } catch (ignore) {}

    const payload = json.__tcfapiReturn;

    if (payload) {

      /**
        * messages we care about will have a payload
        */

      if (typeof cmpCallbacks[payload.callId] === 'function') {

        /**
         * call the mapped callback and then remove the reference
         */

        cmpCallbacks[payload.callId](payload.returnValue, payload.success);
        cmpCallbacks[payload.callId] = null;

      }

    }

  }

  window.addEventListener('message', postMessageHandler, false);

}());

module.exports = window.wrappedJSObject.__tcfapi;
