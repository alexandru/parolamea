
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
var da=0;function ea(a){return function(b,c){return!(!b||!b.a||b.a.Qe!==c||b.a.Oe!==a)}}function fa(a){var b,c;for(c in a)b=c;return b}function p(a,b){return ga(a,b,0)}function ga(a,b,c){var e=new a.wg(b[c]);if(c<b.length-1){a=a.Xe;c+=1;for(var g=e.b,h=0;h<g.length;h++)g[h]=ga(a,b,c)}return e}function ha(a){return void 0===a?"undefined":a.toString()}
function ia(a){switch(typeof a){case "string":return r(ja);case "number":var b=a|0;return b===a?b<<24>>24===b&&1/b!==1/-0?r(ka):b<<16>>16===b&&1/b!==1/-0?r(la):r(ma):a!==a||na(a)===a?r(oa):r(pa);case "boolean":return r(qa);case "undefined":return r(ra);default:if(null===a)throw(new ta).c();return ua(a)?r(va):a&&a.a?r(a.a):null}}function wa(a,b){return a&&a.a||null===a?a.ia(b):"number"===typeof a?"number"===typeof b&&(a===b?0!==a||1/a===1/b:a!==a&&b!==b):a===b}
function xa(a){switch(typeof a){case "string":return ya(za(),a);case "number":return Aa(Ba(),a);case "boolean":return a?1231:1237;case "undefined":return 0;default:return a&&a.a||null===a?a.sa():42}}function Ca(a,b){switch(typeof a){case "string":return a===b?0:a<b?-1:1;case "number":return Da||(Da=(new Ea).c()),Fa(a,b);case "boolean":return a-b;default:return Ga(a,b)?0:Ha(a,b)?1:-1}}function Ia(a,b){return"string"===typeof a?a.charCodeAt(b)&65535:a.vg(b)}
function Ja(a,b,c){return"string"===typeof a?a.substring(b,c):a.kh(b,c)}function La(a,b,c,e,g){a=a.b;c=c.b;if(a!==c||e<b||b+g<e)for(var h=0;h<g;h++)c[e+h]=a[b+h];else for(h=g-1;0<=h;h--)c[e+h]=a[b+h]}function Ma(a){if(a&&a.a){var b=a.$idHashCode$0;void 0===b&&(da=b=da+1|0,a.$idHashCode$0=b);return b}return null===a?0:xa(a)}function Na(a){return null===a?s().tb:a}this.__ScalaJSExportsNamespace=ca;
function Pa(a,b,c){this.Tf=this.wg=void 0;this.p={};this.Xe=null;this.ph=a;this.sg=b;this.Je=this.Ke=void 0;this.sc=k(!1);this.name=c;this.isPrimitive=!0;this.isArrayClass=this.isInterface=!1;this.isInstance=k(!1)}
function t(a,b,c,e,g,h,l){var q=fa(a);h=h||function(a){return!!(a&&a.a&&a.a.p[q])};l=l||function(a,b){return!!(a&&a.a&&a.a.Qe===b&&a.a.Oe.p[q])};this.wg=void 0;this.Tf=e;this.p=g;this.ph=this.Xe=null;this.sg="L"+c+";";this.Je=this.Ke=void 0;this.sc=l;this.name=c;this.isPrimitive=!1;this.isInterface=b;this.isArrayClass=!1;this.isInstance=h}
function Qa(a){function b(a){if("number"===typeof a){this.b=Array(a);for(var b=0;b<a;b++)this.b[b]=c}else this.b=a}var c=a.ph;"longZero"==c&&(c=s().tb);b.prototype=new u;b.prototype.a=this;var e="["+a.sg,g=a.Oe||a,h=(a.Qe||0)+1;this.wg=b;this.Tf=v;this.p={d:1};this.Xe=a;this.Oe=g;this.Qe=h;this.ph=null;this.sg=e;this.sc=this.Je=this.Ke=void 0;this.name=e;this.isInterface=this.isPrimitive=!1;this.isArrayClass=!0;this.isInstance=function(a){return g.sc(a,h)}}
function r(a){if(!a.Ke){var b=new Ra;b.lc=a;a.Ke=b}return a.Ke}function y(a){a.Je||(a.Je=new Qa(a));return a.Je}t.prototype.getFakeInstance=function(){return this===ja?"some string":this===qa?!1:this===ka||this===la||this===ma||this===oa||this===pa?0:this===va?s().tb:this===ra?void 0:{a:this}};t.prototype.getSuperclass=function(){return this.Tf?r(this.Tf):null};t.prototype.getComponentType=function(){return this.Xe?r(this.Xe):null};
t.prototype.newArrayOfThisClass=function(a){for(var b=this,c=0;c<a.length;c++)b=y(b);return p(b,a)};Pa.prototype=t.prototype;Qa.prototype=t.prototype;var Sa=new Pa(void 0,"V","void"),Ta=new Pa(!1,"Z","boolean"),Ua=new Pa(0,"C","char"),z=new Pa(0,"B","byte"),Va=new Pa(0,"S","short"),A=new Pa(0,"I","int"),Wa=new Pa("longZero","J","long"),Xa=new Pa(0,"F","float"),Ya=new Pa(0,"D","double"),Za=ea(Ta);Ta.sc=Za;var $a=ea(Ua);Ua.sc=$a;var ab=ea(z);z.sc=ab;var bb=ea(Va);Va.sc=bb;var cb=ea(A);A.sc=cb;
var db=ea(Wa);Wa.sc=db;var eb=ea(Xa);Xa.sc=eb;var fb=ea(Ya);Ya.sc=fb;var B=n.Math.imul||function(a,b){var c=a&65535,e=b&65535;return c*e+((a>>>16&65535)*e+c*(b>>>16&65535)<<16>>>0)|0},na=n.Math.fround||function(a){return+a};function gb(){}function u(){}u.prototype=gb.prototype;gb.prototype.c=function(){return this};gb.prototype.ia=function(a){return this===a};gb.prototype.v=function(){var a=hb(ia(this)),b=(+(this.sa()>>>0)).toString(16);return a+"@"+b};gb.prototype.sa=function(){return Ma(this)};gb.prototype.toString=function(){return this.v()};function jb(a,b){var c=a&&a.a;if(c){var e=c.Qe||0;return!(e<b)&&(e>b||!c.Oe.isPrimitive)}return!1}
var v=new t({d:0},!1,"java.lang.Object",null,{d:1},function(a){return null!==a},jb);gb.prototype.a=v;function kb(a){return!!(a&&a.a&&a.a.p.Ha)}function lb(a){return!!(a&&a.a&&a.a.p.Qb)}var mb=new t({Ua:0},!0,"scala.collection.immutable.Iterable",void 0,{Ua:1,d:1,$a:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,Ya:1,R:1,P:1,Q:1,U:1,m:1}),nb=new t({sj:0},!0,"scala.collection.mutable.HashEntry",void 0,{sj:1,d:1});function ob(){}ob.prototype=new u;function pb(){}pb.prototype=ob.prototype;
var qb=new t({He:0},!1,"java.io.OutputStream",v,{He:1,d:1,xf:1,yf:1});ob.prototype.a=qb;function rb(){this.Hd=this.k=this.W=this.Gd=0}rb.prototype=new u;function sb(){}sb.prototype=rb.prototype;function D(a,b){if(0>b||b>a.W)throw(new F).c();a.k=b;a.Hd>b&&(a.Hd=-1)}rb.prototype.v=function(){return tb(ub((new G).ca(["","[pos\x3d"," lim\x3d"," cap\x3d","]"])),(new G).ca([hb(ia(this)),this.k,this.W,this.Gd]))};function vb(a,b){if(0>b||b>a.Gd)throw(new F).c();a.W=b;a.k>b&&(a.k=b,a.Hd>b&&(a.Hd=-1))}
rb.prototype.aa=function(a){this.W=this.Gd=a;this.k=0;this.Hd=-1;return this};var wb=new t({Ie:0},!1,"java.nio.Buffer",v,{Ie:1,d:1});rb.prototype.a=wb;function xb(){this.Gp=0}xb.prototype=new u;function yb(a,b){var c=p(y(z),[b]),e=c.b.length;zb||(zb=(new Ab).c());var g=c.b.length;if(0>g||(0+g|0)>c.b.length)throw(new H).c();var h=0+e|0;if(0>e||h>g)throw(new H).c();e=new Bb;e.Ge=!1;Cb.prototype.Gl.call(e,g,c,0);D(e,0);vb(e,h);return e}xb.prototype.a=new t({hk:0},!1,"java.nio.ByteBuffer$",v,{hk:1,d:1});
var Db=void 0;function Eb(){Db||(Db=(new xb).c());return Db}function Gb(){this.Kc=null}Gb.prototype=new u;Gb.prototype.v=f("Kc");Gb.prototype.s=function(a){this.Kc=a;return this};Gb.prototype.a=new t({ik:0},!1,"java.nio.ByteOrder",v,{ik:1,d:1});function Hb(){this.ek=this.th=null}Hb.prototype=new u;Hb.prototype.c=function(){Ib=this;this.th=(new Gb).s("BIG_ENDIAN");this.ek=(new Gb).s("LITTLE_ENDIAN");return this};Hb.prototype.a=new t({jk:0},!1,"java.nio.ByteOrder$",v,{jk:1,d:1});var Ib=void 0;
function Ab(){}Ab.prototype=new u;Ab.prototype.a=new t({lk:0},!1,"java.nio.HeapByteBuffer$",v,{lk:1,d:1});var zb=void 0;function Jb(){}Jb.prototype=new u;Jb.prototype.a=new t({ok:0},!1,"java.nio.StringCharBuffer$",v,{ok:1,d:1});var Kb=void 0;function Lb(){this.Ih=this.iq=this.We=null;this.cb=0}Lb.prototype=new u;function Mb(){}Mb.prototype=Lb.prototype;Lb.prototype.Jg=function(a){this.We=a;return this};Lb.prototype.ia=function(a){return a&&a.a&&a.a.p.Bc?this.We===a.We:!1};Lb.prototype.v=f("We");
Lb.prototype.sa=function(){return Nb(I(),this.We)};var Ob=new t({Bc:0},!1,"java.nio.charset.Charset",v,{Bc:1,d:1,Qa:1});Lb.prototype.a=Ob;function Pb(){this.ig=null;this.cb=!1}Pb.prototype=new u;
function Qb(a){if(!a.cb){var b;Rb||(Rb=(new Sb).c());b={};Tb(Ub(),(new G).ca("iso-8859-1 iso8859-1 iso_8859_1 iso8859_1 iso_8859-1 8859_1 iso_8859-1:1987 latin1 csisolatin1 l1 ibm-819 ibm819 cp819 819 iso-ir-100".split(" "))).ka(Vb(function(a,b){return function(a){Wb||(Wb=(new Xb).c());b[a]=Wb}}(a,b)));Tb(Ub(),(new G).ca("us-ascii ascii7 ascii csascii default cp367 ibm367 iso646-us 646 iso_646.irv:1983 iso_646.irv:1991 ansi_x3.4-1986 ansi_x3.4-1968 iso-ir-6".split(" "))).ka(Vb(function(a,b){return function(a){Yb||
(Yb=(new Zb).c());b[a]=Yb}}(a,b)));Tb(Ub(),(new G).ca(["utf-8","utf_8","utf8","unicode-1-1-utf-8"])).ka(Vb(function(a,b){return function(a){b[a]=$b()}}(a,b)));Tb(Ub(),(new G).ca(["utf-16be","utf_16be","x-utf-16be","iso-10646-ucs-2","unicodebigunmarked"])).ka(Vb(function(a,b){return function(a){ac||(ac=(new bc).c());b[a]=ac}}(a,b)));Tb(Ub(),(new G).ca(["utf-16le","utf_16le","x-utf-16le","unicodelittleunmarked"])).ka(Vb(function(a,b){return function(a){cc||(cc=(new dc).c());b[a]=cc}}(a,b)));Tb(Ub(),
(new G).ca(["utf-16","utf_16","unicode","unicodebig"])).ka(Vb(function(a,b){return function(a){ec||(ec=(new fc).c());b[a]=ec}}(a,b)));a.ig=b;a.cb=!0}return a.ig}Pb.prototype.a=new t({pk:0},!1,"java.nio.charset.Charset$",v,{pk:1,d:1});var gc=void 0;function hc(){this.ll=null;this.Tj=this.rh=0;this.hg=this.fg=this.gg=null;this.Ae=0}hc.prototype=new u;function ic(){}ic.prototype=hc.prototype;
function jc(a){if(0===a.Gd)return yb(Eb(),1);var b=yb(Eb(),B(2,a.Gd));a.Hd=-1;a.W=a.k;a.k=0;if(a===b)throw(new F).c();if(b.Ge)throw(new kc).c();if((a.W-a.k|0)>(b.W-b.k|0))throw(new lc).c();var c=a.W-a.k|0;if(null!==a.pc){var e=a.k;mc(b,a.pc,a.Fd+e|0,c);D(a,e+c|0)}else for(;0!==c;)K(b,nc(a)),c=-1+c|0;return b}hc.prototype.mi=function(a,b){hc.prototype.ni.call(this,a,b,b,oc());return this};
hc.prototype.ni=function(a,b,c,e){this.ll=a;this.rh=b;this.Tj=c;this.gg=e;this.fg=pc().Cf;this.hg=pc().Cf;this.Ae=0;return this};hc.prototype.li=aa();var qc=new t({Af:0},!1,"java.nio.charset.CharsetEncoder",v,{Af:1,d:1});hc.prototype.a=qc;function rc(){this.hf=this.tc=0}rc.prototype=new u;rc.prototype.ac=function(a,b){this.tc=a;this.hf=b;return this};
function sc(a){var b=a.tc;switch(b){case 1:throw(new lc).c();case 0:throw(new tc).c();case 2:throw(new uc).aa(a.hf);case 3:throw(new vc).aa(a.hf);default:throw(new L).da(b);}}rc.prototype.a=new t({rk:0},!1,"java.nio.charset.CoderResult",v,{rk:1,d:1});function wc(){this.fq=this.Op=this.Rp=this.eq=0;this.Ap=this.Sl=this.Rl=this.vi=this.ui=this.Nj=this.ti=this.si=this.ri=this.pd=this.Dc=this.Cc=null}wc.prototype=new u;
wc.prototype.c=function(){xc=this;this.Cc=(new rc).ac(1,-1);this.Dc=(new rc).ac(0,-1);this.pd=(new rc).ac(2,1);this.ri=(new rc).ac(2,2);this.si=(new rc).ac(2,3);this.ti=(new rc).ac(2,4);this.Nj=(new yc).c();this.ui=(new rc).ac(3,1);this.vi=(new rc).ac(3,2);this.Rl=(new rc).ac(3,3);this.Sl=(new rc).ac(3,4);this.Ap=(new yc).c();return this};wc.prototype.a=new t({sk:0},!1,"java.nio.charset.CoderResult$",v,{sk:1,d:1});var xc=void 0;function M(){xc||(xc=(new wc).c());return xc}
function zc(){this.Kc=null}zc.prototype=new u;zc.prototype.v=f("Kc");zc.prototype.s=function(a){this.Kc=a;return this};zc.prototype.a=new t({tk:0},!1,"java.nio.charset.CodingErrorAction",v,{tk:1,d:1});function Ac(){this.Cf=this.Bf=this.wh=null}Ac.prototype=new u;Ac.prototype.c=function(){Bc=this;this.wh=(new zc).s("IGNORE");this.Bf=(new zc).s("REPLACE");this.Cf=(new zc).s("REPORT");return this};Ac.prototype.a=new t({uk:0},!1,"java.nio.charset.CodingErrorAction$",v,{uk:1,d:1});var Bc=void 0;
function pc(){Bc||(Bc=(new Ac).c());return Bc}function Cc(){this.Uq=null;this.mq=!1;this.cb=0}Cc.prototype=new u;Cc.prototype.c=function(){Dc=this;return this};function Ec(){Fc()(function(a){return function(){return a.Me()}}((new Gc).c()))}Cc.prototype.main=function(){Ec()};Cc.prototype.a=new t({yk:0},!1,"parolamea.ParolaMea$",v,{yk:1,d:1,Nq:1,Ip:1});var Dc=void 0;function Hc(){Dc||(Dc=(new Cc).c());return Dc}ca.parolamea=ca.parolamea||{};ca.parolamea.ParolaMea=Hc;
function Ic(){this.Kc=null;this.qc=this.Lf=0;this.Nd=s().tb;this.Se=null}Ic.prototype=new u;function Jc(){}m=Jc.prototype=Ic.prototype;m.Kl=function(a,b,c){this.Kc=a;this.Lf=b;this.qc=c;this.Nd=s().tb;this.Se=p(y(z),[c]);Kc(this);return this};m.ue=function(){this.Nd=s().tb;for(var a=0;a<this.qc;)a=1+a|0,this.Se.b[-1+a|0]=0;Kc(this)};
function Lc(a,b,c){var e;e=(new N).aa(a.qc);e=Mc(a.Nd,e)[1];e=P(e);a.Nd=Nc(a.Nd,(new N).aa(c));var g=a.qc-e|0,h=0;if(c>=g){La(b,0,a.Se,e,g);Oc(a,a.Se,0);for(h=g;(-1+(h+a.qc|0)|0)<c;)Oc(a,b,0+h|0),h=h+a.qc|0;e=0}h<c&&La(b,0+h|0,a.Se,e,c-h|0)}
m.$e=function(){var a;a=(new N).aa(Pc().Qg);a=Mc(this.Nd,a)[1];a=P(a);a=56>a?56-a|0:120-a|0;var b=p(y(z),[8+a|0]);b.b[0]=-128;var c=Qc(this.Nd,3);b.b[a]=P(Rc(c,56))<<24>>24;a=1+a|0;b.b[a]=P(Rc(c,48))<<24>>24;a=1+a|0;b.b[a]=P(Rc(c,40))<<24>>24;a=1+a|0;b.b[a]=P(Rc(c,32))<<24>>24;a=1+a|0;b.b[a]=P(Rc(c,24))<<24>>24;a=1+a|0;b.b[a]=P(Rc(c,16))<<24>>24;a=1+a|0;b.b[a]=P(Rc(c,8))<<24>>24;b.b[1+a|0]=P(c)<<24>>24;Lc(this,b,b.b.length);a=Sc(Q(),(new G).ca([(this.Qd>>>24|0)<<24>>24,(this.Qd>>>16|0)<<24>>24,(this.Qd>>>
8|0)<<24>>24,this.Qd<<24>>24,(this.Rd>>>24|0)<<24>>24,(this.Rd>>>16|0)<<24>>24,(this.Rd>>>8|0)<<24>>24,this.Rd<<24>>24,(this.Sd>>>24|0)<<24>>24,(this.Sd>>>16|0)<<24>>24,(this.Sd>>>8|0)<<24>>24,this.Sd<<24>>24,(this.Td>>>24|0)<<24>>24,(this.Td>>>16|0)<<24>>24,(this.Td>>>8|0)<<24>>24,this.Td<<24>>24,(this.Ud>>>24|0)<<24>>24,(this.Ud>>>16|0)<<24>>24,(this.Ud>>>8|0)<<24>>24,this.Ud<<24>>24,(this.Vd>>>24|0)<<24>>24,(this.Vd>>>16|0)<<24>>24,(this.Vd>>>8|0)<<24>>24,this.Vd<<24>>24,(this.Wd>>>24|0)<<24>>
24,(this.Wd>>>16|0)<<24>>24,(this.Wd>>>8|0)<<24>>24,this.Wd<<24>>24,(this.Xd>>>24|0)<<24>>24,(this.Xd>>>16|0)<<24>>24,(this.Xd>>>8|0)<<24>>24,this.Xd<<24>>24]),R().kb);this.ue();return a};m.oh=function(a){a=Tc(Uc(),a);Lc(this,a,a.b.length)};m.Ce=function(a){Lc(this,a,a.b.length)};var Vc=new t({Ah:0},!1,"parolamea.generator.BaseHash",v,{Ah:1,d:1,Bh:1,Ra:1,Pa:1});Ic.prototype.a=Vc;
function Wc(){this.Kc=this.Sb=this.Ue=this.zl=this.nc=null;this.Lf=this.qc=0;this.Mf=this.Sf=this.Df=null;this.cb=this.Mq=this.ye=!1}Wc.prototype=new u;m=Wc.prototype;
m.ue=function(){this.ye=!1;this.Sb.ue();var a=p(y(z),[this.qc]);if(this.nc.b.length>this.qc){this.Sb.Ce(this.nc);var b=this.Sb.$e();La(b,0,a,0,b.b.length)}else La(this.nc,0,a,0,this.nc.b.length);this.Df=a;if(0===this.Sf.b.length){a=this.Df;Q();b=R().kb;b=Xc(Yc(),(new Zc).re(b).uf);b.ua(a.b.length);for(var c=0,e=a.b.length;c<e;){var g=a.b[c]|0;b.Aa($c().Ii.b[g]);c=1+c|0}this.Sf=b.ma()}if(0===this.Mf.b.length){a=this.Df;Q();b=R().kb;b=Xc(Yc(),(new Zc).re(b).uf);b.ua(a.b.length);c=0;for(e=a.b.length;c<
e;)g=a.b[c]|0,b.Aa($c().Hi.b[g]),c=1+c|0;this.Mf=b.ma()}this.Sb.Ce(this.Mf)};m.$e=function(){this.ye&&this.ue();this.ye=!0;var a=this.Sb.$e();this.Sb.Ce(this.Sf);this.Sb.Ce(a);return this.Sb.$e()};m.oh=function(a){this.ye&&this.ue();this.Sb.oh(a)};m.Ce=function(a){this.ye&&this.ue();this.Sb.Ce(a)};m.a=new t({Bk:0},!1,"parolamea.generator.HMAC",v,{Bk:1,d:1,Bh:1,Ra:1,Pa:1});function ad(){this.Hi=this.Ii=null}ad.prototype=new u;
ad.prototype.c=function(){bd=this;cd();dd().qg;cd();ed();for(var a=(new fd).c(),b=0;256!==b;)gd(a,(92^b)<<24>>24),b=1+b|0;a=hd(a);b=R().kb;this.Ii=id(a,b);cd();dd().qg;cd();ed();a=(new fd).c();for(b=0;256!==b;)gd(a,(54^b)<<24>>24),b=1+b|0;a=hd(a);b=R().kb;this.Hi=id(a,b);return this};ad.prototype.a=new t({Ck:0},!1,"parolamea.generator.HMAC$",v,{Ck:1,d:1});var bd=void 0;function $c(){bd||(bd=(new ad).c());return bd}function jd(){this.Lq=this.Yc=null}jd.prototype=new u;
jd.prototype.c=function(){kd=this;this.Yc=Sc(Q(),(new G).ca("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")),ld(R(),r(ja)));return this};
function md(a){var b=Fc()("#inputIdentifier").val();$c();var c=b+"NkSCwmKP95Wpi6xu",b=Pc().Ue,e=new Wc,c=Tc(Uc(),c);e.nc=c;e.zl=b;e.Ue=b;e.Sb=(e.Ue,Pc(),(new nd).c());e.Kc="hmac-"+e.Sb.Kc;e.qc=e.Sb.qc;e.Lf=e.Sb.Lf;Q();e.Df=R().kb.Xa(0);Q();e.Sf=R().kb.Xa(0);Q();e.Mf=R().kb.Xa(0);e.ye=!0;e.oh(a);a=e.$e();b=p(y(A),[a.b.length/4|0]);for(c=e=0;e<b.b.length;)b.b[e]=a.b[c]<<24|(255&a.b[1+c|0])<<16|(255&a.b[2+c|0])<<8|255&a.b[3+c|0],c=4+c|0,e=1+e|0;a=p(y(ja),[4]);e=null;od||(od=(new pd).c());var g=0,e=b.b.length,
h=s().tb;a:{var l;for(;;)if(g===e){l=h;break a}else c=1+g|0,g=b.b[g],h=Na(h),h=Nc(qd((new N).Y(31,0,0),h),(new N).aa(g)),g=c}l=Na(l);b=new rd;b.ge=l;e=b;for(l=0;4!==l;){b=l;c=sd(e);if(null!==c)e=c.kc|0,c=c.Xb;else throw(new L).da(c);e|=0;g=sd(c);if(null!==g)c=g.kc|0,g=g.Xb;else throw(new L).da(g);c|=0;h=sd(g);if(null!==h)g=h.kc|0,h=h.Xb;else throw(new L).da(h);var g=g|0,q=sd(h);if(null!==q)h=q.kc|0,q=q.Xb;else throw(new L).da(q);h|=0;a.b[b]=""+td().Yc.b[(0>e?-e|0:e)%td().Yc.b.length]+td().Yc.b[(0>
c?-c|0:c)%td().Yc.b.length]+td().Yc.b[(0>g?-g|0:g)%td().Yc.b.length]+td().Yc.b[(0>h?-h|0:h)%td().Yc.b.length];e=q;l=1+l|0}l=ud().va.Ld();l.ua(a.b.length);l.Ba(vd(new wd,a));return l.ma()}jd.prototype.a=new t({Dk:0},!1,"parolamea.generator.Password$",v,{Dk:1,d:1});var kd=void 0;function td(){kd||(kd=(new jd).c());return kd}function rd(){this.ge=s().tb}rd.prototype=new u;m=rd.prototype;m.cd=k("Random");m.ad=k(1);m.ia=function(a){return this===a?!0:a&&a.a&&a.a.p.Ch?Ga(this.ge,a.ge):!1};
m.bd=function(a){switch(a){case 0:return this.ge;default:throw(new H).s(""+a);}};m.v=function(){return xd(this)};function sd(a){var b=yd((new N).Y(4194303,4194303,15),Nc((new N).Y(11,0,0),qd((new N).Y(2942573,6011,0),a.ge)));a=new rd;a.ge=b;b=P(Rc(b,16));return(new zd).Yd(b,a)}m.sa=function(){var a=-889275714,a=Ad().Zc(a,Bd(Ad(),this.ge));return Ad().md(a,1)};m.wd=function(){return Cd(this)};m.a=new t({Ch:0},!1,"parolamea.generator.Random",v,{Ch:1,d:1,dd:1,m:1,g:1,f:1});function pd(){}
pd.prototype=new u;pd.prototype.a=new t({Ek:0},!1,"parolamea.generator.Random$",v,{Ek:1,d:1,g:1,f:1});var od=void 0;function Dd(){this.Ai=this.Ue=null;this.Qg=0;this.Cd=this.Wj=null;this.cb=this.oq=!1}Dd.prototype=new u;
Dd.prototype.c=function(){Ed=this;this.Ue=(new Fd).c();this.Ai=Gd(Q(),1116352408,(new G).ca([1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,
-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998]));this.Qg=64;this.Wj="BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD";this.Cd=p(y(A),[64]);return this};Dd.prototype.a=new t({Gk:0},!1,"parolamea.generator.SHA256$",v,{Gk:1,d:1});var Ed=void 0;
function Pc(){Ed||(Ed=(new Dd).c());return Ed}function Fd(){}Fd.prototype=new u;Fd.prototype.a=new t({Hk:0},!1,"parolamea.generator.SHA256$$anon$1",v,{Hk:1,d:1,Jp:1});function Hd(){this.$j=null}Hd.prototype=new u;Hd.prototype.c=function(){Id=this;za();for(var a=16,b=p(y(Ua),[a]),c=0;c<a;)b.b[c]=65535&("0123456789ABCDEF".charCodeAt(c)|0),c=1+c|0;this.$j=b;return this};
function Tc(a,b){za();za();var c;gc||(gc=(new Pb).c());c=gc;c=c.cb?c.ig:Qb(c);c=c.hasOwnProperty("utf-8")?(new Jd).da(c["utf-8"]):Kd();if(Ld(c))c=c.Dd;else{if(Kd()===c)throw(new Md).s("UTF-8");throw(new L).da(c);}var e,g=c;c=b.length|0;Kb||(Kb=(new Jb).c());var h=b.length|0;if(0>h||(0+h|0)>("string"===typeof b?b.length|0:b.l()))throw(new H).c();var l=0+c|0;if(0>c||l>h)throw(new H).c();c=Nd(h,b,0,0,l);var q;if(0===(2&g.cb)&&0===(2&g.cb)){h=g.Pg();l=pc().Bf;if(null===l)throw(new F).s("null CodingErrorAction");
h.fg=l;l=pc().Bf;if(null===l)throw(new F).s("null CodingErrorAction");h.hg=l;g.Ih=h;g.cb|=2}g=g.Ih;if(0===(c.W-c.k|0))q=yb(Eb(),0);else{g.Ae=0;g.li();h=na(na(c.W-c.k|0)*g.rh)|0;h=yb(Eb(),h);b:for(;;){d:{var l=g,w=c,J=h;if(3===l.Ae)throw(new Od).c();l.Ae=2;for(;;){try{var C=l.Bg(w,J)}catch(O){if(O&&O.a&&O.a.p.yh)throw Pd(O);if(O&&O.a&&O.a.p.zh)throw Pd(O);throw O;}if(0===C.tc){var x=w.W-w.k|0;if(0<x){var E=M();switch(x){case 1:x=E.pd;break;case 2:x=E.ri;break;case 3:x=E.si;break;case 4:x=E.ti;break;
default:var sa=E.Nj,E=Qd(sa,x);if(Ld(E))x=E.Dd;else if(Kd()===E){var Ka=E=(new rc).ac(2,x),x=Rd(sa,x,Ka);null===x?Kd():(sa=x.Ja,x.Ja=Ka,(new Jd).da(sa));x=E}else throw(new L).da(E);}}else x=C}else x=C;if(0===x.tc||1===x.tc){l=x;break d}E=3===x.tc?l.hg:l.fg;if(pc().Bf===E){if((J.W-J.k|0)<l.gg.b.length){l=M().Cc;break d}E=l.gg;mc(J,E,0,E.b.length);E=w.k;x=x.hf;if(0>x)throw(new Sd).c();D(w,E+x|0)}else{if(pc().Cf===E){l=x;break d}if(pc().wh===E){E=w.k;x=x.hf;if(0>x)throw(new Sd).c();D(w,E+x|0)}else throw(new L).da(E);
}}l=void 0}if(0===l.tc){Td(Ud(),c.k===c.W);e=h;break b}else if(1===l.tc)h=jc(h);else throw sc(l),(new Vd).da("should not get here");}b:for(;;){d:switch(C=g,C.Ae){case 2:c=M().Dc;0===c.tc&&(C.Ae=3);C=c;break d;case 3:C=M().Dc;break d;default:throw(new Od).c();}if(0===C.tc){q=e;break b}else if(1===C.tc)e=jc(e);else throw sc(C),(new Vd).da("should not get here");}e=q;e.Hd=-1;e.W=e.k;e.k=0}e=q;q=e.pc;if(null===q)throw(new Sd).c();if(e.Ge)throw(new kc).c();for(e=q.b.length;0===q.b[-1+e|0];)e=-1+e|0;return e<
q.b.length?(C=p(y(z),[e]),La(q,0,C,0,e),C):q}Hd.prototype.a=new t({Ik:0},!1,"parolamea.generator.Util$",v,{Ik:1,d:1});var Id=void 0;function Uc(){Id||(Id=(new Hd).c());return Id}var ja=new t({bl:0},!1,"java.lang.String",v,{bl:1,f:1,d:1,Pf:1,Qa:1},function(a){return"string"===typeof a});function zd(){this.Xb=this.kc=null}zd.prototype=new u;m=zd.prototype;m.cd=k("Tuple2");m.ad=k(2);m.ia=function(a){return this===a?!0:a&&a.a&&a.a.p.Gh?S(T(),this.kc,a.kc)&&S(T(),this.Xb,a.Xb):!1};
m.Yd=function(a,b){this.kc=a;this.Xb=b;return this};m.bd=function(a){a:switch(a){case 0:a=this.kc;break a;case 1:a=this.Xb;break a;default:throw(new H).s(""+a);}return a};m.v=function(){return"("+this.kc+","+this.Xb+")"};m.sa=function(){return Wd(this)};m.wd=function(){return Cd(this)};m.a=new t({Gh:0},!1,"scala.Tuple2",v,{Gh:1,d:1,rq:1,dd:1,m:1,g:1,f:1});var qa=new t({Vl:0},!1,"java.lang.Boolean",v,{Vl:1,d:1,Qa:1},function(a){return"boolean"===typeof a});function Xd(){this.Ja=0}Xd.prototype=new u;
m=Xd.prototype;m.ia=function(a){return Yd(a)?this.Ja===a.Ja:!1};m.v=function(){return n.String.fromCharCode(this.Ja)};m.od=function(a){this.Ja=a;return this};m.sa=f("Ja");function Yd(a){return!!(a&&a.a&&a.a.p.wi)}m.a=new t({wi:0},!1,"java.lang.Character",v,{wi:1,d:1,Qa:1});function Ra(){this.lc=null}Ra.prototype=new u;function hb(a){return a.lc.name}Ra.prototype.v=function(){return(this.lc.isInterface?"interface ":this.lc.isPrimitive?"":"class ")+hb(this)};
Ra.prototype.a=new t({xi:0},!1,"java.lang.Class",v,{xi:1,d:1});function Ea(){this.cl=null;this.Wk=this.Np=this.Mp=this.Lk=this.Kk=this.Qp=this.Pp=this.Sp=0;this.jq=null;this.cb=!1}Ea.prototype=new u;function Fa(a,b){if(a!==a)return b!==b?0:1;if(b!==b)return-1;if(a===b){if(0===a){var c=1/a;return c===1/b?0:0>c?-1:1}return 0}return a<b?-1:1}Ea.prototype.a=new t({Zl:0},!1,"java.lang.Double$",v,{Zl:1,d:1});var Da=void 0;function Zd(){this.cl=null;this.Wk=this.Kk=this.Lk=0}Zd.prototype=new u;
function $d(a,b,c){return b<<c|b>>>(-c|0)|0}function ae(a,b){var c=b-(1431655765&b>>1)|0,c=(858993459&c)+(858993459&c>>2)|0;return B(16843009,252645135&(c+(c>>4)|0))>>24}function be(a,b){var c=b,c=c|c>>>1|0,c=c|c>>>2|0,c=c|c>>>4|0,c=c|c>>>8|0;return 32-ae(0,c|c>>>16|0)|0}function ce(a,b){return ae(0,-1+(b&(-b|0))|0)}Zd.prototype.a=new t({dm:0},!1,"java.lang.Integer$",v,{dm:1,d:1});var de=void 0;function U(){de||(de=(new Zd).c());return de}function ee(){}ee.prototype=new u;function fe(){}
fe.prototype=ee.prototype;function ge(a){return!!(a&&a.a&&a.a.p.Xc||"number"===typeof a)}var he=new t({Xc:0},!1,"java.lang.Number",v,{Xc:1,d:1},ge);ee.prototype.a=he;function ie(){this.lb=null}ie.prototype=new u;m=ie.prototype;m.c=function(){ie.prototype.s.call(this,"");return this};function je(a,b){a.lb=""+a.lb+(null===b?"null":b);return a}m.kh=function(a,b){return this.lb.substring(a,b)};m.v=f("lb");function ke(a,b){null===b?je(a,null):je(a,ha(b))}m.aa=function(){ie.prototype.s.call(this,"");return this};
function le(a,b,c,e){return null===b?le(a,"null",c,e):je(a,ha(Ja(b,c,e)))}m.l=function(){return this.lb.length|0};function me(a,b){var c=(new Xd).od(b).Ja;je(a,n.String.fromCharCode(c))}m.s=function(a){this.lb=a;return this};m.vg=function(a){return 65535&(this.lb.charCodeAt(a)|0)};m.a=new t({km:0},!1,"java.lang.StringBuilder",v,{km:1,d:1,Pf:1,Of:1,f:1});function ne(){this.Bl=this.Cl=this.di=this.Ei=null}ne.prototype=new u;
ne.prototype.c=function(){oe=this;this.Ei=pe(!1);this.di=pe(!0);this.Cl=null;this.Bl=n.performance?n.performance.now?function(){return function(){return+n.performance.now()}}(this):n.performance.webkitNow?function(){return function(){return+n.performance.webkitNow()}}(this):function(){return function(){return+(new n.Date).getTime()}}(this):function(){return function(){return+(new n.Date).getTime()}}(this);return this};ne.prototype.a=new t({lm:0},!1,"java.lang.System$",v,{lm:1,d:1});var oe=void 0;
function qe(){oe||(oe=(new ne).c());return oe}function re(){this.Bd=this.Gg=null}re.prototype=new u;function se(){}se.prototype=re.prototype;re.prototype.c=function(){this.Gg=!1;return this};re.prototype.Kf=function(){this.Gg||(this.Bd=this.qh.Zi,this.Gg=!0);return this.Bd};var te=new t({Ng:0},!1,"java.lang.ThreadLocal",v,{Ng:1,d:1});re.prototype.a=te;function V(){this.Oq=this.nl=this.Ki=null}V.prototype=new u;function ue(){}m=ue.prototype=V.prototype;
m.c=function(){V.prototype.rc.call(this,null,null);return this};m.Hf=function(){var a=ve(),b;a:try{b=a.undef()}catch(c){a=we(xe(),c);if(null!==a){if(ye(a)){b=a.ld;break a}throw ze(xe(),a);}throw c;}this.stackdata=b;return this};m.Jf=f("Ki");m.v=function(){var a=hb(ia(this)),b=this.Jf();return null===b?a:a+": "+b};m.rc=function(a,b){this.Ki=a;this.nl=b;this.Hf();return this};var Ae=new t({ya:0},!1,"java.lang.Throwable",v,{ya:1,d:1,f:1});V.prototype.a=Ae;function Be(){}Be.prototype=new u;
Be.prototype.a=new t({mm:0},!1,"java.lang.reflect.Array$",v,{mm:1,d:1});var Ce=void 0;function De(){}De.prototype=new u;function Ee(a,b){for(var c=0;c!==b.b.length;)b.b[c]=0,c=1+c|0}De.prototype.a=new t({nm:0},!1,"java.util.Arrays$",v,{nm:1,d:1});var Fe=void 0;function Ge(){Fe||(Fe=(new De).c());return Fe}function Zc(){this.uf=null}Zc.prototype=new u;Zc.prototype.Ld=function(){return Xc(Yc(),this.uf)};Zc.prototype.re=function(a){this.uf=a;return this};Zc.prototype.Ne=function(){return Xc(Yc(),this.uf)};
Zc.prototype.a=new t({um:0},!1,"scala.Array$$anon$2",v,{um:1,d:1,qf:1});function He(){}He.prototype=new u;function Ie(){}Ie.prototype=He.prototype;var Je=new t({Li:0},!1,"scala.DeprecatedConsole",v,{Li:1,d:1});He.prototype.a=Je;function Ke(){}Ke.prototype=new u;function Le(){}Le.prototype=Ke.prototype;var Me=new t({Mi:0},!1,"scala.FallbackArrayBuilding",v,{Mi:1,d:1});Ke.prototype.a=Me;function Ne(){}Ne.prototype=new u;function Oe(){}Oe.prototype=Ne.prototype;
var Pe=new t({Ni:0},!1,"scala.LowPriorityImplicits",v,{Ni:1,d:1});Ne.prototype.a=Pe;function Qe(){}Qe.prototype=new u;function Re(){}Re.prototype=Qe.prototype;Qe.prototype.c=function(){return this};var Se=new t({Sg:0},!1,"scala.Option",v,{Sg:1,d:1,dd:1,m:1,g:1,f:1});Qe.prototype.a=Se;function Te(){}Te.prototype=new u;Te.prototype.Ld=function(){return(new Ue).c()};Te.prototype.Ne=function(){return(new Ue).c()};Te.prototype.a=new t({Bm:0},!1,"scala.Predef$$anon$3",v,{Bm:1,d:1,qf:1});
function Ve(){}Ve.prototype=new u;function We(){}We.prototype=Ve.prototype;Ve.prototype.c=function(){return this};Ve.prototype.v=k("\x3cfunction1\x3e");var Xe=new t({Oi:0},!1,"scala.Predef$$eq$colon$eq",v,{Oi:1,d:1,w:1,g:1,f:1});Ve.prototype.a=Xe;function Ye(){}Ye.prototype=new u;function Ze(){}Ze.prototype=Ye.prototype;Ye.prototype.c=function(){return this};Ye.prototype.v=k("\x3cfunction1\x3e");var $e=new t({Pi:0},!1,"scala.Predef$$less$colon$less",v,{Pi:1,d:1,w:1,g:1,f:1});Ye.prototype.a=$e;
function af(){}af.prototype=new u;af.prototype.a=new t({Cm:0},!1,"scala.Predef$any2stringadd$",v,{Cm:1,d:1});var bf=void 0;function cf(){this.bc=null}cf.prototype=new u;m=cf.prototype;m.cd=k("StringContext");m.ad=k(1);m.ia=function(a){if(this===a)return!0;if(a&&a.a&&a.a.p.Ri){var b=this.bc;a=a.bc;return null===b?null===a:b.ia(a)}return!1};m.bd=function(a){switch(a){case 0:return this.bc;default:throw(new H).s(""+a);}};m.v=function(){return xd(this)};
function df(a,b){if(a.bc.l()!==(1+b.l()|0))throw(new F).s("wrong number of arguments ("+b.l()+") for interpolated string with "+a.bc.l()+" parts");}
function tb(a,b){var c=function(){return function(a){ef||(ef=(new ff).c());a:{var b=a.length|0,c=gf(za(),a,92);switch(c){case -1:break a;default:var e=(new ie).c();b:{var g=c,c=0;for(;;)if(0<=g){g>c&&le(e,a,c,g);c=1+g|0;if(c>=b)throw hf(a,g);var h=65535&(a.charCodeAt(c)|0);switch(h){case 98:g=8;break;case 116:g=9;break;case 110:g=10;break;case 102:g=12;break;case 114:g=13;break;case 34:g=34;break;case 39:g=39;break;case 92:g=92;break;default:if(48<=h&&55>=h){h=65535&(a.charCodeAt(c)|0);g=-48+h|0;
c=1+c|0;if(c<b&&48<=(65535&(a.charCodeAt(c)|0))&&55>=(65535&(a.charCodeAt(c)|0))){var l=c,g=-48+(B(8,g)+(65535&(a.charCodeAt(l)|0))|0)|0,c=1+c|0;c<b&&51>=h&&48<=(65535&(a.charCodeAt(c)|0))&&55>=(65535&(a.charCodeAt(c)|0))&&(h=c,g=-48+(B(8,g)+(65535&(a.charCodeAt(h)|0))|0)|0,c=1+c|0)}c=-1+c|0;g&=65535}else throw hf(a,g);}c=1+c|0;me(e,g);g=c;za();h=a;l=jf(92);h=h.indexOf(l,c)|0;c=g;g=h}else{c<b&&le(e,a,c,b);a=e.lb;break b}a=void 0}}}return a}}(a);df(a,b);for(var e=a.bc.fa(),g=b.fa(),h=e.ga(),h=(new ie).s(c(h));g.ja();){ke(h,
g.ga());var l=e.ga();je(h,c(l))}return h.lb}function ub(a){var b=new cf;b.bc=a;return b}m.sa=function(){return Wd(this)};m.wd=function(){return Cd(this)};m.a=new t({Ri:0},!1,"scala.StringContext",v,{Ri:1,d:1,dd:1,m:1,g:1,f:1});function ff(){}ff.prototype=new u;ff.prototype.a=new t({Dm:0},!1,"scala.StringContext$",v,{Dm:1,d:1,g:1,f:1});var ef=void 0;function kf(){}kf.prototype=new u;kf.prototype.c=function(){lf=this;return this};
kf.prototype.a=new t({Fm:0},!1,"scala.math.Equiv$",v,{Fm:1,d:1,uq:1,g:1,f:1});var lf=void 0;function mf(){}mf.prototype=new u;mf.prototype.a=new t({Gm:0},!1,"scala.math.Fractional$",v,{Gm:1,d:1,g:1,f:1});var nf=void 0;function of(){}of.prototype=new u;of.prototype.a=new t({Hm:0},!1,"scala.math.Integral$",v,{Hm:1,d:1,g:1,f:1});var pf=void 0;function qf(){}qf.prototype=new u;qf.prototype.a=new t({Im:0},!1,"scala.math.Numeric$",v,{Im:1,d:1,g:1,f:1});var rf=void 0;function sf(){}sf.prototype=new u;
sf.prototype.a=new t({Jm:0},!1,"scala.math.Ordered$",v,{Jm:1,d:1});var tf=void 0;function uf(){}uf.prototype=new u;uf.prototype.c=function(){vf=this;return this};uf.prototype.a=new t({Km:0},!1,"scala.math.Ordering$",v,{Km:1,d:1,vq:1,g:1,f:1});var vf=void 0;
function wf(){this.Vk=this.fk=this.Xj=this.Tk=this.Sk=this.Rk=this.bk=this.Zj=this.Yj=this.Fp=this.Ep=this.Uk=this.$k=this.el=this.Rj=this.Zk=this.Qj=this.Sj=this.Pj=this.Pk=this.gk=this.dk=this.ak=this.Xk=this.ck=this.dl=this.ke=null;this.cb=0}wf.prototype=new u;
wf.prototype.c=function(){xf=this;this.ke=(new yf).c();zf||(zf=(new Af).c());this.dl=zf;Bf||(Bf=(new Cf).c());this.ck=Bf;this.Xk=Ub();this.ak=dd();this.dk=Df();this.gk=ud();this.Pk=Ef();Ff||(Ff=(new Gf).c());this.Pj=Ff;Hf||(Hf=(new If).c());this.Sj=Hf;Jf||(Jf=(new Kf).c());this.Qj=Jf;this.Zk=Lf();Mf||(Mf=(new Nf).c());this.Rj=Mf;this.el=ed();Of||(Of=(new Pf).c());this.$k=Of;Qf||(Qf=(new Rf).c());this.Uk=Qf;lf||(lf=(new kf).c());this.Yj=lf;nf||(nf=(new mf).c());this.Zj=nf;pf||(pf=(new of).c());this.bk=
pf;rf||(rf=(new qf).c());this.Rk=rf;tf||(tf=(new sf).c());this.Sk=tf;vf||(vf=(new uf).c());this.Tk=vf;Sf||(Sf=(new Tf).c());this.Xj=Sf;Uf||(Uf=(new Vf).c());this.fk=Uf;Wf||(Wf=(new Xf).c());this.Vk=Wf;return this};wf.prototype.a=new t({Mm:0},!1,"scala.package$",v,{Mm:1,d:1});var xf=void 0;function yf(){}yf.prototype=new u;yf.prototype.v=k("object AnyRef");yf.prototype.a=new t({Nm:0},!1,"scala.package$$anon$1",v,{Nm:1,d:1,sq:1});function W(){this.Lj=null;this.hi=0}W.prototype=new u;
function Yf(){}Yf.prototype=W.prototype;W.prototype.ia=function(a){return this===a};W.prototype.v=f("Lj");W.prototype.s=function(a){this.Lj=a;this.hi=Ma(this);return this};W.prototype.sa=f("hi");var Zf=new t({Lc:0},!1,"scala.reflect.AnyValManifest",v,{Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});W.prototype.a=Zf;function $f(){this.id=this.hd=this.Jd=this.Tc=this.Id=this.Vc=this.Oc=this.Qc=this.Rc=this.Sc=this.Ac=this.Pc=this.Uc=this.kb=null}$f.prototype=new u;
$f.prototype.c=function(){ag=this;this.kb=X().kb;this.Uc=X().Uc;this.Pc=X().Pc;this.Ac=X().Ac;this.Sc=X().Sc;this.Rc=X().Rc;this.Qc=X().Qc;this.Oc=X().Oc;this.Vc=X().Vc;this.Id=X().Id;this.Tc=X().Tc;this.Jd=X().Jd;this.hd=X().hd;this.id=X().id;return this};$f.prototype.a=new t({Om:0},!1,"scala.reflect.ClassManifestFactory$",v,{Om:1,d:1});var ag=void 0;
function bg(){this.id=this.hd=this.ke=this.Jd=this.Tc=this.Id=this.Vc=this.Oc=this.Qc=this.Rc=this.Sc=this.Ac=this.Pc=this.Uc=this.kb=this.Eh=this.Dh=this.Fh=null}bg.prototype=new u;
bg.prototype.c=function(){cg=this;this.Fh=r(v);this.Dh=r(dg);this.Eh=r(eg);this.kb=fg().sb.kb;this.Uc=fg().sb.Uc;this.Pc=fg().sb.Pc;this.Ac=fg().sb.Ac;this.Sc=fg().sb.Sc;this.Rc=fg().sb.Rc;this.Qc=fg().sb.Qc;this.Oc=fg().sb.Oc;this.Vc=fg().sb.Vc;this.Id=fg().sb.Id;this.Tc=fg().sb.Tc;this.Jd=fg().sb.Jd;this.ke=fg().sb.ke;this.hd=fg().sb.hd;this.id=fg().sb.id;return this};
function ld(a,b){var c;b===r(z)?c=R().kb:b===r(Va)?c=R().Uc:b===r(Ua)?c=R().Pc:b===r(A)?c=R().Ac:b===r(Wa)?c=R().Sc:b===r(Xa)?c=R().Rc:b===r(Ya)?c=R().Qc:b===r(Ta)?c=R().Oc:b===r(Sa)?c=R().Vc:a.Fh===b?c=R().Tc:a.Dh===b?c=R().hd:a.Eh===b?c=R().id:(c=new gg,c.Uf=b);return c}bg.prototype.a=new t({Pm:0},!1,"scala.reflect.ClassTag$",v,{Pm:1,d:1,g:1,f:1});var cg=void 0;function R(){cg||(cg=(new bg).c());return cg}function gg(){this.Uf=null}gg.prototype=new u;m=gg.prototype;
m.Xa=function(a){var b=this.Db();b===r(z)?a=p(y(z),[a]):b===r(Va)?a=p(y(Va),[a]):b===r(Ua)?a=p(y(Ua),[a]):b===r(A)?a=p(y(A),[a]):b===r(Wa)?a=p(y(Wa),[a]):b===r(Xa)?a=p(y(Xa),[a]):b===r(Ya)?a=p(y(Ya),[a]):b===r(Ta)?a=p(y(Ta),[a]):b===r(Sa)?a=p(y(ra),[a]):(Ce||(Ce=(new Be).c()),a=this.Db().lc.newArrayOfThisClass([a]));return a};m.ia=function(a){var b;a&&a.a&&a.a.p.ob?(b=this.Db(),a=a.Db(),b=b===a):b=!1;return b};m.v=function(){return hg(this,this.Uf)};m.Db=f("Uf");m.sa=function(){return Nb(I(),this.Uf)};
m.a=new t({Qm:0},!1,"scala.reflect.ClassTag$$anon$1",v,{Qm:1,d:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function ig(){this.hd=this.id=this.Jd=this.ke=this.Tc=this.Id=this.Xi=this.Wi=this.Wf=this.Vc=this.Oc=this.Qc=this.Rc=this.Sc=this.Ac=this.Pc=this.Uc=this.kb=null}ig.prototype=new u;
ig.prototype.c=function(){jg=this;this.kb=(new kg).c();this.Uc=(new lg).c();this.Pc=(new og).c();this.Ac=(new pg).c();this.Sc=(new qg).c();this.Rc=(new rg).c();this.Qc=(new sg).c();this.Oc=(new tg).c();this.Vc=(new ug).c();this.Wf=r(v);this.Wi=r(dg);this.Xi=r(eg);this.Id=(new vg).c();this.ke=this.Tc=(new wg).c();this.Jd=(new xg).c();this.id=(new yg).c();this.hd=(new zg).c();return this};ig.prototype.a=new t({Rm:0},!1,"scala.reflect.ManifestFactory$",v,{Rm:1,d:1});var jg=void 0;
function X(){jg||(jg=(new ig).c());return jg}function Ag(){this.zp=this.Ji=this.sm=null}Ag.prototype=new u;function Bg(){}Bg.prototype=Ag.prototype;Ag.prototype.Db=f("Ji");Ag.prototype.Nl=function(a,b,c){this.sm=a;this.Ji=b;this.zp=c;return this};var Cg=new t({ae:0},!1,"scala.reflect.ManifestFactory$ClassTypeManifest",v,{ae:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});Ag.prototype.a=Cg;function Dg(){}Dg.prototype=new u;Dg.prototype.v=k("\x3c?\x3e");
Dg.prototype.a=new t({fn:0},!1,"scala.reflect.NoManifest$",v,{fn:1,d:1,qb:1,g:1,f:1});var Eg=void 0;function Fg(){this.sb=this.uh=null}Fg.prototype=new u;Fg.prototype.c=function(){Gg=this;ag||(ag=(new $f).c());this.uh=ag;this.sb=X();return this};Fg.prototype.a=new t({gn:0},!1,"scala.reflect.package$",v,{gn:1,d:1});var Gg=void 0;function fg(){Gg||(Gg=(new Fg).c());return Gg}function Hg(){this.nh=this.Zi=null}Hg.prototype=new u;Hg.prototype.v=function(){return"DynamicVariable("+this.nh.Kf()+")"};
Hg.prototype.da=function(a){this.Zi=a;a=new Ig;if(null===this)throw ze(xe(),null);a.qh=this;Jg.prototype.c.call(a);this.nh=a;return this};Hg.prototype.a=new t({hn:0},!1,"scala.util.DynamicVariable",v,{hn:1,d:1});function Tf(){}Tf.prototype=new u;Tf.prototype.a=new t({kn:0},!1,"scala.util.Either$",v,{kn:1,d:1});var Sf=void 0;function Vf(){}Vf.prototype=new u;Vf.prototype.v=k("Left");Vf.prototype.a=new t({ln:0},!1,"scala.util.Left$",v,{ln:1,d:1,g:1,f:1});var Uf=void 0;function Xf(){}Xf.prototype=new u;
Xf.prototype.v=k("Right");Xf.prototype.a=new t({mn:0},!1,"scala.util.Right$",v,{mn:1,d:1,g:1,f:1});var Wf=void 0;function Kg(){this.Gn=null}Kg.prototype=new u;Kg.prototype.c=function(){this.Gn=(new Lg).c();return this};Kg.prototype.a=new t({on:0},!1,"scala.util.control.Breaks",v,{on:1,d:1});function Mg(){this.sh=!1}Mg.prototype=new u;Mg.prototype.c=function(){Ng=this;this.sh=!1;return this};Mg.prototype.a=new t({pn:0},!1,"scala.util.control.NoStackTrace$",v,{pn:1,d:1,g:1,f:1});var Ng=void 0;
function Og(){}Og.prototype=new u;function Pg(){}Pg.prototype=Og.prototype;Og.prototype.Qf=function(a,b){var c;c=B(-862048943,b);c=$d(U(),c,15);c=B(461845907,c);return a^c};Og.prototype.Zc=function(a,b){var c=this.Qf(a,b),c=$d(U(),c,13);return-430675100+B(5,c)|0};
function Qg(a,b,c){var e=(new Rg).aa(0),g=(new Rg).aa(0),h=(new Rg).aa(0),l=(new Rg).aa(1);b.ka(Vb(function(a,b,c,e,g){return function(a){a=Nb(I(),a);b.$=b.$+a|0;c.$^=a;0!==a&&(g.$=B(g.$,a));e.$=1+e.$|0}}(a,e,g,h,l)));b=a.Zc(c,e.$);b=a.Zc(b,g.$);b=a.Qf(b,l.$);return a.md(b,h.$)}function Wd(a){var b=Sg(),c=a.ad();if(0===c)return a=a.cd(),ya(za(),a);for(var e=-889275714,g=0;g<c;)e=b.Zc(e,Nb(I(),a.bd(g))),g=1+g|0;return b.md(e,c)}
Og.prototype.md=function(a,b){var c=a^b,c=B(-2048144789,c^(c>>>16|0)),c=c^(c>>>13|0),c=B(-1028477387,c);return c^=c>>>16|0};function Tg(a,b,c){var e=(new Rg).aa(0);c=(new Rg).aa(c);b.ka(Vb(function(a,b,c){return function(e){c.$=a.Zc(c.$,Nb(I(),e));b.$=1+b.$|0}}(a,e,c)));return a.md(c.$,e.$)}var Ug=new t({Si:0},!1,"scala.util.hashing.MurmurHash3",v,{Si:1,d:1});Og.prototype.a=Ug;function Vg(){}Vg.prototype=new u;
function Wg(a,b){var c=B(-1640532531,b);U();return B(-1640532531,c<<24|16711680&c<<8|65280&(c>>>8|0)|c>>>24|0)}Vg.prototype.a=new t({rn:0},!1,"scala.util.hashing.package$",v,{rn:1,d:1});var Xg=void 0;function Yg(){Xg||(Xg=(new Vg).c());return Xg}function Kf(){}Kf.prototype=new u;Kf.prototype.a=new t({sn:0},!1,"scala.collection.$colon$plus$",v,{sn:1,d:1});var Jf=void 0;function If(){}If.prototype=new u;If.prototype.a=new t({tn:0},!1,"scala.collection.$plus$colon$",v,{tn:1,d:1});var Hf=void 0;
function Zg(){}Zg.prototype=new u;function $g(){}m=$g.prototype=Zg.prototype;m.Va=function(){return this};m.xg=function(a,b){this.Fc(a,b,ah(I(),a)-b|0)};m.c=function(){return this};m.t=function(){return!this.ja()};m.v=function(){return(this.ja()?"non-empty":"empty")+" iterator"};m.ka=function(a){bh(this,a)};m.yc=function(){var a=ch().va.Ld();a.Ba(this.Va());return a.ma()};m.ha=function(){return dh(this)};m.jf=function(){return eh(this,"","","")};m.Wb=function(){return fh(this)};
m.Le=function(a,b,c,e){return gh(this,a,b,c,e)};m.qi=k(!1);m.Fc=function(a,b,c){if(!(0<=b&&(b<ah(I(),a)||0===ah(I(),a))))throw(new F).s("requirement failed: "+tb(ub((new G).ca(["start "," out of range ",""])),(new G).ca([b,ah(I(),a)])));var e=b,g=ah(I(),a)-b|0;for(b=b+(c<g?c:g)|0;e<b&&this.ja();)hh(I(),a,e,this.ga()),e=1+e|0};var ih=new t({Tb:0},!1,"scala.collection.AbstractIterator",v,{Tb:1,d:1,dc:1,r:1,q:1});Zg.prototype.a=ih;function jh(){}jh.prototype=new u;function kh(){}m=kh.prototype=jh.prototype;
m.xg=function(a,b){this.Fc(a,b,ah(I(),a)-b|0)};m.Og=function(a){return this.te("",a,"")};m.te=function(a,b,c){return eh(this,a,b,c)};m.yc=function(){var a=ch().va;return lh(this,a)};m.jf=function(){return this.Og("")};m.Le=function(a,b,c,e){return gh(this,a,b,c,e)};m.Rg=function(){return this};m.qi=k(!0);m.Kj=function(a){return id(this,a)};m.la=function(){return this.pb().la()};
m.xc=function(){var a=hb(ia(this.Rg())),b;za();b=a;var c=jf(46);b=b.lastIndexOf(c)|0;-1!==b&&(a=a.substring(1+b|0));b=gf(za(),a,36);-1!==b&&(a=a.substring(0,b));return a};var mh=new t({y:0},!1,"scala.collection.AbstractTraversable",v,{y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1});jh.prototype.a=mh;function nh(){this.mc=null}nh.prototype=new u;nh.prototype.c=function(){oh=this;this.mc=(new ph).c();return this};nh.prototype.a=new t({yn:0},!1,"scala.collection.Iterator$",v,{yn:1,d:1});var oh=void 0;
function Df(){oh||(oh=(new nh).c());return oh}function qh(){}qh.prototype=new u;function rh(){}rh.prototype=qh.prototype;var sh=new t({Xf:0},!1,"scala.collection.generic.GenMapFactory",v,{Xf:1,d:1});qh.prototype.a=sh;function th(){this.Wa=null}th.prototype=new u;function uh(){}uh.prototype=th.prototype;th.prototype.Ld=function(){return this.Wa.la()};th.prototype.Ne=function(a){return a.pb().la()};th.prototype.ff=function(a){if(null===a)throw ze(xe(),null);this.Wa=a;return this};
var vh=new t({Yf:0},!1,"scala.collection.generic.GenTraversableFactory$GenericCanBuildFrom",v,{Yf:1,d:1,qf:1});th.prototype.a=vh;function wh(){}wh.prototype=new u;function xh(){}xh.prototype=wh.prototype;function Tb(a,b){if(b.t())return a.me();var c=a.la();c.Ba(b);return c.ma()}wh.prototype.me=function(){return this.la().ma()};var yh=new t({ra:0},!1,"scala.collection.generic.GenericCompanion",v,{ra:1,d:1});wh.prototype.a=yh;function Gf(){}Gf.prototype=new u;Gf.prototype.v=k("::");
Gf.prototype.a=new t({Jn:0},!1,"scala.collection.immutable.$colon$colon$",v,{Jn:1,d:1,g:1,f:1});var Ff=void 0;function zh(){}zh.prototype=new u;zh.prototype.c=function(){return this};zh.prototype.o=function(){return this};zh.prototype.v=k("\x3cfunction1\x3e");zh.prototype.a=new t({Sn:0},!1,"scala.collection.immutable.List$$anon$1",v,{Sn:1,d:1,w:1});function Ah(){this.dh=this.nb=null}Ah.prototype=new u;m=Ah.prototype;m.c=function(){Ah.prototype.se.call(this,Bh());return this};
m.Ea=function(a){return Ch(this,a)};m.se=function(a){var b=Dh((new Eh).c(),a);this.nb=Fh(b);b=(new Gh).c();this.dh=Y(b,a);return this};m.ma=function(){for(var a=this.nb,b=Bh(),a=a.ta;!a.t();)var c=a.pa(),b=Hh(b,c),a=a.na();return b};m.jc=function(a,b){Ih(this,a,b)};m.Aa=function(a){return Ch(this,a)};m.ua=aa();function Ch(a,b){null===Jh(a.dh,b)&&(Kh(a.nb,b),Lh(a.dh,b));return a}m.Ba=function(a){return Y(this,a)};
m.a=new t({Wn:0},!1,"scala.collection.immutable.ListSet$ListSetBuilder",v,{Wn:1,d:1,Ia:1,Da:1,Ca:1});function Rf(){this.Jk=0}Rf.prototype=new u;Rf.prototype.c=function(){Qf=this;this.Jk=512;return this};Rf.prototype.a=new t({$n:0},!1,"scala.collection.immutable.Range$",v,{$n:1,d:1,g:1,f:1});var Qf=void 0;function Nf(){}Nf.prototype=new u;Nf.prototype.a=new t({jo:0},!1,"scala.collection.immutable.Stream$$hash$colon$colon$",v,{jo:1,d:1});var Mf=void 0;
function Mh(){this.Wa=this.Bd=this.jh=null;this.cb=!1}Mh.prototype=new u;function Nh(a,b,c){a.jh=c;if(null===b)throw ze(xe(),null);a.Wa=b;return a}function Oh(a){a.cb||(a.Bd=a.jh.Me(),a.cb=!0);a.jh=null;return a.Bd}Mh.prototype.a=new t({oo:0},!1,"scala.collection.immutable.StreamIterator$LazyCell",v,{oo:1,d:1});function fd(){this.Ze=this.$d=this.Re=0;this.Zh=this.Wh=this.Th=this.Qh=this.Nh=this.af=null}fd.prototype=new u;m=fd.prototype;m.wa=f("Th");
m.c=function(){this.af=p(y(v),[32]);this.Ze=1;this.$d=this.Re=0;return this};m.Yb=f("Ze");m.Ea=function(a){return gd(this,a)};m.bf=d("Zh");m.db=f("af");m.mb=f("Wh");m.eb=d("Qh");
function gd(a,b){if(a.$d>=a.af.b.length){var c=32+a.Re|0,e=a.Re^c;if(1024>e)1===a.Yb()&&(a.Fa(p(y(v),[32])),a.X().b[0]=a.db(),a.kd(1+a.Yb()|0)),a.Oa(p(y(v),[32])),a.X().b[31&c>>5]=a.db();else if(32768>e)2===a.Yb()&&(a.eb(p(y(v),[32])),a.ea().b[0]=a.X(),a.kd(1+a.Yb()|0)),a.Oa(p(y(v),[32])),a.Fa(p(y(v),[32])),a.X().b[31&c>>5]=a.db(),a.ea().b[31&c>>10]=a.X();else if(1048576>e)3===a.Yb()&&(a.Mb(p(y(v),[32])),a.wa().b[0]=a.ea(),a.kd(1+a.Yb()|0)),a.Oa(p(y(v),[32])),a.Fa(p(y(v),[32])),a.eb(p(y(v),[32])),
a.X().b[31&c>>5]=a.db(),a.ea().b[31&c>>10]=a.X(),a.wa().b[31&c>>15]=a.ea();else if(33554432>e)4===a.Yb()&&(a.Gc(p(y(v),[32])),a.mb().b[0]=a.wa(),a.kd(1+a.Yb()|0)),a.Oa(p(y(v),[32])),a.Fa(p(y(v),[32])),a.eb(p(y(v),[32])),a.Mb(p(y(v),[32])),a.X().b[31&c>>5]=a.db(),a.ea().b[31&c>>10]=a.X(),a.wa().b[31&c>>15]=a.ea(),a.mb().b[31&c>>20]=a.wa();else if(1073741824>e)5===a.Yb()&&(a.bf(p(y(v),[32])),a.Hc().b[0]=a.mb(),a.kd(1+a.Yb()|0)),a.Oa(p(y(v),[32])),a.Fa(p(y(v),[32])),a.eb(p(y(v),[32])),a.Mb(p(y(v),[32])),
a.Gc(p(y(v),[32])),a.X().b[31&c>>5]=a.db(),a.ea().b[31&c>>10]=a.X(),a.wa().b[31&c>>15]=a.ea(),a.mb().b[31&c>>20]=a.wa(),a.Hc().b[31&c>>25]=a.mb();else throw(new F).c();a.Re=c;a.$d=0}a.af.b[a.$d]=b;a.$d=1+a.$d|0;return a}m.ma=function(){return hd(this)};m.Fa=d("Nh");m.jc=function(a,b){Ih(this,a,b)};m.Gc=d("Wh");m.X=f("Nh");m.Hc=f("Zh");function hd(a){var b=a.Re+a.$d|0;if(0===b)return ed().og;var c=(new Ph).Y(0,b,0);Qh(c,a,a.Ze);1<a.Ze&&Rh(c,0,-1+b|0);return c}m.Aa=function(a){return gd(this,a)};
m.ua=aa();m.kd=d("Ze");m.ea=f("Qh");m.Oa=d("af");m.Ba=function(a){return Y(this,a)};m.Mb=d("Th");m.a=new t({so:0},!1,"scala.collection.immutable.VectorBuilder",v,{so:1,d:1,Ia:1,Da:1,Ca:1,fj:1});function Sh(){}Sh.prototype=new u;function Th(){}Th.prototype=Sh.prototype;Sh.prototype.jc=function(a,b){Ih(this,a,b)};var Uh=new t({uc:0},!1,"scala.collection.mutable.ArrayBuilder",v,{uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});Sh.prototype.a=Uh;function Vh(){}Vh.prototype=new u;
function Xc(a,b){var c=b.Db();return c===r(z)?(new Wh).c():c===r(Va)?(new Xh).c():c===r(Ua)?(new Yh).c():c===r(A)?(new Zh).c():c===r(Wa)?(new $h).c():c===r(Xa)?(new ai).c():c===r(Ya)?(new bi).c():c===r(Ta)?(new ci).c():c===r(Sa)?(new di).c():(new ei).re(b)}Vh.prototype.a=new t({wo:0},!1,"scala.collection.mutable.ArrayBuilder$",v,{wo:1,d:1,g:1,f:1});var fi=void 0;function Yc(){fi||(fi=(new Vh).c());return fi}function gi(){this.vd=this.Ja=this.nc=null}gi.prototype=new u;
function hi(a){return"(kv: "+a.nc+", "+a.Ja+")"+(null!==a.vd?" -\x3e "+hi(a.vd):"")}gi.prototype.Yd=function(a,b){this.nc=a;this.Ja=b;return this};gi.prototype.v=function(){return hi(this)};gi.prototype.a=new t({xo:0},!1,"scala.collection.mutable.DefaultEntry",v,{xo:1,d:1,sj:1,g:1,f:1});function ii(){}ii.prototype=new u;ii.prototype.kf=function(a,b){if(!(500>a))throw(new Vd).da("assertion failed: loadFactor too large; must be \x3c 0.5");return P(ji(qd((new N).aa(b),(new N).aa(a))))};
ii.prototype.a=new t({yo:0},!1,"scala.collection.mutable.FlatHashTable$",v,{yo:1,d:1});var ki=void 0;function li(){ki||(ki=(new ii).c());return ki}function mi(){}mi.prototype=new u;mi.prototype.v=k("NullSentinel");mi.prototype.sa=k(0);mi.prototype.a=new t({Ao:0},!1,"scala.collection.mutable.FlatHashTable$NullSentinel$",v,{Ao:1,d:1});var ni=void 0;function oi(){ni||(ni=(new mi).c());return ni}function pi(){this.nb=this.mc=null}pi.prototype=new u;function qi(a,b){a.mc=b;a.nb=b;return a}m=pi.prototype;
m.Ea=function(a){this.nb.Ea(a);return this};m.ma=f("nb");m.jc=function(a,b){Ih(this,a,b)};m.Aa=function(a){this.nb.Ea(a);return this};m.ua=aa();m.Ba=function(a){return Y(this,a)};m.a=new t({Bo:0},!1,"scala.collection.mutable.GrowingBuilder",v,{Bo:1,d:1,Ia:1,Da:1,Ca:1});function ri(){}ri.prototype=new u;function si(){ti();return ui(0,16)}ri.prototype.kf=function(a,b){return P(ji(qd((new N).aa(b),(new N).aa(a))))};
function ui(a,b){var c=-1+b|0,c=c|c>>>1|0,c=c|c>>>2|0,c=c|c>>>4|0,c=c|c>>>8|0;return 1+(c|c>>>16|0)|0}ri.prototype.a=new t({Fo:0},!1,"scala.collection.mutable.HashTable$",v,{Fo:1,d:1});var vi=void 0;function ti(){vi||(vi=(new ri).c());return vi}function wi(){this.bc=null}wi.prototype=new u;function xi(){}m=xi.prototype=wi.prototype;m.c=function(){this.bc=(new Eh).c();return this};m.Ea=function(a){return yi(this,a)};
function yi(a,b){var c=a.bc;ud();var e=(new G).ca([b]),g=ud().va;Kh(c,lh(e,g));return a}m.jc=function(a,b){Ih(this,a,b)};m.Aa=function(a){return yi(this,a)};m.ua=aa();m.Ba=function(a){Kh(this.bc,a);return this};var zi=new t({tj:0},!1,"scala.collection.mutable.LazyBuilder",v,{tj:1,d:1,Ia:1,Da:1,Ca:1});wi.prototype.a=zi;function Ai(){this.nb=this.mc=null}Ai.prototype=new u;m=Ai.prototype;m.Ea=function(a){return Bi(this,a)};m.ma=f("nb");function Bi(a,b){a.nb=a.nb.zc(b);return a}
m.jc=function(a,b){Ih(this,a,b)};function Ci(a,b){a.mc=b;a.nb=b;return a}m.Aa=function(a){return Bi(this,a)};m.ua=aa();m.Ba=function(a){return Y(this,a)};m.a=new t({Oo:0},!1,"scala.collection.mutable.SetBuilder",v,{Oo:1,d:1,Ia:1,Da:1,Ca:1});function Pf(){}Pf.prototype=new u;Pf.prototype.a=new t({Ro:0},!1,"scala.collection.mutable.StringBuilder$",v,{Ro:1,d:1,g:1,f:1});var Of=void 0;function Di(){this.nb=this.qm=this.mh=null;this.fd=this.Wc=0}Di.prototype=new u;m=Di.prototype;
m.re=function(a){this.qm=this.mh=a;this.fd=this.Wc=0;return this};m.Ea=function(a){return Ei(this,a)};function Ei(a,b){var c=1+a.fd|0;if(a.Wc<c){for(var e=0===a.Wc?16:B(2,a.Wc);e<c;)e=B(2,e);c=e;a.nb=Fi(a,c);a.Wc=c}a.nb.Mc(a.fd,b);a.fd=1+a.fd|0;return a}
function Fi(a,b){var c=Gi(I(),a.mh);if(c===r(z)){var c=new Hi,e=p(y(z),[b]);c.i=e}else c===r(Va)?(c=new Ii,e=p(y(Va),[b]),c.i=e):c===r(Ua)?(c=new Ji,e=p(y(Ua),[b]),c.i=e):c===r(A)?(c=new Ki,e=p(y(A),[b]),c.i=e):c===r(Wa)?(c=new Li,e=p(y(Wa),[b]),c.i=e):c===r(Xa)?(c=new Mi,e=p(y(Xa),[b]),c.i=e):c===r(Ya)?(c=new Ni,e=p(y(Ya),[b]),c.i=e):c===r(Ta)?(c=new Oi,e=p(y(Ta),[b]),c.i=e):c===r(Sa)?(c=new Pi,e=p(y(ra),[b]),c.i=e):c=vd(new wd,a.mh.Xa(b));0<a.fd&&$(Q(),a.nb.i,0,c.i,0,a.fd);return c}
m.ma=function(){return 0!==this.Wc&&this.Wc===this.fd?this.nb:Fi(this,this.fd)};m.jc=function(a,b){Ih(this,a,b)};m.Aa=function(a){return Ei(this,a)};m.ua=function(a){this.Wc<a&&(this.nb=Fi(this,a),this.Wc=a)};m.Ba=function(a){return Y(this,a)};m.a=new t({So:0},!1,"scala.collection.mutable.WrappedArrayBuilder",v,{So:1,d:1,Ia:1,Da:1,Ca:1});function Sb(){}Sb.prototype=new u;Sb.prototype.a=new t({Wo:0},!1,"scala.scalajs.js.Dictionary$",v,{Wo:1,d:1});var Rb=void 0;
function Qi(){this.Md=!1;this.gi=this.Al=this.Nf=this.Pe=null;this.rg=!1;this.Bi=this.ki=0}Qi.prototype=new u;
Qi.prototype.c=function(){Ri=this;this.Pe=(this.Md=!!(n.ArrayBuffer&&n.Int32Array&&n.Float32Array&&n.Float64Array))?new n.ArrayBuffer(8):null;this.Nf=this.Md?new n.Int32Array(this.Pe,0,2):null;this.Al=this.Md?new n.Float32Array(this.Pe,0,2):null;this.gi=this.Md?new n.Float64Array(this.Pe,0,1):null;if(this.Md)this.Nf[0]=16909060,a=1===((new n.Int8Array(this.Pe,0,8))[0]|0);else var a=!0;this.ki=(this.rg=a)?0:1;this.Bi=this.rg?1:0;return this};
function Aa(a,b){var c=b|0;if(c===b&&-Infinity!==1/b)return c;if(a.Md)a.gi[0]=b,c=Si(Qc((new N).aa(a.Nf[a.ki]|0),32),yd((new N).Y(4194303,1023,0),(new N).aa(a.Nf[a.Bi]|0)));else{if(b!==b)var c=!1,e=2047,g=+n.Math.pow(2,51);else if(Infinity===b||-Infinity===b)c=0>b,e=2047,g=0;else if(0===b)c=-Infinity===1/b,g=e=0;else{var h=(c=0>b)?-b:b;if(h>=+n.Math.pow(2,-1022)){var e=+n.Math.pow(2,52),g=+n.Math.log(h)/0.6931471805599453,g=+n.Math.floor(g)|0,g=1023>g?g:1023,l=h/+n.Math.pow(2,g)*e,h=+n.Math.floor(l),
l=l-h,h=0.5>l?h:0.5<l?1+h:0!==h%2?1+h:h;2<=h/e&&(g=1+g|0,h=1);1023<g?(g=2047,h=0):(g=1023+g|0,h-=e);e=g;g=h}else e=h/+n.Math.pow(2,-1074),g=+n.Math.floor(e),h=e-g,e=0,g=0.5>h?g:0.5<h?1+g:0!==g%2?1+g:g}g=+ +g;h=g|0;c=Si(Qc((new N).aa((c?-2147483648:0)|(e|0)<<20|g/4294967296|0),32),yd((new N).Y(4194303,1023,0),(new N).aa(h)))}return P(Ti(c,Rc(c,32)))}Qi.prototype.a=new t({jp:0},!1,"scala.scalajs.runtime.Bits$",v,{jp:1,d:1});var Ri=void 0;function Ba(){Ri||(Ri=(new Qi).c());return Ri}
function Ui(){this.cq=this.bq=this.aq=this.$p=this.Zp=this.Yp=this.Xp=this.Up=this.Tp=this.Lp=this.Kp=this.Dp=this.Cp=this.Bp=0;this.Hh=this.ng=this.Kd=this.Ok=this.pg=this.tb=null}Ui.prototype=new u;Ui.prototype.c=function(){Vi=this;this.tb=(new N).Y(0,0,0);this.pg=(new N).Y(1,0,0);this.Ok=(new N).Y(4194303,4194303,1048575);this.Kd=(new N).Y(0,0,524288);this.ng=(new N).Y(4194303,4194303,524287);this.Hh=(new N).Y(1755648,238,0);return this};
function Wi(a,b){if(b!==b)return a.tb;if(-9223372036854775E3>b)return a.Kd;if(9223372036854775E3<=b)return a.ng;if(0>b)return Xi(Wi(a,-b));var c=b,e=17592186044416<=c?c/17592186044416|0:0,c=c-17592186044416*e,g=4194304<=c?c/4194304|0:0;return(new N).Y(c-4194304*g|0,g,e)}Ui.prototype.a=new t({kp:0},!1,"scala.scalajs.runtime.RuntimeLong$",v,{kp:1,d:1,g:1,f:1});var Vi=void 0;function s(){Vi||(Vi=(new Ui).c());return Vi}function Yi(){}Yi.prototype=new u;function Zi(a,b){return null===b?"null":ha(b)}
function gf(a,b,c){a=jf(c);return b.indexOf(a)|0}function jf(a){if(0===(-65536&a)){var b=n.String,c=b.fromCharCode;a=[a];a=[].concat(a);return c.apply(b,a)}if(0>a||1114111<a)throw(new F).c();a=-65536+a|0;b=n.String;c=b.fromCharCode;a=[55296|a>>10,56320|1023&a];a=[].concat(a);return c.apply(b,a)}function ya(a,b){for(var c=0,e=1,g=-1+(b.length|0)|0;0<=g;)c=c+B(65535&(b.charCodeAt(g)|0),e)|0,e=B(31,e),g=-1+g|0;return c}Yi.prototype.a=new t({lp:0},!1,"scala.scalajs.runtime.RuntimeString$",v,{lp:1,d:1});
var $i=void 0;function za(){$i||($i=(new Yi).c());return $i}function aj(){this.nq=!1;this.kl=this.Kh=this.ml=null;this.cb=!1}aj.prototype=new u;
aj.prototype.c=function(){bj=this;for(var a={O:"java_lang_Object",T:"java_lang_String",V:"scala_Unit",Z:"scala_Boolean",C:"scala_Char",B:"scala_Byte",S:"scala_Short",I:"scala_Int",J:"scala_Long",F:"scala_Float",D:"scala_Double"},b=0;22>=b;)2<=b&&(a["T"+b]="scala_Tuple"+b),a["F"+b]="scala_Function"+b,b=1+b|0;this.ml=a;this.Kh={sjsr_:"scala_scalajs_runtime_",sjs_:"scala_scalajs_",sci_:"scala_collection_immutable_",scm_:"scala_collection_mutable_",scg_:"scala_collection_generic_",sc_:"scala_collection_",
sr_:"scala_runtime_",s_:"scala_",jl_:"java_lang_",ju_:"java_util_"};this.kl=n.Object.keys(this.Kh);return this};aj.prototype.a=new t({mp:0},!1,"scala.scalajs.runtime.StackTrace$",v,{mp:1,d:1});var bj=void 0;function ve(){bj||(bj=(new aj).c());return bj}function cj(){}cj.prototype=new u;function ze(a,b){return ye(b)?b.ld:b}function we(a,b){return b&&b.a&&b.a.p.ya?b:(new dj).da(b)}cj.prototype.a=new t({np:0},!1,"scala.scalajs.runtime.package$",v,{np:1,d:1});var ej=void 0;
function xe(){ej||(ej=(new cj).c());return ej}function fj(){}fj.prototype=new u;function gj(){}gj.prototype=fj.prototype;fj.prototype.c=function(){return this};fj.prototype.v=k("\x3cfunction0\x3e");var hj=new t({hh:0},!1,"scala.runtime.AbstractFunction0",v,{hh:1,d:1,vh:1});fj.prototype.a=hj;function ij(){}ij.prototype=new u;function jj(){}jj.prototype=ij.prototype;ij.prototype.v=k("\x3cfunction1\x3e");var kj=new t({ih:0},!1,"scala.runtime.AbstractFunction1",v,{ih:1,d:1,w:1});ij.prototype.a=kj;
function lj(){this.$=!1}lj.prototype=new u;lj.prototype.v=function(){return""+this.$};function mj(){var a=new lj;a.$=!0;return a}lj.prototype.a=new t({op:0},!1,"scala.runtime.BooleanRef",v,{op:1,d:1,f:1});function nj(a){return!!(a&&a.a&&1===a.a.Qe&&a.a.Oe.p.Hj)}var ra=new t({Hj:0},!1,"scala.runtime.BoxedUnit",v,{Hj:1,d:1},function(a){return void 0===a});function oj(){}oj.prototype=new u;
function S(a,b,c){return b===c?!0:ge(b)?ge(c)?pj(b,c):Yd(c)?"number"===typeof b?+b===c.Ja:ua(b)?Ga(Na(b),(new N).aa(c.Ja)):null===b?null===c:wa(b,c):null===b?null===c:wa(b,c):Yd(b)?Yd(c)?b.Ja===c.Ja:ge(c)?"number"===typeof c?+c===b.Ja:ua(c)?Ga(Na(c),(new N).aa(b.Ja)):null===c?null===b:wa(c,b):null===b&&null===c:null===b?null===c:wa(b,c)}
function pj(a,b){if("number"===typeof a){var c=+a;if("number"===typeof b)return c===+b;if(ua(b)){var e=Na(b);return c===qj(e)}return b&&b.a&&b.a.p.Lm?b.ia(c):!1}return ua(a)?(c=Na(a),ua(b)?(e=Na(b),Ga(c,e)):"number"===typeof b?(e=+b,qj(c)===e):b&&b.a&&b.a.p.Lm?b.ia(c):!1):null===a?null===b:wa(a,b)}function rj(a,b){return null===b?0:b.Ja}oj.prototype.a=new t({pp:0},!1,"scala.runtime.BoxesRunTime$",v,{pp:1,d:1});var sj=void 0;function T(){sj||(sj=(new oj).c());return sj}function Rg(){this.$=0}
Rg.prototype=new u;Rg.prototype.v=function(){return""+this.$};Rg.prototype.aa=function(a){this.$=a;return this};Rg.prototype.a=new t({qp:0},!1,"scala.runtime.IntRef",v,{qp:1,d:1,f:1});var eg=new t({sp:0},!1,"scala.runtime.Null$",v,{sp:1,d:1});function tj(){this.$=null}tj.prototype=new u;tj.prototype.v=function(){return Zi(za(),this.$)};tj.prototype.da=function(a){this.$=a;return this};tj.prototype.a=new t({tp:0},!1,"scala.runtime.ObjectRef",v,{tp:1,d:1,f:1});function uj(){}uj.prototype=new u;
function ah(a,b){if(jb(b,1)||cb(b,1)||fb(b,1)||db(b,1)||eb(b,1)||$a(b,1)||ab(b,1)||bb(b,1)||Za(b,1)||nj(b))return b.b.length;if(null===b)throw(new ta).c();throw(new L).da(b);}function Nb(a,b){var c;if(null===b)c=0;else if(ge(b))if(T(),(b|0)===b&&1/b!==1/-0)c=b|0;else if(ua(b))c=P(Na(b)),c=Ga((new N).aa(c),Na(b))?c:P(Ti(Na(b),Rc(Na(b),32)));else if("number"===typeof b){var e=+b|0;c=+b;e===c?c=e:(e=Wi(s(),+b),c=qj(e)===c?P(Ti(e,Rc(e,32))):Aa(Ba(),+b))}else c=xa(b);else c=xa(b);return c}
function hh(a,b,c,e){if(jb(b,1))b.b[c]=e;else if(cb(b,1))b.b[c]=e|0;else if(fb(b,1))b.b[c]=+e;else if(db(b,1))b.b[c]=Na(e);else if(eb(b,1))b.b[c]=na(e);else if($a(b,1))b.b[c]=rj(T(),e);else if(ab(b,1))b.b[c]=e|0;else if(bb(b,1))b.b[c]=e|0;else if(Za(b,1))b.b[c]=!!e;else if(nj(b))b.b[c]=e;else{if(null===b)throw(new ta).c();throw(new L).da(b);}}
function Gi(a,b){if(b&&b.a&&b.a.p.xi)return b.lc.getComponentType();if(b&&b.a&&b.a.p.ob)return b.Db();throw(new Sd).s(tb(ub((new G).ca(["unsupported schematic "," (",")"])),(new G).ca([b,ia(b)])));}function xd(a){I();var b=a.wd();return eh(b,a.cd()+"(",",",")")}uj.prototype.a=new t({up:0},!1,"scala.runtime.ScalaRunTime$",v,{up:1,d:1});var vj=void 0;function I(){vj||(vj=(new uj).c());return vj}function wj(){}wj.prototype=new u;
wj.prototype.Qf=function(a,b){var c;c=B(-862048943,b);c=$d(U(),c,15);c=B(461845907,c);return a^c};wj.prototype.Zc=function(a,b){var c=this.Qf(a,b),c=$d(U(),c,13);return-430675100+B(5,c)|0};function Bd(a,b){return P(b)}wj.prototype.md=function(a,b){var c=a^b,c=B(-2048144789,c^(c>>>16|0)),c=c^(c>>>13|0),c=B(-1028477387,c);return c^=c>>>16|0};wj.prototype.a=new t({wp:0},!1,"scala.runtime.Statics$",v,{wp:1,d:1});var xj=void 0;function Ad(){xj||(xj=(new wj).c());return xj}function yj(){this.Fi=null}
yj.prototype=new pb;function zj(){}zj.prototype=yj.prototype;yj.prototype.Ig=function(a){this.Fi=a;return this};var Aj=new t({jg:0},!1,"java.io.FilterOutputStream",qb,{jg:1,He:1,d:1,xf:1,yf:1});yj.prototype.a=Aj;function Cb(){rb.call(this);this.pc=null;this.Fd=0;this.Uj=null}Cb.prototype=new sb;function Bj(){}Bj.prototype=Cb.prototype;
Cb.prototype.ia=function(a){if(a&&a.a&&a.a.p.kg){a:if(this===a)a=0;else{for(var b=this.k,c=this.W-this.k|0,e=a.k,g=a.W-a.k|0,h=c<g?c:g,l=0;l!==h;){var q=nc(this),w=nc(a),q=Ca(q,w);if(0!==q){D(this,b);D(a,e);a=q;break a}l=1+l|0}D(this,b);D(a,e);a=c===g?0:c<g?-1:1}a=0===a}else a=!1;return a};Cb.prototype.Gl=function(a,b,c){this.pc=b;this.Fd=c;rb.prototype.aa.call(this,a);Ib||(Ib=(new Hb).c());this.Uj=Ib.th;return this};
Cb.prototype.sa=function(){for(var a=this.k,b=this.W,c=-547316498,e=a;e!==b;)c=Sg().Zc(c,nc(this)),e=1+e|0;D(this,a);return Sg().md(c,b-a|0)};var Cj=new t({kg:0},!1,"java.nio.ByteBuffer",wb,{kg:1,Ie:1,d:1,Qa:1});Cb.prototype.a=Cj;function Dj(){rb.call(this);this.pc=null;this.Fd=0}Dj.prototype=new sb;function Ej(){}m=Ej.prototype=Dj.prototype;
m.ia=function(a){if(a&&a.a&&a.a.p.lg){a:if(this===a)a=0;else{for(var b=this.k,c=this.W-this.k|0,e=a.k,g=a.W-a.k|0,h=c<g?c:g,l=0;l!==h;){var q=Fj(this),q=(new Xd).od(q),w=Fj(a),w=(new Xd).od(w),q=q.Ja-w.Ja|0;if(0!==q){D(this,b);D(a,e);a=q;break a}l=1+l|0}D(this,b);D(a,e);a=c===g?0:c<g?-1:1}a=0===a}else a=!1;return a};m.aa=function(a){Dj.prototype.Hl.call(this,a,null,-1);return this};m.l=function(){return this.W-this.k|0};m.Hl=function(a,b,c){this.pc=b;this.Fd=c;rb.prototype.aa.call(this,a);return this};
m.sa=function(){for(var a=this.k,b=this.W,c=-182887236,e=a;e!==b;)c=Sg().Zc(c,Fj(this)),e=1+e|0;D(this,a);return Sg().md(c,b-a|0)};m.vg=function(a){a=this.k+a|0;if(0>a||a>=this.W)throw(new H).c();return Ia(this.Ee,this.Fe+a|0)};var Gj=new t({lg:0},!1,"java.nio.CharBuffer",wb,{lg:1,Ie:1,d:1,Qa:1,Pf:1,Of:1,im:1});Dj.prototype.a=Gj;function Fc(){return n.jQuery}function Gc(){}Gc.prototype=new gj;
function Hj(){Hc();Fc().material.init();Hc();return Fc()("#generateForm").submit(function(a){return function(b){return a.o(b)}}(new Ij))}Gc.prototype.Me=function(){return Hj()};Gc.prototype.a=new t({zk:0},!1,"parolamea.ParolaMea$$anonfun$main$1",hj,{zk:1,hh:1,d:1,vh:1,g:1,f:1});function Ij(){}Ij.prototype=new jj;Ij.prototype.o=function(a){return Jj(a)};
function Jj(a){function b(a){return tb(ub((new G).ca(["\x3cspan\x3e","\x3c/span\x3e"])),(new G).ca([a]))}a.preventDefault();td();Hc();a=Fc()("#inputMasterKey").val();Hc();a=md(a);var c=ud().va;if(c===ud().va)if(a===Ef())a=Ef();else{var c=a.pa(),e=c=Kj(new Lj,b(c),Ef());for(a=a.na();a!==Ef();){var g=a.pa(),g=Kj(new Lj,b(g),Ef()),e=e.Be=g;a=a.na()}a=c}else{for(c=Mj(a,c);!a.t();)e=a.pa(),c.Aa(b(e)),a=a.na();a=c.ma()}a=a.jf();Hc();Fc()("#generate-dialog .modal-body").html(a);Hc();return Fc()("#generate-dialog").modal("toggle")}
Ij.prototype.a=new t({Ak:0},!1,"parolamea.ParolaMea$$anonfun$main$1$$anonfun$apply$1",kj,{Ak:1,ih:1,d:1,w:1,g:1,f:1});function nd(){Ic.call(this);this.Xd=this.Wd=this.Vd=this.Ud=this.Td=this.Sd=this.Rd=this.Qd=0}nd.prototype=new Jc;nd.prototype.c=function(){Ic.prototype.Kl.call(this,"sha-256",32,Pc().Qg);return this};
function Oc(a,b,c){for(var e=Pc(),g=a.Qd,h=a.Rd,l=a.Sd,q=a.Td,w=a.Ud,J=a.Vd,C=a.Wd,O=a.Xd,x=g,E=h,sa=l,Ka=q,Oa=w,mg=J,ng=C,Nj=O,Z=0,ib=0,Fb=0,Z=0;16>Z;)e.Cd.b[Z]=b.b[c]<<24|(255&b.b[1+c|0])<<16|(255&b.b[2+c|0])<<8|255&b.b[3+c|0],c=4+c|0,Z=1+Z|0;for(Z=16;64>Z;)ib=e.Cd.b[-2+Z|0],Fb=e.Cd.b[-15+Z|0],e.Cd.b[Z]=((((ib>>>17|0|ib<<15)^(ib>>>19|0|ib<<13)^(ib>>>10|0))+e.Cd.b[-7+Z|0]|0)+((Fb>>>7|0|Fb<<25)^(Fb>>>18|0|Fb<<14)^(Fb>>>3|0))|0)+e.Cd.b[-16+Z|0]|0,Z=1+Z|0;for(Z=0;64>Z;)ib=(((Nj+((Oa>>>6|0|Oa<<26)^(Oa>>>
11|0|Oa<<21)^(Oa>>>25|0|Oa<<7))|0)+(Oa&mg^~Oa&ng)|0)+e.Ai.b[Z]|0)+e.Cd.b[Z]|0,Fb=((x>>>2|0|x<<30)^(x>>>13|0|x<<19)^(x>>>22|0|x<<10))+(x&E^x&sa^E&sa)|0,Nj=ng,ng=mg,mg=Oa,Oa=Ka+ib|0,Ka=sa,sa=E,E=x,x=ib+Fb|0,Z=1+Z|0;b=Sc(Q(),(new G).ca([g+x|0,h+E|0,l+sa|0,q+Ka|0,w+Oa|0,J+mg|0,C+ng|0,O+Nj|0]),R().Ac);a.Qd=b.b[0];a.Rd=b.b[1];a.Sd=b.b[2];a.Td=b.b[3];a.Ud=b.b[4];a.Vd=b.b[5];a.Wd=b.b[6];a.Xd=b.b[7]}
function Kc(a){a.Qd=1779033703;a.Rd=-1150833019;a.Sd=1013904242;a.Td=-1521486534;a.Ud=1359893119;a.Vd=-1694144372;a.Wd=528734635;a.Xd=1541459225}nd.prototype.a=new t({Fk:0},!1,"parolamea.generator.SHA256",Vc,{Fk:1,Ah:1,d:1,Bh:1,Ra:1,Pa:1});var ka=new t({Wl:0},!1,"java.lang.Byte",he,{Wl:1,Xc:1,d:1,Qa:1},function(a){return a<<24>>24===a&&1/a!==1/-0}),pa=new t({Yl:0},!1,"java.lang.Double",he,{Yl:1,Xc:1,d:1,Qa:1},function(a){return"number"===typeof a});function Oj(){V.call(this)}Oj.prototype=new ue;
function Pj(){}Pj.prototype=Oj.prototype;Oj.prototype.Ml=function(a){Oj.prototype.rc.call(this,null,a);return this};Oj.prototype.s=function(a){Oj.prototype.rc.call(this,a,null);return this};var Qj=new t({Lg:0},!1,"java.lang.Error",Ae,{Lg:1,ya:1,d:1,f:1});Oj.prototype.a=Qj;function Rj(){V.call(this)}Rj.prototype=new ue;function Sj(){}Sj.prototype=Rj.prototype;var Tj=new t({gb:0},!1,"java.lang.Exception",Ae,{gb:1,ya:1,d:1,f:1});Rj.prototype.a=Tj;
var oa=new t({$l:0},!1,"java.lang.Float",he,{$l:1,Xc:1,d:1,Qa:1},function(a){return a!==a||na(a)===a});function Jg(){re.call(this)}Jg.prototype=new se;function Uj(){}Uj.prototype=Jg.prototype;var Vj=new t({yi:0},!1,"java.lang.InheritableThreadLocal",te,{yi:1,Ng:1,d:1});Jg.prototype.a=Vj;var ma=new t({cm:0},!1,"java.lang.Integer",he,{cm:1,Xc:1,d:1,Qa:1},function(a){return(a|0)===a&&1/a!==1/-0});function Wj(){}Wj.prototype=new pb;
Wj.prototype.a=new t({fm:0},!1,"java.lang.JSConsoleBasedPrintStream$DummyOutputStream",qb,{fm:1,He:1,d:1,xf:1,yf:1});var va=new t({gm:0},!1,"java.lang.Long",he,{gm:1,Xc:1,d:1,Qa:1},function(a){return ua(a)}),la=new t({jm:0},!1,"java.lang.Short",he,{jm:1,Xc:1,d:1,Qa:1},function(a){return a<<16>>16===a&&1/a!==1/-0});function Xj(){this.vl=this.wl=this.ul=this.tl=this.sl=this.rl=this.ql=this.pl=this.ol=null}Xj.prototype=new Le;
Xj.prototype.c=function(){Yj=this;this.ol=p(y(Ta),[0]);this.pl=p(y(z),[0]);this.ql=p(y(Ua),[0]);this.rl=p(y(Ya),[0]);this.sl=p(y(Xa),[0]);this.tl=p(y(A),[0]);this.ul=p(y(Wa),[0]);this.wl=p(y(Va),[0]);this.vl=p(y(v),[0]);return this};function Sc(a,b,c){a=c.Xa(b.l());c=c=0;for(b=b.fa();b.ja();){var e=b.ga();hh(I(),a,c,e);c=1+c|0}return a}function Gd(a,b,c){a=p(y(A),[1+c.l()|0]);a.b[0]=b;b=0;b=1;for(c=c.fa();c.ja();){var e=c.ga()|0;a.b[b]=e;b=1+b|0}return a}
function $(a,b,c,e,g,h){a=ia(b);var l;if(l=!!a.lc.isArrayClass)l=ia(e),l.lc.isPrimitive||a.lc.isPrimitive?a=l===a||(l===r(Va)?a===r(z):l===r(A)?a===r(z)||a===r(Va):l===r(Xa)?a===r(z)||a===r(Va)||a===r(A):l===r(Ya)&&(a===r(z)||a===r(Va)||a===r(A)||a===r(Xa))):(a=a.lc.getFakeInstance(),a=!!l.lc.isInstance(a)),l=a;if(l)La(b,c,e,g,h);else for(a=c,c=c+h|0;a<c;){I();h=e;l=g;var q;I();q=b;var w=a;if(jb(q,1)||cb(q,1)||fb(q,1)||db(q,1)||eb(q,1))q=q.b[w];else if($a(q,1))q=(new Xd).od(q.b[w]);else if(ab(q,1)||
bb(q,1)||Za(q,1)||nj(q))q=q.b[w];else{if(null===q)throw(new ta).c();throw(new L).da(q);}hh(0,h,l,q);a=1+a|0;g=1+g|0}}function oc(){Q();var a=(new G).ca([]),b=p(y(z),[1+a.l()|0]);b.b[0]=63;for(var c=0,c=1,a=a.fa();a.ja();){var e=a.ga()|0;b.b[c]=e;c=1+c|0}return b}Xj.prototype.a=new t({tm:0},!1,"scala.Array$",Me,{tm:1,Mi:1,d:1,g:1,f:1});var Yj=void 0;function Q(){Yj||(Yj=(new Xj).c());return Yj}function Zj(){this.Dl=this.xl=this.Gi=null}Zj.prototype=new Ie;
Zj.prototype.c=function(){ak=this;this.Gi=(new Hg).da(qe().Ei);this.xl=(new Hg).da(qe().di);this.Dl=(new Hg).da(null);return this};Zj.prototype.a=new t({vm:0},!1,"scala.Console$",Je,{vm:1,Li:1,d:1,tq:1});var ak=void 0;function bk(){}bk.prototype=new Re;m=bk.prototype;m.cd=k("None");m.ad=k(0);m.t=k(!0);m.Kf=function(){throw(new ck).s("None.get");};m.bd=function(a){throw(new H).s(""+a);};m.v=k("None");m.sa=k(2433880);m.wd=function(){return Cd(this)};
m.a=new t({xm:0},!1,"scala.None$",Se,{xm:1,Sg:1,d:1,dd:1,m:1,g:1,f:1});var dk=void 0;function Kd(){dk||(dk=(new bk).c());return dk}function ek(){this.En=this.Uo=this.al=this.Qk=this.Mk=this.Vj=this.Yk=this.Nk=null}ek.prototype=new Oe;ek.prototype.c=function(){fk=this;xf||(xf=(new wf).c());ud();gk||(gk=(new hk).c());this.Nk=gk;this.Yk=ik();this.Vj=fg().uh;this.Mk=fg().sb;Eg||(Eg=(new Dg).c());this.Qk=Eg;this.al=(new Te).c();this.Uo=(new jk).c();this.En=(new kk).c();return this};
function Td(a,b){if(!b)throw(new Vd).da("assertion failed");}ek.prototype.a=new t({ym:0},!1,"scala.Predef$",Pe,{ym:1,Ni:1,d:1,qq:1});var fk=void 0;function Ud(){fk||(fk=(new ek).c());return fk}function jk(){}jk.prototype=new Ze;jk.prototype.o=function(a){return a};jk.prototype.a=new t({zm:0},!1,"scala.Predef$$anon$1",$e,{zm:1,Pi:1,d:1,w:1,g:1,f:1});function kk(){}kk.prototype=new We;kk.prototype.o=function(a){return a};
kk.prototype.a=new t({Am:0},!1,"scala.Predef$$anon$2",Xe,{Am:1,Oi:1,d:1,w:1,g:1,f:1});function Jd(){this.Dd=null}Jd.prototype=new Re;m=Jd.prototype;m.cd=k("Some");m.ad=k(1);m.ia=function(a){return this===a?!0:Ld(a)?S(T(),this.Dd,a.Dd):!1};m.t=k(!1);m.bd=function(a){switch(a){case 0:return this.Dd;default:throw(new H).s(""+a);}};m.Kf=f("Dd");m.v=function(){return xd(this)};m.da=function(a){this.Dd=a;return this};m.sa=function(){return Wd(this)};m.wd=function(){return Cd(this)};
function Ld(a){return!!(a&&a.a&&a.a.p.Qi)}m.a=new t({Qi:0},!1,"scala.Some",Se,{Qi:1,Sg:1,d:1,dd:1,m:1,g:1,f:1});function hg(a,b){return b.lc.isArrayClass?tb(ub((new G).ca(["Array[","]"])),(new G).ca([hg(a,Gi(I(),b))])):hb(b)}function qg(){W.call(this)}qg.prototype=new Yf;qg.prototype.c=function(){W.prototype.s.call(this,"Long");return this};qg.prototype.Xa=function(a){return p(y(Wa),[a])};qg.prototype.Db=function(){return r(Wa)};
qg.prototype.a=new t({Tm:0},!1,"scala.reflect.ManifestFactory$$anon$10",Zf,{Tm:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function rg(){W.call(this)}rg.prototype=new Yf;rg.prototype.c=function(){W.prototype.s.call(this,"Float");return this};rg.prototype.Xa=function(a){return p(y(Xa),[a])};rg.prototype.Db=function(){return r(Xa)};rg.prototype.a=new t({Um:0},!1,"scala.reflect.ManifestFactory$$anon$11",Zf,{Um:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function sg(){W.call(this)}sg.prototype=new Yf;
sg.prototype.c=function(){W.prototype.s.call(this,"Double");return this};sg.prototype.Xa=function(a){return p(y(Ya),[a])};sg.prototype.Db=function(){return r(Ya)};sg.prototype.a=new t({Vm:0},!1,"scala.reflect.ManifestFactory$$anon$12",Zf,{Vm:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function tg(){W.call(this)}tg.prototype=new Yf;tg.prototype.c=function(){W.prototype.s.call(this,"Boolean");return this};tg.prototype.Xa=function(a){return p(y(Ta),[a])};tg.prototype.Db=function(){return r(Ta)};
tg.prototype.a=new t({Wm:0},!1,"scala.reflect.ManifestFactory$$anon$13",Zf,{Wm:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function ug(){W.call(this)}ug.prototype=new Yf;ug.prototype.c=function(){W.prototype.s.call(this,"Unit");return this};ug.prototype.Xa=function(a){return p(y(ra),[a])};ug.prototype.Db=function(){return r(Sa)};ug.prototype.a=new t({Xm:0},!1,"scala.reflect.ManifestFactory$$anon$14",Zf,{Xm:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function kg(){W.call(this)}kg.prototype=new Yf;
kg.prototype.c=function(){W.prototype.s.call(this,"Byte");return this};kg.prototype.Xa=function(a){return p(y(z),[a])};kg.prototype.Db=function(){return r(z)};kg.prototype.a=new t({bn:0},!1,"scala.reflect.ManifestFactory$$anon$6",Zf,{bn:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function lg(){W.call(this)}lg.prototype=new Yf;lg.prototype.c=function(){W.prototype.s.call(this,"Short");return this};lg.prototype.Xa=function(a){return p(y(Va),[a])};lg.prototype.Db=function(){return r(Va)};
lg.prototype.a=new t({cn:0},!1,"scala.reflect.ManifestFactory$$anon$7",Zf,{cn:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function og(){W.call(this)}og.prototype=new Yf;og.prototype.c=function(){W.prototype.s.call(this,"Char");return this};og.prototype.Xa=function(a){return p(y(Ua),[a])};og.prototype.Db=function(){return r(Ua)};og.prototype.a=new t({dn:0},!1,"scala.reflect.ManifestFactory$$anon$8",Zf,{dn:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function pg(){W.call(this)}pg.prototype=new Yf;
pg.prototype.c=function(){W.prototype.s.call(this,"Int");return this};pg.prototype.Xa=function(a){return p(y(A),[a])};pg.prototype.Db=function(){return r(A)};pg.prototype.a=new t({en:0},!1,"scala.reflect.ManifestFactory$$anon$9",Zf,{en:1,Lc:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function lk(){Ag.call(this);this.Mj=null;this.ii=0}lk.prototype=new Bg;function mk(){}mk.prototype=lk.prototype;lk.prototype.ia=function(a){return this===a};lk.prototype.v=f("Mj");lk.prototype.sa=f("ii");
lk.prototype.ef=function(a,b){this.Mj=b;Ag.prototype.Nl.call(this,Kd(),a,Ef());this.ii=Ma(this);return this};var nk=new t({ve:0},!1,"scala.reflect.ManifestFactory$PhantomManifest",Cg,{ve:1,ae:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});lk.prototype.a=nk;function Lg(){V.call(this)}Lg.prototype=new ue;Lg.prototype.c=function(){V.prototype.c.call(this);return this};Lg.prototype.Hf=function(){Ng||(Ng=(new Mg).c());return Ng.sh?V.prototype.Hf.call(this):this};
Lg.prototype.a=new t({nn:0},!1,"scala.util.control.BreakControl",Ae,{nn:1,ya:1,d:1,f:1,xq:1,yq:1});function ok(){this.fh=this.Ci=this.eh=this.Tq=this.Qq=this.pq=this.Pq=this.gq=0}ok.prototype=new Pg;ok.prototype.c=function(){pk=this;this.eh=ya(za(),"Seq");this.Ci=ya(za(),"Map");this.fh=ya(za(),"Set");return this};function qk(a,b){var c;if(b&&b.a&&b.a.p.ag){c=0;for(var e=a.eh,g=b;!g.t();){var h=g.pa(),g=g.na(),e=a.Zc(e,Nb(I(),h));c=1+c|0}c=a.md(e,c)}else c=Tg(a,b,a.eh);return c}
ok.prototype.a=new t({qn:0},!1,"scala.util.hashing.MurmurHash3$",Ug,{qn:1,Si:1,d:1});var pk=void 0;function Sg(){pk||(pk=(new ok).c());return pk}function rk(){}rk.prototype=new kh;function sk(){}m=sk.prototype=rk.prototype;m.ed=function(a){return tk(this,a)};m.df=function(a){var b=this.fa();return uk(b,a)};m.ka=function(a){var b=this.fa();bh(b,a)};m.Wb=function(){return this.fa().Wb()};m.Fc=function(a,b,c){vk(this,a,b,c)};
var wk=new t({N:0},!1,"scala.collection.AbstractIterable",mh,{N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1});rk.prototype.a=wk;function xk(a,b){var c;if(b&&b.a&&b.a.p.xb){if(!(c=a===b)&&(c=a.ha()===b.ha()))try{c=a.lh(b)}catch(e){if(e&&e.a&&e.a.p.Xl)c=!1;else throw e;}}else c=!1;return c}function yk(){this.Wa=null}yk.prototype=new uh;yk.prototype.c=function(){th.prototype.ff.call(this,dd());return this};yk.prototype.Ld=function(){dd();cd();ed();return(new fd).c()};
yk.prototype.a=new t({vn:0},!1,"scala.collection.IndexedSeq$$anon$1",vh,{vn:1,Yf:1,d:1,qf:1});function zk(){this.pe=this.Cg=0;this.Wa=null}zk.prototype=new $g;zk.prototype.ga=function(){this.pe>=this.Cg&&Df().mc.ga();var a=this.Wa.Ta(this.pe);this.pe=1+this.pe|0;return a};function Ak(a,b,c){a.Cg=c;if(null===b)throw ze(xe(),null);a.Wa=b;a.pe=0;return a}zk.prototype.ja=function(){return this.pe<this.Cg};
zk.prototype.a=new t({wn:0},!1,"scala.collection.IndexedSeqLike$Elements",ih,{wn:1,Tb:1,d:1,dc:1,r:1,q:1,zq:1,g:1,f:1});function Bk(a){var b=(new Ck).aa(a.ha());a=a.Va();Dk(b,a);return b}function Ek(a,b,c,e){var g=0,h=c,l=a.l();e=l<e?l:e;c=ah(I(),b)-c|0;for(c=e<c?e:c;g<c;)hh(I(),b,h,a.Ta(g)),g=1+g|0,h=1+h|0}function Fk(a,b){if(b&&b.a&&b.a.p.Pb){var c=a.l();if(c===b.l()){for(var e=0;e<c&&S(T(),a.Ta(e),b.Ta(e));)e=1+e|0;return e===c}return!1}return tk(a,b)}
function Gk(a,b){for(var c=0,e=a.l();c<e;)b.o(a.Ta(c)),c=1+c|0}function vk(a,b,c,e){var g=c;c=c+e|0;e=ah(I(),b);c=c<e?c:e;for(a=a.fa();g<c&&a.ja();)hh(I(),b,g,a.ga()),g=1+g|0}function tk(a,b){for(var c=a.fa(),e=b.fa();c.ja()&&e.ja();)if(!S(T(),c.ga(),e.ga()))return!1;return!c.ja()&&!e.ja()}function Hk(){this.fi=this.Lb=null}Hk.prototype=new $g;Hk.prototype.ga=function(){return this.fi.o(this.Lb.ga())};function Ik(a,b,c){if(null===b)throw ze(xe(),null);a.Lb=b;a.fi=c;return a}Hk.prototype.ja=function(){return this.Lb.ja()};
Hk.prototype.a=new t({zn:0},!1,"scala.collection.Iterator$$anon$11",ih,{zn:1,Tb:1,d:1,dc:1,r:1,q:1});function ph(){}ph.prototype=new $g;ph.prototype.ga=function(){throw(new ck).s("next on empty iterator");};ph.prototype.ja=k(!1);ph.prototype.a=new t({An:0},!1,"scala.collection.Iterator$$anon$2",ih,{An:1,Tb:1,d:1,dc:1,r:1,q:1});function fh(a){if(a.ja()){var b=a.ga();return Jk(new Kk,b,Lk(function(a){return function(){return a.Wb()}}(a)))}Lf();return Mk()}function bh(a,b){for(;a.ja();)b.o(a.ga())}
function uk(a,b){for(var c=!0;c&&a.ja();)c=!!b.o(a.ga());return c}function Nk(){this.Lb=this.rb=null}Nk.prototype=new $g;Nk.prototype.ga=function(){if(this.ja()){var a=this.rb.pa();this.rb=this.rb.na();return a}return Df().mc.ga()};Nk.prototype.ja=function(){return!this.rb.t()};Nk.prototype.a=new t({Bn:0},!1,"scala.collection.LinearSeqLike$$anon$1",ih,{Bn:1,Tb:1,d:1,dc:1,r:1,q:1});function Ok(a,b){var c=a.bi(b);if(0>b||c.t())throw(new H).s(""+b);return c.pa()}
function Pk(a,b){var c=0;for(;;){if(c===b)return a.t()?0:1;if(a.t())return-1;var c=1+c|0,e=a.na();a=e}}function Qk(a,b){if(b&&b.a&&b.a.p.be){for(var c=a,e=b;!c.t()&&!e.t()&&S(T(),c.pa(),e.pa());)c=c.na(),e=e.na();return c.t()&&e.t()}return tk(a,b)}function Rk(a,b,c,e,g){var h=a.fa();a=Ik(new Hk,h,Vb(function(){return function(a){if(null!==a){var b=a.kc;a=a.Xb;bf||(bf=(new af).c());return""+(""+Zi(za(),b)+" -\x3e ")+a}throw(new L).da(a);}}(a)));return gh(a,b,c,e,g)}
function Fh(a){var b=Ef(),c=(new tj).da(b);a.ka(Vb(function(a,b){return function(a){b.$=Kj(new Lj,a,b.$)}}(a,c)));b=a.la();lb(a)&&b.ua(a.ha());for(a=c.$;!a.t();)c=a.pa(),b.Aa(c),a=a.na();return b.ma()}function Sk(a){var b=(new Ck).aa(a.ha());a=a.Va();Dk(b,a);return b}function lh(a,b){var c=b.Ld();lb(a)&&c.ua(a.ha());c.Ba(a.Cb());return c.ma()}function Tk(a){return a.te(a.xc()+"(",", ",")")}
function Uk(a,b,c){c=c.Ne(a.Rg());a.ka(Vb(function(a,b,c){return function(a){return b.Ba(c.o(a).Va())}}(a,c,b)));return c.ma()}function Mj(a,b){var c=b.Ne(a.Rg());lb(a)&&c.ua(a.ha());return c}function gh(a,b,c,e,g){var h=mj();Vk(b,c);a.ka(Vb(function(a,b,c,e){return function(a){if(b.$)Wk(c,a),b.$=!1;else return Vk(c,e),Wk(c,a)}}(a,h,b,e)));Vk(b,g);return b}function id(a,b){if(a.qi()){var c=b.Xa(a.ha());a.xg(c,0);return c}return a.yc().Kj(b)}
function eh(a,b,c,e){return a.Le((new Ue).c(),b,c,e).Rb.lb}function dh(a){var b=(new Rg).aa(0);a.ka(Vb(function(a,b){return function(){b.$=1+b.$|0}}(a,b)));return b.$}function Xk(){}Xk.prototype=new xh;function Yk(){}Yk.prototype=Xk.prototype;var Zk=new t({yd:0},!1,"scala.collection.generic.GenSetFactory",yh,{yd:1,ra:1,d:1});Xk.prototype.a=Zk;function $k(){this.va=null}$k.prototype=new xh;function al(){}al.prototype=$k.prototype;$k.prototype.c=function(){this.va=(new bl).ff(this);return this};
var cl=new t({ib:0},!1,"scala.collection.generic.GenTraversableFactory",yh,{ib:1,ra:1,d:1});$k.prototype.a=cl;function bl(){this.Lb=this.Wa=null}bl.prototype=new uh;bl.prototype.Ld=function(){return this.Lb.la()};bl.prototype.ff=function(a){if(null===a)throw ze(xe(),null);this.Lb=a;th.prototype.ff.call(this,a);return this};bl.prototype.a=new t({Hn:0},!1,"scala.collection.generic.GenTraversableFactory$$anon$1",vh,{Hn:1,Yf:1,d:1,qf:1});
function dl(a,b){a:b:for(;;){if(!b.t()){a.Ea(b.pa());b=b.na();continue b}break a}}function Y(a,b){b&&b.a&&b.a.p.be?dl(a,b):b.ka(Vb(function(a){return function(b){return a.Ea(b)}}(a)));return a}function el(){}el.prototype=new rh;function fl(){}fl.prototype=el.prototype;var gl=new t({Xg:0},!1,"scala.collection.generic.MapFactory",sh,{Xg:1,Xf:1,d:1});el.prototype.a=gl;function hl(){this.je=null}hl.prototype=new $g;hl.prototype.ga=function(){if(!this.je.t()){var a=this.je.pa();this.je=this.je.Ij();return a}return Df().mc.ga()};
hl.prototype.se=function(a){this.je=a;return this};hl.prototype.ja=function(){return!this.je.t()};hl.prototype.a=new t({Un:0},!1,"scala.collection.immutable.ListSet$$anon$1",ih,{Un:1,Tb:1,d:1,dc:1,r:1,q:1});function il(){this.bc=null}il.prototype=new xi;il.prototype.ma=function(){return jl(this)};function jl(a){return kl(a.bc.ta.Wb(),Vb(function(){return function(a){return a.Wb()}}(a)))}function ll(a){return!!(a&&a.a&&a.a.p.dj)}
il.prototype.a=new t({dj:0},!1,"scala.collection.immutable.Stream$StreamBuilder",zi,{dj:1,tj:1,d:1,Ia:1,Da:1,Ca:1});function ml(){this.Wa=null}ml.prototype=new uh;ml.prototype.c=function(){th.prototype.ff.call(this,Lf());return this};ml.prototype.a=new t({mo:0},!1,"scala.collection.immutable.Stream$StreamCanBuildFrom",vh,{mo:1,Yf:1,d:1,qf:1});function nl(){this.rb=null}nl.prototype=new $g;
nl.prototype.ga=function(){if(!this.ja())return Df().mc.ga();var a=this.rb.cb?this.rb.Bd:Oh(this.rb),b=a.pa();this.rb=Nh(new Mh,this,Lk(function(a,b){return function(){return b.na()}}(this,a)));return b};function ol(a){var b=new nl;b.rb=Nh(new Mh,b,Lk(function(a,b){return function(){return b}}(b,a)));return b}nl.prototype.ja=function(){return!(this.rb.cb?this.rb.Bd:Oh(this.rb)).t()};
nl.prototype.Wb=function(){var a=this.rb.cb?this.rb.Bd:Oh(this.rb);this.rb=Nh(new Mh,this,Lk(function(){return function(){Lf();return Mk()}}(this)));return a};nl.prototype.a=new t({no:0},!1,"scala.collection.immutable.StreamIterator",ih,{no:1,Tb:1,d:1,dc:1,r:1,q:1});function pl(){this.j=null;this.ec=0;this.we=this.Wg=this.Vf=null;this.xd=0;this.ce=null}pl.prototype=new $g;function ql(){}ql.prototype=pl.prototype;
pl.prototype.ga=function(){if(null!==this.ce){var a=this.ce.ga();this.ce.ja()||(this.ce=null);return a}a:{var a=this.we,b=this.xd;for(;;){b===(-1+a.b.length|0)?(this.ec=-1+this.ec|0,0<=this.ec?(this.we=this.Vf.b[this.ec],this.xd=this.Wg.b[this.ec],this.Vf.b[this.ec]=null):(this.we=null,this.xd=0)):this.xd=1+this.xd|0;if((a=a.b[b])&&a.a&&a.a.p.Dq||a&&a.a&&a.a.p.bj){a=a.qd;break a}if(a&&a.a&&a.a.p.Kn||rl(a))0<=this.ec&&(this.Vf.b[this.ec]=this.we,this.Wg.b[this.ec]=this.xd),this.ec=1+this.ec|0,this.we=
sl(a),this.xd=0,a=sl(a),b=0;else{this.ce=a.fa();a=this.ga();break a}}a=void 0}return a};pl.prototype.ja=function(){return null!==this.ce||0<=this.ec};function sl(a){if(a&&a.a&&a.a.p.Kn)return a.kq();if(rl(a))return a.vb;throw(new L).da(a);}pl.prototype.Fl=function(a){this.j=a;this.ec=0;this.Vf=p(y(y(mb)),[6]);this.Wg=p(y(A),[6]);this.we=this.j;this.xd=0;this.ce=null;return this};var tl=new t({ej:0},!1,"scala.collection.immutable.TrieIterator",ih,{ej:1,Tb:1,d:1,dc:1,r:1,q:1});pl.prototype.a=tl;
function ul(){this.Eg=this.ud=this.jd=this.Dg=0;this.wf=!1;this.yg=0;this.$h=this.Xh=this.Uh=this.Rh=this.Oh=this.Ag=null}ul.prototype=new $g;m=ul.prototype;
m.ga=function(){if(!this.wf)throw(new ck).s("reached iterator end");var a=this.Ag.b[this.ud];this.ud=1+this.ud|0;if(this.ud===this.Eg)if((this.jd+this.ud|0)<this.Dg){var b=32+this.jd|0,c=this.jd^b;if(1024>c)this.Oa(this.X().b[31&b>>5]);else if(32768>c)this.Fa(this.ea().b[31&b>>10]),this.Oa(this.X().b[0]);else if(1048576>c)this.eb(this.wa().b[31&b>>15]),this.Fa(this.ea().b[0]),this.Oa(this.X().b[0]);else if(33554432>c)this.Mb(this.mb().b[31&b>>20]),this.eb(this.wa().b[0]),this.Fa(this.ea().b[0]),this.Oa(this.X().b[0]);
else if(1073741824>c)this.Gc(this.Hc().b[31&b>>25]),this.Mb(this.mb().b[0]),this.eb(this.wa().b[0]),this.Fa(this.ea().b[0]),this.Oa(this.X().b[0]);else throw(new F).c();this.jd=b;b=this.Dg-this.jd|0;this.Eg=32>b?b:32;this.ud=0}else this.wf=!1;return a};m.wa=f("Uh");m.Yb=f("yg");m.bf=d("$h");m.ac=function(a,b){this.Dg=b;this.jd=-32&a;this.ud=31&a;var c=b-this.jd|0;this.Eg=32>c?c:32;this.wf=(this.jd+this.ud|0)<b;return this};m.db=f("Ag");m.mb=f("Xh");m.eb=d("Rh");m.Fa=d("Oh");m.ja=f("wf");m.Gc=d("Xh");
m.X=f("Oh");m.Hc=f("$h");m.kd=d("yg");m.ea=f("Rh");m.Oa=d("Ag");m.Mb=d("Uh");m.a=new t({to:0},!1,"scala.collection.immutable.VectorIterator",ih,{to:1,Tb:1,d:1,dc:1,r:1,q:1,fj:1});
function vl(a,b,c){if(32>c)return a.db().b[31&b];if(1024>c)return a.X().b[31&b>>5].b[31&b];if(32768>c)return a.ea().b[31&b>>10].b[31&b>>5].b[31&b];if(1048576>c)return a.wa().b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];if(33554432>c)return a.mb().b[31&b>>20].b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];if(1073741824>c)return a.Hc().b[31&b>>25].b[31&b>>20].b[31&b>>15].b[31&b>>10].b[31&b>>5].b[31&b];throw(new F).c();}
function Qh(a,b,c){a.kd(c);c=-1+c|0;switch(c){case -1:break;case 0:a.Oa(b.db());break;case 1:a.Fa(b.X());a.Oa(b.db());break;case 2:a.eb(b.ea());a.Fa(b.X());a.Oa(b.db());break;case 3:a.Mb(b.wa());a.eb(b.ea());a.Fa(b.X());a.Oa(b.db());break;case 4:a.Gc(b.mb());a.Mb(b.wa());a.eb(b.ea());a.Fa(b.X());a.Oa(b.db());break;case 5:a.bf(b.Hc());a.Gc(b.mb());a.Mb(b.wa());a.eb(b.ea());a.Fa(b.X());a.Oa(b.db());break;default:throw(new L).da(c);}}
function Rh(a,b,c){if(32<=c)if(1024>c)a.Oa(a.X().b[31&b>>5]);else if(32768>c)a.Fa(a.ea().b[31&b>>10]),a.Oa(a.X().b[31&b>>5]);else if(1048576>c)a.eb(a.wa().b[31&b>>15]),a.Fa(a.ea().b[31&b>>10]),a.Oa(a.X().b[31&b>>5]);else if(33554432>c)a.Mb(a.mb().b[31&b>>20]),a.eb(a.wa().b[31&b>>15]),a.Fa(a.ea().b[31&b>>10]),a.Oa(a.X().b[31&b>>5]);else if(1073741824>c)a.Gc(a.Hc().b[31&b>>25]),a.Mb(a.mb().b[31&b>>20]),a.eb(a.wa().b[31&b>>15]),a.Fa(a.ea().b[31&b>>10]),a.Oa(a.X().b[31&b>>5]);else throw(new F).c();}
function wl(a){null===a&&xl("NULL");var b=p(y(v),[a.b.length]);La(a,0,b,0,a.b.length);return b}function ci(){this.j=null;this.e=this.h=0}ci.prototype=new Th;m=ci.prototype;m.c=function(){this.e=this.h=0;return this};function yl(a,b){var c=p(y(Ta),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.ia=function(a){return a&&a.a&&a.a.p.ij?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return zl(this,!!a)};m.v=k("ArrayBuilder.ofBoolean");m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:yl(this,this.e)};
m.qa=function(a){this.j=yl(this,a);this.h=a};m.Aa=function(a){return zl(this,!!a)};m.ua=function(a){this.h<a&&this.qa(a)};m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};function zl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.Ba=function(a){a&&a.a&&a.a.p.vj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};
m.a=new t({ij:0},!1,"scala.collection.mutable.ArrayBuilder$ofBoolean",Uh,{ij:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function Wh(){this.j=null;this.e=this.h=0}Wh.prototype=new Th;m=Wh.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.jj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Al(this,a|0)};function Bl(a,b){var c=p(y(z),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.v=k("ArrayBuilder.ofByte");
m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Bl(this,this.e)};m.qa=function(a){this.j=Bl(this,a);this.h=a};m.Aa=function(a){return Al(this,a|0)};function Al(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.ua=function(a){this.h<a&&this.qa(a)};m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
m.Ba=function(a){a&&a.a&&a.a.p.wj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({jj:0},!1,"scala.collection.mutable.ArrayBuilder$ofByte",Uh,{jj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function Yh(){this.j=null;this.e=this.h=0}Yh.prototype=new Th;m=Yh.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.kj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Cl(this,rj(T(),a))};m.v=k("ArrayBuilder.ofChar");
m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Dl(this,this.e)};m.qa=function(a){this.j=Dl(this,a);this.h=a};m.Aa=function(a){return Cl(this,rj(T(),a))};m.ua=function(a){this.h<a&&this.qa(a)};function Dl(a,b){var c=p(y(Ua),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};function Cl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}
m.Ba=function(a){a&&a.a&&a.a.p.xj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({kj:0},!1,"scala.collection.mutable.ArrayBuilder$ofChar",Uh,{kj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function bi(){this.j=null;this.e=this.h=0}bi.prototype=new Th;m=bi.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.lj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return El(this,+a)};m.v=k("ArrayBuilder.ofDouble");
m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Fl(this,this.e)};function Fl(a,b){var c=p(y(Ya),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.qa=function(a){this.j=Fl(this,a);this.h=a};m.Aa=function(a){return El(this,+a)};m.ua=function(a){this.h<a&&this.qa(a)};function El(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
m.Ba=function(a){a&&a.a&&a.a.p.yj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({lj:0},!1,"scala.collection.mutable.ArrayBuilder$ofDouble",Uh,{lj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function ai(){this.j=null;this.e=this.h=0}ai.prototype=new Th;m=ai.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.mj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Gl(this,na(a))};m.v=k("ArrayBuilder.ofFloat");
m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Hl(this,this.e)};m.qa=function(a){this.j=Hl(this,a);this.h=a};function Gl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.Aa=function(a){return Gl(this,na(a))};m.ua=function(a){this.h<a&&this.qa(a)};function Hl(a,b){var c=p(y(Xa),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
m.Ba=function(a){a&&a.a&&a.a.p.zj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({mj:0},!1,"scala.collection.mutable.ArrayBuilder$ofFloat",Uh,{mj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function Zh(){this.j=null;this.e=this.h=0}Zh.prototype=new Th;m=Zh.prototype;m.c=function(){this.e=this.h=0;return this};m.ia=function(a){return a&&a.a&&a.a.p.nj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Il(this,a|0)};m.v=k("ArrayBuilder.ofInt");
m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Jl(this,this.e)};m.qa=function(a){this.j=Jl(this,a);this.h=a};function Il(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.Aa=function(a){return Il(this,a|0)};function Jl(a,b){var c=p(y(A),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.ua=function(a){this.h<a&&this.qa(a)};m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
m.Ba=function(a){a&&a.a&&a.a.p.Aj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({nj:0},!1,"scala.collection.mutable.ArrayBuilder$ofInt",Uh,{nj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function $h(){this.j=null;this.e=this.h=0}$h.prototype=new Th;m=$h.prototype;m.c=function(){this.e=this.h=0;return this};function Kl(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}
m.ia=function(a){return a&&a.a&&a.a.p.oj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Kl(this,Na(a))};m.v=k("ArrayBuilder.ofLong");m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Ll(this,this.e)};m.qa=function(a){this.j=Ll(this,a);this.h=a};function Ll(a,b){var c=p(y(Wa),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.Aa=function(a){return Kl(this,Na(a))};m.ua=function(a){this.h<a&&this.qa(a)};
m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};m.Ba=function(a){a&&a.a&&a.a.p.Bj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({oj:0},!1,"scala.collection.mutable.ArrayBuilder$ofLong",Uh,{oj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function ei(){this.j=this.ei=null;this.e=this.h=0}ei.prototype=new Th;m=ei.prototype;m.re=function(a){this.ei=a;this.e=this.h=0;return this};
m.ia=function(a){return a&&a.a&&a.a.p.pj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Ml(this,a)};m.v=k("ArrayBuilder.ofRef");m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Nl(this,this.e)};m.qa=function(a){this.j=Nl(this,a);this.h=a};function Ml(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.Aa=function(a){return Ml(this,a)};m.ua=function(a){this.h<a&&this.qa(a)};m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};
function Nl(a,b){var c=a.ei.Xa(b);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.Ba=function(a){a&&a.a&&a.a.p.Cj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({pj:0},!1,"scala.collection.mutable.ArrayBuilder$ofRef",Uh,{pj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function Xh(){this.j=null;this.e=this.h=0}Xh.prototype=new Th;m=Xh.prototype;m.c=function(){this.e=this.h=0;return this};
m.ia=function(a){return a&&a.a&&a.a.p.qj?this.e===a.e&&this.j===a.j:!1};function Ol(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.Ea=function(a){return Ol(this,a|0)};m.v=k("ArrayBuilder.ofShort");m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Pl(this,this.e)};m.qa=function(a){this.j=Pl(this,a);this.h=a};function Pl(a,b){var c=p(y(Va),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.Aa=function(a){return Ol(this,a|0)};m.ua=function(a){this.h<a&&this.qa(a)};
m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};m.Ba=function(a){a&&a.a&&a.a.p.Dj?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({qj:0},!1,"scala.collection.mutable.ArrayBuilder$ofShort",Uh,{qj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function di(){this.j=null;this.e=this.h=0}di.prototype=new Th;m=di.prototype;m.c=function(){this.e=this.h=0;return this};
m.ia=function(a){return a&&a.a&&a.a.p.rj?this.e===a.e&&this.j===a.j:!1};m.Ea=function(a){return Ql(this,a)};m.v=k("ArrayBuilder.ofUnit");function Ql(a,b){a.oa(1+a.e|0);a.j.b[a.e]=b;a.e=1+a.e|0;return a}m.ma=function(){return 0!==this.h&&this.h===this.e?this.j:Rl(this,this.e)};m.qa=function(a){this.j=Rl(this,a);this.h=a};function Rl(a,b){var c=p(y(ra),[b]);0<a.e&&$(Q(),a.j,0,c,0,a.e);return c}m.Aa=function(a){return Ql(this,a)};m.ua=function(a){this.h<a&&this.qa(a)};
m.oa=function(a){if(this.h<a||0===this.h){for(var b=0===this.h?16:B(2,this.h);b<a;)b=B(2,b);this.qa(b)}};m.Ba=function(a){a&&a.a&&a.a.p.Ej?(this.oa(this.e+a.l()|0),$(Q(),a.i,0,this.j,this.e,a.l()),this.e=this.e+a.l()|0,a=this):a=Y(this,a);return a};m.a=new t({rj:0},!1,"scala.collection.mutable.ArrayBuilder$ofUnit",Uh,{rj:1,uc:1,d:1,Ia:1,Da:1,Ca:1,g:1,f:1});function Ih(a,b,c){lb(c)&&(c=c.ha(),a.ua(b<c?b:c))}function Sl(){this.Jc=0;this.Lb=null}Sl.prototype=new $g;
Sl.prototype.ga=function(){return this.ja()?(this.Jc=1+this.Jc|0,this.Lb.ba.b[-1+this.Jc|0]===oi()?null:this.Lb.ba.b[-1+this.Jc|0]):Df().mc.ga()};function Tl(a){var b=new Sl;if(null===a)throw ze(xe(),null);b.Lb=a;b.Jc=0;return b}Sl.prototype.ja=function(){for(;this.Jc<this.Lb.ba.b.length&&null===this.Lb.ba.b[this.Jc];)this.Jc=1+this.Jc|0;return this.Jc<this.Lb.ba.b.length};Sl.prototype.a=new t({zo:0},!1,"scala.collection.mutable.FlatHashTable$$anon$1",ih,{zo:1,Tb:1,d:1,dc:1,r:1,q:1});
function Jh(a,b){for(var c=null===b?oi():b,e=xa(c),e=Ul(a,e),g=a.ba.b[e];null!==g&&!S(T(),g,c);)e=(1+e|0)%a.ba.b.length,g=a.ba.b[e];return g}
function Vl(a,b){for(var c=xa(b),c=Ul(a,c),e=a.ba.b[c];null!==e;){if(S(T(),e,b))return;c=(1+c|0)%a.ba.b.length;e=a.ba.b[c]}a.ba.b[c]=b;a.Vb=1+a.Vb|0;null!==a.Bb&&(c>>=5,e=a.Bb,e.b[c]=1+e.b[c]|0);if(a.Vb>=a.gd)for(c=a.ba,a.ba=p(y(v),[B(2,a.ba.b.length)]),a.Vb=0,null!==a.Bb&&(e=1+(a.ba.b.length>>5)|0,a.Bb.b.length!==e?a.Bb=p(y(A),[e]):Ee(Ge(),a.Bb)),a.zd=ae(U(),-1+a.ba.b.length|0),a.gd=li().kf(a.Nc,a.ba.b.length),e=0;e<c.b.length;){var g=c.b[e];null!==g&&Vl(a,g);e=1+e|0}}
function Ul(a,b){var c=a.zd,e=Wg(Yg(),b),c=c%32,g=-1+a.ba.b.length|0;return((e>>>c|0|e<<(32-c|0))>>>(32-ae(U(),g)|0)|0)&g}function Wl(){this.Kg=null;this.oe=0;this.Pd=null}Wl.prototype=new $g;function Xl(a){var b=new Wl;b.Kg=a.ba;b.oe=Yl(a);b.Pd=b.Kg.b[b.oe];return b}Wl.prototype.ga=function(){var a=this.Pd;for(this.Pd=this.Pd.vd;null===this.Pd&&0<this.oe;)this.oe=-1+this.oe|0,this.Pd=this.Kg.b[this.oe];return a};Wl.prototype.ja=function(){return null!==this.Pd};
Wl.prototype.a=new t({Go:0},!1,"scala.collection.mutable.HashTable$$anon$1",ih,{Go:1,Tb:1,d:1,dc:1,r:1,q:1});function Yl(a){for(var b=-1+a.ba.b.length|0;null===a.ba.b[b]&&0<b;)b=-1+b|0;return b}function Zl(a,b){var c=Nb(I(),b);return $l(a,b,am(a,c))}function $l(a,b,c){for(a=a.ba.b[c];;)if(null!==a?(c=a.nc,c=!S(T(),c,b)):c=!1,c)a=a.vd;else break;return a}function bm(a,b){if(null!==a.Bb){var c=a.Bb,e=b>>5;c.b[e]=1+c.b[e]|0}}
function am(a,b){var c=-1+a.ba.b.length|0,e=a.zd,g=Wg(Yg(),b),e=e%32;return(g>>>e|0|g<<(32-e|0))>>(32-ae(U(),c)|0)&c}
function Rd(a,b,c){var e=Nb(I(),b),e=am(a,e),g=$l(a,b,e);if(null!==g)a=g;else{b=(new gi).Yd(b,c);b.vd=a.ba.b[e];a.ba.b[e]=b;a.Vb=1+a.Vb|0;bm(a,e);if(a.Vb>a.gd){b=B(2,a.ba.b.length);c=a.ba;a.ba=p(y(nb),[b]);null!==a.Bb&&(e=1+(a.ba.b.length>>5)|0,a.Bb.b.length!==e?a.Bb=p(y(A),[e]):Ee(Ge(),a.Bb));for(e=-1+c.b.length|0;0<=e;){for(g=c.b[e];null!==g;){var h=g.nc,h=Nb(I(),h),h=am(a,h),l=g.vd;g.vd=a.ba.b[h];a.ba.b[h]=g;g=l;bm(a,h)}e=-1+e|0}a.gd=ti().kf(a.Nc,b)}a=null}return a}function cm(){this.Ye=null}
cm.prototype=new $g;cm.prototype.ga=function(){if(this.ja()){var a=this.Ye.pa();this.Ye=this.Ye.na();return a}throw(new ck).s("next on empty Iterator");};cm.prototype.ja=function(){return this.Ye!==Ef()};cm.prototype.a=new t({Ko:0},!1,"scala.collection.mutable.ListBuffer$$anon$1",ih,{Ko:1,Tb:1,d:1,dc:1,r:1,q:1});
function dm(a,b){var c=(new N).aa(a.i.b.length);if(Ha((new N).aa(b),c)){for(c=qd((new N).Y(2,0,0),c);Ha((new N).aa(b),c);)c=qd((new N).Y(2,0,0),c);Ha(c,(new N).Y(4194303,511,0))&&(c=(new N).Y(4194303,511,0));c=p(y(v),[P(c)]);La(a.i,0,c,0,a.Ab);a.i=c}}function em(a,b){if(b>=a.Ab)throw(new H).s(""+b);return a.i.b[b]}function fm(){Lb.call(this);this.Yi=0}fm.prototype=new Mb;function gm(){}gm.prototype=fm.prototype;fm.prototype.qe=function(a,b,c){this.Yi=c;Lb.prototype.Jg.call(this,a);return this};
fm.prototype.Pg=function(){var a=new hm;if(null===this)throw ze(xe(),null);a.Wa=this;hc.prototype.mi.call(a,this,1);return a};var im=new t({gh:0},!1,"scala.scalajs.niocharset.ISO_8859_1_And_US_ASCII_Common",Ob,{gh:1,Bc:1,d:1,Qa:1});fm.prototype.a=im;function hm(){hc.call(this);this.Wa=null}hm.prototype=new ic;
hm.prototype.Bg=function(a,b){var c=this.Wa.Yi;if(0===(a.W-a.k|0))return M().Dc;a.pc;for(;;){if(a.k===a.W)return M().Dc;if(b.k===b.W)return M().Cc;var e=Fj(a);if(e<=c)K(b,e<<24>>24);else{if(56320===(64512&e))return D(a,-1+a.k|0),M().pd;if(55296===(64512&e)){if(a.k!==a.W)return c=Fj(a),D(a,-2+a.k|0),56320===(64512&c)?M().vi:M().pd;D(a,-1+a.k|0);return M().Dc}D(a,-1+a.k|0);return M().ui}}};
hm.prototype.a=new t({$o:0},!1,"scala.scalajs.niocharset.ISO_8859_1_And_US_ASCII_Common$Encoder",qc,{$o:1,Af:1,d:1});function jm(){Lb.call(this);this.pf=0}jm.prototype=new Mb;function km(){}km.prototype=jm.prototype;jm.prototype.qe=function(a,b,c){this.pf=c;Lb.prototype.Jg.call(this,a);return this};
jm.prototype.Pg=function(){var a=new lm;if(null===this)throw ze(xe(),null);a.Wa=this;hc.prototype.ni.call(a,this,2,2,2===this.pf?Sc(Q(),(new G).ca([-3,-1]),R().kb):Sc(Q(),(new G).ca([-1,-3]),R().kb));a.Rf=0===this.pf;return a};var mm=new t({cg:0},!1,"scala.scalajs.niocharset.UTF_16_Common",Ob,{cg:1,Bc:1,d:1,Qa:1});jm.prototype.a=mm;function lm(){hc.call(this);this.Rf=!1;this.Wa=null}lm.prototype=new ic;
lm.prototype.Bg=function(a,b){if(this.Rf){if(2>(b.W-b.k|0))return M().Cc;K(b,-2);K(b,-1);this.Rf=!1}var c=2!==this.Wa.pf;for(;;){if(0===(a.W-a.k|0))return M().Dc;var e=Fj(a);if(56320===(64512&e))return D(a,-1+a.k|0),M().pd;if(55296!==(64512&e)){if(2>(b.W-b.k|0))return D(a,-1+a.k|0),M().Cc;c?(K(b,e>>8<<24>>24),K(b,e<<24>>24)):(K(b,e<<24>>24),K(b,e>>8<<24>>24))}else{if(1>(a.W-a.k|0))return D(a,-1+a.k|0),M().Dc;var g=Fj(a);if(56320!==(64512&g))return D(a,-2+a.k|0),M().pd;if(4>(b.W-b.k|0))return D(a,
-2+a.k|0),M().Cc;c?(K(b,e>>8<<24>>24),K(b,e<<24>>24)):(K(b,e<<24>>24),K(b,e>>8<<24>>24));c?(K(b,g>>8<<24>>24),K(b,g<<24>>24)):(K(b,g<<24>>24),K(b,g>>8<<24>>24))}}};lm.prototype.li=function(){this.Rf=0===this.Wa.pf};lm.prototype.a=new t({cp:0},!1,"scala.scalajs.niocharset.UTF_16_Common$Encoder",qc,{cp:1,Af:1,d:1});function nm(){Lb.call(this);this.Fn=null;this.Vp=this.Wp=0}nm.prototype=new Mb;
nm.prototype.c=function(){Lb.prototype.Jg.call(this,"UTF-8",Sc(Q(),(new G).ca(["UTF8","unicode-1-1-utf-8"]),ld(R(),r(ja))));om=this;this.Fn=Gd(Q(),-1,(new G).ca([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,-1,-1,-1,-1,-1,-1,-1,-1]));return this};
nm.prototype.Pg=function(){return(new pm).c()};nm.prototype.a=new t({fp:0},!1,"scala.scalajs.niocharset.UTF_8$",Ob,{fp:1,Bc:1,d:1,Qa:1});var om=void 0;function $b(){om||(om=(new nm).c());return om}function pm(){hc.call(this)}pm.prototype=new ic;pm.prototype.c=function(){hc.prototype.mi.call(this,$b(),1.100000023841858);return this};
pm.prototype.Bg=function(a,b){a.pc;for(;;){if(a.k===a.W)return M().Dc;var c=Fj(a);if(128>c){if(b.k===b.W)return c=M().Cc,D(a,-1+a.k|0),c;K(b,c<<24>>24)}else if(2048>c){if(2>(b.W-b.k|0))return c=M().Cc,D(a,-1+a.k|0),c;K(b,(192|c>>6)<<24>>24);K(b,(128|63&c)<<24>>24)}else if($b(),55296!==(63488&c)){if(3>(b.W-b.k|0))return c=M().Cc,D(a,-1+a.k|0),c;K(b,(224|c>>12)<<24>>24);K(b,(128|63&c>>6)<<24>>24);K(b,(128|63&c)<<24>>24)}else if(55296===(64512&c)){if(a.k===a.W)return c=M().Dc,D(a,-1+a.k|0),c;var e=Fj(a);
if(56320!==(64512&e))return c=M().pd,D(a,-2+a.k|0),c;if(4>(b.W-b.k|0))return c=M().Cc,D(a,-2+a.k|0),c;c=65536+(((1023&c)<<10)+(1023&e)|0)|0;K(b,(240|c>>18)<<24>>24);K(b,(128|63&c>>12)<<24>>24);K(b,(128|63&c>>6)<<24>>24);K(b,(128|63&c)<<24>>24)}else return c=M().pd,D(a,-1+a.k|0),c}};pm.prototype.a=new t({gp:0},!1,"scala.scalajs.niocharset.UTF_8$Encoder",qc,{gp:1,Af:1,d:1});function qm(){this.cf=null}qm.prototype=new gj;qm.prototype.Me=function(){return(0,this.cf)()};
function Lk(a){var b=new qm;b.cf=a;return b}qm.prototype.a=new t({hp:0},!1,"scala.scalajs.runtime.AnonFunction0",hj,{hp:1,hh:1,d:1,vh:1});function rm(){this.cf=null}rm.prototype=new jj;rm.prototype.o=function(a){return(0,this.cf)(a)};function Vb(a){var b=new rm;b.cf=a;return b}rm.prototype.a=new t({ip:0},!1,"scala.scalajs.runtime.AnonFunction1",kj,{ip:1,ih:1,d:1,w:1});function N(){this.n=this.u=this.x=0}N.prototype=new fe;function Si(a,b){return(new N).Y(a.x|b.x,a.u|b.u,a.n|b.n)}m=N.prototype;
m.ia=function(a){return ua(a)?Ga(this,a):!1};
function qd(a,b){var c=8191&a.x,e=a.x>>13|(15&a.u)<<9,g=8191&a.u>>4,h=a.u>>17|(255&a.n)<<5,l=(1048320&a.n)>>8;c|=0;e|=0;g|=0;h|=0;l|=0;var q=8191&b.x,w=b.x>>13|(15&b.u)<<9,J=8191&b.u>>4,C=b.u>>17|(255&b.n)<<5,O=(1048320&b.n)>>8;var q=q|0,w=w|0,J=J|0,x=C|0,E=O|0,sa=B(c,q),Ka=B(e,q),O=B(g,q),C=B(h,q),l=B(l,q);0!==w&&(Ka=Ka+B(c,w)|0,O=O+B(e,w)|0,C=C+B(g,w)|0,l=l+B(h,w)|0);0!==J&&(O=O+B(c,J)|0,C=C+B(e,J)|0,l=l+B(g,J)|0);0!==x&&(C=C+B(c,x)|0,l=l+B(e,x)|0);0!==E&&(l=l+B(c,E)|0);c=(4194303&sa)+((511&Ka)<<
13)|0;e=((((sa>>22)+(Ka>>9)|0)+((262143&O)<<4)|0)+((31&C)<<17)|0)+(c>>22)|0;return(new N).Y(4194303&c,4194303&e,1048575&((((O>>18)+(C>>5)|0)+((4095&l)<<8)|0)+(e>>22)|0))}m.Y=function(a,b,c){this.x=a;this.u=b;this.n=c;return this};
m.v=function(){if(0===this.x&&0===this.u&&0===this.n)return"0";if(Ga(this,s().Kd))return"-9223372036854775808";if(0!==(524288&this.n))return"-"+Xi(this).v();var a=s().Hh,b=this,c="";for(;;){var e=b;if(0===e.x&&0===e.u&&0===e.n)return c;e=Mc(b,a);b=e[0];e=""+P(e[1]);c=(0===b.x&&0===b.u&&0===b.n?"":"000000000".substring(e.length|0))+e+c}};
function Mc(a,b){if(0===b.x&&0===b.u&&0===b.n)throw(new sm).s("/ by zero");if(0===a.x&&0===a.u&&0===a.n)return[s().tb,s().tb];if(Ga(b,s().Kd))return Ga(a,s().Kd)?[s().pg,s().tb]:[s().tb,a];var c=0!==(524288&a.n),e=0!==(524288&b.n),g=Ga(a,s().Kd),h=0===b.n&&0===b.u&&0!==b.x&&0===(b.x&(-1+b.x|0))?ce(U(),b.x):0===b.n&&0!==b.u&&0===b.x&&0===(b.u&(-1+b.u|0))?22+ce(U(),b.u)|0:0!==b.n&&0===b.u&&0===b.x&&0===(b.n&(-1+b.n|0))?44+ce(U(),b.n)|0:-1;if(0<=h){if(g)return c=tm(a,h),[e?Xi(c):c,s().tb];var g=0!==
(524288&a.n)?Xi(a):a,l=tm(g,h),e=c!==e?Xi(l):l,g=22>=h?(new N).Y(g.x&(-1+(1<<h)|0),0,0):44>=h?(new N).Y(g.x,g.u&(-1+(1<<(-22+h|0))|0),0):(new N).Y(g.x,g.u,g.n&(-1+(1<<(-44+h|0))|0)),c=c?Xi(g):g;return[e,c]}h=0!==(524288&b.n)?Xi(b):b;if(g)var q=s().ng;else{var w=0!==(524288&a.n)?Xi(a):a;if(Ha(h,w))return[s().tb,a];q=w}var w=um(h)-um(q)|0,J=Qc(h,w),h=w,w=J,J=q,q=s().tb;a:for(;;){if(0>h)var C=!0;else C=J,C=0===C.x&&0===C.u&&0===C.n;if(C){var O=q,l=J;break a}else C=Nc(J,Xi(w)),0===(524288&C.n)?(J=-1+
h|0,w=tm(w,1),q=22>h?(new N).Y(q.x|1<<h,q.u,q.n):44>h?(new N).Y(q.x,q.u|1<<(-22+h|0),q.n):(new N).Y(q.x,q.u,q.n|1<<(-44+h|0)),h=J,J=C):(h=-1+h|0,w=tm(w,1))}e=c!==e?Xi(O):O;c&&g?(c=Xi(l),g=s().pg,c=Nc(c,Xi(g))):c=c?Xi(l):l;return[e,c]}function yd(a,b){return(new N).Y(a.x&b.x,a.u&b.u,a.n&b.n)}
function Rc(a,b){var c=63&b;if(22>c){var e=22-c|0;return(new N).Y(4194303&(a.x>>c|a.u<<e),4194303&(a.u>>c|a.n<<e),1048575&(a.n>>>c|0))}return 44>c?(e=-22+c|0,(new N).Y(4194303&(a.u>>e|a.n<<(44-c|0)),4194303&(a.n>>>e|0),0)):(new N).Y(4194303&(a.n>>>(-44+c|0)|0),0,0)}function Ha(a,b){return 0===(524288&a.n)?0!==(524288&b.n)||a.n>b.n||a.n===b.n&&a.u>b.u||a.n===b.n&&a.u===b.u&&a.x>b.x:!(0===(524288&b.n)||a.n<b.n||a.n===b.n&&a.u<b.u||a.n===b.n&&a.u===b.u&&a.x<=b.x)}
function Qc(a,b){var c=63&b;if(22>c){var e=22-c|0;return(new N).Y(4194303&a.x<<c,4194303&(a.u<<c|a.x>>e),1048575&(a.n<<c|a.u>>e))}return 44>c?(e=-22+c|0,(new N).Y(0,4194303&a.x<<e,1048575&(a.u<<e|a.x>>(44-c|0)))):(new N).Y(0,0,1048575&a.x<<(-44+c|0))}function P(a){return a.x|a.u<<22}m.aa=function(a){N.prototype.Y.call(this,4194303&a,4194303&a>>22,0>a?1048575:0);return this};
function Xi(a){var b=4194303&(1+~a.x|0),c=4194303&(~a.u+(0===b?1:0)|0);return(new N).Y(b,c,1048575&(~a.n+(0===b&&0===c?1:0)|0))}function Nc(a,b){var c=a.x+b.x|0,e=(a.u+b.u|0)+(c>>22)|0;return(new N).Y(4194303&c,4194303&e,1048575&((a.n+b.n|0)+(e>>22)|0))}
function tm(a,b){var c=63&b,e=0!==(524288&a.n),g=e?-1048576|a.n:a.n;if(22>c)return e=22-c|0,(new N).Y(4194303&(a.x>>c|a.u<<e),4194303&(a.u>>c|g<<e),1048575&g>>c);if(44>c){var h=-22+c|0;return(new N).Y(4194303&(a.u>>h|g<<(44-c|0)),4194303&g>>h,1048575&(e?1048575:0))}return(new N).Y(4194303&g>>(-44+c|0),4194303&(e?4194303:0),1048575&(e?1048575:0))}function qj(a){return Ga(a,s().Kd)?-9223372036854775E3:0!==(524288&a.n)?-qj(Xi(a)):a.x+4194304*a.u+17592186044416*a.n}
function ji(a){return Mc(a,(new N).Y(1E3,0,0))[0]}function um(a){return 0!==a.n?-12+be(U(),a.n)|0:0!==a.u?10+be(U(),a.u)|0:32+be(U(),a.x)|0}m.sa=function(){return P(Ti(this,Rc(this,32)))};function Ti(a,b){return(new N).Y(a.x^b.x,a.u^b.u,a.n^b.n)}function Ga(a,b){return a.x===b.x&&a.u===b.u&&a.n===b.n}function ua(a){return!!(a&&a.a&&a.a.p.Gj)}m.a=new t({Gj:0},!1,"scala.scalajs.runtime.RuntimeLong",he,{Gj:1,Xc:1,d:1,Qa:1});var dg=new t({rp:0},!1,"scala.runtime.Nothing$",Ae,{rp:1,ya:1,d:1,f:1});
function vm(){this.Jh=this.Ve=0;this.Oj=null}vm.prototype=new $g;vm.prototype.ga=function(){var a=this.Oj.bd(this.Ve);this.Ve=1+this.Ve|0;return a};function Cd(a){var b=new vm;b.Oj=a;b.Ve=0;b.Jh=a.ad();return b}vm.prototype.ja=function(){return this.Ve<this.Jh};vm.prototype.a=new t({vp:0},!1,"scala.runtime.ScalaRunTime$$anon$1",ih,{vp:1,Tb:1,d:1,dc:1,r:1,q:1});function wm(){V.call(this)}wm.prototype=new Sj;function xm(){}xm.prototype=wm.prototype;
wm.prototype.c=function(){wm.prototype.rc.call(this,null,null);return this};var ym=new t({zf:0},!1,"java.io.IOException",Tj,{zf:1,gb:1,ya:1,d:1,f:1});wm.prototype.a=ym;function zm(){this.Fi=null;this.fl=!1;this.lq=this.hl=null;this.hq=this.yl=this.Ql=this.jl=!1}zm.prototype=new zj;function Am(){}Am.prototype=zm.prototype;function xl(a){ak||(ak=(new Zj).c());var b=ak.Gi.nh.Kf();Bm(b,Zi(za(),a));Bm(b,"\n")}
zm.prototype.Jl=function(a,b,c){this.fl=b;this.hl=c;yj.prototype.Ig.call(this,a);this.yl=this.Ql=this.jl=!1;return this};zm.prototype.Ig=function(a){zm.prototype.Jl.call(this,a,!1,null);return this};var Cm=new t({xh:0},!1,"java.io.PrintStream",Aj,{xh:1,jg:1,He:1,d:1,xf:1,yf:1,Of:1});zm.prototype.a=Cm;function Bb(){Cb.call(this);this.Ge=!1}Bb.prototype=new Bj;
function mc(a,b,c,e){if(0>c||0>e||(c+e|0)>b.b.length)throw(new H).c();if(a.Ge)throw(new kc).c();var g=a.k,h=g+e|0;if(h>a.W)throw(new lc).c();La(b,c,a.pc,g+a.Fd|0,e);D(a,h)}function nc(a){if(a.k===a.W)throw(new tc).c();var b=a.k;D(a,1+b|0);return a.pc.b[a.Fd+b|0]}function K(a,b){if(a.Ge)throw(new kc).c();if(a.k===a.W)throw(new lc).c();var c=a.k;a.pc.b[a.Fd+c|0]=b;D(a,1+c|0)}Bb.prototype.a=new t({kk:0},!1,"java.nio.HeapByteBuffer",Cj,{kk:1,kg:1,Ie:1,d:1,Qa:1});
function Dm(){Dj.call(this);this.Ee=null;this.Fe=0}Dm.prototype=new Ej;Dm.prototype.kh=function(a,b){if(0>a||b<a||b>(this.W-this.k|0))throw(new H).c();return Nd(this.Gd,this.Ee,this.Fe,this.k+a|0,this.k+b|0)};function Fj(a){if(a.k===a.W)throw(new tc).c();var b=a.k;D(a,1+b|0);return Ia(a.Ee,a.Fe+b|0)}function Nd(a,b,c,e,g){var h=new Dm;h.Ee=b;h.Fe=c;Dj.prototype.aa.call(h,a);D(h,e);vb(h,g);return h}Dm.prototype.v=function(){var a=this.Fe;return ha(Ja(this.Ee,this.k+a|0,this.W+a|0))};
Dm.prototype.a=new t({nk:0},!1,"java.nio.StringCharBuffer",Gj,{nk:1,lg:1,Ie:1,d:1,Qa:1,Pf:1,Of:1,im:1});function Em(){V.call(this)}Em.prototype=new Pj;function Pd(a){var b=new Em;Oj.prototype.Ml.call(b,a);return b}Em.prototype.a=new t({qk:0},!1,"java.nio.charset.CoderMalfunctionError",Qj,{qk:1,Lg:1,ya:1,d:1,f:1});function Vd(){V.call(this)}Vd.prototype=new Pj;Vd.prototype.da=function(a){Vd.prototype.s.call(this,ha(a));return this};
Vd.prototype.a=new t({Ul:0},!1,"java.lang.AssertionError",Qj,{Ul:1,Lg:1,ya:1,d:1,f:1});function Fm(){V.call(this)}Fm.prototype=new Sj;function Gm(){}Gm.prototype=Fm.prototype;Fm.prototype.c=function(){Fm.prototype.rc.call(this,null,null);return this};Fm.prototype.s=function(a){Fm.prototype.rc.call(this,a,null);return this};var Hm=new t({Nb:0},!1,"java.lang.RuntimeException",Tj,{Nb:1,gb:1,ya:1,d:1,f:1});Fm.prototype.a=Hm;function vg(){lk.call(this)}vg.prototype=new mk;
vg.prototype.c=function(){lk.prototype.ef.call(this,X().Wf,"Any");return this};vg.prototype.Xa=function(a){return this.$c(a)};vg.prototype.$c=function(a){return p(y(v),[a])};vg.prototype.a=new t({Sm:0},!1,"scala.reflect.ManifestFactory$$anon$1",nk,{Sm:1,ve:1,ae:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function wg(){lk.call(this)}wg.prototype=new mk;wg.prototype.c=function(){lk.prototype.ef.call(this,X().Wf,"Object");return this};wg.prototype.Xa=function(a){return this.$c(a)};
wg.prototype.$c=function(a){return p(y(v),[a])};wg.prototype.a=new t({Ym:0},!1,"scala.reflect.ManifestFactory$$anon$2",nk,{Ym:1,ve:1,ae:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function xg(){lk.call(this)}xg.prototype=new mk;xg.prototype.c=function(){lk.prototype.ef.call(this,X().Wf,"AnyVal");return this};xg.prototype.Xa=function(a){return this.$c(a)};xg.prototype.$c=function(a){return p(y(v),[a])};
xg.prototype.a=new t({Zm:0},!1,"scala.reflect.ManifestFactory$$anon$3",nk,{Zm:1,ve:1,ae:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function yg(){lk.call(this)}yg.prototype=new mk;yg.prototype.c=function(){lk.prototype.ef.call(this,X().Xi,"Null");return this};yg.prototype.Xa=function(a){return this.$c(a)};yg.prototype.$c=function(a){return p(y(v),[a])};yg.prototype.a=new t({$m:0},!1,"scala.reflect.ManifestFactory$$anon$4",nk,{$m:1,ve:1,ae:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});
function zg(){lk.call(this)}zg.prototype=new mk;zg.prototype.c=function(){lk.prototype.ef.call(this,X().Wi,"Nothing");return this};zg.prototype.Xa=function(a){return this.$c(a)};zg.prototype.$c=function(a){return p(y(v),[a])};zg.prototype.a=new t({an:0},!1,"scala.reflect.ManifestFactory$$anon$5",nk,{an:1,ve:1,ae:1,d:1,Eb:1,ob:1,wb:1,qb:1,g:1,f:1,m:1});function Ig(){re.call(this);this.qh=null}Ig.prototype=new Uj;
Ig.prototype.a=new t({jn:0},!1,"scala.util.DynamicVariable$$anon$1",Vj,{jn:1,yi:1,Ng:1,d:1});function Im(){}Im.prototype=new sk;function Jm(){}m=Jm.prototype=Im.prototype;
m.ia=function(a){if(a&&a.a&&a.a.p.Ug){var b;if(!(b=this===a)&&(b=this.ha()===a.ha()))try{for(var c=this.fa(),e=!0;e&&c.ja();){var g=c.ga();if(null!==g){var h=g.Xb,l=Qd(a,g.kc);b:{if(Ld(l)){var q=l.Dd;if(S(T(),h,q)){e=!0;break b}}e=!1}}else throw(new L).da(g);}b=e}catch(w){if(w&&w.a&&w.a.p.Xl)xl("class cast "),b=!1;else throw w;}a=b}else a=!1;return a};m.t=function(){return 0===this.ha()};m.v=function(){return Tk(this)};m.yc=function(){var a=(new Ck).aa(this.ha()),b=this.Va();Dk(a,b);return a};
m.Le=function(a,b,c,e){return Rk(this,a,b,c,e)};m.sa=function(){var a=Sg();return Qg(a,this,a.Ci)};m.xc=k("Map");var Km=new t({Tg:0},!1,"scala.collection.AbstractMap",wk,{Tg:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ui:1,Ug:1,Ti:1,Vi:1,za:1,w:1,Sa:1});Im.prototype.a=Km;function Lm(){}Lm.prototype=new sk;function Mm(){}m=Mm.prototype=Lm.prototype;m.ia=function(a){return kb(a)?this.ed(a):!1};m.t=function(){return 0===this.td(0)};m.v=function(){return Tk(this)};m.ha=function(){return this.l()};
m.sa=function(){return qk(Sg(),this.Ad())};var Nm=new t({Ga:0},!1,"scala.collection.AbstractSeq",wk,{Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1});Lm.prototype.a=Nm;function Om(){}Om.prototype=new sk;function Pm(){}m=Pm.prototype=Om.prototype;m.t=function(){return 0===this.ha()};m.ia=function(a){return xk(this,a)};m.v=function(){return Tk(this)};m.lh=function(a){return this.df(a)};m.yc=function(){return Sk(this)};
m.sa=function(){var a=Sg();return Qg(a,this.he(),a.fh)};m.la=function(){return Ci(new Ai,this.Od())};m.xc=k("Set");var Qm=new t({Ob:0},!1,"scala.collection.AbstractSet",wk,{Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1});Om.prototype.a=Qm;function Cf(){this.va=null}Cf.prototype=new al;Cf.prototype.la=function(){Rm||(Rm=(new Sm).c());return(new Eh).c()};
Cf.prototype.a=new t({xn:0},!1,"scala.collection.Iterable$",cl,{xn:1,ib:1,ra:1,d:1,yb:1,Na:1});var Bf=void 0;function Af(){this.gl=this.va=null}Af.prototype=new al;Af.prototype.c=function(){$k.prototype.c.call(this);zf=this;this.gl=(new Kg).c();return this};Af.prototype.la=function(){Tm||(Tm=(new Um).c());return(new Eh).c()};Af.prototype.a=new t({Dn:0},!1,"scala.collection.Traversable$",cl,{Dn:1,ib:1,ra:1,d:1,yb:1,Na:1});var zf=void 0;function Vm(){this.va=null}Vm.prototype=new al;
function Wm(){}Wm.prototype=Vm.prototype;var Xm=new t({Ub:0},!1,"scala.collection.generic.GenSeqFactory",cl,{Ub:1,ib:1,ra:1,d:1});Vm.prototype.a=Xm;function Ym(){}Ym.prototype=new fl;function Zm(){}Zm.prototype=Ym.prototype;var $m=new t({$i:0},!1,"scala.collection.generic.ImmutableMapFactory",gl,{$i:1,Xg:1,Xf:1,d:1});Ym.prototype.a=$m;function an(){}an.prototype=new Yk;function bn(){}bn.prototype=an.prototype;var cn=new t({de:0},!1,"scala.collection.generic.SetFactory",Zk,{de:1,yd:1,ra:1,d:1,Na:1});
an.prototype.a=cn;function dn(){pl.call(this)}dn.prototype=new ql;dn.prototype.a=new t({On:0},!1,"scala.collection.immutable.HashSet$HashTrieSet$$anon$1",tl,{On:1,ej:1,Tb:1,d:1,dc:1,r:1,q:1});function Sm(){this.va=null}Sm.prototype=new al;Sm.prototype.la=function(){return(new Eh).c()};Sm.prototype.a=new t({Qn:0},!1,"scala.collection.immutable.Iterable$",cl,{Qn:1,ib:1,ra:1,d:1,yb:1,Na:1});var Rm=void 0;function Um(){this.va=null}Um.prototype=new al;Um.prototype.la=function(){return(new Eh).c()};
Um.prototype.a=new t({po:0},!1,"scala.collection.immutable.Traversable$",cl,{po:1,ib:1,ra:1,d:1,yb:1,Na:1});var Tm=void 0;function en(){}en.prototype=new sk;function fn(){}fn.prototype=en.prototype;var gn=new t({ah:0},!1,"scala.collection.mutable.AbstractIterable",wk,{ah:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,ab:1,bb:1,Za:1});en.prototype.a=gn;function hn(){this.va=null}hn.prototype=new al;hn.prototype.la=function(){return(new Ck).c()};
hn.prototype.a=new t({Io:0},!1,"scala.collection.mutable.Iterable$",cl,{Io:1,ib:1,ra:1,d:1,yb:1,Na:1});var jn=void 0;function Xb(){fm.call(this)}Xb.prototype=new gm;Xb.prototype.c=function(){fm.prototype.qe.call(this,"ISO-8859-1",Sc(Q(),(new G).ca("csISOLatin1 IBM-819 iso-ir-100 8859_1 ISO_8859-1 l1 ISO8859-1 ISO_8859_1 cp819 ISO8859_1 latin1 ISO_8859-1:1987 819 IBM819".split(" ")),ld(R(),r(ja))),255);Wb=this;return this};
Xb.prototype.a=new t({Zo:0},!1,"scala.scalajs.niocharset.ISO_8859_1$",im,{Zo:1,gh:1,Bc:1,d:1,Qa:1});var Wb=void 0;function Zb(){fm.call(this)}Zb.prototype=new gm;Zb.prototype.c=function(){fm.prototype.qe.call(this,"US-ASCII",Sc(Q(),(new G).ca("cp367 ascii7 ISO646-US 646 csASCII us iso_646.irv:1983 ISO_646.irv:1991 IBM367 ASCII default ANSI_X3.4-1986 ANSI_X3.4-1968 iso-ir-6".split(" ")),ld(R(),r(ja))),127);Yb=this;return this};
Zb.prototype.a=new t({ap:0},!1,"scala.scalajs.niocharset.US_ASCII$",im,{ap:1,gh:1,Bc:1,d:1,Qa:1});var Yb=void 0;function fc(){jm.call(this)}fc.prototype=new km;fc.prototype.c=function(){jm.prototype.qe.call(this,"UTF-16",Sc(Q(),(new G).ca(["utf16","UTF_16","UnicodeBig","unicode"]),ld(R(),r(ja))),0);ec=this;return this};fc.prototype.a=new t({bp:0},!1,"scala.scalajs.niocharset.UTF_16$",mm,{bp:1,cg:1,Bc:1,d:1,Qa:1});var ec=void 0;function bc(){jm.call(this)}bc.prototype=new km;
bc.prototype.c=function(){jm.prototype.qe.call(this,"UTF-16BE",Sc(Q(),(new G).ca(["X-UTF-16BE","UTF_16BE","ISO-10646-UCS-2","UnicodeBigUnmarked"]),ld(R(),r(ja))),1);ac=this;return this};bc.prototype.a=new t({dp:0},!1,"scala.scalajs.niocharset.UTF_16BE$",mm,{dp:1,cg:1,Bc:1,d:1,Qa:1});var ac=void 0;function dc(){jm.call(this)}dc.prototype=new km;
dc.prototype.c=function(){jm.prototype.qe.call(this,"UTF-16LE",Sc(Q(),(new G).ca(["UnicodeLittleUnmarked","UTF_16LE","X-UTF-16LE"]),ld(R(),r(ja))),2);cc=this;return this};dc.prototype.a=new t({ep:0},!1,"scala.scalajs.niocharset.UTF_16LE$",mm,{ep:1,cg:1,Bc:1,d:1,Qa:1});var cc=void 0;function lc(){V.call(this)}lc.prototype=new Gm;lc.prototype.a=new t({yh:0},!1,"java.nio.BufferOverflowException",Hm,{yh:1,Nb:1,gb:1,ya:1,d:1,f:1});function tc(){V.call(this)}tc.prototype=new Gm;
tc.prototype.a=new t({zh:0},!1,"java.nio.BufferUnderflowException",Hm,{zh:1,Nb:1,gb:1,ya:1,d:1,f:1});function kn(){V.call(this)}kn.prototype=new xm;function ln(){}ln.prototype=kn.prototype;var mn=new t({mg:0},!1,"java.nio.charset.CharacterCodingException",ym,{mg:1,zf:1,gb:1,ya:1,d:1,f:1});kn.prototype.a=mn;function sm(){V.call(this)}sm.prototype=new Gm;sm.prototype.a=new t({Tl:0},!1,"java.lang.ArithmeticException",Hm,{Tl:1,Nb:1,gb:1,ya:1,d:1,f:1});function F(){V.call(this)}F.prototype=new Gm;
function nn(){}nn.prototype=F.prototype;F.prototype.c=function(){F.prototype.rc.call(this,null,null);return this};F.prototype.s=function(a){F.prototype.rc.call(this,a,null);return this};var on=new t({Mg:0},!1,"java.lang.IllegalArgumentException",Hm,{Mg:1,Nb:1,gb:1,ya:1,d:1,f:1});F.prototype.a=on;function Od(){V.call(this)}Od.prototype=new Gm;Od.prototype.c=function(){Od.prototype.rc.call(this,null,null);return this};
Od.prototype.a=new t({am:0},!1,"java.lang.IllegalStateException",Hm,{am:1,Nb:1,gb:1,ya:1,d:1,f:1});function H(){V.call(this)}H.prototype=new Gm;H.prototype.c=function(){H.prototype.s.call(this,null);return this};H.prototype.a=new t({bm:0},!1,"java.lang.IndexOutOfBoundsException",Hm,{bm:1,Nb:1,gb:1,ya:1,d:1,f:1});function pn(){zm.call(this);this.pi=null;this.Fg=!1;this.Te=null}pn.prototype=new Am;function pe(a){var b=new pn;b.pi=a;zm.prototype.Ig.call(b,(new Wj).c());b.Fg=!0;b.Te="";return b}
function Bm(a,b){for(var c=b;""!==c;){var e=c.indexOf("\n")|0;if(0>e)a.Te=""+a.Te+c,a.Fg=!1,c="";else{var g=""+a.Te+c.substring(0,e);n.console&&(a.pi&&n.console.error?n.console.error(g):n.console.log(g));a.Te="";a.Fg=!0;c=c.substring(1+e|0)}}}pn.prototype.a=new t({em:0},!1,"java.lang.JSConsoleBasedPrintStream",Cm,{em:1,xh:1,jg:1,He:1,d:1,xf:1,yf:1,Of:1});function ta(){V.call(this)}ta.prototype=new Gm;ta.prototype.c=function(){ta.prototype.s.call(this,null);return this};
ta.prototype.a=new t({hm:0},!1,"java.lang.NullPointerException",Hm,{hm:1,Nb:1,gb:1,ya:1,d:1,f:1});function Sd(){V.call(this)}Sd.prototype=new Gm;function qn(){}qn.prototype=Sd.prototype;Sd.prototype.c=function(){Sd.prototype.rc.call(this,null,null);return this};Sd.prototype.s=function(a){Sd.prototype.rc.call(this,a,null);return this};var rn=new t({zi:0},!1,"java.lang.UnsupportedOperationException",Hm,{zi:1,Nb:1,gb:1,ya:1,d:1,f:1});Sd.prototype.a=rn;function ck(){V.call(this)}ck.prototype=new Gm;
ck.prototype.a=new t({om:0},!1,"java.util.NoSuchElementException",Hm,{om:1,Nb:1,gb:1,ya:1,d:1,f:1});function L(){V.call(this);this.Di=this.lf=null;this.tg=!1}L.prototype=new Gm;L.prototype.Jf=function(){if(!this.tg&&!this.tg){var a;if(null===this.lf)a="null";else try{a=ha(this.lf)+" ("+("of class "+hb(ia(this.lf)))+")"}catch(b){if(null!==we(xe(),b))a="an instance of class "+hb(ia(this.lf));else throw b;}this.Di=a;this.tg=!0}return this.Di};
L.prototype.da=function(a){this.lf=a;Fm.prototype.c.call(this);return this};L.prototype.a=new t({wm:0},!1,"scala.MatchError",Hm,{wm:1,Nb:1,gb:1,ya:1,d:1,f:1});function sn(){}sn.prototype=new bn;function tn(){}tn.prototype=sn.prototype;sn.prototype.me=function(){return this.Ef()};sn.prototype.la=function(){return Ci(new Ai,this.Ef())};var un=new t({Zf:0},!1,"scala.collection.generic.ImmutableSetFactory",cn,{Zf:1,de:1,yd:1,ra:1,d:1,Na:1});sn.prototype.a=un;function vn(){}vn.prototype=new bn;
function wn(){}wn.prototype=vn.prototype;vn.prototype.la=function(){return qi(new pi,(new Gh).c())};var xn=new t({aj:0},!1,"scala.collection.generic.MutableSetFactory",cn,{aj:1,de:1,yd:1,ra:1,d:1,Na:1});vn.prototype.a=xn;function yn(){this.va=null}yn.prototype=new Wm;function zn(){}zn.prototype=yn.prototype;var An=new t({fc:0},!1,"scala.collection.generic.SeqFactory",Xm,{fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1});yn.prototype.a=An;function Bn(){}Bn.prototype=new Pm;function Cn(){}m=Cn.prototype=Bn.prototype;
m.Va=function(){return this};m.vf=function(a,b){return Dn(a,b)};m.c=function(){return this};m.o=function(a){return this.ub(a)};function En(a,b){return a.vf(b,Fn(Nb(I(),b)),0)}m.Cb=function(){return this};m.pb=function(){return Gn()};m.ka=aa();m.lh=function(a){if(a&&a.a&&a.a.p.fe)return this.tf(a,0);var b=this.fa();return uk(b,a)};m.ha=k(0);m.fa=function(){return Df().mc};m.Od=function(){return Hn()};function Fn(a){a=a+~(a<<9)|0;a^=a>>>14|0;a=a+(a<<4)|0;return a^(a>>>10|0)}m.he=function(){return this};
m.ub=function(a){return this.nd(a,Fn(Nb(I(),a)),0)};m.zc=function(a){return En(this,a)};m.nd=k(!1);m.tf=k(!0);var In=new t({fe:0},!1,"scala.collection.immutable.HashSet",Qm,{fe:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,hb:1,g:1,f:1});Bn.prototype.a=In;function Jn(){}Jn.prototype=new Mm;function Kn(){}m=Kn.prototype=Jn.prototype;m.Va=function(){return this};m.c=function(){return this};
m.td=function(a){return 0>a?1:Pk(this,a)};m.ed=function(a){return Qk(this,a)};m.o=function(a){return Ok(this,a|0)};m.Cb=function(){return this};m.bi=function(a){for(var b=this;!b.t()&&0<a;)b=b.na(),a=-1+a|0;return b};m.pb=function(){return ud()};m.ka=function(a){for(var b=this;!b.t();)a.o(b.pa()),b=b.na()};m.fa=function(){var a=new Nk;if(null===this)throw ze(xe(),null);a.Lb=this;a.rb=this;return a};m.l=function(){for(var a=this,b=0;!a.t();)b=1+b|0,a=a.na();return b};m.Ad=function(){return this};
m.Wb=function(){return this.t()?Mk():Jk(new Kk,this.pa(),Lk(function(a){return function(){return a.na().Wb()}}(this)))};m.sa=function(){return qk(Sg(),this)};m.xc=k("List");var Ln=new t({ag:0},!1,"scala.collection.immutable.List",Nm,{ag:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,rf:1,xe:1,Ua:1,$a:1,Ya:1,be:1,mf:1,dd:1,nf:1,f:1});Jn.prototype.a=Ln;function Mn(){}Mn.prototype=new Pm;function Nn(){}m=Nn.prototype=Mn.prototype;m.Va=function(){return this};
m.c=function(){return this};m.pa=function(){throw(new ck).s("Set has no elements");};m.o=function(a){return this.ub(a)};m.t=k(!0);m.Cb=function(){return this};m.Vg=function(){throw(new ck).s("Empty ListSet has no outer pointer");};m.pb=function(){On||(On=(new Pn).c());return On};m.De=function(a){return Hh(this,a)};m.ha=k(0);m.fa=function(){return(new hl).se(this)};m.Od=function(){return Bh()};m.he=function(){return this};m.ub=k(!1);m.zc=function(a){return this.De(a)};
m.Ij=function(){throw(new ck).s("Next of an empty set");};m.xc=k("ListSet");var Qn=new t({Zg:0},!1,"scala.collection.immutable.ListSet",Qm,{Zg:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,g:1,f:1});Mn.prototype.a=Qn;function hk(){}hk.prototype=new Zm;hk.prototype.a=new t({Yn:0},!1,"scala.collection.immutable.Map$",$m,{Yn:1,$i:1,Xg:1,Xf:1,d:1});var gk=void 0;function Rn(){}Rn.prototype=new Pm;m=Rn.prototype;
m.Va=function(){return this};m.c=function(){Sn=this;return this};m.o=k(!1);m.Cb=function(){return this};m.pb=function(){return ik()};m.ka=aa();m.ha=k(0);m.fa=function(){return Df().mc};m.Od=function(){return Tn()};m.he=function(){return this};m.zc=function(a){return(new Un).da(a)};m.a=new t({co:0},!1,"scala.collection.immutable.Set$EmptySet$",Qm,{co:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,g:1,f:1});
var Sn=void 0;function Tn(){Sn||(Sn=(new Rn).c());return Sn}function Un(){this.xa=null}Un.prototype=new Pm;m=Un.prototype;m.Va=function(){return this};m.o=function(a){return this.ub(a)};m.Cb=function(){return this};m.pb=function(){return ik()};m.df=function(a){return!!a.o(this.xa)};m.ka=function(a){a.o(this.xa)};m.ha=k(1);m.da=function(a){this.xa=a;return this};m.fa=function(){Df();var a=(new G).ca([this.xa]);return Ak(new zk,a,a.i.length|0)};m.Od=function(){return Tn()};
m.Ed=function(a){return this.ub(a)?this:(new Vn).Yd(this.xa,a)};m.he=function(){return this};m.ub=function(a){return S(T(),a,this.xa)};m.zc=function(a){return this.Ed(a)};m.a=new t({eo:0},!1,"scala.collection.immutable.Set$Set1",Qm,{eo:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,g:1,f:1});function Vn(){this.fb=this.xa=null}Vn.prototype=new Pm;m=Vn.prototype;m.Va=function(){return this};m.o=function(a){return this.ub(a)};
m.Cb=function(){return this};m.Yd=function(a,b){this.xa=a;this.fb=b;return this};m.pb=function(){return ik()};m.df=function(a){return!!a.o(this.xa)&&!!a.o(this.fb)};m.ka=function(a){a.o(this.xa);a.o(this.fb)};m.ha=k(2);m.fa=function(){Df();var a=(new G).ca([this.xa,this.fb]);return Ak(new zk,a,a.i.length|0)};m.Od=function(){return Tn()};m.Ed=function(a){if(this.ub(a))a=this;else{var b=this.fb,c=new Wn;c.xa=this.xa;c.fb=b;c.Zb=a;a=c}return a};m.he=function(){return this};
m.ub=function(a){return S(T(),a,this.xa)||S(T(),a,this.fb)};m.zc=function(a){return this.Ed(a)};m.a=new t({fo:0},!1,"scala.collection.immutable.Set$Set2",Qm,{fo:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,g:1,f:1});function Wn(){this.Zb=this.fb=this.xa=null}Wn.prototype=new Pm;m=Wn.prototype;m.Va=function(){return this};m.o=function(a){return this.ub(a)};m.Cb=function(){return this};m.pb=function(){return ik()};
m.df=function(a){return!!a.o(this.xa)&&!!a.o(this.fb)&&!!a.o(this.Zb)};m.ka=function(a){a.o(this.xa);a.o(this.fb);a.o(this.Zb)};m.ha=k(3);m.fa=function(){Df();var a=(new G).ca([this.xa,this.fb,this.Zb]);return Ak(new zk,a,a.i.length|0)};m.Od=function(){return Tn()};m.Ed=function(a){if(this.ub(a))a=this;else{var b=this.fb,c=this.Zb,e=new Xn;e.xa=this.xa;e.fb=b;e.Zb=c;e.le=a;a=e}return a};m.he=function(){return this};m.ub=function(a){return S(T(),a,this.xa)||S(T(),a,this.fb)||S(T(),a,this.Zb)};
m.zc=function(a){return this.Ed(a)};m.a=new t({go:0},!1,"scala.collection.immutable.Set$Set3",Qm,{go:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,g:1,f:1});function Xn(){this.le=this.Zb=this.fb=this.xa=null}Xn.prototype=new Pm;m=Xn.prototype;m.Va=function(){return this};m.o=function(a){return this.ub(a)};m.Cb=function(){return this};m.pb=function(){return ik()};
m.df=function(a){return!!a.o(this.xa)&&!!a.o(this.fb)&&!!a.o(this.Zb)&&!!a.o(this.le)};m.ka=function(a){a.o(this.xa);a.o(this.fb);a.o(this.Zb);a.o(this.le)};m.ha=k(4);m.fa=function(){Df();var a=(new G).ca([this.xa,this.fb,this.Zb,this.le]);return Ak(new zk,a,a.i.length|0)};m.Od=function(){return Tn()};m.Ed=function(a){if(this.ub(a))return this;var b=(new Bn).c(),c=this.fb;a=[this.Zb,this.le,a];var e=En(En(b,this.xa),c),b=0,c=a.length|0,g=e;for(;;){if(b===c)return g;e=1+b|0;g=g.zc(a[b]);b=e}};
m.he=function(){return this};m.ub=function(a){return S(T(),a,this.xa)||S(T(),a,this.fb)||S(T(),a,this.Zb)||S(T(),a,this.le)};m.zc=function(a){return this.Ed(a)};m.a=new t({ho:0},!1,"scala.collection.immutable.Set$Set4",Qm,{ho:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,g:1,f:1});function Yn(){}Yn.prototype=new Mm;function Zn(){}m=Zn.prototype=Yn.prototype;m.Va=function(){return this};m.c=function(){return this};
m.td=function(a){return 0>a?1:Pk(this,a)};m.o=function(a){return Ok(this,a|0)};m.ed=function(a){return Qk(this,a)};m.Cb=function(){return this};function kl(a,b){var c=(Lf(),(new ml).c());if(ll(c.Ne(a))){if(a.t())c=Mk();else{for(var c=(new tj).da(a),e=b.o(c.$.pa()).Wb();!c.$.t()&&e.t();)c.$=c.$.na(),c.$.t()||(e=b.o(c.$.pa()).Wb());c=c.$.t()?(Lf(),Mk()):$n(e,Lk(function(a,b,c){return function(){return kl(c.$.na(),b)}}(a,b,c)))}return c}return Uk(a,b,c)}
m.bi=function(a){a:{var b=this;for(;;){if(0>=a||b.t()){a=b;break a}b=b.na();a=-1+a|0}a=void 0}return a};m.Og=function(a){return this.te("",a,"")};m.te=function(a,b,c){for(var e=this;!e.t();)e=e.na();return eh(this,a,b,c)};m.pb=function(){return Lf()};m.v=function(){return eh(this,"Stream(",", ",")")};m.ka=function(a){var b=this;a:b:for(;;){if(!b.t()){a.o(b.pa());b=b.na();continue b}break a}};m.fa=function(){return ol(this)};m.Ad=function(){return this};
m.l=function(){for(var a=0,b=this;!b.t();)a=1+a|0,b=b.na();return a};m.jf=function(){return this.te("","","")};m.Wb=function(){return this};m.Le=function(a,b,c,e){Vk(a,b);var g=this;b="";a:b:for(;;){if(g.t())Vk(a,e);else if(Wk(Vk(a,b),g.pa()),g.dg()){g=g.na();b=c;continue b}else Vk(Vk(Vk(a,c),"?"),e);break a}return a};m.sa=function(){return qk(Sg(),this)};function $n(a,b){if(a.t())return b.Me().Wb();var c=a.pa();return Jk(new Kk,c,Lk(function(a,b){return function(){return $n(a.na(),b)}}(a,b)))}
m.xc=k("Stream");var ao=new t({$g:0},!1,"scala.collection.immutable.Stream",Nm,{$g:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,rf:1,xe:1,Ua:1,$a:1,Ya:1,be:1,mf:1,nf:1,g:1,f:1});Yn.prototype.a=ao;function Ph(){this.If=this.Ff=this.ze=0;this.Lh=!1;this.zg=0;this.ai=this.Yh=this.Vh=this.Sh=this.Ph=this.Mh=null}Ph.prototype=new Mm;m=Ph.prototype;m.Va=function(){return this};m.wa=f("Vh");
m.Ta=function(a){var b=a+this.ze|0;if(0<=a&&b<this.Ff)a=b;else throw(new H).s(""+a);return vl(this,a,a^this.If)};m.td=function(a){return this.l()-a|0};m.Yb=f("zg");m.o=function(a){return this.Ta(a|0)};m.Cb=function(){return this};m.Y=function(a,b,c){this.ze=a;this.Ff=b;this.If=c;this.Lh=!1;return this};m.bf=d("ai");m.pb=function(){return ed()};m.db=f("Mh");m.mb=f("Yh");m.eb=d("Sh");m.yc=function(){return Bk(this)};
m.fa=function(){var a=(new ul).ac(this.ze,this.Ff);Qh(a,this,this.zg);if(this.Lh){var b=this.If,c=-1+a.Yb()|0;switch(c){case 5:a.bf(wl(a.Hc()));a.Gc(wl(a.mb()));a.Mb(wl(a.wa()));a.eb(wl(a.ea()));a.Fa(wl(a.X()));a.Hc().b[31&b>>25]=a.mb();a.mb().b[31&b>>20]=a.wa();a.wa().b[31&b>>15]=a.ea();a.ea().b[31&b>>10]=a.X();a.X().b[31&b>>5]=a.db();break;case 4:a.Gc(wl(a.mb()));a.Mb(wl(a.wa()));a.eb(wl(a.ea()));a.Fa(wl(a.X()));a.mb().b[31&b>>20]=a.wa();a.wa().b[31&b>>15]=a.ea();a.ea().b[31&b>>10]=a.X();a.X().b[31&
b>>5]=a.db();break;case 3:a.Mb(wl(a.wa()));a.eb(wl(a.ea()));a.Fa(wl(a.X()));a.wa().b[31&b>>15]=a.ea();a.ea().b[31&b>>10]=a.X();a.X().b[31&b>>5]=a.db();break;case 2:a.eb(wl(a.ea()));a.Fa(wl(a.X()));a.ea().b[31&b>>10]=a.X();a.X().b[31&b>>5]=a.db();break;case 1:a.Fa(wl(a.X()));a.X().b[31&b>>5]=a.db();break;case 0:break;default:throw(new L).da(c);}}1<a.yg&&Rh(a,this.ze,this.ze^this.If);return a};m.Fa=d("Ph");m.Ad=function(){return this};m.l=function(){return this.Ff-this.ze|0};m.Gc=d("Yh");m.X=f("Ph");
m.Hc=f("ai");m.sa=function(){return qk(Sg(),this)};m.kd=d("zg");m.ea=f("Sh");m.Oa=d("Mh");m.Mb=d("Vh");m.a=new t({qo:0},!1,"scala.collection.immutable.Vector",Nm,{qo:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Eq:1,xe:1,Ua:1,$a:1,Ya:1,Pb:1,Qb:1,fj:1,g:1,f:1,hb:1});function bo(){}bo.prototype=new Jm;function co(){}m=co.prototype=bo.prototype;m.pb=function(){jn||(jn=(new hn).c());return jn};m.jc=function(a,b){Ih(this,a,b)};m.ua=aa();
m.Ba=function(a){return Y(this,a)};m.la=function(){return(new yc).c()};var eo=new t({gj:0},!1,"scala.collection.mutable.AbstractMap",Km,{gj:1,Tg:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ui:1,Ug:1,Ti:1,Vi:1,za:1,w:1,Sa:1,Lo:1,ab:1,bb:1,Za:1,Mo:1,Ia:1,Da:1,Ca:1,ee:1,jb:1,Ra:1,Pa:1});bo.prototype.a=eo;function fo(){}fo.prototype=new Mm;function go(){}go.prototype=fo.prototype;fo.prototype.Va=function(){return this.sf()};fo.prototype.sf=function(){return this};
var ho=new t({zb:0},!1,"scala.collection.mutable.AbstractSeq",Nm,{zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1});fo.prototype.a=ho;function io(){}io.prototype=new fn;function jo(){}m=jo.prototype=io.prototype;m.t=function(){return 0===this.ha()};m.ia=function(a){return xk(this,a)};m.v=function(){return Tk(this)};m.lh=function(a){var b=Tl(this);return uk(b,a)};m.yc=function(){return Sk(this)};
m.jc=function(a,b){Ih(this,a,b)};m.sa=function(){var a=Sg();return Qg(a,this,a.fh)};m.ua=aa();m.la=function(){return(new Gh).c()};m.Ba=function(a){return Y(this,a)};m.xc=k("Set");var ko=new t({hj:0},!1,"scala.collection.mutable.AbstractSet",gn,{hj:1,ah:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,ab:1,bb:1,Za:1,No:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,Po:1,of:1,Ia:1,Da:1,Ca:1,ee:1,jb:1,Ra:1,Pa:1});io.prototype.a=ko;function dj(){V.call(this);this.ld=null}dj.prototype=new Gm;
m=dj.prototype;m.cd=k("JavaScriptException");m.ad=k(1);m.Hf=function(){ve();this.stackdata=this.ld;return this};m.ia=function(a){return this===a?!0:ye(a)?S(T(),this.ld,a.ld):!1};m.bd=function(a){switch(a){case 0:return this.ld;default:throw(new H).s(""+a);}};m.v=function(){return ha(this.ld)};m.da=function(a){this.ld=a;Fm.prototype.c.call(this);return this};m.sa=function(){return Wd(this)};m.wd=function(){return Cd(this)};function ye(a){return!!(a&&a.a&&a.a.p.Fj)}
m.a=new t({Fj:0},!1,"scala.scalajs.js.JavaScriptException",Hm,{Fj:1,Nb:1,gb:1,ya:1,d:1,f:1,dd:1,m:1,g:1});function kc(){V.call(this)}kc.prototype=new qn;kc.prototype.a=new t({mk:0},!1,"java.nio.ReadOnlyBufferException",rn,{mk:1,zi:1,Nb:1,gb:1,ya:1,d:1,f:1});function uc(){V.call(this);this.gf=0}uc.prototype=new ln;uc.prototype.Jf=function(){return"Input length \x3d "+this.gf};uc.prototype.aa=function(a){this.gf=a;kn.prototype.c.call(this);return this};
uc.prototype.a=new t({vk:0},!1,"java.nio.charset.MalformedInputException",mn,{vk:1,mg:1,zf:1,gb:1,ya:1,d:1,f:1});function vc(){V.call(this);this.gf=0}vc.prototype=new ln;vc.prototype.Jf=function(){return"Input length \x3d "+this.gf};vc.prototype.aa=function(a){this.gf=a;kn.prototype.c.call(this);return this};vc.prototype.a=new t({wk:0},!1,"java.nio.charset.UnmappableCharacterException",mn,{wk:1,mg:1,zf:1,gb:1,ya:1,d:1,f:1});function Md(){V.call(this);this.il=null}Md.prototype=new nn;
Md.prototype.s=function(a){this.il=a;F.prototype.s.call(this,a);return this};Md.prototype.a=new t({xk:0},!1,"java.nio.charset.UnsupportedCharsetException",on,{xk:1,Mg:1,Nb:1,gb:1,ya:1,d:1,f:1});function lo(){V.call(this);this.El=0}lo.prototype=new nn;function hf(a,b){var c=new lo;c.El=b;F.prototype.s.call(c,"invalid escape character at index "+b+' in "'+a+'"');return c}lo.prototype.a=new t({Em:0},!1,"scala.StringContext$InvalidEscapeException",on,{Em:1,Mg:1,Nb:1,gb:1,ya:1,d:1,f:1});
function mo(){this.va=null}mo.prototype=new zn;mo.prototype.la=function(){no||(no=(new oo).c());return(new Eh).c()};mo.prototype.a=new t({Cn:0},!1,"scala.collection.Seq$",An,{Cn:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1});var po=void 0;function Ub(){po||(po=(new mo).c());return po}function qo(){this.va=null}qo.prototype=new zn;function ro(){}ro.prototype=qo.prototype;var so=new t({$f:0},!1,"scala.collection.generic.IndexedSeqFactory",An,{$f:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1});qo.prototype.a=so;
function Lj(){this.Be=this.ne=null}Lj.prototype=new Kn;m=Lj.prototype;m.cd=k("::");m.pa=f("ne");m.ad=k(2);m.t=k(!1);m.bd=function(a){switch(a){case 0:return this.ne;case 1:return this.Be;default:throw(new H).s(""+a);}};m.na=f("Be");function Kj(a,b,c){a.ne=b;a.Be=c;return a}m.wd=function(){return Cd(this)};
m.a=new t({In:0},!1,"scala.collection.immutable.$colon$colon",Ln,{In:1,ag:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,rf:1,xe:1,Ua:1,$a:1,Ya:1,be:1,mf:1,dd:1,nf:1,f:1,g:1});function to(){}to.prototype=new tn;
function uo(a,b,c,e,g,h){var l=31&(b>>>h|0),q=31&(e>>>h|0);if(l!==q)return a=1<<l|1<<q,b=p(y(In),[2]),l<q?(b.b[0]=c,b.b[1]=g):(b.b[0]=g,b.b[1]=c),vo(new wo,a,b,c.ha()+g.ha()|0);q=p(y(In),[1]);l=1<<l;c=uo(a,b,c,e,g,5+h|0);q.b[0]=c;return vo(new wo,l,q,c.ie)}to.prototype.Ef=function(){return Hn()};to.prototype.a=new t({Ln:0},!1,"scala.collection.immutable.HashSet$",un,{Ln:1,Zf:1,de:1,yd:1,ra:1,d:1,Na:1,g:1,f:1});var xo=void 0;function Gn(){xo||(xo=(new to).c());return xo}function yo(){}
yo.prototype=new Cn;yo.prototype.a=new t({Mn:0},!1,"scala.collection.immutable.HashSet$EmptyHashSet$",In,{Mn:1,fe:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,hb:1,g:1,f:1});var zo=void 0;function Hn(){zo||(zo=(new yo).c());return zo}function wo(){this.Ec=0;this.vb=null;this.ie=0}wo.prototype=new Cn;m=wo.prototype;
m.vf=function(a,b,c){var e=1<<(31&(b>>>c|0)),g=ae(U(),this.Ec&(-1+e|0));if(0!==(this.Ec&e)){e=this.vb.b[g];a=e.vf(a,b,5+c|0);if(e===a)return this;b=p(y(In),[this.vb.b.length]);$(Q(),this.vb,0,b,0,this.vb.b.length);b.b[g]=a;return vo(new wo,this.Ec,b,this.ie+(a.ha()-e.ha()|0)|0)}c=p(y(In),[1+this.vb.b.length|0]);$(Q(),this.vb,0,c,0,g);c.b[g]=Dn(a,b);$(Q(),this.vb,g,c,1+g|0,this.vb.b.length-g|0);return vo(new wo,this.Ec|e,c,1+this.ie|0)};
m.ka=function(a){for(var b=0;b<this.vb.b.length;)this.vb.b[b].ka(a),b=1+b|0};m.fa=function(){var a=new dn;pl.prototype.Fl.call(a,this.vb);return a};m.ha=f("ie");function vo(a,b,c,e){a.Ec=b;a.vb=c;a.ie=e;Td(Ud(),ae(U(),b)===c.b.length);return a}m.nd=function(a,b,c){var e=31&(b>>>c|0),g=1<<e;return-1===this.Ec?this.vb.b[31&e].nd(a,b,5+c|0):0!==(this.Ec&g)?(e=ae(U(),this.Ec&(-1+g|0)),this.vb.b[e].nd(a,b,5+c|0)):!1};
m.tf=function(a,b){if(a===this)return!0;if(rl(a)&&this.ie<=a.ie){var c=this.Ec,e=this.vb,g=0,h=a.vb,l=a.Ec,q=0;if((c&l)===c){for(;0!==c;){var w=c^c&(-1+c|0),J=l^l&(-1+l|0);if(w===J){if(!e.b[g].tf(h.b[q],5+b|0))return!1;c&=~w;g=1+g|0}l&=~J;q=1+q|0}return!0}}return!1};function rl(a){return!!(a&&a.a&&a.a.p.cj)}
m.a=new t({cj:0},!1,"scala.collection.immutable.HashSet$HashTrieSet",In,{cj:1,fe:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,hb:1,g:1,f:1});function Ao(){}Ao.prototype=new Cn;function Bo(){}Bo.prototype=Ao.prototype;
var Co=new t({Yg:0},!1,"scala.collection.immutable.HashSet$LeafHashSet",In,{Yg:1,fe:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,hb:1,g:1,f:1});Ao.prototype.a=Co;function Do(){this.rm=this.va=null}Do.prototype=new zn;Do.prototype.c=function(){yn.prototype.c.call(this);Eo=this;this.rm=(new zh).c();return this};Do.prototype.me=function(){return Ef()};Do.prototype.la=function(){return(new Eh).c()};
Do.prototype.a=new t({Rn:0},!1,"scala.collection.immutable.List$",An,{Rn:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1,g:1,f:1});var Eo=void 0;function ud(){Eo||(Eo=(new Do).c());return Eo}function Pn(){}Pn.prototype=new tn;Pn.prototype.Ef=function(){return Bh()};Pn.prototype.la=function(){return(new Ah).c()};Pn.prototype.a=new t({Tn:0},!1,"scala.collection.immutable.ListSet$",un,{Tn:1,Zf:1,de:1,yd:1,ra:1,d:1,Na:1,g:1,f:1});var On=void 0;function Fo(){}Fo.prototype=new Nn;
Fo.prototype.a=new t({Vn:0},!1,"scala.collection.immutable.ListSet$EmptyListSet$",Qn,{Vn:1,Zg:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,g:1,f:1});var Go=void 0;function Bh(){Go||(Go=(new Fo).c());return Go}function Ho(){this.Wa=this.ne=null}Ho.prototype=new Nn;m=Ho.prototype;m.pa=f("ne");m.t=k(!1);m.Vg=f("Wa");m.De=function(a){return Io(this,a)?this:Hh(this,a)};
m.ha=function(){var a;a:{a=this;var b=0;for(;;){if(a.t()){a=b;break a}a=a.Vg();b=1+b|0}a=void 0}return a};function Hh(a,b){var c=new Ho;c.ne=b;if(null===a)throw ze(xe(),null);c.Wa=a;return c}m.ub=function(a){return Io(this,a)};function Io(a,b){for(;;){if(a.t())return!1;if(S(T(),a.pa(),b))return!0;a=a.Vg()}}m.zc=function(a){return this.De(a)};m.Ij=f("Wa");
m.a=new t({Xn:0},!1,"scala.collection.immutable.ListSet$Node",Qn,{Xn:1,Zg:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,g:1,f:1});function Jo(){}Jo.prototype=new Kn;m=Jo.prototype;m.pa=function(){this.Hg()};m.cd=k("Nil");m.ad=k(0);m.ia=function(a){return kb(a)?a.t():!1};m.t=k(!0);m.bd=function(a){throw(new H).s(""+a);};m.Hg=function(){throw(new ck).s("head of empty list");};
m.na=function(){throw(new Sd).s("tail of empty list");};m.wd=function(){return Cd(this)};m.a=new t({Zn:0},!1,"scala.collection.immutable.Nil$",Ln,{Zn:1,ag:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,rf:1,xe:1,Ua:1,$a:1,Ya:1,be:1,mf:1,dd:1,nf:1,f:1,g:1});var Ko=void 0;function Ef(){Ko||(Ko=(new Jo).c());return Ko}function oo(){this.va=null}oo.prototype=new zn;oo.prototype.la=function(){return(new Eh).c()};
oo.prototype.a=new t({ao:0},!1,"scala.collection.immutable.Seq$",An,{ao:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1});var no=void 0;function Lo(){}Lo.prototype=new tn;Lo.prototype.Ef=function(){return Tn()};Lo.prototype.a=new t({bo:0},!1,"scala.collection.immutable.Set$",un,{bo:1,Zf:1,de:1,yd:1,ra:1,d:1,Na:1});var Mo=void 0;function ik(){Mo||(Mo=(new Lo).c());return Mo}function No(){this.va=null}No.prototype=new zn;No.prototype.me=function(){return Mk()};No.prototype.la=function(){return(new il).c()};
No.prototype.a=new t({io:0},!1,"scala.collection.immutable.Stream$",An,{io:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1,g:1,f:1});var Oo=void 0;function Lf(){Oo||(Oo=(new No).c());return Oo}function Kk(){this.eg=this.Jj=this.ji=null}Kk.prototype=new Zn;m=Kk.prototype;m.pa=f("ji");m.dg=function(){return null===this.eg};m.t=k(!1);m.na=function(){this.dg()||this.dg()||(this.Jj=this.eg.Me(),this.eg=null);return this.Jj};function Jk(a,b,c){a.ji=b;a.eg=c;return a}
m.a=new t({ko:0},!1,"scala.collection.immutable.Stream$Cons",ao,{ko:1,$g:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,rf:1,xe:1,Ua:1,$a:1,Ya:1,be:1,mf:1,nf:1,g:1,f:1});function Po(){}Po.prototype=new Zn;m=Po.prototype;m.pa=function(){this.Hg()};m.dg=k(!1);m.t=k(!0);m.Hg=function(){throw(new ck).s("head of empty stream");};m.na=function(){throw(new Sd).s("tail of empty stream");};
m.a=new t({lo:0},!1,"scala.collection.immutable.Stream$Empty$",ao,{lo:1,$g:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,rf:1,xe:1,Ua:1,$a:1,Ya:1,be:1,mf:1,nf:1,g:1,f:1});var Qo=void 0;function Mk(){Qo||(Qo=(new Po).c());return Qo}function Ro(){}Ro.prototype=new go;function So(){}So.prototype=Ro.prototype;Ro.prototype.Ba=function(a){return Y(this,a)};
var To=new t({bg:0},!1,"scala.collection.mutable.AbstractBuffer",ho,{bg:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,bh:1,ch:1,Da:1,Ca:1,ee:1,of:1,Sa:1});Ro.prototype.a=To;function Uo(){this.va=null}Uo.prototype=new zn;Uo.prototype.la=function(){return(new Ck).c()};Uo.prototype.a=new t({vo:0},!1,"scala.collection.mutable.ArrayBuffer$",An,{vo:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1,g:1,f:1});
var Vo=void 0;function ch(){Vo||(Vo=(new Uo).c());return Vo}function yc(){this.Nc=0;this.ba=null;this.gd=this.Vb=0;this.Bb=null;this.zd=0}yc.prototype=new co;m=yc.prototype;m.Va=function(){return this};m.c=function(){yc.prototype.Pl.call(this,null);return this};m.o=function(a){var b=Zl(this,a);if(null===b)throw(new ck).s("key not found: "+a);return b.Ja};m.Cb=function(){return this};function Wo(a,b){var c=Rd(a,b.kc,b.Xb);null!==c&&(c.Ja=b.Xb);return a}m.Ea=function(a){return Wo(this,a)};
m.ka=function(a){for(var b=this.ba,c=Yl(this),e=b.b[c];null!==e;){var g=e;a.o((new zd).Yd(g.nc,g.Ja));for(e=e.vd;null===e&&0<c;)c=-1+c|0,e=b.b[c]}};m.ha=f("Vb");m.ma=function(){return this};m.fa=function(){return Ik(new Hk,Xl(this),Vb(function(){return function(a){return(new zd).Yd(a.nc,a.Ja)}}(this)))};
m.Pl=function(a){this.Nc=750;this.ba=p(y(nb),[si()]);this.Vb=0;this.gd=ti().kf(this.Nc,si());this.Bb=null;this.zd=ae(U(),-1+this.ba.b.length|0);null!==a&&(this.Nc=a.pm(),this.ba=a.Sq(),this.Vb=a.xp(),this.gd=a.yp(),this.zd=a.To(),this.Bb=a.Vo());return this};function Qd(a,b){var c=Zl(a,b);return null===c?Kd():(new Jd).da(c.Ja)}m.Aa=function(a){return Wo(this,a)};
m.a=new t({Co:0},!1,"scala.collection.mutable.HashMap",eo,{Co:1,gj:1,Tg:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Ui:1,Ug:1,Ti:1,Vi:1,za:1,w:1,Sa:1,Lo:1,ab:1,bb:1,Za:1,Mo:1,Ia:1,Da:1,Ca:1,ee:1,jb:1,Ra:1,Pa:1,Iq:1,Jq:1,hb:1,g:1,f:1});function Gh(){this.Nc=0;this.ba=null;this.gd=this.Vb=0;this.Bb=null;this.zd=0}Gh.prototype=new jo;m=Gh.prototype;m.Va=function(){return this};m.c=function(){Gh.prototype.Ol.call(this,null);return this};
m.o=function(a){return null!==Jh(this,a)};m.Cb=function(){return this};m.Ea=function(a){return Lh(this,a)};m.pb=function(){Xo||(Xo=(new Yo).c());return Xo};m.ka=function(a){for(var b=0,c=this.ba.b.length;b<c;){var e=this.ba.b[b];null!==e&&a.o(e===oi()?null:e);b=1+b|0}};m.ha=f("Vb");m.ma=function(){return this};m.fa=function(){return Tl(this)};
m.Ol=function(a){this.Nc=450;this.ba=p(y(v),[ui(ti(),32)]);this.Vb=0;this.gd=li().kf(this.Nc,ui(ti(),32));this.Bb=null;this.zd=ae(U(),-1+this.ba.b.length|0);null!==a&&(this.Nc=a.pm(),this.ba=a.Rq(),this.Vb=a.xp(),this.gd=a.yp(),this.zd=a.To(),this.Bb=a.Vo());return this};m.Aa=function(a){return Lh(this,a)};m.zc=function(a){var b=(new Gh).c();return Lh(Y(b,this),a)};function Lh(a,b){var c=null===b?oi():b;Vl(a,c);return a}
m.a=new t({Do:0},!1,"scala.collection.mutable.HashSet",ko,{Do:1,hj:1,ah:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,ab:1,bb:1,Za:1,No:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,Po:1,of:1,Ia:1,Da:1,Ca:1,ee:1,jb:1,Ra:1,Pa:1,Gq:1,Hq:1,hb:1,g:1,f:1});function Yo(){}Yo.prototype=new wn;Yo.prototype.me=function(){return(new Gh).c()};Yo.prototype.a=new t({Eo:0},!1,"scala.collection.mutable.HashSet$",xn,{Eo:1,aj:1,de:1,yd:1,ra:1,d:1,Na:1,g:1,f:1});var Xo=void 0;
function Zo(){this.va=null}Zo.prototype=new zn;Zo.prototype.la=function(){return(new Ck).c()};Zo.prototype.a=new t({Ho:0},!1,"scala.collection.mutable.IndexedSeq$",An,{Ho:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1});var $o=void 0;function ap(){$o||($o=(new Zo).c());return $o}function bp(){this.va=null}bp.prototype=new zn;bp.prototype.la=function(){return qi(new pi,(new Eh).c())};bp.prototype.a=new t({Jo:0},!1,"scala.collection.mutable.ListBuffer$",An,{Jo:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1,g:1,f:1});
var cp=void 0;function Ue(){this.Rb=null}Ue.prototype=new go;m=Ue.prototype;m.Va=function(){return this};m.c=function(){Ue.prototype.Il.call(this,16,"");return this};m.Ta=function(a){a=65535&(this.Rb.lb.charCodeAt(a)|0);return(new Xd).od(a)};m.td=function(a){return this.l()-a|0};m.o=function(a){a=65535&(this.Rb.lb.charCodeAt(a|0)|0);return(new Xd).od(a)};m.ed=function(a){return Fk(this,a)};m.t=function(){return 0===this.l()};m.Cb=function(){return this};
m.kh=function(a,b){return this.Rb.lb.substring(a,b)};m.Ea=function(a){a=rj(T(),a);me(this.Rb,a);return this};m.v=function(){return this.Rb.lb};m.pb=function(){return ap()};m.ka=function(a){Gk(this,a)};m.yc=function(){return Bk(this)};m.ma=function(){return this.Rb.lb};function Vk(a,b){je(a.Rb,b);return a}m.sf=function(){return this};m.fa=function(){return Ak(new zk,this,this.Rb.lb.length|0)};m.jc=function(a,b){Ih(this,a,b)};
m.Il=function(a,b){Ue.prototype.Ll.call(this,je((new ie).aa((b.length|0)+a|0),b));return this};m.Ad=function(){return this};m.jf=function(){return this.Rb.lb};m.l=function(){return this.Rb.lb.length|0};m.Ll=function(a){this.Rb=a;return this};function Wk(a,b){je(a.Rb,Zi(za(),b));return a}m.Aa=function(a){a=rj(T(),a);me(this.Rb,a);return this};m.Fc=function(a,b,c){Ek(this,a,b,c)};m.ua=aa();m.sa=function(){return qk(Sg(),this)};m.vg=function(a){return 65535&(this.Rb.lb.charCodeAt(a)|0)};
m.la=function(){return qi(new pi,(new Ue).c())};m.Ba=function(a){return Y(this,a)};m.a=new t({Qo:0},!1,"scala.collection.mutable.StringBuilder",ho,{Qo:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,Pf:1,hc:1,Pb:1,Qb:1,ic:1,Fq:1,cc:1,wq:1,Qa:1,Ia:1,Da:1,Ca:1,g:1,f:1});function dp(){}dp.prototype=new go;function ep(){}m=ep.prototype=dp.prototype;m.Va=function(){return this};
m.td=function(a){return this.l()-a|0};m.ed=function(a){return Fk(this,a)};m.Cb=function(){return this};m.t=function(){return 0===this.l()};m.pb=function(){return ap()};m.ka=function(a){Gk(this,a)};m.yc=function(){return Bk(this)};m.sf=function(){return this};m.fa=function(){return Ak(new zk,this,this.l())};m.Ad=function(){return this};m.Fc=function(a,b,c){Ek(this,a,b,c)};m.sa=function(){return qk(Sg(),this)};m.la=function(){return(new Di).re(this.Ic())};m.xc=k("WrappedArray");
var fp=new t({wc:0},!1,"scala.collection.mutable.WrappedArray",ho,{wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1});dp.prototype.a=fp;function gp(){this.va=null}gp.prototype=new zn;gp.prototype.la=function(){return(new G).c()};gp.prototype.a=new t({Yo:0},!1,"scala.scalajs.js.WrappedArray$",An,{Yo:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1});var hp=void 0;
function ip(){this.qg=this.va=null}ip.prototype=new ro;ip.prototype.c=function(){qo.prototype.c.call(this);jp=this;this.qg=(new yk).c();return this};ip.prototype.la=function(){cd();ed();return(new fd).c()};ip.prototype.a=new t({un:0},!1,"scala.collection.IndexedSeq$",so,{un:1,$f:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1});var jp=void 0;function dd(){jp||(jp=(new ip).c());return jp}function kp(){this.qd=null;this.$b=0}kp.prototype=new Bo;m=kp.prototype;
m.vf=function(a,b,c){if(b===this.$b&&S(T(),a,this.qd))return this;if(b!==this.$b)return uo(Gn(),this.$b,this,b,Dn(a,b),c);var e=Bh();c=new lp;a=Hh(e,this.qd).De(a);c.$b=b;c.rd=a;return c};function Dn(a,b){var c=new kp;c.qd=a;c.$b=b;return c}m.ka=function(a){a.o(this.qd)};m.fa=function(){Df();var a=(new G).ca([this.qd]);return Ak(new zk,a,a.i.length|0)};m.ha=k(1);m.nd=function(a,b){return b===this.$b&&S(T(),a,this.qd)};m.tf=function(a,b){return a.nd(this.qd,this.$b,b)};
m.a=new t({bj:0},!1,"scala.collection.immutable.HashSet$HashSet1",Co,{bj:1,Yg:1,fe:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,hb:1,g:1,f:1});function lp(){this.$b=0;this.rd=null}lp.prototype=new Bo;m=lp.prototype;m.vf=function(a,b,c){b===this.$b?(c=new lp,a=this.rd.De(a),c.$b=b,c.rd=a,b=c):b=uo(Gn(),this.$b,this,b,Dn(a,b),c);return b};m.ka=function(a){var b=(new hl).se(this.rd);bh(b,a)};m.fa=function(){return(new hl).se(this.rd)};
m.ha=function(){return this.rd.ha()};m.nd=function(a,b){return b===this.$b&&this.rd.ub(a)};m.tf=function(a,b){for(var c=(new hl).se(this.rd),e=!0;;)if(e&&!c.je.t())e=c.ga(),e=a.nd(e,this.$b,b);else break;return e};m.a=new t({Nn:0},!1,"scala.collection.immutable.HashSet$HashSetCollision1",Co,{Nn:1,Yg:1,fe:1,Ob:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,Gb:1,w:1,xb:1,Fb:1,Ib:1,Hb:1,Sa:1,gc:1,Ua:1,$a:1,Ya:1,hb:1,g:1,f:1});function mp(){this.va=null}mp.prototype=new ro;
mp.prototype.la=function(){ed();return(new fd).c()};mp.prototype.a=new t({Pn:0},!1,"scala.collection.immutable.IndexedSeq$",so,{Pn:1,$f:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1});var np=void 0;function cd(){np||(np=(new mp).c())}function op(){this.og=this.va=null;this.dq=this.Hp=0}op.prototype=new ro;op.prototype.c=function(){qo.prototype.c.call(this);pp=this;this.og=(new Ph).Y(0,0,0);return this};op.prototype.me=f("og");op.prototype.la=function(){return(new fd).c()};
op.prototype.a=new t({ro:0},!1,"scala.collection.immutable.Vector$",so,{ro:1,$f:1,fc:1,Ub:1,ib:1,ra:1,d:1,yb:1,Na:1,g:1,f:1});var pp=void 0;function ed(){pp||(pp=(new op).c());return pp}function Ck(){this.oi=0;this.i=null;this.Ab=0}Ck.prototype=new So;m=Ck.prototype;m.Va=function(){return this};m.c=function(){Ck.prototype.aa.call(this,16);return this};function qp(a,b){dm(a,1+a.Ab|0);a.i.b[a.Ab]=b;a.Ab=1+a.Ab|0;return a}m.Ta=function(a){return em(this,a)};m.td=function(a){return this.l()-a|0};
m.o=function(a){return em(this,a|0)};m.ed=function(a){return Fk(this,a)};m.t=function(){return 0===this.l()};m.Cb=function(){return this};m.Ea=function(a){return qp(this,a)};m.pb=function(){return ch()};m.ka=function(a){for(var b=0,c=this.Ab;b<c;)a.o(this.i.b[b]),b=1+b|0};m.yc=function(){return Bk(this)};m.ma=function(){return this};m.sf=function(){return this};m.fa=function(){return Ak(new zk,this,this.Ab)};m.aa=function(a){a=this.oi=a;this.i=p(y(v),[1<a?a:1]);this.Ab=0;return this};
m.jc=function(a,b){Ih(this,a,b)};m.Ad=function(){return this};m.l=f("Ab");function Dk(a,b){if(lb(b)){var c=b.l();dm(a,a.Ab+c|0);b.Fc(a.i,a.Ab,c);a.Ab=a.Ab+c|0;return a}return Y(a,b)}m.Aa=function(a){return qp(this,a)};m.Fc=function(a,b,c){var e=ah(I(),a)-b|0;c=c<e?c:e;e=this.Ab;c=c<e?c:e;$(Q(),this.i,0,a,b,c)};m.sa=function(){return qk(Sg(),this)};m.ua=function(a){a>this.Ab&&1<=a&&(a=p(y(v),[a]),La(this.i,0,a,0,this.Ab),this.i=a)};m.Ba=function(a){return Dk(this,a)};m.xc=k("ArrayBuffer");
m.a=new t({uo:0},!1,"scala.collection.mutable.ArrayBuffer",To,{uo:1,bg:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,bh:1,ch:1,Da:1,Ca:1,ee:1,of:1,Sa:1,oc:1,ic:1,Qb:1,cc:1,Ia:1,Kq:1,hc:1,Pb:1,hb:1,g:1,f:1});function Eh(){this.Zd=this.ta=null;this.Gf=!1;this.sd=0}Eh.prototype=new So;m=Eh.prototype;m.xg=function(a,b){this.ta.Fc(a,b,ah(I(),a)-b|0)};
m.c=function(){this.ta=Ef();this.Gf=!1;this.sd=0;return this};m.Ta=function(a){if(0>a||a>=this.sd)throw(new H).s(""+a);return Ok(this.ta,a)};m.td=function(a){return 0>a?1:Pk(this.ta,a)};m.ed=function(a){return Qk(this.ta,a)};m.o=function(a){return this.Ta(a|0)};m.t=function(){return this.ta.t()};m.Cb=function(){return this};m.ia=function(a){return a&&a.a&&a.a.p.uj?this.ta.ia(a.ta):kb(a)?this.ed(a):!1};m.te=function(a,b,c){return eh(this.ta,a,b,c)};m.Og=function(a){return eh(this.ta,"",a,"")};
m.Ea=function(a){return Kh(this,a)};m.pb=function(){cp||(cp=(new bp).c());return cp};m.ka=function(a){for(var b=this.ta;!b.t();)a.o(b.pa()),b=b.na()};m.yc=function(){var a=this.ta,b=ch().va;return lh(a,b)};m.ha=f("sd");m.ma=function(){this.Gf=!this.ta.t();return this.ta};m.fa=function(){var a=new cm;a.Ye=this.ta.t()?Ef():this.ta;return a};m.jc=function(a,b){Ih(this,a,b)};m.jf=function(){return eh(this.ta,"","","")};m.l=f("sd");m.Ad=function(){return this};m.Wb=function(){return this.ta.Wb()};
m.Le=function(a,b,c,e){return gh(this.ta,a,b,c,e)};function Kh(a,b){if(a.Gf&&!a.ta.t()){var c=a.ta,e=a.Zd.Be;a.ta=Ef();a.Zd=null;a.Gf=!1;for(a.sd=0;c!==e;)Kh(a,c.pa()),c=c.na()}a.ta.t()?(a.Zd=Kj(new Lj,b,Ef()),a.ta=a.Zd):(c=a.Zd,a.Zd=Kj(new Lj,b,Ef()),c.Be=a.Zd);a.sd=1+a.sd|0;return a}m.Aa=function(a){return Kh(this,a)};m.ua=aa();m.Fc=function(a,b,c){vk(this.ta,a,b,c)};m.Kj=function(a){return id(this.ta,a)};
function Dh(a,b){a:for(;;){var c=b;if(null!==c&&c===a){var e=a,c=a.sd,g=e.la();if(!(0>=c)){g.jc(c,e);for(var h=0,e=e.fa();h<c&&e.ja();)g.Aa(e.ga()),h=1+h|0}b=g.ma();continue a}return Y(a,b)}}m.Ba=function(a){return Dh(this,a)};m.xc=k("ListBuffer");
m.a=new t({uj:0},!1,"scala.collection.mutable.ListBuffer",To,{uj:1,bg:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,bh:1,ch:1,Da:1,Ca:1,ee:1,of:1,Sa:1,Ia:1,Bq:1,Aq:1,Cq:1,f:1});function Oi(){this.i=null}Oi.prototype=new ep;m=Oi.prototype;m.Ta=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Mc=function(a,b){this.i.b[a]=!!b};m.l=function(){return this.i.b.length};m.Ic=function(){return R().Oc};
m.a=new t({vj:0},!1,"scala.collection.mutable.WrappedArray$ofBoolean",fp,{vj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function Hi(){this.i=null}Hi.prototype=new ep;m=Hi.prototype;m.Ta=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Mc=function(a,b){this.i.b[a]=b|0};m.l=function(){return this.i.b.length};
m.Ic=function(){return R().kb};m.a=new t({wj:0},!1,"scala.collection.mutable.WrappedArray$ofByte",fp,{wj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function Ji(){this.i=null}Ji.prototype=new ep;m=Ji.prototype;m.Ta=function(a){return(new Xd).od(this.i.b[a])};m.o=function(a){return(new Xd).od(this.i.b[a|0])};
m.Mc=function(a,b){var c=rj(T(),b);this.i.b[a]=c};m.l=function(){return this.i.b.length};m.Ic=function(){return R().Pc};m.a=new t({xj:0},!1,"scala.collection.mutable.WrappedArray$ofChar",fp,{xj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function Ni(){this.i=null}Ni.prototype=new ep;m=Ni.prototype;m.Ta=function(a){return this.i.b[a]};
m.o=function(a){return this.i.b[a|0]};m.Mc=function(a,b){this.i.b[a]=+b};m.l=function(){return this.i.b.length};m.Ic=function(){return R().Qc};m.a=new t({yj:0},!1,"scala.collection.mutable.WrappedArray$ofDouble",fp,{yj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function Mi(){this.i=null}Mi.prototype=new ep;m=Mi.prototype;m.Ta=function(a){return this.i.b[a]};
m.o=function(a){return this.i.b[a|0]};m.Mc=function(a,b){var c=na(b);this.i.b[a]=c};m.l=function(){return this.i.b.length};m.Ic=function(){return R().Rc};m.a=new t({zj:0},!1,"scala.collection.mutable.WrappedArray$ofFloat",fp,{zj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function Ki(){this.i=null}Ki.prototype=new ep;m=Ki.prototype;
m.Ta=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Mc=function(a,b){this.i.b[a]=b|0};m.l=function(){return this.i.b.length};m.Ic=function(){return R().Ac};m.a=new t({Aj:0},!1,"scala.collection.mutable.WrappedArray$ofInt",fp,{Aj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function Li(){this.i=null}
Li.prototype=new ep;m=Li.prototype;m.Ta=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Mc=function(a,b){var c=Na(b);this.i.b[a]=c};m.l=function(){return this.i.b.length};m.Ic=function(){return R().Sc};
m.a=new t({Bj:0},!1,"scala.collection.mutable.WrappedArray$ofLong",fp,{Bj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function wd(){this.ci=this.i=null;this.ug=!1}wd.prototype=new ep;m=wd.prototype;m.o=function(a){return this.Ta(a|0)};m.Ta=function(a){return this.i.b[a]};m.Mc=function(a,b){this.i.b[a]=b};
function vd(a,b){a.i=b;return a}m.l=function(){return this.i.b.length};m.Ic=function(){this.ug||this.ug||(this.ci=ld(R(),Gi(I(),ia(this.i))),this.ug=!0);return this.ci};m.a=new t({Cj:0},!1,"scala.collection.mutable.WrappedArray$ofRef",fp,{Cj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function Ii(){this.i=null}Ii.prototype=new ep;m=Ii.prototype;
m.Ta=function(a){return this.i.b[a]};m.o=function(a){return this.i.b[a|0]};m.Mc=function(a,b){this.i.b[a]=b|0};m.l=function(){return this.i.b.length};m.Ic=function(){return R().Uc};m.a=new t({Dj:0},!1,"scala.collection.mutable.WrappedArray$ofShort",fp,{Dj:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});function Pi(){this.i=null}
Pi.prototype=new ep;m=Pi.prototype;m.Ta=function(a){this.i.b[a]};m.o=function(a){this.i.b[a|0]};m.Mc=function(a,b){this.i.b[a]=b};m.l=function(){return this.i.b.length};m.Ic=function(){return R().Vc};m.a=new t({Ej:0},!1,"scala.collection.mutable.WrappedArray$ofUnit",fp,{Ej:1,wc:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,hb:1,g:1,f:1});
function G(){this.i=null}G.prototype=new So;m=G.prototype;m.Va=function(){return this};m.c=function(){G.prototype.ca.call(this,[]);return this};m.Ta=function(a){return this.i[a]};m.td=function(a){return this.l()-a|0};m.o=function(a){return this.i[a|0]};m.ed=function(a){return Fk(this,a)};m.t=function(){return 0===this.l()};m.Cb=function(){return this};m.Ea=function(a){this.i.push(a);return this};m.pb=function(){hp||(hp=(new gp).c());return hp};m.ka=function(a){Gk(this,a)};m.yc=function(){return Bk(this)};
m.ma=function(){return this};m.sf=function(){return this};m.fa=function(){return Ak(new zk,this,this.i.length|0)};m.jc=function(a,b){Ih(this,a,b)};m.l=function(){return this.i.length|0};m.Ad=function(){return this};m.Aa=function(a){this.i.push(a);return this};m.sa=function(){return qk(Sg(),this)};m.Fc=function(a,b,c){Ek(this,a,b,c)};m.ua=aa();m.ca=function(a){this.i=a;return this};m.xc=k("WrappedArray");
m.a=new t({Xo:0},!1,"scala.scalajs.js.WrappedArray",To,{Xo:1,bg:1,zb:1,Ga:1,N:1,y:1,d:1,G:1,H:1,M:1,K:1,r:1,q:1,A:1,E:1,z:1,L:1,R:1,P:1,Q:1,U:1,m:1,La:1,za:1,w:1,Ha:1,Ka:1,Ma:1,Jb:1,ab:1,bb:1,Za:1,Kb:1,jb:1,Ra:1,Pa:1,bh:1,ch:1,Da:1,Ca:1,ee:1,of:1,Sa:1,hc:1,Pb:1,Qb:1,ic:1,vc:1,oc:1,cc:1,Ia:1});}).call(this);
//# sourceMappingURL=parolamea-opt.js.map
