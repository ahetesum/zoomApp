const env = process.env.NODE_ENV || 'development'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	development :{
		APIKey : 'iec_x51DQuOlwO4hBJsdhg',
		APISecret : 'kxgNVxUHbvYvZP19lVXkEeimR1Yg9B0i83Xw'
	},
	production:{	
		APIKey : '',
		APISecret : ''
	}
};

module.exports = config[env]
