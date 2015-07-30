walk(document.body);

document.title = replaceText(document.title);

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

function replaceText(v)
{
	// Fix some misspellings
	// v = v.replace(/\b(M|m)illienial(s)?\b/g, "$1illennial$2");

	// Millennial Generation
	// v = v.replace(
	// 	/\b(?:Millennial Generation)|(?:Generation Millennial)\b/g,
	// 	"Plissken Faction"
	// );
	// v = v.replace(
	// 	/\b(?:millennial generation)|(?:generation millennial)\b/g,
	// 	"Plissken faction"
	// );

	// Fahrenheit
	v = v.replace(/\bFahrenheit\b/g, "Celsius");
	v = v.replace(/\bfahrenheit\b/g, "celsius");

	// v = v.replace(
	// 	/\b(?:Millennial Generation)|(?:Generation Millennial)\b/g,
	// 	"Plissken Faction"
	// );

	return v;
}
