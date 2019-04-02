/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('VideoStreamCtrl', VideoStreamCtrl);

    /** @ngInject */
    function VideoStreamCtrl($scope) {
        var video = document.querySelector("#videoElement");
		const start = document.querySelector('#start-video');
		const stop = document.querySelector('#stop-video');
		const constraints = {
			video: true
		};
		
		start.onclick = function() {
			if (navigator.mediaDevices.getUserMedia) {
			  navigator.mediaDevices.getUserMedia({ video: true })
				.then(function (stream) {
				  video.srcObject = stream;
				})
				.catch(function (err0r) {
				  console.log("Something went wrong!");
				});
			}
		}
		
		stop.onclick = function stop(e) {
		  var stream = video.srcObject;
		  var tracks = stream.getTracks();

		  for (var i = 0; i < tracks.length; i++) {
			var track = tracks[i];
			track.stop();
		  }

		  video.srcObject = null;
		}
    }
})();