
/** libs/jquery-2.1.3.js **/
/*
 * Copyright (C) 2014 Alexandru Nedelcu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
/*
 * Copyright (C) 2014 Alexandru Nedelcu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
/*
 * Copyright (C) 2014 Alexandru Nedelcu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
/*
 * Copyright (C) 2014 Alexandru Nedelcu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
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
(function(){'use strict';function aa(){return function(){}}function d(a){return function(b){this[a]=b}}function f(a){return function(){return this[a]}}function k(a){return function(){return a}}var m,ba="object"===typeof __ScalaJSEnv&&__ScalaJSEnv?__ScalaJSEnv:{},n="object"===typeof ba.global&&ba.global?ba.global:"object"===typeof global&&global&&global.Object===Object?global:this;ba.global=n;var ca="object"===typeof ba.exportsNamespace&&ba.exportsNamespace?ba.exportsNamespace:n;ba.exportsNamespace=ca;n.Object.freeze(ba);
var da=0;function ea(a){return function(b,c){return!(!b||!b.a||b.a.Re!==c||b.a.Pe!==a)}}function fa(a){var b,c;for(c in a)b=c;return b}function p(a,b){return ga(a,b,0)}function ga(a,b,c){var e=new a.wg(b[c]);if(c<b.length-1){a=a.Ye;c+=1;for(var g=e.b,h=0;h<g.length;h++)g[h]=ga(a,b,c)}return e}function ha(a){return void 0===a?"undefined":a.toString()}
function ia(a){switch(typeof a){case "string":return r(ja);case "number":var b=a|0;return b===a?b<<24>>24===b&&1/b!==1/-0?r(ka):b<<16>>16===b&&1/b!==1/-0?r(la):r(ma):a!==a||na(a)===a?r(oa):r(pa);case "boolean":return r(qa);case "undefined":return r(ra);default:if(null===a)throw(new ta).c();return ua(a)?r(va):a&&a.a?r(a.a):null}}function wa(a,b){return a&&a.a||null===a?a.ia(b):"number"===typeof a?"number"===typeof b&&(a===b?0!==a||1/a===1/b:a!==a&&b!==b):a===b}
function xa(a){switch(typeof a){case "string":return ya(za(),a);case "number":return Aa(Ba(),a);case "boolean":return a?1231:1237;case "undefined":return 0;default:return a&&a.a||null===a?a.ta():42}}function Ca(a,b){switch(typeof a){case "string":return a===b?0:a<b?-1:1;case "number":return Da||(Da=(new Ea).c()),Fa(a,b);case "boolean":return a-b;default:return Ga(a,b)?0:Ha(a,b)?1:-1}}function Ia(a,b){return"string"===typeof a?a.charCodeAt(b)&65535:a.vg(b)}
function Ja(a,b,c){return"string"===typeof a?a.substring(b,c):a.kh(b,c)}function Ka(a,b,c,e,g){a=a.b;c=c.b;if(a!==c||e<b||b+g<e)for(var h=0;h<g;h++)c[e+h]=a[b+h];else for(h=g-1;0<=h;h--)c[e+h]=a[b+h]}function Ma(a){if(a&&a.a){var b=a.$idHashCode$0;void 0===b&&(da=b=da+1|0,a.$idHashCode$0=b);return b}return null===a?0:xa(a)}function Na(a){return null===a?s().tb:a}this.__ScalaJSExportsNamespace=ca;
function Oa(a,b,c){this.Tf=this.wg=void 0;this.p={};this.Ye=null;this.ph=a;this.sg=b;this.Ke=this.Le=void 0;this.tc=k(!1);this.name=c;this.isPrimitive=!0;this.isArrayClass=this.isInterface=!1;this.isInstance=k(!1)}
function t(a,b,c,e,g,h,l){var q=fa(a);h=h||function(a){return!!(a&&a.a&&a.a.p[q])};l=l||function(a,b){return!!(a&&a.a&&a.a.Re===b&&a.a.Pe.p[q])};this.wg=void 0;this.Tf=e;this.p=g;this.ph=this.Ye=null;this.sg="L"+c+";";this.Ke=this.Le=void 0;this.tc=l;this.name=c;this.isPrimitive=!1;this.isInterface=b;this.isArrayClass=!1;this.isInstance=h}
function Qa(a){function b(a){if("number"===typeof a){this.b=Array(a);for(var b=0;b<a;b++)this.b[b]=c}else this.b=a}var c=a.ph;"longZero"==c&&(c=s().tb);b.prototype=new u;b.prototype.a=this;var e="["+a.sg,g=a.Pe||a,h=(a.Re||0)+1;this.wg=b;this.Tf=v;this.p={d:1};this.Ye=a;this.Pe=g;this.Re=h;this.ph=null;this.sg=e;this.tc=this.Ke=this.Le=void 0;this.name=e;this.isInterface=this.isPrimitive=!1;this.isArrayClass=!0;this.isInstance=function(a){return g.tc(a,h)}}
function r(a){if(!a.Le){var b=new Ra;b.lc=a;a.Le=b}return a.Le}function x(a){a.Ke||(a.Ke=new Qa(a));return a.Ke}t.prototype.getFakeInstance=function(){return this===ja?"some string":this===qa?!1:this===ka||this===la||this===ma||this===oa||this===pa?0:this===va?s().tb:this===ra?void 0:{a:this}};t.prototype.getSuperclass=function(){return this.Tf?r(this.Tf):null};t.prototype.getComponentType=function(){return this.Ye?r(this.Ye):null};
t.prototype.newArrayOfThisClass=function(a){for(var b=this,c=0;c<a.length;c++)b=x(b);return p(b,a)};Oa.prototype=t.prototype;Qa.prototype=t.prototype;var Sa=new Oa(void 0,"V","void"),Ta=new Oa(!1,"Z","boolean"),Ua=new Oa(0,"C","char"),z=new Oa(0,"B","byte"),Va=new Oa(0,"S","short"),A=new Oa(0,"I","int"),Wa=new Oa("longZero","J","long"),Xa=new Oa(0,"F","float"),Ya=new Oa(0,"D","double"),Za=ea(Ta);Ta.tc=Za;var $a=ea(Ua);Ua.tc=$a;var ab=ea(z);z.tc=ab;var bb=ea(Va);Va.tc=bb;var cb=ea(A);A.tc=cb;
var db=ea(Wa);Wa.tc=db;var eb=ea(Xa);Xa.tc=eb;var fb=ea(Ya);Ya.tc=fb;var B=n.Math.imul||function(a,b){var c=a&65535,e=b&65535;return c*e+((a>>>16&65535)*e+c*(b>>>16&65535)<<16>>>0)|0},na=n.Math.fround||function(a){return+a};function gb(){}function u(){}u.prototype=gb.prototype;gb.prototype.c=function(){return this};gb.prototype.ia=function(a){return this===a};gb.prototype.v=function(){var a=hb(ia(this)),b=(+(this.ta()>>>0)).toString(16);return a+"@"+b};gb.prototype.ta=function(){return Ma(this)};gb.prototype.toString=function(){return this.v()};function ib(a,b){var c=a&&a.a;if(c){var e=c.Re||0;return!(e<b)&&(e>b||!c.Pe.isPrimitive)}return!1}
var v=new t({d:0},!1,"java.lang.Object",null,{d:1},function(a){return null!==a},ib);gb.prototype.a=v;function kb(a){return!!(a&&a.a&&a.a.p.Ha)}function lb(a){return!!(a&&a.a&&a.a.p.Qb)}var mb=new t({Va:0},!0,"scala.collection.immutable.Iterable",void 0,{Va:1,d:1,bb:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,$a:1,R:1,P:1,Q:1,U:1,m:1}),nb=new t({uj:0},!0,"scala.collection.mutable.HashEntry",void 0,{uj:1,d:1});function ob(){}ob.prototype=new u;function pb(){}pb.prototype=ob.prototype;
var qb=new t({Ie:0},!1,"java.io.OutputStream",v,{Ie:1,d:1,xf:1,yf:1});ob.prototype.a=qb;function rb(){this.Hd=this.k=this.W=this.Gd=0}rb.prototype=new u;function sb(){}sb.prototype=rb.prototype;function D(a,b){if(0>b||b>a.W)throw(new F).c();a.k=b;a.Hd>b&&(a.Hd=-1)}rb.prototype.v=function(){return tb(ub((new G).ca(["","[pos\x3d"," lim\x3d"," cap\x3d","]"])),(new G).ca([hb(ia(this)),this.k,this.W,this.Gd]))};function vb(a,b){if(0>b||b>a.Gd)throw(new F).c();a.W=b;a.k>b&&(a.k=b,a.Hd>b&&(a.Hd=-1))}
rb.prototype.aa=function(a){this.W=this.Gd=a;this.k=0;this.Hd=-1;return this};var wb=new t({Je:0},!1,"java.nio.Buffer",v,{Je:1,d:1});rb.prototype.a=wb;function xb(){this.Ip=0}xb.prototype=new u;function yb(a,b){var c=p(x(z),[b]),e=c.b.length;zb||(zb=(new Ab).c());var g=c.b.length;if(0>g||(0+g|0)>c.b.length)throw(new H).c();var h=0+e|0;if(0>e||h>g)throw(new H).c();e=new Bb;e.He=!1;Cb.prototype.Il.call(e,g,c,0);D(e,0);vb(e,h);return e}xb.prototype.a=new t({jk:0},!1,"java.nio.ByteBuffer$",v,{jk:1,d:1});
var Db=void 0;function Eb(){Db||(Db=(new xb).c());return Db}function Fb(){this.Lc=null}Fb.prototype=new u;Fb.prototype.v=f("Lc");Fb.prototype.q=function(a){this.Lc=a;return this};Fb.prototype.a=new t({kk:0},!1,"java.nio.ByteOrder",v,{kk:1,d:1});function Gb(){this.gk=this.th=null}Gb.prototype=new u;Gb.prototype.c=function(){Hb=this;this.th=(new Fb).q("BIG_ENDIAN");this.gk=(new Fb).q("LITTLE_ENDIAN");return this};Gb.prototype.a=new t({lk:0},!1,"java.nio.ByteOrder$",v,{lk:1,d:1});var Hb=void 0;
function Ab(){}Ab.prototype=new u;Ab.prototype.a=new t({nk:0},!1,"java.nio.HeapByteBuffer$",v,{nk:1,d:1});var zb=void 0;function Jb(){}Jb.prototype=new u;Jb.prototype.a=new t({qk:0},!1,"java.nio.StringCharBuffer$",v,{qk:1,d:1});var Kb=void 0;function Lb(){this.Ih=this.kq=this.Xe=null;this.Ka=0}Lb.prototype=new u;function Mb(){}Mb.prototype=Lb.prototype;Lb.prototype.Jg=function(a){this.Xe=a;return this};Lb.prototype.ia=function(a){return a&&a.a&&a.a.p.Cc?this.Xe===a.Xe:!1};Lb.prototype.v=f("Xe");
Lb.prototype.ta=function(){return Nb(I(),this.Xe)};var Ob=new t({Cc:0},!1,"java.nio.charset.Charset",v,{Cc:1,d:1,Ra:1});Lb.prototype.a=Ob;function Pb(){this.ig=null;this.Ka=!1}Pb.prototype=new u;
function Qb(a){if(!a.Ka){var b;Rb||(Rb=(new Sb).c());b={};Tb(Ub(),(new G).ca("iso-8859-1 iso8859-1 iso_8859_1 iso8859_1 iso_8859-1 8859_1 iso_8859-1:1987 latin1 csisolatin1 l1 ibm-819 ibm819 cp819 819 iso-ir-100".split(" "))).ka(Vb(function(a,b){return function(a){Wb||(Wb=(new Xb).c());b[a]=Wb}}(a,b)));Tb(Ub(),(new G).ca("us-ascii ascii7 ascii csascii default cp367 ibm367 iso646-us 646 iso_646.irv:1983 iso_646.irv:1991 ansi_x3.4-1986 ansi_x3.4-1968 iso-ir-6".split(" "))).ka(Vb(function(a,b){return function(a){Yb||
(Yb=(new Zb).c());b[a]=Yb}}(a,b)));Tb(Ub(),(new G).ca(["utf-8","utf_8","utf8","unicode-1-1-utf-8"])).ka(Vb(function(a,b){return function(a){b[a]=$b()}}(a,b)));Tb(Ub(),(new G).ca(["utf-16be","utf_16be","x-utf-16be","iso-10646-ucs-2","unicodebigunmarked"])).ka(Vb(function(a,b){return function(a){ac||(ac=(new bc).c());b[a]=ac}}(a,b)));Tb(Ub(),(new G).ca(["utf-16le","utf_16le","x-utf-16le","unicodelittleunmarked"])).ka(Vb(function(a,b){return function(a){cc||(cc=(new dc).c());b[a]=cc}}(a,b)));Tb(Ub(),
(new G).ca(["utf-16","utf_16","unicode","unicodebig"])).ka(Vb(function(a,b){return function(a){ec||(ec=(new fc).c());b[a]=ec}}(a,b)));a.ig=b;a.Ka=!0}return a.ig}Pb.prototype.a=new t({rk:0},!1,"java.nio.charset.Charset$",v,{rk:1,d:1});var gc=void 0;function hc(){this.nl=null;this.Vj=this.rh=0;this.hg=this.fg=this.gg=null;this.Ae=0}hc.prototype=new u;function ic(){}ic.prototype=hc.prototype;
function jc(a){if(0===a.Gd)return yb(Eb(),1);var b=yb(Eb(),B(2,a.Gd));a.Hd=-1;a.W=a.k;a.k=0;if(a===b)throw(new F).c();if(b.He)throw(new kc).c();if((a.W-a.k|0)>(b.W-b.k|0))throw(new lc).c();var c=a.W-a.k|0;if(null!==a.pc){var e=a.k;mc(b,a.pc,a.Fd+e|0,c);D(a,e+c|0)}else for(;0!==c;)K(b,nc(a)),c=-1+c|0;return b}hc.prototype.mi=function(a,b){hc.prototype.ni.call(this,a,b,b,oc());return this};
hc.prototype.ni=function(a,b,c,e){this.nl=a;this.rh=b;this.Vj=c;this.gg=e;this.fg=pc().Cf;this.hg=pc().Cf;this.Ae=0;return this};hc.prototype.li=aa();var qc=new t({Af:0},!1,"java.nio.charset.CharsetEncoder",v,{Af:1,d:1});hc.prototype.a=qc;function rc(){this.jf=this.uc=0}rc.prototype=new u;rc.prototype.ac=function(a,b){this.uc=a;this.jf=b;return this};
function sc(a){var b=a.uc;switch(b){case 1:throw(new lc).c();case 0:throw(new tc).c();case 2:throw(new uc).aa(a.jf);case 3:throw(new vc).aa(a.jf);default:throw(new L).da(b);}}rc.prototype.a=new t({tk:0},!1,"java.nio.charset.CoderResult",v,{tk:1,d:1});function wc(){this.hq=this.Qp=this.Tp=this.gq=0;this.Cp=this.Ul=this.Tl=this.vi=this.ui=this.Pj=this.ti=this.si=this.ri=this.pd=this.Ec=this.Dc=null}wc.prototype=new u;
wc.prototype.c=function(){xc=this;this.Dc=(new rc).ac(1,-1);this.Ec=(new rc).ac(0,-1);this.pd=(new rc).ac(2,1);this.ri=(new rc).ac(2,2);this.si=(new rc).ac(2,3);this.ti=(new rc).ac(2,4);this.Pj=(new yc).c();this.ui=(new rc).ac(3,1);this.vi=(new rc).ac(3,2);this.Tl=(new rc).ac(3,3);this.Ul=(new rc).ac(3,4);this.Cp=(new yc).c();return this};wc.prototype.a=new t({uk:0},!1,"java.nio.charset.CoderResult$",v,{uk:1,d:1});var xc=void 0;function M(){xc||(xc=(new wc).c());return xc}
function zc(){this.Lc=null}zc.prototype=new u;zc.prototype.v=f("Lc");zc.prototype.q=function(a){this.Lc=a;return this};zc.prototype.a=new t({vk:0},!1,"java.nio.charset.CodingErrorAction",v,{vk:1,d:1});function Ac(){this.Cf=this.Bf=this.wh=null}Ac.prototype=new u;Ac.prototype.c=function(){Bc=this;this.wh=(new zc).q("IGNORE");this.Bf=(new zc).q("REPLACE");this.Cf=(new zc).q("REPORT");return this};Ac.prototype.a=new t({wk:0},!1,"java.nio.charset.CodingErrorAction$",v,{wk:1,d:1});var Bc=void 0;
function pc(){Bc||(Bc=(new Ac).c());return Bc}function Cc(){this.Wq=null;this.oq=!1;this.Di=null;this.Ka=0}Cc.prototype=new u;Cc.prototype.c=function(){Dc=this;return this};function Ec(){Fc()(function(a){return function(){return a.Ne()}}((new Gc).c()))}
function Hc(){var a=Ic();if(0===(4&a.Ka)&&0===(4&a.Ka)){var b;b=Jc(N(),(new G).ca([109,97,105,108,116,111,58,99,111,110,116,97,99,116,64,112,97,114,111,108,97,109,101,97,46,111,114,103]),O().qc);za();N();var c=O().Bc,c=Kc(Lc(),(new Mc).Zd(c).Be);c.sa(b.b.length);for(var e=0,g=b.b.length;e<g;)c.wa((new Nc).Xc(65535&b.b[e])),e=1+e|0;c=c.la();e=0+c.b.length|0;if(0>e||e>c.b.length)throw(new Oc).c();b=[];for(g=0;g!==e;)b.push(c.b[g]),g=1+g|0;c=n.String;e=c.fromCharCode;b=[].concat(b);b=e.apply(c,b);a.Di=
b;a.Ka|=4}return a.Di}Cc.prototype.main=function(){Ec()};Cc.prototype.a=new t({Ak:0},!1,"parolamea.ParolaMea$",v,{Ak:1,d:1,Pq:1,Kp:1});var Dc=void 0;function Ic(){Dc||(Dc=(new Cc).c());return Dc}ca.parolamea=ca.parolamea||{};ca.parolamea.ParolaMea=Ic;function Pc(){this.Lc=null;this.rc=this.Lf=0;this.Nd=s().tb;this.Te=null}Pc.prototype=new u;function Qc(){}m=Qc.prototype=Pc.prototype;m.Ml=function(a,b,c){this.Lc=a;this.Lf=b;this.rc=c;this.Nd=s().tb;this.Te=p(x(z),[c]);Rc(this);return this};
m.ue=function(){this.Nd=s().tb;for(var a=0;a<this.rc;)a=1+a|0,this.Te.b[-1+a|0]=0;Rc(this)};function Sc(a,b,c){var e;e=(new Q).aa(a.rc);e=Tc(a.Nd,e)[1];e=R(e);a.Nd=Uc(a.Nd,(new Q).aa(c));var g=a.rc-e|0,h=0;if(c>=g){Ka(b,0,a.Te,e,g);Vc(a,a.Te,0);for(h=g;(-1+(h+a.rc|0)|0)<c;)Vc(a,b,0+h|0),h=h+a.rc|0;e=0}h<c&&Ka(b,0+h|0,a.Te,e,c-h|0)}
m.af=function(){var a;a=(new Q).aa(Wc().Qg);a=Tc(this.Nd,a)[1];a=R(a);a=56>a?56-a|0:120-a|0;var b=p(x(z),[8+a|0]);b.b[0]=-128;var c=Xc(this.Nd,3);b.b[a]=R(Yc(c,56))<<24>>24;a=1+a|0;b.b[a]=R(Yc(c,48))<<24>>24;a=1+a|0;b.b[a]=R(Yc(c,40))<<24>>24;a=1+a|0;b.b[a]=R(Yc(c,32))<<24>>24;a=1+a|0;b.b[a]=R(Yc(c,24))<<24>>24;a=1+a|0;b.b[a]=R(Yc(c,16))<<24>>24;a=1+a|0;b.b[a]=R(Yc(c,8))<<24>>24;b.b[1+a|0]=R(c)<<24>>24;Sc(this,b,b.b.length);a=Jc(N(),(new G).ca([(this.Qd>>>24|0)<<24>>24,(this.Qd>>>16|0)<<24>>24,(this.Qd>>>
8|0)<<24>>24,this.Qd<<24>>24,(this.Rd>>>24|0)<<24>>24,(this.Rd>>>16|0)<<24>>24,(this.Rd>>>8|0)<<24>>24,this.Rd<<24>>24,(this.Sd>>>24|0)<<24>>24,(this.Sd>>>16|0)<<24>>24,(this.Sd>>>8|0)<<24>>24,this.Sd<<24>>24,(this.Td>>>24|0)<<24>>24,(this.Td>>>16|0)<<24>>24,(this.Td>>>8|0)<<24>>24,this.Td<<24>>24,(this.Ud>>>24|0)<<24>>24,(this.Ud>>>16|0)<<24>>24,(this.Ud>>>8|0)<<24>>24,this.Ud<<24>>24,(this.Vd>>>24|0)<<24>>24,(this.Vd>>>16|0)<<24>>24,(this.Vd>>>8|0)<<24>>24,this.Vd<<24>>24,(this.Wd>>>24|0)<<24>>
24,(this.Wd>>>16|0)<<24>>24,(this.Wd>>>8|0)<<24>>24,this.Wd<<24>>24,(this.Xd>>>24|0)<<24>>24,(this.Xd>>>16|0)<<24>>24,(this.Xd>>>8|0)<<24>>24,this.Xd<<24>>24]),O().kb);this.ue();return a};m.oh=function(a){a=Zc($c(),a);Sc(this,a,a.b.length)};m.De=function(a){Sc(this,a,a.b.length)};var ad=new t({Ah:0},!1,"parolamea.generator.BaseHash",v,{Ah:1,d:1,Bh:1,Sa:1,Qa:1});Pc.prototype.a=ad;
function bd(){this.Lc=this.Sb=this.Ve=this.Bl=this.nc=null;this.Lf=this.rc=0;this.Mf=this.Sf=this.Df=null;this.Ka=this.Oq=this.ye=!1}bd.prototype=new u;m=bd.prototype;
m.ue=function(){this.ye=!1;this.Sb.ue();var a=p(x(z),[this.rc]);if(this.nc.b.length>this.rc){this.Sb.De(this.nc);var b=this.Sb.af();Ka(b,0,a,0,b.b.length)}else Ka(this.nc,0,a,0,this.nc.b.length);this.Df=a;if(0===this.Sf.b.length){a=this.Df;N();b=O().kb;b=Kc(Lc(),(new Mc).Zd(b).Be);b.sa(a.b.length);for(var c=0,e=a.b.length;c<e;){var g=a.b[c]|0;b.wa(cd().Ki.b[g]);c=1+c|0}this.Sf=b.la()}if(0===this.Mf.b.length){a=this.Df;N();b=O().kb;b=Kc(Lc(),(new Mc).Zd(b).Be);b.sa(a.b.length);c=0;for(e=a.b.length;c<
e;)g=a.b[c]|0,b.wa(cd().Ji.b[g]),c=1+c|0;this.Mf=b.la()}this.Sb.De(this.Mf)};m.af=function(){this.ye&&this.ue();this.ye=!0;var a=this.Sb.af();this.Sb.De(this.Sf);this.Sb.De(a);return this.Sb.af()};m.oh=function(a){this.ye&&this.ue();this.Sb.oh(a)};m.De=function(a){this.ye&&this.ue();this.Sb.De(a)};m.a=new t({Dk:0},!1,"parolamea.generator.HMAC",v,{Dk:1,d:1,Bh:1,Sa:1,Qa:1});function dd(){this.Ji=this.Ki=null}dd.prototype=new u;
dd.prototype.c=function(){ed=this;fd();gd().qg;fd();hd();for(var a=(new id).c(),b=0;256!==b;)jd(a,(92^b)<<24>>24),b=1+b|0;a=kd(a);b=O().kb;this.Ki=ld(a,b);fd();gd().qg;fd();hd();a=(new id).c();for(b=0;256!==b;)jd(a,(54^b)<<24>>24),b=1+b|0;a=kd(a);b=O().kb;this.Ji=ld(a,b);return this};dd.prototype.a=new t({Ek:0},!1,"parolamea.generator.HMAC$",v,{Ek:1,d:1});var ed=void 0;function cd(){ed||(ed=(new dd).c());return ed}function md(){this.Nq=this.Zc=null}md.prototype=new u;
md.prototype.c=function(){nd=this;this.Zc=Jc(N(),(new G).ca("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")),od(O(),r(ja)));return this};
function pd(a){var b=Fc()("#inputIdentifier").val();cd();var c=b+"NkSCwmKP95Wpi6xu",b=Wc().Ve,e=new bd,c=Zc($c(),c);e.nc=c;e.Bl=b;e.Ve=b;e.Sb=(e.Ve,Wc(),(new qd).c());e.Lc="hmac-"+e.Sb.Lc;e.rc=e.Sb.rc;e.Lf=e.Sb.Lf;N();e.Df=O().kb.Za(0);N();e.Sf=O().kb.Za(0);N();e.Mf=O().kb.Za(0);e.ye=!0;e.oh(a);a=e.af();b=p(x(A),[a.b.length/4|0]);for(c=e=0;e<b.b.length;)b.b[e]=a.b[c]<<24|(255&a.b[1+c|0])<<16|(255&a.b[2+c|0])<<8|255&a.b[3+c|0],c=4+c|0,e=1+e|0;a=p(x(ja),[4]);e=null;rd||(rd=(new sd).c());var g=0,e=b.b.length,
h=s().tb;a:{var l;for(;;)if(g===e){l=h;break a}else c=1+g|0,g=b.b[g],h=Na(h),h=Uc(td((new Q).Y(31,0,0),h),(new Q).aa(g)),g=c}l=Na(l);b=new ud;b.he=l;e=b;for(l=0;4!==l;){b=l;c=vd(e);if(null!==c)e=c.kc|0,c=c.Xb;else throw(new L).da(c);e|=0;g=vd(c);if(null!==g)c=g.kc|0,g=g.Xb;else throw(new L).da(g);c|=0;h=vd(g);if(null!==h)g=h.kc|0,h=h.Xb;else throw(new L).da(h);var g=g|0,q=vd(h);if(null!==q)h=q.kc|0,q=q.Xb;else throw(new L).da(q);h|=0;a.b[b]=""+wd().Zc.b[(0>e?-e|0:e)%wd().Zc.b.length]+wd().Zc.b[(0>
c?-c|0:c)%wd().Zc.b.length]+wd().Zc.b[(0>g?-g|0:g)%wd().Zc.b.length]+wd().Zc.b[(0>h?-h|0:h)%wd().Zc.b.length];e=q;l=1+l|0}l=xd().xa.Ld();l.sa(a.b.length);l.Ba(yd(new zd,a));return l.la()}md.prototype.a=new t({Fk:0},!1,"parolamea.generator.Password$",v,{Fk:1,d:1});var nd=void 0;function wd(){nd||(nd=(new md).c());return nd}function ud(){this.he=s().tb}ud.prototype=new u;m=ud.prototype;m.dd=k("Random");m.bd=k(1);m.ia=function(a){return this===a?!0:a&&a.a&&a.a.p.Ch?Ga(this.he,a.he):!1};
m.cd=function(a){switch(a){case 0:return this.he;default:throw(new H).q(""+a);}};m.v=function(){return Ad(this)};function vd(a){var b=Bd((new Q).Y(4194303,4194303,15),Uc((new Q).Y(11,0,0),td((new Q).Y(2942573,6011,0),a.he)));a=new ud;a.he=b;b=R(Yc(b,16));return(new Cd).Yd(b,a)}m.ta=function(){var a=-889275714,a=Dd().$c(a,Ed(Dd(),this.he));return Dd().nd(a,1)};m.wd=function(){return Fd(this)};m.a=new t({Ch:0},!1,"parolamea.generator.Random",v,{Ch:1,d:1,ed:1,m:1,g:1,f:1});function sd(){}
sd.prototype=new u;sd.prototype.a=new t({Gk:0},!1,"parolamea.generator.Random$",v,{Gk:1,d:1,g:1,f:1});var rd=void 0;function Gd(){this.Bi=this.Ve=null;this.Qg=0;this.Cd=this.Yj=null;this.Ka=this.qq=!1}Gd.prototype=new u;
Gd.prototype.c=function(){Hd=this;this.Ve=(new Id).c();this.Bi=Jd(N(),1116352408,(new G).ca([1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,
-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998]));this.Qg=64;this.Yj="BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD";this.Cd=p(x(A),[64]);return this};Gd.prototype.a=new t({Ik:0},!1,"parolamea.generator.SHA256$",v,{Ik:1,d:1});var Hd=void 0;
function Wc(){Hd||(Hd=(new Gd).c());return Hd}function Id(){}Id.prototype=new u;Id.prototype.a=new t({Jk:0},!1,"parolamea.generator.SHA256$$anon$1",v,{Jk:1,d:1,Lp:1});function Kd(){this.bk=null}Kd.prototype=new u;Kd.prototype.c=function(){Ld=this;za();for(var a=16,b=p(x(Ua),[a]),c=0;c<a;)b.b[c]=65535&("0123456789ABCDEF".charCodeAt(c)|0),c=1+c|0;this.bk=b;return this};
function Zc(a,b){za();za();var c;gc||(gc=(new Pb).c());c=gc;c=c.Ka?c.ig:Qb(c);c=c.hasOwnProperty("utf-8")?(new Md).da(c["utf-8"]):Nd();if(Od(c))c=c.Dd;else{if(Nd()===c)throw(new Pd).q("UTF-8");throw(new L).da(c);}var e,g=c;c=b.length|0;Kb||(Kb=(new Jb).c());var h=b.length|0;if(0>h||(0+h|0)>("string"===typeof b?b.length|0:b.l()))throw(new H).c();var l=0+c|0;if(0>c||l>h)throw(new H).c();c=Qd(h,b,0,0,l);var q;if(0===(2&g.Ka)&&0===(2&g.Ka)){h=g.Pg();l=pc().Bf;if(null===l)throw(new F).q("null CodingErrorAction");
h.fg=l;l=pc().Bf;if(null===l)throw(new F).q("null CodingErrorAction");h.hg=l;g.Ih=h;g.Ka|=2}g=g.Ih;if(0===(c.W-c.k|0))q=yb(Eb(),0);else{g.Ae=0;g.li();h=na(na(c.W-c.k|0)*g.rh)|0;h=yb(Eb(),h);b:for(;;){d:{var l=g,w=c,J=h;if(3===l.Ae)throw(new Rd).c();l.Ae=2;for(;;){try{var C=l.Bg(w,J)}catch(P){if(P&&P.a&&P.a.p.yh)throw Sd(P);if(P&&P.a&&P.a.p.zh)throw Sd(P);throw P;}if(0===C.uc){var y=w.W-w.k|0;if(0<y){var E=M();switch(y){case 1:y=E.pd;break;case 2:y=E.ri;break;case 3:y=E.si;break;case 4:y=E.ti;break;
default:var sa=E.Pj,E=Td(sa,y);if(Od(E))y=E.Dd;else if(Nd()===E){var La=E=(new rc).ac(2,y),y=Ud(sa,y,La);null===y?Nd():(sa=y.Ja,y.Ja=La,(new Md).da(sa));y=E}else throw(new L).da(E);}}else y=C}else y=C;if(0===y.uc||1===y.uc){l=y;break d}E=3===y.uc?l.hg:l.fg;if(pc().Bf===E){if((J.W-J.k|0)<l.gg.b.length){l=M().Dc;break d}E=l.gg;mc(J,E,0,E.b.length);E=w.k;y=y.jf;if(0>y)throw(new Vd).c();D(w,E+y|0)}else{if(pc().Cf===E){l=y;break d}if(pc().wh===E){E=w.k;y=y.jf;if(0>y)throw(new Vd).c();D(w,E+y|0)}else throw(new L).da(E);
}}l=void 0}if(0===l.uc){Wd(Xd(),c.k===c.W);e=h;break b}else if(1===l.uc)h=jc(h);else throw sc(l),(new Yd).da("should not get here");}b:for(;;){d:switch(C=g,C.Ae){case 2:c=M().Ec;0===c.uc&&(C.Ae=3);C=c;break d;case 3:C=M().Ec;break d;default:throw(new Rd).c();}if(0===C.uc){q=e;break b}else if(1===C.uc)e=jc(e);else throw sc(C),(new Yd).da("should not get here");}e=q;e.Hd=-1;e.W=e.k;e.k=0}e=q;q=e.pc;if(null===q)throw(new Vd).c();if(e.He)throw(new kc).c();for(e=q.b.length;0===q.b[-1+e|0];)e=-1+e|0;return e<
q.b.length?(C=p(x(z),[e]),Ka(q,0,C,0,e),C):q}Kd.prototype.a=new t({Kk:0},!1,"parolamea.generator.Util$",v,{Kk:1,d:1});var Ld=void 0;function $c(){Ld||(Ld=(new Kd).c());return Ld}var ja=new t({dl:0},!1,"java.lang.String",v,{dl:1,f:1,d:1,Pf:1,Ra:1},function(a){return"string"===typeof a});function Cd(){this.Xb=this.kc=null}Cd.prototype=new u;m=Cd.prototype;m.dd=k("Tuple2");m.bd=k(2);m.ia=function(a){return this===a?!0:a&&a.a&&a.a.p.Gh?S(T(),this.kc,a.kc)&&S(T(),this.Xb,a.Xb):!1};
m.Yd=function(a,b){this.kc=a;this.Xb=b;return this};m.cd=function(a){a:switch(a){case 0:a=this.kc;break a;case 1:a=this.Xb;break a;default:throw(new H).q(""+a);}return a};m.v=function(){return"("+this.kc+","+this.Xb+")"};m.ta=function(){return Zd(this)};m.wd=function(){return Fd(this)};m.a=new t({Gh:0},!1,"scala.Tuple2",v,{Gh:1,d:1,tq:1,ed:1,m:1,g:1,f:1});var qa=new t({Xl:0},!1,"java.lang.Boolean",v,{Xl:1,d:1,Ra:1},function(a){return"boolean"===typeof a});function Nc(){this.Ja=0}Nc.prototype=new u;
m=Nc.prototype;m.ia=function(a){return $d(a)?this.Ja===a.Ja:!1};m.v=function(){return n.String.fromCharCode(this.Ja)};m.Xc=function(a){this.Ja=a;return this};m.ta=f("Ja");function $d(a){return!!(a&&a.a&&a.a.p.wi)}m.a=new t({wi:0},!1,"java.lang.Character",v,{wi:1,d:1,Ra:1});function Ra(){this.lc=null}Ra.prototype=new u;function hb(a){return a.lc.name}Ra.prototype.v=function(){return(this.lc.isInterface?"interface ":this.lc.isPrimitive?"":"class ")+hb(this)};
Ra.prototype.a=new t({xi:0},!1,"java.lang.Class",v,{xi:1,d:1});function Ea(){this.el=null;this.Yk=this.Pp=this.Op=this.Nk=this.Mk=this.Sp=this.Rp=this.Up=0;this.lq=null;this.Ka=!1}Ea.prototype=new u;function Fa(a,b){if(a!==a)return b!==b?0:1;if(b!==b)return-1;if(a===b){if(0===a){var c=1/a;return c===1/b?0:0>c?-1:1}return 0}return a<b?-1:1}Ea.prototype.a=new t({am:0},!1,"java.lang.Double$",v,{am:1,d:1});var Da=void 0;function ae(){this.el=null;this.Yk=this.Mk=this.Nk=0}ae.prototype=new u;
function be(a,b,c){return b<<c|b>>>(-c|0)|0}function ce(a,b){var c=b-(1431655765&b>>1)|0,c=(858993459&c)+(858993459&c>>2)|0;return B(16843009,252645135&(c+(c>>4)|0))>>24}function de(a,b){var c=b,c=c|c>>>1|0,c=c|c>>>2|0,c=c|c>>>4|0,c=c|c>>>8|0;return 32-ce(0,c|c>>>16|0)|0}function ee(a,b){return ce(0,-1+(b&(-b|0))|0)}ae.prototype.a=new t({em:0},!1,"java.lang.Integer$",v,{em:1,d:1});var fe=void 0;function U(){fe||(fe=(new ae).c());return fe}function ge(){}ge.prototype=new u;function he(){}
he.prototype=ge.prototype;function ie(a){return!!(a&&a.a&&a.a.p.Yc||"number"===typeof a)}var je=new t({Yc:0},!1,"java.lang.Number",v,{Yc:1,d:1},ie);ge.prototype.a=je;function ke(){this.lb=null}ke.prototype=new u;m=ke.prototype;m.c=function(){ke.prototype.q.call(this,"");return this};function le(a,b){a.lb=""+a.lb+(null===b?"null":b);return a}m.kh=function(a,b){return this.lb.substring(a,b)};m.v=f("lb");function me(a,b){null===b?le(a,null):le(a,ha(b))}m.aa=function(){ke.prototype.q.call(this,"");return this};
function ne(a,b,c,e){return null===b?ne(a,"null",c,e):le(a,ha(Ja(b,c,e)))}m.l=function(){return this.lb.length|0};function oe(a,b){var c=(new Nc).Xc(b).Ja;le(a,n.String.fromCharCode(c))}m.q=function(a){this.lb=a;return this};m.vg=function(a){return 65535&(this.lb.charCodeAt(a)|0)};m.a=new t({lm:0},!1,"java.lang.StringBuilder",v,{lm:1,d:1,Pf:1,Of:1,f:1});function pe(){this.Dl=this.El=this.di=this.Gi=null}pe.prototype=new u;
pe.prototype.c=function(){qe=this;this.Gi=re(!1);this.di=re(!0);this.El=null;this.Dl=n.performance?n.performance.now?function(){return function(){return+n.performance.now()}}(this):n.performance.webkitNow?function(){return function(){return+n.performance.webkitNow()}}(this):function(){return function(){return+(new n.Date).getTime()}}(this):function(){return function(){return+(new n.Date).getTime()}}(this);return this};pe.prototype.a=new t({nm:0},!1,"java.lang.System$",v,{nm:1,d:1});var qe=void 0;
function se(){qe||(qe=(new pe).c());return qe}function te(){this.Bd=this.Gg=null}te.prototype=new u;function ue(){}ue.prototype=te.prototype;te.prototype.c=function(){this.Gg=!1;return this};te.prototype.Kf=function(){this.Gg||(this.Bd=this.qh.aj,this.Gg=!0);return this.Bd};var ve=new t({Ng:0},!1,"java.lang.ThreadLocal",v,{Ng:1,d:1});te.prototype.a=ve;function V(){this.Qq=this.pl=this.Mi=null}V.prototype=new u;function we(){}m=we.prototype=V.prototype;
m.c=function(){V.prototype.sc.call(this,null,null);return this};m.Hf=function(){var a=xe(),b;a:try{b=a.undef()}catch(c){a=ye(ze(),c);if(null!==a){if(Ae(a)){b=a.md;break a}throw Be(ze(),a);}throw c;}this.stackdata=b;return this};m.Jf=f("Mi");m.v=function(){var a=hb(ia(this)),b=this.Jf();return null===b?a:a+": "+b};m.sc=function(a,b){this.Mi=a;this.pl=b;this.Hf();return this};var Ce=new t({ua:0},!1,"java.lang.Throwable",v,{ua:1,d:1,f:1});V.prototype.a=Ce;function De(){}De.prototype=new u;
De.prototype.a=new t({om:0},!1,"java.lang.reflect.Array$",v,{om:1,d:1});var Ee=void 0;function Fe(){}Fe.prototype=new u;function Ge(a,b){for(var c=0;c!==b.b.length;)b.b[c]=0,c=1+c|0}Fe.prototype.a=new t({pm:0},!1,"java.util.Arrays$",v,{pm:1,d:1});var He=void 0;function Ie(){He||(He=(new Fe).c());return He}function Mc(){this.Be=null}Mc.prototype=new u;Mc.prototype.Ld=function(){return Kc(Lc(),this.Be)};Mc.prototype.Zd=function(a){this.Be=a;return this};Mc.prototype.Oe=function(){return Kc(Lc(),this.Be)};
Mc.prototype.a=new t({wm:0},!1,"scala.Array$$anon$2",v,{wm:1,d:1,rf:1});function Je(){}Je.prototype=new u;function Ke(){}Ke.prototype=Je.prototype;var Le=new t({Ni:0},!1,"scala.DeprecatedConsole",v,{Ni:1,d:1});Je.prototype.a=Le;function Me(){}Me.prototype=new u;function Ne(){}Ne.prototype=Me.prototype;var Oe=new t({Oi:0},!1,"scala.FallbackArrayBuilding",v,{Oi:1,d:1});Me.prototype.a=Oe;function Pe(){}Pe.prototype=new u;function Qe(){}Qe.prototype=Pe.prototype;
var Re=new t({Pi:0},!1,"scala.LowPriorityImplicits",v,{Pi:1,d:1});Pe.prototype.a=Re;function Se(){}Se.prototype=new u;function Te(){}Te.prototype=Se.prototype;Se.prototype.c=function(){return this};var Ue=new t({Sg:0},!1,"scala.Option",v,{Sg:1,d:1,ed:1,m:1,g:1,f:1});Se.prototype.a=Ue;function Ve(){}Ve.prototype=new u;Ve.prototype.Ld=function(){return(new We).c()};Ve.prototype.Oe=function(){return(new We).c()};Ve.prototype.a=new t({Dm:0},!1,"scala.Predef$$anon$3",v,{Dm:1,d:1,rf:1});
function Xe(){}Xe.prototype=new u;function Ye(){}Ye.prototype=Xe.prototype;Xe.prototype.c=function(){return this};Xe.prototype.v=k("\x3cfunction1\x3e");var Ze=new t({Qi:0},!1,"scala.Predef$$eq$colon$eq",v,{Qi:1,d:1,w:1,g:1,f:1});Xe.prototype.a=Ze;function $e(){}$e.prototype=new u;function af(){}af.prototype=$e.prototype;$e.prototype.c=function(){return this};$e.prototype.v=k("\x3cfunction1\x3e");var bf=new t({Ri:0},!1,"scala.Predef$$less$colon$less",v,{Ri:1,d:1,w:1,g:1,f:1});$e.prototype.a=bf;
function cf(){}cf.prototype=new u;cf.prototype.a=new t({Em:0},!1,"scala.Predef$any2stringadd$",v,{Em:1,d:1});var df=void 0;function ef(){this.bc=null}ef.prototype=new u;m=ef.prototype;m.dd=k("StringContext");m.bd=k(1);m.ia=function(a){if(this===a)return!0;if(a&&a.a&&a.a.p.Ti){var b=this.bc;a=a.bc;return null===b?null===a:b.ia(a)}return!1};m.cd=function(a){switch(a){case 0:return this.bc;default:throw(new H).q(""+a);}};m.v=function(){return Ad(this)};
function ff(a,b){if(a.bc.l()!==(1+b.l()|0))throw(new F).q("wrong number of arguments ("+b.l()+") for interpolated string with "+a.bc.l()+" parts");}
function tb(a,b){var c=function(){return function(a){gf||(gf=(new hf).c());a:{var b=a.length|0,c=jf(za(),a,92);switch(c){case -1:break a;default:var e=(new ke).c();b:{var g=c,c=0;for(;;)if(0<=g){g>c&&ne(e,a,c,g);c=1+g|0;if(c>=b)throw kf(a,g);var h=65535&(a.charCodeAt(c)|0);switch(h){case 98:g=8;break;case 116:g=9;break;case 110:g=10;break;case 102:g=12;break;case 114:g=13;break;case 34:g=34;break;case 39:g=39;break;case 92:g=92;break;default:if(48<=h&&55>=h){h=65535&(a.charCodeAt(c)|0);g=-48+h|0;
c=1+c|0;if(c<b&&48<=(65535&(a.charCodeAt(c)|0))&&55>=(65535&(a.charCodeAt(c)|0))){var l=c,g=-48+(B(8,g)+(65535&(a.charCodeAt(l)|0))|0)|0,c=1+c|0;c<b&&51>=h&&48<=(65535&(a.charCodeAt(c)|0))&&55>=(65535&(a.charCodeAt(c)|0))&&(h=c,g=-48+(B(8,g)+(65535&(a.charCodeAt(h)|0))|0)|0,c=1+c|0)}c=-1+c|0;g&=65535}else throw kf(a,g);}c=1+c|0;oe(e,g);g=c;za();h=a;l=lf(92);h=h.indexOf(l,c)|0;c=g;g=h}else{c<b&&ne(e,a,c,b);a=e.lb;break b}a=void 0}}}return a}}(a);ff(a,b);for(var e=a.bc.fa(),g=b.fa(),h=e.ga(),h=(new ke).q(c(h));g.ja();){me(h,
g.ga());var l=e.ga();le(h,c(l))}return h.lb}function ub(a){var b=new ef;b.bc=a;return b}m.ta=function(){return Zd(this)};m.wd=function(){return Fd(this)};m.a=new t({Ti:0},!1,"scala.StringContext",v,{Ti:1,d:1,ed:1,m:1,g:1,f:1});function hf(){}hf.prototype=new u;hf.prototype.a=new t({Fm:0},!1,"scala.StringContext$",v,{Fm:1,d:1,g:1,f:1});var gf=void 0;function mf(){}mf.prototype=new u;mf.prototype.c=function(){nf=this;return this};
mf.prototype.a=new t({Hm:0},!1,"scala.math.Equiv$",v,{Hm:1,d:1,wq:1,g:1,f:1});var nf=void 0;function of(){}of.prototype=new u;of.prototype.a=new t({Im:0},!1,"scala.math.Fractional$",v,{Im:1,d:1,g:1,f:1});var pf=void 0;function qf(){}qf.prototype=new u;qf.prototype.a=new t({Jm:0},!1,"scala.math.Integral$",v,{Jm:1,d:1,g:1,f:1});var rf=void 0;function sf(){}sf.prototype=new u;sf.prototype.a=new t({Km:0},!1,"scala.math.Numeric$",v,{Km:1,d:1,g:1,f:1});var tf=void 0;function uf(){}uf.prototype=new u;
uf.prototype.a=new t({Lm:0},!1,"scala.math.Ordered$",v,{Lm:1,d:1});var vf=void 0;function wf(){}wf.prototype=new u;wf.prototype.c=function(){xf=this;return this};wf.prototype.a=new t({Mm:0},!1,"scala.math.Ordering$",v,{Mm:1,d:1,xq:1,g:1,f:1});var xf=void 0;
function yf(){this.Xk=this.hk=this.Zj=this.Vk=this.Uk=this.Tk=this.dk=this.ak=this.$j=this.Hp=this.Gp=this.Wk=this.bl=this.gl=this.Tj=this.al=this.Sj=this.Uj=this.Rj=this.Rk=this.ik=this.fk=this.ck=this.Zk=this.ek=this.fl=this.le=null;this.Ka=0}yf.prototype=new u;
yf.prototype.c=function(){zf=this;this.le=(new Af).c();Bf||(Bf=(new Cf).c());this.fl=Bf;Df||(Df=(new Ef).c());this.ek=Df;this.Zk=Ub();this.ck=gd();this.fk=Ff();this.ik=xd();this.Rk=Gf();Hf||(Hf=(new If).c());this.Rj=Hf;Jf||(Jf=(new Kf).c());this.Uj=Jf;Lf||(Lf=(new Mf).c());this.Sj=Lf;this.al=Nf();Of||(Of=(new Pf).c());this.Tj=Of;this.gl=hd();Qf||(Qf=(new Rf).c());this.bl=Qf;Sf||(Sf=(new Tf).c());this.Wk=Sf;nf||(nf=(new mf).c());this.$j=nf;pf||(pf=(new of).c());this.ak=pf;rf||(rf=(new qf).c());this.dk=
rf;tf||(tf=(new sf).c());this.Tk=tf;vf||(vf=(new uf).c());this.Uk=vf;xf||(xf=(new wf).c());this.Vk=xf;Uf||(Uf=(new Vf).c());this.Zj=Uf;Wf||(Wf=(new Xf).c());this.hk=Wf;Yf||(Yf=(new Zf).c());this.Xk=Yf;return this};yf.prototype.a=new t({Om:0},!1,"scala.package$",v,{Om:1,d:1});var zf=void 0;function Af(){}Af.prototype=new u;Af.prototype.v=k("object AnyRef");Af.prototype.a=new t({Pm:0},!1,"scala.package$$anon$1",v,{Pm:1,d:1,uq:1});function W(){this.Nj=null;this.hi=0}W.prototype=new u;
function $f(){}$f.prototype=W.prototype;W.prototype.ia=function(a){return this===a};W.prototype.v=f("Nj");W.prototype.q=function(a){this.Nj=a;this.hi=Ma(this);return this};W.prototype.ta=f("hi");var ag=new t({Mc:0},!1,"scala.reflect.AnyValManifest",v,{Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});W.prototype.a=ag;function bg(){this.jd=this.id=this.Jd=this.Tc=this.Id=this.Vc=this.Pc=this.Qc=this.Rc=this.Sc=this.qc=this.Bc=this.Uc=this.kb=null}bg.prototype=new u;
bg.prototype.c=function(){cg=this;this.kb=X().kb;this.Uc=X().Uc;this.Bc=X().Bc;this.qc=X().qc;this.Sc=X().Sc;this.Rc=X().Rc;this.Qc=X().Qc;this.Pc=X().Pc;this.Vc=X().Vc;this.Id=X().Id;this.Tc=X().Tc;this.Jd=X().Jd;this.id=X().id;this.jd=X().jd;return this};bg.prototype.a=new t({Qm:0},!1,"scala.reflect.ClassManifestFactory$",v,{Qm:1,d:1});var cg=void 0;
function dg(){this.jd=this.id=this.le=this.Jd=this.Tc=this.Id=this.Vc=this.Pc=this.Qc=this.Rc=this.Sc=this.qc=this.Bc=this.Uc=this.kb=this.Eh=this.Dh=this.Fh=null}dg.prototype=new u;
dg.prototype.c=function(){eg=this;this.Fh=r(v);this.Dh=r(fg);this.Eh=r(gg);this.kb=hg().sb.kb;this.Uc=hg().sb.Uc;this.Bc=hg().sb.Bc;this.qc=hg().sb.qc;this.Sc=hg().sb.Sc;this.Rc=hg().sb.Rc;this.Qc=hg().sb.Qc;this.Pc=hg().sb.Pc;this.Vc=hg().sb.Vc;this.Id=hg().sb.Id;this.Tc=hg().sb.Tc;this.Jd=hg().sb.Jd;this.le=hg().sb.le;this.id=hg().sb.id;this.jd=hg().sb.jd;return this};
function od(a,b){var c;b===r(z)?c=O().kb:b===r(Va)?c=O().Uc:b===r(Ua)?c=O().Bc:b===r(A)?c=O().qc:b===r(Wa)?c=O().Sc:b===r(Xa)?c=O().Rc:b===r(Ya)?c=O().Qc:b===r(Ta)?c=O().Pc:b===r(Sa)?c=O().Vc:a.Fh===b?c=O().Tc:a.Dh===b?c=O().id:a.Eh===b?c=O().jd:(c=new ig,c.Uf=b);return c}dg.prototype.a=new t({Rm:0},!1,"scala.reflect.ClassTag$",v,{Rm:1,d:1,g:1,f:1});var eg=void 0;function O(){eg||(eg=(new dg).c());return eg}function ig(){this.Uf=null}ig.prototype=new u;m=ig.prototype;
m.Za=function(a){var b=this.Eb();b===r(z)?a=p(x(z),[a]):b===r(Va)?a=p(x(Va),[a]):b===r(Ua)?a=p(x(Ua),[a]):b===r(A)?a=p(x(A),[a]):b===r(Wa)?a=p(x(Wa),[a]):b===r(Xa)?a=p(x(Xa),[a]):b===r(Ya)?a=p(x(Ya),[a]):b===r(Ta)?a=p(x(Ta),[a]):b===r(Sa)?a=p(x(ra),[a]):(Ee||(Ee=(new De).c()),a=this.Eb().lc.newArrayOfThisClass([a]));return a};m.ia=function(a){var b;a&&a.a&&a.a.p.ob?(b=this.Eb(),a=a.Eb(),b=b===a):b=!1;return b};m.v=function(){return jg(this,this.Uf)};m.Eb=f("Uf");m.ta=function(){return Nb(I(),this.Uf)};
m.a=new t({Sm:0},!1,"scala.reflect.ClassTag$$anon$1",v,{Sm:1,d:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function kg(){this.id=this.jd=this.Jd=this.le=this.Tc=this.Id=this.Zi=this.Yi=this.Wf=this.Vc=this.Pc=this.Qc=this.Rc=this.Sc=this.qc=this.Bc=this.Uc=this.kb=null}kg.prototype=new u;
kg.prototype.c=function(){lg=this;this.kb=(new mg).c();this.Uc=(new pg).c();this.Bc=(new qg).c();this.qc=(new rg).c();this.Sc=(new sg).c();this.Rc=(new tg).c();this.Qc=(new ug).c();this.Pc=(new vg).c();this.Vc=(new wg).c();this.Wf=r(v);this.Yi=r(fg);this.Zi=r(gg);this.Id=(new xg).c();this.le=this.Tc=(new yg).c();this.Jd=(new zg).c();this.jd=(new Ag).c();this.id=(new Bg).c();return this};kg.prototype.a=new t({Tm:0},!1,"scala.reflect.ManifestFactory$",v,{Tm:1,d:1});var lg=void 0;
function X(){lg||(lg=(new kg).c());return lg}function Cg(){this.Bp=this.Li=this.um=null}Cg.prototype=new u;function Dg(){}Dg.prototype=Cg.prototype;Cg.prototype.Eb=f("Li");Cg.prototype.Pl=function(a,b,c){this.um=a;this.Li=b;this.Bp=c;return this};var Eg=new t({be:0},!1,"scala.reflect.ManifestFactory$ClassTypeManifest",v,{be:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});Cg.prototype.a=Eg;function Fg(){}Fg.prototype=new u;Fg.prototype.v=k("\x3c?\x3e");
Fg.prototype.a=new t({hn:0},!1,"scala.reflect.NoManifest$",v,{hn:1,d:1,qb:1,g:1,f:1});var Gg=void 0;function Hg(){this.sb=this.uh=null}Hg.prototype=new u;Hg.prototype.c=function(){Ig=this;cg||(cg=(new bg).c());this.uh=cg;this.sb=X();return this};Hg.prototype.a=new t({jn:0},!1,"scala.reflect.package$",v,{jn:1,d:1});var Ig=void 0;function hg(){Ig||(Ig=(new Hg).c());return Ig}function Jg(){this.nh=this.aj=null}Jg.prototype=new u;Jg.prototype.v=function(){return"DynamicVariable("+this.nh.Kf()+")"};
Jg.prototype.da=function(a){this.aj=a;a=new Kg;if(null===this)throw Be(ze(),null);a.qh=this;Lg.prototype.c.call(a);this.nh=a;return this};Jg.prototype.a=new t({kn:0},!1,"scala.util.DynamicVariable",v,{kn:1,d:1});function Vf(){}Vf.prototype=new u;Vf.prototype.a=new t({mn:0},!1,"scala.util.Either$",v,{mn:1,d:1});var Uf=void 0;function Xf(){}Xf.prototype=new u;Xf.prototype.v=k("Left");Xf.prototype.a=new t({nn:0},!1,"scala.util.Left$",v,{nn:1,d:1,g:1,f:1});var Wf=void 0;function Zf(){}Zf.prototype=new u;
Zf.prototype.v=k("Right");Zf.prototype.a=new t({on:0},!1,"scala.util.Right$",v,{on:1,d:1,g:1,f:1});var Yf=void 0;function Mg(){this.In=null}Mg.prototype=new u;Mg.prototype.c=function(){this.In=(new Ng).c();return this};Mg.prototype.a=new t({qn:0},!1,"scala.util.control.Breaks",v,{qn:1,d:1});function Og(){this.sh=!1}Og.prototype=new u;Og.prototype.c=function(){Pg=this;this.sh=!1;return this};Og.prototype.a=new t({rn:0},!1,"scala.util.control.NoStackTrace$",v,{rn:1,d:1,g:1,f:1});var Pg=void 0;
function Qg(){}Qg.prototype=new u;function Rg(){}Rg.prototype=Qg.prototype;Qg.prototype.Qf=function(a,b){var c;c=B(-862048943,b);c=be(U(),c,15);c=B(461845907,c);return a^c};Qg.prototype.$c=function(a,b){var c=this.Qf(a,b),c=be(U(),c,13);return-430675100+B(5,c)|0};
function Sg(a,b,c){var e=(new Tg).aa(0),g=(new Tg).aa(0),h=(new Tg).aa(0),l=(new Tg).aa(1);b.ka(Vb(function(a,b,c,e,g){return function(a){a=Nb(I(),a);b.$=b.$+a|0;c.$^=a;0!==a&&(g.$=B(g.$,a));e.$=1+e.$|0}}(a,e,g,h,l)));b=a.$c(c,e.$);b=a.$c(b,g.$);b=a.Qf(b,l.$);return a.nd(b,h.$)}function Zd(a){var b=Ug(),c=a.bd();if(0===c)return a=a.dd(),ya(za(),a);for(var e=-889275714,g=0;g<c;)e=b.$c(e,Nb(I(),a.cd(g))),g=1+g|0;return b.nd(e,c)}
Qg.prototype.nd=function(a,b){var c=a^b,c=B(-2048144789,c^(c>>>16|0)),c=c^(c>>>13|0),c=B(-1028477387,c);return c^=c>>>16|0};function Vg(a,b,c){var e=(new Tg).aa(0);c=(new Tg).aa(c);b.ka(Vb(function(a,b,c){return function(e){c.$=a.$c(c.$,Nb(I(),e));b.$=1+b.$|0}}(a,e,c)));return a.nd(c.$,e.$)}var Wg=new t({Ui:0},!1,"scala.util.hashing.MurmurHash3",v,{Ui:1,d:1});Qg.prototype.a=Wg;function Xg(){}Xg.prototype=new u;
function Yg(a,b){var c=B(-1640532531,b);U();return B(-1640532531,c<<24|16711680&c<<8|65280&(c>>>8|0)|c>>>24|0)}Xg.prototype.a=new t({tn:0},!1,"scala.util.hashing.package$",v,{tn:1,d:1});var Zg=void 0;function $g(){Zg||(Zg=(new Xg).c());return Zg}function Mf(){}Mf.prototype=new u;Mf.prototype.a=new t({un:0},!1,"scala.collection.$colon$plus$",v,{un:1,d:1});var Lf=void 0;function Kf(){}Kf.prototype=new u;Kf.prototype.a=new t({vn:0},!1,"scala.collection.$plus$colon$",v,{vn:1,d:1});var Jf=void 0;
function ah(){}ah.prototype=new u;function bh(){}m=bh.prototype=ah.prototype;m.Wa=function(){return this};m.xg=function(a,b){this.Gc(a,b,ch(I(),a)-b|0)};m.c=function(){return this};m.t=function(){return!this.ja()};m.v=function(){return(this.ja()?"non-empty":"empty")+" iterator"};m.ka=function(a){dh(this,a)};m.zc=function(){var a=eh().xa.Ld();a.Ba(this.Wa());return a.la()};m.ha=function(){return fh(this)};m.kf=function(){return gh(this,"","","")};m.Wb=function(){return hh(this)};
m.Me=function(a,b,c,e){return ih(this,a,b,c,e)};m.qi=k(!1);m.Gc=function(a,b,c){if(!(0<=b&&(b<ch(I(),a)||0===ch(I(),a))))throw(new F).q("requirement failed: "+tb(ub((new G).ca(["start "," out of range ",""])),(new G).ca([b,ch(I(),a)])));var e=b,g=ch(I(),a)-b|0;for(b=b+(c<g?c:g)|0;e<b&&this.ja();)jh(I(),a,e,this.ga()),e=1+e|0};var kh=new t({Tb:0},!1,"scala.collection.AbstractIterator",v,{Tb:1,d:1,dc:1,s:1,r:1});ah.prototype.a=kh;function lh(){}lh.prototype=new u;function mh(){}m=mh.prototype=lh.prototype;
m.xg=function(a,b){this.Gc(a,b,ch(I(),a)-b|0)};m.Og=function(a){return this.te("",a,"")};m.te=function(a,b,c){return gh(this,a,b,c)};m.zc=function(){var a=eh().xa;return nh(this,a)};m.kf=function(){return this.Og("")};m.Me=function(a,b,c,e){return ih(this,a,b,c,e)};m.Rg=function(){return this};m.qi=k(!0);m.Mj=function(a){return ld(this,a)};m.ma=function(){return this.pb().ma()};
m.yc=function(){var a=hb(ia(this.Rg())),b;za();b=a;var c=lf(46);b=b.lastIndexOf(c)|0;-1!==b&&(a=a.substring(1+b|0));b=jf(za(),a,36);-1!==b&&(a=a.substring(0,b));return a};var oh=new t({y:0},!1,"scala.collection.AbstractTraversable",v,{y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1});lh.prototype.a=oh;function ph(){this.mc=null}ph.prototype=new u;ph.prototype.c=function(){qh=this;this.mc=(new rh).c();return this};ph.prototype.a=new t({An:0},!1,"scala.collection.Iterator$",v,{An:1,d:1});var qh=void 0;
function Ff(){qh||(qh=(new ph).c());return qh}function sh(){}sh.prototype=new u;function th(){}th.prototype=sh.prototype;var uh=new t({Xf:0},!1,"scala.collection.generic.GenMapFactory",v,{Xf:1,d:1});sh.prototype.a=uh;function vh(){this.Xa=null}vh.prototype=new u;function wh(){}wh.prototype=vh.prototype;vh.prototype.Ld=function(){return this.Xa.ma()};vh.prototype.Oe=function(a){return a.pb().ma()};vh.prototype.gf=function(a){if(null===a)throw Be(ze(),null);this.Xa=a;return this};
var xh=new t({Yf:0},!1,"scala.collection.generic.GenTraversableFactory$GenericCanBuildFrom",v,{Yf:1,d:1,rf:1});vh.prototype.a=xh;function yh(){}yh.prototype=new u;function zh(){}zh.prototype=yh.prototype;function Tb(a,b){if(b.t())return a.ne();var c=a.ma();c.Ba(b);return c.la()}yh.prototype.ne=function(){return this.ma().la()};var Ah=new t({ra:0},!1,"scala.collection.generic.GenericCompanion",v,{ra:1,d:1});yh.prototype.a=Ah;function If(){}If.prototype=new u;If.prototype.v=k("::");
If.prototype.a=new t({Ln:0},!1,"scala.collection.immutable.$colon$colon$",v,{Ln:1,d:1,g:1,f:1});var Hf=void 0;function Bh(){}Bh.prototype=new u;Bh.prototype.c=function(){return this};Bh.prototype.o=function(){return this};Bh.prototype.v=k("\x3cfunction1\x3e");Bh.prototype.a=new t({Un:0},!1,"scala.collection.immutable.List$$anon$1",v,{Un:1,d:1,w:1});function Ch(){this.dh=this.nb=null}Ch.prototype=new u;m=Ch.prototype;m.c=function(){Ch.prototype.se.call(this,Dh());return this};
m.Ea=function(a){return Eh(this,a)};m.se=function(a){var b=Fh((new Gh).c(),a);this.nb=Hh(b);b=(new Ih).c();this.dh=Y(b,a);return this};m.la=function(){for(var a=this.nb,b=Dh(),a=a.va;!a.t();)var c=a.pa(),b=Jh(b,c),a=a.na();return b};m.jc=function(a,b){Kh(this,a,b)};m.wa=function(a){return Eh(this,a)};m.sa=aa();function Eh(a,b){null===Lh(a.dh,b)&&(Mh(a.nb,b),Nh(a.dh,b));return a}m.Ba=function(a){return Y(this,a)};
m.a=new t({Yn:0},!1,"scala.collection.immutable.ListSet$ListSetBuilder",v,{Yn:1,d:1,Ia:1,Da:1,Ca:1});function Tf(){this.Lk=0}Tf.prototype=new u;Tf.prototype.c=function(){Sf=this;this.Lk=512;return this};Tf.prototype.a=new t({bo:0},!1,"scala.collection.immutable.Range$",v,{bo:1,d:1,g:1,f:1});var Sf=void 0;function Pf(){}Pf.prototype=new u;Pf.prototype.a=new t({lo:0},!1,"scala.collection.immutable.Stream$$hash$colon$colon$",v,{lo:1,d:1});var Of=void 0;
function Oh(){this.Xa=this.Bd=this.jh=null;this.Ka=!1}Oh.prototype=new u;function Ph(a,b,c){a.jh=c;if(null===b)throw Be(ze(),null);a.Xa=b;return a}function Qh(a){a.Ka||(a.Bd=a.jh.Ne(),a.Ka=!0);a.jh=null;return a.Bd}Oh.prototype.a=new t({qo:0},!1,"scala.collection.immutable.StreamIterator$LazyCell",v,{qo:1,d:1});function id(){this.$e=this.ae=this.Se=0;this.Zh=this.Wh=this.Th=this.Qh=this.Nh=this.bf=null}id.prototype=new u;m=id.prototype;m.ya=f("Th");
m.c=function(){this.bf=p(x(v),[32]);this.$e=1;this.ae=this.Se=0;return this};m.Yb=f("$e");m.Ea=function(a){return jd(this,a)};m.cf=d("Zh");m.eb=f("bf");m.mb=f("Wh");m.fb=d("Qh");
function jd(a,b){if(a.ae>=a.bf.b.length){var c=32+a.Se|0,e=a.Se^c;if(1024>e)1===a.Yb()&&(a.Fa(p(x(v),[32])),a.X().b[0]=a.eb(),a.ld(1+a.Yb()|0)),a.Pa(p(x(v),[32])),a.X().b[31&c>>5]=a.eb();else if(32768>e)2===a.Yb()&&(a.fb(p(x(v),[32])),a.ea().b[0]=a.X(),a.ld(1+a.Yb()|0)),a.Pa(p(x(v),[32])),a.Fa(p(x(v),[32])),a.X().b[31&c>>5]=a.eb(),a.ea().b[31&c>>10]=a.X();else if(1048576>e)3===a.Yb()&&(a.Nb(p(x(v),[32])),a.ya().b[0]=a.ea(),a.ld(1+a.Yb()|0)),a.Pa(p(x(v),[32])),a.Fa(p(x(v),[32])),a.fb(p(x(v),[32])),
a.X().b[31&c>>5]=a.eb(),a.ea().b[31&c>>10]=a.X(),a.ya().b[31&c>>15]=a.ea();else if(33554432>e)4===a.Yb()&&(a.Hc(p(x(v),[32])),a.mb().b[0]=a.ya(),a.ld(1+a.Yb()|0)),a.Pa(p(x(v),[32])),a.Fa(p(x(v),[32])),a.fb(p(x(v),[32])),a.Nb(p(x(v),[32])),a.X().b[31&c>>5]=a.eb(),a.ea().b[31&c>>10]=a.X(),a.ya().b[31&c>>15]=a.ea(),a.mb().b[31&c>>20]=a.ya();else if(1073741824>e)5===a.Yb()&&(a.cf(p(x(v),[32])),a.Ic().b[0]=a.mb(),a.ld(1+a.Yb()|0)),a.Pa(p(x(v),[32])),a.Fa(p(x(v),[32])),a.fb(p(x(v),[32])),a.Nb(p(x(v),[32])),
a.Hc(p(x(v),[32])),a.X().b[31&c>>5]=a.eb(),a.ea().b[31&c>>10]=a.X(),a.ya().b[31&c>>15]=a.ea(),a.mb().b[31&c>>20]=a.ya(),a.Ic().b[31&c>>25]=a.mb();else throw(new F).c();a.Se=c;a.ae=0}a.bf.b[a.ae]=b;a.ae=1+a.ae|0;return a}m.la=function(){return kd(this)};m.Fa=d("Nh");m.jc=function(a,b){Kh(this,a,b)};m.Hc=d("Wh");m.X=f("Nh");m.Ic=f("Zh");function kd(a){var b=a.Se+a.ae|0;if(0===b)return hd().og;var c=(new Rh).Y(0,b,0);Sh(c,a,a.$e);1<a.$e&&Th(c,0,-1+b|0);return c}m.wa=function(a){return jd(this,a)};
m.sa=aa();m.ld=d("$e");m.ea=f("Qh");m.Pa=d("bf");m.Ba=function(a){return Y(this,a)};m.Nb=d("Th");m.a=new t({uo:0},!1,"scala.collection.immutable.VectorBuilder",v,{uo:1,d:1,Ia:1,Da:1,Ca:1,hj:1});function Uh(){}Uh.prototype=new u;function Vh(){}Vh.prototype=Uh.prototype;Uh.prototype.jc=function(a,b){Kh(this,a,b)};var Wh=new t({vc:0},!1,"scala.collection.mutable.ArrayBuilder",v,{vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});Uh.prototype.a=Wh;function Xh(){}Xh.prototype=new u;
function Kc(a,b){var c=b.Eb();return c===r(z)?(new Yh).c():c===r(Va)?(new Zh).c():c===r(Ua)?(new $h).c():c===r(A)?(new ai).c():c===r(Wa)?(new bi).c():c===r(Xa)?(new ci).c():c===r(Ya)?(new di).c():c===r(Ta)?(new ei).c():c===r(Sa)?(new fi).c():(new gi).Zd(b)}Xh.prototype.a=new t({yo:0},!1,"scala.collection.mutable.ArrayBuilder$",v,{yo:1,d:1,g:1,f:1});var hi=void 0;function Lc(){hi||(hi=(new Xh).c());return hi}function ii(){this.vd=this.Ja=this.nc=null}ii.prototype=new u;
function ji(a){return"(kv: "+a.nc+", "+a.Ja+")"+(null!==a.vd?" -\x3e "+ji(a.vd):"")}ii.prototype.Yd=function(a,b){this.nc=a;this.Ja=b;return this};ii.prototype.v=function(){return ji(this)};ii.prototype.a=new t({zo:0},!1,"scala.collection.mutable.DefaultEntry",v,{zo:1,d:1,uj:1,g:1,f:1});function ki(){}ki.prototype=new u;ki.prototype.lf=function(a,b){if(!(500>a))throw(new Yd).da("assertion failed: loadFactor too large; must be \x3c 0.5");return R(li(td((new Q).aa(b),(new Q).aa(a))))};
ki.prototype.a=new t({Ao:0},!1,"scala.collection.mutable.FlatHashTable$",v,{Ao:1,d:1});var mi=void 0;function ni(){mi||(mi=(new ki).c());return mi}function oi(){}oi.prototype=new u;oi.prototype.v=k("NullSentinel");oi.prototype.ta=k(0);oi.prototype.a=new t({Co:0},!1,"scala.collection.mutable.FlatHashTable$NullSentinel$",v,{Co:1,d:1});var pi=void 0;function qi(){pi||(pi=(new oi).c());return pi}function ri(){this.nb=this.mc=null}ri.prototype=new u;function si(a,b){a.mc=b;a.nb=b;return a}m=ri.prototype;
m.Ea=function(a){this.nb.Ea(a);return this};m.la=f("nb");m.jc=function(a,b){Kh(this,a,b)};m.wa=function(a){this.nb.Ea(a);return this};m.sa=aa();m.Ba=function(a){return Y(this,a)};m.a=new t({Do:0},!1,"scala.collection.mutable.GrowingBuilder",v,{Do:1,d:1,Ia:1,Da:1,Ca:1});function ti(){}ti.prototype=new u;function ui(){vi();return wi(0,16)}ti.prototype.lf=function(a,b){return R(li(td((new Q).aa(b),(new Q).aa(a))))};
function wi(a,b){var c=-1+b|0,c=c|c>>>1|0,c=c|c>>>2|0,c=c|c>>>4|0,c=c|c>>>8|0;return 1+(c|c>>>16|0)|0}ti.prototype.a=new t({Ho:0},!1,"scala.collection.mutable.HashTable$",v,{Ho:1,d:1});var xi=void 0;function vi(){xi||(xi=(new ti).c());return xi}function yi(){this.bc=null}yi.prototype=new u;function zi(){}m=zi.prototype=yi.prototype;m.c=function(){this.bc=(new Gh).c();return this};m.Ea=function(a){return Ai(this,a)};
function Ai(a,b){var c=a.bc;xd();var e=(new G).ca([b]),g=xd().xa;Mh(c,nh(e,g));return a}m.jc=function(a,b){Kh(this,a,b)};m.wa=function(a){return Ai(this,a)};m.sa=aa();m.Ba=function(a){Mh(this.bc,a);return this};var Bi=new t({vj:0},!1,"scala.collection.mutable.LazyBuilder",v,{vj:1,d:1,Ia:1,Da:1,Ca:1});yi.prototype.a=Bi;function Ci(){this.nb=this.mc=null}Ci.prototype=new u;m=Ci.prototype;m.Ea=function(a){return Di(this,a)};m.la=f("nb");function Di(a,b){a.nb=a.nb.Ac(b);return a}
m.jc=function(a,b){Kh(this,a,b)};function Ei(a,b){a.mc=b;a.nb=b;return a}m.wa=function(a){return Di(this,a)};m.sa=aa();m.Ba=function(a){return Y(this,a)};m.a=new t({Qo:0},!1,"scala.collection.mutable.SetBuilder",v,{Qo:1,d:1,Ia:1,Da:1,Ca:1});function Rf(){}Rf.prototype=new u;Rf.prototype.a=new t({To:0},!1,"scala.collection.mutable.StringBuilder$",v,{To:1,d:1,g:1,f:1});var Qf=void 0;function Fi(){this.nb=this.sm=this.mh=null;this.gd=this.Wc=0}Fi.prototype=new u;m=Fi.prototype;
m.Zd=function(a){this.sm=this.mh=a;this.gd=this.Wc=0;return this};m.Ea=function(a){return Gi(this,a)};function Gi(a,b){var c=1+a.gd|0;if(a.Wc<c){for(var e=0===a.Wc?16:B(2,a.Wc);e<c;)e=B(2,e);c=e;a.nb=Hi(a,c);a.Wc=c}a.nb.Nc(a.gd,b);a.gd=1+a.gd|0;return a}
function Hi(a,b){var c=Ii(I(),a.mh);if(c===r(z)){var c=new Ji,e=p(x(z),[b]);c.i=e}else c===r(Va)?(c=new Ki,e=p(x(Va),[b]),c.i=e):c===r(Ua)?(c=new Li,e=p(x(Ua),[b]),c.i=e):c===r(A)?(c=new Mi,e=p(x(A),[b]),c.i=e):c===r(Wa)?(c=new Ni,e=p(x(Wa),[b]),c.i=e):c===r(Xa)?(c=new Oi,e=p(x(Xa),[b]),c.i=e):c===r(Ya)?(c=new Pi,e=p(x(Ya),[b]),c.i=e):c===r(Ta)?(c=new Qi,e=p(x(Ta),[b]),c.i=e):c===r(Sa)?(c=new Ri,e=p(x(ra),[b]),c.i=e):c=yd(new zd,a.mh.Za(b));0<a.gd&&$(N(),a.nb.i,0,c.i,0,a.gd);return c}
m.la=function(){return 0!==this.Wc&&this.Wc===this.gd?this.nb:Hi(this,this.gd)};m.jc=function(a,b){Kh(this,a,b)};m.wa=function(a){return Gi(this,a)};m.sa=function(a){this.Wc<a&&(this.nb=Hi(this,a),this.Wc=a)};m.Ba=function(a){return Y(this,a)};m.a=new t({Uo:0},!1,"scala.collection.mutable.WrappedArrayBuilder",v,{Uo:1,d:1,Ia:1,Da:1,Ca:1});function Sb(){}Sb.prototype=new u;Sb.prototype.a=new t({Yo:0},!1,"scala.scalajs.js.Dictionary$",v,{Yo:1,d:1});var Rb=void 0;
function Si(){this.Md=!1;this.gi=this.Cl=this.Nf=this.Qe=null;this.rg=!1;this.Ci=this.ki=0}Si.prototype=new u;
Si.prototype.c=function(){Ti=this;this.Qe=(this.Md=!!(n.ArrayBuffer&&n.Int32Array&&n.Float32Array&&n.Float64Array))?new n.ArrayBuffer(8):null;this.Nf=this.Md?new n.Int32Array(this.Qe,0,2):null;this.Cl=this.Md?new n.Float32Array(this.Qe,0,2):null;this.gi=this.Md?new n.Float64Array(this.Qe,0,1):null;if(this.Md)this.Nf[0]=16909060,a=1===((new n.Int8Array(this.Qe,0,8))[0]|0);else var a=!0;this.ki=(this.rg=a)?0:1;this.Ci=this.rg?1:0;return this};
function Aa(a,b){var c=b|0;if(c===b&&-Infinity!==1/b)return c;if(a.Md)a.gi[0]=b,c=Ui(Xc((new Q).aa(a.Nf[a.ki]|0),32),Bd((new Q).Y(4194303,1023,0),(new Q).aa(a.Nf[a.Ci]|0)));else{if(b!==b)var c=!1,e=2047,g=+n.Math.pow(2,51);else if(Infinity===b||-Infinity===b)c=0>b,e=2047,g=0;else if(0===b)c=-Infinity===1/b,g=e=0;else{var h=(c=0>b)?-b:b;if(h>=+n.Math.pow(2,-1022)){var e=+n.Math.pow(2,52),g=+n.Math.log(h)/0.6931471805599453,g=+n.Math.floor(g)|0,g=1023>g?g:1023,l=h/+n.Math.pow(2,g)*e,h=+n.Math.floor(l),
l=l-h,h=0.5>l?h:0.5<l?1+h:0!==h%2?1+h:h;2<=h/e&&(g=1+g|0,h=1);1023<g?(g=2047,h=0):(g=1023+g|0,h-=e);e=g;g=h}else e=h/+n.Math.pow(2,-1074),g=+n.Math.floor(e),h=e-g,e=0,g=0.5>h?g:0.5<h?1+g:0!==g%2?1+g:g}g=+ +g;h=g|0;c=Ui(Xc((new Q).aa((c?-2147483648:0)|(e|0)<<20|g/4294967296|0),32),Bd((new Q).Y(4194303,1023,0),(new Q).aa(h)))}return R(Vi(c,Yc(c,32)))}Si.prototype.a=new t({lp:0},!1,"scala.scalajs.runtime.Bits$",v,{lp:1,d:1});var Ti=void 0;function Ba(){Ti||(Ti=(new Si).c());return Ti}
function Wi(){this.eq=this.dq=this.cq=this.bq=this.aq=this.$p=this.Zp=this.Wp=this.Vp=this.Np=this.Mp=this.Fp=this.Ep=this.Dp=0;this.Hh=this.ng=this.Kd=this.Qk=this.pg=this.tb=null}Wi.prototype=new u;Wi.prototype.c=function(){Xi=this;this.tb=(new Q).Y(0,0,0);this.pg=(new Q).Y(1,0,0);this.Qk=(new Q).Y(4194303,4194303,1048575);this.Kd=(new Q).Y(0,0,524288);this.ng=(new Q).Y(4194303,4194303,524287);this.Hh=(new Q).Y(1755648,238,0);return this};
function Yi(a,b){if(b!==b)return a.tb;if(-9223372036854775E3>b)return a.Kd;if(9223372036854775E3<=b)return a.ng;if(0>b)return Zi(Yi(a,-b));var c=b,e=17592186044416<=c?c/17592186044416|0:0,c=c-17592186044416*e,g=4194304<=c?c/4194304|0:0;return(new Q).Y(c-4194304*g|0,g,e)}Wi.prototype.a=new t({mp:0},!1,"scala.scalajs.runtime.RuntimeLong$",v,{mp:1,d:1,g:1,f:1});var Xi=void 0;function s(){Xi||(Xi=(new Wi).c());return Xi}function $i(){}$i.prototype=new u;function aj(a,b){return null===b?"null":ha(b)}
function jf(a,b,c){a=lf(c);return b.indexOf(a)|0}function lf(a){if(0===(-65536&a)){var b=n.String,c=b.fromCharCode;a=[a];a=[].concat(a);return c.apply(b,a)}if(0>a||1114111<a)throw(new F).c();a=-65536+a|0;b=n.String;c=b.fromCharCode;a=[55296|a>>10,56320|1023&a];a=[].concat(a);return c.apply(b,a)}function ya(a,b){for(var c=0,e=1,g=-1+(b.length|0)|0;0<=g;)c=c+B(65535&(b.charCodeAt(g)|0),e)|0,e=B(31,e),g=-1+g|0;return c}$i.prototype.a=new t({np:0},!1,"scala.scalajs.runtime.RuntimeString$",v,{np:1,d:1});
var bj=void 0;function za(){bj||(bj=(new $i).c());return bj}function cj(){this.pq=!1;this.ml=this.Kh=this.ol=null;this.Ka=!1}cj.prototype=new u;
cj.prototype.c=function(){dj=this;for(var a={O:"java_lang_Object",T:"java_lang_String",V:"scala_Unit",Z:"scala_Boolean",C:"scala_Char",B:"scala_Byte",S:"scala_Short",I:"scala_Int",J:"scala_Long",F:"scala_Float",D:"scala_Double"},b=0;22>=b;)2<=b&&(a["T"+b]="scala_Tuple"+b),a["F"+b]="scala_Function"+b,b=1+b|0;this.ol=a;this.Kh={sjsr_:"scala_scalajs_runtime_",sjs_:"scala_scalajs_",sci_:"scala_collection_immutable_",scm_:"scala_collection_mutable_",scg_:"scala_collection_generic_",sc_:"scala_collection_",
sr_:"scala_runtime_",s_:"scala_",jl_:"java_lang_",ju_:"java_util_"};this.ml=n.Object.keys(this.Kh);return this};cj.prototype.a=new t({op:0},!1,"scala.scalajs.runtime.StackTrace$",v,{op:1,d:1});var dj=void 0;function xe(){dj||(dj=(new cj).c());return dj}function ej(){}ej.prototype=new u;function Be(a,b){return Ae(b)?b.md:b}function ye(a,b){return b&&b.a&&b.a.p.ua?b:(new fj).da(b)}ej.prototype.a=new t({pp:0},!1,"scala.scalajs.runtime.package$",v,{pp:1,d:1});var gj=void 0;
function ze(){gj||(gj=(new ej).c());return gj}function hj(){}hj.prototype=new u;function ij(){}ij.prototype=hj.prototype;hj.prototype.c=function(){return this};hj.prototype.v=k("\x3cfunction0\x3e");var jj=new t({hh:0},!1,"scala.runtime.AbstractFunction0",v,{hh:1,d:1,vh:1});hj.prototype.a=jj;function kj(){}kj.prototype=new u;function lj(){}lj.prototype=kj.prototype;kj.prototype.v=k("\x3cfunction1\x3e");var mj=new t({ih:0},!1,"scala.runtime.AbstractFunction1",v,{ih:1,d:1,w:1});kj.prototype.a=mj;
function nj(){this.$=!1}nj.prototype=new u;nj.prototype.v=function(){return""+this.$};function oj(){var a=new nj;a.$=!0;return a}nj.prototype.a=new t({qp:0},!1,"scala.runtime.BooleanRef",v,{qp:1,d:1,f:1});function pj(a){return!!(a&&a.a&&1===a.a.Re&&a.a.Pe.p.Jj)}var ra=new t({Jj:0},!1,"scala.runtime.BoxedUnit",v,{Jj:1,d:1},function(a){return void 0===a});function qj(){}qj.prototype=new u;
function S(a,b,c){return b===c?!0:ie(b)?ie(c)?rj(b,c):$d(c)?"number"===typeof b?+b===c.Ja:ua(b)?Ga(Na(b),(new Q).aa(c.Ja)):null===b?null===c:wa(b,c):null===b?null===c:wa(b,c):$d(b)?$d(c)?b.Ja===c.Ja:ie(c)?"number"===typeof c?+c===b.Ja:ua(c)?Ga(Na(c),(new Q).aa(b.Ja)):null===c?null===b:wa(c,b):null===b&&null===c:null===b?null===c:wa(b,c)}
function rj(a,b){if("number"===typeof a){var c=+a;if("number"===typeof b)return c===+b;if(ua(b)){var e=Na(b);return c===sj(e)}return b&&b.a&&b.a.p.Nm?b.ia(c):!1}return ua(a)?(c=Na(a),ua(b)?(e=Na(b),Ga(c,e)):"number"===typeof b?(e=+b,sj(c)===e):b&&b.a&&b.a.p.Nm?b.ia(c):!1):null===a?null===b:wa(a,b)}function tj(a,b){return null===b?0:b.Ja}qj.prototype.a=new t({rp:0},!1,"scala.runtime.BoxesRunTime$",v,{rp:1,d:1});var uj=void 0;function T(){uj||(uj=(new qj).c());return uj}function Tg(){this.$=0}
Tg.prototype=new u;Tg.prototype.v=function(){return""+this.$};Tg.prototype.aa=function(a){this.$=a;return this};Tg.prototype.a=new t({sp:0},!1,"scala.runtime.IntRef",v,{sp:1,d:1,f:1});var gg=new t({up:0},!1,"scala.runtime.Null$",v,{up:1,d:1});function vj(){this.$=null}vj.prototype=new u;vj.prototype.v=function(){return aj(za(),this.$)};vj.prototype.da=function(a){this.$=a;return this};vj.prototype.a=new t({vp:0},!1,"scala.runtime.ObjectRef",v,{vp:1,d:1,f:1});function wj(){}wj.prototype=new u;
function ch(a,b){if(ib(b,1)||cb(b,1)||fb(b,1)||db(b,1)||eb(b,1)||$a(b,1)||ab(b,1)||bb(b,1)||Za(b,1)||pj(b))return b.b.length;if(null===b)throw(new ta).c();throw(new L).da(b);}function Nb(a,b){var c;if(null===b)c=0;else if(ie(b))if(T(),(b|0)===b&&1/b!==1/-0)c=b|0;else if(ua(b))c=R(Na(b)),c=Ga((new Q).aa(c),Na(b))?c:R(Vi(Na(b),Yc(Na(b),32)));else if("number"===typeof b){var e=+b|0;c=+b;e===c?c=e:(e=Yi(s(),+b),c=sj(e)===c?R(Vi(e,Yc(e,32))):Aa(Ba(),+b))}else c=xa(b);else c=xa(b);return c}
function jh(a,b,c,e){if(ib(b,1))b.b[c]=e;else if(cb(b,1))b.b[c]=e|0;else if(fb(b,1))b.b[c]=+e;else if(db(b,1))b.b[c]=Na(e);else if(eb(b,1))b.b[c]=na(e);else if($a(b,1))b.b[c]=tj(T(),e);else if(ab(b,1))b.b[c]=e|0;else if(bb(b,1))b.b[c]=e|0;else if(Za(b,1))b.b[c]=!!e;else if(pj(b))b.b[c]=e;else{if(null===b)throw(new ta).c();throw(new L).da(b);}}
function Ii(a,b){if(b&&b.a&&b.a.p.xi)return b.lc.getComponentType();if(b&&b.a&&b.a.p.ob)return b.Eb();throw(new Vd).q(tb(ub((new G).ca(["unsupported schematic "," (",")"])),(new G).ca([b,ia(b)])));}function Ad(a){I();var b=a.wd();return gh(b,a.dd()+"(",",",")")}wj.prototype.a=new t({wp:0},!1,"scala.runtime.ScalaRunTime$",v,{wp:1,d:1});var xj=void 0;function I(){xj||(xj=(new wj).c());return xj}function yj(){}yj.prototype=new u;
yj.prototype.Qf=function(a,b){var c;c=B(-862048943,b);c=be(U(),c,15);c=B(461845907,c);return a^c};yj.prototype.$c=function(a,b){var c=this.Qf(a,b),c=be(U(),c,13);return-430675100+B(5,c)|0};function Ed(a,b){return R(b)}yj.prototype.nd=function(a,b){var c=a^b,c=B(-2048144789,c^(c>>>16|0)),c=c^(c>>>13|0),c=B(-1028477387,c);return c^=c>>>16|0};yj.prototype.a=new t({yp:0},!1,"scala.runtime.Statics$",v,{yp:1,d:1});var zj=void 0;function Dd(){zj||(zj=(new yj).c());return zj}function Aj(){this.Hi=null}
Aj.prototype=new pb;function Bj(){}Bj.prototype=Aj.prototype;Aj.prototype.Ig=function(a){this.Hi=a;return this};var Cj=new t({jg:0},!1,"java.io.FilterOutputStream",qb,{jg:1,Ie:1,d:1,xf:1,yf:1});Aj.prototype.a=Cj;function Cb(){rb.call(this);this.pc=null;this.Fd=0;this.Wj=null}Cb.prototype=new sb;function Dj(){}Dj.prototype=Cb.prototype;
Cb.prototype.ia=function(a){if(a&&a.a&&a.a.p.kg){a:if(this===a)a=0;else{for(var b=this.k,c=this.W-this.k|0,e=a.k,g=a.W-a.k|0,h=c<g?c:g,l=0;l!==h;){var q=nc(this),w=nc(a),q=Ca(q,w);if(0!==q){D(this,b);D(a,e);a=q;break a}l=1+l|0}D(this,b);D(a,e);a=c===g?0:c<g?-1:1}a=0===a}else a=!1;return a};Cb.prototype.Il=function(a,b,c){this.pc=b;this.Fd=c;rb.prototype.aa.call(this,a);Hb||(Hb=(new Gb).c());this.Wj=Hb.th;return this};
Cb.prototype.ta=function(){for(var a=this.k,b=this.W,c=-547316498,e=a;e!==b;)c=Ug().$c(c,nc(this)),e=1+e|0;D(this,a);return Ug().nd(c,b-a|0)};var Ej=new t({kg:0},!1,"java.nio.ByteBuffer",wb,{kg:1,Je:1,d:1,Ra:1});Cb.prototype.a=Ej;function Fj(){rb.call(this);this.pc=null;this.Fd=0}Fj.prototype=new sb;function Gj(){}m=Gj.prototype=Fj.prototype;
m.ia=function(a){if(a&&a.a&&a.a.p.lg){a:if(this===a)a=0;else{for(var b=this.k,c=this.W-this.k|0,e=a.k,g=a.W-a.k|0,h=c<g?c:g,l=0;l!==h;){var q=Hj(this),q=(new Nc).Xc(q),w=Hj(a),w=(new Nc).Xc(w),q=q.Ja-w.Ja|0;if(0!==q){D(this,b);D(a,e);a=q;break a}l=1+l|0}D(this,b);D(a,e);a=c===g?0:c<g?-1:1}a=0===a}else a=!1;return a};m.aa=function(a){Fj.prototype.Jl.call(this,a,null,-1);return this};m.l=function(){return this.W-this.k|0};m.Jl=function(a,b,c){this.pc=b;this.Fd=c;rb.prototype.aa.call(this,a);return this};
m.ta=function(){for(var a=this.k,b=this.W,c=-182887236,e=a;e!==b;)c=Ug().$c(c,Hj(this)),e=1+e|0;D(this,a);return Ug().nd(c,b-a|0)};m.vg=function(a){a=this.k+a|0;if(0>a||a>=this.W)throw(new H).c();return Ia(this.Fe,this.Ge+a|0)};var Ij=new t({lg:0},!1,"java.nio.CharBuffer",wb,{lg:1,Je:1,d:1,Ra:1,Pf:1,Of:1,jm:1});Fj.prototype.a=Ij;function Fc(){return n.jQuery}function Gc(){}Gc.prototype=new ij;
function Jj(){Ic();Fc().material.init();Ic();var a=Fc()("a#support"),b=Hc();a.attr("href",b);Ic();return Fc()("#generateForm").submit(function(a){return function(b){return a.o(b)}}(new Kj))}Gc.prototype.Ne=function(){return Jj()};Gc.prototype.a=new t({Bk:0},!1,"parolamea.ParolaMea$$anonfun$main$1",jj,{Bk:1,hh:1,d:1,vh:1,g:1,f:1});function Kj(){}Kj.prototype=new lj;Kj.prototype.o=function(a){return Lj(a)};
function Lj(a){function b(a){return tb(ub((new G).ca(["\x3cspan\x3e","\x3c/span\x3e"])),(new G).ca([a]))}a.preventDefault();wd();Ic();a=Fc()("#inputMasterKey").val();Ic();a=pd(a);var c=xd().xa;if(c===xd().xa)if(a===Gf())a=Gf();else{var c=a.pa(),e=c=Mj(new Nj,b(c),Gf());for(a=a.na();a!==Gf();){var g=a.pa(),g=Mj(new Nj,b(g),Gf()),e=e.Ce=g;a=a.na()}a=c}else{for(c=Pj(a,c);!a.t();)e=a.pa(),c.wa(b(e)),a=a.na();a=c.la()}a=a.kf();Ic();Fc()("#generate-dialog .modal-body").html(a);Ic();return Fc()("#generate-dialog").modal("toggle")}
Kj.prototype.a=new t({Ck:0},!1,"parolamea.ParolaMea$$anonfun$main$1$$anonfun$apply$1",mj,{Ck:1,ih:1,d:1,w:1,g:1,f:1});function qd(){Pc.call(this);this.Xd=this.Wd=this.Vd=this.Ud=this.Td=this.Sd=this.Rd=this.Qd=0}qd.prototype=new Qc;qd.prototype.c=function(){Pc.prototype.Ml.call(this,"sha-256",32,Wc().Qg);return this};
function Vc(a,b,c){for(var e=Wc(),g=a.Qd,h=a.Rd,l=a.Sd,q=a.Td,w=a.Ud,J=a.Vd,C=a.Wd,P=a.Xd,y=g,E=h,sa=l,La=q,Pa=w,ng=J,og=C,Oj=P,Z=0,jb=0,Ib=0,Z=0;16>Z;)e.Cd.b[Z]=b.b[c]<<24|(255&b.b[1+c|0])<<16|(255&b.b[2+c|0])<<8|255&b.b[3+c|0],c=4+c|0,Z=1+Z|0;for(Z=16;64>Z;)jb=e.Cd.b[-2+Z|0],Ib=e.Cd.b[-15+Z|0],e.Cd.b[Z]=((((jb>>>17|0|jb<<15)^(jb>>>19|0|jb<<13)^(jb>>>10|0))+e.Cd.b[-7+Z|0]|0)+((Ib>>>7|0|Ib<<25)^(Ib>>>18|0|Ib<<14)^(Ib>>>3|0))|0)+e.Cd.b[-16+Z|0]|0,Z=1+Z|0;for(Z=0;64>Z;)jb=(((Oj+((Pa>>>6|0|Pa<<26)^(Pa>>>
11|0|Pa<<21)^(Pa>>>25|0|Pa<<7))|0)+(Pa&ng^~Pa&og)|0)+e.Bi.b[Z]|0)+e.Cd.b[Z]|0,Ib=((y>>>2|0|y<<30)^(y>>>13|0|y<<19)^(y>>>22|0|y<<10))+(y&E^y&sa^E&sa)|0,Oj=og,og=ng,ng=Pa,Pa=La+jb|0,La=sa,sa=E,E=y,y=jb+Ib|0,Z=1+Z|0;b=Jc(N(),(new G).ca([g+y|0,h+E|0,l+sa|0,q+La|0,w+Pa|0,J+ng|0,C+og|0,P+Oj|0]),O().qc);a.Qd=b.b[0];a.Rd=b.b[1];a.Sd=b.b[2];a.Td=b.b[3];a.Ud=b.b[4];a.Vd=b.b[5];a.Wd=b.b[6];a.Xd=b.b[7]}
function Rc(a){a.Qd=1779033703;a.Rd=-1150833019;a.Sd=1013904242;a.Td=-1521486534;a.Ud=1359893119;a.Vd=-1694144372;a.Wd=528734635;a.Xd=1541459225}qd.prototype.a=new t({Hk:0},!1,"parolamea.generator.SHA256",ad,{Hk:1,Ah:1,d:1,Bh:1,Sa:1,Qa:1});var ka=new t({Yl:0},!1,"java.lang.Byte",je,{Yl:1,Yc:1,d:1,Ra:1},function(a){return a<<24>>24===a&&1/a!==1/-0}),pa=new t({$l:0},!1,"java.lang.Double",je,{$l:1,Yc:1,d:1,Ra:1},function(a){return"number"===typeof a});function Qj(){V.call(this)}Qj.prototype=new we;
function Rj(){}Rj.prototype=Qj.prototype;Qj.prototype.Ol=function(a){Qj.prototype.sc.call(this,null,a);return this};Qj.prototype.q=function(a){Qj.prototype.sc.call(this,a,null);return this};var Sj=new t({Lg:0},!1,"java.lang.Error",Ce,{Lg:1,ua:1,d:1,f:1});Qj.prototype.a=Sj;function Tj(){V.call(this)}Tj.prototype=new we;function Uj(){}Uj.prototype=Tj.prototype;var Vj=new t({Ya:0},!1,"java.lang.Exception",Ce,{Ya:1,ua:1,d:1,f:1});Tj.prototype.a=Vj;
var oa=new t({bm:0},!1,"java.lang.Float",je,{bm:1,Yc:1,d:1,Ra:1},function(a){return a!==a||na(a)===a});function Lg(){te.call(this)}Lg.prototype=new ue;function Wj(){}Wj.prototype=Lg.prototype;var Xj=new t({zi:0},!1,"java.lang.InheritableThreadLocal",ve,{zi:1,Ng:1,d:1});Lg.prototype.a=Xj;var ma=new t({dm:0},!1,"java.lang.Integer",je,{dm:1,Yc:1,d:1,Ra:1},function(a){return(a|0)===a&&1/a!==1/-0});function Yj(){}Yj.prototype=new pb;
Yj.prototype.a=new t({gm:0},!1,"java.lang.JSConsoleBasedPrintStream$DummyOutputStream",qb,{gm:1,Ie:1,d:1,xf:1,yf:1});var va=new t({hm:0},!1,"java.lang.Long",je,{hm:1,Yc:1,d:1,Ra:1},function(a){return ua(a)}),la=new t({km:0},!1,"java.lang.Short",je,{km:1,Yc:1,d:1,Ra:1},function(a){return a<<16>>16===a&&1/a!==1/-0});function Zj(){this.xl=this.yl=this.wl=this.vl=this.ul=this.tl=this.sl=this.rl=this.ql=null}Zj.prototype=new Ne;
Zj.prototype.c=function(){ak=this;this.ql=p(x(Ta),[0]);this.rl=p(x(z),[0]);this.sl=p(x(Ua),[0]);this.tl=p(x(Ya),[0]);this.ul=p(x(Xa),[0]);this.vl=p(x(A),[0]);this.wl=p(x(Wa),[0]);this.yl=p(x(Va),[0]);this.xl=p(x(v),[0]);return this};function Jc(a,b,c){a=c.Za(b.l());c=c=0;for(b=b.fa();b.ja();){var e=b.ga();jh(I(),a,c,e);c=1+c|0}return a}function Jd(a,b,c){a=p(x(A),[1+c.l()|0]);a.b[0]=b;b=0;b=1;for(c=c.fa();c.ja();){var e=c.ga()|0;a.b[b]=e;b=1+b|0}return a}
function $(a,b,c,e,g,h){a=ia(b);var l;if(l=!!a.lc.isArrayClass)l=ia(e),l.lc.isPrimitive||a.lc.isPrimitive?a=l===a||(l===r(Va)?a===r(z):l===r(A)?a===r(z)||a===r(Va):l===r(Xa)?a===r(z)||a===r(Va)||a===r(A):l===r(Ya)&&(a===r(z)||a===r(Va)||a===r(A)||a===r(Xa))):(a=a.lc.getFakeInstance(),a=!!l.lc.isInstance(a)),l=a;if(l)Ka(b,c,e,g,h);else for(a=c,c=c+h|0;a<c;){I();h=e;l=g;var q;I();q=b;var w=a;if(ib(q,1)||cb(q,1)||fb(q,1)||db(q,1)||eb(q,1))q=q.b[w];else if($a(q,1))q=(new Nc).Xc(q.b[w]);else if(ab(q,1)||
bb(q,1)||Za(q,1)||pj(q))q=q.b[w];else{if(null===q)throw(new ta).c();throw(new L).da(q);}jh(0,h,l,q);a=1+a|0;g=1+g|0}}function oc(){N();var a=(new G).ca([]),b=p(x(z),[1+a.l()|0]);b.b[0]=63;for(var c=0,c=1,a=a.fa();a.ja();){var e=a.ga()|0;b.b[c]=e;c=1+c|0}return b}Zj.prototype.a=new t({vm:0},!1,"scala.Array$",Oe,{vm:1,Oi:1,d:1,g:1,f:1});var ak=void 0;function N(){ak||(ak=(new Zj).c());return ak}function bk(){this.Fl=this.zl=this.Ii=null}bk.prototype=new Ke;
bk.prototype.c=function(){ck=this;this.Ii=(new Jg).da(se().Gi);this.zl=(new Jg).da(se().di);this.Fl=(new Jg).da(null);return this};bk.prototype.a=new t({xm:0},!1,"scala.Console$",Le,{xm:1,Ni:1,d:1,vq:1});var ck=void 0;function dk(){}dk.prototype=new Te;m=dk.prototype;m.dd=k("None");m.bd=k(0);m.t=k(!0);m.Kf=function(){throw(new ek).q("None.get");};m.cd=function(a){throw(new H).q(""+a);};m.v=k("None");m.ta=k(2433880);m.wd=function(){return Fd(this)};
m.a=new t({zm:0},!1,"scala.None$",Ue,{zm:1,Sg:1,d:1,ed:1,m:1,g:1,f:1});var fk=void 0;function Nd(){fk||(fk=(new dk).c());return fk}function gk(){this.Gn=this.Wo=this.cl=this.Sk=this.Ok=this.Xj=this.$k=this.Pk=null}gk.prototype=new Qe;gk.prototype.c=function(){hk=this;zf||(zf=(new yf).c());xd();ik||(ik=(new jk).c());this.Pk=ik;this.$k=kk();this.Xj=hg().uh;this.Ok=hg().sb;Gg||(Gg=(new Fg).c());this.Sk=Gg;this.cl=(new Ve).c();this.Wo=(new lk).c();this.Gn=(new mk).c();return this};
function Wd(a,b){if(!b)throw(new Yd).da("assertion failed");}gk.prototype.a=new t({Am:0},!1,"scala.Predef$",Re,{Am:1,Pi:1,d:1,sq:1});var hk=void 0;function Xd(){hk||(hk=(new gk).c());return hk}function lk(){}lk.prototype=new af;lk.prototype.o=function(a){return a};lk.prototype.a=new t({Bm:0},!1,"scala.Predef$$anon$1",bf,{Bm:1,Ri:1,d:1,w:1,g:1,f:1});function mk(){}mk.prototype=new Ye;mk.prototype.o=function(a){return a};
mk.prototype.a=new t({Cm:0},!1,"scala.Predef$$anon$2",Ze,{Cm:1,Qi:1,d:1,w:1,g:1,f:1});function Md(){this.Dd=null}Md.prototype=new Te;m=Md.prototype;m.dd=k("Some");m.bd=k(1);m.ia=function(a){return this===a?!0:Od(a)?S(T(),this.Dd,a.Dd):!1};m.t=k(!1);m.cd=function(a){switch(a){case 0:return this.Dd;default:throw(new H).q(""+a);}};m.Kf=f("Dd");m.v=function(){return Ad(this)};m.da=function(a){this.Dd=a;return this};m.ta=function(){return Zd(this)};m.wd=function(){return Fd(this)};
function Od(a){return!!(a&&a.a&&a.a.p.Si)}m.a=new t({Si:0},!1,"scala.Some",Ue,{Si:1,Sg:1,d:1,ed:1,m:1,g:1,f:1});function jg(a,b){return b.lc.isArrayClass?tb(ub((new G).ca(["Array[","]"])),(new G).ca([jg(a,Ii(I(),b))])):hb(b)}function sg(){W.call(this)}sg.prototype=new $f;sg.prototype.c=function(){W.prototype.q.call(this,"Long");return this};sg.prototype.Za=function(a){return p(x(Wa),[a])};sg.prototype.Eb=function(){return r(Wa)};
sg.prototype.a=new t({Vm:0},!1,"scala.reflect.ManifestFactory$$anon$10",ag,{Vm:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function tg(){W.call(this)}tg.prototype=new $f;tg.prototype.c=function(){W.prototype.q.call(this,"Float");return this};tg.prototype.Za=function(a){return p(x(Xa),[a])};tg.prototype.Eb=function(){return r(Xa)};tg.prototype.a=new t({Wm:0},!1,"scala.reflect.ManifestFactory$$anon$11",ag,{Wm:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function ug(){W.call(this)}ug.prototype=new $f;
ug.prototype.c=function(){W.prototype.q.call(this,"Double");return this};ug.prototype.Za=function(a){return p(x(Ya),[a])};ug.prototype.Eb=function(){return r(Ya)};ug.prototype.a=new t({Xm:0},!1,"scala.reflect.ManifestFactory$$anon$12",ag,{Xm:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function vg(){W.call(this)}vg.prototype=new $f;vg.prototype.c=function(){W.prototype.q.call(this,"Boolean");return this};vg.prototype.Za=function(a){return p(x(Ta),[a])};vg.prototype.Eb=function(){return r(Ta)};
vg.prototype.a=new t({Ym:0},!1,"scala.reflect.ManifestFactory$$anon$13",ag,{Ym:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function wg(){W.call(this)}wg.prototype=new $f;wg.prototype.c=function(){W.prototype.q.call(this,"Unit");return this};wg.prototype.Za=function(a){return p(x(ra),[a])};wg.prototype.Eb=function(){return r(Sa)};wg.prototype.a=new t({Zm:0},!1,"scala.reflect.ManifestFactory$$anon$14",ag,{Zm:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function mg(){W.call(this)}mg.prototype=new $f;
mg.prototype.c=function(){W.prototype.q.call(this,"Byte");return this};mg.prototype.Za=function(a){return p(x(z),[a])};mg.prototype.Eb=function(){return r(z)};mg.prototype.a=new t({dn:0},!1,"scala.reflect.ManifestFactory$$anon$6",ag,{dn:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function pg(){W.call(this)}pg.prototype=new $f;pg.prototype.c=function(){W.prototype.q.call(this,"Short");return this};pg.prototype.Za=function(a){return p(x(Va),[a])};pg.prototype.Eb=function(){return r(Va)};
pg.prototype.a=new t({en:0},!1,"scala.reflect.ManifestFactory$$anon$7",ag,{en:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function qg(){W.call(this)}qg.prototype=new $f;qg.prototype.c=function(){W.prototype.q.call(this,"Char");return this};qg.prototype.Za=function(a){return p(x(Ua),[a])};qg.prototype.Eb=function(){return r(Ua)};qg.prototype.a=new t({fn:0},!1,"scala.reflect.ManifestFactory$$anon$8",ag,{fn:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function rg(){W.call(this)}rg.prototype=new $f;
rg.prototype.c=function(){W.prototype.q.call(this,"Int");return this};rg.prototype.Za=function(a){return p(x(A),[a])};rg.prototype.Eb=function(){return r(A)};rg.prototype.a=new t({gn:0},!1,"scala.reflect.ManifestFactory$$anon$9",ag,{gn:1,Mc:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function nk(){Cg.call(this);this.Oj=null;this.ii=0}nk.prototype=new Dg;function ok(){}ok.prototype=nk.prototype;nk.prototype.ia=function(a){return this===a};nk.prototype.v=f("Oj");nk.prototype.ta=f("ii");
nk.prototype.ff=function(a,b){this.Oj=b;Cg.prototype.Pl.call(this,Nd(),a,Gf());this.ii=Ma(this);return this};var pk=new t({ve:0},!1,"scala.reflect.ManifestFactory$PhantomManifest",Eg,{ve:1,be:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});nk.prototype.a=pk;function Ng(){V.call(this)}Ng.prototype=new we;Ng.prototype.c=function(){V.prototype.c.call(this);return this};Ng.prototype.Hf=function(){Pg||(Pg=(new Og).c());return Pg.sh?V.prototype.Hf.call(this):this};
Ng.prototype.a=new t({pn:0},!1,"scala.util.control.BreakControl",Ce,{pn:1,ua:1,d:1,f:1,zq:1,Aq:1});function qk(){this.fh=this.Ei=this.eh=this.Vq=this.Sq=this.rq=this.Rq=this.iq=0}qk.prototype=new Rg;qk.prototype.c=function(){rk=this;this.eh=ya(za(),"Seq");this.Ei=ya(za(),"Map");this.fh=ya(za(),"Set");return this};function sk(a,b){var c;if(b&&b.a&&b.a.p.ag){c=0;for(var e=a.eh,g=b;!g.t();){var h=g.pa(),g=g.na(),e=a.$c(e,Nb(I(),h));c=1+c|0}c=a.nd(e,c)}else c=Vg(a,b,a.eh);return c}
qk.prototype.a=new t({sn:0},!1,"scala.util.hashing.MurmurHash3$",Wg,{sn:1,Ui:1,d:1});var rk=void 0;function Ug(){rk||(rk=(new qk).c());return rk}function tk(){}tk.prototype=new mh;function uk(){}m=uk.prototype=tk.prototype;m.fd=function(a){return vk(this,a)};m.ef=function(a){var b=this.fa();return wk(b,a)};m.ka=function(a){var b=this.fa();dh(b,a)};m.Wb=function(){return this.fa().Wb()};m.Gc=function(a,b,c){xk(this,a,b,c)};
var yk=new t({N:0},!1,"scala.collection.AbstractIterable",oh,{N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1});tk.prototype.a=yk;function zk(a,b){var c;if(b&&b.a&&b.a.p.xb){if(!(c=a===b)&&(c=a.ha()===b.ha()))try{c=a.lh(b)}catch(e){if(e&&e.a&&e.a.p.Zl)c=!1;else throw e;}}else c=!1;return c}function Ak(){this.Xa=null}Ak.prototype=new wh;Ak.prototype.c=function(){vh.prototype.gf.call(this,gd());return this};Ak.prototype.Ld=function(){gd();fd();hd();return(new id).c()};
Ak.prototype.a=new t({xn:0},!1,"scala.collection.IndexedSeq$$anon$1",xh,{xn:1,Yf:1,d:1,rf:1});function Bk(){this.qe=this.Cg=0;this.Xa=null}Bk.prototype=new bh;Bk.prototype.ga=function(){this.qe>=this.Cg&&Ff().mc.ga();var a=this.Xa.Ua(this.qe);this.qe=1+this.qe|0;return a};function Ck(a,b,c){a.Cg=c;if(null===b)throw Be(ze(),null);a.Xa=b;a.qe=0;return a}Bk.prototype.ja=function(){return this.qe<this.Cg};
Bk.prototype.a=new t({yn:0},!1,"scala.collection.IndexedSeqLike$Elements",kh,{yn:1,Tb:1,d:1,dc:1,s:1,r:1,Bq:1,g:1,f:1});function Dk(a){var b=(new Ek).aa(a.ha());a=a.Wa();Fk(b,a);return b}function Gk(a,b,c,e){var g=0,h=c,l=a.l();e=l<e?l:e;c=ch(I(),b)-c|0;for(c=e<c?e:c;g<c;)jh(I(),b,h,a.Ua(g)),g=1+g|0,h=1+h|0}function Hk(a,b){if(b&&b.a&&b.a.p.Pb){var c=a.l();if(c===b.l()){for(var e=0;e<c&&S(T(),a.Ua(e),b.Ua(e));)e=1+e|0;return e===c}return!1}return vk(a,b)}
function Ik(a,b){for(var c=0,e=a.l();c<e;)b.o(a.Ua(c)),c=1+c|0}function xk(a,b,c,e){var g=c;c=c+e|0;e=ch(I(),b);c=c<e?c:e;for(a=a.fa();g<c&&a.ja();)jh(I(),b,g,a.ga()),g=1+g|0}function vk(a,b){for(var c=a.fa(),e=b.fa();c.ja()&&e.ja();)if(!S(T(),c.ga(),e.ga()))return!1;return!c.ja()&&!e.ja()}function Jk(){this.fi=this.Mb=null}Jk.prototype=new bh;Jk.prototype.ga=function(){return this.fi.o(this.Mb.ga())};function Kk(a,b,c){if(null===b)throw Be(ze(),null);a.Mb=b;a.fi=c;return a}Jk.prototype.ja=function(){return this.Mb.ja()};
Jk.prototype.a=new t({Bn:0},!1,"scala.collection.Iterator$$anon$11",kh,{Bn:1,Tb:1,d:1,dc:1,s:1,r:1});function rh(){}rh.prototype=new bh;rh.prototype.ga=function(){throw(new ek).q("next on empty iterator");};rh.prototype.ja=k(!1);rh.prototype.a=new t({Cn:0},!1,"scala.collection.Iterator$$anon$2",kh,{Cn:1,Tb:1,d:1,dc:1,s:1,r:1});function hh(a){if(a.ja()){var b=a.ga();return Lk(new Mk,b,Nk(function(a){return function(){return a.Wb()}}(a)))}Nf();return Ok()}function dh(a,b){for(;a.ja();)b.o(a.ga())}
function wk(a,b){for(var c=!0;c&&a.ja();)c=!!b.o(a.ga());return c}function Pk(){this.Mb=this.rb=null}Pk.prototype=new bh;Pk.prototype.ga=function(){if(this.ja()){var a=this.rb.pa();this.rb=this.rb.na();return a}return Ff().mc.ga()};Pk.prototype.ja=function(){return!this.rb.t()};Pk.prototype.a=new t({Dn:0},!1,"scala.collection.LinearSeqLike$$anon$1",kh,{Dn:1,Tb:1,d:1,dc:1,s:1,r:1});function Qk(a,b){var c=a.bi(b);if(0>b||c.t())throw(new H).q(""+b);return c.pa()}
function Rk(a,b){var c=0;for(;;){if(c===b)return a.t()?0:1;if(a.t())return-1;var c=1+c|0,e=a.na();a=e}}function Sk(a,b){if(b&&b.a&&b.a.p.ce){for(var c=a,e=b;!c.t()&&!e.t()&&S(T(),c.pa(),e.pa());)c=c.na(),e=e.na();return c.t()&&e.t()}return vk(a,b)}function Tk(a,b,c,e,g){var h=a.fa();a=Kk(new Jk,h,Vb(function(){return function(a){if(null!==a){var b=a.kc;a=a.Xb;df||(df=(new cf).c());return""+(""+aj(za(),b)+" -\x3e ")+a}throw(new L).da(a);}}(a)));return ih(a,b,c,e,g)}
function Hh(a){var b=Gf(),c=(new vj).da(b);a.ka(Vb(function(a,b){return function(a){b.$=Mj(new Nj,a,b.$)}}(a,c)));b=a.ma();lb(a)&&b.sa(a.ha());for(a=c.$;!a.t();)c=a.pa(),b.wa(c),a=a.na();return b.la()}function Uk(a){var b=(new Ek).aa(a.ha());a=a.Wa();Fk(b,a);return b}function nh(a,b){var c=b.Ld();lb(a)&&c.sa(a.ha());c.Ba(a.Cb());return c.la()}function Vk(a){return a.te(a.yc()+"(",", ",")")}
function Wk(a,b,c){c=c.Oe(a.Rg());a.ka(Vb(function(a,b,c){return function(a){return b.Ba(c.o(a).Wa())}}(a,c,b)));return c.la()}function Pj(a,b){var c=b.Oe(a.Rg());lb(a)&&c.sa(a.ha());return c}function ih(a,b,c,e,g){var h=oj();Xk(b,c);a.ka(Vb(function(a,b,c,e){return function(a){if(b.$)Yk(c,a),b.$=!1;else return Xk(c,e),Yk(c,a)}}(a,h,b,e)));Xk(b,g);return b}function ld(a,b){if(a.qi()){var c=b.Za(a.ha());a.xg(c,0);return c}return a.zc().Mj(b)}
function gh(a,b,c,e){return a.Me((new We).c(),b,c,e).Rb.lb}function fh(a){var b=(new Tg).aa(0);a.ka(Vb(function(a,b){return function(){b.$=1+b.$|0}}(a,b)));return b.$}function Zk(){}Zk.prototype=new zh;function $k(){}$k.prototype=Zk.prototype;var al=new t({yd:0},!1,"scala.collection.generic.GenSetFactory",Ah,{yd:1,ra:1,d:1});Zk.prototype.a=al;function bl(){this.xa=null}bl.prototype=new zh;function cl(){}cl.prototype=bl.prototype;bl.prototype.c=function(){this.xa=(new dl).gf(this);return this};
var el=new t({ib:0},!1,"scala.collection.generic.GenTraversableFactory",Ah,{ib:1,ra:1,d:1});bl.prototype.a=el;function dl(){this.Mb=this.Xa=null}dl.prototype=new wh;dl.prototype.Ld=function(){return this.Mb.ma()};dl.prototype.gf=function(a){if(null===a)throw Be(ze(),null);this.Mb=a;vh.prototype.gf.call(this,a);return this};dl.prototype.a=new t({Jn:0},!1,"scala.collection.generic.GenTraversableFactory$$anon$1",xh,{Jn:1,Yf:1,d:1,rf:1});
function fl(a,b){a:b:for(;;){if(!b.t()){a.Ea(b.pa());b=b.na();continue b}break a}}function Y(a,b){b&&b.a&&b.a.p.ce?fl(a,b):b.ka(Vb(function(a){return function(b){return a.Ea(b)}}(a)));return a}function gl(){}gl.prototype=new th;function hl(){}hl.prototype=gl.prototype;var il=new t({Xg:0},!1,"scala.collection.generic.MapFactory",uh,{Xg:1,Xf:1,d:1});gl.prototype.a=il;function jl(){this.ke=null}jl.prototype=new bh;jl.prototype.ga=function(){if(!this.ke.t()){var a=this.ke.pa();this.ke=this.ke.Kj();return a}return Ff().mc.ga()};
jl.prototype.se=function(a){this.ke=a;return this};jl.prototype.ja=function(){return!this.ke.t()};jl.prototype.a=new t({Wn:0},!1,"scala.collection.immutable.ListSet$$anon$1",kh,{Wn:1,Tb:1,d:1,dc:1,s:1,r:1});function kl(){this.bc=null}kl.prototype=new zi;kl.prototype.la=function(){return ll(this)};function ll(a){return ml(a.bc.va.Wb(),Vb(function(){return function(a){return a.Wb()}}(a)))}function nl(a){return!!(a&&a.a&&a.a.p.fj)}
kl.prototype.a=new t({fj:0},!1,"scala.collection.immutable.Stream$StreamBuilder",Bi,{fj:1,vj:1,d:1,Ia:1,Da:1,Ca:1});function ol(){this.Xa=null}ol.prototype=new wh;ol.prototype.c=function(){vh.prototype.gf.call(this,Nf());return this};ol.prototype.a=new t({oo:0},!1,"scala.collection.immutable.Stream$StreamCanBuildFrom",xh,{oo:1,Yf:1,d:1,rf:1});function pl(){this.rb=null}pl.prototype=new bh;
pl.prototype.ga=function(){if(!this.ja())return Ff().mc.ga();var a=this.rb.Ka?this.rb.Bd:Qh(this.rb),b=a.pa();this.rb=Ph(new Oh,this,Nk(function(a,b){return function(){return b.na()}}(this,a)));return b};function ql(a){var b=new pl;b.rb=Ph(new Oh,b,Nk(function(a,b){return function(){return b}}(b,a)));return b}pl.prototype.ja=function(){return!(this.rb.Ka?this.rb.Bd:Qh(this.rb)).t()};
pl.prototype.Wb=function(){var a=this.rb.Ka?this.rb.Bd:Qh(this.rb);this.rb=Ph(new Oh,this,Nk(function(){return function(){Nf();return Ok()}}(this)));return a};pl.prototype.a=new t({po:0},!1,"scala.collection.immutable.StreamIterator",kh,{po:1,Tb:1,d:1,dc:1,s:1,r:1});function rl(){this.j=null;this.ec=0;this.we=this.Wg=this.Vf=null;this.xd=0;this.de=null}rl.prototype=new bh;function sl(){}sl.prototype=rl.prototype;
rl.prototype.ga=function(){if(null!==this.de){var a=this.de.ga();this.de.ja()||(this.de=null);return a}a:{var a=this.we,b=this.xd;for(;;){b===(-1+a.b.length|0)?(this.ec=-1+this.ec|0,0<=this.ec?(this.we=this.Vf.b[this.ec],this.xd=this.Wg.b[this.ec],this.Vf.b[this.ec]=null):(this.we=null,this.xd=0)):this.xd=1+this.xd|0;if((a=a.b[b])&&a.a&&a.a.p.Fq||a&&a.a&&a.a.p.dj){a=a.qd;break a}if(a&&a.a&&a.a.p.Mn||tl(a))0<=this.ec&&(this.Vf.b[this.ec]=this.we,this.Wg.b[this.ec]=this.xd),this.ec=1+this.ec|0,this.we=
ul(a),this.xd=0,a=ul(a),b=0;else{this.de=a.fa();a=this.ga();break a}}a=void 0}return a};rl.prototype.ja=function(){return null!==this.de||0<=this.ec};function ul(a){if(a&&a.a&&a.a.p.Mn)return a.mq();if(tl(a))return a.vb;throw(new L).da(a);}rl.prototype.Hl=function(a){this.j=a;this.ec=0;this.Vf=p(x(x(mb)),[6]);this.Wg=p(x(A),[6]);this.we=this.j;this.xd=0;this.de=null;return this};var vl=new t({gj:0},!1,"scala.collection.immutable.TrieIterator",kh,{gj:1,Tb:1,d:1,dc:1,s:1,r:1});rl.prototype.a=vl;
function wl(){this.Eg=this.ud=this.kd=this.Dg=0;this.wf=!1;this.yg=0;this.$h=this.Xh=this.Uh=this.Rh=this.Oh=this.Ag=null}wl.prototype=new bh;m=wl.prototype;
m.ga=function(){if(!this.wf)throw(new ek).q("reached iterator end");var a=this.Ag.b[this.ud];this.ud=1+this.ud|0;if(this.ud===this.Eg)if((this.kd+this.ud|0)<this.Dg){var b=32+this.kd|0,c=this.kd^b;if(1024>c)this.Pa(this.X().b[31&b>>5]);else if(32768>c)this.Fa(this.ea().b[31&b>>10]),this.Pa(this.X().b[0]);else if(1048576>c)this.fb(this.ya().b[31&b>>15]),this.Fa(this.ea().b[0]),this.Pa(this.X().b[0]);else if(33554432>c)this.Nb(this.mb().b[31&b>>20]),this.fb(this.ya().b[0]),this.Fa(this.ea().b[0]),this.Pa(this.X().b[0]);
else if(1073741824>c)this.Hc(this.Ic().b[31&b>>25]),this.Nb(this.mb().b[0]),this.fb(this.ya().b[0]),this.Fa(this.ea().b[0]),this.Pa(this.X().b[0]);else throw(new F).c();this.kd=b;b=this.Dg-this.kd|0;this.Eg=32>b?b:32;this.ud=0}else this.wf=!1;return a};m.ya=f("Uh");m.Yb=f("yg");m.cf=d("$h");m.ac=function(a,b){this.Dg=b;this.kd=-32&a;this.ud=31&a;var c=b-this.kd|0;this.Eg=32>c?c:32;this.wf=(this.kd+this.ud|0)<b;return this};m.eb=f("Ag");m.mb=f("Xh");m.fb=d("Rh");m.Fa=d("Oh");m.ja=f("wf");m.Hc=d("Xh");
m.X=f("Oh");m.Ic=f("$h");m.ld=d("yg");m.ea=f("Rh");m.Pa=d("Ag");m.Nb=d("Uh");m.a=new t({vo:0},!1,"scala.collection.immutable.VectorIterator",kh,{vo:1,Tb:1,d:1,dc:1,s:1,r:1,hj:1});
function xl(a,b,c){if(32>c)return a.eb().b[31&b];if(1024>c)return a.X().b[31&b>>5].b[31&b];if(32768>c)return a.ea().b[31&b>>10].b[31&b>>5].b[31&b];if(1048576>c)return a.ya().b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];if(33554432>c)return a.mb().b[31&b>>20].b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];if(1073741824>c)return a.Ic().b[31&b>>25].b[31&b>>20].b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];throw(new F).c();}
function Sh(a,b,c){a.ld(c);c=-1+c|0;switch(c){case -1:break;case 0:a.Pa(b.eb());break;case 1:a.Fa(b.X());a.Pa(b.eb());break;case 2:a.fb(b.ea());a.Fa(b.X());a.Pa(b.eb());break;case 3:a.Nb(b.ya());a.fb(b.ea());a.Fa(b.X());a.Pa(b.eb());break;case 4:a.Hc(b.mb());a.Nb(b.ya());a.fb(b.ea());a.Fa(b.X());a.Pa(b.eb());break;case 5:a.cf(b.Ic());a.Hc(b.mb());a.Nb(b.ya());a.fb(b.ea());a.Fa(b.X());a.Pa(b.eb());break;default:throw(new L).da(c);}}
function Th(a,b,c){if(32<=c)if(1024>c)a.Pa(a.X().b[31&b>>5]);else if(32768>c)a.Fa(a.ea().b[31&b>>10]),a.Pa(a.X().b[31&b>>5]);else if(1048576>c)a.fb(a.ya().b[31&b>>15]),a.Fa(a.ea().b[31&b>>10]),a.Pa(a.X().b[31&b>>5]);else if(33554432>c)a.Nb(a.mb().b[31&b>>20]),a.fb(a.ya().b[31&b>>15]),a.Fa(a.ea().b[31&b>>10]),a.Pa(a.X().b[31&b>>5]);else if(1073741824>c)a.Hc(a.Ic().b[31&b>>25]),a.Nb(a.mb().b[31&b>>20]),a.fb(a.ya().b[31&b>>15]),a.Fa(a.ea().b[31&b>>10]),a.Pa(a.X().b[31&b>>5]);else throw(new F).c();}
function yl(a){null===a&&zl("NULL");var b=p(x(v),[a.b.length]);Ka(a,0,b,0,a.b.length);return b}function ei(){this.j=null;this.e=this.h=0}ei.prototype=new Vh;m=ei.prototype;m.c=function(){this.e=this.h=0;return this};function Al(a,b){var c=p(x(Ta),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.ia=function(a){return a&&a.a&&a.a.p.kj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Bl(this,!!a)};m.v=k("ArrayBuilder.ofBoolean");m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Al(this,this.e)};
m.qa=function(a){this.j=Al(this,a);this.h=a};m.wa=function(a){return Bl(this,!!a)};m.sa=function(a){this.h<a&&this.qa(a)};m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};function Bl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.Ba=function(a){a&&a.a&&a.a.p.xj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};
m.a=new t({kj:0},!1,"scala.collection.mutable.ArrayBuilder$ofBoolean",Wh,{kj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function Yh(){this.j=null;this.e=this.h=0}Yh.prototype=new Vh;m=Yh.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.lj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Cl(this,a|0)};function Dl(a,b){var c=p(x(z),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.v=k("ArrayBuilder.ofByte");
m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Dl(this,this.e)};m.qa=function(a){this.j=Dl(this,a);this.h=a};m.wa=function(a){return Cl(this,a|0)};function Cl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.sa=function(a){this.h<a&&this.qa(a)};m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
m.Ba=function(a){a&&a.a&&a.a.p.yj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({lj:0},!1,"scala.collection.mutable.ArrayBuilder$ofByte",Wh,{lj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function $h(){this.j=null;this.e=this.h=0}$h.prototype=new Vh;m=$h.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.mj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return El(this,tj(T(),a))};m.v=k("ArrayBuilder.ofChar");
m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Fl(this,this.e)};m.qa=function(a){this.j=Fl(this,a);this.h=a};m.wa=function(a){return El(this,tj(T(),a))};m.sa=function(a){this.h<a&&this.qa(a)};function Fl(a,b){var c=p(x(Ua),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};function El(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}
m.Ba=function(a){a&&a.a&&a.a.p.zj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({mj:0},!1,"scala.collection.mutable.ArrayBuilder$ofChar",Wh,{mj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function di(){this.j=null;this.e=this.h=0}di.prototype=new Vh;m=di.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.nj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Gl(this,+a)};m.v=k("ArrayBuilder.ofDouble");
m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Hl(this,this.e)};function Hl(a,b){var c=p(x(Ya),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.qa=function(a){this.j=Hl(this,a);this.h=a};m.wa=function(a){return Gl(this,+a)};m.sa=function(a){this.h<a&&this.qa(a)};function Gl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
m.Ba=function(a){a&&a.a&&a.a.p.Aj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({nj:0},!1,"scala.collection.mutable.ArrayBuilder$ofDouble",Wh,{nj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function ci(){this.j=null;this.e=this.h=0}ci.prototype=new Vh;m=ci.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.oj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Il(this,na(a))};m.v=k("ArrayBuilder.ofFloat");
m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Jl(this,this.e)};m.qa=function(a){this.j=Jl(this,a);this.h=a};function Il(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.wa=function(a){return Il(this,na(a))};m.sa=function(a){this.h<a&&this.qa(a)};function Jl(a,b){var c=p(x(Xa),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
m.Ba=function(a){a&&a.a&&a.a.p.Bj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({oj:0},!1,"scala.collection.mutable.ArrayBuilder$ofFloat",Wh,{oj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function ai(){this.j=null;this.e=this.h=0}ai.prototype=new Vh;m=ai.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.pj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Kl(this,a|0)};m.v=k("ArrayBuilder.ofInt");
m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Ll(this,this.e)};m.qa=function(a){this.j=Ll(this,a);this.h=a};function Kl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.wa=function(a){return Kl(this,a|0)};function Ll(a,b){var c=p(x(A),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.sa=function(a){this.h<a&&this.qa(a)};m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
m.Ba=function(a){a&&a.a&&a.a.p.Cj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({pj:0},!1,"scala.collection.mutable.ArrayBuilder$ofInt",Wh,{pj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function bi(){this.j=null;this.e=this.h=0}bi.prototype=new Vh;m=bi.prototype;m.c=function(){this.e=this.h=0;return this};function Ml(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}
m.ia=function(a){return a&&a.a&&a.a.p.qj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Ml(this,Na(a))};m.v=k("ArrayBuilder.ofLong");m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Nl(this,this.e)};m.qa=function(a){this.j=Nl(this,a);this.h=a};function Nl(a,b){var c=p(x(Wa),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.wa=function(a){return Ml(this,Na(a))};m.sa=function(a){this.h<a&&this.qa(a)};
m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};m.Ba=function(a){a&&a.a&&a.a.p.Dj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({qj:0},!1,"scala.collection.mutable.ArrayBuilder$ofLong",Wh,{qj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function gi(){this.j=this.ei=null;this.e=this.h=0}gi.prototype=new Vh;m=gi.prototype;m.Zd=function(a){this.ei=a;this.e=this.h=0;return this};
m.ia=function(a){return a&&a.a&&a.a.p.rj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Ol(this,a)};m.v=k("ArrayBuilder.ofRef");m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Pl(this,this.e)};m.qa=function(a){this.j=Pl(this,a);this.h=a};function Ol(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.wa=function(a){return Ol(this,a)};m.sa=function(a){this.h<a&&this.qa(a)};m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
function Pl(a,b){var c=a.ei.Za(b);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.Ba=function(a){a&&a.a&&a.a.p.Ej?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({rj:0},!1,"scala.collection.mutable.ArrayBuilder$ofRef",Wh,{rj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function Zh(){this.j=null;this.e=this.h=0}Zh.prototype=new Vh;m=Zh.prototype;m.c=function(){this.e=this.h=0;return this};
m.ia=function(a){return a&&a.a&&a.a.p.sj?this.e===a.e&&this.j===a.j:!1};function Ql(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.Ea=function(a){return Ql(this,a|0)};m.v=k("ArrayBuilder.ofShort");m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Rl(this,this.e)};m.qa=function(a){this.j=Rl(this,a);this.h=a};function Rl(a,b){var c=p(x(Va),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.wa=function(a){return Ql(this,a|0)};m.sa=function(a){this.h<a&&this.qa(a)};
m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};m.Ba=function(a){a&&a.a&&a.a.p.Fj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({sj:0},!1,"scala.collection.mutable.ArrayBuilder$ofShort",Wh,{sj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function fi(){this.j=null;this.e=this.h=0}fi.prototype=new Vh;m=fi.prototype;m.c=function(){this.e=this.h=0;return this};
m.ia=function(a){return a&&a.a&&a.a.p.tj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Sl(this,a)};m.v=k("ArrayBuilder.ofUnit");function Sl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.la=function(){return 0!==this.h&&this.h===this.e?this.j:Tl(this,this.e)};m.qa=function(a){this.j=Tl(this,a);this.h=a};function Tl(a,b){var c=p(x(ra),[b]);0<a.e&&$(N(),a.j,0,c,0,a.e);return c}m.wa=function(a){return Sl(this,a)};m.sa=function(a){this.h<a&&this.qa(a)};
m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};m.Ba=function(a){a&&a.a&&a.a.p.Gj?(this.oa(this.e+a.l()|0),$(N(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({tj:0},!1,"scala.collection.mutable.ArrayBuilder$ofUnit",Wh,{tj:1,vc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function Kh(a,b,c){lb(c)&&(c=c.ha(),a.sa(b<c?b:c))}function Ul(){this.Kc=0;this.Mb=null}Ul.prototype=new bh;
Ul.prototype.ga=function(){return this.ja()?(this.Kc=1+this.Kc|0,this.Mb.ba.b[-1+this.Kc|0]===qi()?null:this.Mb.ba.b[-1+this.Kc|0]):Ff().mc.ga()};function Vl(a){var b=new Ul;if(null===a)throw Be(ze(),null);b.Mb=a;b.Kc=0;return b}Ul.prototype.ja=function(){for(;this.Kc<this.Mb.ba.b.length&&null===this.Mb.ba.b[this.Kc];)this.Kc=1+this.Kc|0;return this.Kc<this.Mb.ba.b.length};Ul.prototype.a=new t({Bo:0},!1,"scala.collection.mutable.FlatHashTable$$anon$1",kh,{Bo:1,Tb:1,d:1,dc:1,s:1,r:1});
function Lh(a,b){for(var c=null===b?qi():b,e=xa(c),e=Wl(a,e),g=a.ba.b[e];null!==g&&!S(T(),g,c);)e=(1+e|0)%a.ba.b.length,g=a.ba.b[e];return g}
function Xl(a,b){for(var c=xa(b),c=Wl(a,c),e=a.ba.b[c];null!==e;){if(S(T(),e,b))return;c=(1+c|0)%a.ba.b.length;e=a.ba.b[c]}a.ba.b[c]=b;a.Vb=1+a.Vb|0;null!==a.Bb&&(c>>=5,e=a.Bb,e.b[c]=1+e.b[c]|0);if(a.Vb>=a.hd)for(c=a.ba,a.ba=p(x(v),[B(2,a.ba.b.length)]),a.Vb=0,null!==a.Bb&&(e=1+(a.ba.b.length>>5)|0,a.Bb.b.length!==e?a.Bb=p(x(A),[e]):Ge(Ie(),a.Bb)),a.zd=ce(U(),-1+a.ba.b.length|0),a.hd=ni().lf(a.Oc,a.ba.b.length),e=0;e<c.b.length;){var g=c.b[e];null!==g&&Xl(a,g);e=1+e|0}}
function Wl(a,b){var c=a.zd,e=Yg($g(),b),c=c%32,g=-1+a.ba.b.length|0;return((e>>>c|0|e<<(32-c|0))>>>(32-ce(U(),g)|0)|0)&g}function Yl(){this.Kg=null;this.pe=0;this.Pd=null}Yl.prototype=new bh;function Zl(a){var b=new Yl;b.Kg=a.ba;b.pe=$l(a);b.Pd=b.Kg.b[b.pe];return b}Yl.prototype.ga=function(){var a=this.Pd;for(this.Pd=this.Pd.vd;null===this.Pd&&0<this.pe;)this.pe=-1+this.pe|0,this.Pd=this.Kg.b[this.pe];return a};Yl.prototype.ja=function(){return null!==this.Pd};
Yl.prototype.a=new t({Io:0},!1,"scala.collection.mutable.HashTable$$anon$1",kh,{Io:1,Tb:1,d:1,dc:1,s:1,r:1});function $l(a){for(var b=-1+a.ba.b.length|0;null===a.ba.b[b]&&0<b;)b=-1+b|0;return b}function am(a,b){var c=Nb(I(),b);return bm(a,b,cm(a,c))}function bm(a,b,c){for(a=a.ba.b[c];;)if(null!==a?(c=a.nc,c=!S(T(),c,b)):c=!1,c)a=a.vd;else break;return a}function dm(a,b){if(null!==a.Bb){var c=a.Bb,e=b>>5;c.b[e]=1+c.b[e]|0}}
function cm(a,b){var c=-1+a.ba.b.length|0,e=a.zd,g=Yg($g(),b),e=e%32;return(g>>>e|0|g<<(32-e|0))>>(32-ce(U(),c)|0)&c}
function Ud(a,b,c){var e=Nb(I(),b),e=cm(a,e),g=bm(a,b,e);if(null!==g)a=g;else{b=(new ii).Yd(b,c);b.vd=a.ba.b[e];a.ba.b[e]=b;a.Vb=1+a.Vb|0;dm(a,e);if(a.Vb>a.hd){b=B(2,a.ba.b.length);c=a.ba;a.ba=p(x(nb),[b]);null!==a.Bb&&(e=1+(a.ba.b.length>>5)|0,a.Bb.b.length!==e?a.Bb=p(x(A),[e]):Ge(Ie(),a.Bb));for(e=-1+c.b.length|0;0<=e;){for(g=c.b[e];null!==g;){var h=g.nc,h=Nb(I(),h),h=cm(a,h),l=g.vd;g.vd=a.ba.b[h];a.ba.b[h]=g;g=l;dm(a,h)}e=-1+e|0}a.hd=vi().lf(a.Oc,b)}a=null}return a}function em(){this.Ze=null}
em.prototype=new bh;em.prototype.ga=function(){if(this.ja()){var a=this.Ze.pa();this.Ze=this.Ze.na();return a}throw(new ek).q("next on empty Iterator");};em.prototype.ja=function(){return this.Ze!==Gf()};em.prototype.a=new t({Mo:0},!1,"scala.collection.mutable.ListBuffer$$anon$1",kh,{Mo:1,Tb:1,d:1,dc:1,s:1,r:1});
function fm(a,b){var c=(new Q).aa(a.i.b.length);if(Ha((new Q).aa(b),c)){for(c=td((new Q).Y(2,0,0),c);Ha((new Q).aa(b),c);)c=td((new Q).Y(2,0,0),c);Ha(c,(new Q).Y(4194303,511,0))&&(c=(new Q).Y(4194303,511,0));c=p(x(v),[R(c)]);Ka(a.i,0,c,0,a.Ab);a.i=c}}function gm(a,b){if(b>=a.Ab)throw(new H).q(""+b);return a.i.b[b]}function hm(){Lb.call(this);this.$i=0}hm.prototype=new Mb;function im(){}im.prototype=hm.prototype;hm.prototype.re=function(a,b,c){this.$i=c;Lb.prototype.Jg.call(this,a);return this};
hm.prototype.Pg=function(){var a=new jm;if(null===this)throw Be(ze(),null);a.Xa=this;hc.prototype.mi.call(a,this,1);return a};var km=new t({gh:0},!1,"scala.scalajs.niocharset.ISO_8859_1_And_US_ASCII_Common",Ob,{gh:1,Cc:1,d:1,Ra:1});hm.prototype.a=km;function jm(){hc.call(this);this.Xa=null}jm.prototype=new ic;
jm.prototype.Bg=function(a,b){var c=this.Xa.$i;if(0===(a.W-a.k|0))return M().Ec;a.pc;for(;;){if(a.k===a.W)return M().Ec;if(b.k===b.W)return M().Dc;var e=Hj(a);if(e<=c)K(b,e<<24>>24);else{if(56320===(64512&e))return D(a,-1+a.k|0),M().pd;if(55296===(64512&e)){if(a.k!==a.W)return c=Hj(a),D(a,-2+a.k|0),56320===(64512&c)?M().vi:M().pd;D(a,-1+a.k|0);return M().Ec}D(a,-1+a.k|0);return M().ui}}};
jm.prototype.a=new t({bp:0},!1,"scala.scalajs.niocharset.ISO_8859_1_And_US_ASCII_Common$Encoder",qc,{bp:1,Af:1,d:1});function lm(){Lb.call(this);this.qf=0}lm.prototype=new Mb;function mm(){}mm.prototype=lm.prototype;lm.prototype.re=function(a,b,c){this.qf=c;Lb.prototype.Jg.call(this,a);return this};
lm.prototype.Pg=function(){var a=new nm;if(null===this)throw Be(ze(),null);a.Xa=this;hc.prototype.ni.call(a,this,2,2,2===this.qf?Jc(N(),(new G).ca([-3,-1]),O().kb):Jc(N(),(new G).ca([-1,-3]),O().kb));a.Rf=0===this.qf;return a};var om=new t({cg:0},!1,"scala.scalajs.niocharset.UTF_16_Common",Ob,{cg:1,Cc:1,d:1,Ra:1});lm.prototype.a=om;function nm(){hc.call(this);this.Rf=!1;this.Xa=null}nm.prototype=new ic;
nm.prototype.Bg=function(a,b){if(this.Rf){if(2>(b.W-b.k|0))return M().Dc;K(b,-2);K(b,-1);this.Rf=!1}var c=2!==this.Xa.qf;for(;;){if(0===(a.W-a.k|0))return M().Ec;var e=Hj(a);if(56320===(64512&e))return D(a,-1+a.k|0),M().pd;if(55296!==(64512&e)){if(2>(b.W-b.k|0))return D(a,-1+a.k|0),M().Dc;c?(K(b,e>>8<<24>>24),K(b,e<<24>>24)):(K(b,e<<24>>24),K(b,e>>8<<24>>24))}else{if(1>(a.W-a.k|0))return D(a,-1+a.k|0),M().Ec;var g=Hj(a);if(56320!==(64512&g))return D(a,-2+a.k|0),M().pd;if(4>(b.W-b.k|0))return D(a,
-2+a.k|0),M().Dc;c?(K(b,e>>8<<24>>24),K(b,e<<24>>24)):(K(b,e<<24>>24),K(b,e>>8<<24>>24));c?(K(b,g>>8<<24>>24),K(b,g<<24>>24)):(K(b,g<<24>>24),K(b,g>>8<<24>>24))}}};nm.prototype.li=function(){this.Rf=0===this.Xa.qf};nm.prototype.a=new t({ep:0},!1,"scala.scalajs.niocharset.UTF_16_Common$Encoder",qc,{ep:1,Af:1,d:1});function pm(){Lb.call(this);this.Hn=null;this.Xp=this.Yp=0}pm.prototype=new Mb;
pm.prototype.c=function(){Lb.prototype.Jg.call(this,"UTF-8",Jc(N(),(new G).ca(["UTF8","unicode-1-1-utf-8"]),od(O(),r(ja))));qm=this;this.Hn=Jd(N(),-1,(new G).ca([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,-1,-1,-1,-1,-1,-1,-1,-1]));return this};
pm.prototype.Pg=function(){return(new rm).c()};pm.prototype.a=new t({hp:0},!1,"scala.scalajs.niocharset.UTF_8$",Ob,{hp:1,Cc:1,d:1,Ra:1});var qm=void 0;function $b(){qm||(qm=(new pm).c());return qm}function rm(){hc.call(this)}rm.prototype=new ic;rm.prototype.c=function(){hc.prototype.mi.call(this,$b(),1.100000023841858);return this};
rm.prototype.Bg=function(a,b){a.pc;for(;;){if(a.k===a.W)return M().Ec;var c=Hj(a);if(128>c){if(b.k===b.W)return c=M().Dc,D(a,-1+a.k|0),c;K(b,c<<24>>24)}else if(2048>c){if(2>(b.W-b.k|0))return c=M().Dc,D(a,-1+a.k|0),c;K(b,(192|c>>6)<<24>>24);K(b,(128|63&c)<<24>>24)}else if($b(),55296!==(63488&c)){if(3>(b.W-b.k|0))return c=M().Dc,D(a,-1+a.k|0),c;K(b,(224|c>>12)<<24>>24);K(b,(128|63&c>>6)<<24>>24);K(b,(128|63&c)<<24>>24)}else if(55296===(64512&c)){if(a.k===a.W)return c=M().Ec,D(a,-1+a.k|0),c;var e=Hj(a);
if(56320!==(64512&e))return c=M().pd,D(a,-2+a.k|0),c;if(4>(b.W-b.k|0))return c=M().Dc,D(a,-2+a.k|0),c;c=65536+(((1023&c)<<10)+(1023&e)|0)|0;K(b,(240|c>>18)<<24>>24);K(b,(128|63&c>>12)<<24>>24);K(b,(128|63&c>>6)<<24>>24);K(b,(128|63&c)<<24>>24)}else return c=M().pd,D(a,-1+a.k|0),c}};rm.prototype.a=new t({ip:0},!1,"scala.scalajs.niocharset.UTF_8$Encoder",qc,{ip:1,Af:1,d:1});function sm(){this.df=null}sm.prototype=new ij;sm.prototype.Ne=function(){return(0,this.df)()};
function Nk(a){var b=new sm;b.df=a;return b}sm.prototype.a=new t({jp:0},!1,"scala.scalajs.runtime.AnonFunction0",jj,{jp:1,hh:1,d:1,vh:1});function tm(){this.df=null}tm.prototype=new lj;tm.prototype.o=function(a){return(0,this.df)(a)};function Vb(a){var b=new tm;b.df=a;return b}tm.prototype.a=new t({kp:0},!1,"scala.scalajs.runtime.AnonFunction1",mj,{kp:1,ih:1,d:1,w:1});function Q(){this.n=this.u=this.x=0}Q.prototype=new he;function Ui(a,b){return(new Q).Y(a.x|b.x,a.u|b.u,a.n|b.n)}m=Q.prototype;
m.ia=function(a){return ua(a)?Ga(this,a):!1};
function td(a,b){var c=8191&a.x,e=a.x>>13|(15&a.u)<<9,g=8191&a.u>>4,h=a.u>>17|(255&a.n)<<5,l=(1048320&a.n)>>8;c|=0;e|=0;g|=0;h|=0;l|=0;var q=8191&b.x,w=b.x>>13|(15&b.u)<<9,J=8191&b.u>>4,C=b.u>>17|(255&b.n)<<5,P=(1048320&b.n)>>8;var q=q|0,w=w|0,J=J|0,y=C|0,E=P|0,sa=B(c,q),La=B(e,q),P=B(g,q),C=B(h,q),l=B(l,q);0!==w&&(La=La+B(c,w)|0,P=P+B(e,w)|0,C=C+B(g,w)|0,l=l+B(h,w)|0);0!==J&&(P=P+B(c,J)|0,C=C+B(e,J)|0,l=l+B(g,J)|0);0!==y&&(C=C+B(c,y)|0,l=l+B(e,y)|0);0!==E&&(l=l+B(c,E)|0);c=(4194303&sa)+((511&La)<<
13)|0;e=((((sa>>22)+(La>>9)|0)+((262143&P)<<4)|0)+((31&C)<<17)|0)+(c>>22)|0;return(new Q).Y(4194303&c,4194303&e,1048575&((((P>>18)+(C>>5)|0)+((4095&l)<<8)|0)+(e>>22)|0))}m.Y=function(a,b,c){this.x=a;this.u=b;this.n=c;return this};
m.v=function(){if(0===this.x&&0===this.u&&0===this.n)return"0";if(Ga(this,s().Kd))return"-9223372036854775808";if(0!==(524288&this.n))return"-"+Zi(this).v();var a=s().Hh,b=this,c="";for(;;){var e=b;if(0===e.x&&0===e.u&&0===e.n)return c;e=Tc(b,a);b=e[0];e=""+R(e[1]);c=(0===b.x&&0===b.u&&0===b.n?"":"000000000".substring(e.length|0))+e+c}};
function Tc(a,b){if(0===b.x&&0===b.u&&0===b.n)throw(new um).q("/ by zero");if(0===a.x&&0===a.u&&0===a.n)return[s().tb,s().tb];if(Ga(b,s().Kd))return Ga(a,s().Kd)?[s().pg,s().tb]:[s().tb,a];var c=0!==(524288&a.n),e=0!==(524288&b.n),g=Ga(a,s().Kd),h=0===b.n&&0===b.u&&0!==b.x&&0===(b.x&(-1+b.x|0))?ee(U(),b.x):0===b.n&&0!==b.u&&0===b.x&&0===(b.u&(-1+b.u|0))?22+ee(U(),b.u)|0:0!==b.n&&0===b.u&&0===b.x&&0===(b.n&(-1+b.n|0))?44+ee(U(),b.n)|0:-1;if(0<=h){if(g)return c=vm(a,h),[e?Zi(c):c,s().tb];var g=0!==
(524288&a.n)?Zi(a):a,l=vm(g,h),e=c!==e?Zi(l):l,g=22>=h?(new Q).Y(g.x&(-1+(1<<h)|0),0,0):44>=h?(new Q).Y(g.x,g.u&(-1+(1<<(-22+h|0))|0),0):(new Q).Y(g.x,g.u,g.n&(-1+(1<<(-44+h|0))|0)),c=c?Zi(g):g;return[e,c]}h=0!==(524288&b.n)?Zi(b):b;if(g)var q=s().ng;else{var w=0!==(524288&a.n)?Zi(a):a;if(Ha(h,w))return[s().tb,a];q=w}var w=wm(h)-wm(q)|0,J=Xc(h,w),h=w,w=J,J=q,q=s().tb;a:for(;;){if(0>h)var C=!0;else C=J,C=0===C.x&&0===C.u&&0===C.n;if(C){var P=q,l=J;break a}else C=Uc(J,Zi(w)),0===(524288&C.n)?(J=-1+
h|0,w=vm(w,1),q=22>h?(new Q).Y(q.x|1<<h,q.u,q.n):44>h?(new Q).Y(q.x,q.u|1<<(-22+h|0),q.n):(new Q).Y(q.x,q.u,q.n|1<<(-44+h|0)),h=J,J=C):(h=-1+h|0,w=vm(w,1))}e=c!==e?Zi(P):P;c&&g?(c=Zi(l),g=s().pg,c=Uc(c,Zi(g))):c=c?Zi(l):l;return[e,c]}function Bd(a,b){return(new Q).Y(a.x&b.x,a.u&b.u,a.n&b.n)}
function Yc(a,b){var c=63&b;if(22>c){var e=22-c|0;return(new Q).Y(4194303&(a.x>>c|a.u<<e),4194303&(a.u>>c|a.n<<e),1048575&(a.n>>>c|0))}return 44>c?(e=-22+c|0,(new Q).Y(4194303&(a.u>>e|a.n<<(44-c|0)),4194303&(a.n>>>e|0),0)):(new Q).Y(4194303&(a.n>>>(-44+c|0)|0),0,0)}function Ha(a,b){return 0===(524288&a.n)?0!==(524288&b.n)||a.n>b.n||a.n===b.n&&a.u>b.u||a.n===b.n&&a.u===b.u&&a.x>b.x:!(0===(524288&b.n)||a.n<b.n||a.n===b.n&&a.u<b.u||a.n===b.n&&a.u===b.u&&a.x<=b.x)}
function Xc(a,b){var c=63&b;if(22>c){var e=22-c|0;return(new Q).Y(4194303&a.x<<c,4194303&(a.u<<c|a.x>>e),1048575&(a.n<<c|a.u>>e))}return 44>c?(e=-22+c|0,(new Q).Y(0,4194303&a.x<<e,1048575&(a.u<<e|a.x>>(44-c|0)))):(new Q).Y(0,0,1048575&a.x<<(-44+c|0))}function R(a){return a.x|a.u<<22}m.aa=function(a){Q.prototype.Y.call(this,4194303&a,4194303&a>>22,0>a?1048575:0);return this};
function Zi(a){var b=4194303&(1+~a.x|0),c=4194303&(~a.u+(0===b?1:0)|0);return(new Q).Y(b,c,1048575&(~a.n+(0===b&&0===c?1:0)|0))}function Uc(a,b){var c=a.x+b.x|0,e=(a.u+b.u|0)+(c>>22)|0;return(new Q).Y(4194303&c,4194303&e,1048575&((a.n+b.n|0)+(e>>22)|0))}
function vm(a,b){var c=63&b,e=0!==(524288&a.n),g=e?-1048576|a.n:a.n;if(22>c)return e=22-c|0,(new Q).Y(4194303&(a.x>>c|a.u<<e),4194303&(a.u>>c|g<<e),1048575&g>>c);if(44>c){var h=-22+c|0;return(new Q).Y(4194303&(a.u>>h|g<<(44-c|0)),4194303&g>>h,1048575&(e?1048575:0))}return(new Q).Y(4194303&g>>(-44+c|0),4194303&(e?4194303:0),1048575&(e?1048575:0))}function sj(a){return Ga(a,s().Kd)?-9223372036854775E3:0!==(524288&a.n)?-sj(Zi(a)):a.x+4194304*a.u+17592186044416*a.n}
function li(a){return Tc(a,(new Q).Y(1E3,0,0))[0]}function wm(a){return 0!==a.n?-12+de(U(),a.n)|0:0!==a.u?10+de(U(),a.u)|0:32+de(U(),a.x)|0}m.ta=function(){return R(Vi(this,Yc(this,32)))};function Vi(a,b){return(new Q).Y(a.x^b.x,a.u^b.u,a.n^b.n)}function Ga(a,b){return a.x===b.x&&a.u===b.u&&a.n===b.n}function ua(a){return!!(a&&a.a&&a.a.p.Ij)}m.a=new t({Ij:0},!1,"scala.scalajs.runtime.RuntimeLong",je,{Ij:1,Yc:1,d:1,Ra:1});var fg=new t({tp:0},!1,"scala.runtime.Nothing$",Ce,{tp:1,ua:1,d:1,f:1});
function xm(){this.Jh=this.We=0;this.Qj=null}xm.prototype=new bh;xm.prototype.ga=function(){var a=this.Qj.cd(this.We);this.We=1+this.We|0;return a};function Fd(a){var b=new xm;b.Qj=a;b.We=0;b.Jh=a.bd();return b}xm.prototype.ja=function(){return this.We<this.Jh};xm.prototype.a=new t({xp:0},!1,"scala.runtime.ScalaRunTime$$anon$1",kh,{xp:1,Tb:1,d:1,dc:1,s:1,r:1});function ym(){V.call(this)}ym.prototype=new Uj;function zm(){}zm.prototype=ym.prototype;
ym.prototype.c=function(){ym.prototype.sc.call(this,null,null);return this};var Am=new t({zf:0},!1,"java.io.IOException",Vj,{zf:1,Ya:1,ua:1,d:1,f:1});ym.prototype.a=Am;function Bm(){this.Hi=null;this.hl=!1;this.nq=this.jl=null;this.jq=this.Al=this.Sl=this.ll=!1}Bm.prototype=new Bj;function Cm(){}Cm.prototype=Bm.prototype;function zl(a){ck||(ck=(new bk).c());var b=ck.Ii.nh.Kf();Dm(b,aj(za(),a));Dm(b,"\n")}
Bm.prototype.Ll=function(a,b,c){this.hl=b;this.jl=c;Aj.prototype.Ig.call(this,a);this.Al=this.Sl=this.ll=!1;return this};Bm.prototype.Ig=function(a){Bm.prototype.Ll.call(this,a,!1,null);return this};var Em=new t({xh:0},!1,"java.io.PrintStream",Cj,{xh:1,jg:1,Ie:1,d:1,xf:1,yf:1,Of:1});Bm.prototype.a=Em;function Bb(){Cb.call(this);this.He=!1}Bb.prototype=new Dj;
function mc(a,b,c,e){if(0>c||0>e||(c+e|0)>b.b.length)throw(new H).c();if(a.He)throw(new kc).c();var g=a.k,h=g+e|0;if(h>a.W)throw(new lc).c();Ka(b,c,a.pc,g+a.Fd|0,e);D(a,h)}function nc(a){if(a.k===a.W)throw(new tc).c();var b=a.k;D(a,1+b|0);return a.pc.b[a.Fd+b|0]}function K(a,b){if(a.He)throw(new kc).c();if(a.k===a.W)throw(new lc).c();var c=a.k;a.pc.b[a.Fd+c|0]=b;D(a,1+c|0)}Bb.prototype.a=new t({mk:0},!1,"java.nio.HeapByteBuffer",Ej,{mk:1,kg:1,Je:1,d:1,Ra:1});
function Fm(){Fj.call(this);this.Fe=null;this.Ge=0}Fm.prototype=new Gj;Fm.prototype.kh=function(a,b){if(0>a||b<a||b>(this.W-this.k|0))throw(new H).c();return Qd(this.Gd,this.Fe,this.Ge,this.k+a|0,this.k+b|0)};function Hj(a){if(a.k===a.W)throw(new tc).c();var b=a.k;D(a,1+b|0);return Ia(a.Fe,a.Ge+b|0)}function Qd(a,b,c,e,g){var h=new Fm;h.Fe=b;h.Ge=c;Fj.prototype.aa.call(h,a);D(h,e);vb(h,g);return h}Fm.prototype.v=function(){var a=this.Ge;return ha(Ja(this.Fe,this.k+a|0,this.W+a|0))};
Fm.prototype.a=new t({pk:0},!1,"java.nio.StringCharBuffer",Ij,{pk:1,lg:1,Je:1,d:1,Ra:1,Pf:1,Of:1,jm:1});function Gm(){V.call(this)}Gm.prototype=new Rj;function Sd(a){var b=new Gm;Qj.prototype.Ol.call(b,a);return b}Gm.prototype.a=new t({sk:0},!1,"java.nio.charset.CoderMalfunctionError",Sj,{sk:1,Lg:1,ua:1,d:1,f:1});function Yd(){V.call(this)}Yd.prototype=new Rj;Yd.prototype.da=function(a){Yd.prototype.q.call(this,ha(a));return this};
Yd.prototype.a=new t({Wl:0},!1,"java.lang.AssertionError",Sj,{Wl:1,Lg:1,ua:1,d:1,f:1});function Hm(){V.call(this)}Hm.prototype=new Uj;function Im(){}Im.prototype=Hm.prototype;Hm.prototype.c=function(){Hm.prototype.sc.call(this,null,null);return this};Hm.prototype.q=function(a){Hm.prototype.sc.call(this,a,null);return this};var Jm=new t({Db:0},!1,"java.lang.RuntimeException",Vj,{Db:1,Ya:1,ua:1,d:1,f:1});Hm.prototype.a=Jm;function xg(){nk.call(this)}xg.prototype=new ok;
xg.prototype.c=function(){nk.prototype.ff.call(this,X().Wf,"Any");return this};xg.prototype.Za=function(a){return this.ad(a)};xg.prototype.ad=function(a){return p(x(v),[a])};xg.prototype.a=new t({Um:0},!1,"scala.reflect.ManifestFactory$$anon$1",pk,{Um:1,ve:1,be:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function yg(){nk.call(this)}yg.prototype=new ok;yg.prototype.c=function(){nk.prototype.ff.call(this,X().Wf,"Object");return this};yg.prototype.Za=function(a){return this.ad(a)};
yg.prototype.ad=function(a){return p(x(v),[a])};yg.prototype.a=new t({$m:0},!1,"scala.reflect.ManifestFactory$$anon$2",pk,{$m:1,ve:1,be:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function zg(){nk.call(this)}zg.prototype=new ok;zg.prototype.c=function(){nk.prototype.ff.call(this,X().Wf,"AnyVal");return this};zg.prototype.Za=function(a){return this.ad(a)};zg.prototype.ad=function(a){return p(x(v),[a])};
zg.prototype.a=new t({an:0},!1,"scala.reflect.ManifestFactory$$anon$3",pk,{an:1,ve:1,be:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function Ag(){nk.call(this)}Ag.prototype=new ok;Ag.prototype.c=function(){nk.prototype.ff.call(this,X().Zi,"Null");return this};Ag.prototype.Za=function(a){return this.ad(a)};Ag.prototype.ad=function(a){return p(x(v),[a])};Ag.prototype.a=new t({bn:0},!1,"scala.reflect.ManifestFactory$$anon$4",pk,{bn:1,ve:1,be:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});
function Bg(){nk.call(this)}Bg.prototype=new ok;Bg.prototype.c=function(){nk.prototype.ff.call(this,X().Yi,"Nothing");return this};Bg.prototype.Za=function(a){return this.ad(a)};Bg.prototype.ad=function(a){return p(x(v),[a])};Bg.prototype.a=new t({cn:0},!1,"scala.reflect.ManifestFactory$$anon$5",pk,{cn:1,ve:1,be:1,d:1,Fb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function Kg(){te.call(this);this.qh=null}Kg.prototype=new Wj;
Kg.prototype.a=new t({ln:0},!1,"scala.util.DynamicVariable$$anon$1",Xj,{ln:1,zi:1,Ng:1,d:1});function Km(){}Km.prototype=new uk;function Lm(){}m=Lm.prototype=Km.prototype;
m.ia=function(a){if(a&&a.a&&a.a.p.Ug){var b;if(!(b=this===a)&&(b=this.ha()===a.ha()))try{for(var c=this.fa(),e=!0;e&&c.ja();){var g=c.ga();if(null!==g){var h=g.Xb,l=Td(a,g.kc);b:{if(Od(l)){var q=l.Dd;if(S(T(),h,q)){e=!0;break b}}e=!1}}else throw(new L).da(g);}b=e}catch(w){if(w&&w.a&&w.a.p.Zl)zl("class cast "),b=!1;else throw w;}a=b}else a=!1;return a};m.t=function(){return 0===this.ha()};m.v=function(){return Vk(this)};m.zc=function(){var a=(new Ek).aa(this.ha()),b=this.Wa();Fk(a,b);return a};
m.Me=function(a,b,c,e){return Tk(this,a,b,c,e)};m.ta=function(){var a=Ug();return Sg(a,this,a.Ei)};m.yc=k("Map");var Mm=new t({Tg:0},!1,"scala.collection.AbstractMap",yk,{Tg:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Wi:1,Ug:1,Vi:1,Xi:1,Aa:1,w:1,Ta:1});Km.prototype.a=Mm;function Nm(){}Nm.prototype=new uk;function Om(){}m=Om.prototype=Nm.prototype;m.ia=function(a){return kb(a)?this.fd(a):!1};m.t=function(){return 0===this.td(0)};m.v=function(){return Vk(this)};m.ha=function(){return this.l()};
m.ta=function(){return sk(Ug(),this.Ad())};var Pm=new t({Ga:0},!1,"scala.collection.AbstractSeq",yk,{Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1});Nm.prototype.a=Pm;function Qm(){}Qm.prototype=new uk;function Rm(){}m=Rm.prototype=Qm.prototype;m.t=function(){return 0===this.ha()};m.ia=function(a){return zk(this,a)};m.v=function(){return Vk(this)};m.lh=function(a){return this.ef(a)};m.zc=function(){return Uk(this)};
m.ta=function(){var a=Ug();return Sg(a,this.ie(),a.fh)};m.ma=function(){return Ei(new Ci,this.Od())};m.yc=k("Set");var Sm=new t({Ob:0},!1,"scala.collection.AbstractSet",yk,{Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1});Qm.prototype.a=Sm;function Ef(){this.xa=null}Ef.prototype=new cl;Ef.prototype.ma=function(){Tm||(Tm=(new Um).c());return(new Gh).c()};
Ef.prototype.a=new t({zn:0},!1,"scala.collection.Iterable$",el,{zn:1,ib:1,ra:1,d:1,yb:1,Oa:1});var Df=void 0;function Cf(){this.il=this.xa=null}Cf.prototype=new cl;Cf.prototype.c=function(){bl.prototype.c.call(this);Bf=this;this.il=(new Mg).c();return this};Cf.prototype.ma=function(){Vm||(Vm=(new Wm).c());return(new Gh).c()};Cf.prototype.a=new t({Fn:0},!1,"scala.collection.Traversable$",el,{Fn:1,ib:1,ra:1,d:1,yb:1,Oa:1});var Bf=void 0;function Xm(){this.xa=null}Xm.prototype=new cl;
function Ym(){}Ym.prototype=Xm.prototype;var Zm=new t({Ub:0},!1,"scala.collection.generic.GenSeqFactory",el,{Ub:1,ib:1,ra:1,d:1});Xm.prototype.a=Zm;function $m(){}$m.prototype=new hl;function an(){}an.prototype=$m.prototype;var bn=new t({bj:0},!1,"scala.collection.generic.ImmutableMapFactory",il,{bj:1,Xg:1,Xf:1,d:1});$m.prototype.a=bn;function cn(){}cn.prototype=new $k;function dn(){}dn.prototype=cn.prototype;var en=new t({ee:0},!1,"scala.collection.generic.SetFactory",al,{ee:1,yd:1,ra:1,d:1,Oa:1});
cn.prototype.a=en;function fn(){rl.call(this)}fn.prototype=new sl;fn.prototype.a=new t({Qn:0},!1,"scala.collection.immutable.HashSet$HashTrieSet$$anon$1",vl,{Qn:1,gj:1,Tb:1,d:1,dc:1,s:1,r:1});function Um(){this.xa=null}Um.prototype=new cl;Um.prototype.ma=function(){return(new Gh).c()};Um.prototype.a=new t({Sn:0},!1,"scala.collection.immutable.Iterable$",el,{Sn:1,ib:1,ra:1,d:1,yb:1,Oa:1});var Tm=void 0;function Wm(){this.xa=null}Wm.prototype=new cl;Wm.prototype.ma=function(){return(new Gh).c()};
Wm.prototype.a=new t({ro:0},!1,"scala.collection.immutable.Traversable$",el,{ro:1,ib:1,ra:1,d:1,yb:1,Oa:1});var Vm=void 0;function gn(){}gn.prototype=new uk;function hn(){}hn.prototype=gn.prototype;var jn=new t({ah:0},!1,"scala.collection.mutable.AbstractIterable",yk,{ah:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,cb:1,db:1,ab:1});gn.prototype.a=jn;function kn(){this.xa=null}kn.prototype=new cl;kn.prototype.ma=function(){return(new Ek).c()};
kn.prototype.a=new t({Ko:0},!1,"scala.collection.mutable.Iterable$",el,{Ko:1,ib:1,ra:1,d:1,yb:1,Oa:1});var ln=void 0;function Xb(){hm.call(this)}Xb.prototype=new im;Xb.prototype.c=function(){hm.prototype.re.call(this,"ISO-8859-1",Jc(N(),(new G).ca("csISOLatin1 IBM-819 iso-ir-100 8859_1 ISO_8859-1 l1 ISO8859-1 ISO_8859_1 cp819 ISO8859_1 latin1 ISO_8859-1:1987 819 IBM819".split(" ")),od(O(),r(ja))),255);Wb=this;return this};
Xb.prototype.a=new t({ap:0},!1,"scala.scalajs.niocharset.ISO_8859_1$",km,{ap:1,gh:1,Cc:1,d:1,Ra:1});var Wb=void 0;function Zb(){hm.call(this)}Zb.prototype=new im;Zb.prototype.c=function(){hm.prototype.re.call(this,"US-ASCII",Jc(N(),(new G).ca("cp367 ascii7 ISO646-US 646 csASCII us iso_646.irv:1983 ISO_646.irv:1991 IBM367 ASCII default ANSI_X3.4-1986 ANSI_X3.4-1968 iso-ir-6".split(" ")),od(O(),r(ja))),127);Yb=this;return this};
Zb.prototype.a=new t({cp:0},!1,"scala.scalajs.niocharset.US_ASCII$",km,{cp:1,gh:1,Cc:1,d:1,Ra:1});var Yb=void 0;function fc(){lm.call(this)}fc.prototype=new mm;fc.prototype.c=function(){lm.prototype.re.call(this,"UTF-16",Jc(N(),(new G).ca(["utf16","UTF_16","UnicodeBig","unicode"]),od(O(),r(ja))),0);ec=this;return this};fc.prototype.a=new t({dp:0},!1,"scala.scalajs.niocharset.UTF_16$",om,{dp:1,cg:1,Cc:1,d:1,Ra:1});var ec=void 0;function bc(){lm.call(this)}bc.prototype=new mm;
bc.prototype.c=function(){lm.prototype.re.call(this,"UTF-16BE",Jc(N(),(new G).ca(["X-UTF-16BE","UTF_16BE","ISO-10646-UCS-2","UnicodeBigUnmarked"]),od(O(),r(ja))),1);ac=this;return this};bc.prototype.a=new t({fp:0},!1,"scala.scalajs.niocharset.UTF_16BE$",om,{fp:1,cg:1,Cc:1,d:1,Ra:1});var ac=void 0;function dc(){lm.call(this)}dc.prototype=new mm;
dc.prototype.c=function(){lm.prototype.re.call(this,"UTF-16LE",Jc(N(),(new G).ca(["UnicodeLittleUnmarked","UTF_16LE","X-UTF-16LE"]),od(O(),r(ja))),2);cc=this;return this};dc.prototype.a=new t({gp:0},!1,"scala.scalajs.niocharset.UTF_16LE$",om,{gp:1,cg:1,Cc:1,d:1,Ra:1});var cc=void 0;function lc(){V.call(this)}lc.prototype=new Im;lc.prototype.a=new t({yh:0},!1,"java.nio.BufferOverflowException",Jm,{yh:1,Db:1,Ya:1,ua:1,d:1,f:1});function tc(){V.call(this)}tc.prototype=new Im;
tc.prototype.a=new t({zh:0},!1,"java.nio.BufferUnderflowException",Jm,{zh:1,Db:1,Ya:1,ua:1,d:1,f:1});function mn(){V.call(this)}mn.prototype=new zm;function nn(){}nn.prototype=mn.prototype;var on=new t({mg:0},!1,"java.nio.charset.CharacterCodingException",Am,{mg:1,zf:1,Ya:1,ua:1,d:1,f:1});mn.prototype.a=on;function um(){V.call(this)}um.prototype=new Im;um.prototype.a=new t({Vl:0},!1,"java.lang.ArithmeticException",Jm,{Vl:1,Db:1,Ya:1,ua:1,d:1,f:1});function F(){V.call(this)}F.prototype=new Im;
function pn(){}pn.prototype=F.prototype;F.prototype.c=function(){F.prototype.sc.call(this,null,null);return this};F.prototype.q=function(a){F.prototype.sc.call(this,a,null);return this};var qn=new t({Mg:0},!1,"java.lang.IllegalArgumentException",Jm,{Mg:1,Db:1,Ya:1,ua:1,d:1,f:1});F.prototype.a=qn;function Rd(){V.call(this)}Rd.prototype=new Im;Rd.prototype.c=function(){Rd.prototype.sc.call(this,null,null);return this};
Rd.prototype.a=new t({cm:0},!1,"java.lang.IllegalStateException",Jm,{cm:1,Db:1,Ya:1,ua:1,d:1,f:1});function H(){V.call(this)}H.prototype=new Im;function rn(){}rn.prototype=H.prototype;H.prototype.c=function(){H.prototype.q.call(this,null);return this};var sn=new t({yi:0},!1,"java.lang.IndexOutOfBoundsException",Jm,{yi:1,Db:1,Ya:1,ua:1,d:1,f:1});H.prototype.a=sn;function tn(){Bm.call(this);this.pi=null;this.Fg=!1;this.Ue=null}tn.prototype=new Cm;
function re(a){var b=new tn;b.pi=a;Bm.prototype.Ig.call(b,(new Yj).c());b.Fg=!0;b.Ue="";return b}function Dm(a,b){for(var c=b;""!==c;){var e=c.indexOf("\n")|0;if(0>e)a.Ue=""+a.Ue+c,a.Fg=!1,c="";else{var g=""+a.Ue+c.substring(0,e);n.console&&(a.pi&&n.console.error?n.console.error(g):n.console.log(g));a.Ue="";a.Fg=!0;c=c.substring(1+e|0)}}}tn.prototype.a=new t({fm:0},!1,"java.lang.JSConsoleBasedPrintStream",Em,{fm:1,xh:1,jg:1,Ie:1,d:1,xf:1,yf:1,Of:1});function ta(){V.call(this)}ta.prototype=new Im;
ta.prototype.c=function(){ta.prototype.q.call(this,null);return this};ta.prototype.a=new t({im:0},!1,"java.lang.NullPointerException",Jm,{im:1,Db:1,Ya:1,ua:1,d:1,f:1});function Vd(){V.call(this)}Vd.prototype=new Im;function un(){}un.prototype=Vd.prototype;Vd.prototype.c=function(){Vd.prototype.sc.call(this,null,null);return this};Vd.prototype.q=function(a){Vd.prototype.sc.call(this,a,null);return this};var vn=new t({Ai:0},!1,"java.lang.UnsupportedOperationException",Jm,{Ai:1,Db:1,Ya:1,ua:1,d:1,f:1});
Vd.prototype.a=vn;function ek(){V.call(this)}ek.prototype=new Im;ek.prototype.a=new t({qm:0},!1,"java.util.NoSuchElementException",Jm,{qm:1,Db:1,Ya:1,ua:1,d:1,f:1});function L(){V.call(this);this.Fi=this.mf=null;this.tg=!1}L.prototype=new Im;L.prototype.Jf=function(){if(!this.tg&&!this.tg){var a;if(null===this.mf)a="null";else try{a=ha(this.mf)+" ("+("of class "+hb(ia(this.mf)))+")"}catch(b){if(null!==ye(ze(),b))a="an instance of class "+hb(ia(this.mf));else throw b;}this.Fi=a;this.tg=!0}return this.Fi};
L.prototype.da=function(a){this.mf=a;Hm.prototype.c.call(this);return this};L.prototype.a=new t({ym:0},!1,"scala.MatchError",Jm,{ym:1,Db:1,Ya:1,ua:1,d:1,f:1});function wn(){}wn.prototype=new dn;function xn(){}xn.prototype=wn.prototype;wn.prototype.ne=function(){return this.Ef()};wn.prototype.ma=function(){return Ei(new Ci,this.Ef())};var yn=new t({Zf:0},!1,"scala.collection.generic.ImmutableSetFactory",en,{Zf:1,ee:1,yd:1,ra:1,d:1,Oa:1});wn.prototype.a=yn;function zn(){}zn.prototype=new dn;
function An(){}An.prototype=zn.prototype;zn.prototype.ma=function(){return si(new ri,(new Ih).c())};var Bn=new t({cj:0},!1,"scala.collection.generic.MutableSetFactory",en,{cj:1,ee:1,yd:1,ra:1,d:1,Oa:1});zn.prototype.a=Bn;function Cn(){this.xa=null}Cn.prototype=new Ym;function Dn(){}Dn.prototype=Cn.prototype;var En=new t({fc:0},!1,"scala.collection.generic.SeqFactory",Zm,{fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1});Cn.prototype.a=En;function Fn(){}Fn.prototype=new Rm;function Gn(){}m=Gn.prototype=Fn.prototype;
m.Wa=function(){return this};m.vf=function(a,b){return Hn(a,b)};m.c=function(){return this};m.o=function(a){return this.ub(a)};function In(a,b){return a.vf(b,Jn(Nb(I(),b)),0)}m.Cb=function(){return this};m.pb=function(){return Kn()};m.ka=aa();m.lh=function(a){if(a&&a.a&&a.a.p.ge)return this.uf(a,0);var b=this.fa();return wk(b,a)};m.ha=k(0);m.fa=function(){return Ff().mc};m.Od=function(){return Ln()};function Jn(a){a=a+~(a<<9)|0;a^=a>>>14|0;a=a+(a<<4)|0;return a^(a>>>10|0)}m.ie=function(){return this};
m.ub=function(a){return this.od(a,Jn(Nb(I(),a)),0)};m.Ac=function(a){return In(this,a)};m.od=k(!1);m.uf=k(!0);var Mn=new t({ge:0},!1,"scala.collection.immutable.HashSet",Sm,{ge:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,hb:1,g:1,f:1});Fn.prototype.a=Mn;function Nn(){}Nn.prototype=new Om;function On(){}m=On.prototype=Nn.prototype;m.Wa=function(){return this};m.c=function(){return this};
m.td=function(a){return 0>a?1:Rk(this,a)};m.fd=function(a){return Sk(this,a)};m.o=function(a){return Qk(this,a|0)};m.Cb=function(){return this};m.bi=function(a){for(var b=this;!b.t()&&0<a;)b=b.na(),a=-1+a|0;return b};m.pb=function(){return xd()};m.ka=function(a){for(var b=this;!b.t();)a.o(b.pa()),b=b.na()};m.fa=function(){var a=new Pk;if(null===this)throw Be(ze(),null);a.Mb=this;a.rb=this;return a};m.l=function(){for(var a=this,b=0;!a.t();)b=1+b|0,a=a.na();return b};m.Ad=function(){return this};
m.Wb=function(){return this.t()?Ok():Lk(new Mk,this.pa(),Nk(function(a){return function(){return a.na().Wb()}}(this)))};m.ta=function(){return sk(Ug(),this)};m.yc=k("List");var Pn=new t({ag:0},!1,"scala.collection.immutable.List",Pm,{ag:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,sf:1,xe:1,Va:1,bb:1,$a:1,ce:1,nf:1,ed:1,of:1,f:1});Nn.prototype.a=Pn;function Qn(){}Qn.prototype=new Rm;function Rn(){}m=Rn.prototype=Qn.prototype;m.Wa=function(){return this};
m.c=function(){return this};m.pa=function(){throw(new ek).q("Set has no elements");};m.o=function(a){return this.ub(a)};m.t=k(!0);m.Cb=function(){return this};m.Vg=function(){throw(new ek).q("Empty ListSet has no outer pointer");};m.pb=function(){Sn||(Sn=(new Tn).c());return Sn};m.Ee=function(a){return Jh(this,a)};m.ha=k(0);m.fa=function(){return(new jl).se(this)};m.Od=function(){return Dh()};m.ie=function(){return this};m.ub=k(!1);m.Ac=function(a){return this.Ee(a)};
m.Kj=function(){throw(new ek).q("Next of an empty set");};m.yc=k("ListSet");var Un=new t({Zg:0},!1,"scala.collection.immutable.ListSet",Sm,{Zg:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,g:1,f:1});Qn.prototype.a=Un;function jk(){}jk.prototype=new an;jk.prototype.a=new t({$n:0},!1,"scala.collection.immutable.Map$",bn,{$n:1,bj:1,Xg:1,Xf:1,d:1});var ik=void 0;function Vn(){}Vn.prototype=new Rm;m=Vn.prototype;
m.Wa=function(){return this};m.c=function(){Wn=this;return this};m.o=k(!1);m.Cb=function(){return this};m.pb=function(){return kk()};m.ka=aa();m.ha=k(0);m.fa=function(){return Ff().mc};m.Od=function(){return Xn()};m.ie=function(){return this};m.Ac=function(a){return(new Yn).da(a)};m.a=new t({fo:0},!1,"scala.collection.immutable.Set$EmptySet$",Sm,{fo:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,g:1,f:1});
var Wn=void 0;function Xn(){Wn||(Wn=(new Vn).c());return Wn}function Yn(){this.za=null}Yn.prototype=new Rm;m=Yn.prototype;m.Wa=function(){return this};m.o=function(a){return this.ub(a)};m.Cb=function(){return this};m.pb=function(){return kk()};m.ef=function(a){return!!a.o(this.za)};m.ka=function(a){a.o(this.za)};m.ha=k(1);m.da=function(a){this.za=a;return this};m.fa=function(){Ff();var a=(new G).ca([this.za]);return Ck(new Bk,a,a.i.length|0)};m.Od=function(){return Xn()};
m.Ed=function(a){return this.ub(a)?this:(new Zn).Yd(this.za,a)};m.ie=function(){return this};m.ub=function(a){return S(T(),a,this.za)};m.Ac=function(a){return this.Ed(a)};m.a=new t({go:0},!1,"scala.collection.immutable.Set$Set1",Sm,{go:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,g:1,f:1});function Zn(){this.gb=this.za=null}Zn.prototype=new Rm;m=Zn.prototype;m.Wa=function(){return this};m.o=function(a){return this.ub(a)};
m.Cb=function(){return this};m.Yd=function(a,b){this.za=a;this.gb=b;return this};m.pb=function(){return kk()};m.ef=function(a){return!!a.o(this.za)&&!!a.o(this.gb)};m.ka=function(a){a.o(this.za);a.o(this.gb)};m.ha=k(2);m.fa=function(){Ff();var a=(new G).ca([this.za,this.gb]);return Ck(new Bk,a,a.i.length|0)};m.Od=function(){return Xn()};m.Ed=function(a){if(this.ub(a))a=this;else{var b=this.gb,c=new $n;c.za=this.za;c.gb=b;c.Zb=a;a=c}return a};m.ie=function(){return this};
m.ub=function(a){return S(T(),a,this.za)||S(T(),a,this.gb)};m.Ac=function(a){return this.Ed(a)};m.a=new t({ho:0},!1,"scala.collection.immutable.Set$Set2",Sm,{ho:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,g:1,f:1});function $n(){this.Zb=this.gb=this.za=null}$n.prototype=new Rm;m=$n.prototype;m.Wa=function(){return this};m.o=function(a){return this.ub(a)};m.Cb=function(){return this};m.pb=function(){return kk()};
m.ef=function(a){return!!a.o(this.za)&&!!a.o(this.gb)&&!!a.o(this.Zb)};m.ka=function(a){a.o(this.za);a.o(this.gb);a.o(this.Zb)};m.ha=k(3);m.fa=function(){Ff();var a=(new G).ca([this.za,this.gb,this.Zb]);return Ck(new Bk,a,a.i.length|0)};m.Od=function(){return Xn()};m.Ed=function(a){if(this.ub(a))a=this;else{var b=this.gb,c=this.Zb,e=new ao;e.za=this.za;e.gb=b;e.Zb=c;e.me=a;a=e}return a};m.ie=function(){return this};m.ub=function(a){return S(T(),a,this.za)||S(T(),a,this.gb)||S(T(),a,this.Zb)};
m.Ac=function(a){return this.Ed(a)};m.a=new t({io:0},!1,"scala.collection.immutable.Set$Set3",Sm,{io:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,g:1,f:1});function ao(){this.me=this.Zb=this.gb=this.za=null}ao.prototype=new Rm;m=ao.prototype;m.Wa=function(){return this};m.o=function(a){return this.ub(a)};m.Cb=function(){return this};m.pb=function(){return kk()};
m.ef=function(a){return!!a.o(this.za)&&!!a.o(this.gb)&&!!a.o(this.Zb)&&!!a.o(this.me)};m.ka=function(a){a.o(this.za);a.o(this.gb);a.o(this.Zb);a.o(this.me)};m.ha=k(4);m.fa=function(){Ff();var a=(new G).ca([this.za,this.gb,this.Zb,this.me]);return Ck(new Bk,a,a.i.length|0)};m.Od=function(){return Xn()};m.Ed=function(a){if(this.ub(a))return this;var b=(new Fn).c(),c=this.gb;a=[this.Zb,this.me,a];var e=In(In(b,this.za),c),b=0,c=a.length|0,g=e;for(;;){if(b===c)return g;e=1+b|0;g=g.Ac(a[b]);b=e}};
m.ie=function(){return this};m.ub=function(a){return S(T(),a,this.za)||S(T(),a,this.gb)||S(T(),a,this.Zb)||S(T(),a,this.me)};m.Ac=function(a){return this.Ed(a)};m.a=new t({jo:0},!1,"scala.collection.immutable.Set$Set4",Sm,{jo:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,g:1,f:1});function bo(){}bo.prototype=new Om;function co(){}m=co.prototype=bo.prototype;m.Wa=function(){return this};m.c=function(){return this};
m.td=function(a){return 0>a?1:Rk(this,a)};m.o=function(a){return Qk(this,a|0)};m.fd=function(a){return Sk(this,a)};m.Cb=function(){return this};function ml(a,b){var c=(Nf(),(new ol).c());if(nl(c.Oe(a))){if(a.t())c=Ok();else{for(var c=(new vj).da(a),e=b.o(c.$.pa()).Wb();!c.$.t()&&e.t();)c.$=c.$.na(),c.$.t()||(e=b.o(c.$.pa()).Wb());c=c.$.t()?(Nf(),Ok()):eo(e,Nk(function(a,b,c){return function(){return ml(c.$.na(),b)}}(a,b,c)))}return c}return Wk(a,b,c)}
m.bi=function(a){a:{var b=this;for(;;){if(0>=a||b.t()){a=b;break a}b=b.na();a=-1+a|0}a=void 0}return a};m.Og=function(a){return this.te("",a,"")};m.te=function(a,b,c){for(var e=this;!e.t();)e=e.na();return gh(this,a,b,c)};m.pb=function(){return Nf()};m.v=function(){return gh(this,"Stream(",", ",")")};m.ka=function(a){var b=this;a:b:for(;;){if(!b.t()){a.o(b.pa());b=b.na();continue b}break a}};m.fa=function(){return ql(this)};m.Ad=function(){return this};
m.l=function(){for(var a=0,b=this;!b.t();)a=1+a|0,b=b.na();return a};m.kf=function(){return this.te("","","")};m.Wb=function(){return this};m.Me=function(a,b,c,e){Xk(a,b);var g=this;b="";a:b:for(;;){if(g.t())Xk(a,e);else if(Yk(Xk(a,b),g.pa()),g.dg()){g=g.na();b=c;continue b}else Xk(Xk(Xk(a,c),"?"),e);break a}return a};m.ta=function(){return sk(Ug(),this)};function eo(a,b){if(a.t())return b.Ne().Wb();var c=a.pa();return Lk(new Mk,c,Nk(function(a,b){return function(){return eo(a.na(),b)}}(a,b)))}
m.yc=k("Stream");var fo=new t({$g:0},!1,"scala.collection.immutable.Stream",Pm,{$g:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,sf:1,xe:1,Va:1,bb:1,$a:1,ce:1,nf:1,of:1,g:1,f:1});bo.prototype.a=fo;function Rh(){this.If=this.Ff=this.ze=0;this.Lh=!1;this.zg=0;this.ai=this.Yh=this.Vh=this.Sh=this.Ph=this.Mh=null}Rh.prototype=new Om;m=Rh.prototype;m.Wa=function(){return this};m.ya=f("Vh");
m.Ua=function(a){var b=a+this.ze|0;if(0<=a&&b<this.Ff)a=b;else throw(new H).q(""+a);return xl(this,a,a^this.If)};m.td=function(a){return this.l()-a|0};m.Yb=f("zg");m.o=function(a){return this.Ua(a|0)};m.Cb=function(){return this};m.Y=function(a,b,c){this.ze=a;this.Ff=b;this.If=c;this.Lh=!1;return this};m.cf=d("ai");m.pb=function(){return hd()};m.eb=f("Mh");m.mb=f("Yh");m.fb=d("Sh");m.zc=function(){return Dk(this)};
m.fa=function(){var a=(new wl).ac(this.ze,this.Ff);Sh(a,this,this.zg);if(this.Lh){var b=this.If,c=-1+a.Yb()|0;switch(c){case 5:a.cf(yl(a.Ic()));a.Hc(yl(a.mb()));a.Nb(yl(a.ya()));a.fb(yl(a.ea()));a.Fa(yl(a.X()));a.Ic().b[31&b>>25]=a.mb();a.mb().b[31&b>>20]=a.ya();a.ya().b[31&b>>15]=a.ea();a.ea().b[31&b>>10]=a.X();a.X().b[31&b>>5]=a.eb();break;case 4:a.Hc(yl(a.mb()));a.Nb(yl(a.ya()));a.fb(yl(a.ea()));a.Fa(yl(a.X()));a.mb().b[31&b>>20]=a.ya();a.ya().b[31&b>>15]=a.ea();a.ea().b[31&b>>10]=a.X();a.X().b[31&
b>>5]=a.eb();break;case 3:a.Nb(yl(a.ya()));a.fb(yl(a.ea()));a.Fa(yl(a.X()));a.ya().b[31&b>>15]=a.ea();a.ea().b[31&b>>10]=a.X();a.X().b[31&b>>5]=a.eb();break;case 2:a.fb(yl(a.ea()));a.Fa(yl(a.X()));a.ea().b[31&b>>10]=a.X();a.X().b[31&b>>5]=a.eb();break;case 1:a.Fa(yl(a.X()));a.X().b[31&b>>5]=a.eb();break;case 0:break;default:throw(new L).da(c);}}1<a.yg&&Th(a,this.ze,this.ze^this.If);return a};m.Fa=d("Ph");m.Ad=function(){return this};m.l=function(){return this.Ff-this.ze|0};m.Hc=d("Yh");m.X=f("Ph");
m.Ic=f("ai");m.ta=function(){return sk(Ug(),this)};m.ld=d("zg");m.ea=f("Sh");m.Pa=d("Mh");m.Nb=d("Vh");m.a=new t({so:0},!1,"scala.collection.immutable.Vector",Pm,{so:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Gq:1,xe:1,Va:1,bb:1,$a:1,Pb:1,Qb:1,hj:1,g:1,f:1,hb:1});function go(){}go.prototype=new Lm;function ho(){}m=ho.prototype=go.prototype;m.pb=function(){ln||(ln=(new kn).c());return ln};m.jc=function(a,b){Kh(this,a,b)};m.sa=aa();
m.Ba=function(a){return Y(this,a)};m.ma=function(){return(new yc).c()};var io=new t({ij:0},!1,"scala.collection.mutable.AbstractMap",Mm,{ij:1,Tg:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Wi:1,Ug:1,Vi:1,Xi:1,Aa:1,w:1,Ta:1,No:1,cb:1,db:1,ab:1,Oo:1,Ia:1,Da:1,Ca:1,fe:1,jb:1,Sa:1,Qa:1});go.prototype.a=io;function jo(){}jo.prototype=new Om;function ko(){}ko.prototype=jo.prototype;jo.prototype.Wa=function(){return this.tf()};jo.prototype.tf=function(){return this};
var lo=new t({zb:0},!1,"scala.collection.mutable.AbstractSeq",Pm,{zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1});jo.prototype.a=lo;function mo(){}mo.prototype=new hn;function no(){}m=no.prototype=mo.prototype;m.t=function(){return 0===this.ha()};m.ia=function(a){return zk(this,a)};m.v=function(){return Vk(this)};m.lh=function(a){var b=Vl(this);return wk(b,a)};m.zc=function(){return Uk(this)};
m.jc=function(a,b){Kh(this,a,b)};m.ta=function(){var a=Ug();return Sg(a,this,a.fh)};m.sa=aa();m.ma=function(){return(new Ih).c()};m.Ba=function(a){return Y(this,a)};m.yc=k("Set");var oo=new t({jj:0},!1,"scala.collection.mutable.AbstractSet",jn,{jj:1,ah:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,cb:1,db:1,ab:1,Po:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,Ro:1,pf:1,Ia:1,Da:1,Ca:1,fe:1,jb:1,Sa:1,Qa:1});mo.prototype.a=oo;function fj(){V.call(this);this.md=null}fj.prototype=new Im;
m=fj.prototype;m.dd=k("JavaScriptException");m.bd=k(1);m.Hf=function(){xe();this.stackdata=this.md;return this};m.ia=function(a){return this===a?!0:Ae(a)?S(T(),this.md,a.md):!1};m.cd=function(a){switch(a){case 0:return this.md;default:throw(new H).q(""+a);}};m.v=function(){return ha(this.md)};m.da=function(a){this.md=a;Hm.prototype.c.call(this);return this};m.ta=function(){return Zd(this)};m.wd=function(){return Fd(this)};function Ae(a){return!!(a&&a.a&&a.a.p.Hj)}
m.a=new t({Hj:0},!1,"scala.scalajs.js.JavaScriptException",Jm,{Hj:1,Db:1,Ya:1,ua:1,d:1,f:1,ed:1,m:1,g:1});function kc(){V.call(this)}kc.prototype=new un;kc.prototype.a=new t({ok:0},!1,"java.nio.ReadOnlyBufferException",vn,{ok:1,Ai:1,Db:1,Ya:1,ua:1,d:1,f:1});function uc(){V.call(this);this.hf=0}uc.prototype=new nn;uc.prototype.Jf=function(){return"Input length \x3d "+this.hf};uc.prototype.aa=function(a){this.hf=a;mn.prototype.c.call(this);return this};
uc.prototype.a=new t({xk:0},!1,"java.nio.charset.MalformedInputException",on,{xk:1,mg:1,zf:1,Ya:1,ua:1,d:1,f:1});function vc(){V.call(this);this.hf=0}vc.prototype=new nn;vc.prototype.Jf=function(){return"Input length \x3d "+this.hf};vc.prototype.aa=function(a){this.hf=a;mn.prototype.c.call(this);return this};vc.prototype.a=new t({yk:0},!1,"java.nio.charset.UnmappableCharacterException",on,{yk:1,mg:1,zf:1,Ya:1,ua:1,d:1,f:1});function Pd(){V.call(this);this.kl=null}Pd.prototype=new pn;
Pd.prototype.q=function(a){this.kl=a;F.prototype.q.call(this,a);return this};Pd.prototype.a=new t({zk:0},!1,"java.nio.charset.UnsupportedCharsetException",qn,{zk:1,Mg:1,Db:1,Ya:1,ua:1,d:1,f:1});function Oc(){V.call(this)}Oc.prototype=new rn;Oc.prototype.c=function(){Oc.prototype.q.call(this,null);return this};Oc.prototype.a=new t({mm:0},!1,"java.lang.StringIndexOutOfBoundsException",sn,{mm:1,yi:1,Db:1,Ya:1,ua:1,d:1,f:1});function po(){V.call(this);this.Gl=0}po.prototype=new pn;
function kf(a,b){var c=new po;c.Gl=b;F.prototype.q.call(c,"invalid escape character at index "+b+' in "'+a+'"');return c}po.prototype.a=new t({Gm:0},!1,"scala.StringContext$InvalidEscapeException",qn,{Gm:1,Mg:1,Db:1,Ya:1,ua:1,d:1,f:1});function qo(){this.xa=null}qo.prototype=new Dn;qo.prototype.ma=function(){ro||(ro=(new so).c());return(new Gh).c()};qo.prototype.a=new t({En:0},!1,"scala.collection.Seq$",En,{En:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1});var to=void 0;
function Ub(){to||(to=(new qo).c());return to}function uo(){this.xa=null}uo.prototype=new Dn;function vo(){}vo.prototype=uo.prototype;var wo=new t({$f:0},!1,"scala.collection.generic.IndexedSeqFactory",En,{$f:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1});uo.prototype.a=wo;function Nj(){this.Ce=this.oe=null}Nj.prototype=new On;m=Nj.prototype;m.dd=k("::");m.pa=f("oe");m.bd=k(2);m.t=k(!1);m.cd=function(a){switch(a){case 0:return this.oe;case 1:return this.Ce;default:throw(new H).q(""+a);}};m.na=f("Ce");
function Mj(a,b,c){a.oe=b;a.Ce=c;return a}m.wd=function(){return Fd(this)};m.a=new t({Kn:0},!1,"scala.collection.immutable.$colon$colon",Pn,{Kn:1,ag:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,sf:1,xe:1,Va:1,bb:1,$a:1,ce:1,nf:1,ed:1,of:1,f:1,g:1});function xo(){}xo.prototype=new xn;
function yo(a,b,c,e,g,h){var l=31&(b>>>h|0),q=31&(e>>>h|0);if(l!==q)return a=1<<l|1<<q,b=p(x(Mn),[2]),l<q?(b.b[0]=c,b.b[1]=g):(b.b[0]=g,b.b[1]=c),zo(new Ao,a,b,c.ha()+g.ha()|0);q=p(x(Mn),[1]);l=1<<l;c=yo(a,b,c,e,g,5+h|0);q.b[0]=c;return zo(new Ao,l,q,c.je)}xo.prototype.Ef=function(){return Ln()};xo.prototype.a=new t({Nn:0},!1,"scala.collection.immutable.HashSet$",yn,{Nn:1,Zf:1,ee:1,yd:1,ra:1,d:1,Oa:1,g:1,f:1});var Bo=void 0;function Kn(){Bo||(Bo=(new xo).c());return Bo}function Co(){}
Co.prototype=new Gn;Co.prototype.a=new t({On:0},!1,"scala.collection.immutable.HashSet$EmptyHashSet$",Mn,{On:1,ge:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,hb:1,g:1,f:1});var Do=void 0;function Ln(){Do||(Do=(new Co).c());return Do}function Ao(){this.Fc=0;this.vb=null;this.je=0}Ao.prototype=new Gn;m=Ao.prototype;
m.vf=function(a,b,c){var e=1<<(31&(b>>>c|0)),g=ce(U(),this.Fc&(-1+e|0));if(0!==(this.Fc&e)){e=this.vb.b[g];a=e.vf(a,b,5+c|0);if(e===a)return this;b=p(x(Mn),[this.vb.b.length]);$(N(),this.vb,0,b,0,this.vb.b.length);b.b[g]=a;return zo(new Ao,this.Fc,b,this.je+(a.ha()-e.ha()|0)|0)}c=p(x(Mn),[1+this.vb.b.length|0]);$(N(),this.vb,0,c,0,g);c.b[g]=Hn(a,b);$(N(),this.vb,g,c,1+g|0,this.vb.b.length-g|0);return zo(new Ao,this.Fc|e,c,1+this.je|0)};
m.ka=function(a){for(var b=0;b<this.vb.b.length;)this.vb.b[b].ka(a),b=1+b|0};m.fa=function(){var a=new fn;rl.prototype.Hl.call(a,this.vb);return a};m.ha=f("je");function zo(a,b,c,e){a.Fc=b;a.vb=c;a.je=e;Wd(Xd(),ce(U(),b)===c.b.length);return a}m.od=function(a,b,c){var e=31&(b>>>c|0),g=1<<e;return-1===this.Fc?this.vb.b[31&e].od(a,b,5+c|0):0!==(this.Fc&g)?(e=ce(U(),this.Fc&(-1+g|0)),this.vb.b[e].od(a,b,5+c|0)):!1};
m.uf=function(a,b){if(a===this)return!0;if(tl(a)&&this.je<=a.je){var c=this.Fc,e=this.vb,g=0,h=a.vb,l=a.Fc,q=0;if((c&l)===c){for(;0!==c;){var w=c^c&(-1+c|0),J=l^l&(-1+l|0);if(w===J){if(!e.b[g].uf(h.b[q],5+b|0))return!1;c&=~w;g=1+g|0}l&=~J;q=1+q|0}return!0}}return!1};function tl(a){return!!(a&&a.a&&a.a.p.ej)}
m.a=new t({ej:0},!1,"scala.collection.immutable.HashSet$HashTrieSet",Mn,{ej:1,ge:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,hb:1,g:1,f:1});function Eo(){}Eo.prototype=new Gn;function Fo(){}Fo.prototype=Eo.prototype;
var Go=new t({Yg:0},!1,"scala.collection.immutable.HashSet$LeafHashSet",Mn,{Yg:1,ge:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,hb:1,g:1,f:1});Eo.prototype.a=Go;function Ho(){this.tm=this.xa=null}Ho.prototype=new Dn;Ho.prototype.c=function(){Cn.prototype.c.call(this);Io=this;this.tm=(new Bh).c();return this};Ho.prototype.ne=function(){return Gf()};Ho.prototype.ma=function(){return(new Gh).c()};
Ho.prototype.a=new t({Tn:0},!1,"scala.collection.immutable.List$",En,{Tn:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1,g:1,f:1});var Io=void 0;function xd(){Io||(Io=(new Ho).c());return Io}function Tn(){}Tn.prototype=new xn;Tn.prototype.Ef=function(){return Dh()};Tn.prototype.ma=function(){return(new Ch).c()};Tn.prototype.a=new t({Vn:0},!1,"scala.collection.immutable.ListSet$",yn,{Vn:1,Zf:1,ee:1,yd:1,ra:1,d:1,Oa:1,g:1,f:1});var Sn=void 0;function Jo(){}Jo.prototype=new Rn;
Jo.prototype.a=new t({Xn:0},!1,"scala.collection.immutable.ListSet$EmptyListSet$",Un,{Xn:1,Zg:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,g:1,f:1});var Ko=void 0;function Dh(){Ko||(Ko=(new Jo).c());return Ko}function Lo(){this.Xa=this.oe=null}Lo.prototype=new Rn;m=Lo.prototype;m.pa=f("oe");m.t=k(!1);m.Vg=f("Xa");m.Ee=function(a){return Mo(this,a)?this:Jh(this,a)};
m.ha=function(){var a;a:{a=this;var b=0;for(;;){if(a.t()){a=b;break a}a=a.Vg();b=1+b|0}a=void 0}return a};function Jh(a,b){var c=new Lo;c.oe=b;if(null===a)throw Be(ze(),null);c.Xa=a;return c}m.ub=function(a){return Mo(this,a)};function Mo(a,b){for(;;){if(a.t())return!1;if(S(T(),a.pa(),b))return!0;a=a.Vg()}}m.Ac=function(a){return this.Ee(a)};m.Kj=f("Xa");
m.a=new t({Zn:0},!1,"scala.collection.immutable.ListSet$Node",Un,{Zn:1,Zg:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,g:1,f:1});function No(){}No.prototype=new On;m=No.prototype;m.pa=function(){this.Hg()};m.dd=k("Nil");m.bd=k(0);m.ia=function(a){return kb(a)?a.t():!1};m.t=k(!0);m.cd=function(a){throw(new H).q(""+a);};m.Hg=function(){throw(new ek).q("head of empty list");};
m.na=function(){throw(new Vd).q("tail of empty list");};m.wd=function(){return Fd(this)};m.a=new t({ao:0},!1,"scala.collection.immutable.Nil$",Pn,{ao:1,ag:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,sf:1,xe:1,Va:1,bb:1,$a:1,ce:1,nf:1,ed:1,of:1,f:1,g:1});var Oo=void 0;function Gf(){Oo||(Oo=(new No).c());return Oo}function so(){this.xa=null}so.prototype=new Dn;so.prototype.ma=function(){return(new Gh).c()};
so.prototype.a=new t({co:0},!1,"scala.collection.immutable.Seq$",En,{co:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1});var ro=void 0;function Po(){}Po.prototype=new xn;Po.prototype.Ef=function(){return Xn()};Po.prototype.a=new t({eo:0},!1,"scala.collection.immutable.Set$",yn,{eo:1,Zf:1,ee:1,yd:1,ra:1,d:1,Oa:1});var Qo=void 0;function kk(){Qo||(Qo=(new Po).c());return Qo}function Ro(){this.xa=null}Ro.prototype=new Dn;Ro.prototype.ne=function(){return Ok()};Ro.prototype.ma=function(){return(new kl).c()};
Ro.prototype.a=new t({ko:0},!1,"scala.collection.immutable.Stream$",En,{ko:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1,g:1,f:1});var So=void 0;function Nf(){So||(So=(new Ro).c());return So}function Mk(){this.eg=this.Lj=this.ji=null}Mk.prototype=new co;m=Mk.prototype;m.pa=f("ji");m.dg=function(){return null===this.eg};m.t=k(!1);m.na=function(){this.dg()||this.dg()||(this.Lj=this.eg.Ne(),this.eg=null);return this.Lj};function Lk(a,b,c){a.ji=b;a.eg=c;return a}
m.a=new t({mo:0},!1,"scala.collection.immutable.Stream$Cons",fo,{mo:1,$g:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,sf:1,xe:1,Va:1,bb:1,$a:1,ce:1,nf:1,of:1,g:1,f:1});function To(){}To.prototype=new co;m=To.prototype;m.pa=function(){this.Hg()};m.dg=k(!1);m.t=k(!0);m.Hg=function(){throw(new ek).q("head of empty stream");};m.na=function(){throw(new Vd).q("tail of empty stream");};
m.a=new t({no:0},!1,"scala.collection.immutable.Stream$Empty$",fo,{no:1,$g:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,sf:1,xe:1,Va:1,bb:1,$a:1,ce:1,nf:1,of:1,g:1,f:1});var Uo=void 0;function Ok(){Uo||(Uo=(new To).c());return Uo}function Vo(){}Vo.prototype=new ko;function Wo(){}Wo.prototype=Vo.prototype;Vo.prototype.Ba=function(a){return Y(this,a)};
var Xo=new t({bg:0},!1,"scala.collection.mutable.AbstractBuffer",lo,{bg:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,bh:1,ch:1,Da:1,Ca:1,fe:1,pf:1,Ta:1});Vo.prototype.a=Xo;function Yo(){this.xa=null}Yo.prototype=new Dn;Yo.prototype.ma=function(){return(new Ek).c()};Yo.prototype.a=new t({xo:0},!1,"scala.collection.mutable.ArrayBuffer$",En,{xo:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1,g:1,f:1});
var Zo=void 0;function eh(){Zo||(Zo=(new Yo).c());return Zo}function yc(){this.Oc=0;this.ba=null;this.hd=this.Vb=0;this.Bb=null;this.zd=0}yc.prototype=new ho;m=yc.prototype;m.Wa=function(){return this};m.c=function(){yc.prototype.Rl.call(this,null);return this};m.o=function(a){var b=am(this,a);if(null===b)throw(new ek).q("key not found: "+a);return b.Ja};m.Cb=function(){return this};function $o(a,b){var c=Ud(a,b.kc,b.Xb);null!==c&&(c.Ja=b.Xb);return a}m.Ea=function(a){return $o(this,a)};
m.ka=function(a){for(var b=this.ba,c=$l(this),e=b.b[c];null!==e;){var g=e;a.o((new Cd).Yd(g.nc,g.Ja));for(e=e.vd;null===e&&0<c;)c=-1+c|0,e=b.b[c]}};m.ha=f("Vb");m.la=function(){return this};m.fa=function(){return Kk(new Jk,Zl(this),Vb(function(){return function(a){return(new Cd).Yd(a.nc,a.Ja)}}(this)))};
m.Rl=function(a){this.Oc=750;this.ba=p(x(nb),[ui()]);this.Vb=0;this.hd=vi().lf(this.Oc,ui());this.Bb=null;this.zd=ce(U(),-1+this.ba.b.length|0);null!==a&&(this.Oc=a.rm(),this.ba=a.Uq(),this.Vb=a.zp(),this.hd=a.Ap(),this.zd=a.Vo(),this.Bb=a.Xo());return this};function Td(a,b){var c=am(a,b);return null===c?Nd():(new Md).da(c.Ja)}m.wa=function(a){return $o(this,a)};
m.a=new t({Eo:0},!1,"scala.collection.mutable.HashMap",io,{Eo:1,ij:1,Tg:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Wi:1,Ug:1,Vi:1,Xi:1,Aa:1,w:1,Ta:1,No:1,cb:1,db:1,ab:1,Oo:1,Ia:1,Da:1,Ca:1,fe:1,jb:1,Sa:1,Qa:1,Kq:1,Lq:1,hb:1,g:1,f:1});function Ih(){this.Oc=0;this.ba=null;this.hd=this.Vb=0;this.Bb=null;this.zd=0}Ih.prototype=new no;m=Ih.prototype;m.Wa=function(){return this};m.c=function(){Ih.prototype.Ql.call(this,null);return this};
m.o=function(a){return null!==Lh(this,a)};m.Cb=function(){return this};m.Ea=function(a){return Nh(this,a)};m.pb=function(){ap||(ap=(new bp).c());return ap};m.ka=function(a){for(var b=0,c=this.ba.b.length;b<c;){var e=this.ba.b[b];null!==e&&a.o(e===qi()?null:e);b=1+b|0}};m.ha=f("Vb");m.la=function(){return this};m.fa=function(){return Vl(this)};
m.Ql=function(a){this.Oc=450;this.ba=p(x(v),[wi(vi(),32)]);this.Vb=0;this.hd=ni().lf(this.Oc,wi(vi(),32));this.Bb=null;this.zd=ce(U(),-1+this.ba.b.length|0);null!==a&&(this.Oc=a.rm(),this.ba=a.Tq(),this.Vb=a.zp(),this.hd=a.Ap(),this.zd=a.Vo(),this.Bb=a.Xo());return this};m.wa=function(a){return Nh(this,a)};m.Ac=function(a){var b=(new Ih).c();return Nh(Y(b,this),a)};function Nh(a,b){var c=null===b?qi():b;Xl(a,c);return a}
m.a=new t({Fo:0},!1,"scala.collection.mutable.HashSet",oo,{Fo:1,jj:1,ah:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,cb:1,db:1,ab:1,Po:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,Ro:1,pf:1,Ia:1,Da:1,Ca:1,fe:1,jb:1,Sa:1,Qa:1,Iq:1,Jq:1,hb:1,g:1,f:1});function bp(){}bp.prototype=new An;bp.prototype.ne=function(){return(new Ih).c()};bp.prototype.a=new t({Go:0},!1,"scala.collection.mutable.HashSet$",Bn,{Go:1,cj:1,ee:1,yd:1,ra:1,d:1,Oa:1,g:1,f:1});var ap=void 0;
function cp(){this.xa=null}cp.prototype=new Dn;cp.prototype.ma=function(){return(new Ek).c()};cp.prototype.a=new t({Jo:0},!1,"scala.collection.mutable.IndexedSeq$",En,{Jo:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1});var dp=void 0;function ep(){dp||(dp=(new cp).c());return dp}function fp(){this.xa=null}fp.prototype=new Dn;fp.prototype.ma=function(){return si(new ri,(new Gh).c())};fp.prototype.a=new t({Lo:0},!1,"scala.collection.mutable.ListBuffer$",En,{Lo:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1,g:1,f:1});
var gp=void 0;function We(){this.Rb=null}We.prototype=new ko;m=We.prototype;m.Wa=function(){return this};m.c=function(){We.prototype.Kl.call(this,16,"");return this};m.Ua=function(a){a=65535&(this.Rb.lb.charCodeAt(a)|0);return(new Nc).Xc(a)};m.td=function(a){return this.l()-a|0};m.o=function(a){a=65535&(this.Rb.lb.charCodeAt(a|0)|0);return(new Nc).Xc(a)};m.fd=function(a){return Hk(this,a)};m.t=function(){return 0===this.l()};m.Cb=function(){return this};
m.kh=function(a,b){return this.Rb.lb.substring(a,b)};m.Ea=function(a){a=tj(T(),a);oe(this.Rb,a);return this};m.v=function(){return this.Rb.lb};m.pb=function(){return ep()};m.ka=function(a){Ik(this,a)};m.zc=function(){return Dk(this)};m.la=function(){return this.Rb.lb};function Xk(a,b){le(a.Rb,b);return a}m.tf=function(){return this};m.fa=function(){return Ck(new Bk,this,this.Rb.lb.length|0)};m.jc=function(a,b){Kh(this,a,b)};
m.Kl=function(a,b){We.prototype.Nl.call(this,le((new ke).aa((b.length|0)+a|0),b));return this};m.Ad=function(){return this};m.kf=function(){return this.Rb.lb};m.l=function(){return this.Rb.lb.length|0};m.Nl=function(a){this.Rb=a;return this};function Yk(a,b){le(a.Rb,aj(za(),b));return a}m.wa=function(a){a=tj(T(),a);oe(this.Rb,a);return this};m.Gc=function(a,b,c){Gk(this,a,b,c)};m.sa=aa();m.ta=function(){return sk(Ug(),this)};m.vg=function(a){return 65535&(this.Rb.lb.charCodeAt(a)|0)};
m.ma=function(){return si(new ri,(new We).c())};m.Ba=function(a){return Y(this,a)};m.a=new t({So:0},!1,"scala.collection.mutable.StringBuilder",lo,{So:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,Pf:1,hc:1,Pb:1,Qb:1,ic:1,Hq:1,cc:1,yq:1,Ra:1,Ia:1,Da:1,Ca:1,g:1,f:1});function hp(){}hp.prototype=new ko;function ip(){}m=ip.prototype=hp.prototype;m.Wa=function(){return this};
m.td=function(a){return this.l()-a|0};m.fd=function(a){return Hk(this,a)};m.Cb=function(){return this};m.t=function(){return 0===this.l()};m.pb=function(){return ep()};m.ka=function(a){Ik(this,a)};m.zc=function(){return Dk(this)};m.tf=function(){return this};m.fa=function(){return Ck(new Bk,this,this.l())};m.Ad=function(){return this};m.Gc=function(a,b,c){Gk(this,a,b,c)};m.ta=function(){return sk(Ug(),this)};m.ma=function(){return(new Fi).Zd(this.Jc())};m.yc=k("WrappedArray");
var jp=new t({xc:0},!1,"scala.collection.mutable.WrappedArray",lo,{xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1});hp.prototype.a=jp;function kp(){this.xa=null}kp.prototype=new Dn;kp.prototype.ma=function(){return(new G).c()};kp.prototype.a=new t({$o:0},!1,"scala.scalajs.js.WrappedArray$",En,{$o:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1});var lp=void 0;
function mp(){this.qg=this.xa=null}mp.prototype=new vo;mp.prototype.c=function(){uo.prototype.c.call(this);np=this;this.qg=(new Ak).c();return this};mp.prototype.ma=function(){fd();hd();return(new id).c()};mp.prototype.a=new t({wn:0},!1,"scala.collection.IndexedSeq$",wo,{wn:1,$f:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1});var np=void 0;function gd(){np||(np=(new mp).c());return np}function op(){this.qd=null;this.$b=0}op.prototype=new Fo;m=op.prototype;
m.vf=function(a,b,c){if(b===this.$b&&S(T(),a,this.qd))return this;if(b!==this.$b)return yo(Kn(),this.$b,this,b,Hn(a,b),c);var e=Dh();c=new pp;a=Jh(e,this.qd).Ee(a);c.$b=b;c.rd=a;return c};function Hn(a,b){var c=new op;c.qd=a;c.$b=b;return c}m.ka=function(a){a.o(this.qd)};m.fa=function(){Ff();var a=(new G).ca([this.qd]);return Ck(new Bk,a,a.i.length|0)};m.ha=k(1);m.od=function(a,b){return b===this.$b&&S(T(),a,this.qd)};m.uf=function(a,b){return a.od(this.qd,this.$b,b)};
m.a=new t({dj:0},!1,"scala.collection.immutable.HashSet$HashSet1",Go,{dj:1,Yg:1,ge:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,hb:1,g:1,f:1});function pp(){this.$b=0;this.rd=null}pp.prototype=new Fo;m=pp.prototype;m.vf=function(a,b,c){b===this.$b?(c=new pp,a=this.rd.Ee(a),c.$b=b,c.rd=a,b=c):b=yo(Kn(),this.$b,this,b,Hn(a,b),c);return b};m.ka=function(a){var b=(new jl).se(this.rd);dh(b,a)};m.fa=function(){return(new jl).se(this.rd)};
m.ha=function(){return this.rd.ha()};m.od=function(a,b){return b===this.$b&&this.rd.ub(a)};m.uf=function(a,b){for(var c=(new jl).se(this.rd),e=!0;;)if(e&&!c.ke.t())e=c.ga(),e=a.od(e,this.$b,b);else break;return e};m.a=new t({Pn:0},!1,"scala.collection.immutable.HashSet$HashSetCollision1",Go,{Pn:1,Yg:1,ge:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Hb:1,w:1,xb:1,Gb:1,Jb:1,Ib:1,Ta:1,gc:1,Va:1,bb:1,$a:1,hb:1,g:1,f:1});function qp(){this.xa=null}qp.prototype=new vo;
qp.prototype.ma=function(){hd();return(new id).c()};qp.prototype.a=new t({Rn:0},!1,"scala.collection.immutable.IndexedSeq$",wo,{Rn:1,$f:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1});var rp=void 0;function fd(){rp||(rp=(new qp).c())}function sp(){this.og=this.xa=null;this.fq=this.Jp=0}sp.prototype=new vo;sp.prototype.c=function(){uo.prototype.c.call(this);tp=this;this.og=(new Rh).Y(0,0,0);return this};sp.prototype.ne=f("og");sp.prototype.ma=function(){return(new id).c()};
sp.prototype.a=new t({to:0},!1,"scala.collection.immutable.Vector$",wo,{to:1,$f:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Oa:1,g:1,f:1});var tp=void 0;function hd(){tp||(tp=(new sp).c());return tp}function Ek(){this.oi=0;this.i=null;this.Ab=0}Ek.prototype=new Wo;m=Ek.prototype;m.Wa=function(){return this};m.c=function(){Ek.prototype.aa.call(this,16);return this};function up(a,b){fm(a,1+a.Ab|0);a.i.b[a.Ab]=b;a.Ab=1+a.Ab|0;return a}m.Ua=function(a){return gm(this,a)};m.td=function(a){return this.l()-a|0};
m.o=function(a){return gm(this,a|0)};m.fd=function(a){return Hk(this,a)};m.t=function(){return 0===this.l()};m.Cb=function(){return this};m.Ea=function(a){return up(this,a)};m.pb=function(){return eh()};m.ka=function(a){for(var b=0,c=this.Ab;b<c;)a.o(this.i.b[b]),b=1+b|0};m.zc=function(){return Dk(this)};m.la=function(){return this};m.tf=function(){return this};m.fa=function(){return Ck(new Bk,this,this.Ab)};m.aa=function(a){a=this.oi=a;this.i=p(x(v),[1<a?a:1]);this.Ab=0;return this};
m.jc=function(a,b){Kh(this,a,b)};m.Ad=function(){return this};m.l=f("Ab");function Fk(a,b){if(lb(b)){var c=b.l();fm(a,a.Ab+c|0);b.Gc(a.i,a.Ab,c);a.Ab=a.Ab+c|0;return a}return Y(a,b)}m.wa=function(a){return up(this,a)};m.Gc=function(a,b,c){var e=ch(I(),a)-b|0;c=c<e?c:e;e=this.Ab;c=c<e?c:e;$(N(),this.i,0,a,b,c)};m.ta=function(){return sk(Ug(),this)};m.sa=function(a){a>this.Ab&&1<=a&&(a=p(x(v),[a]),Ka(this.i,0,a,0,this.Ab),this.i=a)};m.Ba=function(a){return Fk(this,a)};m.yc=k("ArrayBuffer");
m.a=new t({wo:0},!1,"scala.collection.mutable.ArrayBuffer",Xo,{wo:1,bg:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,bh:1,ch:1,Da:1,Ca:1,fe:1,pf:1,Ta:1,oc:1,ic:1,Qb:1,cc:1,Ia:1,Mq:1,hc:1,Pb:1,hb:1,g:1,f:1});function Gh(){this.$d=this.va=null;this.Gf=!1;this.sd=0}Gh.prototype=new Wo;m=Gh.prototype;m.xg=function(a,b){this.va.Gc(a,b,ch(I(),a)-b|0)};
m.c=function(){this.va=Gf();this.Gf=!1;this.sd=0;return this};m.Ua=function(a){if(0>a||a>=this.sd)throw(new H).q(""+a);return Qk(this.va,a)};m.td=function(a){return 0>a?1:Rk(this.va,a)};m.fd=function(a){return Sk(this.va,a)};m.o=function(a){return this.Ua(a|0)};m.t=function(){return this.va.t()};m.Cb=function(){return this};m.ia=function(a){return a&&a.a&&a.a.p.wj?this.va.ia(a.va):kb(a)?this.fd(a):!1};m.te=function(a,b,c){return gh(this.va,a,b,c)};m.Og=function(a){return gh(this.va,"",a,"")};
m.Ea=function(a){return Mh(this,a)};m.pb=function(){gp||(gp=(new fp).c());return gp};m.ka=function(a){for(var b=this.va;!b.t();)a.o(b.pa()),b=b.na()};m.zc=function(){var a=this.va,b=eh().xa;return nh(a,b)};m.ha=f("sd");m.la=function(){this.Gf=!this.va.t();return this.va};m.fa=function(){var a=new em;a.Ze=this.va.t()?Gf():this.va;return a};m.jc=function(a,b){Kh(this,a,b)};m.kf=function(){return gh(this.va,"","","")};m.l=f("sd");m.Ad=function(){return this};m.Wb=function(){return this.va.Wb()};
m.Me=function(a,b,c,e){return ih(this.va,a,b,c,e)};function Mh(a,b){if(a.Gf&&!a.va.t()){var c=a.va,e=a.$d.Ce;a.va=Gf();a.$d=null;a.Gf=!1;for(a.sd=0;c!==e;)Mh(a,c.pa()),c=c.na()}a.va.t()?(a.$d=Mj(new Nj,b,Gf()),a.va=a.$d):(c=a.$d,a.$d=Mj(new Nj,b,Gf()),c.Ce=a.$d);a.sd=1+a.sd|0;return a}m.wa=function(a){return Mh(this,a)};m.sa=aa();m.Gc=function(a,b,c){xk(this.va,a,b,c)};m.Mj=function(a){return ld(this.va,a)};
function Fh(a,b){a:for(;;){var c=b;if(null!==c&&c===a){var e=a,c=a.sd,g=e.ma();if(!(0>=c)){g.jc(c,e);for(var h=0,e=e.fa();h<c&&e.ja();)g.wa(e.ga()),h=1+h|0}b=g.la();continue a}return Y(a,b)}}m.Ba=function(a){return Fh(this,a)};m.yc=k("ListBuffer");
m.a=new t({wj:0},!1,"scala.collection.mutable.ListBuffer",Xo,{wj:1,bg:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,bh:1,ch:1,Da:1,Ca:1,fe:1,pf:1,Ta:1,Ia:1,Dq:1,Cq:1,Eq:1,f:1});function Qi(){this.i=null}Qi.prototype=new ip;m=Qi.prototype;m.Ua=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Nc=function(a,b){this.i.b[a]=!!b};m.l=function(){return this.i.b.length};m.Jc=function(){return O().Pc};
m.a=new t({xj:0},!1,"scala.collection.mutable.WrappedArray$ofBoolean",jp,{xj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function Ji(){this.i=null}Ji.prototype=new ip;m=Ji.prototype;m.Ua=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Nc=function(a,b){this.i.b[a]=b|0};m.l=function(){return this.i.b.length};
m.Jc=function(){return O().kb};m.a=new t({yj:0},!1,"scala.collection.mutable.WrappedArray$ofByte",jp,{yj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function Li(){this.i=null}Li.prototype=new ip;m=Li.prototype;m.Ua=function(a){return(new Nc).Xc(this.i.b[a])};m.o=function(a){return(new Nc).Xc(this.i.b[a|0])};
m.Nc=function(a,b){var c=tj(T(),b);this.i.b[a]=c};m.l=function(){return this.i.b.length};m.Jc=function(){return O().Bc};m.a=new t({zj:0},!1,"scala.collection.mutable.WrappedArray$ofChar",jp,{zj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function Pi(){this.i=null}Pi.prototype=new ip;m=Pi.prototype;m.Ua=function(a){return this.i.b[a]};
m.o=function(a){return this.i.b[a|0]};m.Nc=function(a,b){this.i.b[a]=+b};m.l=function(){return this.i.b.length};m.Jc=function(){return O().Qc};m.a=new t({Aj:0},!1,"scala.collection.mutable.WrappedArray$ofDouble",jp,{Aj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function Oi(){this.i=null}Oi.prototype=new ip;m=Oi.prototype;m.Ua=function(a){return this.i.b[a]};
m.o=function(a){return this.i.b[a|0]};m.Nc=function(a,b){var c=na(b);this.i.b[a]=c};m.l=function(){return this.i.b.length};m.Jc=function(){return O().Rc};m.a=new t({Bj:0},!1,"scala.collection.mutable.WrappedArray$ofFloat",jp,{Bj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function Mi(){this.i=null}Mi.prototype=new ip;m=Mi.prototype;
m.Ua=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Nc=function(a,b){this.i.b[a]=b|0};m.l=function(){return this.i.b.length};m.Jc=function(){return O().qc};m.a=new t({Cj:0},!1,"scala.collection.mutable.WrappedArray$ofInt",jp,{Cj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function Ni(){this.i=null}
Ni.prototype=new ip;m=Ni.prototype;m.Ua=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Nc=function(a,b){var c=Na(b);this.i.b[a]=c};m.l=function(){return this.i.b.length};m.Jc=function(){return O().Sc};
m.a=new t({Dj:0},!1,"scala.collection.mutable.WrappedArray$ofLong",jp,{Dj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function zd(){this.ci=this.i=null;this.ug=!1}zd.prototype=new ip;m=zd.prototype;m.o=function(a){return this.Ua(a|0)};m.Ua=function(a){return this.i.b[a]};m.Nc=function(a,b){this.i.b[a]=b};
function yd(a,b){a.i=b;return a}m.l=function(){return this.i.b.length};m.Jc=function(){this.ug||this.ug||(this.ci=od(O(),Ii(I(),ia(this.i))),this.ug=!0);return this.ci};m.a=new t({Ej:0},!1,"scala.collection.mutable.WrappedArray$ofRef",jp,{Ej:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function Ki(){this.i=null}Ki.prototype=new ip;m=Ki.prototype;
m.Ua=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Nc=function(a,b){this.i.b[a]=b|0};m.l=function(){return this.i.b.length};m.Jc=function(){return O().Uc};m.a=new t({Fj:0},!1,"scala.collection.mutable.WrappedArray$ofShort",jp,{Fj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});function Ri(){this.i=null}
Ri.prototype=new ip;m=Ri.prototype;m.Ua=function(a){this.i.b[a]};m.o=function(a){this.i.b[a|0]};m.Nc=function(a,b){this.i.b[a]=b};m.l=function(){return this.i.b.length};m.Jc=function(){return O().Vc};m.a=new t({Gj:0},!1,"scala.collection.mutable.WrappedArray$ofUnit",jp,{Gj:1,xc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,hb:1,g:1,f:1});
function G(){this.i=null}G.prototype=new Wo;m=G.prototype;m.Wa=function(){return this};m.c=function(){G.prototype.ca.call(this,[]);return this};m.Ua=function(a){return this.i[a]};m.td=function(a){return this.l()-a|0};m.o=function(a){return this.i[a|0]};m.fd=function(a){return Hk(this,a)};m.t=function(){return 0===this.l()};m.Cb=function(){return this};m.Ea=function(a){this.i.push(a);return this};m.pb=function(){lp||(lp=(new kp).c());return lp};m.ka=function(a){Ik(this,a)};m.zc=function(){return Dk(this)};
m.la=function(){return this};m.tf=function(){return this};m.fa=function(){return Ck(new Bk,this,this.i.length|0)};m.jc=function(a,b){Kh(this,a,b)};m.l=function(){return this.i.length|0};m.Ad=function(){return this};m.wa=function(a){this.i.push(a);return this};m.ta=function(){return sk(Ug(),this)};m.Gc=function(a,b,c){Gk(this,a,b,c)};m.sa=aa();m.ca=function(a){this.i=a;return this};m.yc=k("WrappedArray");
m.a=new t({Zo:0},!1,"scala.scalajs.js.WrappedArray",Xo,{Zo:1,bg:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,s:1,r:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ma:1,Aa:1,w:1,Ha:1,La:1,Na:1,Kb:1,cb:1,db:1,ab:1,Lb:1,jb:1,Sa:1,Qa:1,bh:1,ch:1,Da:1,Ca:1,fe:1,pf:1,Ta:1,hc:1,Pb:1,Qb:1,ic:1,wc:1,oc:1,cc:1,Ia:1});}).call(this);
//# sourceMappingURL=parolamea-opt.js.map
