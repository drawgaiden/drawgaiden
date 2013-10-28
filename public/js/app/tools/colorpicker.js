define([

	'app/tools/tool',
	'simplify'

],
function ( Tool, simplify ) {

	function toHex( v ) {
	    var hex = v.toString( 16 );
	    return hex.length === 1 ? '0' + hex : hex;
	}

	function rgbToHex( r, g, b ) {
	    return '#' + toHex( r ) + toHex( g ) + toHex( b );
	}

	var ColorPickerTool = Tool.extend({

		defaults: {
			strokeStyle              : '#000000',
			fillStyle                : '#ffffff',
			lineWidth                : 1,
			lineCap                  : 'round',
			lineJoin                 : 'round',
			globalCompositeOperation : 'source-over',
			primary                  : true,
			sendUpdates              : false
		},

		_pick : function ( ctx, coord ) {
			var data  = ctx.getImageData( coord.x, coord.y, 1, 1 ).data,
				color = rgbToHex.apply( window, data );

			$( '#tools' ).trigger(
				this.settings.primary ? 'tool:color:stroke:set' : 'tool:color:fill:set',
				color
			);
		},

		mouseDown : function ( coord ) {
			this.active = true;
			this._pick( this.finalCtx, coord );
		},

		mouseUp : function () {
			this.active = false;
		},

		mouseMove : function ( coord ) {
			if ( this.active ) {
				this._pick( this.finalCtx, coord );
			}
		}

	});

	return ColorPickerTool;

});