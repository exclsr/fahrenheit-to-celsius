walk(document.body);

document.title = replaceText(document.title);

	// TODO: Move this into unit tests.
	// console.log(document.documentElement.lang)

	// var s = "It's 122 literally 122 degrees 122° the 90-degree mark in NYC";
	// var regex = new RegExp("(\\d+)(\\s*-?)degree(s?)", "g");

	// s.replace(regex, function (match, degrees, hyphen, plural, offset, string) {
	// 	var celsius = toCelsius(degrees);
	// 	var result = celsius + hyphen + "degree" + plural;
	// 	console.log(result);
	// 	return result;
	// });

	// s.replace(regex, function (match, degrees, offset, string) {
	// 	console.log(match);
	// 	console.log(degrees);
	// 	console.log(offset);
	// 	console.log(string);

	// 	var celsius = (degrees - 32) / 1.8;
	// 	return celsius + " degrees";
	// });


function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function toCelsius(fahrenheit) {
	return ((fahrenheit - 32) / 1.8).toFixed(0);
}

function replaceText(v)
{
    //	"It's literally 122 degrees in NYC";
    //  "Topping the 90-degree mark"
	var regex = new RegExp("(\\d+)(\\s*-?)degree(s?)", "g");

	v = v.replace(regex, function (match, degrees, hyphen, plural, offset, string) {
		var celsius = toCelsius(degrees);
		return celsius + hyphen + "degree" + plural;
	});

	// TODO: Not sure if this is effective.
	v = v.replace(new RegExp("(\\d+)°", "g"), function (match, degrees, offset, string) {
		var celsius = toCelsius(degrees);
		return celsius + "°";
	});

	// Fahrenheit
	v = v.replace(/\bFahrenheit\b/g, "Celsiuuuuus");
	v = v.replace(/\bfahrenheit\b/g, "celsius");

	return v;
}
