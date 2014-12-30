
/** libs/jquery-2.1.3.js **/
(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/** libs/bootstrap-3.3.1.js **/
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.1'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.1'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.1'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var delta = direction == 'prev' ? -1 : 1
    var activeIndex = this.getItemIndex(active)
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.1'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true,
    trigger: '[data-toggle="collapse"]'
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.find('> .panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this })

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.1'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.1'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (that.options.backdrop) that.adjustBackdrop()
      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .prependTo(this.$element)
        .on('click.dismiss.bs.modal', $.proxy(function (e) {
          if (e.target !== e.currentTarget) return
          this.options.backdrop == 'static'
            ? this.$element[0].focus.call(this.$element[0])
            : this.hide.call(this)
        }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    if (this.options.backdrop) this.adjustBackdrop()
    this.adjustDialog()
  }

  Modal.prototype.adjustBackdrop = function () {
    this.$backdrop
      .css('height', 0)
      .css('height', this.$element[0].scrollHeight)
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.1'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
    this.arrow()
      .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isHorizontal ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.tooltip')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.tooltip', (data = {}))
        if (!data[selector]) data[selector] = new Tooltip(this, options)
      } else {
        if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.1'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.popover')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.popover', (data = {}))
        if (!data[selector]) data[selector] = new Popover(this, options)
      } else {
        if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.1'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.1'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.1'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && colliderTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $('body').height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/** libs/material-design-0.2.1.js **/
/* globals jQuery */

(function($) {
  // Selector to select only not already processed elements
  $.expr[":"].notmdproc = function(obj){
    if ($(obj).data("mdproc")) {
      return false;
    } else {
      return true;
    }
  };

  function _isChar(evt) {
    if (typeof evt.which == "undefined") {
      return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
      return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
    }
    return false;
  }

  $.material =  {
    "options": {
      // These options set what will be started by $.material.init()
      "input": true,
      "ripples": true,
      "checkbox": true,
      "togglebutton": true,
      "radio": true,
      "arrive": true,
      "autofill": true,

      "withRipples": [
        ".btn:not(.btn-link)",
        ".card-image",
        ".navbar a:not(.withoutripple)",
        ".dropdown-menu a",
        ".nav-tabs a:not(.withoutripple)",
        ".withripple"
      ].join(","),
      "inputElements": "input.form-control, textarea.form-control, select.form-control",
      "checkboxElements": ".checkbox > label > input[type=checkbox]",
      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
      "radioElements": ".radio > label > input[type=radio]"
    },
    "checkbox": function(selector) {
      // Add fake-checkbox to material checkboxes
      $((selector) ? selector : this.options.checkboxElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=ripple></span><span class=check></span>");
    },
    "togglebutton": function(selector) {
      // Add fake-checkbox to material checkboxes
      $((selector) ? selector : this.options.togglebuttonElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=toggle></span>");
    },
    "radio": function(selector) {
      // Add fake-radio to material radios
      $((selector) ? selector : this.options.radioElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=circle></span><span class=check></span>");
    },
    "input": function(selector) {
      $((selector) ? selector : this.options.inputElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .each( function() {
        var $this = $(this);
        $this.wrap("<div class=form-control-wrapper></div>");
        $this.after("<span class=material-input></span>");

        // Add floating label if required
        if ($this.hasClass("floating-label")) {
          var placeholder = $this.attr("placeholder");
          $this.attr("placeholder", null).removeClass("floating-label");
          $this.after("<div class=floating-label>" + placeholder + "</div>");
        }

        // Add hint label if required
        if ($this.attr("data-hint")) {
          $this.after("<div class=hint>" + $this.attr("data-hint") + "</div>");
        }

        // Set as empty if is empty (damn I must improve this...)
        if ($this.val() === null || $this.val() == "undefined" || $this.val() === "") {
          $this.addClass("empty");
        }

        // Support for file input
        if ($this.parent().next().is("[type=file]")) {
          $this.parent().addClass("fileinput");
          var $input = $this.parent().next().detach();
          $this.after($input);
        }
      });

      $(document)
      .on("change", ".checkbox input[type=checkbox]", function() { $(this).blur(); })
      .on("keydown paste", ".form-control", function(e) {
        if(_isChar(e)) {
          $(this).removeClass("empty");
        }
      })
      .on("keyup change", ".form-control", function() {
        var $this = $(this);
        if($this.val() === "") {
          $this.addClass("empty");
        } else {
          $this.removeClass("empty");
        }
      })
      .on("focus", ".form-control-wrapper.fileinput", function() {
        $(this).find("input").addClass("focus");
      })
      .on("blur", ".form-control-wrapper.fileinput", function() {
        $(this).find("input").removeClass("focus");
      })
      .on("change", ".form-control-wrapper.fileinput [type=file]", function() {
        var value = "";
        $.each($(this)[0].files, function(i, file) {
          console.log(file);
          value += file.name + ", ";
        });
        value = value.substring(0, value.length - 2);
        if (value) {
          $(this).prev().removeClass("empty");
        } else {
          $(this).prev().addClass("empty");
        }
        $(this).prev().val(value);
      });
    },
    "ripples": function(selector) {
      $.ripples({"target": (selector) ? selector : this.options.withRipples});
    },
    "autofill": function() {

      // This part of code will detect autofill when the page is loading (username and password inputs for example)
      var loading = setInterval(function() {
        $("input[type!=checkbox]").each(function() {
          if ($(this).val() && $(this).val() !== $(this).attr("value")) {
            $(this).trigger("change");
          }
        });
      }, 100);

      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(function() {
        clearInterval(loading);
      }, 10000);
      // Now we just listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
      var focused;
      $(document)
      .on("focus", "input", function() {
        var $inputs = $(this).parents("form").find("input").not("[type=file]");
        focused = setInterval(function() {
          $inputs.each(function() {
            if ($(this).val() !== $(this).attr("value")) {
              $(this).trigger("change");
            }
          });
        }, 100);
      })
      .on("blur", "input", function() {
        clearInterval(focused);
      });
    },
    "init": function() {
      if ($.ripples && this.options.ripples) {
        this.ripples();
      }
      if (this.options.input) {
        this.input();
      }
      if (this.options.checkbox) {
        this.checkbox();
      }
      if (this.options.togglebutton) {
        this.togglebutton();
      }
      if (this.options.radio) {
        this.radio();
      }
      if (this.options.autofill) {
        this.autofill();
      }

      if (document.arrive && this.options.arrive) {
        $(document).arrive(this.options.inputElements, function() {
          $.material.input($(this));
        });
        $(document).arrive(this.options.checkboxElements, function() {
          $.material.checkbox($(this));
        });
        $(document).arrive(this.options.radioElements, function() {
          $.material.radio($(this));
        });
        $(document).arrive(this.options.togglebuttonElements, function() {
          $.material.togglebutton($(this));
        });
      }
    }
  };

})(jQuery);

/** libs/material-ripples-0.2.1.js **/
/* globals jQuery, navigator */

(function($) {

  // Detect if the browser supports transitions
  $.support.transition = (function(){
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        support = (
          thisStyle.transition !== undefined ||
          thisStyle.WebkitTransition !== undefined ||
          thisStyle.MozTransition !== undefined ||
          thisStyle.MsTransition !== undefined ||
          thisStyle.OTransition !== undefined
        );
    return support;
  })();

  $.ripples = function(options) {

    // Default options
    var defaultOptions = {
      "target": ".btn:not(.btn-link), .card-image, .navbar a:not(.withoutripple), .nav-tabs a:not(.withoutripple), .withripple"
    };


    function isTouch() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }


    // Fade out the ripple and then destroy it
    function rippleOut(ripple) {

      // Unbind events from ripple
      ripple.off();

      // Start the out animation
      if ($.support.transition) {
        ripple.addClass("ripple-out");
      } else {
        ripple.animate({
          "opacity": 0
        }, 100, function() {
          ripple.trigger("transitionend");
        });
      }

      // This function is called when the transition "out" ends
      ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        ripple.remove();
      });

    }

    // Apply custom options
    options = $.extend(defaultOptions, options);


    $(document)
    .on("mousedown touchstart", options.target, function(e) {
      if (isTouch() && e.type == "mousedown") {
        return false;
      }

      var element = $(this);

      // If the ripple wrapper does not exists, create it
      if (!$(this).find(".ripple-wrapper").length) {
        $(this).append("<div class=ripple-wrapper></div>");
      }

      var wrapper = $(this).find(".ripple-wrapper");


      var wrapperOffset = wrapper.offset(),
          relX,
          relY;
      if (!isTouch()) {
        // Get the mouse position relative to the ripple wrapper
        relX = e.pageX - wrapperOffset.left;
        relY = e.pageY - wrapperOffset.top;
      } else {
        // Make sure the user is using only one finger and then get the touch position relative to the ripple wrapper
        e = e.originalEvent;
        if (e.touches.length === 1) {
          relX = e.touches[0].pageX - wrapperOffset.left;
          relY = e.touches[0].pageY - wrapperOffset.top;
        } else {
          return;
        }
      }

      // Meet the new ripple
      var ripple = $("<div></div>");

      // Add to it the ripple class
      ripple.addClass("ripple");

      // Position it in the right place
      ripple.css({"left": relX, "top": relY});

      // Set the background color of the ripple
      ripple.css({"background-color": window.getComputedStyle($(this)[0]).color});

      // Spawn it
      wrapper.append(ripple);

      // Make sure the ripple has the styles applied (ugly hack but it works)
      (function() { return window.getComputedStyle(ripple[0]).opacity; })();

      // Set the new size
      var size = (Math.max($(this).outerWidth(), $(this).outerHeight()) / ripple.outerWidth()) * 2.5;


      // Decide if use CSS transitions or jQuery transitions
      if ($.support.transition) {
        // Start the transition
        ripple.css({
          "-ms-transform": "scale(" + size + ")",
          "-moz-transform": "scale(" + size + ")",
          "-webkit-transform": "scale(" + size + ")",
          "transform": "scale(" + size + ")"
        });
        ripple.addClass("ripple-on");
        ripple.data("animating", "on");
        ripple.data("mousedown", "on");
      } else {
        // Start the transition
        ripple.animate({
          "width": Math.max($(this).outerWidth(), $(this).outerHeight()) * 2,
          "height": Math.max($(this).outerWidth(), $(this).outerHeight()) * 2,
          "margin-left": Math.max($(this).outerWidth(), $(this).outerHeight()) * -1,
          "margin-top": Math.max($(this).outerWidth(), $(this).outerHeight()) * -1,
          "opacity": 0.2
        }, 500, function() {
          ripple.trigger("transitionend");
        });
      }

      // This function is called when the transition "on" ends
      setTimeout(function() {
        ripple.data("animating", "off");
        if (ripple.data("mousedown") == "off") {
          rippleOut(ripple);
        }
      }, 500);

      // On mouseup or on mouseleave, set the mousedown flag to "off" and try to destroy the ripple
      element.on("mouseup mouseleave", function() {
        ripple.data("mousedown", "off");
        // If the transition "on" is finished then we can destroy the ripple with transition "out"
        if (ripple.data("animating") == "off") {
          rippleOut(ripple);
        }
      });

    });

  };

  $.fn.ripples = function() {
    $.ripples({"target": $(this)});
  };

})(jQuery);

/** assets/parolamea-opt.js **/
(function(){'use strict';function aa(){return function(){}}function ba(a){return function(b){this[a]=b}}function d(a){return function(){return this[a]}}function g(a){return function(){return a}}var l,ca="object"===typeof __ScalaJSEnv&&__ScalaJSEnv?__ScalaJSEnv:{},n="object"===typeof ca.global&&ca.global?ca.global:"object"===typeof global&&global&&global.Object===Object?global:this;ca.global=n;var da="object"===typeof ca.exportsNamespace&&ca.exportsNamespace?ca.exportsNamespace:n;ca.exportsNamespace=da;n.Object.freeze(ca);
var ea=0;function fa(a){return function(b,c){return!(!b||!b.a||b.a.vf!==c||b.a.tf!==a)}}function ga(a){var b,c;for(c in a)b=c;return b}function p(a,b){return ia(a,b,0)}function ia(a,b,c){var e=new a.bh(b[c]);if(c<b.length-1){a=a.Cf;c+=1;for(var f=e.b,h=0;h<f.length;h++)f[h]=ia(a,b,c)}return e}function ja(a){return void 0===a?"undefined":a.toString()}
function ka(a){switch(typeof a){case "string":return r(la);case "number":var b=a|0;return b===a?b<<24>>24===b&&1/b!==1/-0?r(ma):b<<16>>16===b&&1/b!==1/-0?r(na):r(oa):a!==a||pa(a)===a?r(qa):r(ra);case "boolean":return r(sa);case "undefined":return r(ta);default:if(null===a)throw(new ua).c();return va(a)?r(wa):a&&a.a?r(a.a):null}}function xa(a,b){return a&&a.a||null===a?a.wa(b):"number"===typeof a?"number"===typeof b&&(a===b?0!==a||1/a===1/b:a!==a&&b!==b):a===b}
function ya(a){switch(typeof a){case "string":return za(s(),a);case "number":return Aa(Ba(),a);case "boolean":return a?1231:1237;case "undefined":return 0;default:return a&&a.a||null===a?a.Ba():42}}function Ca(a,b){switch(typeof a){case "string":return a===b?0:a<b?-1:1;case "number":return Da||(Da=(new Ea).c()),Fa(a,b);case "boolean":return a-b;default:return Ga(a,b)?0:Ha(a,b)?1:-1}}function Ia(a,b){return"string"===typeof a?a.charCodeAt(b)&65535:a.ah(b)}
function Ja(a,b,c){return"string"===typeof a?a.substring(b,c):a.Qh(b,c)}function Ka(a,b,c,e,f){a=a.b;c=c.b;if(a!==c||e<b||b+f<e)for(var h=0;h<f;h++)c[e+h]=a[b+h];else for(h=f-1;0<=h;h--)c[e+h]=a[b+h]}function La(a){if(a&&a.a){var b=a.$idHashCode$0;void 0===b&&(ea=b=ea+1|0,a.$idHashCode$0=b);return b}return null===a?0:ya(a)}function Na(a){return(a|0)===a&&1/a!==1/-0}function Oa(a){return null===a?v().hc:a}this.__ScalaJSExportsNamespace=da;
function Pa(a,b,c){this.yg=this.bh=void 0;this.u={};this.Cf=null;this.Wh=a;this.Yg=b;this.rf=this.sf=void 0;this.Sc=g(!1);this.name=c;this.isPrimitive=!0;this.isArrayClass=this.isInterface=!1;this.isInstance=g(!1)}
function w(a,b,c,e,f,h,k){var m=ga(a);h=h||function(a){return!!(a&&a.a&&a.a.u[m])};k=k||function(a,b){return!!(a&&a.a&&a.a.vf===b&&a.a.tf.u[m])};this.bh=void 0;this.yg=e;this.u=f;this.Wh=this.Cf=null;this.Yg="L"+c+";";this.rf=this.sf=void 0;this.Sc=k;this.name=c;this.isPrimitive=!1;this.isInterface=b;this.isArrayClass=!1;this.isInstance=h}
function Qa(a){function b(a){if("number"===typeof a){this.b=Array(a);for(var b=0;b<a;b++)this.b[b]=c}else this.b=a}var c=a.Wh;"longZero"==c&&(c=v().hc);b.prototype=new y;b.prototype.a=this;var e="["+a.Yg,f=a.tf||a,h=(a.vf||0)+1;this.bh=b;this.yg=z;this.u={d:1};this.Cf=a;this.tf=f;this.vf=h;this.Wh=null;this.Yg=e;this.Sc=this.rf=this.sf=void 0;this.name=e;this.isInterface=this.isPrimitive=!1;this.isArrayClass=!0;this.isInstance=function(a){return f.Sc(a,h)}}
function r(a){if(!a.sf){var b=new Ra;b.Fc=a;a.sf=b}return a.sf}function B(a){a.rf||(a.rf=new Qa(a));return a.rf}w.prototype.getFakeInstance=function(){return this===la?"some string":this===sa?!1:this===ma||this===na||this===oa||this===qa||this===ra?0:this===wa?v().hc:this===ta?void 0:{a:this}};w.prototype.getSuperclass=function(){return this.yg?r(this.yg):null};w.prototype.getComponentType=function(){return this.Cf?r(this.Cf):null};
w.prototype.newArrayOfThisClass=function(a){for(var b=this,c=0;c<a.length;c++)b=B(b);return p(b,a)};Pa.prototype=w.prototype;Qa.prototype=w.prototype;var Sa=new Pa(void 0,"V","void"),Ta=new Pa(!1,"Z","boolean"),Ua=new Pa(0,"C","char"),C=new Pa(0,"B","byte"),Va=new Pa(0,"S","short"),Wa=new Pa(0,"I","int"),Xa=new Pa("longZero","J","long"),Ya=new Pa(0,"F","float"),Za=new Pa(0,"D","double"),$a=fa(Ta);Ta.Sc=$a;var ab=fa(Ua);Ua.Sc=ab;var bb=fa(C);C.Sc=bb;var cb=fa(Va);Va.Sc=cb;var db=fa(Wa);Wa.Sc=db;
var fb=fa(Xa);Xa.Sc=fb;var gb=fa(Ya);Ya.Sc=gb;var hb=fa(Za);Za.Sc=hb;var D=n.Math.imul||function(a,b){var c=a&65535,e=b&65535;return c*e+((a>>>16&65535)*e+c*(b>>>16&65535)<<16>>>0)|0},pa=n.Math.fround||function(a){return+a};function ib(){}function y(){}y.prototype=ib.prototype;ib.prototype.c=function(){return this};ib.prototype.wa=function(a){return this===a};ib.prototype.w=function(){var a=jb(ka(this)),b=(+(this.Ba()>>>0)).toString(16);return a+"@"+b};ib.prototype.Ba=function(){return La(this)};ib.prototype.toString=function(){return this.w()};function kb(a,b){var c=a&&a.a;if(c){var e=c.vf||0;return!(e<b)&&(e>b||!c.tf.isPrimitive)}return!1}
var z=new w({d:0},!1,"java.lang.Object",null,{d:1},function(a){return null!==a},kb);ib.prototype.a=z;function lb(a){return!!(a&&a.a&&a.a.u.Ya)}function nb(a){return!!(a&&a.a&&a.a.u.Hb)}var ob=new w({jb:0},!0,"scala.collection.immutable.Iterable",void 0,{jb:1,d:1,nb:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,mb:1,ca:1,ba:1,N:1,P:1,p:1}),pb=new w({nk:0},!0,"scala.collection.mutable.HashEntry",void 0,{nk:1,d:1});function qb(){}qb.prototype=new y;function rb(){}rb.prototype=qb.prototype;
qb.prototype.lg=aa();var sb=new w({pf:0},!1,"java.io.OutputStream",z,{pf:1,d:1,Re:1,of:1});qb.prototype.a=sb;function tb(){this.je=this.n=this.ia=this.ie=0}tb.prototype=new y;function ub(){}ub.prototype=tb.prototype;function E(a,b){if(0>b||b>a.ia)throw(new F).c();a.n=b;a.je>b&&(a.je=-1)}tb.prototype.w=function(){return vb(wb((new H).fa(["","[pos\x3d"," lim\x3d"," cap\x3d","]"])),(new H).fa([jb(ka(this)),this.n,this.ia,this.ie]))};
function xb(a,b){if(0>b||b>a.ie)throw(new F).c();a.ia=b;a.n>b&&(a.n=b,a.je>b&&(a.je=-1))}tb.prototype.la=function(a){this.ia=this.ie=a;this.n=0;this.je=-1;return this};var yb=new w({qf:0},!1,"java.nio.Buffer",z,{qf:1,d:1});tb.prototype.a=yb;function zb(){this.Pq=0}zb.prototype=new y;
function Ab(a,b){var c=p(B(C),[b]),e=c.b.length;Bb||(Bb=(new Cb).c());var f=c.b.length;if(0>f||(0+f|0)>c.b.length)throw(new I).c();var h=0+e|0;if(0>e||h>f)throw(new I).c();e=new Db;e.nf=!1;Eb.prototype.ym.call(e,f,c,0);E(e,0);xb(e,h);return e}zb.prototype.a=new w({dl:0},!1,"java.nio.ByteBuffer$",z,{dl:1,d:1});var Fb=void 0;function Gb(){Fb||(Fb=(new zb).c());return Fb}function Hb(){this.id=null}Hb.prototype=new y;Hb.prototype.w=d("id");Hb.prototype.k=function(a){this.id=a;return this};
Hb.prototype.a=new w({el:0},!1,"java.nio.ByteOrder",z,{el:1,d:1});function Ib(){this.al=this.ai=null}Ib.prototype=new y;Ib.prototype.c=function(){Jb=this;this.ai=(new Hb).k("BIG_ENDIAN");this.al=(new Hb).k("LITTLE_ENDIAN");return this};Ib.prototype.a=new w({fl:0},!1,"java.nio.ByteOrder$",z,{fl:1,d:1});var Jb=void 0;function Cb(){}Cb.prototype=new y;Cb.prototype.a=new w({hl:0},!1,"java.nio.HeapByteBuffer$",z,{hl:1,d:1});var Bb=void 0;function Kb(){}Kb.prototype=new y;
function Lb(a,b,c,e){if(0>c||(0+c|0)>("string"===typeof b?b.length|0:b.j()))throw(new I).c();a=0+e|0;if(0>e||a>c)throw(new I).c();return Mb(c,b,0,0,a)}Kb.prototype.a=new w({kl:0},!1,"java.nio.StringCharBuffer$",z,{kl:1,d:1});var Nb=void 0;function Ob(){Nb||(Nb=(new Kb).c());return Nb}function Qb(){this.ui=this.Hr=this.Bf=null;this.ab=0}Qb.prototype=new y;function Rb(){}Rb.prototype=Qb.prototype;Qb.prototype.oh=function(a){this.Bf=a;return this};
Qb.prototype.wa=function(a){return a&&a.a&&a.a.u.ad?this.Bf===a.Bf:!1};Qb.prototype.w=d("Bf");Qb.prototype.Ba=function(){return Sb(J(),this.Bf)};var Tb=new w({ad:0},!1,"java.nio.charset.Charset",z,{ad:1,d:1,bb:1});Qb.prototype.a=Tb;function Ub(){this.Qg=null;this.ab=!1}Ub.prototype=new y;
function Vb(a){if(!a.ab){var b;Wb||(Wb=(new Xb).c());b={};Yb(Zb(),(new H).fa("iso-8859-1 iso8859-1 iso_8859_1 iso8859_1 iso_8859-1 8859_1 iso_8859-1:1987 latin1 csisolatin1 l1 ibm-819 ibm819 cp819 819 iso-ir-100".split(" "))).qa($b(new K,function(a,b){return function(a){ac||(ac=(new bc).c());b[a]=ac}}(a,b)));Yb(Zb(),(new H).fa("us-ascii ascii7 ascii csascii default cp367 ibm367 iso646-us 646 iso_646.irv:1983 iso_646.irv:1991 ansi_x3.4-1986 ansi_x3.4-1968 iso-ir-6".split(" "))).qa($b(new K,function(a,
b){return function(a){cc||(cc=(new dc).c());b[a]=cc}}(a,b)));Yb(Zb(),(new H).fa(["utf-8","utf_8","utf8","unicode-1-1-utf-8"])).qa($b(new K,function(a,b){return function(a){b[a]=ec()}}(a,b)));Yb(Zb(),(new H).fa(["utf-16be","utf_16be","x-utf-16be","iso-10646-ucs-2","unicodebigunmarked"])).qa($b(new K,function(a,b){return function(a){fc||(fc=(new gc).c());b[a]=fc}}(a,b)));Yb(Zb(),(new H).fa(["utf-16le","utf_16le","x-utf-16le","unicodelittleunmarked"])).qa($b(new K,function(a,b){return function(a){hc||
(hc=(new ic).c());b[a]=hc}}(a,b)));Yb(Zb(),(new H).fa(["utf-16","utf_16","unicode","unicodebig"])).qa($b(new K,function(a,b){return function(a){jc||(jc=(new kc).c());b[a]=jc}}(a,b)));a.Qg=b;a.ab=!0}return a.Qg}Ub.prototype.a=new w({ll:0},!1,"java.nio.charset.Charset$",z,{ll:1,d:1});var lc=void 0;function nc(){this.dm=null;this.Pk=this.Yh=0;this.Pg=this.Ng=this.Og=null;this.gf=0}nc.prototype=new y;function oc(){}oc.prototype=nc.prototype;
function pc(a){if(0===a.ie)return Ab(Gb(),1);var b=Ab(Gb(),D(2,a.ie));a.je=-1;a.ia=a.n;a.n=0;if(a===b)throw(new F).c();if(b.nf)throw(new qc).c();if((a.ia-a.n|0)>(b.ia-b.n|0))throw(new rc).c();var c=a.ia-a.n|0;if(null!==a.Mc){var e=a.n;sc(b,a.Mc,a.he+e|0,c);E(a,e+c|0)}else for(;0!==c;)L(b,tc(a)),c=-1+c|0;return b}nc.prototype.Vi=function(a,b){nc.prototype.Wi.call(this,a,b,b,uc());return this};
nc.prototype.Wi=function(a,b,c,e){this.dm=a;this.Yh=b;this.Pk=c;this.Og=e;this.Ng=vc().hg;this.Pg=vc().hg;this.gf=0;return this};nc.prototype.Ui=aa();var wc=new w({eg:0},!1,"java.nio.charset.CharsetEncoder",z,{eg:1,d:1});nc.prototype.a=wc;function xc(){this.Pf=this.Tc=0}xc.prototype=new y;xc.prototype.vc=function(a,b){this.Tc=a;this.Pf=b;return this};
function yc(a){var b=a.Tc;switch(b){case 1:throw(new rc).c();case 0:throw(new zc).c();case 2:throw(new Ac).la(a.Pf);case 3:throw(new Bc).la(a.Pf);default:throw(new M).ha(b);}}xc.prototype.a=new w({nl:0},!1,"java.nio.charset.CoderResult",z,{nl:1,d:1});function Cc(){this.Er=this.lr=this.or=this.Dr=0;this.Jq=this.Lm=this.Km=this.cj=this.bj=this.Jk=this.aj=this.$i=this.Zi=this.Nd=this.cd=this.bd=null}Cc.prototype=new y;
Cc.prototype.c=function(){Dc=this;this.bd=(new xc).vc(1,-1);this.cd=(new xc).vc(0,-1);this.Nd=(new xc).vc(2,1);this.Zi=(new xc).vc(2,2);this.$i=(new xc).vc(2,3);this.aj=(new xc).vc(2,4);this.Jk=(new Ec).c();this.bj=(new xc).vc(3,1);this.cj=(new xc).vc(3,2);this.Km=(new xc).vc(3,3);this.Lm=(new xc).vc(3,4);this.Jq=(new Ec).c();return this};Cc.prototype.a=new w({ol:0},!1,"java.nio.charset.CoderResult$",z,{ol:1,d:1});var Dc=void 0;function N(){Dc||(Dc=(new Cc).c());return Dc}
function Fc(){this.id=null}Fc.prototype=new y;Fc.prototype.w=d("id");Fc.prototype.k=function(a){this.id=a;return this};Fc.prototype.a=new w({pl:0},!1,"java.nio.charset.CodingErrorAction",z,{pl:1,d:1});function Gc(){this.hg=this.gg=this.ei=null}Gc.prototype=new y;Gc.prototype.c=function(){Hc=this;this.ei=(new Fc).k("IGNORE");this.gg=(new Fc).k("REPLACE");this.hg=(new Fc).k("REPORT");return this};Gc.prototype.a=new w({ql:0},!1,"java.nio.charset.CodingErrorAction$",z,{ql:1,d:1});var Hc=void 0;
function vc(){Hc||(Hc=(new Gc).c());return Hc}function Ic(){this.ys=null;this.Mr=!1;this.pj=null;this.ab=0}Ic.prototype=new y;Ic.prototype.c=function(){Jc=this;return this};function Kc(){Lc()(function(a){return function(){return a.Se()}}((new Mc).c()))}
function Nc(){var a=Oc();if(0===(4&a.ab)&&0===(4&a.ab)){var b;b=Pc(O(),(new H).fa([109,97,105,108,116,111,58,99,111,110,116,97,99,116,64,112,97,114,111,108,97,109,101,97,46,111,114,103]),P().Nc);s();O();var c=P().Dc,c=Qc((new Rc).hd(c));c.ta(b.b.length);for(var e=0,f=b.b.length;e<f;)c.ra((new Q).xa(65535&b.b[e])),e=1+e|0;c=c.$();e=0+c.b.length|0;if(0>e||e>c.b.length)throw(new Sc).c();b=[];for(f=0;f!==e;)b.push(c.b[f]),f=1+f|0;c=n.String;e=c.fromCharCode;b=[].concat(b);b=e.apply(c,b);a.pj=b;a.ab|=
4}return a.pj}Ic.prototype.main=function(){Kc()};Ic.prototype.a=new w({ul:0},!1,"parolamea.ParolaMea$",z,{ul:1,d:1,qs:1,Vq:1});var Jc=void 0;function Oc(){Jc||(Jc=(new Ic).c());return Jc}da.parolamea=da.parolamea||{};da.parolamea.ParolaMea=Oc;function Tc(){this.ig=null}Tc.prototype=new y;Tc.prototype.c=function(){Uc=this;this.ig=Pc(O(),(new H).fa("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("")),Vc(P(),r(la)));return this};
function Wc(a,b,c){a=(3-b.b.length%3|0)%3;var e=Pc(O(),(new H).fa([0,0]),P().ob),f=0<a?a:0,h=e.b.length,f=f<h?f:h,k=0<f?f:0,h=(new Xc).c();h.ta(k);for(k=0;k<f;)Yc(h,e.b[k]|0),k=1+k|0;e=Zc(h);O();f=P().ob;f=Qc((new Rc).hd(f));h=(new $c).xd(e).j();f.ta(b.b.length+h|0);f.va((new $c).xd(b));f.va((new $c).xd(e));b=f.$();b=ad((new bd).xd(b));b=(new cd).af(b,$b(new K,function(a){dd();var b=(252&a.b[0])>>2,c=((3&a.b[0])<<4)+((240&a.b[1])>>4)|0,e=((15&a.b[1])<<2)+((192&a.b[2])>>6)|0;a=63&a.b[2];return Yb(Zb(),
(new H).fa([b,c,e,a]))}));c=ed(fd(),c);c=(new gd).af(b,c);c=hd(id(c),a);b=(new jd).k("\x3d");a=kd(b,a);b=Zb().sa;return ld(c,a,b).zd()}Tc.prototype.a=new w({xl:0},!1,"parolamea.generator.Base64$",z,{xl:1,d:1});var Uc=void 0;function dd(){Uc||(Uc=(new Tc).c());return Uc}function md(){this.id=null;this.Oc=this.qg=0;this.qe=v().hc;this.xf=null}md.prototype=new y;function nd(){}l=nd.prototype=md.prototype;l.Cm=function(a,b,c){this.id=a;this.qg=b;this.Oc=c;this.qe=v().hc;this.xf=p(B(C),[c]);od(this);return this};
l.cf=function(){this.qe=v().hc;for(var a=0;a<this.Oc;)a=1+a|0,this.xf.b[-1+a|0]=0;od(this)};function pd(a,b,c){var e;e=(new R).la(a.Oc);e=qd(a.qe,e)[1];e=rd(e);a.qe=sd(a.qe,(new R).la(c));var f=a.Oc-e|0,h=0;if(c>=f){Ka(b,0,a.xf,e,f);td(a,a.xf,0);for(h=f;(-1+(h+a.Oc|0)|0)<c;)td(a,b,0+h|0),h=h+a.Oc|0;e=0}h<c&&Ka(b,0+h|0,a.xf,e,c-h|0)}
l.Gf=function(){var a;a=(new R).la(ud().vh);a=qd(this.qe,a)[1];a=rd(a);a=56>a?56-a|0:120-a|0;var b=p(B(C),[8+a|0]);b.b[0]=-128;var c=vd(this.qe,3);b.b[a]=rd(wd(c,56))<<24>>24;a=1+a|0;b.b[a]=rd(wd(c,48))<<24>>24;a=1+a|0;b.b[a]=rd(wd(c,40))<<24>>24;a=1+a|0;b.b[a]=rd(wd(c,32))<<24>>24;a=1+a|0;b.b[a]=rd(wd(c,24))<<24>>24;a=1+a|0;b.b[a]=rd(wd(c,16))<<24>>24;a=1+a|0;b.b[a]=rd(wd(c,8))<<24>>24;b.b[1+a|0]=rd(c)<<24>>24;pd(this,b,b.b.length);a=Pc(O(),(new H).fa([(this.ve>>>24|0)<<24>>24,(this.ve>>>16|0)<<
24>>24,(this.ve>>>8|0)<<24>>24,this.ve<<24>>24,(this.we>>>24|0)<<24>>24,(this.we>>>16|0)<<24>>24,(this.we>>>8|0)<<24>>24,this.we<<24>>24,(this.xe>>>24|0)<<24>>24,(this.xe>>>16|0)<<24>>24,(this.xe>>>8|0)<<24>>24,this.xe<<24>>24,(this.ye>>>24|0)<<24>>24,(this.ye>>>16|0)<<24>>24,(this.ye>>>8|0)<<24>>24,this.ye<<24>>24,(this.ze>>>24|0)<<24>>24,(this.ze>>>16|0)<<24>>24,(this.ze>>>8|0)<<24>>24,this.ze<<24>>24,(this.Ae>>>24|0)<<24>>24,(this.Ae>>>16|0)<<24>>24,(this.Ae>>>8|0)<<24>>24,this.Ae<<24>>24,(this.Be>>>
24|0)<<24>>24,(this.Be>>>16|0)<<24>>24,(this.Be>>>8|0)<<24>>24,this.Be<<24>>24,(this.Ce>>>24|0)<<24>>24,(this.Ce>>>16|0)<<24>>24,(this.Ce>>>8|0)<<24>>24,this.Ce<<24>>24]),P().ob);this.cf();return a};l.Vh=function(a){a=xd(yd(),a);pd(this,a,a.b.length)};l.hf=function(a){pd(this,a,a.b.length)};var zd=new w({ii:0},!1,"parolamea.generator.BaseHash",z,{ii:1,d:1,ji:1,hb:1,gb:1});md.prototype.a=zd;
function Ad(){this.id=this.lc=this.zf=this.rm=this.Hc=null;this.qg=this.Oc=0;this.rg=this.xg=this.ng=null;this.ab=this.ps=this.ff=!1}Ad.prototype=new y;l=Ad.prototype;
l.cf=function(){this.ff=!1;this.lc.cf();var a=p(B(C),[this.Oc]);if(this.Hc.b.length>this.Oc){this.lc.hf(this.Hc);var b=this.lc.Gf();Ka(b,0,a,0,b.b.length)}else Ka(this.Hc,0,a,0,this.Hc.b.length);this.ng=a;if(0===this.xg.b.length){a=this.ng;O();b=P().ob;b=Qc((new Rc).hd(b));b.ta(a.b.length);for(var c=0,e=a.b.length;c<e;){var f=a.b[c]|0;b.ra(Bd().wj.b[f]);c=1+c|0}this.xg=b.$()}if(0===this.rg.b.length){a=this.ng;O();b=P().ob;b=Qc((new Rc).hd(b));b.ta(a.b.length);c=0;for(e=a.b.length;c<e;)f=a.b[c]|0,
b.ra(Bd().vj.b[f]),c=1+c|0;this.rg=b.$()}this.lc.hf(this.rg)};l.Gf=function(){this.ff&&this.cf();this.ff=!0;var a=this.lc.Gf();this.lc.hf(this.xg);this.lc.hf(a);return this.lc.Gf()};l.Vh=function(a){this.ff&&this.cf();this.lc.Vh(a)};l.hf=function(a){this.ff&&this.cf();this.lc.hf(a)};l.a=new w({yl:0},!1,"parolamea.generator.HMAC",z,{yl:1,d:1,ji:1,hb:1,gb:1});function Cd(){this.vj=this.wj=null}Cd.prototype=new y;
Cd.prototype.c=function(){Dd=this;Ed();Fd().Ec;Ed();Gd();for(var a=(new Hd).c(),b=0;256!==b;)Id(a,(92^b)<<24>>24),b=1+b|0;a=Jd(a);b=P().ob;this.wj=Kd(a,b);Ed();Fd().Ec;Ed();Gd();a=(new Hd).c();for(b=0;256!==b;)Id(a,(54^b)<<24>>24),b=1+b|0;a=Jd(a);b=P().ob;this.vj=Kd(a,b);return this};Cd.prototype.a=new w({zl:0},!1,"parolamea.generator.HMAC$",z,{zl:1,d:1});var Dd=void 0;function Bd(){Dd||(Dd=(new Cd).c());return Dd}function Ld(){this.ig=this.xi=this.os=null}Ld.prototype=new y;
Ld.prototype.c=function(){Md=this;var a=[(new Q).xa(48),(new Q).xa(49),(new Q).xa(50),(new Q).xa(51),(new Q).xa(52),(new Q).xa(53),(new Q).xa(54),(new Q).xa(55),(new Q).xa(56),(new Q).xa(57)];if(0===(a.length|0))a=Nd();else{var b=Od(new Pd,Nd());for(var c=0,e=a.length|0;c<e;)Qd(b,a[c]),c=1+c|0;a=b.zb}this.xi=a;this.ig=Pc(O(),(new H).fa("uRUEXmWFwjKZre30GJvNBOVd6n+z7gqxsQpk5Coth/bfDL4Y21caTHSPMl9iAI8y".split("")),Vc(P(),r(la)));return this};
function Rd(a,b){var c=Lc()("#inputIdentifier").val();Bd();var e=c+"NkSCwmKP95Wpi6xu",c=ud().zf,f=new Ad,e=xd(yd(),e);f.Hc=e;f.rm=c;f.zf=c;f.lc=(f.zf,ud(),(new Sd).c());f.id="hmac-"+f.lc.id;f.Oc=f.lc.Oc;f.qg=f.lc.qg;O();f.ng=P().ob.qb(0);O();f.xg=P().ob.qb(0);O();f.rg=P().ob.qb(0);f.ff=!0;f.Vh(b);c=f.Gf();c=Wc(dd(),c,a.ig);f=(new jd).k(c);e=f.ga();e.ta(f.j());for(var h=f.j();0<h;)h=-1+h|0,e.ra(f.Ka(h));f=e.$();f=(new jd).k(f);f=Td(f,a.xi);f=(new jd).k(f);f=Ud(Vd(),f.pa,0,2);f=(new jd).k(f);P().Dc;
f=Wd(s(),f.pa);e=Yb(Zb(),(new H).fa([(new Q).xa(56),(new Q).xa(52)]));O();h=P().Dc;h=Qc((new Rc).hd(h));if(nb(e)){var k=e.Ca().na();h.ta(f.b.length+k|0)}h.va(Xd(new Yd,f));h.va(e.Ca());f=h.$();e=f.b.length;e=2<e?2:e;k=0<e?e:0;h=(new Zd).c();h.ta(k);for(k=0;k<e;)h.ra((new Q).xa(f.b[k])),k=1+k|0;f=$d(h);O();e=Vc(P(),r(la));e=Qc((new Rc).hd(e));e.ta(f.b.length);h=0;for(k=f.b.length;h<k;){var m=(new Q).xa(f.b[h]),m=ae(S(),m),m=(new Q).xa(m).Ia;e.ra(n.String.fromCharCode(m));h=1+h|0}f=e.$();c=c.split("\x3d").join("");
e=f.b[0];c=c.split("+").join(e);f=f.b[1];c=c.split("/").join(f);be();c=(new H).fa([c.substring(0,4),c.substring(4,8),c.substring(8,12),c.substring(12,16)]);f=be().sa;return ce(c,f)}Ld.prototype.a=new w({Al:0},!1,"parolamea.generator.Password$",z,{Al:1,d:1});var Md=void 0;function de(){this.nj=this.zf=null;this.vh=0;this.ee=this.Sk=null;this.ab=this.Pr=!1}de.prototype=new y;
de.prototype.c=function(){ee=this;this.zf=(new fe).c();this.nj=ge(O(),1116352408,(new H).fa([1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,
-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998]));this.vh=64;this.Sk="BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD";this.ee=p(B(Wa),[64]);return this};de.prototype.a=new w({Cl:0},!1,"parolamea.generator.SHA256$",z,{Cl:1,d:1});var ee=void 0;
function ud(){ee||(ee=(new de).c());return ee}function fe(){}fe.prototype=new y;fe.prototype.a=new w({Dl:0},!1,"parolamea.generator.SHA256$$anon$1",z,{Dl:1,d:1,Wq:1});function he(){this.Wk=null}he.prototype=new y;he.prototype.c=function(){ie=this;this.Wk=Wd(s(),"0123456789ABCDEF");return this};
function xd(a,b){s();s();var c;lc||(lc=(new Ub).c());c=lc;c=c.ab?c.Qg:Vb(c);c=c.hasOwnProperty("utf-8")?(new je).ha(c["utf-8"]):ke();if(le(c))c=c.fe;else{if(ke()===c)throw(new me).k("UTF-8");throw(new M).ha(c);}var e,f=c;c=b.length|0;c=Lb(Ob(),b,b.length|0,c);var h;if(0===(2&f.ab)&&0===(2&f.ab)){var k=f.th(),m=vc().gg;if(null===m)throw(new F).k("null CodingErrorAction");k.Ng=m;m=vc().gg;if(null===m)throw(new F).k("null CodingErrorAction");k.Pg=m;f.ui=k;f.ab|=2}f=f.ui;if(0===(c.ia-c.n|0))h=Ab(Gb(),
0);else{f.gf=0;f.Ui();k=pa(pa(c.ia-c.n|0)*f.Yh)|0;k=Ab(Gb(),k);b:for(;;){d:{var m=f,t=c,q=k;if(3===m.gf)throw(new ne).c();m.gf=2;for(;;){try{var u=m.fh(t,q)}catch(A){if(A&&A.a&&A.a.u.gi)throw oe(A);if(A&&A.a&&A.a.u.hi)throw oe(A);throw A;}if(0===u.Tc){var x=t.ia-t.n|0;if(0<x){var G=N();switch(x){case 1:x=G.Nd;break;case 2:x=G.Zi;break;case 3:x=G.$i;break;case 4:x=G.aj;break;default:var Ma=G.Jk,G=pe(Ma,x);if(le(G))x=G.fe;else if(ke()===G){var eb=G=(new xc).vc(2,x),x=qe(Ma,x,eb);null===x?ke():(Ma=x.Ia,
x.Ia=eb,(new je).ha(Ma));x=G}else throw(new M).ha(G);}}else x=u}else x=u;if(0===x.Tc||1===x.Tc){m=x;break d}G=3===x.Tc?m.Pg:m.Ng;if(vc().gg===G){if((q.ia-q.n|0)<m.Og.b.length){m=N().bd;break d}G=m.Og;sc(q,G,0,G.b.length);G=t.n;x=x.Pf;if(0>x)throw(new re).c();E(t,G+x|0)}else{if(vc().hg===G){m=x;break d}if(vc().ei===G){G=t.n;x=x.Pf;if(0>x)throw(new re).c();E(t,G+x|0)}else throw(new M).ha(G);}}m=void 0}if(0===m.Tc){se(fd(),c.n===c.ia);e=k;break b}else if(1===m.Tc)k=pc(k);else throw yc(m),(new te).ha("should not get here");
}b:for(;;){d:switch(u=f,u.gf){case 2:c=N().cd;0===c.Tc&&(u.gf=3);u=c;break d;case 3:u=N().cd;break d;default:throw(new ne).c();}if(0===u.Tc){h=e;break b}else if(1===u.Tc)e=pc(e);else throw yc(u),(new te).ha("should not get here");}e=h;e.je=-1;e.ia=e.n;e.n=0}e=h;h=e.Mc;if(null===h)throw(new re).c();if(e.nf)throw(new qc).c();for(e=h.b.length;0===h.b[-1+e|0];)e=-1+e|0;return e<h.b.length?(u=p(B(C),[e]),Ka(h,0,u,0,e),u):h}he.prototype.a=new w({El:0},!1,"parolamea.generator.Util$",z,{El:1,d:1});
var ie=void 0;function yd(){ie||(ie=(new he).c());return ie}var la=new w({Vl:0},!1,"java.lang.String",z,{Vl:1,f:1,d:1,ug:1,bb:1},function(a){return"string"===typeof a});function ue(){this.md=this.Ed=null}ue.prototype=new y;l=ue.prototype;l.Yd=g("Tuple2");l.Wd=g(2);l.wa=function(a){return this===a?!0:a&&a.a&&a.a.u.qi?T(S(),this.Ed,a.Ed)&&T(S(),this.md,a.md):!1};l.Ze=function(a,b){this.Ed=a;this.md=b;return this};
l.Xd=function(a){a:switch(a){case 0:a=this.Ed;break a;case 1:a=this.md;break a;default:throw(new I).k(""+a);}return a};l.w=function(){return"("+this.Ed+","+this.md+")"};l.Ba=function(){return ve(this)};l.Ee=function(){return we(this)};l.a=new w({qi:0},!1,"scala.Tuple2",z,{qi:1,d:1,Vr:1,Zd:1,p:1,g:1,f:1});var sa=new w({Om:0},!1,"java.lang.Boolean",z,{Om:1,d:1,bb:1},function(a){return"boolean"===typeof a});function Q(){this.Ia=0}Q.prototype=new y;l=Q.prototype;
l.wa=function(a){return xe(a)?this.Ia===a.Ia:!1};l.w=function(){return n.String.fromCharCode(this.Ia)};l.xa=function(a){this.Ia=a;return this};l.Ba=d("Ia");function xe(a){return!!(a&&a.a&&a.a.u.hj)}l.a=new w({hj:0},!1,"java.lang.Character",z,{hj:1,d:1,bb:1});function ye(){this.ri=null;this.ur=this.Tq=this.Uq=this.Qq=this.Rq=this.jr=this.Zq=this.er=this.dr=this.kr=this.br=this.hr=this.ar=this.gr=this.cr=this.ir=this.pi=this.ki=this.li=0;this.Rr=this.Sr=this.Tr=null;this.ab=0}ye.prototype=new y;
function ze(a){a=(new Q).xa(a).Ia;return 65535&(n.String.fromCharCode(a).toUpperCase().charCodeAt(0)|0)}ye.prototype.a=new w({Qm:0},!1,"java.lang.Character$",z,{Qm:1,d:1});var Ae=void 0;function Be(){Ae||(Ae=(new ye).c())}function Ra(){this.Fc=null}Ra.prototype=new y;function jb(a){return a.Fc.name}Ra.prototype.w=function(){return(this.Fc.isInterface?"interface ":this.Fc.isPrimitive?"":"class ")+jb(this)};Ra.prototype.a=new w({ij:0},!1,"java.lang.Class",z,{ij:1,d:1});
function Ea(){this.ri=null;this.pi=this.fr=this.$q=this.li=this.ki=this.nr=this.mr=this.pr=0;this.Ir=null;this.ab=!1}Ea.prototype=new y;function Fa(a,b){if(a!==a)return b!==b?0:1;if(b!==b)return-1;if(a===b){if(0===a){var c=1/a;return c===1/b?0:0>c?-1:1}return 0}return a<b?-1:1}Ea.prototype.a=new w({Tm:0},!1,"java.lang.Double$",z,{Tm:1,d:1});var Da=void 0;function Ce(){this.ri=null;this.pi=this.ki=this.li=0}Ce.prototype=new y;
function De(a){throw(new Ee).k(vb(wb((new H).fa(['For input string: "','"'])),(new H).fa([a])));}
function Fe(a,b){if(null===b||0===((new jd).k(b).pa.length|0))De(b);else{var c=45===(65535&(b.charCodeAt(0)|0))||43===(65535&(b.charCodeAt(0)|0))?1:0;if(((new jd).k(b).pa.length|0)<=c)De(b);else{for(;;){var e=c,f=(new jd).k(b).pa;if(e<(f.length|0))Be(),e=65535&(b.charCodeAt(c)|0),0>(48<=e&&57>=e&&10>(-48+e|0)?-48+e|0:65<=e&&90>=e&&0>(-65+e|0)?-55+e|0:97<=e&&122>=e&&0>(-97+e|0)?-87+e|0:65313<=e&&65338>=e&&0>(-65313+e|0)?-65303+e|0:65345<=e&&65370>=e&&0>(-65345+e|0)?-65303+e|0:-1)&&De(b),c=1+c|0;else break}c=
+n.parseInt(b,10);return c!==c||2147483647<c||-2147483648>c?De(b):c|0}}}function Ge(a,b){var c=b-(1431655765&b>>1)|0,c=(858993459&c)+(858993459&c>>2)|0;return D(16843009,252645135&(c+(c>>4)|0))>>24}function He(a,b){var c=b,c=c|c>>>1|0,c=c|c>>>2|0,c=c|c>>>4|0,c=c|c>>>8|0;return 32-Ge(0,c|c>>>16|0)|0}function Ie(a,b){return Ge(0,-1+(b&(-b|0))|0)}Ce.prototype.a=new w({Wm:0},!1,"java.lang.Integer$",z,{Wm:1,d:1});var Je=void 0;function Ke(){Je||(Je=(new Ce).c());return Je}function Le(){}Le.prototype=new y;
function Me(){}Me.prototype=Le.prototype;function Ne(a){return!!(a&&a.a&&a.a.u.yd||"number"===typeof a)}var Oe=new w({yd:0},!1,"java.lang.Number",z,{yd:1,d:1},Ne);Le.prototype.a=Oe;function Pe(){this.xb=null}Pe.prototype=new y;l=Pe.prototype;l.c=function(){Pe.prototype.k.call(this,"");return this};function Qe(a,b){a.xb=""+a.xb+(null===b?"null":b);return a}l.Qh=function(a,b){return this.xb.substring(a,b)};l.w=d("xb");l.kg=function(a){return Re(this,a)};
function Re(a,b){return null===b?Qe(a,null):Qe(a,ja(b))}l.la=function(){Pe.prototype.k.call(this,"");return this};function Se(a,b,c,e){return null===b?Se(a,"null",c,e):Qe(a,ja(Ja(b,c,e)))}l.j=function(){return this.xb.length|0};function Te(a,b){var c=(new Q).xa(b).Ia;return Qe(a,n.String.fromCharCode(c))}l.k=function(a){this.xb=a;return this};l.jg=function(a){return Te(this,a)};l.ah=function(a){return 65535&(this.xb.charCodeAt(a)|0)};
l.a=new w({dn:0},!1,"java.lang.StringBuilder",z,{dn:1,d:1,ug:1,tg:1,f:1});function Ue(){this.tm=this.um=this.Ki=this.sj=null}Ue.prototype=new y;
Ue.prototype.c=function(){Ve=this;this.sj=We(!1);this.Ki=We(!0);this.um=null;this.tm=n.performance?n.performance.now?function(){return function(){return+n.performance.now()}}(this):n.performance.webkitNow?function(){return function(){return+n.performance.webkitNow()}}(this):function(){return function(){return+(new n.Date).getTime()}}(this):function(){return function(){return+(new n.Date).getTime()}}(this);return this};Ue.prototype.a=new w({fn:0},!1,"java.lang.System$",z,{fn:1,d:1});var Ve=void 0;
function Xe(){Ve||(Ve=(new Ue).c());return Ve}function Ye(){this.de=this.lh=null}Ye.prototype=new y;function Ze(){}Ze.prototype=Ye.prototype;Ye.prototype.c=function(){this.lh=!1;return this};Ye.prototype.ue=function(){this.lh||(this.de=this.Xh.Pj,this.lh=!0);return this.de};var $e=new w({rh:0},!1,"java.lang.ThreadLocal",z,{rh:1,d:1});Ye.prototype.a=$e;function U(){this.rs=this.fm=this.zj=null}U.prototype=new y;function af(){}l=af.prototype=U.prototype;
l.c=function(){U.prototype.Rc.call(this,null,null);return this};l.pg=function(){var a=bf(),b;a:try{b=a.undef()}catch(c){a=cf(df(),c);if(null!==a){if(ef(a)){b=a.Kd;break a}throw ff(df(),a);}throw c;}this.stackdata=b;return this};l.te=d("zj");l.w=function(){var a=jb(ka(this)),b=this.te();return null===b?a:a+": "+b};l.Rc=function(a,b){this.zj=a;this.fm=b;this.pg();return this};var gf=new w({Aa:0},!1,"java.lang.Throwable",z,{Aa:1,d:1,f:1});U.prototype.a=gf;function hf(){}hf.prototype=new y;
hf.prototype.a=new w({gn:0},!1,"java.lang.reflect.Array$",z,{gn:1,d:1});var jf=void 0;function kf(){}kf.prototype=new y;function lf(a,b){for(var c=0;c!==b.b.length;)b.b[c]=0,c=1+c|0}kf.prototype.a=new w({hn:0},!1,"java.util.Arrays$",z,{hn:1,d:1});var mf=void 0;function nf(){mf||(mf=(new kf).c());return mf}function of(){this.Id=null;this.Ue=!1}of.prototype=new y;l=of.prototype;l.c=function(){of.prototype.Dm.call(this,(new Pe).c());return this};
function pf(a,b,c,e,f,h,k){var m=(b.length|0)+(c.length|0)|0;if(h<=m)b=""+c+b;else{var t=qf("-",f);e=qf("0",f)&&!e;var q="";for(h=h-m|0;0<h;)q=""+q+(e?"0":" "),h=-1+h|0;h=q;if(e&&t)throw(new rf).k(f);b=t?""+c+b+h:e?""+c+h+b:""+h+c+b}Be();k=ze(k)===k?b.toUpperCase():b;a.Id.kg(k)}l.w=function(){return(this.Ue?sf():this.Id).w()};l.Dm=function(a){this.Id=a;this.Ue=!1;return this};
function tf(a,b,c,e,f,h){var k=65535&(b.charCodeAt(0)|0);43===k||45===k?pf(a,b.substring(1),""+(new Q).xa(k)+c,!1,e,f,h):pf(a,b,c,!1,e,f,h)}function qf(a,b){return 0<=(b.indexOf(a)|0)}function uf(a,b,c,e,f,h){var k=vf(e).toExponential(b);101===(65535&(k.charCodeAt(-3+(k.length|0)|0)|0))?(b=k.substring(0,-1+(k.length|0)|0),k=65535&(k.charCodeAt(-1+(k.length|0)|0)|0),b=b+"0"+(new Q).xa(k)):b=k;k=vf(e);k!==k?e=!0:(e=vf(e),e=Infinity===e||-Infinity===e);wf(a,b,e,c,f,h)}
function sf(){throw(new xf).c();}l.lg=function(){if(!this.Ue){var a=this.Id;a&&a.a&&a.a.u.Re&&a.lg()}this.Ue=!0};function wf(a,b,c,e,f,h){45!==(65535&(b.charCodeAt(0)|0))?qf("+",e)?pf(a,b,"+",c,e,f,h):qf(" ",e)?pf(a,b," ",c,e,f,h):pf(a,b,"",c,e,f,h):qf("(",e)?pf(a,b.substring(1)+")","(",c,e,f,h):pf(a,b.substring(1),"-",c,e,f,h)}function vf(a){if(Ne(a))return"number"===typeof a?a:yf(a);if(xe(a))return ae(S(),a);throw(new M).ha(a);}l.a=new w({kn:0},!1,"java.util.Formatter",z,{kn:1,d:1,Re:1,of:1});
function zf(){this.fj=this.ej=this.dj=this.gj=null}zf.prototype=new y;zf.prototype.c=function(){Af=this;this.gj=Bf(new Cf,new n.RegExp("^[^\\x25]+"));this.dj=Bf(new Cf,new n.RegExp("^\\x25{2}"));this.ej=Bf(new Cf,new n.RegExp("^\\x25n"));this.fj=Bf(new Cf,new n.RegExp("^\\x25(?:([1-9]\\d*)\\$)?([-#+ 0,\\(\x3c]*)(\\d*)(?:\\.(\\d+))?([A-Za-z])"));return this};zf.prototype.a=new w({ln:0},!1,"java.util.Formatter$",z,{ln:1,d:1});var Af=void 0;function Df(){Af||(Af=(new zf).c());return Af}
function Cf(){this.xj=null}Cf.prototype=new y;function Ef(a,b){Ff||(Ff=(new Gf).c());var c=a.xj.exec(b);return null===c?ke():(new je).ha(c)}function Bf(a,b){a.xj=b;return a}Cf.prototype.a=new w({mn:0},!1,"java.util.Formatter$RegExpExtractor",z,{mn:1,d:1});function Rc(){this.Sh=null}Rc.prototype=new y;Rc.prototype.Te=function(){return Hf(If(),this.Sh)};Rc.prototype.hd=function(a){this.Sh=a;return this};Rc.prototype.vd=function(){return Qc(this)};function Qc(a){return Hf(If(),a.Sh)}
Rc.prototype.a=new w({wn:0},!1,"scala.Array$$anon$2",z,{wn:1,d:1,Xf:1});function Jf(){}Jf.prototype=new y;function Kf(){}Kf.prototype=Jf.prototype;var Lf=new w({Aj:0},!1,"scala.DeprecatedConsole",z,{Aj:1,d:1});Jf.prototype.a=Lf;function Mf(){}Mf.prototype=new y;function Nf(){}Nf.prototype=Mf.prototype;var Of=new w({Bj:0},!1,"scala.FallbackArrayBuilding",z,{Bj:1,d:1});Mf.prototype.a=Of;function Pf(){}Pf.prototype=new y;function Qf(){}Qf.prototype=Pf.prototype;
function ed(a,b){var c;null===b?c=null:0===b.b.length?(Rf||(Rf=(new Sf).c()),c=Rf.ci):c=Tf(new Uf,b);return c}var Vf=new w({Cj:0},!1,"scala.LowPriorityImplicits",z,{Cj:1,d:1});Pf.prototype.a=Vf;function Wf(){}Wf.prototype=new y;function Xf(){}Xf.prototype=Wf.prototype;Wf.prototype.c=function(){return this};var Yf=new w({xh:0},!1,"scala.Option",z,{xh:1,d:1,Zd:1,p:1,g:1,f:1});Wf.prototype.a=Yf;function Gf(){}Gf.prototype=new y;Gf.prototype.a=new w({An:0},!1,"scala.Option$",z,{An:1,d:1,g:1,f:1});
var Ff=void 0;function Zf(){}Zf.prototype=new y;Zf.prototype.Te=function(){return(new $f).c()};Zf.prototype.vd=function(){return(new $f).c()};Zf.prototype.a=new w({En:0},!1,"scala.Predef$$anon$3",z,{En:1,d:1,Xf:1});function ag(){}ag.prototype=new y;function bg(){}bg.prototype=ag.prototype;ag.prototype.c=function(){return this};ag.prototype.w=g("\x3cfunction1\x3e");var cg=new w({Dj:0},!1,"scala.Predef$$eq$colon$eq",z,{Dj:1,d:1,y:1,g:1,f:1});ag.prototype.a=cg;function dg(){}dg.prototype=new y;
function eg(){}eg.prototype=dg.prototype;dg.prototype.c=function(){return this};dg.prototype.w=g("\x3cfunction1\x3e");var fg=new w({Ej:0},!1,"scala.Predef$$less$colon$less",z,{Ej:1,d:1,y:1,g:1,f:1});dg.prototype.a=fg;function gg(){}gg.prototype=new y;gg.prototype.a=new w({Fn:0},!1,"scala.Predef$any2stringadd$",z,{Fn:1,d:1});var hg=void 0;function ig(){this.wc=null}ig.prototype=new y;l=ig.prototype;l.Yd=g("StringContext");l.Wd=g(1);
l.wa=function(a){if(this===a)return!0;if(a&&a.a&&a.a.u.Gj){var b=this.wc;a=a.wc;return null===b?null===a:b.wa(a)}return!1};l.Xd=function(a){switch(a){case 0:return this.wc;default:throw(new I).k(""+a);}};l.w=function(){return jg(this)};function kg(a,b){if(a.wc.j()!==(1+b.j()|0))throw(new F).k("wrong number of arguments ("+b.j()+") for interpolated string with "+a.wc.j()+" parts");}
function vb(a,b){var c=function(){return function(a){lg||(lg=(new mg).c());a:{var b=a.length|0,c=ng(s(),a,92);switch(c){case -1:break a;default:var e=(new Pe).c();b:{var f=c,c=0;for(;;)if(0<=f){f>c&&Se(e,a,c,f);c=1+f|0;if(c>=b)throw og(a,f);var h=65535&(a.charCodeAt(c)|0);switch(h){case 98:f=8;break;case 116:f=9;break;case 110:f=10;break;case 102:f=12;break;case 114:f=13;break;case 34:f=34;break;case 39:f=39;break;case 92:f=92;break;default:if(48<=h&&55>=h){h=65535&(a.charCodeAt(c)|0);f=-48+h|0;c=
1+c|0;if(c<b&&48<=(65535&(a.charCodeAt(c)|0))&&55>=(65535&(a.charCodeAt(c)|0))){var k=c,f=-48+(D(8,f)+(65535&(a.charCodeAt(k)|0))|0)|0,c=1+c|0;c<b&&51>=h&&48<=(65535&(a.charCodeAt(c)|0))&&55>=(65535&(a.charCodeAt(c)|0))&&(h=c,f=-48+(D(8,f)+(65535&(a.charCodeAt(h)|0))|0)|0,c=1+c|0)}c=-1+c|0;f&=65535}else throw og(a,f);}c=1+c|0;Te(e,f);f=c;s();h=a;k=pg(92);h=h.indexOf(k,c)|0;c=f;f=h}else{c<b&&Se(e,a,c,b);a=e.xb;break b}a=void 0}}}return a}}(a);kg(a,b);for(var e=a.wc.ma(),f=b.ma(),h=e.Y(),h=(new Pe).k(c(h));f.ea();){Re(h,
f.Y());var k=e.Y();Qe(h,c(k))}return h.xb}function wb(a){var b=new ig;b.wc=a;return b}l.Ba=function(){return ve(this)};l.Ee=function(){return we(this)};l.a=new w({Gj:0},!1,"scala.StringContext",z,{Gj:1,d:1,Zd:1,p:1,g:1,f:1});function mg(){}mg.prototype=new y;mg.prototype.a=new w({Gn:0},!1,"scala.StringContext$",z,{Gn:1,d:1,g:1,f:1});var lg=void 0;function qg(){}qg.prototype=new y;qg.prototype.c=function(){rg=this;return this};
qg.prototype.a=new w({In:0},!1,"scala.math.Equiv$",z,{In:1,d:1,Zr:1,g:1,f:1});var rg=void 0;function sg(){}sg.prototype=new y;sg.prototype.a=new w({Jn:0},!1,"scala.math.Fractional$",z,{Jn:1,d:1,g:1,f:1});var tg=void 0;function ug(){}ug.prototype=new y;ug.prototype.a=new w({Kn:0},!1,"scala.math.Integral$",z,{Kn:1,d:1,g:1,f:1});var vg=void 0;function wg(){}wg.prototype=new y;wg.prototype.a=new w({Ln:0},!1,"scala.math.Numeric$",z,{Ln:1,d:1,g:1,f:1});var xg=void 0;function yg(){}yg.prototype=new y;
yg.prototype.a=new w({Mn:0},!1,"scala.math.Ordered$",z,{Mn:1,d:1});var zg=void 0;function Ag(){}Ag.prototype=new y;Ag.prototype.c=function(){Bg=this;return this};Ag.prototype.a=new w({Nn:0},!1,"scala.math.Ordering$",z,{Nn:1,d:1,$r:1,g:1,f:1});var Bg=void 0;
function Cg(){this.Pl=this.bl=this.Tk=this.Nl=this.Ml=this.Ll=this.Yk=this.Vk=this.Uk=this.Oq=this.Nq=this.Ol=this.Tl=this.Xl=this.Nk=this.Sl=this.Mk=this.Ok=this.Lk=this.Jl=this.cl=this.$k=this.Xk=this.Ql=this.Zk=this.Wl=this.le=null;this.ab=0}Cg.prototype=new y;
Cg.prototype.c=function(){Dg=this;this.le=(new Eg).c();Fg||(Fg=(new Gg).c());this.Wl=Fg;Hg||(Hg=(new Ig).c());this.Zk=Hg;this.Ql=Zb();this.Xk=Fd();this.$k=Jg();this.cl=be();this.Jl=Kg();Lg||(Lg=(new Mg).c());this.Lk=Lg;Ng||(Ng=(new Og).c());this.Ok=Ng;Pg||(Pg=(new Qg).c());this.Mk=Pg;this.Sl=Rg();Sg||(Sg=(new Tg).c());this.Nk=Sg;this.Xl=Gd();Ug||(Ug=(new Vg).c());this.Tl=Ug;this.Ol=Wg();rg||(rg=(new qg).c());this.Uk=rg;tg||(tg=(new sg).c());this.Vk=tg;vg||(vg=(new ug).c());this.Yk=vg;xg||(xg=(new wg).c());
this.Ll=xg;zg||(zg=(new yg).c());this.Ml=zg;Bg||(Bg=(new Ag).c());this.Nl=Bg;Xg||(Xg=(new Yg).c());this.Tk=Xg;Zg||(Zg=(new $g).c());this.bl=Zg;ah||(ah=(new bh).c());this.Pl=ah;return this};Cg.prototype.a=new w({On:0},!1,"scala.package$",z,{On:1,d:1});var Dg=void 0;function Eg(){}Eg.prototype=new y;Eg.prototype.w=g("object AnyRef");Eg.prototype.a=new w({Pn:0},!1,"scala.package$$anon$1",z,{Pn:1,d:1,Xr:1});function V(){this.Hk=null;this.Qi=0}V.prototype=new y;function ch(){}ch.prototype=V.prototype;
V.prototype.wa=function(a){return this===a};V.prototype.w=d("Hk");V.prototype.k=function(a){this.Hk=a;this.Qi=La(this);return this};V.prototype.Ba=d("Qi");var dh=new w({kd:0},!1,"scala.reflect.AnyValManifest",z,{kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});V.prototype.a=dh;function eh(){this.Gd=this.Fd=this.me=this.sd=this.ke=this.ud=this.od=this.pd=this.qd=this.rd=this.Nc=this.Dc=this.td=this.ob=null}eh.prototype=new y;
eh.prototype.c=function(){fh=this;this.ob=gh().ob;this.td=gh().td;this.Dc=gh().Dc;this.Nc=gh().Nc;this.rd=gh().rd;this.qd=gh().qd;this.pd=gh().pd;this.od=gh().od;this.ud=gh().ud;this.ke=gh().ke;this.sd=gh().sd;this.me=gh().me;this.Fd=gh().Fd;this.Gd=gh().Gd;return this};eh.prototype.a=new w({Qn:0},!1,"scala.reflect.ClassManifestFactory$",z,{Qn:1,d:1});var fh=void 0;
function hh(){this.Gd=this.Fd=this.le=this.me=this.sd=this.ke=this.ud=this.od=this.pd=this.qd=this.rd=this.Nc=this.Dc=this.td=this.ob=this.ni=this.mi=this.oi=null}hh.prototype=new y;
hh.prototype.c=function(){ih=this;this.oi=r(z);this.mi=r(jh);this.ni=r(kh);this.ob=lh().Jb.ob;this.td=lh().Jb.td;this.Dc=lh().Jb.Dc;this.Nc=lh().Jb.Nc;this.rd=lh().Jb.rd;this.qd=lh().Jb.qd;this.pd=lh().Jb.pd;this.od=lh().Jb.od;this.ud=lh().Jb.ud;this.ke=lh().Jb.ke;this.sd=lh().Jb.sd;this.me=lh().Jb.me;this.le=lh().Jb.le;this.Fd=lh().Jb.Fd;this.Gd=lh().Jb.Gd;return this};
function Vc(a,b){var c;b===r(C)?c=P().ob:b===r(Va)?c=P().td:b===r(Ua)?c=P().Dc:b===r(Wa)?c=P().Nc:b===r(Xa)?c=P().rd:b===r(Ya)?c=P().qd:b===r(Za)?c=P().pd:b===r(Ta)?c=P().od:b===r(Sa)?c=P().ud:a.oi===b?c=P().sd:a.mi===b?c=P().Fd:a.ni===b?c=P().Gd:(c=new oh,c.zg=b);return c}hh.prototype.a=new w({Rn:0},!1,"scala.reflect.ClassTag$",z,{Rn:1,d:1,g:1,f:1});var ih=void 0;function P(){ih||(ih=(new hh).c());return ih}function oh(){this.zg=null}oh.prototype=new y;l=oh.prototype;
l.qb=function(a){var b=this.Wb();b===r(C)?a=p(B(C),[a]):b===r(Va)?a=p(B(Va),[a]):b===r(Ua)?a=p(B(Ua),[a]):b===r(Wa)?a=p(B(Wa),[a]):b===r(Xa)?a=p(B(Xa),[a]):b===r(Ya)?a=p(B(Ya),[a]):b===r(Za)?a=p(B(Za),[a]):b===r(Ta)?a=p(B(Ta),[a]):b===r(Sa)?a=p(B(ta),[a]):(jf||(jf=(new hf).c()),a=this.Wb().Fc.newArrayOfThisClass([a]));return a};l.wa=function(a){var b;a&&a.a&&a.a.u.Eb?(b=this.Wb(),a=a.Wb(),b=b===a):b=!1;return b};l.w=function(){return ph(this,this.zg)};l.Wb=d("zg");l.Ba=function(){return Sb(J(),this.zg)};
l.a=new w({Sn:0},!1,"scala.reflect.ClassTag$$anon$1",z,{Sn:1,d:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function qh(){this.Fd=this.Gd=this.me=this.le=this.sd=this.ke=this.Nj=this.Mj=this.Bg=this.ud=this.od=this.pd=this.qd=this.rd=this.Nc=this.Dc=this.td=this.ob=null}qh.prototype=new y;
qh.prototype.c=function(){rh=this;this.ob=(new sh).c();this.td=(new th).c();this.Dc=(new uh).c();this.Nc=(new vh).c();this.rd=(new wh).c();this.qd=(new xh).c();this.pd=(new yh).c();this.od=(new zh).c();this.ud=(new Ah).c();this.Bg=r(z);this.Mj=r(jh);this.Nj=r(kh);this.ke=(new Bh).c();this.le=this.sd=(new Ch).c();this.me=(new Dh).c();this.Gd=(new Eh).c();this.Fd=(new Fh).c();return this};qh.prototype.a=new w({Tn:0},!1,"scala.reflect.ManifestFactory$",z,{Tn:1,d:1});var rh=void 0;
function gh(){rh||(rh=(new qh).c());return rh}function Gh(){this.Iq=this.yj=this.un=null}Gh.prototype=new y;function Hh(){}Hh.prototype=Gh.prototype;Gh.prototype.Wb=d("yj");Gh.prototype.Gm=function(a,b,c){this.un=a;this.yj=b;this.Iq=c;return this};var Ih=new w({Fe:0},!1,"scala.reflect.ManifestFactory$ClassTypeManifest",z,{Fe:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});Gh.prototype.a=Ih;function Jh(){}Jh.prototype=new y;Jh.prototype.w=g("\x3c?\x3e");
Jh.prototype.a=new w({io:0},!1,"scala.reflect.NoManifest$",z,{io:1,d:1,Fb:1,g:1,f:1});var Kh=void 0;function Lh(){this.Jb=this.bi=null}Lh.prototype=new y;Lh.prototype.c=function(){Mh=this;fh||(fh=(new eh).c());this.bi=fh;this.Jb=gh();return this};Lh.prototype.a=new w({jo:0},!1,"scala.reflect.package$",z,{jo:1,d:1});var Mh=void 0;function lh(){Mh||(Mh=(new Lh).c());return Mh}function Nh(){this.Uh=this.Pj=null}Nh.prototype=new y;Nh.prototype.w=function(){return"DynamicVariable("+this.Uh.ue()+")"};
Nh.prototype.ha=function(a){this.Pj=a;a=new Oh;if(null===this)throw ff(df(),null);a.Xh=this;Ph.prototype.c.call(a);this.Uh=a;return this};Nh.prototype.a=new w({ko:0},!1,"scala.util.DynamicVariable",z,{ko:1,d:1});function Yg(){}Yg.prototype=new y;Yg.prototype.a=new w({mo:0},!1,"scala.util.Either$",z,{mo:1,d:1});var Xg=void 0;function $g(){}$g.prototype=new y;$g.prototype.w=g("Left");$g.prototype.a=new w({no:0},!1,"scala.util.Left$",z,{no:1,d:1,g:1,f:1});var Zg=void 0;function bh(){}bh.prototype=new y;
bh.prototype.w=g("Right");bh.prototype.a=new w({oo:0},!1,"scala.util.Right$",z,{oo:1,d:1,g:1,f:1});var ah=void 0;function Qh(){this.Lo=null}Qh.prototype=new y;Qh.prototype.c=function(){this.Lo=(new Rh).c();return this};Qh.prototype.a=new w({qo:0},!1,"scala.util.control.Breaks",z,{qo:1,d:1});function Sh(){this.Zh=!1}Sh.prototype=new y;Sh.prototype.c=function(){Th=this;this.Zh=!1;return this};Sh.prototype.a=new w({ro:0},!1,"scala.util.control.NoStackTrace$",z,{ro:1,d:1,g:1,f:1});var Th=void 0;
function Uh(){}Uh.prototype=new y;function Vh(){}Vh.prototype=Uh.prototype;function Wh(a,b){var c;c=D(-862048943,b);Ke();c=c<<15|c>>>-15|0;c=D(461845907,c);return a^c}function Xh(a,b,c){a=Wh(b,c);Ke();return-430675100+D(5,a<<13|a>>>-13|0)|0}function Yh(a){a=D(-2048144789,a^(a>>>16|0));a^=a>>>13|0;a=D(-1028477387,a);return a^=a>>>16|0}
function Zh(a,b,c){var e=(new $h).la(0),f=(new $h).la(0),h=(new $h).la(0),k=(new $h).la(1);b.qa($b(new K,function(a,b,c,e,f){return function(a){a=Sb(J(),a);b.da=b.da+a|0;c.da^=a;0!==a&&(f.da=D(f.da,a));e.da=1+e.da|0}}(a,e,f,h,k)));a=Xh(0,c,e.da);a=Xh(0,a,f.da);a=Wh(a,k.da);return Yh(a^h.da)}function ve(a){ai();var b=a.Wd();if(0===b)return a=a.Yd(),za(s(),a);for(var c=-889275714,e=0;e<b;)c=Xh(0,c,Sb(J(),a.Xd(e))),e=1+e|0;return Yh(c^b)}
function bi(a,b,c){var e=(new $h).la(0);c=(new $h).la(c);b.qa($b(new K,function(a,b,c){return function(a){c.da=Xh(0,c.da,Sb(J(),a));b.da=1+b.da|0}}(a,e,c)));return Yh(c.da^e.da)}var ci=new w({Ij:0},!1,"scala.util.hashing.MurmurHash3",z,{Ij:1,d:1});Uh.prototype.a=ci;function di(){}di.prototype=new y;function ei(a,b){var c=D(-1640532531,b);Ke();return D(-1640532531,c<<24|16711680&c<<8|65280&(c>>>8|0)|c>>>24|0)}di.prototype.a=new w({to:0},!1,"scala.util.hashing.package$",z,{to:1,d:1});var fi=void 0;
function gi(){fi||(fi=(new di).c());return fi}function Qg(){}Qg.prototype=new y;Qg.prototype.a=new w({uo:0},!1,"scala.collection.$colon$plus$",z,{uo:1,d:1});var Pg=void 0;function Og(){}Og.prototype=new y;Og.prototype.a=new w({vo:0},!1,"scala.collection.$plus$colon$",z,{vo:1,d:1});var Ng=void 0;function hi(){}hi.prototype=new y;function ii(){}l=ii.prototype=hi.prototype;l.Ca=function(){return this};l.Df=function(a,b){ji(this,a,b)};l.c=function(){return this};l.Mg=function(){return this};l.m=function(){return!this.ea()};
l.Lc=function(){var a=be().sa;return ki(this,a)};l.w=function(){return(this.ea()?"non-empty":"empty")+" iterator"};l.qa=function(a){li(this,a)};l.ag=function(){Gd();var a=Fd().Ec;return ki(this,a)};l.na=function(){return mi(this)};l.pc=function(){var a=ni().sa;return ki(this,a)};l.zd=function(){return oi(this,"","","")};l.Ib=function(){return id(this)};l.oe=function(a,b,c,e){return pi(this,a,b,c,e)};
l.Pc=function(a,b,c){if(!(0<=b&&(b<qi(J(),a)||0===qi(J(),a))))throw(new F).k("requirement failed: "+vb(wb((new H).fa(["start "," out of range ",""])),(new H).fa([b,qi(J(),a)])));var e=b,f=qi(J(),a)-b|0;for(b=b+(c<f?c:f)|0;e<b&&this.ea();)ri(J(),a,e,this.Y()),e=1+e|0};l.Of=g(!1);l.eh=function(a){return this.Ck(a,2147483647)};l.Ck=function(a,b){for(var c=0<a?a:0,e=c;0<e&&this.ea();)this.Y(),e=-1+e|0;e=new si;if(null===this)throw ff(df(),null);e.Na=this;e.Sf=b-c|0;return e};
var ti=new w({Gb:0},!1,"scala.collection.AbstractIterator",z,{Gb:1,d:1,Sb:1,t:1,s:1});hi.prototype.a=ti;function ui(){}ui.prototype=new y;function vi(){}l=vi.prototype=ui.prototype;l.Df=function(a,b){ji(this,a,b)};l.Lc=function(){var a=be().sa;return ce(this,a)};l.sh=function(a){return this.Ud("",a,"")};l.Ud=function(a,b,c){return oi(this,a,b,c)};l.ag=function(){Gd();var a=Fd().Ec;return ce(this,a)};l.pc=function(){var a=ni().sa;return ce(this,a)};l.zd=function(){return this.sh("")};
l.jf=function(a,b){return wi(this,a,b)};l.oe=function(a,b,c,e){return pi(this,a,b,c,e)};l.jd=function(){return this};l.Of=g(!0);l.Gk=function(a){return Kd(this,a)};l.ga=function(){return this.wb().ga()};l.Cc=function(){return xi(this)};var yi=new w({R:0},!1,"scala.collection.AbstractTraversable",z,{R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1});ui.prototype.a=yi;function zi(){this.Nb=null}zi.prototype=new y;zi.prototype.c=function(){Ai=this;this.Nb=(new Bi).c();return this};
zi.prototype.a=new w({Ao:0},!1,"scala.collection.Iterator$",z,{Ao:1,d:1});var Ai=void 0;function Jg(){Ai||(Ai=(new zi).c());return Ai}function Ci(){}Ci.prototype=new y;function Di(){}Di.prototype=Ci.prototype;var Ei=new w({Cg:0},!1,"scala.collection.generic.GenMapFactory",z,{Cg:1,d:1});Ci.prototype.a=Ei;function Fi(){this.Ja=null}Fi.prototype=new y;function Gi(){}Gi.prototype=Fi.prototype;Fi.prototype.Te=function(){return this.Ja.ga()};Fi.prototype.vd=function(a){return a.wb().ga()};
Fi.prototype.Mf=function(a){if(null===a)throw ff(df(),null);this.Ja=a;return this};var Hi=new w({Dg:0},!1,"scala.collection.generic.GenTraversableFactory$GenericCanBuildFrom",z,{Dg:1,d:1,Xf:1});Fi.prototype.a=Hi;function Ii(){}Ii.prototype=new y;function Ji(){}Ji.prototype=Ii.prototype;function Yb(a,b){if(b.m())return a.We();var c=a.ga();c.va(b);return c.$()}Ii.prototype.We=function(){return this.ga().$()};var Ki=new w({Ha:0},!1,"scala.collection.generic.GenericCompanion",z,{Ha:1,d:1});
Ii.prototype.a=Ki;function Mg(){}Mg.prototype=new y;Mg.prototype.w=g("::");Mg.prototype.a=new w({No:0},!1,"scala.collection.immutable.$colon$colon$",z,{No:1,d:1,g:1,f:1});var Lg=void 0;function Li(){}Li.prototype=new y;Li.prototype.c=function(){return this};Li.prototype.r=function(){return this};Li.prototype.w=g("\x3cfunction1\x3e");Li.prototype.a=new w({Xo:0},!1,"scala.collection.immutable.List$$anon$1",z,{Xo:1,d:1,y:1});function Mi(){this.Jh=this.zb=null}Mi.prototype=new y;l=Mi.prototype;
l.c=function(){Mi.prototype.bf.call(this,Ni());return this};l.Ua=function(a){return Oi(this,a)};l.bf=function(a){var b=Pi((new Qi).c(),a);this.zb=Ri(b);b=(new Si).c();this.Jh=W(b,a);return this};l.$=function(){for(var a=this.zb,b=Ni(),a=a.Ga;!a.m();)var c=a.ya(),b=Ti(b,c),a=a.ua();return b};l.fc=function(a,b){Ui(this,a,b)};l.ra=function(a){return Oi(this,a)};l.ta=aa();function Oi(a,b){null===Vi(a.Jh,b)&&(Wi(a.zb,b),Xi(a.Jh,b));return a}l.va=function(a){return W(this,a)};
l.a=new w({ap:0},!1,"scala.collection.immutable.ListSet$ListSetBuilder",z,{ap:1,d:1,Za:1,Ta:1,Sa:1});function Yi(){this.Fl=0}Yi.prototype=new y;Yi.prototype.c=function(){Zi=this;this.Fl=512;return this};function $i(a){var b=(new jd).k("%d %s %d by %s"),c=[0,"until",a,1];s();a=b.pa;var b=function(){return function(a){return aj(a)?a.xs():a}}(b),e=Zb();e.sa;bj();e=(new H).c();c.length|0;for(var f=0,h=c.length|0;f<h;){var k=b(c[f]);e.h.push(k);f=1+f|0}c=P().le;return cj(a,Kd(e,c))}
Yi.prototype.a=new w({ep:0},!1,"scala.collection.immutable.Range$",z,{ep:1,d:1,g:1,f:1});var Zi=void 0;function Wg(){Zi||(Zi=(new Yi).c());return Zi}function Tg(){}Tg.prototype=new y;Tg.prototype.a=new w({np:0},!1,"scala.collection.immutable.Stream$$hash$colon$colon$",z,{np:1,d:1});var Sg=void 0;function dj(){this.Ja=this.de=this.Ph=null;this.ab=!1}dj.prototype=new y;function ej(a,b,c){a.Ph=c;if(null===b)throw ff(df(),null);a.Ja=b;return a}
function fj(a){a.ab||(a.de=a.Ph.Se(),a.ab=!0);a.Ph=null;return a.de}dj.prototype.a=new w({sp:0},!1,"scala.collection.immutable.StreamIterator$LazyCell",z,{sp:1,d:1});function jd(){this.pa=null}jd.prototype=new y;l=jd.prototype;l.Ca=function(){return(new gj).k(this.pa)};l.Df=function(a,b){ji(this,a,b)};l.Ka=function(a){a=65535&(this.pa.charCodeAt(a)|0);return(new Q).xa(a)};l.Uc=function(a){return this.j()-a|0};l.Mg=function(){return hj(new X,this,0,this.pa.length|0)};
l.Ic=function(a){return ij(this,a)};l.Lc=function(){var a=be().sa;return ce(this,a)};l.m=function(){return jj(this)};l.vb=function(){return(new gj).k(this.pa)};l.wa=function(a){Vd();return a&&a.a&&a.a.u.Xj?this.pa===(null===a?null:a.pa):!1};l.Ud=function(a,b,c){return oi(this,a,b,c)};l.w=d("pa");l.qa=function(a){kj(this,a)};l.Oe=function(a,b){return Ud(Vd(),this.pa,a,b)};l.ag=function(){Gd();var a=Fd().Ec;return ce(this,a)};l.pc=function(){return lj(this)};l.na=function(){return this.pa.length|0};
l.ma=function(){return hj(new X,this,0,this.pa.length|0)};l.j=function(){return this.pa.length|0};l.zd=d("pa");l.Ib=function(){var a=hj(new X,this,0,this.pa.length|0);return id(a)};l.Kc=function(){return(new gj).k(this.pa)};l.oe=function(a,b,c,e){return pi(this,a,b,c,e)};l.jd=d("pa");l.Ba=function(){var a=this.pa;return za(s(),a)};l.Pc=function(a,b,c){mj(this,a,b,c)};l.Of=g(!0);l.k=function(a){this.pa=a;return this};l.ga=function(){this.pa;return(new $f).c()};l.Cc=function(){return xi(this)};
l.a=new w({Xj:0},!1,"scala.collection.immutable.StringOps",z,{Xj:1,d:1,Wj:1,$b:1,Hb:1,Ra:1,P:1,p:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,N:1,Qa:1,Hj:1,bb:1});function nj(){}nj.prototype=new y;function Ud(a,b,c,e){a=0>c?0:c;return e<=a||a>=(b.length|0)?"":b.substring(a,e>(b.length|0)?b.length|0:e)}nj.prototype.a=new w({tp:0},!1,"scala.collection.immutable.StringOps$",z,{tp:1,d:1});var oj=void 0;function Vd(){oj||(oj=(new nj).c());return oj}
function Hd(){this.Ff=this.De=this.wf=0;this.Gi=this.Ei=this.Ci=this.Ai=this.yi=this.Hf=null}Hd.prototype=new y;l=Hd.prototype;l.Q=d("Ci");l.c=function(){this.Hf=p(B(z),[32]);this.Ff=1;this.De=this.wf=0;return this};l.db=d("Ff");l.Ua=function(a){return Id(this,a)};l.Jd=ba("Gi");l.La=d("Hf");l.za=d("Ei");l.ka=ba("Ai");
function Id(a,b){if(a.De>=a.Hf.b.length){var c=32+a.wf|0,e=a.wf^c;if(1024>e)1===a.db()&&(a.z(p(B(z),[32])),a.o().b[0]=a.La(),a.qc(1+a.db()|0)),a.oa(p(B(z),[32])),a.o().b[31&c>>5]=a.La();else if(32768>e)2===a.db()&&(a.ka(p(B(z),[32])),a.v().b[0]=a.o(),a.qc(1+a.db()|0)),a.oa(p(B(z),[32])),a.z(p(B(z),[32])),a.o().b[31&c>>5]=a.La(),a.v().b[31&c>>10]=a.o();else if(1048576>e)3===a.db()&&(a.Da(p(B(z),[32])),a.Q().b[0]=a.v(),a.qc(1+a.db()|0)),a.oa(p(B(z),[32])),a.z(p(B(z),[32])),a.ka(p(B(z),[32])),a.o().b[31&
c>>5]=a.La(),a.v().b[31&c>>10]=a.o(),a.Q().b[31&c>>15]=a.v();else if(33554432>e)4===a.db()&&(a.Db(p(B(z),[32])),a.za().b[0]=a.Q(),a.qc(1+a.db()|0)),a.oa(p(B(z),[32])),a.z(p(B(z),[32])),a.ka(p(B(z),[32])),a.Da(p(B(z),[32])),a.o().b[31&c>>5]=a.La(),a.v().b[31&c>>10]=a.o(),a.Q().b[31&c>>15]=a.v(),a.za().b[31&c>>20]=a.Q();else if(1073741824>e)5===a.db()&&(a.Jd(p(B(z),[32])),a.Lb().b[0]=a.za(),a.qc(1+a.db()|0)),a.oa(p(B(z),[32])),a.z(p(B(z),[32])),a.ka(p(B(z),[32])),a.Da(p(B(z),[32])),a.Db(p(B(z),[32])),
a.o().b[31&c>>5]=a.La(),a.v().b[31&c>>10]=a.o(),a.Q().b[31&c>>15]=a.v(),a.za().b[31&c>>20]=a.Q(),a.Lb().b[31&c>>25]=a.za();else throw(new F).c();a.wf=c;a.De=0}a.Hf.b[a.De]=b;a.De=1+a.De|0;return a}l.$=function(){return Jd(this)};l.z=ba("yi");l.fc=function(a,b){Ui(this,a,b)};l.Db=ba("Ei");l.o=d("yi");l.Lb=d("Gi");function Jd(a){var b=a.wf+a.De|0;if(0===b)return Gd().fg;var c=(new pj).A(0,b,0);qj(c,a,a.Ff);1<a.Ff&&rj(c,0,-1+b|0);return c}l.ra=function(a){return Id(this,a)};l.ta=aa();l.qc=ba("Ff");
l.v=d("Ai");l.oa=ba("Hf");l.va=function(a){return W(this,a)};l.Da=ba("Ci");l.a=new w({xp:0},!1,"scala.collection.immutable.VectorBuilder",z,{xp:1,d:1,Za:1,Ta:1,Sa:1,$j:1});function sj(){}sj.prototype=new y;sj.prototype.ga=function(){var a=(new $f).c();return tj(new uj,a,$b(new K,function(){return function(a){return(new gj).k(a)}}(this)))};sj.prototype.a=new w({Ap:0},!1,"scala.collection.immutable.WrappedString$",z,{Ap:1,d:1});var vj=void 0;function wj(){}wj.prototype=new y;function xj(){}
xj.prototype=wj.prototype;wj.prototype.fc=function(a,b){Ui(this,a,b)};var yj=new w({Vc:0},!1,"scala.collection.mutable.ArrayBuilder",z,{Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});wj.prototype.a=yj;function zj(){}zj.prototype=new y;function Hf(a,b){var c=b.Wb();return c===r(C)?(new Xc).c():c===r(Va)?(new Aj).c():c===r(Ua)?(new Zd).c():c===r(Wa)?(new Bj).c():c===r(Xa)?(new Cj).c():c===r(Ya)?(new Dj).c():c===r(Za)?(new Ej).c():c===r(Ta)?(new Fj).c():c===r(Sa)?(new Gj).c():(new Hj).hd(b)}
zj.prototype.a=new w({Dp:0},!1,"scala.collection.mutable.ArrayBuilder$",z,{Dp:1,d:1,g:1,f:1});var Ij=void 0;function If(){Ij||(Ij=(new zj).c());return Ij}function bd(){this.pa=null}bd.prototype=new y;l=bd.prototype;l.Df=function(a,b){ji(this,a,b)};l.Ca=function(){return(new $c).xd(this.pa)};l.Ka=function(a){return this.pa.b[a]};l.Mg=function(){return hj(new X,this,0,this.pa.b.length)};l.Uc=function(a){return this.j()-a|0};l.Ic=function(a){return ij(this,a)};l.m=function(){return jj(this)};
l.Lc=function(){var a=be().sa;return ce(this,a)};l.vb=function(){return(new $c).xd(this.pa)};l.wa=function(a){Jj||(Jj=(new Kj).c());return a&&a.a&&a.a.u.mk?this.pa===(null===a?null:a.pa):!1};l.Ud=function(a,b,c){return oi(this,a,b,c)};l.w=function(){return Lj(this)};l.qa=function(a){kj(this,a)};l.Oe=function(a,b){return Mj(this,a,b)};l.ag=function(){Gd();var a=Fd().Ec;return ce(this,a)};l.na=function(){return this.pa.b.length};l.pc=function(){return lj(this)};
l.ma=function(){return hj(new X,this,0,this.pa.b.length)};l.zd=function(){return oi(this,"","","")};l.j=function(){return this.pa.b.length};l.Ib=function(){var a=hj(new X,this,0,this.pa.b.length);return id(a)};l.Kc=function(){return(new $c).xd(this.pa)};l.oe=function(a,b,c,e){return pi(this,a,b,c,e)};l.jd=d("pa");l.Pc=function(a,b,c){var e=qi(J(),this.jd());c=c<e?c:e;(qi(J(),a)-b|0)<c&&(c=qi(J(),a)-b|0,c=0<c?c:0);Y(O(),this.jd(),0,a,b,c)};l.Of=g(!0);l.Ba=function(){return this.pa.Ba()};
l.xd=function(a){this.pa=a;return this};l.ga=function(){this.pa;return(new Xc).c()};l.Cc=function(){return xi(this)};l.a=new w({mk:0},!1,"scala.collection.mutable.ArrayOps$ofByte",z,{mk:1,d:1,is:1,Jc:1,Bc:1,nc:1,Hb:1,Ra:1,P:1,p:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,N:1,Qa:1,$b:1,sb:1});function Kj(){}Kj.prototype=new y;Kj.prototype.a=new w({Ep:0},!1,"scala.collection.mutable.ArrayOps$ofByte$",z,{Ep:1,d:1});var Jj=void 0;function uj(){this.Mi=this.Xc=null}uj.prototype=new y;
function tj(a,b,c){a.Mi=c;a.Xc=b;return a}l=uj.prototype;l.wa=function(a){return null!==a&&(a===this||a===this.Xc||xa(a,this.Xc))};l.Ua=function(a){this.Xc.ra(a);return this};l.w=function(){return""+this.Xc};l.$=function(){return this.Mi.r(this.Xc.$())};l.fc=function(a,b){this.Xc.fc(a,b)};l.ra=function(a){this.Xc.ra(a);return this};l.Ba=function(){return this.Xc.Ba()};l.ta=function(a){this.Xc.ta(a)};l.va=function(a){this.Xc.va(a);return this};
l.a=new w({Fp:0},!1,"scala.collection.mutable.Builder$$anon$1",z,{Fp:1,d:1,Za:1,Ta:1,Sa:1,Wr:1});function Nj(){this.Vd=this.Ia=this.Hc=null}Nj.prototype=new y;function Oj(a){return"(kv: "+a.Hc+", "+a.Ia+")"+(null!==a.Vd?" -\x3e "+Oj(a.Vd):"")}Nj.prototype.Ze=function(a,b){this.Hc=a;this.Ia=b;return this};Nj.prototype.w=function(){return Oj(this)};Nj.prototype.a=new w({Gp:0},!1,"scala.collection.mutable.DefaultEntry",z,{Gp:1,d:1,nk:1,g:1,f:1});function Pj(){}Pj.prototype=new y;
Pj.prototype.Qf=function(a,b){if(!(500>a))throw(new te).ha("assertion failed: loadFactor too large; must be \x3c 0.5");return rd(Qj(Rj((new R).la(b),(new R).la(a))))};Pj.prototype.a=new w({Hp:0},!1,"scala.collection.mutable.FlatHashTable$",z,{Hp:1,d:1});var Sj=void 0;function Tj(){Sj||(Sj=(new Pj).c());return Sj}function Uj(){}Uj.prototype=new y;Uj.prototype.w=g("NullSentinel");Uj.prototype.Ba=g(0);Uj.prototype.a=new w({Jp:0},!1,"scala.collection.mutable.FlatHashTable$NullSentinel$",z,{Jp:1,d:1});
var Vj=void 0;function Wj(){Vj||(Vj=(new Uj).c());return Vj}function Xj(){this.zb=this.Nb=null}Xj.prototype=new y;function Yj(a,b){a.Nb=b;a.zb=b;return a}l=Xj.prototype;l.Ua=function(a){this.zb.Ua(a);return this};l.$=d("zb");l.fc=function(a,b){Ui(this,a,b)};l.ra=function(a){this.zb.Ua(a);return this};l.ta=aa();l.va=function(a){return W(this,a)};l.a=new w({Kp:0},!1,"scala.collection.mutable.GrowingBuilder",z,{Kp:1,d:1,Za:1,Ta:1,Sa:1});function Zj(){}Zj.prototype=new y;
function ak(){bk();return ck(0,16)}Zj.prototype.Qf=function(a,b){return rd(Qj(Rj((new R).la(b),(new R).la(a))))};function ck(a,b){var c=-1+b|0,c=c|c>>>1|0,c=c|c>>>2|0,c=c|c>>>4|0,c=c|c>>>8|0;return 1+(c|c>>>16|0)|0}Zj.prototype.a=new w({Op:0},!1,"scala.collection.mutable.HashTable$",z,{Op:1,d:1});var dk=void 0;function bk(){dk||(dk=(new Zj).c());return dk}function ek(){this.wc=null}ek.prototype=new y;function fk(){}l=fk.prototype=ek.prototype;l.c=function(){this.wc=(new Qi).c();return this};
l.Ua=function(a){return gk(this,a)};function gk(a,b){var c=a.wc;be();var e=(new H).fa([b]),f=be().sa;Wi(c,ce(e,f));return a}l.fc=function(a,b){Ui(this,a,b)};l.ra=function(a){return gk(this,a)};l.ta=aa();l.va=function(a){Wi(this.wc,a);return this};var hk=new w({ok:0},!1,"scala.collection.mutable.LazyBuilder",z,{ok:1,d:1,Za:1,Ta:1,Sa:1});ek.prototype.a=hk;function Pd(){this.zb=this.Nb=null}Pd.prototype=new y;l=Pd.prototype;l.Ua=function(a){return Qd(this,a)};l.$=d("zb");
l.fc=function(a,b){Ui(this,a,b)};function Qd(a,b){a.zb=a.zb.$c(b);return a}function Od(a,b){a.Nb=b;a.zb=b;return a}l.ra=function(a){return Qd(this,a)};l.ta=aa();l.va=function(a){return W(this,a)};l.a=new w({Xp:0},!1,"scala.collection.mutable.SetBuilder",z,{Xp:1,d:1,Za:1,Ta:1,Sa:1});function Vg(){}Vg.prototype=new y;Vg.prototype.a=new w({$p:0},!1,"scala.collection.mutable.StringBuilder$",z,{$p:1,d:1,g:1,f:1});var Ug=void 0;function Sf(){this.ci=null}Sf.prototype=new y;
Sf.prototype.c=function(){Rf=this;this.ci=Tf(new Uf,p(B(z),[0]));return this};Sf.prototype.a=new w({aq:0},!1,"scala.collection.mutable.WrappedArray$",z,{aq:1,d:1});var Rf=void 0;function ik(){this.zb=this.sn=this.Th=null;this.Cd=this.wd=0}ik.prototype=new y;l=ik.prototype;l.hd=function(a){this.sn=this.Th=a;this.Cd=this.wd=0;return this};l.Ua=function(a){return jk(this,a)};
function jk(a,b){var c=1+a.Cd|0;if(a.wd<c){for(var e=0===a.wd?16:D(2,a.wd);e<c;)e=D(2,e);c=e;a.zb=kk(a,c);a.wd=c}a.zb.ld(a.Cd,b);a.Cd=1+a.Cd|0;return a}
function kk(a,b){var c=lk(J(),a.Th);if(c===r(C))c=(new $c).xd(p(B(C),[b]));else if(c===r(Va)){var c=new mk,e=p(B(Va),[b]);c.h=e}else c===r(Ua)?c=Xd(new Yd,p(B(Ua),[b])):c===r(Wa)?(c=new nk,e=p(B(Wa),[b]),c.h=e):c===r(Xa)?(c=new ok,e=p(B(Xa),[b]),c.h=e):c===r(Ya)?(c=new pk,e=p(B(Ya),[b]),c.h=e):c===r(Za)?(c=new qk,e=p(B(Za),[b]),c.h=e):c===r(Ta)?(c=new rk,e=p(B(Ta),[b]),c.h=e):c===r(Sa)?(c=new sk,e=p(B(ta),[b]),c.h=e):c=Tf(new Uf,a.Th.qb(b));0<a.Cd&&Y(O(),a.zb.h,0,c.h,0,a.Cd);return c}
l.$=function(){return 0!==this.wd&&this.wd===this.Cd?this.zb:kk(this,this.Cd)};l.fc=function(a,b){Ui(this,a,b)};l.ra=function(a){return jk(this,a)};l.ta=function(a){this.wd<a&&(this.zb=kk(this,a),this.wd=a)};l.va=function(a){return W(this,a)};l.a=new w({bq:0},!1,"scala.collection.mutable.WrappedArrayBuilder",z,{bq:1,d:1,Za:1,Ta:1,Sa:1});function Xb(){}Xb.prototype=new y;Xb.prototype.a=new w({fq:0},!1,"scala.scalajs.js.Dictionary$",z,{fq:1,d:1});var Wb=void 0;
function tk(){this.pe=!1;this.Pi=this.sm=this.sg=this.uf=null;this.Xg=!1;this.oj=this.Ti=0}tk.prototype=new y;
tk.prototype.c=function(){uk=this;this.uf=(this.pe=!!(n.ArrayBuffer&&n.Int32Array&&n.Float32Array&&n.Float64Array))?new n.ArrayBuffer(8):null;this.sg=this.pe?new n.Int32Array(this.uf,0,2):null;this.sm=this.pe?new n.Float32Array(this.uf,0,2):null;this.Pi=this.pe?new n.Float64Array(this.uf,0,1):null;if(this.pe)this.sg[0]=16909060,a=1===((new n.Int8Array(this.uf,0,8))[0]|0);else var a=!0;this.Ti=(this.Xg=a)?0:1;this.oj=this.Xg?1:0;return this};
function Aa(a,b){var c=b|0;if(c===b&&-Infinity!==1/b)return c;if(a.pe)a.Pi[0]=b,c=vk(vd((new R).la(a.sg[a.Ti]|0),32),wk((new R).A(4194303,1023,0),(new R).la(a.sg[a.oj]|0)));else{if(b!==b)var c=!1,e=2047,f=+n.Math.pow(2,51);else if(Infinity===b||-Infinity===b)c=0>b,e=2047,f=0;else if(0===b)c=-Infinity===1/b,f=e=0;else{var h=(c=0>b)?-b:b;if(h>=+n.Math.pow(2,-1022)){var e=+n.Math.pow(2,52),f=+n.Math.log(h)/0.6931471805599453,f=+n.Math.floor(f)|0,f=1023>f?f:1023,k=h/+n.Math.pow(2,f)*e,h=+n.Math.floor(k),
k=k-h,h=0.5>k?h:0.5<k?1+h:0!==h%2?1+h:h;2<=h/e&&(f=1+f|0,h=1);1023<f?(f=2047,h=0):(f=1023+f|0,h-=e);e=f;f=h}else e=h/+n.Math.pow(2,-1074),f=+n.Math.floor(e),h=e-f,e=0,f=0.5>h?f:0.5<h?1+f:0!==f%2?1+f:f}f=+ +f;h=f|0;c=vk(vd((new R).la((c?-2147483648:0)|(e|0)<<20|f/4294967296|0),32),wk((new R).A(4194303,1023,0),(new R).la(h)))}return rd(xk(c,wd(c,32)))}tk.prototype.a=new w({tq:0},!1,"scala.scalajs.runtime.Bits$",z,{tq:1,d:1});var uk=void 0;function Ba(){uk||(uk=(new tk).c());return uk}
function yk(){this.Br=this.Ar=this.zr=this.yr=this.xr=this.wr=this.vr=this.rr=this.qr=this.Yq=this.Xq=this.Mq=this.Lq=this.Kq=0;this.si=this.Vg=this.ne=this.Il=this.Wg=this.hc=null}yk.prototype=new y;yk.prototype.c=function(){zk=this;this.hc=(new R).A(0,0,0);this.Wg=(new R).A(1,0,0);this.Il=(new R).A(4194303,4194303,1048575);this.ne=(new R).A(0,0,524288);this.Vg=(new R).A(4194303,4194303,524287);this.si=(new R).A(1755648,238,0);return this};
function Ak(a,b){if(b!==b)return a.hc;if(-9223372036854775E3>b)return a.ne;if(9223372036854775E3<=b)return a.Vg;if(0>b)return Bk(Ak(a,-b));var c=b,e=17592186044416<=c?c/17592186044416|0:0,c=c-17592186044416*e,f=4194304<=c?c/4194304|0:0;return(new R).A(c-4194304*f|0,f,e)}yk.prototype.a=new w({uq:0},!1,"scala.scalajs.runtime.RuntimeLong$",z,{uq:1,d:1,g:1,f:1});var zk=void 0;function v(){zk||(zk=(new yk).c());return zk}function Ck(){}Ck.prototype=new y;
function Wd(a,b){for(var c=b.length|0,e=p(B(Ua),[c]),f=0;f<c;)e.b[f]=65535&(b.charCodeAt(f)|0),f=1+f|0;return e}function Dk(a,b){return null===b?"null":ja(b)}function ng(a,b,c){a=pg(c);return b.indexOf(a)|0}function pg(a){if(0===(-65536&a)){var b=n.String,c=b.fromCharCode;a=[a];a=[].concat(a);return c.apply(b,a)}if(0>a||1114111<a)throw(new F).c();a=-65536+a|0;b=n.String;c=b.fromCharCode;a=[55296|a>>10,56320|1023&a];a=[].concat(a);return c.apply(b,a)}
function za(a,b){for(var c=0,e=1,f=-1+(b.length|0)|0;0<=f;)c=c+D(65535&(b.charCodeAt(f)|0),e)|0,e=D(31,e),f=-1+f|0;return c}
function cj(a,b){var c=(new of).c(),e;if(c.Ue)sf(),e=void 0;else{for(var f=a,h=e=0;;){var k=f;if(null===k)throw(new ua).c();if(""!==k){k=f;var m=Ef(Df().gj,k);if(m.m())if(Ef(Df().dj,k).m())if(Ef(Df().ej,k).m()){m=Ef(Df().fj,k);if(m.m())throw(new M).ha(k);var t=m.ue(),k=t[0];if(void 0===k)throw(new Ek).k("undefined.get");f=f.substring(k.length|0);k=t[2];if(void 0===k)throw(new Ek).k("undefined.get");m=t[1];m=void 0===m?"":m;if(null===m){var q;throw(new ua).c();}q=m;m=""!==q?Fe(Ke(),m):qf("\x3c",k)?
h:e=1+e|0;h=m;if(0>=m||m>b.b.length){c=t[5];if(void 0===c)throw(new Ek).k("undefined.get");throw(new Fk).k(c);}q=b.b[-1+m|0];m=t[3];m=void 0===m?"":m;if(null===m){var u;throw(new ua).c();}u=m;var m=(u=""!==u)?Fe(Ke(),m):0,A=t[4],x=void 0===A?"":A;if(null===x)throw(new ua).c();A=x;x=(A=""!==A)?Fe(Ke(),x):0;t=t[5];if(void 0===t)throw(new Ek).k("undefined.get");t=65535&(t.charCodeAt(0)|0);switch(t){case 98:case 66:q=null===q?"false":"boolean"===typeof q?Dk(s(),q):"true";pf(c,q,"",!1,k,m,t);break;case 104:case 72:q=
null===q?"null":(+(ya(q)>>>0)).toString(16);pf(c,q,"",!1,k,m,t);break;case 115:case 83:if(null!==q||qf("#",k))if(q&&q.a&&q.a.u.Or)k=(qf("-",k)?1:0)|(qf("#",k)?4:0),Be(),t=ze(t)===t,q.Lr(c,k|(t?2:0),u?m:-1,A?x:-1),ke();else{if(null===q||qf("#",k))throw Gk();pf(c,ja(q),"",!1,k,m,t)}else pf(c,"null","",!1,k,m,t);break;case 99:case 67:if(Na(q))q|=0;else if(xe(q))q=ae(S(),q);else throw(new M).ha(q);q=(new Q).xa(65535&q).Ia;pf(c,n.String.fromCharCode(q),"",!1,k,m,t);break;case 100:q=vf(q);wf(c,""+q,!1,
k,m,t);break;case 111:if(Na(q))q=(+((q|0)>>>0)).toString(8);else if(va(q))u=Oa(q),q=2097151&u.E,A=(1048575&u.x)<<1|u.E>>21,u=u.q<<2|u.x>>20,0!==u?(u=(+(u>>>0)).toString(8),A=(+(A>>>0)).toString(8),x="0000000".substring(A.length|0),q=(+(q>>>0)).toString(8),q=u+(""+x+A)+(""+"0000000".substring(q.length|0)+q)):0!==A?(u=(+(A>>>0)).toString(8),q=(+(q>>>0)).toString(8),q=u+(""+"0000000".substring(q.length|0)+q)):q=(+(q>>>0)).toString(8);else throw(new M).ha(q);tf(c,q,qf("#",k)?"0":"",k,m,t);break;case 120:case 88:if(Na(q))q=
(+((q|0)>>>0)).toString(16);else if(va(q))u=Oa(q),A=u.x>>2,q=u.E|(3&u.x)<<22,0!==u.q?(u=(+(u.q>>>0)).toString(16),A=(+(A>>>0)).toString(16),x="000000".substring(1+(A.length|0)|0),q=(+(q>>>0)).toString(16),q=u+(""+x+A)+(""+"000000".substring(q.length|0)+q)):0!==A?(u=(+(A>>>0)).toString(16),q=(+(q>>>0)).toString(16),q=u+(""+"000000".substring(q.length|0)+q)):q=(+(q>>>0)).toString(16);else throw(new M).ha(q);tf(c,q,qf("#",k)?"0x":"",k,m,t);break;case 101:case 69:uf(c,A?x:6,k,q,m,t);break;case 103:case 71:u=
vf(q);var G=0>u?-u:u;u=A?0===x?1:x:6;1E-4<=G&&G<+n.Math.pow(10,u)?(A=+n.Math.log(G)/2.302585092994046,A=+n.Math.ceil(A)|0,q=vf(q),u=u-A|0,q=q.toFixed(0<u?u:0),wf(c,q,!1,k,m,t)):uf(c,-1+u|0,k,q,m,t);break;case 102:u=vf(q).toFixed(A?x:6);A=vf(q);A!==A?q=!0:(q=vf(q),q=Infinity===q||-Infinity===q);wf(c,u,q,k,m,t);break;default:throw(new M).ha((new Q).xa(t));}}else f=f.substring(2),c.Id.jg(10);else f=f.substring(2),c.Id.jg(37);else{k=m.ue();m=k[0];if(void 0===m)throw(new Ek).k("undefined.get");f=f.substring(m.length|
0);m=c.Id;k=k[0];if(void 0===k)throw(new Ek).k("undefined.get");m.kg(k)}}else break}e=c}e=(e.Ue?sf():e.Id).w();c.lg();return e}Ck.prototype.a=new w({vq:0},!1,"scala.scalajs.runtime.RuntimeString$",z,{vq:1,d:1});var Hk=void 0;function s(){Hk||(Hk=(new Ck).c());return Hk}function Ik(){this.Nr=!1;this.cm=this.wi=this.em=null;this.ab=!1}Ik.prototype=new y;
Ik.prototype.c=function(){Jk=this;for(var a={O:"java_lang_Object",T:"java_lang_String",V:"scala_Unit",Z:"scala_Boolean",C:"scala_Char",B:"scala_Byte",S:"scala_Short",I:"scala_Int",J:"scala_Long",F:"scala_Float",D:"scala_Double"},b=0;22>=b;)2<=b&&(a["T"+b]="scala_Tuple"+b),a["F"+b]="scala_Function"+b,b=1+b|0;this.em=a;this.wi={sjsr_:"scala_scalajs_runtime_",sjs_:"scala_scalajs_",sci_:"scala_collection_immutable_",scm_:"scala_collection_mutable_",scg_:"scala_collection_generic_",sc_:"scala_collection_",
sr_:"scala_runtime_",s_:"scala_",jl_:"java_lang_",ju_:"java_util_"};this.cm=n.Object.keys(this.wi);return this};Ik.prototype.a=new w({wq:0},!1,"scala.scalajs.runtime.StackTrace$",z,{wq:1,d:1});var Jk=void 0;function bf(){Jk||(Jk=(new Ik).c());return Jk}function Kk(){}Kk.prototype=new y;function ff(a,b){return ef(b)?b.Kd:b}function cf(a,b){return b&&b.a&&b.a.u.Aa?b:(new Lk).ha(b)}Kk.prototype.a=new w({xq:0},!1,"scala.scalajs.runtime.package$",z,{xq:1,d:1});var Mk=void 0;
function df(){Mk||(Mk=(new Kk).c());return Mk}function Nk(){}Nk.prototype=new y;function Ok(){}Ok.prototype=Nk.prototype;Nk.prototype.c=function(){return this};Nk.prototype.w=g("\x3cfunction0\x3e");var Pk=new w({Nh:0},!1,"scala.runtime.AbstractFunction0",z,{Nh:1,d:1,di:1});Nk.prototype.a=Pk;function Qk(){}Qk.prototype=new y;function Rk(){}Rk.prototype=Qk.prototype;Qk.prototype.w=g("\x3cfunction1\x3e");var Sk=new w({Oh:0},!1,"scala.runtime.AbstractFunction1",z,{Oh:1,d:1,y:1});Qk.prototype.a=Sk;
function Tk(){this.da=!1}Tk.prototype=new y;Tk.prototype.w=function(){return""+this.da};function Uk(a){var b=new Tk;b.da=a;return b}Tk.prototype.a=new w({yq:0},!1,"scala.runtime.BooleanRef",z,{yq:1,d:1,f:1});function Vk(a){return!!(a&&a.a&&1===a.a.vf&&a.a.tf.u.Dk)}var ta=new w({Dk:0},!1,"scala.runtime.BoxedUnit",z,{Dk:1,d:1},function(a){return void 0===a});function Wk(){}Wk.prototype=new y;
function T(a,b,c){return b===c?!0:Ne(b)?Ne(c)?Xk(b,c):xe(c)?"number"===typeof b?+b===c.Ia:va(b)?Ga(Oa(b),(new R).la(c.Ia)):null===b?null===c:xa(b,c):null===b?null===c:xa(b,c):xe(b)?xe(c)?b.Ia===c.Ia:Ne(c)?"number"===typeof c?+c===b.Ia:va(c)?Ga(Oa(c),(new R).la(b.Ia)):null===c?null===b:xa(c,b):null===b&&null===c:null===b?null===c:xa(b,c)}
function Xk(a,b){if("number"===typeof a){var c=+a;if("number"===typeof b)return c===+b;if(va(b)){var e=Oa(b);return c===yf(e)}return aj(b)?b.wa(c):!1}return va(a)?(c=Oa(a),va(b)?(e=Oa(b),Ga(c,e)):"number"===typeof b?(e=+b,yf(c)===e):aj(b)?b.wa(c):!1):null===a?null===b:xa(a,b)}function ae(a,b){return null===b?0:b.Ia}Wk.prototype.a=new w({zq:0},!1,"scala.runtime.BoxesRunTime$",z,{zq:1,d:1});var Yk=void 0;function S(){Yk||(Yk=(new Wk).c());return Yk}function $h(){this.da=0}$h.prototype=new y;
$h.prototype.w=function(){return""+this.da};$h.prototype.la=function(a){this.da=a;return this};$h.prototype.a=new w({Aq:0},!1,"scala.runtime.IntRef",z,{Aq:1,d:1,f:1});var kh=new w({Cq:0},!1,"scala.runtime.Null$",z,{Cq:1,d:1});function Zk(){this.da=null}Zk.prototype=new y;Zk.prototype.w=function(){return Dk(s(),this.da)};Zk.prototype.ha=function(a){this.da=a;return this};Zk.prototype.a=new w({Dq:0},!1,"scala.runtime.ObjectRef",z,{Dq:1,d:1,f:1});function $k(){}$k.prototype=new y;
function qi(a,b){if(kb(b,1)||db(b,1)||hb(b,1)||fb(b,1)||gb(b,1)||ab(b,1)||bb(b,1)||cb(b,1)||$a(b,1)||Vk(b))return b.b.length;if(null===b)throw(new ua).c();throw(new M).ha(b);}function Sb(a,b){var c;if(null===b)c=0;else if(Ne(b))if(S(),Na(b))c=b|0;else if(va(b))c=rd(Oa(b)),c=Ga((new R).la(c),Oa(b))?c:rd(xk(Oa(b),wd(Oa(b),32)));else if("number"===typeof b){var e=+b|0;c=+b;e===c?c=e:(e=Ak(v(),+b),c=yf(e)===c?rd(xk(e,wd(e,32))):Aa(Ba(),+b))}else c=ya(b);else c=ya(b);return c}
function ri(a,b,c,e){if(kb(b,1))b.b[c]=e;else if(db(b,1))b.b[c]=e|0;else if(hb(b,1))b.b[c]=+e;else if(fb(b,1))b.b[c]=Oa(e);else if(gb(b,1))b.b[c]=pa(e);else if(ab(b,1))b.b[c]=ae(S(),e);else if(bb(b,1))b.b[c]=e|0;else if(cb(b,1))b.b[c]=e|0;else if($a(b,1))b.b[c]=!!e;else if(Vk(b))b.b[c]=e;else{if(null===b)throw(new ua).c();throw(new M).ha(b);}}
function lk(a,b){if(b&&b.a&&b.a.u.ij)return b.Fc.getComponentType();if(b&&b.a&&b.a.u.Eb)return b.Wb();throw(new re).k(vb(wb((new H).fa(["unsupported schematic "," (",")"])),(new H).fa([b,ka(b)])));}function jg(a){J();var b=a.Ee();return oi(b,a.Yd()+"(",",",")")}$k.prototype.a=new w({Eq:0},!1,"scala.runtime.ScalaRunTime$",z,{Eq:1,d:1});var al=void 0;function J(){al||(al=(new $k).c());return al}function cl(){this.tj=null}cl.prototype=new rb;function dl(){}dl.prototype=cl.prototype;
cl.prototype.nh=function(a){this.tj=a;return this};var el=new w({Rg:0},!1,"java.io.FilterOutputStream",sb,{Rg:1,pf:1,d:1,Re:1,of:1});cl.prototype.a=el;function Eb(){tb.call(this);this.Mc=null;this.he=0;this.Qk=null}Eb.prototype=new ub;function fl(){}fl.prototype=Eb.prototype;
Eb.prototype.wa=function(a){if(a&&a.a&&a.a.u.Sg){a:if(this===a)a=0;else{for(var b=this.n,c=this.ia-this.n|0,e=a.n,f=a.ia-a.n|0,h=c<f?c:f,k=0;k!==h;){var m=tc(this),t=tc(a),m=Ca(m,t);if(0!==m){E(this,b);E(a,e);a=m;break a}k=1+k|0}E(this,b);E(a,e);a=c===f?0:c<f?-1:1}a=0===a}else a=!1;return a};Eb.prototype.ym=function(a,b,c){this.Mc=b;this.he=c;tb.prototype.la.call(this,a);Jb||(Jb=(new Ib).c());this.Qk=Jb.ai;return this};
Eb.prototype.Ba=function(){for(var a=this.n,b=this.ia,c=-547316498,e=a;e!==b;)c=Xh(ai(),c,tc(this)),e=1+e|0;E(this,a);ai();return Yh(c^(b-a|0))};var gl=new w({Sg:0},!1,"java.nio.ByteBuffer",yb,{Sg:1,qf:1,d:1,bb:1});Eb.prototype.a=gl;function hl(){tb.call(this);this.Mc=null;this.he=0}hl.prototype=new ub;function il(){}l=il.prototype=hl.prototype;
l.wa=function(a){if(a&&a.a&&a.a.u.Tg){a:if(this===a)a=0;else{for(var b=this.n,c=this.ia-this.n|0,e=a.n,f=a.ia-a.n|0,h=c<f?c:f,k=0;k!==h;){var m=jl(this),m=(new Q).xa(m),t=jl(a),t=(new Q).xa(t),m=m.Ia-t.Ia|0;if(0!==m){E(this,b);E(a,e);a=m;break a}k=1+k|0}E(this,b);E(a,e);a=c===f?0:c<f?-1:1}a=0===a}else a=!1;return a};l.kg=function(a){if(Lb(Ob(),ja(a),ja(a).length|0,ja(a).length|0)===this)throw(new F).c();throw(new qc).c();};l.la=function(a){hl.prototype.zm.call(this,a,null,-1);return this};
l.j=function(){return this.ia-this.n|0};l.zm=function(a,b,c){this.Mc=b;this.he=c;tb.prototype.la.call(this,a);return this};l.jg=function(){throw(new qc).c();};l.Ba=function(){for(var a=this.n,b=this.ia,c=-182887236,e=a;e!==b;)c=Xh(ai(),c,jl(this)),e=1+e|0;E(this,a);ai();return Yh(c^(b-a|0))};l.ah=function(a){a=this.n+a|0;if(0>a||a>=this.ia)throw(new I).c();return Ia(this.lf,this.mf+a|0)};var kl=new w({Tg:0},!1,"java.nio.CharBuffer",yb,{Tg:1,qf:1,d:1,bb:1,ug:1,tg:1,bn:1});hl.prototype.a=kl;
function Lc(){return n.jQuery}function Mc(){}Mc.prototype=new Ok;function ll(){Oc();Lc().material.init();Oc();var a=Lc()("a#support"),b=Nc();a.attr("href",b);Oc();return Lc()("#generateForm").submit(function(a){return function(b){return a.r(b)}}(new ml))}Mc.prototype.Se=function(){return ll()};Mc.prototype.a=new w({vl:0},!1,"parolamea.ParolaMea$$anonfun$main$1",Pk,{vl:1,Nh:1,d:1,di:1,g:1,f:1});function ml(){}ml.prototype=new Rk;ml.prototype.r=function(a){return nl(a)};
function nl(a){function b(a){return vb(wb((new H).fa(["\x3cspan\x3e","\x3c/span\x3e"])),(new H).fa([a]))}a.preventDefault();Md||(Md=(new Ld).c());a=Md;Oc();var c=Lc()("#inputMasterKey").val();Oc();a=Rd(a,c);c=be().sa;if(c===be().sa)if(a===Kg())a=Kg();else{var c=a.ya(),e=c=ol(new pl,b(c),Kg());for(a=a.ua();a!==Kg();){var f=a.ya(),f=ol(new pl,b(f),Kg()),e=e.ce=f;a=a.ua()}a=c}else{for(c=ql(a,c);!a.m();)e=a.ya(),c.ra(b(e)),a=a.ua();a=c.$()}a=a.zd();Oc();Lc()("#generate-dialog .modal-body").html(a);Oc();
return Lc()("#generate-dialog").modal("toggle")}ml.prototype.a=new w({wl:0},!1,"parolamea.ParolaMea$$anonfun$main$1$$anonfun$apply$1",Sk,{wl:1,Oh:1,d:1,y:1,g:1,f:1});function Sd(){md.call(this);this.Ce=this.Be=this.Ae=this.ze=this.ye=this.xe=this.we=this.ve=0}Sd.prototype=new nd;Sd.prototype.c=function(){md.prototype.Cm.call(this,"sha-256",32,ud().vh);return this};
function td(a,b,c){for(var e=ud(),f=a.ve,h=a.we,k=a.xe,m=a.ye,t=a.ze,q=a.Ae,u=a.Be,A=a.Ce,x=f,G=h,Ma=k,eb=m,mb=t,mh=q,nh=u,bl=A,ha=0,Pb=0,mc=0,ha=0;16>ha;)e.ee.b[ha]=b.b[c]<<24|(255&b.b[1+c|0])<<16|(255&b.b[2+c|0])<<8|255&b.b[3+c|0],c=4+c|0,ha=1+ha|0;for(ha=16;64>ha;)Pb=e.ee.b[-2+ha|0],mc=e.ee.b[-15+ha|0],e.ee.b[ha]=((((Pb>>>17|0|Pb<<15)^(Pb>>>19|0|Pb<<13)^(Pb>>>10|0))+e.ee.b[-7+ha|0]|0)+((mc>>>7|0|mc<<25)^(mc>>>18|0|mc<<14)^(mc>>>3|0))|0)+e.ee.b[-16+ha|0]|0,ha=1+ha|0;for(ha=0;64>ha;)Pb=(((bl+((mb>>>
6|0|mb<<26)^(mb>>>11|0|mb<<21)^(mb>>>25|0|mb<<7))|0)+(mb&mh^~mb&nh)|0)+e.nj.b[ha]|0)+e.ee.b[ha]|0,mc=((x>>>2|0|x<<30)^(x>>>13|0|x<<19)^(x>>>22|0|x<<10))+(x&G^x&Ma^G&Ma)|0,bl=nh,nh=mh,mh=mb,mb=eb+Pb|0,eb=Ma,Ma=G,G=x,x=Pb+mc|0,ha=1+ha|0;b=Pc(O(),(new H).fa([f+x|0,h+G|0,k+Ma|0,m+eb|0,t+mb|0,q+mh|0,u+nh|0,A+bl|0]),P().Nc);a.ve=b.b[0];a.we=b.b[1];a.xe=b.b[2];a.ye=b.b[3];a.ze=b.b[4];a.Ae=b.b[5];a.Be=b.b[6];a.Ce=b.b[7]}
function od(a){a.ve=1779033703;a.we=-1150833019;a.xe=1013904242;a.ye=-1521486534;a.ze=1359893119;a.Ae=-1694144372;a.Be=528734635;a.Ce=1541459225}Sd.prototype.a=new w({Bl:0},!1,"parolamea.generator.SHA256",zd,{Bl:1,ii:1,d:1,ji:1,hb:1,gb:1});var ma=new w({Pm:0},!1,"java.lang.Byte",Oe,{Pm:1,yd:1,d:1,bb:1},function(a){return a<<24>>24===a&&1/a!==1/-0}),ra=new w({Sm:0},!1,"java.lang.Double",Oe,{Sm:1,yd:1,d:1,bb:1},function(a){return"number"===typeof a});function rl(){U.call(this)}rl.prototype=new af;
function sl(){}sl.prototype=rl.prototype;rl.prototype.Fm=function(a){rl.prototype.Rc.call(this,null,a);return this};rl.prototype.k=function(a){rl.prototype.Rc.call(this,a,null);return this};var tl=new w({qh:0},!1,"java.lang.Error",gf,{qh:1,Aa:1,d:1,f:1});rl.prototype.a=tl;function ul(){U.call(this)}ul.prototype=new af;function vl(){}vl.prototype=ul.prototype;var wl=new w({Pa:0},!1,"java.lang.Exception",gf,{Pa:1,Aa:1,d:1,f:1});ul.prototype.a=wl;
var qa=new w({Um:0},!1,"java.lang.Float",Oe,{Um:1,yd:1,d:1,bb:1},function(a){return a!==a||pa(a)===a});function Ph(){Ye.call(this)}Ph.prototype=new Ze;function xl(){}xl.prototype=Ph.prototype;var yl=new w({lj:0},!1,"java.lang.InheritableThreadLocal",$e,{lj:1,rh:1,d:1});Ph.prototype.a=yl;var oa=new w({Vm:0},!1,"java.lang.Integer",Oe,{Vm:1,yd:1,d:1,bb:1},function(a){return Na(a)});function zl(){}zl.prototype=new rb;
zl.prototype.a=new w({Ym:0},!1,"java.lang.JSConsoleBasedPrintStream$DummyOutputStream",sb,{Ym:1,pf:1,d:1,Re:1,of:1});var wa=new w({Zm:0},!1,"java.lang.Long",Oe,{Zm:1,yd:1,d:1,bb:1},function(a){return va(a)}),na=new w({cn:0},!1,"java.lang.Short",Oe,{cn:1,yd:1,d:1,bb:1},function(a){return a<<16>>16===a&&1/a!==1/-0});function Al(){this.nm=this.om=this.mm=this.lm=this.km=this.jm=this.im=this.hm=this.gm=null}Al.prototype=new Nf;
Al.prototype.c=function(){Bl=this;this.gm=p(B(Ta),[0]);this.hm=p(B(C),[0]);this.im=p(B(Ua),[0]);this.jm=p(B(Za),[0]);this.km=p(B(Ya),[0]);this.lm=p(B(Wa),[0]);this.mm=p(B(Xa),[0]);this.om=p(B(Va),[0]);this.nm=p(B(z),[0]);return this};function Pc(a,b,c){a=c.qb(b.j());c=c=0;for(b=b.ma();b.ea();){var e=b.Y();ri(J(),a,c,e);c=1+c|0}return a}function ge(a,b,c){a=p(B(Wa),[1+c.j()|0]);a.b[0]=b;b=0;b=1;for(c=c.ma();c.ea();){var e=c.Y()|0;a.b[b]=e;b=1+b|0}return a}
function Y(a,b,c,e,f,h){a=ka(b);var k;if(k=!!a.Fc.isArrayClass)k=ka(e),k.Fc.isPrimitive||a.Fc.isPrimitive?a=k===a||(k===r(Va)?a===r(C):k===r(Wa)?a===r(C)||a===r(Va):k===r(Ya)?a===r(C)||a===r(Va)||a===r(Wa):k===r(Za)&&(a===r(C)||a===r(Va)||a===r(Wa)||a===r(Ya))):(a=a.Fc.getFakeInstance(),a=!!k.Fc.isInstance(a)),k=a;if(k)Ka(b,c,e,f,h);else for(a=c,c=c+h|0;a<c;){J();h=e;k=f;var m;J();m=b;var t=a;if(kb(m,1)||db(m,1)||hb(m,1)||fb(m,1)||gb(m,1))m=m.b[t];else if(ab(m,1))m=(new Q).xa(m.b[t]);else if(bb(m,
1)||cb(m,1)||$a(m,1)||Vk(m))m=m.b[t];else{if(null===m)throw(new ua).c();throw(new M).ha(m);}ri(0,h,k,m);a=1+a|0;f=1+f|0}}function uc(){O();var a=(new H).fa([]),b=p(B(C),[1+a.j()|0]);b.b[0]=63;for(var c=0,c=1,a=a.ma();a.ea();){var e=a.Y()|0;b.b[c]=e;c=1+c|0}return b}Al.prototype.a=new w({vn:0},!1,"scala.Array$",Of,{vn:1,Bj:1,d:1,g:1,f:1});var Bl=void 0;function O(){Bl||(Bl=(new Al).c());return Bl}function Cl(){this.vm=this.pm=this.uj=null}Cl.prototype=new Kf;
Cl.prototype.c=function(){Dl=this;this.uj=(new Nh).ha(Xe().sj);this.pm=(new Nh).ha(Xe().Ki);this.vm=(new Nh).ha(null);return this};Cl.prototype.a=new w({xn:0},!1,"scala.Console$",Lf,{xn:1,Aj:1,d:1,Yr:1});var Dl=void 0;function El(){}El.prototype=new Xf;l=El.prototype;l.Yd=g("None");l.Wd=g(0);l.m=g(!0);l.ue=function(){throw(new Ek).k("None.get");};l.Xd=function(a){throw(new I).k(""+a);};l.w=g("None");l.Ba=g(2433880);l.Ee=function(){return we(this)};
l.a=new w({zn:0},!1,"scala.None$",Yf,{zn:1,xh:1,d:1,Zd:1,p:1,g:1,f:1});var Fl=void 0;function ke(){Fl||(Fl=(new El).c());return Fl}function Gl(){this.Jo=this.dq=this.Ul=this.Kl=this.Gl=this.Rk=this.Rl=this.Hl=null}Gl.prototype=new Qf;Gl.prototype.c=function(){Hl=this;Dg||(Dg=(new Cg).c());be();Il||(Il=(new Jl).c());this.Hl=Il;this.Rl=Kl();this.Rk=lh().bi;this.Gl=lh().Jb;Kh||(Kh=(new Jh).c());this.Kl=Kh;this.Ul=(new Zf).c();this.dq=(new Ll).c();this.Jo=(new Ml).c();return this};
function se(a,b){if(!b)throw(new te).ha("assertion failed");}Gl.prototype.a=new w({Bn:0},!1,"scala.Predef$",Vf,{Bn:1,Cj:1,d:1,Ur:1});var Hl=void 0;function fd(){Hl||(Hl=(new Gl).c());return Hl}function Ll(){}Ll.prototype=new eg;Ll.prototype.r=function(a){return a};Ll.prototype.a=new w({Cn:0},!1,"scala.Predef$$anon$1",fg,{Cn:1,Ej:1,d:1,y:1,g:1,f:1});function Ml(){}Ml.prototype=new bg;Ml.prototype.r=function(a){return a};
Ml.prototype.a=new w({Dn:0},!1,"scala.Predef$$anon$2",cg,{Dn:1,Dj:1,d:1,y:1,g:1,f:1});function je(){this.fe=null}je.prototype=new Xf;l=je.prototype;l.Yd=g("Some");l.Wd=g(1);l.wa=function(a){return this===a?!0:le(a)?T(S(),this.fe,a.fe):!1};l.m=g(!1);l.Xd=function(a){switch(a){case 0:return this.fe;default:throw(new I).k(""+a);}};l.ue=d("fe");l.w=function(){return jg(this)};l.ha=function(a){this.fe=a;return this};l.Ba=function(){return ve(this)};l.Ee=function(){return we(this)};
function le(a){return!!(a&&a.a&&a.a.u.Fj)}l.a=new w({Fj:0},!1,"scala.Some",Yf,{Fj:1,xh:1,d:1,Zd:1,p:1,g:1,f:1});function aj(a){return!!(a&&a.a&&a.a.u.as)}function ph(a,b){return b.Fc.isArrayClass?vb(wb((new H).fa(["Array[","]"])),(new H).fa([ph(a,lk(J(),b))])):jb(b)}function wh(){V.call(this)}wh.prototype=new ch;wh.prototype.c=function(){V.prototype.k.call(this,"Long");return this};wh.prototype.qb=function(a){return p(B(Xa),[a])};wh.prototype.Wb=function(){return r(Xa)};
wh.prototype.a=new w({Vn:0},!1,"scala.reflect.ManifestFactory$$anon$10",dh,{Vn:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function xh(){V.call(this)}xh.prototype=new ch;xh.prototype.c=function(){V.prototype.k.call(this,"Float");return this};xh.prototype.qb=function(a){return p(B(Ya),[a])};xh.prototype.Wb=function(){return r(Ya)};xh.prototype.a=new w({Wn:0},!1,"scala.reflect.ManifestFactory$$anon$11",dh,{Wn:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function yh(){V.call(this)}yh.prototype=new ch;
yh.prototype.c=function(){V.prototype.k.call(this,"Double");return this};yh.prototype.qb=function(a){return p(B(Za),[a])};yh.prototype.Wb=function(){return r(Za)};yh.prototype.a=new w({Xn:0},!1,"scala.reflect.ManifestFactory$$anon$12",dh,{Xn:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function zh(){V.call(this)}zh.prototype=new ch;zh.prototype.c=function(){V.prototype.k.call(this,"Boolean");return this};zh.prototype.qb=function(a){return p(B(Ta),[a])};zh.prototype.Wb=function(){return r(Ta)};
zh.prototype.a=new w({Yn:0},!1,"scala.reflect.ManifestFactory$$anon$13",dh,{Yn:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function Ah(){V.call(this)}Ah.prototype=new ch;Ah.prototype.c=function(){V.prototype.k.call(this,"Unit");return this};Ah.prototype.qb=function(a){return p(B(ta),[a])};Ah.prototype.Wb=function(){return r(Sa)};Ah.prototype.a=new w({Zn:0},!1,"scala.reflect.ManifestFactory$$anon$14",dh,{Zn:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function sh(){V.call(this)}sh.prototype=new ch;
sh.prototype.c=function(){V.prototype.k.call(this,"Byte");return this};sh.prototype.qb=function(a){return p(B(C),[a])};sh.prototype.Wb=function(){return r(C)};sh.prototype.a=new w({eo:0},!1,"scala.reflect.ManifestFactory$$anon$6",dh,{eo:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function th(){V.call(this)}th.prototype=new ch;th.prototype.c=function(){V.prototype.k.call(this,"Short");return this};th.prototype.qb=function(a){return p(B(Va),[a])};th.prototype.Wb=function(){return r(Va)};
th.prototype.a=new w({fo:0},!1,"scala.reflect.ManifestFactory$$anon$7",dh,{fo:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function uh(){V.call(this)}uh.prototype=new ch;uh.prototype.c=function(){V.prototype.k.call(this,"Char");return this};uh.prototype.qb=function(a){return p(B(Ua),[a])};uh.prototype.Wb=function(){return r(Ua)};uh.prototype.a=new w({go:0},!1,"scala.reflect.ManifestFactory$$anon$8",dh,{go:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function vh(){V.call(this)}vh.prototype=new ch;
vh.prototype.c=function(){V.prototype.k.call(this,"Int");return this};vh.prototype.qb=function(a){return p(B(Wa),[a])};vh.prototype.Wb=function(){return r(Wa)};vh.prototype.a=new w({ho:0},!1,"scala.reflect.ManifestFactory$$anon$9",dh,{ho:1,kd:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function Nl(){Gh.call(this);this.Ik=null;this.Ri=0}Nl.prototype=new Hh;function Ol(){}Ol.prototype=Nl.prototype;Nl.prototype.wa=function(a){return this===a};Nl.prototype.w=d("Ik");Nl.prototype.Ba=d("Ri");
Nl.prototype.Lf=function(a,b){this.Ik=b;Gh.prototype.Gm.call(this,ke(),a,Kg());this.Ri=La(this);return this};var Pl=new w({df:0},!1,"scala.reflect.ManifestFactory$PhantomManifest",Ih,{df:1,Fe:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});Nl.prototype.a=Pl;function Rh(){U.call(this)}Rh.prototype=new af;Rh.prototype.c=function(){U.prototype.c.call(this);return this};Rh.prototype.pg=function(){Th||(Th=(new Sh).c());return Th.Zh?U.prototype.pg.call(this):this};
Rh.prototype.a=new w({po:0},!1,"scala.util.control.BreakControl",gf,{po:1,Aa:1,d:1,f:1,bs:1,cs:1});function Ql(){this.Lh=this.qj=this.Kh=this.ws=this.ts=this.Qr=this.ss=this.Fr=0}Ql.prototype=new Vh;Ql.prototype.c=function(){Rl=this;this.Kh=za(s(),"Seq");this.qj=za(s(),"Map");this.Lh=za(s(),"Set");return this};function Sl(a,b){var c;if(b&&b.a&&b.a.u.Gg){c=0;for(var e=a.Kh,f=b;!f.m();){var h=f.ya(),f=f.ua(),e=Xh(0,e,Sb(J(),h));c=1+c|0}c=Yh(e^c)}else c=bi(a,b,a.Kh);return c}
Ql.prototype.a=new w({so:0},!1,"scala.util.hashing.MurmurHash3$",ci,{so:1,Ij:1,d:1});var Rl=void 0;function ai(){Rl||(Rl=(new Ql).c());return Rl}function Tl(){}Tl.prototype=new vi;function Ul(){}l=Ul.prototype=Tl.prototype;l.Mg=function(){return this.ma()};l.Ic=function(a){return Vl(this,a)};l.Kf=function(a){var b=this.ma();return Wl(b,a)};l.qa=function(a){var b=this.ma();li(b,a)};l.Ib=function(){return this.ma().Ib()};l.Pc=function(a,b,c){Xl(this,a,b,c)};l.Zc=function(a){return Yl(this,a)};
var Zl=new w({aa:0},!1,"scala.collection.AbstractIterable",yi,{aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1});Tl.prototype.a=Zl;function $l(a,b){var c;if(b&&b.a&&b.a.u.Rb){if(!(c=a===b)&&(c=a.na()===b.na()))try{c=a.Rh(b)}catch(e){if(e&&e.a&&e.a.u.Rm)c=!1;else throw e;}}else c=!1;return c}function am(){this.Ja=null}am.prototype=new Gi;am.prototype.c=function(){Fi.prototype.Mf.call(this,Fd());return this};am.prototype.Te=function(){Fd();Ed();Gd();return(new Hd).c()};
am.prototype.a=new w({xo:0},!1,"scala.collection.IndexedSeq$$anon$1",Hi,{xo:1,Dg:1,d:1,Xf:1});function X(){this.uc=this.gd=0;this.Ja=null}X.prototype=new ii;l=X.prototype;l.Y=function(){this.uc>=this.gd&&Jg().Nb.Y();var a=this.Ja.Ka(this.uc);this.uc=1+this.uc|0;return a};function hj(a,b,c,e){a.gd=e;if(null===b)throw ff(df(),null);a.Ja=b;a.uc=c;return a}l.ea=function(){return this.uc<this.gd};function bm(a){a=a.gd-a.uc|0;return 0<a?a:0}
l.eh=function(a){return 0>=a?hj(new X,this.Ja,this.uc,this.gd):(this.uc+a|0)>=this.gd?hj(new X,this.Ja,this.gd,this.gd):hj(new X,this.Ja,this.uc+a|0,this.gd)};l.Ck=function(a,b){return(0>=b?Jg().Nb:b<=bm(this)?hj(new X,this.Ja,this.uc,this.uc+b|0):hj(new X,this.Ja,this.uc,this.gd)).eh(a)};l.a=new w({yo:0},!1,"scala.collection.IndexedSeqLike$Elements",ti,{yo:1,Gb:1,d:1,Sb:1,t:1,s:1,ds:1,g:1,f:1});function lj(a){var b=(new cm).la(a.na());a=a.Ca();dm(b,a);return b}
function Mj(a,b,c){b=0<b?b:0;c=0<c?c:0;var e=a.j();c=c<e?c:e;var e=c-b|0,f=0<e?e:0,e=a.ga();for(e.ta(f);b<c;)e.ra(a.Ka(b)),b=1+b|0;return e.$()}function em(a,b){return a.Oe(a.j()-b|0,a.j())}function mj(a,b,c,e){var f=0,h=c,k=a.j();e=k<e?k:e;c=qi(J(),b)-c|0;for(c=e<c?e:c;f<c;)ri(J(),b,h,a.Ka(f)),f=1+f|0,h=1+h|0}function ij(a,b){if(b&&b.a&&b.a.u.Zb){var c=a.j();if(c===b.j()){for(var e=0;e<c&&T(S(),a.Ka(e),b.Ka(e));)e=1+e|0;return e===c}return!1}return Vl(a,b)}
function kj(a,b){for(var c=0,e=a.j();c<e;)b.r(a.Ka(c)),c=1+c|0}function jj(a){return 0===a.j()}function ad(a){var b=a.ma(),b=fm(b,b);return(new gd).af(b,$b(new K,function(a){return function(b){var f=a.ga();f.va(b);return f.$()}}(a)))}function Yl(a,b){var c=a.ga();c.fc(b,a);var e=a.ma().eh(b);a.qa($b(new K,function(a,b,c,e){return function(a){c.ea()?c.Y():e.da=!0;return e.da?b.ra(a):void 0}}(a,c,e,Uk(!1))));return c.$()}
function Xl(a,b,c,e){var f=c;c=c+e|0;e=qi(J(),b);c=c<e?c:e;for(a=a.ma();f<c&&a.ea();)ri(J(),b,f,a.Y()),f=1+f|0}function Vl(a,b){for(var c=a.ma(),e=b.ma();c.ea()&&e.ea();)if(!T(S(),c.Y(),e.Y()))return!1;return!c.ea()&&!e.ea()}function si(){this.Sf=0;this.Na=null}si.prototype=new ii;si.prototype.Y=function(){return 0<this.Sf?(this.Sf=-1+this.Sf|0,this.Na.Y()):Jg().Nb.Y()};si.prototype.ea=function(){return 0<this.Sf&&this.Na.ea()};
si.prototype.a=new w({Bo:0},!1,"scala.collection.Iterator$$anon$10",ti,{Bo:1,Gb:1,d:1,Sb:1,t:1,s:1});function gd(){this.Ni=this.Na=null}gd.prototype=new ii;gd.prototype.Y=function(){return this.Ni.r(this.Na.Y())};gd.prototype.af=function(a,b){if(null===a)throw ff(df(),null);this.Na=a;this.Ni=b;return this};gd.prototype.ea=function(){return this.Na.ea()};gd.prototype.a=new w({Co:0},!1,"scala.collection.Iterator$$anon$11",ti,{Co:1,Gb:1,d:1,Sb:1,t:1,s:1});function cd(){this.Oi=this.Na=this.mg=null}
cd.prototype=new ii;cd.prototype.Y=function(){return(this.ea()?this.mg:Jg().Nb).Y()};cd.prototype.af=function(a,b){if(null===a)throw ff(df(),null);this.Na=a;this.Oi=b;this.mg=Jg().Nb;return this};cd.prototype.ea=function(){for(;;){if(this.mg.ea())return!0;if(this.Na.ea())this.mg=this.Oi.r(this.Na.Y()).Mg();else return!1}};cd.prototype.a=new w({Do:0},!1,"scala.collection.Iterator$$anon$12",ti,{Do:1,Gb:1,d:1,Sb:1,t:1,s:1});function Bi(){}Bi.prototype=new ii;
Bi.prototype.Y=function(){throw(new Ek).k("next on empty iterator");};Bi.prototype.ea=g(!1);Bi.prototype.a=new w({Eo:0},!1,"scala.collection.Iterator$$anon$2",ti,{Eo:1,Gb:1,d:1,Sb:1,t:1,s:1});function gm(){this.Ig=null;this.Pe=this.e=0;this.ed=null;this.$h=this.Ld=!1;this.Ja=this.uh=null}gm.prototype=new ii;gm.prototype.Y=function(){this.Ld||hm(this);if(!this.Ld)throw(new Ek).k("next on empty iterator");this.Ld=!1;var a=this.ed,b=be().sa;return ce(a,b)};
function im(a){a=a.Pe-a.e|0;return 0<a?a:0}gm.prototype.ea=function(){return this.Ld||hm(this)};
function jm(a,b){for(var c=0,c=0,e=!1,e=!1,f=0,f=0,h=a.ed.$a,k=(new cm).c(),m=0;m<b&&a.Ig.ea();)km(k,a.Ig.Y()),m=1+m|0;m=b-k.j()|0;if(0<m&&!a.uh.m()){be();for(var t=(new Qi).c(),q=0;q<m;){var u=a.uh.ue().Se();Wi(t,u);q=1+q|0}m=t.Lc();t=Zb();k=k.jf(m,t.sa)}if(k.m())return!1;if(a.$h)return 0===(1&f)&&0===(1&f)&&(c=k.j(),f|=1),e=c,m=a.e,e=e<m?e:m,0<e?0===h?m=!0:(0===(1&f)&&0===(1&f)&&(c=k.j(),f|=1),m=c,m=m>im(a)):m=!1,m?(0!==h&&(m=a.Pe,lm(a.ed,m<h?m:h)),0===h?0===(1&f)&&0===(1&f)&&(c=k.j()):(0===(1&
f)&&0===(1&f)&&(c=k.j()),c=c-im(a)|0,c=e<c?e:c),dm(a.ed,k.Zc(c)),a.Ld=!0):!1;0===(2&f)&&0===(2&f)&&(0===(1&f)&&0===(1&f)&&(c=k.j(),f|=1),e=c,e=e<b,f|=2);if(e)return!1;0===h?(0===(1&f)&&0===(1&f)&&(c=k.j(),f|=1),e=c):(e=a.Pe,m=a.e,e=e<m?e:m);0<e?0===h?m=!0:(0===(1&f)&&0===(1&f)&&(c=k.j(),f|=1),m=c,m=m>im(a)):m=!1;return m?(0!==h&&(m=a.Pe,lm(a.ed,m<h?m:h)),0===h?0===(1&f)&&0===(1&f)&&(c=k.j()):(0===(1&f)&&0===(1&f)&&(c=k.j()),c=c-im(a)|0,c=e<c?e:c),dm(a.ed,k.Zc(c)),a.Ld=!0):!1}
function hm(a){return a.Ig.ea()?jj(a.ed)?jm(a,a.e):jm(a,a.Pe):!1}function fm(a,b){var c=new gm;c.Ig=b;c.e=3;c.Pe=3;if(null===a)throw ff(df(),null);c.Ja=a;c.ed=Yb(ni(),Kg());c.Ld=!1;c.$h=!0;c.uh=ke();return c}gm.prototype.a=new w({Fo:0},!1,"scala.collection.Iterator$GroupedIterator",ti,{Fo:1,Gb:1,d:1,Sb:1,t:1,s:1});function id(a){if(a.ea()){var b=a.Y();return mm(new nm,b,om(function(a){return function(){return a.Ib()}}(a)))}Rg();return pm()}function li(a,b){for(;a.ea();)b.r(a.Y())}
function Wl(a,b){for(var c=!0;c&&a.ea();)c=!!b.r(a.Y());return c}function qm(){this.Na=this.Cb=null}qm.prototype=new ii;qm.prototype.Y=function(){if(this.ea()){var a=this.Cb.ya();this.Cb=this.Cb.ua();return a}return Jg().Nb.Y()};qm.prototype.Lc=function(){var a=this.Cb.Lc();this.Cb=this.Na.wb().ga().$();return a};qm.prototype.ea=function(){return!this.Cb.m()};qm.prototype.a=new w({Go:0},!1,"scala.collection.LinearSeqLike$$anon$1",ti,{Go:1,Gb:1,d:1,Sb:1,t:1,s:1});
function rm(a,b){var c=a.Ii(b);if(0>b||c.m())throw(new I).k(""+b);return c.ya()}function sm(a,b){var c=0;for(;;){if(c===b)return a.m()?0:1;if(a.m())return-1;var c=1+c|0,e=a.ua();a=e}}function tm(a,b){if(b&&b.a&&b.a.u.Ge){for(var c=a,e=b;!c.m()&&!e.m()&&T(S(),c.ya(),e.ya());)c=c.ua(),e=e.ua();return c.m()&&e.m()}return Vl(a,b)}
function um(a,b,c,e,f){var h=a.ma();a=(new gd).af(h,$b(new K,function(){return function(a){if(null!==a){var b=a.Ed;a=a.md;hg||(hg=(new gg).c());return""+(""+Dk(s(),b)+" -\x3e ")+a}throw(new M).ha(a);}}(a)));return pi(a,b,c,e,f)}function Ri(a){var b=Kg(),c=(new Zk).ha(b);a.qa($b(new K,function(a,b){return function(a){b.da=ol(new pl,a,b.da)}}(a,c)));b=a.ga();nb(a)&&b.ta(a.na());for(a=c.da;!a.m();)c=a.ya(),b.ra(c),a=a.ua();return b.$()}
function ld(a,b,c){c=c.vd(a.jd());c.va(a.Kc());c.ra(b);return c.$()}function vm(a){var b=(new cm).la(a.na());a=a.Ca();dm(b,a);return b}function ce(a,b){var c=b.Te();nb(a)&&c.ta(a.na());c.va(a.vb());return c.$()}function Lj(a){return a.Ud(a.Cc()+"(",", ",")")}function wm(a,b,c){c=c.vd(a.jd());a.qa($b(new K,function(a,b,c){return function(a){return b.va(c.r(a).Ca())}}(a,c,b)));return c.$()}
function Td(a,b){var c=a.ga();a.qa($b(new K,function(a,b,c,k){return function(a){return!!b.r(a)!==c?k.ra(a):void 0}}(a,b,!1,c)));return c.$()}function wi(a,b,c){c=c.vd(a.jd());if(nb(b)){var e=b.Ca().na();nb(a)&&c.ta(a.na()+e|0)}c.va(a.vb());c.va(b.Ca());return c.$()}function ql(a,b){var c=b.vd(a.jd());nb(a)&&c.ta(a.na());return c}function xi(a){a=jb(ka(a.jd()));var b;s();b=a;var c=pg(46);b=b.lastIndexOf(c)|0;-1!==b&&(a=a.substring(1+b|0));b=ng(s(),a,36);-1!==b&&(a=a.substring(0,b));return a}
function pi(a,b,c,e,f){var h=Uk(!0);xm(b,c);a.qa($b(new K,function(a,b,c,e){return function(a){if(b.da)ym(c,a),b.da=!1;else return xm(c,e),ym(c,a)}}(a,h,b,e)));xm(b,f);return b}function ki(a,b){var c=b.Te();c.va(a.Ca());return c.$()}function Kd(a,b){if(a.Of()){var c=b.qb(a.na());a.Df(c,0);return c}return a.pc().Gk(b)}function oi(a,b,c,e){return a.oe((new $f).c(),b,c,e).gc.xb}function mi(a){var b=(new $h).la(0);a.qa($b(new K,function(a,b){return function(){b.da=1+b.da|0}}(a,b)));return b.da}
function ji(a,b,c){a.Pc(b,c,qi(J(),b)-c|0)}function zm(){}zm.prototype=new Ji;function Am(){}Am.prototype=zm.prototype;var Bm=new w({ae:0},!1,"scala.collection.generic.GenSetFactory",Ki,{ae:1,Ha:1,d:1});zm.prototype.a=Bm;function Cm(){this.sa=null}Cm.prototype=new Ji;function Dm(){}Dm.prototype=Cm.prototype;Cm.prototype.c=function(){this.sa=(new Em).Mf(this);return this};var Fm=new w({Ab:0},!1,"scala.collection.generic.GenTraversableFactory",Ki,{Ab:1,Ha:1,d:1});Cm.prototype.a=Fm;
function Em(){this.Na=this.Ja=null}Em.prototype=new Gi;Em.prototype.Te=function(){return this.Na.ga()};Em.prototype.Mf=function(a){if(null===a)throw ff(df(),null);this.Na=a;Fi.prototype.Mf.call(this,a);return this};Em.prototype.a=new w({Mo:0},!1,"scala.collection.generic.GenTraversableFactory$$anon$1",Hi,{Mo:1,Dg:1,d:1,Xf:1});function Gm(a,b){a:b:for(;;){if(!b.m()){a.Ua(b.ya());b=b.ua();continue b}break a}}
function W(a,b){b&&b.a&&b.a.u.Ge?Gm(a,b):b.qa($b(new K,function(a){return function(b){return a.Ua(b)}}(a)));return a}function Hm(){}Hm.prototype=new Di;function Im(){}Im.prototype=Hm.prototype;var Jm=new w({Ch:0},!1,"scala.collection.generic.MapFactory",Ei,{Ch:1,Cg:1,d:1});Hm.prototype.a=Jm;function Km(){this.Qe=null}Km.prototype=new ii;Km.prototype.Y=function(){if(!this.Qe.m()){var a=this.Qe.ya();this.Qe=this.Qe.Ek();return a}return Jg().Nb.Y()};Km.prototype.bf=function(a){this.Qe=a;return this};
Km.prototype.ea=function(){return!this.Qe.m()};Km.prototype.a=new w({Zo:0},!1,"scala.collection.immutable.ListSet$$anon$1",ti,{Zo:1,Gb:1,d:1,Sb:1,t:1,s:1});function Lm(){this.wc=null}Lm.prototype=new fk;Lm.prototype.$=function(){return Mm(this)};function Mm(a){return Nm(a.wc.Ga.Ib(),$b(new K,function(){return function(a){return a.Ib()}}(a)))}function Om(a){return!!(a&&a.a&&a.a.u.Vj)}Lm.prototype.a=new w({Vj:0},!1,"scala.collection.immutable.Stream$StreamBuilder",hk,{Vj:1,ok:1,d:1,Za:1,Ta:1,Sa:1});
function Pm(){this.Ja=null}Pm.prototype=new Gi;Pm.prototype.c=function(){Fi.prototype.Mf.call(this,Rg());return this};Pm.prototype.a=new w({qp:0},!1,"scala.collection.immutable.Stream$StreamCanBuildFrom",Hi,{qp:1,Dg:1,d:1,Xf:1});function Qm(){this.Cb=null}Qm.prototype=new ii;l=Qm.prototype;l.Y=function(){if(!this.ea())return Jg().Nb.Y();var a=this.Cb.ab?this.Cb.de:fj(this.Cb),b=a.ya();this.Cb=ej(new dj,this,om(function(a,b){return function(){return b.ua()}}(this,a)));return b};
l.Lc=function(){var a=this.Ib(),b=be().sa;return ce(a,b)};function Rm(a){var b=new Qm;b.Cb=ej(new dj,b,om(function(a,b){return function(){return b}}(b,a)));return b}l.ea=function(){return!(this.Cb.ab?this.Cb.de:fj(this.Cb)).m()};l.Ib=function(){var a=this.Cb.ab?this.Cb.de:fj(this.Cb);this.Cb=ej(new dj,this,om(function(){return function(){Rg();return pm()}}(this)));return a};l.a=new w({rp:0},!1,"scala.collection.immutable.StreamIterator",ti,{rp:1,Gb:1,d:1,Sb:1,t:1,s:1});
function kd(a,b){var c=(new $f).c(),e=0>=b,f=1+(e?-1:-1+b|0)|0;if(0>(e?0:b))throw Wg(),(new F).k($i(b)+": seqs cannot contain more than Int.MaxValue elements.");for(e=0;e!==f;)xm(c,a.w()),e=1+e|0;return c.gc.xb}function Sm(){this.l=null;this.xc=0;this.ef=this.Bh=this.Ag=null;this.$d=0;this.He=null}Sm.prototype=new ii;function Tm(){}Tm.prototype=Sm.prototype;
Sm.prototype.Y=function(){if(null!==this.He){var a=this.He.Y();this.He.ea()||(this.He=null);return a}a:{var a=this.ef,b=this.$d;for(;;){b===(-1+a.b.length|0)?(this.xc=-1+this.xc|0,0<=this.xc?(this.ef=this.Ag.b[this.xc],this.$d=this.Bh.b[this.xc],this.Ag.b[this.xc]=null):(this.ef=null,this.$d=0)):this.$d=1+this.$d|0;if((a=a.b[b])&&a.a&&a.a.u.hs||a&&a.a&&a.a.u.Tj){a=a.Pd;break a}if(a&&a.a&&a.a.u.Oo||Um(a))0<=this.xc&&(this.Ag.b[this.xc]=this.ef,this.Bh.b[this.xc]=this.$d),this.xc=1+this.xc|0,this.ef=
Vm(a),this.$d=0,a=Vm(a),b=0;else{this.He=a.ma();a=this.Y();break a}}a=void 0}return a};Sm.prototype.ea=function(){return null!==this.He||0<=this.xc};function Vm(a){if(a&&a.a&&a.a.u.Oo)return a.Jr();if(Um(a))return a.Mb;throw(new M).ha(a);}Sm.prototype.xm=function(a){this.l=a;this.xc=0;this.Ag=p(B(B(ob)),[6]);this.Bh=p(B(Wa),[6]);this.ef=this.l;this.$d=0;this.He=null;return this};var Wm=new w({Yj:0},!1,"scala.collection.immutable.TrieIterator",ti,{Yj:1,Gb:1,d:1,Sb:1,t:1,s:1});Sm.prototype.a=Wm;
function Xm(){this.Pb=0;this.Na=null}Xm.prototype=new ii;Xm.prototype.Y=function(){return 0<this.Pb?(this.Pb=-1+this.Pb|0,this.Na.Ka(this.Pb)):Jg().Nb.Y()};Xm.prototype.ea=function(){return 0<this.Pb};function Ym(a){var b=new Xm;if(null===a)throw ff(df(),null);b.Na=a;b.Pb=a.j();return b}Xm.prototype.a=new w({wp:0},!1,"scala.collection.immutable.Vector$$anon$1",ti,{wp:1,Gb:1,d:1,Sb:1,t:1,s:1});
function Zm(){this.hh=this.Td=this.Hd=this.gh=0;this.cg=!1;this.ch=0;this.Hi=this.Fi=this.Di=this.Bi=this.zi=this.dh=null}Zm.prototype=new ii;l=Zm.prototype;
l.Y=function(){if(!this.cg)throw(new Ek).k("reached iterator end");var a=this.dh.b[this.Td];this.Td=1+this.Td|0;if(this.Td===this.hh)if((this.Hd+this.Td|0)<this.gh){var b=32+this.Hd|0,c=this.Hd^b;if(1024>c)this.oa(this.o().b[31&b>>5]);else if(32768>c)this.z(this.v().b[31&b>>10]),this.oa(this.o().b[0]);else if(1048576>c)this.ka(this.Q().b[31&b>>15]),this.z(this.v().b[0]),this.oa(this.o().b[0]);else if(33554432>c)this.Da(this.za().b[31&b>>20]),this.ka(this.Q().b[0]),this.z(this.v().b[0]),this.oa(this.o().b[0]);
else if(1073741824>c)this.Db(this.Lb().b[31&b>>25]),this.Da(this.za().b[0]),this.ka(this.Q().b[0]),this.z(this.v().b[0]),this.oa(this.o().b[0]);else throw(new F).c();this.Hd=b;b=this.gh-this.Hd|0;this.hh=32>b?b:32;this.Td=0}else this.cg=!1;return a};l.Q=d("Di");l.db=d("ch");l.Jd=ba("Hi");l.vc=function(a,b){this.gh=b;this.Hd=-32&a;this.Td=31&a;var c=b-this.Hd|0;this.hh=32>c?c:32;this.cg=(this.Hd+this.Td|0)<b;return this};l.La=d("dh");l.za=d("Fi");l.ka=ba("Bi");l.z=ba("zi");l.ea=d("cg");l.Db=ba("Fi");
l.o=d("zi");l.Lb=d("Hi");l.qc=ba("ch");l.v=d("Bi");l.oa=ba("dh");l.Da=ba("Di");l.a=new w({yp:0},!1,"scala.collection.immutable.VectorIterator",ti,{yp:1,Gb:1,d:1,Sb:1,t:1,s:1,$j:1});
function $m(a,b,c){if(32>c)return a.La().b[31&b];if(1024>c)return a.o().b[31&b>>5].b[31&b];if(32768>c)return a.v().b[31&b>>10].b[31&b>>5].b[31&b];if(1048576>c)return a.Q().b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];if(33554432>c)return a.za().b[31&b>>20].b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];if(1073741824>c)return a.Lb().b[31&b>>25].b[31&b>>20].b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];throw(new F).c();}
function an(a,b){var c=-1+a.db()|0;switch(c){case 5:a.Jd(Z(a.Lb()));a.Db(Z(a.za()));a.Da(Z(a.Q()));a.ka(Z(a.v()));a.z(Z(a.o()));a.Lb().b[31&b>>25]=a.za();a.za().b[31&b>>20]=a.Q();a.Q().b[31&b>>15]=a.v();a.v().b[31&b>>10]=a.o();a.o().b[31&b>>5]=a.La();break;case 4:a.Db(Z(a.za()));a.Da(Z(a.Q()));a.ka(Z(a.v()));a.z(Z(a.o()));a.za().b[31&b>>20]=a.Q();a.Q().b[31&b>>15]=a.v();a.v().b[31&b>>10]=a.o();a.o().b[31&b>>5]=a.La();break;case 3:a.Da(Z(a.Q()));a.ka(Z(a.v()));a.z(Z(a.o()));a.Q().b[31&b>>15]=a.v();
a.v().b[31&b>>10]=a.o();a.o().b[31&b>>5]=a.La();break;case 2:a.ka(Z(a.v()));a.z(Z(a.o()));a.v().b[31&b>>10]=a.o();a.o().b[31&b>>5]=a.La();break;case 1:a.z(Z(a.o()));a.o().b[31&b>>5]=a.La();break;case 0:break;default:throw(new M).ha(c);}}function $(a,b){var c=a.b[b];a.b[b]=null;return Z(c)}
function qj(a,b,c){a.qc(c);c=-1+c|0;switch(c){case -1:break;case 0:a.oa(b.La());break;case 1:a.z(b.o());a.oa(b.La());break;case 2:a.ka(b.v());a.z(b.o());a.oa(b.La());break;case 3:a.Da(b.Q());a.ka(b.v());a.z(b.o());a.oa(b.La());break;case 4:a.Db(b.za());a.Da(b.Q());a.ka(b.v());a.z(b.o());a.oa(b.La());break;case 5:a.Jd(b.Lb());a.Db(b.za());a.Da(b.Q());a.ka(b.v());a.z(b.o());a.oa(b.La());break;default:throw(new M).ha(c);}}
function rj(a,b,c){if(32<=c)if(1024>c)a.oa(a.o().b[31&b>>5]);else if(32768>c)a.z(a.v().b[31&b>>10]),a.oa(a.o().b[31&b>>5]);else if(1048576>c)a.ka(a.Q().b[31&b>>15]),a.z(a.v().b[31&b>>10]),a.oa(a.o().b[31&b>>5]);else if(33554432>c)a.Da(a.za().b[31&b>>20]),a.ka(a.Q().b[31&b>>15]),a.z(a.v().b[31&b>>10]),a.oa(a.o().b[31&b>>5]);else if(1073741824>c)a.Db(a.Lb().b[31&b>>25]),a.Da(a.za().b[31&b>>20]),a.ka(a.Q().b[31&b>>15]),a.z(a.v().b[31&b>>10]),a.oa(a.o().b[31&b>>5]);else throw(new F).c();}
function Z(a){null===a&&bn("NULL");var b=p(B(z),[a.b.length]);Ka(a,0,b,0,a.b.length);return b}function cn(a,b,c){var e=p(B(z),[32]);Ka(a,b,e,c,32-(c>b?c:b)|0);return e}
function dn(a,b,c,e){if(32<=e)if(1024>e)1===a.db()&&(a.z(p(B(z),[32])),a.o().b[31&b>>5]=a.La(),a.qc(1+a.db()|0)),a.oa(p(B(z),[32]));else if(32768>e)2===a.db()&&(a.ka(p(B(z),[32])),a.v().b[31&b>>10]=a.o(),a.qc(1+a.db()|0)),a.z(a.v().b[31&c>>10]),null===a.o()&&a.z(p(B(z),[32])),a.oa(p(B(z),[32]));else if(1048576>e)3===a.db()&&(a.Da(p(B(z),[32])),a.Q().b[31&b>>15]=a.v(),a.ka(p(B(z),[32])),a.z(p(B(z),[32])),a.qc(1+a.db()|0)),a.ka(a.Q().b[31&c>>15]),null===a.v()&&a.ka(p(B(z),[32])),a.z(a.v().b[31&c>>10]),
null===a.o()&&a.z(p(B(z),[32])),a.oa(p(B(z),[32]));else if(33554432>e)4===a.db()&&(a.Db(p(B(z),[32])),a.za().b[31&b>>20]=a.Q(),a.Da(p(B(z),[32])),a.ka(p(B(z),[32])),a.z(p(B(z),[32])),a.qc(1+a.db()|0)),a.Da(a.za().b[31&c>>20]),null===a.Q()&&a.Da(p(B(z),[32])),a.ka(a.Q().b[31&c>>15]),null===a.v()&&a.ka(p(B(z),[32])),a.z(a.v().b[31&c>>10]),null===a.o()&&a.z(p(B(z),[32])),a.oa(p(B(z),[32]));else if(1073741824>e)5===a.db()&&(a.Jd(p(B(z),[32])),a.Lb().b[31&b>>25]=a.za(),a.Db(p(B(z),[32])),a.Da(p(B(z),[32])),
a.ka(p(B(z),[32])),a.z(p(B(z),[32])),a.qc(1+a.db()|0)),a.Db(a.Lb().b[31&c>>20]),null===a.za()&&a.Db(p(B(z),[32])),a.Da(a.za().b[31&c>>20]),null===a.Q()&&a.Da(p(B(z),[32])),a.ka(a.Q().b[31&c>>15]),null===a.v()&&a.ka(p(B(z),[32])),a.z(a.v().b[31&c>>10]),null===a.o()&&a.z(p(B(z),[32])),a.oa(p(B(z),[32]));else throw(new F).c();}function Fj(){this.l=null;this.e=this.i=0}Fj.prototype=new xj;l=Fj.prototype;l.c=function(){this.e=this.i=0;return this};
function en(a,b){var c=p(B(Ta),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}l.wa=function(a){return a&&a.a&&a.a.u.ck?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return fn(this,!!a)};l.w=g("ArrayBuilder.ofBoolean");l.$=function(){return 0!==this.i&&this.i===this.e?this.l:en(this,this.e)};l.Fa=function(a){this.l=en(this,a);this.i=a};l.ra=function(a){return fn(this,!!a)};l.ta=function(a){this.i<a&&this.Fa(a)};
l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};function fn(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.va=function(a){a&&a.a&&a.a.u.qk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({ck:0},!1,"scala.collection.mutable.ArrayBuilder$ofBoolean",yj,{ck:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Xc(){this.l=null;this.e=this.i=0}Xc.prototype=new xj;l=Xc.prototype;
l.c=function(){this.e=this.i=0;return this};l.wa=function(a){return a&&a.a&&a.a.u.dk?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return Yc(this,a|0)};function gn(a,b){var c=p(B(C),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}l.w=g("ArrayBuilder.ofByte");l.$=function(){return Zc(this)};l.Fa=function(a){this.l=gn(this,a);this.i=a};l.ra=function(a){return Yc(this,a|0)};function Yc(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.ta=function(a){this.i<a&&this.Fa(a)};
function Zc(a){return 0!==a.i&&a.i===a.e?a.l:gn(a,a.e)}l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};l.va=function(a){a&&a.a&&a.a.u.rk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({dk:0},!1,"scala.collection.mutable.ArrayBuilder$ofByte",yj,{dk:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Zd(){this.l=null;this.e=this.i=0}Zd.prototype=new xj;l=Zd.prototype;
l.c=function(){this.e=this.i=0;return this};l.wa=function(a){return a&&a.a&&a.a.u.ek?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return hn(this,ae(S(),a))};l.w=g("ArrayBuilder.ofChar");l.$=function(){return $d(this)};l.Fa=function(a){this.l=jn(this,a);this.i=a};function $d(a){return 0!==a.i&&a.i===a.e?a.l:jn(a,a.e)}l.ra=function(a){return hn(this,ae(S(),a))};l.ta=function(a){this.i<a&&this.Fa(a)};function jn(a,b){var c=p(B(Ua),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}
l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};function hn(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.va=function(a){a&&a.a&&a.a.u.sk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({ek:0},!1,"scala.collection.mutable.ArrayBuilder$ofChar",yj,{ek:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Ej(){this.l=null;this.e=this.i=0}Ej.prototype=new xj;l=Ej.prototype;
l.c=function(){this.e=this.i=0;return this};l.wa=function(a){return a&&a.a&&a.a.u.fk?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return kn(this,+a)};l.w=g("ArrayBuilder.ofDouble");l.$=function(){return 0!==this.i&&this.i===this.e?this.l:ln(this,this.e)};function ln(a,b){var c=p(B(Za),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}l.Fa=function(a){this.l=ln(this,a);this.i=a};l.ra=function(a){return kn(this,+a)};l.ta=function(a){this.i<a&&this.Fa(a)};
function kn(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};l.va=function(a){a&&a.a&&a.a.u.tk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({fk:0},!1,"scala.collection.mutable.ArrayBuilder$ofDouble",yj,{fk:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Dj(){this.l=null;this.e=this.i=0}Dj.prototype=new xj;l=Dj.prototype;
l.c=function(){this.e=this.i=0;return this};l.wa=function(a){return a&&a.a&&a.a.u.gk?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return mn(this,pa(a))};l.w=g("ArrayBuilder.ofFloat");l.$=function(){return 0!==this.i&&this.i===this.e?this.l:nn(this,this.e)};l.Fa=function(a){this.l=nn(this,a);this.i=a};function mn(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.ra=function(a){return mn(this,pa(a))};l.ta=function(a){this.i<a&&this.Fa(a)};
function nn(a,b){var c=p(B(Ya),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};l.va=function(a){a&&a.a&&a.a.u.uk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({gk:0},!1,"scala.collection.mutable.ArrayBuilder$ofFloat",yj,{gk:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Bj(){this.l=null;this.e=this.i=0}Bj.prototype=new xj;l=Bj.prototype;
l.c=function(){this.e=this.i=0;return this};l.wa=function(a){return a&&a.a&&a.a.u.hk?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return on(this,a|0)};l.w=g("ArrayBuilder.ofInt");l.$=function(){return 0!==this.i&&this.i===this.e?this.l:pn(this,this.e)};l.Fa=function(a){this.l=pn(this,a);this.i=a};function on(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.ra=function(a){return on(this,a|0)};function pn(a,b){var c=p(B(Wa),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}
l.ta=function(a){this.i<a&&this.Fa(a)};l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};l.va=function(a){a&&a.a&&a.a.u.vk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({hk:0},!1,"scala.collection.mutable.ArrayBuilder$ofInt",yj,{hk:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Cj(){this.l=null;this.e=this.i=0}Cj.prototype=new xj;l=Cj.prototype;
l.c=function(){this.e=this.i=0;return this};function qn(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.wa=function(a){return a&&a.a&&a.a.u.ik?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return qn(this,Oa(a))};l.w=g("ArrayBuilder.ofLong");l.$=function(){return 0!==this.i&&this.i===this.e?this.l:rn(this,this.e)};l.Fa=function(a){this.l=rn(this,a);this.i=a};function rn(a,b){var c=p(B(Xa),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}l.ra=function(a){return qn(this,Oa(a))};
l.ta=function(a){this.i<a&&this.Fa(a)};l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};l.va=function(a){a&&a.a&&a.a.u.wk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({ik:0},!1,"scala.collection.mutable.ArrayBuilder$ofLong",yj,{ik:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Hj(){this.l=this.Li=null;this.e=this.i=0}Hj.prototype=new xj;l=Hj.prototype;
l.hd=function(a){this.Li=a;this.e=this.i=0;return this};l.wa=function(a){return a&&a.a&&a.a.u.jk?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return sn(this,a)};l.w=g("ArrayBuilder.ofRef");l.$=function(){return 0!==this.i&&this.i===this.e?this.l:tn(this,this.e)};l.Fa=function(a){this.l=tn(this,a);this.i=a};function sn(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.ra=function(a){return sn(this,a)};l.ta=function(a){this.i<a&&this.Fa(a)};
l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};function tn(a,b){var c=a.Li.qb(b);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}l.va=function(a){a&&a.a&&a.a.u.xk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({jk:0},!1,"scala.collection.mutable.ArrayBuilder$ofRef",yj,{jk:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Aj(){this.l=null;this.e=this.i=0}Aj.prototype=new xj;l=Aj.prototype;
l.c=function(){this.e=this.i=0;return this};l.wa=function(a){return a&&a.a&&a.a.u.kk?this.e===a.e&&this.l===a.l:!1};function un(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.Ua=function(a){return un(this,a|0)};l.w=g("ArrayBuilder.ofShort");l.$=function(){return 0!==this.i&&this.i===this.e?this.l:vn(this,this.e)};l.Fa=function(a){this.l=vn(this,a);this.i=a};function vn(a,b){var c=p(B(Va),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}l.ra=function(a){return un(this,a|0)};
l.ta=function(a){this.i<a&&this.Fa(a)};l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};l.va=function(a){a&&a.a&&a.a.u.yk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({kk:0},!1,"scala.collection.mutable.ArrayBuilder$ofShort",yj,{kk:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Gj(){this.l=null;this.e=this.i=0}Gj.prototype=new xj;l=Gj.prototype;
l.c=function(){this.e=this.i=0;return this};l.wa=function(a){return a&&a.a&&a.a.u.lk?this.e===a.e&&this.l===a.l:!1};l.Ua=function(a){return wn(this,a)};l.w=g("ArrayBuilder.ofUnit");function wn(a,b){a.Ea(1+a.e|0);a.l.b[a.e]=b;a.e=1+a.e|0;return a}l.$=function(){return 0!==this.i&&this.i===this.e?this.l:xn(this,this.e)};l.Fa=function(a){this.l=xn(this,a);this.i=a};function xn(a,b){var c=p(B(ta),[b]);0<a.e&&Y(O(),a.l,0,c,0,a.e);return c}l.ra=function(a){return wn(this,a)};
l.ta=function(a){this.i<a&&this.Fa(a)};l.Ea=function(a){if(this.i<a||0===this.i){for(var b=0===this.i?16:D(2,this.i);b<a;)b=D(2,b);this.Fa(b)}};l.va=function(a){a&&a.a&&a.a.u.zk?(this.Ea(this.e+a.j()|0),Y(O(),a.h,0,this.l,this.e,a.j()),this.e=this.e+a.j()|0,a=this):a=W(this,a);return a};l.a=new w({lk:0},!1,"scala.collection.mutable.ArrayBuilder$ofUnit",yj,{lk:1,Vc:1,d:1,Za:1,Ta:1,Sa:1,g:1,f:1});function Ui(a,b,c){nb(c)&&(c=c.na(),a.ta(b<c?b:c))}function yn(){this.Pb=0;this.Na=null}yn.prototype=new ii;
yn.prototype.Y=function(){return this.ea()?(this.Pb=1+this.Pb|0,this.Na.ja.b[-1+this.Pb|0]===Wj()?null:this.Na.ja.b[-1+this.Pb|0]):Jg().Nb.Y()};function zn(a){var b=new yn;if(null===a)throw ff(df(),null);b.Na=a;b.Pb=0;return b}yn.prototype.ea=function(){for(;this.Pb<this.Na.ja.b.length&&null===this.Na.ja.b[this.Pb];)this.Pb=1+this.Pb|0;return this.Pb<this.Na.ja.b.length};yn.prototype.a=new w({Ip:0},!1,"scala.collection.mutable.FlatHashTable$$anon$1",ti,{Ip:1,Gb:1,d:1,Sb:1,t:1,s:1});
function Vi(a,b){for(var c=null===b?Wj():b,e=ya(c),e=An(a,e),f=a.ja.b[e];null!==f&&!T(S(),f,c);)e=(1+e|0)%a.ja.b.length,f=a.ja.b[e];return f}
function Bn(a,b){for(var c=ya(b),c=An(a,c),e=a.ja.b[c];null!==e;){if(T(S(),e,b))return;c=(1+c|0)%a.ja.b.length;e=a.ja.b[c]}a.ja.b[c]=b;a.oc=1+a.oc|0;null!==a.Vb&&(c>>=5,e=a.Vb,e.b[c]=1+e.b[c]|0);if(a.oc>=a.Dd)for(c=a.ja,a.ja=p(B(z),[D(2,a.ja.b.length)]),a.oc=0,null!==a.Vb&&(e=1+(a.ja.b.length>>5)|0,a.Vb.b.length!==e?a.Vb=p(B(Wa),[e]):lf(nf(),a.Vb)),a.be=Ge(Ke(),-1+a.ja.b.length|0),a.Dd=Tj().Qf(a.nd,a.ja.b.length),e=0;e<c.b.length;){var f=c.b[e];null!==f&&Bn(a,f);e=1+e|0}}
function An(a,b){var c=a.be,e=ei(gi(),b),c=c%32,f=-1+a.ja.b.length|0;return((e>>>c|0|e<<(32-c|0))>>>(32-Ge(Ke(),f)|0)|0)&f}function Cn(){this.ph=null;this.Ye=0;this.se=null}Cn.prototype=new ii;function Dn(a){var b=new Cn;b.ph=a.ja;b.Ye=En(a);b.se=b.ph.b[b.Ye];return b}Cn.prototype.Y=function(){var a=this.se;for(this.se=this.se.Vd;null===this.se&&0<this.Ye;)this.Ye=-1+this.Ye|0,this.se=this.ph.b[this.Ye];return a};Cn.prototype.ea=function(){return null!==this.se};
Cn.prototype.a=new w({Pp:0},!1,"scala.collection.mutable.HashTable$$anon$1",ti,{Pp:1,Gb:1,d:1,Sb:1,t:1,s:1});function En(a){for(var b=-1+a.ja.b.length|0;null===a.ja.b[b]&&0<b;)b=-1+b|0;return b}function Fn(a,b){var c=Sb(J(),b);return Gn(a,b,Hn(a,c))}function Gn(a,b,c){for(a=a.ja.b[c];;)if(null!==a?(c=a.Hc,c=!T(S(),c,b)):c=!1,c)a=a.Vd;else break;return a}function In(a,b){if(null!==a.Vb){var c=a.Vb,e=b>>5;c.b[e]=1+c.b[e]|0}}
function Hn(a,b){var c=-1+a.ja.b.length|0,e=a.be,f=ei(gi(),b),e=e%32;return(f>>>e|0|f<<(32-e|0))>>(32-Ge(Ke(),c)|0)&c}
function qe(a,b,c){var e=Sb(J(),b),e=Hn(a,e),f=Gn(a,b,e);if(null!==f)a=f;else{b=(new Nj).Ze(b,c);b.Vd=a.ja.b[e];a.ja.b[e]=b;a.oc=1+a.oc|0;In(a,e);if(a.oc>a.Dd){b=D(2,a.ja.b.length);c=a.ja;a.ja=p(B(pb),[b]);null!==a.Vb&&(e=1+(a.ja.b.length>>5)|0,a.Vb.b.length!==e?a.Vb=p(B(Wa),[e]):lf(nf(),a.Vb));for(e=-1+c.b.length|0;0<=e;){for(f=c.b[e];null!==f;){var h=f.Hc,h=Sb(J(),h),h=Hn(a,h),k=f.Vd;f.Vd=a.ja.b[h];a.ja.b[h]=f;f=k;In(a,h)}e=-1+e|0}a.Dd=bk().Qf(a.nd,b)}a=null}return a}
function Jn(){this.Ef=null}Jn.prototype=new ii;Jn.prototype.Y=function(){if(this.ea()){var a=this.Ef.ya();this.Ef=this.Ef.ua();return a}throw(new Ek).k("next on empty Iterator");};Jn.prototype.ea=function(){return this.Ef!==Kg()};Jn.prototype.a=new w({Tp:0},!1,"scala.collection.mutable.ListBuffer$$anon$1",ti,{Tp:1,Gb:1,d:1,Sb:1,t:1,s:1});
function Kn(a,b){var c=(new R).la(a.h.b.length);if(Ha((new R).la(b),c)){for(c=Rj((new R).A(2,0,0),c);Ha((new R).la(b),c);)c=Rj((new R).A(2,0,0),c);Ha(c,(new R).A(4194303,511,0))&&(c=(new R).A(4194303,511,0));c=p(B(z),[rd(c)]);Ka(a.h,0,c,0,a.$a);a.h=c}}function Ln(a,b){if(b>=a.$a)throw(new I).k(""+b);return a.h.b[b]}function Mn(){Qb.call(this);this.Oj=0}Mn.prototype=new Rb;function Nn(){}Nn.prototype=Mn.prototype;Mn.prototype.$e=function(a,b,c){this.Oj=c;Qb.prototype.oh.call(this,a);return this};
Mn.prototype.th=function(){var a=new On;if(null===this)throw ff(df(),null);a.Ja=this;nc.prototype.Vi.call(a,this,1);return a};var Pn=new w({Mh:0},!1,"scala.scalajs.niocharset.ISO_8859_1_And_US_ASCII_Common",Tb,{Mh:1,ad:1,d:1,bb:1});Mn.prototype.a=Pn;function On(){nc.call(this);this.Ja=null}On.prototype=new oc;
On.prototype.fh=function(a,b){var c=this.Ja.Oj;if(0===(a.ia-a.n|0))return N().cd;a.Mc;for(;;){if(a.n===a.ia)return N().cd;if(b.n===b.ia)return N().bd;var e=jl(a);if(e<=c)L(b,e<<24>>24);else{if(56320===(64512&e))return E(a,-1+a.n|0),N().Nd;if(55296===(64512&e)){if(a.n!==a.ia)return c=jl(a),E(a,-2+a.n|0),56320===(64512&c)?N().cj:N().Nd;E(a,-1+a.n|0);return N().cd}E(a,-1+a.n|0);return N().bj}}};
On.prototype.a=new w({jq:0},!1,"scala.scalajs.niocharset.ISO_8859_1_And_US_ASCII_Common$Encoder",wc,{jq:1,eg:1,d:1});function Qn(){Qb.call(this);this.Wf=0}Qn.prototype=new Rb;function Rn(){}Rn.prototype=Qn.prototype;Qn.prototype.$e=function(a,b,c){this.Wf=c;Qb.prototype.oh.call(this,a);return this};
Qn.prototype.th=function(){var a=new Sn;if(null===this)throw ff(df(),null);a.Ja=this;nc.prototype.Wi.call(a,this,2,2,2===this.Wf?Pc(O(),(new H).fa([-3,-1]),P().ob):Pc(O(),(new H).fa([-1,-3]),P().ob));a.wg=0===this.Wf;return a};var Tn=new w({Jg:0},!1,"scala.scalajs.niocharset.UTF_16_Common",Tb,{Jg:1,ad:1,d:1,bb:1});Qn.prototype.a=Tn;function Sn(){nc.call(this);this.wg=!1;this.Ja=null}Sn.prototype=new oc;
Sn.prototype.fh=function(a,b){if(this.wg){if(2>(b.ia-b.n|0))return N().bd;L(b,-2);L(b,-1);this.wg=!1}var c=2!==this.Ja.Wf;for(;;){if(0===(a.ia-a.n|0))return N().cd;var e=jl(a);if(56320===(64512&e))return E(a,-1+a.n|0),N().Nd;if(55296!==(64512&e)){if(2>(b.ia-b.n|0))return E(a,-1+a.n|0),N().bd;c?(L(b,e>>8<<24>>24),L(b,e<<24>>24)):(L(b,e<<24>>24),L(b,e>>8<<24>>24))}else{if(1>(a.ia-a.n|0))return E(a,-1+a.n|0),N().cd;var f=jl(a);if(56320!==(64512&f))return E(a,-2+a.n|0),N().Nd;if(4>(b.ia-b.n|0))return E(a,
-2+a.n|0),N().bd;c?(L(b,e>>8<<24>>24),L(b,e<<24>>24)):(L(b,e<<24>>24),L(b,e>>8<<24>>24));c?(L(b,f>>8<<24>>24),L(b,f<<24>>24)):(L(b,f<<24>>24),L(b,f>>8<<24>>24))}}};Sn.prototype.Ui=function(){this.wg=0===this.Ja.Wf};Sn.prototype.a=new w({mq:0},!1,"scala.scalajs.niocharset.UTF_16_Common$Encoder",wc,{mq:1,eg:1,d:1});function Un(){Qb.call(this);this.Ko=null;this.sr=this.tr=0}Un.prototype=new Rb;
Un.prototype.c=function(){Qb.prototype.oh.call(this,"UTF-8",Pc(O(),(new H).fa(["UTF8","unicode-1-1-utf-8"]),Vc(P(),r(la))));Vn=this;this.Ko=ge(O(),-1,(new H).fa([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,-1,-1,-1,-1,-1,-1,-1,-1]));return this};
Un.prototype.th=function(){return(new Wn).c()};Un.prototype.a=new w({pq:0},!1,"scala.scalajs.niocharset.UTF_8$",Tb,{pq:1,ad:1,d:1,bb:1});var Vn=void 0;function ec(){Vn||(Vn=(new Un).c());return Vn}function Wn(){nc.call(this)}Wn.prototype=new oc;Wn.prototype.c=function(){nc.prototype.Vi.call(this,ec(),1.100000023841858);return this};
Wn.prototype.fh=function(a,b){a.Mc;for(;;){if(a.n===a.ia)return N().cd;var c=jl(a);if(128>c){if(b.n===b.ia)return c=N().bd,E(a,-1+a.n|0),c;L(b,c<<24>>24)}else if(2048>c){if(2>(b.ia-b.n|0))return c=N().bd,E(a,-1+a.n|0),c;L(b,(192|c>>6)<<24>>24);L(b,(128|63&c)<<24>>24)}else if(ec(),55296!==(63488&c)){if(3>(b.ia-b.n|0))return c=N().bd,E(a,-1+a.n|0),c;L(b,(224|c>>12)<<24>>24);L(b,(128|63&c>>6)<<24>>24);L(b,(128|63&c)<<24>>24)}else if(55296===(64512&c)){if(a.n===a.ia)return c=N().cd,E(a,-1+a.n|0),c;var e=
jl(a);if(56320!==(64512&e))return c=N().Nd,E(a,-2+a.n|0),c;if(4>(b.ia-b.n|0))return c=N().bd,E(a,-2+a.n|0),c;c=65536+(((1023&c)<<10)+(1023&e)|0)|0;L(b,(240|c>>18)<<24>>24);L(b,(128|63&c>>12)<<24>>24);L(b,(128|63&c>>6)<<24>>24);L(b,(128|63&c)<<24>>24)}else return c=N().Nd,E(a,-1+a.n|0),c}};Wn.prototype.a=new w({qq:0},!1,"scala.scalajs.niocharset.UTF_8$Encoder",wc,{qq:1,eg:1,d:1});function Xn(){this.Jf=null}Xn.prototype=new Ok;Xn.prototype.Se=function(){return(0,this.Jf)()};
function om(a){var b=new Xn;b.Jf=a;return b}Xn.prototype.a=new w({rq:0},!1,"scala.scalajs.runtime.AnonFunction0",Pk,{rq:1,Nh:1,d:1,di:1});function K(){this.Jf=null}K.prototype=new Rk;K.prototype.r=function(a){return(0,this.Jf)(a)};function $b(a,b){a.Jf=b;return a}K.prototype.a=new w({sq:0},!1,"scala.scalajs.runtime.AnonFunction1",Sk,{sq:1,Oh:1,d:1,y:1});function R(){this.q=this.x=this.E=0}R.prototype=new Me;function vk(a,b){return(new R).A(a.E|b.E,a.x|b.x,a.q|b.q)}l=R.prototype;
l.wa=function(a){return va(a)?Ga(this,a):!1};
function Rj(a,b){var c=8191&a.E,e=a.E>>13|(15&a.x)<<9,f=8191&a.x>>4,h=a.x>>17|(255&a.q)<<5,k=(1048320&a.q)>>8;c|=0;e|=0;f|=0;h|=0;k|=0;var m=8191&b.E,t=b.E>>13|(15&b.x)<<9,q=8191&b.x>>4,u=b.x>>17|(255&b.q)<<5,A=(1048320&b.q)>>8;var m=m|0,t=t|0,q=q|0,x=u|0,G=A|0,Ma=D(c,m),eb=D(e,m),A=D(f,m),u=D(h,m),k=D(k,m);0!==t&&(eb=eb+D(c,t)|0,A=A+D(e,t)|0,u=u+D(f,t)|0,k=k+D(h,t)|0);0!==q&&(A=A+D(c,q)|0,u=u+D(e,q)|0,k=k+D(f,q)|0);0!==x&&(u=u+D(c,x)|0,k=k+D(e,x)|0);0!==G&&(k=k+D(c,G)|0);c=(4194303&Ma)+((511&eb)<<
13)|0;e=((((Ma>>22)+(eb>>9)|0)+((262143&A)<<4)|0)+((31&u)<<17)|0)+(c>>22)|0;return(new R).A(4194303&c,4194303&e,1048575&((((A>>18)+(u>>5)|0)+((4095&k)<<8)|0)+(e>>22)|0))}l.A=function(a,b,c){this.E=a;this.x=b;this.q=c;return this};
l.w=function(){if(0===this.E&&0===this.x&&0===this.q)return"0";if(Ga(this,v().ne))return"-9223372036854775808";if(0!==(524288&this.q))return"-"+Bk(this).w();var a=v().si,b=this,c="";for(;;){var e=b;if(0===e.E&&0===e.x&&0===e.q)return c;e=qd(b,a);b=e[0];e=""+rd(e[1]);c=(0===b.E&&0===b.x&&0===b.q?"":"000000000".substring(e.length|0))+e+c}};
function qd(a,b){if(0===b.E&&0===b.x&&0===b.q)throw(new Yn).k("/ by zero");if(0===a.E&&0===a.x&&0===a.q)return[v().hc,v().hc];if(Ga(b,v().ne))return Ga(a,v().ne)?[v().Wg,v().hc]:[v().hc,a];var c=0!==(524288&a.q),e=0!==(524288&b.q),f=Ga(a,v().ne),h=0===b.q&&0===b.x&&0!==b.E&&0===(b.E&(-1+b.E|0))?Ie(Ke(),b.E):0===b.q&&0!==b.x&&0===b.E&&0===(b.x&(-1+b.x|0))?22+Ie(Ke(),b.x)|0:0!==b.q&&0===b.x&&0===b.E&&0===(b.q&(-1+b.q|0))?44+Ie(Ke(),b.q)|0:-1;if(0<=h){if(f)return c=Zn(a,h),[e?Bk(c):c,v().hc];var f=0!==
(524288&a.q)?Bk(a):a,k=Zn(f,h),e=c!==e?Bk(k):k,f=22>=h?(new R).A(f.E&(-1+(1<<h)|0),0,0):44>=h?(new R).A(f.E,f.x&(-1+(1<<(-22+h|0))|0),0):(new R).A(f.E,f.x,f.q&(-1+(1<<(-44+h|0))|0)),c=c?Bk(f):f;return[e,c]}h=0!==(524288&b.q)?Bk(b):b;if(f)var m=v().Vg;else{var t=0!==(524288&a.q)?Bk(a):a;if(Ha(h,t))return[v().hc,a];m=t}var t=$n(h)-$n(m)|0,q=vd(h,t),h=t,t=q,q=m,m=v().hc;a:for(;;){if(0>h)var u=!0;else u=q,u=0===u.E&&0===u.x&&0===u.q;if(u){var A=m,k=q;break a}else u=sd(q,Bk(t)),0===(524288&u.q)?(q=-1+
h|0,t=Zn(t,1),m=22>h?(new R).A(m.E|1<<h,m.x,m.q):44>h?(new R).A(m.E,m.x|1<<(-22+h|0),m.q):(new R).A(m.E,m.x,m.q|1<<(-44+h|0)),h=q,q=u):(h=-1+h|0,t=Zn(t,1))}e=c!==e?Bk(A):A;c&&f?(c=Bk(k),f=v().Wg,c=sd(c,Bk(f))):c=c?Bk(k):k;return[e,c]}function wk(a,b){return(new R).A(a.E&b.E,a.x&b.x,a.q&b.q)}
function wd(a,b){var c=63&b;if(22>c){var e=22-c|0;return(new R).A(4194303&(a.E>>c|a.x<<e),4194303&(a.x>>c|a.q<<e),1048575&(a.q>>>c|0))}return 44>c?(e=-22+c|0,(new R).A(4194303&(a.x>>e|a.q<<(44-c|0)),4194303&(a.q>>>e|0),0)):(new R).A(4194303&(a.q>>>(-44+c|0)|0),0,0)}function Ha(a,b){return 0===(524288&a.q)?0!==(524288&b.q)||a.q>b.q||a.q===b.q&&a.x>b.x||a.q===b.q&&a.x===b.x&&a.E>b.E:!(0===(524288&b.q)||a.q<b.q||a.q===b.q&&a.x<b.x||a.q===b.q&&a.x===b.x&&a.E<=b.E)}
function vd(a,b){var c=63&b;if(22>c){var e=22-c|0;return(new R).A(4194303&a.E<<c,4194303&(a.x<<c|a.E>>e),1048575&(a.q<<c|a.x>>e))}return 44>c?(e=-22+c|0,(new R).A(0,4194303&a.E<<e,1048575&(a.x<<e|a.E>>(44-c|0)))):(new R).A(0,0,1048575&a.E<<(-44+c|0))}function rd(a){return a.E|a.x<<22}l.la=function(a){R.prototype.A.call(this,4194303&a,4194303&a>>22,0>a?1048575:0);return this};
function Bk(a){var b=4194303&(1+~a.E|0),c=4194303&(~a.x+(0===b?1:0)|0);return(new R).A(b,c,1048575&(~a.q+(0===b&&0===c?1:0)|0))}function sd(a,b){var c=a.E+b.E|0,e=(a.x+b.x|0)+(c>>22)|0;return(new R).A(4194303&c,4194303&e,1048575&((a.q+b.q|0)+(e>>22)|0))}
function Zn(a,b){var c=63&b,e=0!==(524288&a.q),f=e?-1048576|a.q:a.q;if(22>c)return e=22-c|0,(new R).A(4194303&(a.E>>c|a.x<<e),4194303&(a.x>>c|f<<e),1048575&f>>c);if(44>c){var h=-22+c|0;return(new R).A(4194303&(a.x>>h|f<<(44-c|0)),4194303&f>>h,1048575&(e?1048575:0))}return(new R).A(4194303&f>>(-44+c|0),4194303&(e?4194303:0),1048575&(e?1048575:0))}function yf(a){return Ga(a,v().ne)?-9223372036854775E3:0!==(524288&a.q)?-yf(Bk(a)):a.E+4194304*a.x+17592186044416*a.q}
function Qj(a){return qd(a,(new R).A(1E3,0,0))[0]}function $n(a){return 0!==a.q?-12+He(Ke(),a.q)|0:0!==a.x?10+He(Ke(),a.x)|0:32+He(Ke(),a.E)|0}l.Ba=function(){return rd(xk(this,wd(this,32)))};function xk(a,b){return(new R).A(a.E^b.E,a.x^b.x,a.q^b.q)}function Ga(a,b){return a.E===b.E&&a.x===b.x&&a.q===b.q}function va(a){return!!(a&&a.a&&a.a.u.Bk)}l.a=new w({Bk:0},!1,"scala.scalajs.runtime.RuntimeLong",Oe,{Bk:1,yd:1,d:1,bb:1});var jh=new w({Bq:0},!1,"scala.runtime.Nothing$",gf,{Bq:1,Aa:1,d:1,f:1});
function ao(){this.vi=this.Af=0;this.Kk=null}ao.prototype=new ii;ao.prototype.Y=function(){var a=this.Kk.Xd(this.Af);this.Af=1+this.Af|0;return a};function we(a){var b=new ao;b.Kk=a;b.Af=0;b.vi=a.Wd();return b}ao.prototype.ea=function(){return this.Af<this.vi};ao.prototype.a=new w({Fq:0},!1,"scala.runtime.ScalaRunTime$$anon$1",ti,{Fq:1,Gb:1,d:1,Sb:1,t:1,s:1});function bo(){U.call(this)}bo.prototype=new vl;function co(){}co.prototype=bo.prototype;
bo.prototype.c=function(){bo.prototype.Rc.call(this,null,null);return this};var eo=new w({dg:0},!1,"java.io.IOException",wl,{dg:1,Pa:1,Aa:1,d:1,f:1});bo.prototype.a=eo;function fo(){this.tj=null;this.Yl=!1;this.Kr=this.$l=null;this.Gr=this.qm=this.Jm=this.bm=!1}fo.prototype=new dl;function go(){}go.prototype=fo.prototype;fo.prototype.kg=function(a){a=null===a?"null":ja(a);ho(this,null===a?"null":a);return this};function bn(a){Dl||(Dl=(new Cl).c());var b=Dl.uj.Uh.ue();ho(b,Dk(s(),a));ho(b,"\n")}
fo.prototype.Bm=function(a,b,c){this.Yl=b;this.$l=c;cl.prototype.nh.call(this,a);this.qm=this.Jm=this.bm=!1;return this};fo.prototype.jg=function(a){s();a=(new Q).xa(a).Ia;a=n.String.fromCharCode(a);ho(this,a);return this};fo.prototype.nh=function(a){fo.prototype.Bm.call(this,a,!1,null);return this};var io=new w({fi:0},!1,"java.io.PrintStream",el,{fi:1,Rg:1,pf:1,d:1,Re:1,of:1,tg:1});fo.prototype.a=io;function Db(){Eb.call(this);this.nf=!1}Db.prototype=new fl;
function sc(a,b,c,e){if(0>c||0>e||(c+e|0)>b.b.length)throw(new I).c();if(a.nf)throw(new qc).c();var f=a.n,h=f+e|0;if(h>a.ia)throw(new rc).c();Ka(b,c,a.Mc,f+a.he|0,e);E(a,h)}function tc(a){if(a.n===a.ia)throw(new zc).c();var b=a.n;E(a,1+b|0);return a.Mc.b[a.he+b|0]}function L(a,b){if(a.nf)throw(new qc).c();if(a.n===a.ia)throw(new rc).c();var c=a.n;a.Mc.b[a.he+c|0]=b;E(a,1+c|0)}Db.prototype.a=new w({gl:0},!1,"java.nio.HeapByteBuffer",gl,{gl:1,Sg:1,qf:1,d:1,bb:1});
function jo(){hl.call(this);this.lf=null;this.mf=0}jo.prototype=new il;jo.prototype.Qh=function(a,b){if(0>a||b<a||b>(this.ia-this.n|0))throw(new I).c();return Mb(this.ie,this.lf,this.mf,this.n+a|0,this.n+b|0)};function jl(a){if(a.n===a.ia)throw(new zc).c();var b=a.n;E(a,1+b|0);return Ia(a.lf,a.mf+b|0)}function Mb(a,b,c,e,f){var h=new jo;h.lf=b;h.mf=c;hl.prototype.la.call(h,a);E(h,e);xb(h,f);return h}jo.prototype.w=function(){var a=this.mf;return ja(Ja(this.lf,this.n+a|0,this.ia+a|0))};
jo.prototype.a=new w({jl:0},!1,"java.nio.StringCharBuffer",kl,{jl:1,Tg:1,qf:1,d:1,bb:1,ug:1,tg:1,bn:1});function ko(){U.call(this)}ko.prototype=new sl;function oe(a){var b=new ko;rl.prototype.Fm.call(b,a);return b}ko.prototype.a=new w({ml:0},!1,"java.nio.charset.CoderMalfunctionError",tl,{ml:1,qh:1,Aa:1,d:1,f:1});function te(){U.call(this)}te.prototype=new sl;te.prototype.ha=function(a){te.prototype.k.call(this,ja(a));return this};
te.prototype.a=new w({Nm:0},!1,"java.lang.AssertionError",tl,{Nm:1,qh:1,Aa:1,d:1,f:1});function lo(){U.call(this)}lo.prototype=new vl;function mo(){}mo.prototype=lo.prototype;lo.prototype.c=function(){lo.prototype.Rc.call(this,null,null);return this};lo.prototype.k=function(a){lo.prototype.Rc.call(this,a,null);return this};var no=new w({lb:0},!1,"java.lang.RuntimeException",wl,{lb:1,Pa:1,Aa:1,d:1,f:1});lo.prototype.a=no;function Bh(){Nl.call(this)}Bh.prototype=new Ol;
Bh.prototype.c=function(){Nl.prototype.Lf.call(this,gh().Bg,"Any");return this};Bh.prototype.qb=function(a){return this.Ad(a)};Bh.prototype.Ad=function(a){return p(B(z),[a])};Bh.prototype.a=new w({Un:0},!1,"scala.reflect.ManifestFactory$$anon$1",Pl,{Un:1,df:1,Fe:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function Ch(){Nl.call(this)}Ch.prototype=new Ol;Ch.prototype.c=function(){Nl.prototype.Lf.call(this,gh().Bg,"Object");return this};Ch.prototype.qb=function(a){return this.Ad(a)};
Ch.prototype.Ad=function(a){return p(B(z),[a])};Ch.prototype.a=new w({$n:0},!1,"scala.reflect.ManifestFactory$$anon$2",Pl,{$n:1,df:1,Fe:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function Dh(){Nl.call(this)}Dh.prototype=new Ol;Dh.prototype.c=function(){Nl.prototype.Lf.call(this,gh().Bg,"AnyVal");return this};Dh.prototype.qb=function(a){return this.Ad(a)};Dh.prototype.Ad=function(a){return p(B(z),[a])};
Dh.prototype.a=new w({ao:0},!1,"scala.reflect.ManifestFactory$$anon$3",Pl,{ao:1,df:1,Fe:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function Eh(){Nl.call(this)}Eh.prototype=new Ol;Eh.prototype.c=function(){Nl.prototype.Lf.call(this,gh().Nj,"Null");return this};Eh.prototype.qb=function(a){return this.Ad(a)};Eh.prototype.Ad=function(a){return p(B(z),[a])};Eh.prototype.a=new w({bo:0},!1,"scala.reflect.ManifestFactory$$anon$4",Pl,{bo:1,df:1,Fe:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});
function Fh(){Nl.call(this)}Fh.prototype=new Ol;Fh.prototype.c=function(){Nl.prototype.Lf.call(this,gh().Mj,"Nothing");return this};Fh.prototype.qb=function(a){return this.Ad(a)};Fh.prototype.Ad=function(a){return p(B(z),[a])};Fh.prototype.a=new w({co:0},!1,"scala.reflect.ManifestFactory$$anon$5",Pl,{co:1,df:1,Fe:1,d:1,Xb:1,Eb:1,Qb:1,Fb:1,g:1,f:1,p:1});function Oh(){Ye.call(this);this.Xh=null}Oh.prototype=new xl;
Oh.prototype.a=new w({lo:0},!1,"scala.util.DynamicVariable$$anon$1",yl,{lo:1,lj:1,rh:1,d:1});function oo(){}oo.prototype=new Ul;function po(){}l=po.prototype=oo.prototype;
l.wa=function(a){if(a&&a.a&&a.a.u.zh){var b;if(!(b=this===a)&&(b=this.na()===a.na()))try{for(var c=this.ma(),e=!0;e&&c.ea();){var f=c.Y();if(null!==f){var h=f.md,k=pe(a,f.Ed);b:{if(le(k)){var m=k.fe;if(T(S(),h,m)){e=!0;break b}}e=!1}}else throw(new M).ha(f);}b=e}catch(t){if(t&&t.a&&t.a.u.Rm)bn("class cast "),b=!1;else throw t;}a=b}else a=!1;return a};l.m=function(){return 0===this.na()};l.w=function(){return Lj(this)};l.pc=function(){var a=(new cm).la(this.na()),b=this.Ca();dm(a,b);return a};
l.oe=function(a,b,c,e){return um(this,a,b,c,e)};l.Ba=function(){var a=ai();return Zh(a,this,a.qj)};l.Cc=g("Map");var qo=new w({yh:0},!1,"scala.collection.AbstractMap",Zl,{yh:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,Kj:1,zh:1,Jj:1,Lj:1,Ma:1,y:1,ib:1});oo.prototype.a=qo;function ro(){}ro.prototype=new Ul;function so(){}l=so.prototype=ro.prototype;l.wa=function(a){return lb(a)?this.Ic(a):!1};l.m=function(){return 0===this.Uc(0)};l.w=function(){return Lj(this)};
l.na=function(){return this.j()};l.Kc=function(){return this};l.Ba=function(){return Sl(ai(),this.Bd())};var to=new w({Xa:0},!1,"scala.collection.AbstractSeq",Zl,{Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1});ro.prototype.a=to;function uo(){}uo.prototype=new Ul;function vo(){}l=vo.prototype=uo.prototype;l.m=function(){return 0===this.na()};l.wa=function(a){return $l(this,a)};l.w=function(){return Lj(this)};l.Rh=function(a){return this.Kf(a)};
l.pc=function(){return vm(this)};l.Ba=function(){var a=ai();return Zh(a,this.Me(),a.Lh)};l.ga=function(){return Od(new Pd,this.re())};l.Cc=g("Set");var wo=new w({jc:0},!1,"scala.collection.AbstractSet",Zl,{jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1});uo.prototype.a=wo;function Ig(){this.sa=null}Ig.prototype=new Dm;Ig.prototype.ga=function(){xo||(xo=(new yo).c());return(new Qi).c()};
Ig.prototype.a=new w({zo:0},!1,"scala.collection.Iterable$",Fm,{zo:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var Hg=void 0;function Gg(){this.Zl=this.sa=null}Gg.prototype=new Dm;Gg.prototype.c=function(){Cm.prototype.c.call(this);Fg=this;this.Zl=(new Qh).c();return this};Gg.prototype.ga=function(){zo||(zo=(new Ao).c());return(new Qi).c()};Gg.prototype.a=new w({Io:0},!1,"scala.collection.Traversable$",Fm,{Io:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var Fg=void 0;function Bo(){this.sa=null}Bo.prototype=new Dm;
function Co(){}Co.prototype=Bo.prototype;var Do=new w({mc:0},!1,"scala.collection.generic.GenSeqFactory",Fm,{mc:1,Ab:1,Ha:1,d:1});Bo.prototype.a=Do;function Eo(){}Eo.prototype=new Im;function Fo(){}Fo.prototype=Eo.prototype;var Go=new w({Qj:0},!1,"scala.collection.generic.ImmutableMapFactory",Jm,{Qj:1,Ch:1,Cg:1,d:1});Eo.prototype.a=Go;function Ho(){}Ho.prototype=new Am;function Io(){}Io.prototype=Ho.prototype;var Jo=new w({Ie:0},!1,"scala.collection.generic.SetFactory",Bm,{Ie:1,ae:1,Ha:1,d:1,eb:1});
Ho.prototype.a=Jo;function Ko(){Sm.call(this)}Ko.prototype=new Tm;Ko.prototype.a=new w({So:0},!1,"scala.collection.immutable.HashSet$HashTrieSet$$anon$1",Wm,{So:1,Yj:1,Gb:1,d:1,Sb:1,t:1,s:1});function yo(){this.sa=null}yo.prototype=new Dm;yo.prototype.ga=function(){return(new Qi).c()};yo.prototype.a=new w({Vo:0},!1,"scala.collection.immutable.Iterable$",Fm,{Vo:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var xo=void 0;function Ao(){this.sa=null}Ao.prototype=new Dm;Ao.prototype.ga=function(){return(new Qi).c()};
Ao.prototype.a=new w({up:0},!1,"scala.collection.immutable.Traversable$",Fm,{up:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var zo=void 0;function Lo(){}Lo.prototype=new Ul;function Mo(){}Mo.prototype=Lo.prototype;var No=new w({Gh:0},!1,"scala.collection.mutable.AbstractIterable",Zl,{Gh:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,tb:1,ub:1,rb:1});Lo.prototype.a=No;function Oo(){this.sa=null}Oo.prototype=new Dm;Oo.prototype.ga=function(){return(new cm).c()};
Oo.prototype.a=new w({Rp:0},!1,"scala.collection.mutable.Iterable$",Fm,{Rp:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var Po=void 0;function bc(){Mn.call(this)}bc.prototype=new Nn;bc.prototype.c=function(){Mn.prototype.$e.call(this,"ISO-8859-1",Pc(O(),(new H).fa("csISOLatin1 IBM-819 iso-ir-100 8859_1 ISO_8859-1 l1 ISO8859-1 ISO_8859_1 cp819 ISO8859_1 latin1 ISO_8859-1:1987 819 IBM819".split(" ")),Vc(P(),r(la))),255);ac=this;return this};
bc.prototype.a=new w({iq:0},!1,"scala.scalajs.niocharset.ISO_8859_1$",Pn,{iq:1,Mh:1,ad:1,d:1,bb:1});var ac=void 0;function dc(){Mn.call(this)}dc.prototype=new Nn;dc.prototype.c=function(){Mn.prototype.$e.call(this,"US-ASCII",Pc(O(),(new H).fa("cp367 ascii7 ISO646-US 646 csASCII us iso_646.irv:1983 ISO_646.irv:1991 IBM367 ASCII default ANSI_X3.4-1986 ANSI_X3.4-1968 iso-ir-6".split(" ")),Vc(P(),r(la))),127);cc=this;return this};
dc.prototype.a=new w({kq:0},!1,"scala.scalajs.niocharset.US_ASCII$",Pn,{kq:1,Mh:1,ad:1,d:1,bb:1});var cc=void 0;function kc(){Qn.call(this)}kc.prototype=new Rn;kc.prototype.c=function(){Qn.prototype.$e.call(this,"UTF-16",Pc(O(),(new H).fa(["utf16","UTF_16","UnicodeBig","unicode"]),Vc(P(),r(la))),0);jc=this;return this};kc.prototype.a=new w({lq:0},!1,"scala.scalajs.niocharset.UTF_16$",Tn,{lq:1,Jg:1,ad:1,d:1,bb:1});var jc=void 0;function gc(){Qn.call(this)}gc.prototype=new Rn;
gc.prototype.c=function(){Qn.prototype.$e.call(this,"UTF-16BE",Pc(O(),(new H).fa(["X-UTF-16BE","UTF_16BE","ISO-10646-UCS-2","UnicodeBigUnmarked"]),Vc(P(),r(la))),1);fc=this;return this};gc.prototype.a=new w({nq:0},!1,"scala.scalajs.niocharset.UTF_16BE$",Tn,{nq:1,Jg:1,ad:1,d:1,bb:1});var fc=void 0;function ic(){Qn.call(this)}ic.prototype=new Rn;
ic.prototype.c=function(){Qn.prototype.$e.call(this,"UTF-16LE",Pc(O(),(new H).fa(["UnicodeLittleUnmarked","UTF_16LE","X-UTF-16LE"]),Vc(P(),r(la))),2);hc=this;return this};ic.prototype.a=new w({oq:0},!1,"scala.scalajs.niocharset.UTF_16LE$",Tn,{oq:1,Jg:1,ad:1,d:1,bb:1});var hc=void 0;function rc(){U.call(this)}rc.prototype=new mo;rc.prototype.a=new w({gi:0},!1,"java.nio.BufferOverflowException",no,{gi:1,lb:1,Pa:1,Aa:1,d:1,f:1});function zc(){U.call(this)}zc.prototype=new mo;
zc.prototype.a=new w({hi:0},!1,"java.nio.BufferUnderflowException",no,{hi:1,lb:1,Pa:1,Aa:1,d:1,f:1});function Qo(){U.call(this)}Qo.prototype=new co;function Ro(){}Ro.prototype=Qo.prototype;var So=new w({Ug:0},!1,"java.nio.charset.CharacterCodingException",eo,{Ug:1,dg:1,Pa:1,Aa:1,d:1,f:1});Qo.prototype.a=So;function Yn(){U.call(this)}Yn.prototype=new mo;Yn.prototype.a=new w({Mm:0},!1,"java.lang.ArithmeticException",no,{Mm:1,lb:1,Pa:1,Aa:1,d:1,f:1});function F(){U.call(this)}F.prototype=new mo;
function To(){}To.prototype=F.prototype;F.prototype.c=function(){F.prototype.Rc.call(this,null,null);return this};F.prototype.k=function(a){F.prototype.Rc.call(this,a,null);return this};var Uo=new w({Od:0},!1,"java.lang.IllegalArgumentException",no,{Od:1,lb:1,Pa:1,Aa:1,d:1,f:1});F.prototype.a=Uo;function ne(){U.call(this)}ne.prototype=new mo;function Vo(){}Vo.prototype=ne.prototype;ne.prototype.c=function(){ne.prototype.Rc.call(this,null,null);return this};
var Wo=new w({jj:0},!1,"java.lang.IllegalStateException",no,{jj:1,lb:1,Pa:1,Aa:1,d:1,f:1});ne.prototype.a=Wo;function I(){U.call(this)}I.prototype=new mo;function Xo(){}Xo.prototype=I.prototype;I.prototype.c=function(){I.prototype.k.call(this,null);return this};var Yo=new w({kj:0},!1,"java.lang.IndexOutOfBoundsException",no,{kj:1,lb:1,Pa:1,Aa:1,d:1,f:1});I.prototype.a=Yo;function Zo(){fo.call(this);this.Yi=null;this.kh=!1;this.yf=null}Zo.prototype=new go;
function We(a){var b=new Zo;b.Yi=a;fo.prototype.nh.call(b,(new zl).c());b.kh=!0;b.yf="";return b}function ho(a,b){for(var c=b;""!==c;){var e=c.indexOf("\n")|0;if(0>e)a.yf=""+a.yf+c,a.kh=!1,c="";else{var f=""+a.yf+c.substring(0,e);n.console&&(a.Yi&&n.console.error?n.console.error(f):n.console.log(f));a.yf="";a.kh=!0;c=c.substring(1+e|0)}}}Zo.prototype.lg=aa();Zo.prototype.a=new w({Xm:0},!1,"java.lang.JSConsoleBasedPrintStream",io,{Xm:1,fi:1,Rg:1,pf:1,d:1,Re:1,of:1,tg:1});
function ua(){U.call(this)}ua.prototype=new mo;ua.prototype.c=function(){ua.prototype.k.call(this,null);return this};ua.prototype.a=new w({$m:0},!1,"java.lang.NullPointerException",no,{$m:1,lb:1,Pa:1,Aa:1,d:1,f:1});function re(){U.call(this)}re.prototype=new mo;function $o(){}$o.prototype=re.prototype;re.prototype.c=function(){re.prototype.Rc.call(this,null,null);return this};re.prototype.k=function(a){re.prototype.Rc.call(this,a,null);return this};
var ap=new w({mj:0},!1,"java.lang.UnsupportedOperationException",no,{mj:1,lb:1,Pa:1,Aa:1,d:1,f:1});re.prototype.a=ap;function Ek(){U.call(this)}Ek.prototype=new mo;Ek.prototype.a=new w({qn:0},!1,"java.util.NoSuchElementException",no,{qn:1,lb:1,Pa:1,Aa:1,d:1,f:1});function M(){U.call(this);this.rj=this.Rf=null;this.Zg=!1}M.prototype=new mo;
M.prototype.te=function(){if(!this.Zg&&!this.Zg){var a;if(null===this.Rf)a="null";else try{a=ja(this.Rf)+" ("+("of class "+jb(ka(this.Rf)))+")"}catch(b){if(null!==cf(df(),b))a="an instance of class "+jb(ka(this.Rf));else throw b;}this.rj=a;this.Zg=!0}return this.rj};M.prototype.ha=function(a){this.Rf=a;lo.prototype.c.call(this);return this};M.prototype.a=new w({yn:0},!1,"scala.MatchError",no,{yn:1,lb:1,Pa:1,Aa:1,d:1,f:1});function bp(){}bp.prototype=new Io;function cp(){}cp.prototype=bp.prototype;
bp.prototype.We=function(){return this.og()};bp.prototype.ga=function(){return Od(new Pd,this.og())};var dp=new w({Eg:0},!1,"scala.collection.generic.ImmutableSetFactory",Jo,{Eg:1,Ie:1,ae:1,Ha:1,d:1,eb:1});bp.prototype.a=dp;function ep(){}ep.prototype=new Io;function fp(){}fp.prototype=ep.prototype;ep.prototype.ga=function(){return Yj(new Xj,(new Si).c())};var gp=new w({Rj:0},!1,"scala.collection.generic.MutableSetFactory",Jo,{Rj:1,Ie:1,ae:1,Ha:1,d:1,eb:1});ep.prototype.a=gp;
function hp(){this.sa=null}hp.prototype=new Co;function ip(){}ip.prototype=hp.prototype;var jp=new w({yc:0},!1,"scala.collection.generic.SeqFactory",Do,{yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});hp.prototype.a=jp;function kp(){}kp.prototype=new vo;function lp(){}l=lp.prototype=kp.prototype;l.Ca=function(){return this};l.bg=function(a,b){return mp(a,b)};l.c=function(){return this};l.r=function(a){return this.Kb(a)};function np(a,b){return a.bg(b,op(Sb(J(),b)),0)}l.vb=function(){return this};l.wb=function(){return pp()};
l.qa=aa();l.Rh=function(a){if(a&&a.a&&a.a.u.Ke)return this.$f(a,0);var b=this.ma();return Wl(b,a)};l.na=g(0);l.ma=function(){return Jg().Nb};l.re=function(){return qp()};function op(a){a=a+~(a<<9)|0;a^=a>>>14|0;a=a+(a<<4)|0;return a^(a>>>10|0)}l.Me=function(){return this};l.Kb=function(a){return this.Md(a,op(Sb(J(),a)),0)};l.$c=function(a){return np(this,a)};l.Md=g(!1);l.$f=g(!0);
var rp=new w({Ke:0},!1,"scala.collection.immutable.HashSet",wo,{Ke:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,sb:1,g:1,f:1});kp.prototype.a=rp;function sp(){}sp.prototype=new so;function tp(){}l=tp.prototype=sp.prototype;l.Ca=function(){return this};l.c=function(){return this};l.Uc=function(a){return 0>a?1:sm(this,a)};l.r=function(a){return rm(this,a|0)};l.Ic=function(a){return tm(this,a)};l.Lc=function(){return this};
l.vb=function(){return this};l.Ii=function(a){return up(this,a)};l.wb=function(){return be()};l.qa=function(a){for(var b=this;!b.m();)a.r(b.ya()),b=b.ua()};l.ma=function(){var a=new qm;if(null===this)throw ff(df(),null);a.Na=this;a.Cb=this;return a};function up(a,b){for(var c=a,e=b;!c.m()&&0<e;)c=c.ua(),e=-1+e|0;return c}l.Bd=function(){return this};l.j=function(){for(var a=this,b=0;!a.m();)b=1+b|0,a=a.ua();return b};
l.jf=function(a,b){var c;if(b===be().sa)if(c=a.Ca().Lc(),c.m())c=this;else{if(!this.m()){var e=Pi((new Qi).c(),this);e.Ga.m()||(e.If&&vp(e),e.Rd.ce=c,c=e.Lc())}}else c=wi(this,a,b);return c};l.Ib=function(){return this.m()?pm():mm(new nm,this.ya(),om(function(a){return function(){return a.ua().Ib()}}(this)))};l.Kc=function(){return this};l.Ba=function(){return Sl(ai(),this)};
l.Zc=function(a){a:{var b=up(this,a);a=this;for(;;){var c=Kg();if(null===c?null===b:c.wa(b))break a;if(b&&b.a&&b.a.u.Sj)b=b.ce,a=a.ua();else throw(new M).ha(b);}a=void 0}return a};function wp(a){for(var b=Kg();!a.m();){var c=a.ya(),b=ol(new pl,c,b);a=a.ua()}return b}l.Cc=g("List");
var xp=new w({Gg:0},!1,"scala.collection.immutable.List",to,{Gg:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,Yf:1,Le:1,jb:1,nb:1,mb:1,Ge:1,Tf:1,Zd:1,Uf:1,f:1});sp.prototype.a=xp;function yp(){}yp.prototype=new vo;function zp(){}l=zp.prototype=yp.prototype;l.Ca=function(){return this};l.c=function(){return this};l.ya=function(){throw(new Ek).k("Set has no elements");};l.r=function(a){return this.Kb(a)};l.m=g(!0);l.vb=function(){return this};
l.Ah=function(){throw(new Ek).k("Empty ListSet has no outer pointer");};l.wb=function(){Ap||(Ap=(new Bp).c());return Ap};l.kf=function(a){return Ti(this,a)};l.na=g(0);l.ma=function(){return(new Km).bf(this)};l.re=function(){return Ni()};l.Me=function(){return this};l.Kb=g(!1);l.$c=function(a){return this.kf(a)};l.Ek=function(){throw(new Ek).k("Next of an empty set");};l.Cc=g("ListSet");
var Cp=new w({Eh:0},!1,"scala.collection.immutable.ListSet",wo,{Eh:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,g:1,f:1});yp.prototype.a=Cp;function Jl(){}Jl.prototype=new Fo;Jl.prototype.a=new w({cp:0},!1,"scala.collection.immutable.Map$",Go,{cp:1,Qj:1,Ch:1,Cg:1,d:1});var Il=void 0;function Dp(){}Dp.prototype=new vo;l=Dp.prototype;l.Ca=function(){return this};l.c=function(){Ep=this;return this};l.r=g(!1);
l.vb=function(){return this};l.wb=function(){return Kl()};l.qa=aa();l.na=g(0);l.ma=function(){return Jg().Nb};l.re=function(){return Nd()};l.Me=function(){return this};l.$c=function(a){return(new Fp).ha(a)};l.a=new w({hp:0},!1,"scala.collection.immutable.Set$EmptySet$",wo,{hp:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,g:1,f:1});var Ep=void 0;function Nd(){Ep||(Ep=(new Dp).c());return Ep}
function Fp(){this.Oa=null}Fp.prototype=new vo;l=Fp.prototype;l.Ca=function(){return this};l.r=function(a){return this.Kb(a)};l.vb=function(){return this};l.wb=function(){return Kl()};l.Kf=function(a){return!!a.r(this.Oa)};l.qa=function(a){a.r(this.Oa)};l.na=g(1);l.ha=function(a){this.Oa=a;return this};l.ma=function(){Jg();var a=(new H).fa([this.Oa]);return hj(new X,a,0,a.h.length|0)};l.re=function(){return Nd()};l.ge=function(a){return this.Kb(a)?this:(new Gp).Ze(this.Oa,a)};l.Me=function(){return this};
l.Kb=function(a){return T(S(),a,this.Oa)};l.$c=function(a){return this.ge(a)};l.a=new w({ip:0},!1,"scala.collection.immutable.Set$Set1",wo,{ip:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,g:1,f:1});function Gp(){this.yb=this.Oa=null}Gp.prototype=new vo;l=Gp.prototype;l.Ca=function(){return this};l.r=function(a){return this.Kb(a)};l.vb=function(){return this};l.Ze=function(a,b){this.Oa=a;this.yb=b;return this};
l.wb=function(){return Kl()};l.Kf=function(a){return!!a.r(this.Oa)&&!!a.r(this.yb)};l.qa=function(a){a.r(this.Oa);a.r(this.yb)};l.na=g(2);l.ma=function(){Jg();var a=(new H).fa([this.Oa,this.yb]);return hj(new X,a,0,a.h.length|0)};l.re=function(){return Nd()};l.ge=function(a){if(this.Kb(a))a=this;else{var b=this.yb,c=new Hp;c.Oa=this.Oa;c.yb=b;c.sc=a;a=c}return a};l.Me=function(){return this};l.Kb=function(a){return T(S(),a,this.Oa)||T(S(),a,this.yb)};l.$c=function(a){return this.ge(a)};
l.a=new w({jp:0},!1,"scala.collection.immutable.Set$Set2",wo,{jp:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,g:1,f:1});function Hp(){this.sc=this.yb=this.Oa=null}Hp.prototype=new vo;l=Hp.prototype;l.Ca=function(){return this};l.r=function(a){return this.Kb(a)};l.vb=function(){return this};l.wb=function(){return Kl()};l.Kf=function(a){return!!a.r(this.Oa)&&!!a.r(this.yb)&&!!a.r(this.sc)};
l.qa=function(a){a.r(this.Oa);a.r(this.yb);a.r(this.sc)};l.na=g(3);l.ma=function(){Jg();var a=(new H).fa([this.Oa,this.yb,this.sc]);return hj(new X,a,0,a.h.length|0)};l.re=function(){return Nd()};l.ge=function(a){if(this.Kb(a))a=this;else{var b=this.yb,c=this.sc,e=new Ip;e.Oa=this.Oa;e.yb=b;e.sc=c;e.Ve=a;a=e}return a};l.Me=function(){return this};l.Kb=function(a){return T(S(),a,this.Oa)||T(S(),a,this.yb)||T(S(),a,this.sc)};l.$c=function(a){return this.ge(a)};
l.a=new w({kp:0},!1,"scala.collection.immutable.Set$Set3",wo,{kp:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,g:1,f:1});function Ip(){this.Ve=this.sc=this.yb=this.Oa=null}Ip.prototype=new vo;l=Ip.prototype;l.Ca=function(){return this};l.r=function(a){return this.Kb(a)};l.vb=function(){return this};l.wb=function(){return Kl()};l.Kf=function(a){return!!a.r(this.Oa)&&!!a.r(this.yb)&&!!a.r(this.sc)&&!!a.r(this.Ve)};
l.qa=function(a){a.r(this.Oa);a.r(this.yb);a.r(this.sc);a.r(this.Ve)};l.na=g(4);l.ma=function(){Jg();var a=(new H).fa([this.Oa,this.yb,this.sc,this.Ve]);return hj(new X,a,0,a.h.length|0)};l.re=function(){return Nd()};l.ge=function(a){if(this.Kb(a))return this;var b=(new kp).c(),c=this.yb;a=[this.sc,this.Ve,a];var e=np(np(b,this.Oa),c),b=0,c=a.length|0,f=e;for(;;){if(b===c)return f;e=1+b|0;f=f.$c(a[b]);b=e}};l.Me=function(){return this};
l.Kb=function(a){return T(S(),a,this.Oa)||T(S(),a,this.yb)||T(S(),a,this.sc)||T(S(),a,this.Ve)};l.$c=function(a){return this.ge(a)};l.a=new w({lp:0},!1,"scala.collection.immutable.Set$Set4",wo,{lp:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,g:1,f:1});function Jp(){}Jp.prototype=new so;function Kp(){}l=Kp.prototype=Jp.prototype;l.Ca=function(){return this};l.c=function(){return this};
l.Uc=function(a){return 0>a?1:sm(this,a)};l.Ic=function(a){return tm(this,a)};l.r=function(a){return rm(this,a|0)};l.vb=function(){return this};function Nm(a,b){var c=(Rg(),(new Pm).c());if(Om(c.vd(a))){if(a.m())c=pm();else{for(var c=(new Zk).ha(a),e=b.r(c.da.ya()).Ib();!c.da.m()&&e.m();)c.da=c.da.ua(),c.da.m()||(e=b.r(c.da.ya()).Ib());c=c.da.m()?(Rg(),pm()):Lp(e,om(function(a,b,c){return function(){return Nm(c.da.ua(),b)}}(a,b,c)))}return c}return wm(a,b,c)}l.Ii=function(a){return Mp(this,a)};
l.Ud=function(a,b,c){for(var e=this;!e.m();)e=e.ua();return oi(this,a,b,c)};l.sh=function(a){return this.Ud("",a,"")};l.wb=function(){return Rg()};l.w=function(){return oi(this,"Stream(",", ",")")};l.qa=function(a){var b=this;a:b:for(;;){if(!b.m()){a.r(b.ya());b=b.ua();continue b}break a}};
function Np(a,b,c,e){for(;;){if(e.m())return Rg(),pm();if(b.m())b=wp(c),c=Kg();else{var f=b.ya();return mm(new nm,f,om(function(a,b,c,e){return function(){var f=b.ua(),u=e.ya();return Np(a,f,ol(new pl,u,c),e.ua())}}(a,b,c,e)))}}}function hd(a,b){if(0>=b)return a;var c=Op(a,b),e=be().sa;return Np(a,ce(c,e),Kg(),Mp(a,b))}l.ma=function(){return Rm(this)};l.zd=function(){return this.Ud("","","")};
l.jf=function(a,b){if(Om(b.vd(this))){if(this.m())var c=a.Ib();else c=this.ya(),c=mm(new nm,c,om(function(a,b){return function(){return a.ua().jf(b,(Rg(),(new Pm).c()))}}(this,a)));return c}return wi(this,a,b)};l.j=function(){for(var a=0,b=this;!b.m();)a=1+a|0,b=b.ua();return a};l.Bd=function(){return this};l.Ib=function(){return this};function Mp(a,b){var c=a;for(;;){if(0>=b||c.m())return c;var c=c.ua(),e=-1+b|0;b=e}}l.Kc=function(){return this};
l.oe=function(a,b,c,e){xm(a,b);var f=this;b="";a:b:for(;;){if(f.m())xm(a,e);else if(ym(xm(a,b),f.ya()),f.Kg()){f=f.ua();b=c;continue b}else xm(xm(xm(a,c),"?"),e);break a}return a};l.Ba=function(){return Sl(ai(),this)};l.Zc=function(a){var b=this;for(a=Mp(this,a);!a.m();)b=b.ua(),a=a.ua();return b};
function Op(a,b){if(0>=b||a.m())return Rg(),pm();if(1===b){var c=a.ya();return mm(new nm,c,om(function(){return function(){Rg();return pm()}}(a)))}c=a.ya();return mm(new nm,c,om(function(a,b){return function(){return Op(a.ua(),-1+b|0)}}(a,b)))}function Lp(a,b){if(a.m())return b.Se().Ib();var c=a.ya();return mm(new nm,c,om(function(a,b){return function(){return Lp(a.ua(),b)}}(a,b)))}l.Cc=g("Stream");
var Pp=new w({Fh:0},!1,"scala.collection.immutable.Stream",to,{Fh:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,Yf:1,Le:1,jb:1,nb:1,mb:1,Ge:1,Tf:1,Uf:1,g:1,f:1});Jp.prototype.a=Pp;function pj(){this.Ob=this.fb=this.kb=0;this.Wa=!1;this.Va=0;this.Qc=this.Gc=this.rc=this.kc=this.ic=this.pb=null}pj.prototype=new so;l=pj.prototype;l.Ca=function(){return this};l.Q=d("rc");
function Qp(a,b,c,e){if(a.Wa)if(32>e)a.oa(Z(a.La()));else if(1024>e)a.z(Z(a.o())),a.o().b[31&b>>5]=a.La(),a.oa($(a.o(),31&c>>5));else if(32768>e)a.z(Z(a.o())),a.ka(Z(a.v())),a.o().b[31&b>>5]=a.La(),a.v().b[31&b>>10]=a.o(),a.z($(a.v(),31&c>>10)),a.oa($(a.o(),31&c>>5));else if(1048576>e)a.z(Z(a.o())),a.ka(Z(a.v())),a.Da(Z(a.Q())),a.o().b[31&b>>5]=a.La(),a.v().b[31&b>>10]=a.o(),a.Q().b[31&b>>15]=a.v(),a.ka($(a.Q(),31&c>>15)),a.z($(a.v(),31&c>>10)),a.oa($(a.o(),31&c>>5));else if(33554432>e)a.z(Z(a.o())),
a.ka(Z(a.v())),a.Da(Z(a.Q())),a.Db(Z(a.za())),a.o().b[31&b>>5]=a.La(),a.v().b[31&b>>10]=a.o(),a.Q().b[31&b>>15]=a.v(),a.za().b[31&b>>20]=a.Q(),a.Da($(a.za(),31&c>>20)),a.ka($(a.Q(),31&c>>15)),a.z($(a.v(),31&c>>10)),a.oa($(a.o(),31&c>>5));else if(1073741824>e)a.z(Z(a.o())),a.ka(Z(a.v())),a.Da(Z(a.Q())),a.Db(Z(a.za())),a.Jd(Z(a.Lb())),a.o().b[31&b>>5]=a.La(),a.v().b[31&b>>10]=a.o(),a.Q().b[31&b>>15]=a.v(),a.za().b[31&b>>20]=a.Q(),a.Lb().b[31&b>>25]=a.za(),a.Db($(a.Lb(),31&c>>25)),a.Da($(a.za(),31&c>>
20)),a.ka($(a.Q(),31&c>>15)),a.z($(a.v(),31&c>>10)),a.oa($(a.o(),31&c>>5));else throw(new F).c();else{b=-1+a.db()|0;switch(b){case 5:a.Jd(Z(a.Lb()));a.Db($(a.Lb(),31&c>>25));a.Da($(a.za(),31&c>>20));a.ka($(a.Q(),31&c>>15));a.z($(a.v(),31&c>>10));a.oa($(a.o(),31&c>>5));break;case 4:a.Db(Z(a.za()));a.Da($(a.za(),31&c>>20));a.ka($(a.Q(),31&c>>15));a.z($(a.v(),31&c>>10));a.oa($(a.o(),31&c>>5));break;case 3:a.Da(Z(a.Q()));a.ka($(a.Q(),31&c>>15));a.z($(a.v(),31&c>>10));a.oa($(a.o(),31&c>>5));break;case 2:a.ka(Z(a.v()));
a.z($(a.v(),31&c>>10));a.oa($(a.o(),31&c>>5));break;case 1:a.z(Z(a.o()));a.oa($(a.o(),31&c>>5));break;case 0:a.oa(Z(a.La()));break;default:throw(new M).ha(b);}a.Wa=!0}}l.Ka=function(a){var b=a+this.kb|0;if(0<=a&&b<this.fb)a=b;else throw(new I).k(""+a);return $m(this,a,a^this.Ob)};l.db=d("Va");l.Uc=function(a){return this.j()-a|0};l.r=function(a){return this.Ka(a|0)};l.vb=function(){return this};l.A=function(a,b,c){this.kb=a;this.fb=b;this.Ob=c;this.Wa=!1;return this};l.Jd=ba("Qc");l.wb=function(){return Gd()};
l.La=d("pb");l.ka=ba("kc");l.za=d("Gc");function Rp(a,b,c){var e=-1+a.Va|0;switch(e){case 0:a.pb=cn(a.pb,b,c);break;case 1:a.ic=cn(a.ic,b,c);break;case 2:a.kc=cn(a.kc,b,c);break;case 3:a.rc=cn(a.rc,b,c);break;case 4:a.Gc=cn(a.Gc,b,c);break;case 5:a.Qc=cn(a.Qc,b,c);break;default:throw(new M).ha(e);}}l.ag=function(){return this};
function Sp(a,b){if(a.fb!==a.kb){var c=-32&a.fb,e=31&a.fb;if(a.fb!==c){var f=(new pj).A(a.kb,1+a.fb|0,c);qj(f,a,a.Va);f.Wa=a.Wa;Qp(f,a.Ob,c,a.Ob^c);f.pb.b[e]=b;return f}var h=a.kb&~(-1+(1<<D(5,-1+a.Va|0))|0),f=a.kb>>>D(5,-1+a.Va|0)|0;if(0!==h){if(1<a.Va){var c=c-h|0,k=a.Ob-h|0,h=(new pj).A(a.kb-h|0,(1+a.fb|0)-h|0,c);qj(h,a,a.Va);h.Wa=a.Wa;Rp(h,f,0);Tp(h,k,c,k^c);h.pb.b[e]=b;return h}e=-32+c|0;c=a.Ob;k=(new pj).A(a.kb-h|0,(1+a.fb|0)-h|0,e);qj(k,a,a.Va);k.Wa=a.Wa;Rp(k,f,0);Qp(k,c,e,c^e);k.pb.b[32-h|
0]=b;return k}f=a.Ob;h=(new pj).A(a.kb,1+a.fb|0,c);qj(h,a,a.Va);h.Wa=a.Wa;Tp(h,f,c,f^c);h.pb.b[e]=b;return h}e=p(B(z),[32]);e.b[0]=b;f=(new pj).A(0,1,0);f.Va=1;f.pb=e;return f}l.pc=function(){return lj(this)};function Up(a,b){var c=(Gd(),Fd().Ec);c===(Ed(),Fd().Ec)?c=Vp(a,b):(c=c.vd(a.jd()),c.ra(b),c.va(a.Kc()),c=c.$());return c}l.ma=function(){var a=(new Zm).vc(this.kb,this.fb);qj(a,this,this.Va);this.Wa&&an(a,this.Ob);1<a.ch&&rj(a,this.kb,this.kb^this.Ob);return a};l.z=ba("ic");
l.jf=function(a,b){if(b===(Ed(),Fd().Ec)){if(a.m())return this;var c=a.Of()?a:a.ag(),e=c.na();switch(e){default:if(2>=e||e<this.j()>>5)return e=(new Zk).ha(this),c.qa($b(new K,function(a,b){return function(a){var c=b.da,e=(Gd(),Fd().Ec);a=e===(Ed(),Fd().Ec)?Sp(c,a):ld(c,a,e);b.da=a}}(this,e))),e.da;if(this.j()<e>>5&&c&&c.a&&c.a.u.Zj){for(e=Ym(this);e.ea();)var f=e.Y(),c=Up(c,f);return c}return wi(this,c,b)}}else return wi(this,a.Ca(),b)};l.j=function(){return this.fb-this.kb|0};l.Bd=function(){return this};
l.Db=ba("Gc");function Tp(a,b,c,e){a.Wa?(an(a,b),dn(a,b,c,e)):(dn(a,b,c,e),a.Wa=!0)}l.o=d("ic");l.Lb=d("Qc");l.Kc=function(){return this};function Wp(a){if(32>a)return 1;if(1024>a)return 2;if(32768>a)return 3;if(1048576>a)return 4;if(33554432>a)return 5;if(1073741824>a)return 6;throw(new F).c();}function Xp(a,b){for(var c=0;c<b;)a.b[c]=null,c=1+c|0}l.Ba=function(){return Sl(ai(),this)};l.qc=ba("Va");
l.Zc=function(a){if(0>=a)a=Gd().fg;else if((this.fb-a|0)>this.kb){var b=this.fb-a|0,c=-32&b,e=Wp(b^(-1+this.fb|0)),f=b&~(-1+(1<<D(5,e))|0);a=(new pj).A(b-f|0,this.fb-f|0,c-f|0);qj(a,this,this.Va);a.Wa=this.Wa;Qp(a,this.Ob,c,this.Ob^c);a.Va=e;c=-1+e|0;switch(c){case 0:a.ic=null;a.kc=null;a.rc=null;a.Gc=null;a.Qc=null;break;case 1:a.kc=null;a.rc=null;a.Gc=null;a.Qc=null;break;case 2:a.rc=null;a.Gc=null;a.Qc=null;break;case 3:a.Gc=null;a.Qc=null;break;case 4:a.Qc=null;break;case 5:break;default:throw(new M).ha(c);
}b=b-f|0;if(32>b)Xp(a.pb,b);else if(1024>b)Xp(a.pb,31&b),a.ic=Yp(a.ic,b>>>5|0);else if(32768>b)Xp(a.pb,31&b),a.ic=Yp(a.ic,31&(b>>>5|0)),a.kc=Yp(a.kc,b>>>10|0);else if(1048576>b)Xp(a.pb,31&b),a.ic=Yp(a.ic,31&(b>>>5|0)),a.kc=Yp(a.kc,31&(b>>>10|0)),a.rc=Yp(a.rc,b>>>15|0);else if(33554432>b)Xp(a.pb,31&b),a.ic=Yp(a.ic,31&(b>>>5|0)),a.kc=Yp(a.kc,31&(b>>>10|0)),a.rc=Yp(a.rc,31&(b>>>15|0)),a.Gc=Yp(a.Gc,b>>>20|0);else if(1073741824>b)Xp(a.pb,31&b),a.ic=Yp(a.ic,31&(b>>>5|0)),a.kc=Yp(a.kc,31&(b>>>10|0)),a.rc=
Yp(a.rc,31&(b>>>15|0)),a.Gc=Yp(a.Gc,31&(b>>>20|0)),a.Qc=Yp(a.Qc,b>>>25|0);else throw(new F).c();}else a=this;return a};l.v=d("kc");l.oa=ba("pb");
function Vp(a,b){if(a.fb!==a.kb){var c=-32&(-1+a.kb|0),e=31&(-1+a.kb|0);if(a.kb!==(32+c|0)){var f=(new pj).A(-1+a.kb|0,a.fb,c);qj(f,a,a.Va);f.Wa=a.Wa;Qp(f,a.Ob,c,a.Ob^c);f.pb.b[e]=b;return f}var h=(1<<D(5,a.Va))-a.fb|0,f=h&~(-1+(1<<D(5,-1+a.Va|0))|0),h=h>>>D(5,-1+a.Va|0)|0;if(0!==f){if(1<a.Va){var c=c+f|0,k=a.Ob+f|0,f=(new pj).A((-1+a.kb|0)+f|0,a.fb+f|0,c);qj(f,a,a.Va);f.Wa=a.Wa;Rp(f,0,h);Tp(f,k,c,k^c);f.pb.b[e]=b;return f}e=32+c|0;c=a.Ob;k=(new pj).A((-1+a.kb|0)+f|0,a.fb+f|0,e);qj(k,a,a.Va);k.Wa=
a.Wa;Rp(k,0,h);Qp(k,c,e,c^e);k.pb.b[-1+f|0]=b;return k}if(0>c)return f=(1<<D(5,1+a.Va|0))-(1<<D(5,a.Va))|0,h=c+f|0,c=a.Ob+f|0,f=(new pj).A((-1+a.kb|0)+f|0,a.fb+f|0,h),qj(f,a,a.Va),f.Wa=a.Wa,Tp(f,c,h,c^h),f.pb.b[e]=b,f;f=a.Ob;h=(new pj).A(-1+a.kb|0,a.fb,c);qj(h,a,a.Va);h.Wa=a.Wa;Tp(h,f,c,f^c);h.pb.b[e]=b;return h}e=p(B(z),[32]);e.b[31]=b;f=(new pj).A(31,32,0);f.Va=1;f.pb=e;return f}function Yp(a,b){var c=p(B(z),[a.b.length]);Ka(a,b,c,b,c.b.length-b|0);return c}l.Da=ba("rc");
l.a=new w({Zj:0},!1,"scala.collection.immutable.Vector",to,{Zj:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,To:1,Le:1,jb:1,nb:1,mb:1,Zb:1,Hb:1,$j:1,g:1,f:1,sb:1});function gj(){this.Yc=null}gj.prototype=new so;l=gj.prototype;l.Ca=function(){return this};l.Ka=function(a){a=65535&(this.Yc.charCodeAt(a)|0);return(new Q).xa(a)};l.Uc=function(a){return this.j()-a|0};l.r=function(a){a=65535&(this.Yc.charCodeAt(a|0)|0);return(new Q).xa(a)};
l.Ic=function(a){return ij(this,a)};l.m=function(){return jj(this)};l.vb=function(){return this};l.w=d("Yc");l.wb=function(){return Ed()};l.qa=function(a){kj(this,a)};l.Oe=function(a,b){var c;c=0>a?0:a;if(b<=c||c>=(this.Yc.length|0))c=(new gj).k("");else{var e=b>(this.Yc.length|0)?this.Yc.length|0:b;fd();c=(new gj).k((null!==this?this.Yc:null).substring(c,e))}return c};l.pc=function(){return lj(this)};l.ma=function(){return hj(new X,this,0,this.Yc.length|0)};l.Bd=function(){return this};l.zd=d("Yc");
l.j=function(){return this.Yc.length|0};l.Kc=function(){return this};l.Pc=function(a,b,c){mj(this,a,b,c)};l.Ba=function(){return Sl(ai(),this)};l.k=function(a){this.Yc=a;return this};l.Zc=function(a){return em(this,a)};l.ga=function(){vj||(vj=(new sj).c());return vj.ga()};
l.a=new w({zp:0},!1,"scala.collection.immutable.WrappedString",to,{zp:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,To:1,Le:1,jb:1,nb:1,mb:1,Zb:1,Hb:1,Wj:1,$b:1,Hj:1,bb:1});function Zp(){}Zp.prototype=new po;function $p(){}l=$p.prototype=Zp.prototype;l.wb=function(){Po||(Po=(new Oo).c());return Po};l.fc=function(a,b){Ui(this,a,b)};l.ta=aa();l.ga=function(){return(new Ec).c()};l.va=function(a){return W(this,a)};
var aq=new w({ak:0},!1,"scala.collection.mutable.AbstractMap",qo,{ak:1,yh:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,Kj:1,zh:1,Jj:1,Lj:1,Ma:1,y:1,ib:1,Up:1,tb:1,ub:1,rb:1,Vp:1,Za:1,Ta:1,Sa:1,Je:1,Bb:1,hb:1,gb:1});Zp.prototype.a=aq;function bq(){}bq.prototype=new so;function cq(){}cq.prototype=bq.prototype;bq.prototype.Ca=function(){return this.Zf()};bq.prototype.Zf=function(){return this};
var dq=new w({Ub:0},!1,"scala.collection.mutable.AbstractSeq",to,{Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1});bq.prototype.a=dq;function eq(){}eq.prototype=new Mo;function fq(){}l=fq.prototype=eq.prototype;l.m=function(){return 0===this.na()};l.wa=function(a){return $l(this,a)};l.w=function(){return Lj(this)};l.Rh=function(a){var b=zn(this);return Wl(b,a)};l.pc=function(){return vm(this)};
l.fc=function(a,b){Ui(this,a,b)};l.Ba=function(){var a=ai();return Zh(a,this,a.Lh)};l.ta=aa();l.ga=function(){return(new Si).c()};l.va=function(a){return W(this,a)};l.Cc=g("Set");var gq=new w({bk:0},!1,"scala.collection.mutable.AbstractSet",No,{bk:1,Gh:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,tb:1,ub:1,rb:1,Wp:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,Yp:1,Vf:1,Za:1,Ta:1,Sa:1,Je:1,Bb:1,hb:1,gb:1});eq.prototype.a=gq;function Lk(){U.call(this);this.Kd=null}
Lk.prototype=new mo;l=Lk.prototype;l.Yd=g("JavaScriptException");l.Wd=g(1);l.pg=function(){bf();this.stackdata=this.Kd;return this};l.wa=function(a){return this===a?!0:ef(a)?T(S(),this.Kd,a.Kd):!1};l.Xd=function(a){switch(a){case 0:return this.Kd;default:throw(new I).k(""+a);}};l.w=function(){return ja(this.Kd)};l.ha=function(a){this.Kd=a;lo.prototype.c.call(this);return this};l.Ba=function(){return ve(this)};l.Ee=function(){return we(this)};function ef(a){return!!(a&&a.a&&a.a.u.Ak)}
l.a=new w({Ak:0},!1,"scala.scalajs.js.JavaScriptException",no,{Ak:1,lb:1,Pa:1,Aa:1,d:1,f:1,Zd:1,p:1,g:1});function qc(){U.call(this)}qc.prototype=new $o;qc.prototype.a=new w({il:0},!1,"java.nio.ReadOnlyBufferException",ap,{il:1,mj:1,lb:1,Pa:1,Aa:1,d:1,f:1});function Ac(){U.call(this);this.Nf=0}Ac.prototype=new Ro;Ac.prototype.te=function(){return"Input length \x3d "+this.Nf};Ac.prototype.la=function(a){this.Nf=a;Qo.prototype.c.call(this);return this};
Ac.prototype.a=new w({rl:0},!1,"java.nio.charset.MalformedInputException",So,{rl:1,Ug:1,dg:1,Pa:1,Aa:1,d:1,f:1});function Bc(){U.call(this);this.Nf=0}Bc.prototype=new Ro;Bc.prototype.te=function(){return"Input length \x3d "+this.Nf};Bc.prototype.la=function(a){this.Nf=a;Qo.prototype.c.call(this);return this};Bc.prototype.a=new w({sl:0},!1,"java.nio.charset.UnmappableCharacterException",So,{sl:1,Ug:1,dg:1,Pa:1,Aa:1,d:1,f:1});function me(){U.call(this);this.am=null}me.prototype=new To;
me.prototype.k=function(a){this.am=a;F.prototype.k.call(this,a);return this};me.prototype.a=new w({tl:0},!1,"java.nio.charset.UnsupportedCharsetException",Uo,{tl:1,Od:1,lb:1,Pa:1,Aa:1,d:1,f:1});function Ee(){U.call(this)}Ee.prototype=new To;Ee.prototype.a=new w({an:0},!1,"java.lang.NumberFormatException",Uo,{an:1,Od:1,lb:1,Pa:1,Aa:1,d:1,f:1});function Sc(){U.call(this)}Sc.prototype=new Xo;Sc.prototype.c=function(){Sc.prototype.k.call(this,null);return this};
Sc.prototype.a=new w({en:0},!1,"java.lang.StringIndexOutOfBoundsException",Yo,{en:1,kj:1,lb:1,Pa:1,Aa:1,d:1,f:1});function xf(){U.call(this)}xf.prototype=new Vo;xf.prototype.a=new w({nn:0},!1,"java.util.FormatterClosedException",Wo,{nn:1,jj:1,lb:1,Pa:1,Aa:1,d:1,f:1});function hq(){U.call(this)}hq.prototype=new To;function iq(){}iq.prototype=hq.prototype;var jq=new w({vg:0},!1,"java.util.IllegalFormatException",Uo,{vg:1,Od:1,lb:1,Pa:1,Aa:1,d:1,f:1});hq.prototype.a=jq;
function kq(){U.call(this);this.wm=0}kq.prototype=new To;function og(a,b){var c=new kq;c.wm=b;F.prototype.k.call(c,"invalid escape character at index "+b+' in "'+a+'"');return c}kq.prototype.a=new w({Hn:0},!1,"scala.StringContext$InvalidEscapeException",Uo,{Hn:1,Od:1,lb:1,Pa:1,Aa:1,d:1,f:1});function lq(){this.sa=null}lq.prototype=new ip;lq.prototype.ga=function(){mq||(mq=(new nq).c());return(new Qi).c()};
lq.prototype.a=new w({Ho:0},!1,"scala.collection.Seq$",jp,{Ho:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var oq=void 0;function Zb(){oq||(oq=(new lq).c());return oq}function pq(){this.sa=null}pq.prototype=new ip;function qq(){}qq.prototype=pq.prototype;var rq=new w({Fg:0},!1,"scala.collection.generic.IndexedSeqFactory",jp,{Fg:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});pq.prototype.a=rq;function pl(){this.ce=this.Xe=null}pl.prototype=new tp;l=pl.prototype;l.Yd=g("::");l.ya=d("Xe");l.Wd=g(2);l.m=g(!1);
l.Xd=function(a){switch(a){case 0:return this.Xe;case 1:return this.ce;default:throw(new I).k(""+a);}};l.ua=d("ce");function ol(a,b,c){a.Xe=b;a.ce=c;return a}l.Ee=function(){return we(this)};l.a=new w({Sj:0},!1,"scala.collection.immutable.$colon$colon",xp,{Sj:1,Gg:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,Yf:1,Le:1,jb:1,nb:1,mb:1,Ge:1,Tf:1,Zd:1,Uf:1,f:1,g:1});function sq(){}sq.prototype=new cp;
function tq(a,b,c,e,f,h){var k=31&(b>>>h|0),m=31&(e>>>h|0);if(k!==m)return a=1<<k|1<<m,b=p(B(rp),[2]),k<m?(b.b[0]=c,b.b[1]=f):(b.b[0]=f,b.b[1]=c),uq(new vq,a,b,c.na()+f.na()|0);m=p(B(rp),[1]);k=1<<k;c=tq(a,b,c,e,f,5+h|0);m.b[0]=c;return uq(new vq,k,m,c.Ne)}sq.prototype.og=function(){return qp()};sq.prototype.a=new w({Po:0},!1,"scala.collection.immutable.HashSet$",dp,{Po:1,Eg:1,Ie:1,ae:1,Ha:1,d:1,eb:1,g:1,f:1});var wq=void 0;function pp(){wq||(wq=(new sq).c());return wq}function xq(){}
xq.prototype=new lp;xq.prototype.a=new w({Qo:0},!1,"scala.collection.immutable.HashSet$EmptyHashSet$",rp,{Qo:1,Ke:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,sb:1,g:1,f:1});var yq=void 0;function qp(){yq||(yq=(new xq).c());return yq}function vq(){this.dd=0;this.Mb=null;this.Ne=0}vq.prototype=new lp;l=vq.prototype;
l.bg=function(a,b,c){var e=1<<(31&(b>>>c|0)),f=Ge(Ke(),this.dd&(-1+e|0));if(0!==(this.dd&e)){e=this.Mb.b[f];a=e.bg(a,b,5+c|0);if(e===a)return this;b=p(B(rp),[this.Mb.b.length]);Y(O(),this.Mb,0,b,0,this.Mb.b.length);b.b[f]=a;return uq(new vq,this.dd,b,this.Ne+(a.na()-e.na()|0)|0)}c=p(B(rp),[1+this.Mb.b.length|0]);Y(O(),this.Mb,0,c,0,f);c.b[f]=mp(a,b);Y(O(),this.Mb,f,c,1+f|0,this.Mb.b.length-f|0);return uq(new vq,this.dd|e,c,1+this.Ne|0)};
l.qa=function(a){for(var b=0;b<this.Mb.b.length;)this.Mb.b[b].qa(a),b=1+b|0};l.ma=function(){var a=new Ko;Sm.prototype.xm.call(a,this.Mb);return a};l.na=d("Ne");function uq(a,b,c,e){a.dd=b;a.Mb=c;a.Ne=e;se(fd(),Ge(Ke(),b)===c.b.length);return a}l.Md=function(a,b,c){var e=31&(b>>>c|0),f=1<<e;return-1===this.dd?this.Mb.b[31&e].Md(a,b,5+c|0):0!==(this.dd&f)?(e=Ge(Ke(),this.dd&(-1+f|0)),this.Mb.b[e].Md(a,b,5+c|0)):!1};
l.$f=function(a,b){if(a===this)return!0;if(Um(a)&&this.Ne<=a.Ne){var c=this.dd,e=this.Mb,f=0,h=a.Mb,k=a.dd,m=0;if((c&k)===c){for(;0!==c;){var t=c^c&(-1+c|0),q=k^k&(-1+k|0);if(t===q){if(!e.b[f].$f(h.b[m],5+b|0))return!1;c&=~t;f=1+f|0}k&=~q;m=1+m|0}return!0}}return!1};function Um(a){return!!(a&&a.a&&a.a.u.Uj)}
l.a=new w({Uj:0},!1,"scala.collection.immutable.HashSet$HashTrieSet",rp,{Uj:1,Ke:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,sb:1,g:1,f:1});function zq(){}zq.prototype=new lp;function Aq(){}Aq.prototype=zq.prototype;
var Bq=new w({Dh:0},!1,"scala.collection.immutable.HashSet$LeafHashSet",rp,{Dh:1,Ke:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,sb:1,g:1,f:1});zq.prototype.a=Bq;function Cq(){this.tn=this.sa=null}Cq.prototype=new ip;Cq.prototype.c=function(){hp.prototype.c.call(this);Dq=this;this.tn=(new Li).c();return this};Cq.prototype.We=function(){return Kg()};Cq.prototype.ga=function(){return(new Qi).c()};
Cq.prototype.a=new w({Wo:0},!1,"scala.collection.immutable.List$",jp,{Wo:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1,g:1,f:1});var Dq=void 0;function be(){Dq||(Dq=(new Cq).c());return Dq}function Bp(){}Bp.prototype=new cp;Bp.prototype.og=function(){return Ni()};Bp.prototype.ga=function(){return(new Mi).c()};Bp.prototype.a=new w({Yo:0},!1,"scala.collection.immutable.ListSet$",dp,{Yo:1,Eg:1,Ie:1,ae:1,Ha:1,d:1,eb:1,g:1,f:1});var Ap=void 0;function Eq(){}Eq.prototype=new zp;
Eq.prototype.a=new w({$o:0},!1,"scala.collection.immutable.ListSet$EmptyListSet$",Cp,{$o:1,Eh:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,g:1,f:1});var Fq=void 0;function Ni(){Fq||(Fq=(new Eq).c());return Fq}function Gq(){this.Ja=this.Xe=null}Gq.prototype=new zp;l=Gq.prototype;l.ya=d("Xe");l.m=g(!1);l.Ah=d("Ja");l.kf=function(a){return Hq(this,a)?this:Ti(this,a)};
l.na=function(){var a;a:{a=this;var b=0;for(;;){if(a.m()){a=b;break a}a=a.Ah();b=1+b|0}a=void 0}return a};function Ti(a,b){var c=new Gq;c.Xe=b;if(null===a)throw ff(df(),null);c.Ja=a;return c}l.Kb=function(a){return Hq(this,a)};function Hq(a,b){for(;;){if(a.m())return!1;if(T(S(),a.ya(),b))return!0;a=a.Ah()}}l.Ek=d("Ja");l.$c=function(a){return this.kf(a)};
l.a=new w({bp:0},!1,"scala.collection.immutable.ListSet$Node",Cp,{bp:1,Eh:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,g:1,f:1});function Iq(){}Iq.prototype=new tp;l=Iq.prototype;l.ya=function(){this.mh()};l.Yd=g("Nil");l.Wd=g(0);l.wa=function(a){return lb(a)?a.m():!1};l.m=g(!0);l.Xd=function(a){throw(new I).k(""+a);};l.mh=function(){throw(new Ek).k("head of empty list");};
l.ua=function(){throw(new re).k("tail of empty list");};l.Ee=function(){return we(this)};l.a=new w({dp:0},!1,"scala.collection.immutable.Nil$",xp,{dp:1,Gg:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,Yf:1,Le:1,jb:1,nb:1,mb:1,Ge:1,Tf:1,Zd:1,Uf:1,f:1,g:1});var Jq=void 0;function Kg(){Jq||(Jq=(new Iq).c());return Jq}function nq(){this.sa=null}nq.prototype=new ip;nq.prototype.ga=function(){return(new Qi).c()};
nq.prototype.a=new w({fp:0},!1,"scala.collection.immutable.Seq$",jp,{fp:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var mq=void 0;function Kq(){}Kq.prototype=new cp;Kq.prototype.og=function(){return Nd()};Kq.prototype.a=new w({gp:0},!1,"scala.collection.immutable.Set$",dp,{gp:1,Eg:1,Ie:1,ae:1,Ha:1,d:1,eb:1});var Lq=void 0;function Kl(){Lq||(Lq=(new Kq).c());return Lq}function Mq(){this.sa=null}Mq.prototype=new ip;Mq.prototype.We=function(){return pm()};Mq.prototype.ga=function(){return(new Lm).c()};
Mq.prototype.a=new w({mp:0},!1,"scala.collection.immutable.Stream$",jp,{mp:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1,g:1,f:1});var Nq=void 0;function Rg(){Nq||(Nq=(new Mq).c());return Nq}function nm(){this.Lg=this.Fk=this.Si=null}nm.prototype=new Kp;l=nm.prototype;l.ya=d("Si");l.Kg=function(){return null===this.Lg};l.m=g(!1);l.ua=function(){this.Kg()||this.Kg()||(this.Fk=this.Lg.Se(),this.Lg=null);return this.Fk};function mm(a,b,c){a.Si=b;a.Lg=c;return a}
l.a=new w({op:0},!1,"scala.collection.immutable.Stream$Cons",Pp,{op:1,Fh:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,Yf:1,Le:1,jb:1,nb:1,mb:1,Ge:1,Tf:1,Uf:1,g:1,f:1});function Oq(){}Oq.prototype=new Kp;l=Oq.prototype;l.ya=function(){this.mh()};l.Kg=g(!1);l.m=g(!0);l.mh=function(){throw(new Ek).k("head of empty stream");};l.ua=function(){throw(new re).k("tail of empty stream");};
l.a=new w({pp:0},!1,"scala.collection.immutable.Stream$Empty$",Pp,{pp:1,Fh:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,Yf:1,Le:1,jb:1,nb:1,mb:1,Ge:1,Tf:1,Uf:1,g:1,f:1});var Pq=void 0;function pm(){Pq||(Pq=(new Oq).c());return Pq}function Qq(){}Qq.prototype=new cq;function Rq(){}Rq.prototype=Qq.prototype;Qq.prototype.va=function(a){return W(this,a)};
var Sq=new w({Hg:0},!1,"scala.collection.mutable.AbstractBuffer",dq,{Hg:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Hh:1,Ih:1,Ta:1,Sa:1,Je:1,Vf:1,ib:1});Qq.prototype.a=Sq;function Tq(){this.sa=null}Tq.prototype=new ip;Tq.prototype.ga=function(){return(new cm).c()};Tq.prototype.a=new w({Cp:0},!1,"scala.collection.mutable.ArrayBuffer$",jp,{Cp:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1,g:1,f:1});
var Uq=void 0;function ni(){Uq||(Uq=(new Tq).c());return Uq}function Ec(){this.nd=0;this.ja=null;this.Dd=this.oc=0;this.Vb=null;this.be=0}Ec.prototype=new $p;l=Ec.prototype;l.Ca=function(){return this};l.c=function(){Ec.prototype.Im.call(this,null);return this};l.r=function(a){var b=Fn(this,a);if(null===b)throw(new Ek).k("key not found: "+a);return b.Ia};l.vb=function(){return this};function Vq(a,b){var c=qe(a,b.Ed,b.md);null!==c&&(c.Ia=b.md);return a}l.Ua=function(a){return Vq(this,a)};
l.qa=function(a){for(var b=this.ja,c=En(this),e=b.b[c];null!==e;){var f=e;a.r((new ue).Ze(f.Hc,f.Ia));for(e=e.Vd;null===e&&0<c;)c=-1+c|0,e=b.b[c]}};l.na=d("oc");l.$=function(){return this};l.ma=function(){return(new gd).af(Dn(this),$b(new K,function(){return function(a){return(new ue).Ze(a.Hc,a.Ia)}}(this)))};
l.Im=function(a){this.nd=750;this.ja=p(B(pb),[ak()]);this.oc=0;this.Dd=bk().Qf(this.nd,ak());this.Vb=null;this.be=Ge(Ke(),-1+this.ja.b.length|0);null!==a&&(this.nd=a.rn(),this.ja=a.vs(),this.oc=a.Gq(),this.Dd=a.Hq(),this.be=a.cq(),this.Vb=a.eq());return this};function pe(a,b){var c=Fn(a,b);return null===c?ke():(new je).ha(c.Ia)}l.ra=function(a){return Vq(this,a)};
l.a=new w({Lp:0},!1,"scala.collection.mutable.HashMap",aq,{Lp:1,ak:1,yh:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,Kj:1,zh:1,Jj:1,Lj:1,Ma:1,y:1,ib:1,Up:1,tb:1,ub:1,rb:1,Vp:1,Za:1,Ta:1,Sa:1,Je:1,Bb:1,hb:1,gb:1,ls:1,ms:1,sb:1,g:1,f:1});function Si(){this.nd=0;this.ja=null;this.Dd=this.oc=0;this.Vb=null;this.be=0}Si.prototype=new fq;l=Si.prototype;l.Ca=function(){return this};l.c=function(){Si.prototype.Hm.call(this,null);return this};
l.r=function(a){return null!==Vi(this,a)};l.vb=function(){return this};l.Ua=function(a){return Xi(this,a)};l.wb=function(){Wq||(Wq=(new Xq).c());return Wq};l.qa=function(a){for(var b=0,c=this.ja.b.length;b<c;){var e=this.ja.b[b];null!==e&&a.r(e===Wj()?null:e);b=1+b|0}};l.na=d("oc");l.$=function(){return this};l.ma=function(){return zn(this)};
l.Hm=function(a){this.nd=450;this.ja=p(B(z),[ck(bk(),32)]);this.oc=0;this.Dd=Tj().Qf(this.nd,ck(bk(),32));this.Vb=null;this.be=Ge(Ke(),-1+this.ja.b.length|0);null!==a&&(this.nd=a.rn(),this.ja=a.us(),this.oc=a.Gq(),this.Dd=a.Hq(),this.be=a.cq(),this.Vb=a.eq());return this};l.ra=function(a){return Xi(this,a)};l.$c=function(a){var b=(new Si).c();return Xi(W(b,this),a)};function Xi(a,b){var c=null===b?Wj():b;Bn(a,c);return a}
l.a=new w({Mp:0},!1,"scala.collection.mutable.HashSet",gq,{Mp:1,bk:1,Gh:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,tb:1,ub:1,rb:1,Wp:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,Yp:1,Vf:1,Za:1,Ta:1,Sa:1,Je:1,Bb:1,hb:1,gb:1,js:1,ks:1,sb:1,g:1,f:1});function Xq(){}Xq.prototype=new fp;Xq.prototype.We=function(){return(new Si).c()};Xq.prototype.a=new w({Np:0},!1,"scala.collection.mutable.HashSet$",gp,{Np:1,Rj:1,Ie:1,ae:1,Ha:1,d:1,eb:1,g:1,f:1});var Wq=void 0;
function Yq(){this.sa=null}Yq.prototype=new ip;Yq.prototype.ga=function(){return(new cm).c()};Yq.prototype.a=new w({Qp:0},!1,"scala.collection.mutable.IndexedSeq$",jp,{Qp:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var Zq=void 0;function $q(){Zq||(Zq=(new Yq).c());return Zq}function ar(){this.sa=null}ar.prototype=new ip;ar.prototype.ga=function(){return Yj(new Xj,(new Qi).c())};ar.prototype.a=new w({Sp:0},!1,"scala.collection.mutable.ListBuffer$",jp,{Sp:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1,g:1,f:1});
var br=void 0;function $f(){this.gc=null}$f.prototype=new cq;l=$f.prototype;l.Ca=function(){return this};l.c=function(){$f.prototype.Am.call(this,16,"");return this};l.Ka=function(a){a=65535&(this.gc.xb.charCodeAt(a)|0);return(new Q).xa(a)};l.Uc=function(a){return this.j()-a|0};l.Ic=function(a){return ij(this,a)};l.r=function(a){a=65535&(this.gc.xb.charCodeAt(a|0)|0);return(new Q).xa(a)};l.m=function(){return jj(this)};l.vb=function(){return this};
l.Qh=function(a,b){return this.gc.xb.substring(a,b)};l.Ua=function(a){a=ae(S(),a);Te(this.gc,a);return this};l.wb=function(){return $q()};l.w=function(){return this.gc.xb};l.qa=function(a){kj(this,a)};l.Oe=function(a,b){var c;c=0<a?a:0;var e=this.j(),f=b<e?b:e;c>=f?c=this.ga().$():(e=this.ga(),c=this.w().substring(c,f),c=e.va((new jd).k(c)).$());return c};l.pc=function(){return lj(this)};l.$=function(){return this.gc.xb};function xm(a,b){Qe(a.gc,b);return a}
l.ma=function(){return hj(new X,this,0,this.gc.xb.length|0)};l.Zf=function(){return this};l.fc=function(a,b){Ui(this,a,b)};l.Am=function(a,b){$f.prototype.Em.call(this,Qe((new Pe).la((b.length|0)+a|0),b));return this};l.j=function(){return this.gc.xb.length|0};l.zd=function(){return this.gc.xb};l.Bd=function(){return this};l.Kc=function(){return this};l.Em=function(a){this.gc=a;return this};function ym(a,b){Qe(a.gc,Dk(s(),b));return a}l.ra=function(a){a=ae(S(),a);Te(this.gc,a);return this};
l.Pc=function(a,b,c){mj(this,a,b,c)};l.ta=aa();l.Ba=function(){return Sl(ai(),this)};l.Zc=function(a){return em(this,a)};l.ah=function(a){return 65535&(this.gc.xb.charCodeAt(a)|0)};l.ga=function(){return Yj(new Xj,(new $f).c())};l.va=function(a){return W(this,a)};
l.a=new w({Zp:0},!1,"scala.collection.mutable.StringBuilder",dq,{Zp:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,ug:1,Ac:1,Zb:1,Hb:1,nc:1,Wj:1,$b:1,Hj:1,bb:1,Za:1,Ta:1,Sa:1,g:1,f:1});function cr(){}cr.prototype=new cq;function dr(){}l=dr.prototype=cr.prototype;l.Ca=function(){return this};l.Uc=function(a){return this.j()-a|0};l.Ic=function(a){return ij(this,a)};l.m=function(){return jj(this)};
l.vb=function(){return this};l.wb=function(){return $q()};l.qa=function(a){kj(this,a)};l.Oe=function(a,b){return Mj(this,a,b)};l.pc=function(){return lj(this)};l.Zf=function(){return this};l.ma=function(){return hj(new X,this,0,this.j())};l.Bd=function(){return this};l.Kc=function(){return this};l.Pc=function(a,b,c){mj(this,a,b,c)};l.Ba=function(){return Sl(ai(),this)};l.Zc=function(a){return em(this,a)};l.ga=function(){return(new ik).hd(this.fd())};l.Cc=g("WrappedArray");
var er=new w({Wc:0},!1,"scala.collection.mutable.WrappedArray",dq,{Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1});cr.prototype.a=er;function fr(){this.sa=null}fr.prototype=new ip;fr.prototype.ga=function(){return(new H).c()};fr.prototype.a=new w({hq:0},!1,"scala.scalajs.js.WrappedArray$",jp,{hq:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var gr=void 0;
function bj(){gr||(gr=(new fr).c());return gr}function hr(){U.call(this);this.ti=0;this.ih=null}hr.prototype=new iq;hr.prototype.te=function(){return"Conversion \x3d "+(new Q).xa(this.ti)+", Flags \x3d "+this.ih};hr.prototype.xa=function(a){this.ti=a;hq.prototype.c.call(this);this.ih=null;return this};function Gk(){var a=new hr;hr.prototype.xa.call(a,115);a.ih="#";return a}hr.prototype.a=new w({jn:0},!1,"java.util.FormatFlagsConversionMismatchException",jq,{jn:1,vg:1,Od:1,lb:1,Pa:1,Aa:1,d:1,f:1});
function rf(){U.call(this);this.jh=null}rf.prototype=new iq;rf.prototype.c=function(){hq.prototype.c.call(this);this.jh=null;return this};rf.prototype.te=function(){return"Flags \x3d '"+this.jh+"'"};rf.prototype.k=function(a){rf.prototype.c.call(this);if(null===a)throw(new ua).c();this.jh=a;return this};rf.prototype.a=new w({on:0},!1,"java.util.IllegalFormatFlagsException",jq,{on:1,vg:1,Od:1,lb:1,Pa:1,Aa:1,d:1,f:1});function Fk(){U.call(this);this.wh=null}Fk.prototype=new iq;
Fk.prototype.c=function(){hq.prototype.c.call(this);this.wh=null;return this};Fk.prototype.te=function(){return"Format specifier '"+this.wh+"'"};Fk.prototype.k=function(a){Fk.prototype.c.call(this);if(null===a)throw(new ua).c();this.wh=a;return this};Fk.prototype.a=new w({pn:0},!1,"java.util.MissingFormatArgumentException",jq,{pn:1,vg:1,Od:1,lb:1,Pa:1,Aa:1,d:1,f:1});function ir(){this.Ec=this.sa=null}ir.prototype=new qq;
ir.prototype.c=function(){pq.prototype.c.call(this);jr=this;this.Ec=(new am).c();return this};ir.prototype.ga=function(){Ed();Gd();return(new Hd).c()};ir.prototype.a=new w({wo:0},!1,"scala.collection.IndexedSeq$",rq,{wo:1,Fg:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var jr=void 0;function Fd(){jr||(jr=(new ir).c());return jr}function kr(){this.Pd=null;this.tc=0}kr.prototype=new Aq;l=kr.prototype;
l.bg=function(a,b,c){if(b===this.tc&&T(S(),a,this.Pd))return this;if(b!==this.tc)return tq(pp(),this.tc,this,b,mp(a,b),c);var e=Ni();c=new lr;a=Ti(e,this.Pd).kf(a);c.tc=b;c.Qd=a;return c};function mp(a,b){var c=new kr;c.Pd=a;c.tc=b;return c}l.qa=function(a){a.r(this.Pd)};l.ma=function(){Jg();var a=(new H).fa([this.Pd]);return hj(new X,a,0,a.h.length|0)};l.na=g(1);l.Md=function(a,b){return b===this.tc&&T(S(),a,this.Pd)};l.$f=function(a,b){return a.Md(this.Pd,this.tc,b)};
l.a=new w({Tj:0},!1,"scala.collection.immutable.HashSet$HashSet1",Bq,{Tj:1,Dh:1,Ke:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,sb:1,g:1,f:1});function lr(){this.tc=0;this.Qd=null}lr.prototype=new Aq;l=lr.prototype;l.bg=function(a,b,c){b===this.tc?(c=new lr,a=this.Qd.kf(a),c.tc=b,c.Qd=a,b=c):b=tq(pp(),this.tc,this,b,mp(a,b),c);return b};l.qa=function(a){var b=(new Km).bf(this.Qd);li(b,a)};l.ma=function(){return(new Km).bf(this.Qd)};
l.na=function(){return this.Qd.na()};l.Md=function(a,b){return b===this.tc&&this.Qd.Kb(a)};l.$f=function(a,b){for(var c=(new Km).bf(this.Qd),e=!0;;)if(e&&!c.Qe.m())e=c.Y(),e=a.Md(e,this.tc,b);else break;return e};l.a=new w({Ro:0},!1,"scala.collection.immutable.HashSet$HashSetCollision1",Bq,{Ro:1,Dh:1,Ke:1,jc:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,ac:1,y:1,Rb:1,Yb:1,cc:1,bc:1,ib:1,zc:1,jb:1,nb:1,mb:1,sb:1,g:1,f:1});function mr(){this.sa=null}mr.prototype=new qq;
mr.prototype.ga=function(){Gd();return(new Hd).c()};mr.prototype.a=new w({Uo:0},!1,"scala.collection.immutable.IndexedSeq$",rq,{Uo:1,Fg:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1});var nr=void 0;function Ed(){nr||(nr=(new mr).c());return nr}function or(){this.fg=this.sa=null;this.Cr=this.Sq=0}or.prototype=new qq;or.prototype.c=function(){pq.prototype.c.call(this);pr=this;this.fg=(new pj).A(0,0,0);return this};or.prototype.We=d("fg");or.prototype.ga=function(){return(new Hd).c()};
or.prototype.a=new w({vp:0},!1,"scala.collection.immutable.Vector$",rq,{vp:1,Fg:1,yc:1,mc:1,Ab:1,Ha:1,d:1,Tb:1,eb:1,g:1,f:1});var pr=void 0;function Gd(){pr||(pr=(new or).c());return pr}function cm(){this.Xi=0;this.h=null;this.$a=0}cm.prototype=new Rq;l=cm.prototype;l.Ca=function(){return this};function km(a,b){Kn(a,1+a.$a|0);a.h.b[a.$a]=b;a.$a=1+a.$a|0;return a}l.c=function(){cm.prototype.la.call(this,16);return this};l.Ka=function(a){return Ln(this,a)};
function lm(a,b){if(!(0<=b))throw(new F).k("requirement failed: removing negative number of elements");if(0>(a.$a-b|0))throw(new I).k("0");Ka(a.h,0+b|0,a.h,0,a.$a-(0+b|0)|0);var c=a.$a-b|0;fd();if(!(c<=a.$a))throw(new F).k("requirement failed");for(;a.$a>c;)a.$a=-1+a.$a|0,a.h.b[a.$a]=null}l.Uc=function(a){return this.j()-a|0};l.Ic=function(a){return ij(this,a)};l.r=function(a){return Ln(this,a|0)};l.m=function(){return jj(this)};l.vb=function(){return this};l.Ua=function(a){return km(this,a)};
l.wb=function(){return ni()};l.qa=function(a){for(var b=0,c=this.$a;b<c;)a.r(this.h.b[b]),b=1+b|0};l.Oe=function(a,b){return Mj(this,a,b)};l.pc=function(){return lj(this)};l.$=function(){return this};l.ma=function(){return hj(new X,this,0,this.$a)};l.Zf=function(){return this};l.fc=function(a,b){Ui(this,a,b)};l.la=function(a){a=this.Xi=a;this.h=p(B(z),[1<a?a:1]);this.$a=0;return this};l.j=d("$a");l.Bd=function(){return this};l.Kc=function(){return this};
function dm(a,b){if(nb(b)){var c=b.j();Kn(a,a.$a+c|0);b.Pc(a.h,a.$a,c);a.$a=a.$a+c|0;return a}return W(a,b)}l.ra=function(a){return km(this,a)};l.Pc=function(a,b,c){var e=qi(J(),a)-b|0;c=c<e?c:e;e=this.$a;c=c<e?c:e;Y(O(),this.h,0,a,b,c)};l.ta=function(a){a>this.$a&&1<=a&&(a=p(B(z),[a]),Ka(this.h,0,a,0,this.$a),this.h=a)};l.Ba=function(){return Sl(ai(),this)};l.Zc=function(a){return em(this,a)};l.va=function(a){return dm(this,a)};l.Cc=g("ArrayBuffer");
l.a=new w({Bp:0},!1,"scala.collection.mutable.ArrayBuffer",Sq,{Bp:1,Hg:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Hh:1,Ih:1,Ta:1,Sa:1,Je:1,Vf:1,ib:1,Bc:1,nc:1,Hb:1,$b:1,Za:1,ns:1,Ac:1,Zb:1,sb:1,g:1,f:1});function Qi(){this.Rd=this.Ga=null;this.If=!1;this.Sd=0}Qi.prototype=new Rq;l=Qi.prototype;l.Df=function(a,b){ji(this.Ga,a,b)};
function vp(a){if(!a.Ga.m()){var b=a.Ga,c=a.Rd.ce;a.Ga=Kg();a.Rd=null;a.If=!1;for(a.Sd=0;b!==c;)Wi(a,b.ya()),b=b.ua()}}l.c=function(){this.Ga=Kg();this.If=!1;this.Sd=0;return this};l.Ka=function(a){if(0>a||a>=this.Sd)throw(new I).k(""+a);return rm(this.Ga,a)};l.Uc=function(a){return 0>a?1:sm(this.Ga,a)};l.r=function(a){return this.Ka(a|0)};l.Ic=function(a){return tm(this.Ga,a)};l.m=function(){return this.Ga.m()};l.Lc=function(){this.If=!this.Ga.m();return this.Ga};l.vb=function(){return this};
l.wa=function(a){return a&&a.a&&a.a.u.pk?this.Ga.wa(a.Ga):lb(a)?this.Ic(a):!1};l.Ud=function(a,b,c){return oi(this.Ga,a,b,c)};l.sh=function(a){return oi(this.Ga,"",a,"")};l.Ua=function(a){return Wi(this,a)};l.wb=function(){br||(br=(new ar).c());return br};l.qa=function(a){for(var b=this.Ga;!b.m();)a.r(b.ya()),b=b.ua()};l.pc=function(){var a=this.Ga,b=ni().sa;return ce(a,b)};l.na=d("Sd");l.$=function(){return this.Lc()};l.ma=function(){var a=new Jn;a.Ef=this.Ga.m()?Kg():this.Ga;return a};
l.fc=function(a,b){Ui(this,a,b)};l.zd=function(){return oi(this.Ga,"","","")};l.j=d("Sd");l.Bd=function(){return this};l.Ib=function(){return this.Ga.Ib()};l.oe=function(a,b,c,e){return pi(this.Ga,a,b,c,e)};function Wi(a,b){a.If&&vp(a);if(a.Ga.m())a.Rd=ol(new pl,b,Kg()),a.Ga=a.Rd;else{var c=a.Rd;a.Rd=ol(new pl,b,Kg());c.ce=a.Rd}a.Sd=1+a.Sd|0;return a}l.ra=function(a){return Wi(this,a)};l.ta=aa();l.Pc=function(a,b,c){Xl(this.Ga,a,b,c)};l.Gk=function(a){return Kd(this.Ga,a)};
function Pi(a,b){a:for(;;){var c=b;if(null!==c&&c===a){var e=a,c=a.Sd,f=e.ga();if(!(0>=c)){f.fc(c,e);for(var h=0,e=e.ma();h<c&&e.ea();)f.ra(e.Y()),h=1+h|0}b=f.$();continue a}return W(a,b)}}l.va=function(a){return Pi(this,a)};l.Cc=g("ListBuffer");
l.a=new w({pk:0},!1,"scala.collection.mutable.ListBuffer",Sq,{pk:1,Hg:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Hh:1,Ih:1,Ta:1,Sa:1,Je:1,Vf:1,ib:1,Za:1,fs:1,es:1,gs:1,f:1});function rk(){this.h=null}rk.prototype=new dr;l=rk.prototype;l.Ka=function(a){return this.h.b[a]};l.r=function(a){return this.h.b[a|0]};l.ld=function(a,b){this.h.b[a]=!!b};l.j=function(){return this.h.b.length};
l.fd=function(){return P().od};l.a=new w({qk:0},!1,"scala.collection.mutable.WrappedArray$ofBoolean",er,{qk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});function $c(){this.h=null}$c.prototype=new dr;l=$c.prototype;l.Ka=function(a){return this.h.b[a]};l.r=function(a){return this.h.b[a|0]};l.ld=function(a,b){this.h.b[a]=b|0};l.j=function(){return this.h.b.length};
l.fd=function(){return P().ob};l.xd=function(a){this.h=a;return this};l.a=new w({rk:0},!1,"scala.collection.mutable.WrappedArray$ofByte",er,{rk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});function Yd(){this.h=null}Yd.prototype=new dr;l=Yd.prototype;l.Ka=function(a){return(new Q).xa(this.h.b[a])};
l.r=function(a){return(new Q).xa(this.h.b[a|0])};l.ld=function(a,b){var c=ae(S(),b);this.h.b[a]=c};function Xd(a,b){a.h=b;return a}l.j=function(){return this.h.b.length};l.fd=function(){return P().Dc};l.a=new w({sk:0},!1,"scala.collection.mutable.WrappedArray$ofChar",er,{sk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});
function qk(){this.h=null}qk.prototype=new dr;l=qk.prototype;l.Ka=function(a){return this.h.b[a]};l.r=function(a){return this.h.b[a|0]};l.ld=function(a,b){this.h.b[a]=+b};l.j=function(){return this.h.b.length};l.fd=function(){return P().pd};
l.a=new w({tk:0},!1,"scala.collection.mutable.WrappedArray$ofDouble",er,{tk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});function pk(){this.h=null}pk.prototype=new dr;l=pk.prototype;l.Ka=function(a){return this.h.b[a]};l.r=function(a){return this.h.b[a|0]};l.ld=function(a,b){var c=pa(b);this.h.b[a]=c};l.j=function(){return this.h.b.length};
l.fd=function(){return P().qd};l.a=new w({uk:0},!1,"scala.collection.mutable.WrappedArray$ofFloat",er,{uk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});function nk(){this.h=null}nk.prototype=new dr;l=nk.prototype;l.Ka=function(a){return this.h.b[a]};l.r=function(a){return this.h.b[a|0]};l.ld=function(a,b){this.h.b[a]=b|0};l.j=function(){return this.h.b.length};
l.fd=function(){return P().Nc};l.a=new w({vk:0},!1,"scala.collection.mutable.WrappedArray$ofInt",er,{vk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});function ok(){this.h=null}ok.prototype=new dr;l=ok.prototype;l.Ka=function(a){return this.h.b[a]};l.r=function(a){return this.h.b[a|0]};l.ld=function(a,b){var c=Oa(b);this.h.b[a]=c};
l.j=function(){return this.h.b.length};l.fd=function(){return P().rd};l.a=new w({wk:0},!1,"scala.collection.mutable.WrappedArray$ofLong",er,{wk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});function Uf(){this.Ji=this.h=null;this.$g=!1}Uf.prototype=new dr;l=Uf.prototype;l.r=function(a){return this.Ka(a|0)};l.Ka=function(a){return this.h.b[a]};
l.ld=function(a,b){this.h.b[a]=b};function Tf(a,b){a.h=b;return a}l.j=function(){return this.h.b.length};l.fd=function(){this.$g||this.$g||(this.Ji=Vc(P(),lk(J(),ka(this.h))),this.$g=!0);return this.Ji};l.a=new w({xk:0},!1,"scala.collection.mutable.WrappedArray$ofRef",er,{xk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});
function mk(){this.h=null}mk.prototype=new dr;l=mk.prototype;l.Ka=function(a){return this.h.b[a]};l.r=function(a){return this.h.b[a|0]};l.ld=function(a,b){this.h.b[a]=b|0};l.j=function(){return this.h.b.length};l.fd=function(){return P().td};
l.a=new w({yk:0},!1,"scala.collection.mutable.WrappedArray$ofShort",er,{yk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});function sk(){this.h=null}sk.prototype=new dr;l=sk.prototype;l.Ka=function(a){this.h.b[a]};l.r=function(a){this.h.b[a|0]};l.ld=function(a,b){this.h.b[a]=b};l.j=function(){return this.h.b.length};l.fd=function(){return P().ud};
l.a=new w({zk:0},!1,"scala.collection.mutable.WrappedArray$ofUnit",er,{zk:1,Wc:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,sb:1,g:1,f:1});function H(){this.h=null}H.prototype=new Rq;l=H.prototype;l.Ca=function(){return this};l.c=function(){H.prototype.fa.call(this,[]);return this};l.Ka=function(a){return this.h[a]};l.Uc=function(a){return this.j()-a|0};
l.r=function(a){return this.h[a|0]};l.Ic=function(a){return ij(this,a)};l.m=function(){return jj(this)};l.vb=function(){return this};l.Ua=function(a){this.h.push(a);return this};l.wb=function(){return bj()};l.qa=function(a){kj(this,a)};l.Oe=function(a,b){return Mj(this,a,b)};l.pc=function(){return lj(this)};l.$=function(){return this};l.Zf=function(){return this};l.ma=function(){return hj(new X,this,0,this.h.length|0)};l.fc=function(a,b){Ui(this,a,b)};l.Bd=function(){return this};
l.j=function(){return this.h.length|0};l.Kc=function(){return this};l.ra=function(a){this.h.push(a);return this};l.ta=aa();l.Pc=function(a,b,c){mj(this,a,b,c)};l.Ba=function(){return Sl(ai(),this)};l.Zc=function(a){return em(this,a)};l.fa=function(a){this.h=a;return this};l.Cc=g("WrappedArray");
l.a=new w({gq:0},!1,"scala.scalajs.js.WrappedArray",Sq,{gq:1,Hg:1,Ub:1,Xa:1,aa:1,R:1,d:1,W:1,K:1,M:1,L:1,t:1,s:1,G:1,H:1,U:1,X:1,ca:1,ba:1,N:1,P:1,p:1,cb:1,Ma:1,y:1,Ya:1,Qa:1,Ra:1,dc:1,tb:1,ub:1,rb:1,ec:1,Bb:1,hb:1,gb:1,Hh:1,Ih:1,Ta:1,Sa:1,Je:1,Vf:1,ib:1,Ac:1,Zb:1,Hb:1,nc:1,Jc:1,Bc:1,$b:1,Za:1});}).call(this);
