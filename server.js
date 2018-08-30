const express = require( 'express' );
const next = require( 'next' );

const dev = process.env.NODE_ENV !== 'production';

if ( dev ) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const app = next( { dev, dir: './app' } );
const handle = app.getRequestHandler();

app.prepare()
	.then( () => {
		const server = express();

		server.get( '/:slug', ( req, res ) => {
			const actualPage = '/page';
			const queryParams = { id: req.params.id, type: req.params.type };
			app.render( req, res, actualPage, queryParams )
		} );

		server.get( '*', ( req, res ) => {
			return handle( req, res )
		} );

		server.listen( 3000, ( err ) => {
			if ( err ) {
				throw err;
			}
			console.log( '> Ready on http://localhost:3000' )
		} )
	} )
	.catch( ( ex ) => {
		console.error( ex.stack );
		process.exit( 1 )
	} );
