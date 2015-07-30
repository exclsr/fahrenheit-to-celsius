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
	var degreeRegex = new RegExp("(\\d+)(\\s*-?)degree(s?)", "g");

	v = v.replace(degreeRegex, function (match, degrees, hyphen, plural, offset, string) {
		var celsius = toCelsius(degrees);
		return celsius + hyphen + "degree" + plural;
	});

    // "High temperatures of 80 or more" ...
	var tempRegex = new RegExp("(temperatures[\\s*\\w]{0,3}\\s*)(\\d+)", "g");
	v = v.replace(tempRegex, function (match, prefix, degrees, offset, string) {
		var celsius = toCelsius(degrees);
		return prefix + celsius;
	});

	// "upper 90s" ...
	var modRegex = new RegExp("(upper\\s*)(\\d+)", "g");
	v = v.replace(modRegex, function (match, prefix, degrees, offset, string) {
		var celsius = toCelsius(degrees);
		return prefix + celsius;
	});

	// TODO: 
	// highs in the 90s, high 90s ...
	// lows in the 60s, low 60s ....
	// ranges: e.g. upper 90s to 100s
	// mid 90s, middle 90s ...

	// TODO: of (temp) !degrees
	// Something like "high of 90 degrees" gets converted twice.
	// var modRegex = new RegExp("(of\\s)(\\d+)\\s*(?!degrees)", "g");
	// v = v.replace(modRegex, function (match, prefix, degrees, offset, string) {
	// 	if (degrees > 300) {
	// 		return match;
	// 	}
	// 	var celsius = toCelsius(degrees);
	// 	console.log(match)
	// 	console.log(prefix)
	// 	console.log(degrees)
	// 	console.log("String: " + string)
	// 	return prefix + celsius;		
	// });

	// var modRegex = new RegExp("(upper\\s*)(\\d+)", "g");
	// v = v.replace(modRegex, function (match, prefix, degrees, offset, string) {
	// 	var celsius = toCelsius(degrees);
	// 	return prefix + celsius;
	// });


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
