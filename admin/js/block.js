/**
 * WordPress dependencies
 */
const { __, sprintf }       = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

const blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px',
};

registerBlockType( 'dolibarr/ex-product', {
    title: 'Example: Basic (esnext)',
    icon: 'universal-access-alt',
    category: 'layout',
		attributes: {
			err: {
				type: 'array',
	 			source: 'children',
	 			selector: 'p',
			}
		},
    example: {
			err: undefined
		},
    edit( props ) {
			const { attributes: { err }, setAttributes, className } = props;

			let fetchObject = {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'DOLAPIKEY': this.options.dolApiKey
        }
      };

				fetch( wpObject.api_url + 'products', fetchObject )
				.then(response => {
	        return response.json().then(json => {
						if (response.ok) {
							setAttributes( { err: 'OK' } );

						} else {
							setAttributes( { err: json.error.message } );
						}
	        });
	      });

        return <div style={ blockStyle }>{ err }</div>;
    },
    save() {
        return <div style={ blockStyle }>Hello World, step 1 (from the frontend).</div>;
    },
} );
