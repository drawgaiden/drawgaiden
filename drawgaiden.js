var express = require( 'express' ),
    app     = express(),
    server  = require( 'http' ).createServer( app ),
    io      = require( 'socket.io' ).listen( server ),
    path    = require( 'path' ),
    config  = require( './config' ),
    state   = require( './lib/state' );

app.configure(function () {
  app.set( 'port', process.env.PORT || 3000 );
  app.set( 'views', __dirname + '/views' );
  app.set( 'view engine', 'hjs' );
  app.use( express.favicon() );
  app.use( express.logger( 'dev' ) );
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'public' ) ) );
});

app.configure( 'development', function () {
  app.use( express.errorHandler() );
});

app.get( '/', function ( req, res ) {
  res.render( 'index', config );
});

server.listen( app.get( 'port' ), function () {
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});

io.sockets.on( 'connection', function ( socket ) {

  socket.on( 'disconnect', function () {
    socket.get( 'name', function ( e, name ) {
      if ( !e && state.users.indexOf( name ) > -1 ) {
        state.users.splice( state.users.indexOf( name ), 1 );
      }
    });
  });

  socket.on( 'login', function ( name, done ) {

    if ( state.users.indexOf( name ) > -1 ) {

      done( 'A user with that name is already logged in.' );

    } else {

      socket.set( 'name', name, function () {
        state.users.push( name );
        done( null, state.operations );
      });

    }

  });

  socket.on( 'draw', function ( options ) {
    state.operations.push( options );
    socket.broadcast.emit( 'draw', options );
  });

  socket.on( 'clear', function () {
    state.operations = [];
    socket.broadcast.emit( 'clear' );
  });
    
});