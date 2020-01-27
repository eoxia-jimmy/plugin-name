/**
 * WordPress dependencies
 */
const { __, sprintf }       = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

const blockStyle = {
    padding: '20px',
    display: 'flex'
};

const elementStyle = {
  'width': '50%',
  'padding': '10px'
};

const elementContentStyle = {
  'background-color': 'white',
  'border': 'solid black 1px'
};

registerBlockType( 'dolibarr/ex-product', {
    title: 'Doli Product',
    icon: 'universal-access-alt',
    category: 'layout',

    attributes: {
      items: {
        type: 'array',
      }
  	},


    edit( { attributes, setAttributes } ) {
      if ( ! attributes.items ) {
			let fetchObject = {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'DOLAPIKEY': '1r6CmRpGb0t7rm8NG0qG9tmSX5vH5EN2'
        }
      };

				fetch( wpObject.api_url + 'products', fetchObject )
				.then(response => {
	        return response.json().then(json => {
						if (response.ok) {
							setAttributes( { items: json } );
						} else {
							setAttributes( { err: json.error.message } );
						}
	        });
	      });

      }

        if ( attributes.err ) {
          return <div style={ blockStyle }>{ attributes.err }</div>;
        }

        if ( ! attributes.items ) {
          return <div style={ blockStyle }>Loading...</div>;
        }

        return (
          <div style={ blockStyle }>
            {attributes.items.map((item, key) => (
              <div style={ elementStyle }>
                <div style={ elementContentStyle }>
                  <div>{ item.label }</div>
                  <div>{ item.price_ttc }</div>
                  <div><button>Add to cart</button></div>
                </div>
              </div>
            ))}
          </div>
        )
    },
    save( { attributes } ) {
      if ( ! attributes.items ) {
        return <div style={ blockStyle }>Loading...</div>;
      }


      return (
        <div style={ blockStyle }>
          {attributes.items.map((item, key) => (
            <div style={ elementStyle }>
              <div style={ elementContentStyle }>
              <div>{ item.label }</div>
              <div>{ item.price_ttc }</div>
              <div><button>Add to cart</button></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
} );
