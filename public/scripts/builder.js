import React from 'react';
import ReactDOM from 'react-dom';
import Select from '@atlaskit/select';
import { Form, Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { CreatableSelect } from '@atlaskit/select';
import Button from '@atlaskit/button';

class Author {
	constructor(firstNameInitials, lastName, companyName) {

		this.properties = {
			firstNameInitials: {
				label: "First and middle name initials",
				value: firstNameInitials || ""
			},
			lastName: {
				label: "Last name",
				value: lastName || ""
			}
		};
	}

	render() {
		return (
			this.properties.lastName.value + ", " + this.properties.firstNameInitials.value
		);
	}

	combinationFn(store, context) {
		if (context.format == "inline") {
			if (store.length == 1) {
				return store[0].properties.lastName.value
			} else if (store.length == 2) {
				return store[0].properties.lastName.value + " and " + store[1].properties.lastName.value
			} else if (store.length == 3) {
				return store[0].properties.lastName.value + ", " + store[1].properties.lastName.value + " and " + store[2].properties.lastName.value
			} else if (store.length > 3) {
				return store[0].properties.lastName.value + " <i>et al.</i>"
			}
		} else {
			let result = "";
			for (var i = 0; i < store.length; i++) {
				result += store[i].properties.lastName.value.trim() + ", " + store[i].properties.firstNameInitials.value.trim()
				if (i != store.length - 1) {
					result += ", "
				}
			}

			return result
		}
	}
}

class Editor {
	constructor(firstNameInitials, lastName, companyName) {

		this.properties = {
			firstNameInitials: {
				label: "First and middle name initials",
				value: firstNameInitials || ""
			},
			lastName: {
				label: "Last name",
				value: lastName || ""
			}
		};
	}

	render() {
		return (
			this.properties.lastName.value + ", " + this.properties.firstNameInitials.value
		);
	}

	combinationFn(store, context) {
		if (store.length == 1) {
			return store[0].properties.lastName.value + ", " + store[0].properties.firstNameInitials.value + ", ed."
		} else {
			let result = ""
			for (var i = 0; i < store.length ; i++) {
				if (i > 0 && i != store.length - 1) {
					result += ", "
				} else if (i == store.length - 1) {
					result += " and "
                }
				result += store[i].properties.lastName.value + ", " + store[i].properties.firstNameInitials.value
            }
			return result +  ", eds."
		}
	}
}

class DateProp {
	constructor(day, month, year) {
		this.properties = {
			day: {
				label: "Day",
				value: day || "",
				example: "e.g. 23 without the rd"
			},
			month: {
				label: "Month",
				value: month || "",
			},
			year: {
				label: "Year",
				value: year || "",
			}
		};
	}

	ordinal_suffix_of(i) {
		var j = i % 10,
			k = i % 100;
		if (j == 1 && k != 11) {
			return i + "st";
		}
		if (j == 2 && k != 12) {
			return i + "nd";
		}
		if (j == 3 && k != 13) {
			return i + "rd";
		}
		return i + "th";
	}


	render() {
		return (
			this.properties.day.value + " " + this.properties.month.value + " " + this.properties.year.value
		);
	}
}

class Pages {
	constructor(pages) {
		this.properties = {
			value: {
				label: "Pages",
				value: pages || "",
			}
		};
	}

	render() {
		if (this.properties.value.value.includes("-") || this.properties.value.value.includes(",")) {
			return (
				"pp." + this.properties.value.value
			)
		} else {
			return (
				"p." + this.properties.value.value
			);
        }
	}
}

class Value {
	constructor() {
		this.properties = {
			value: {
				label: "",
				value: null,
			}
		};
	}

	render() {
		return (
			this.properties.value.value
		);
	}
}

class PlaceOfPublication {
	constructor() {
		this.properties = {
			value: {
				label: "if known",
				value: null,
			}
		};
	}

	render() {
		if (this.properties.value.value) {
			return (
				this.properties.value.value + ": "
			);
		} else {
			return ""
        }
	}
}

class Volume {
	constructor(vol, subtitle) {
		this.properties = {
			vol: {
				label: "Volume",
				value: vol || ""
			},
			subtitle: {
				label: "Subtitle (if present)",
				value: subtitle || ""
			}
		};
	}

	render() {
		if (this.properties.subtitle) {
			return (
				"Vol. " + this.properties.vol.value + ", " + this.properties.subtitle.value
			);
		} else {
			return (
				"Vol. " + this.properties.vol.value
			);
		}
	}
}

class JournalVolume {
	constructor(part, issue) {
		this.properties = {
			part: {
				label: "Part",
				value: part|| ""
			},
			issue: {
				label: "Issue",
				value: issue || ""
			}
		};
	}

	render() {
		return (
			this.properties.part.value + "  (" + this.properties.issue.value + ")"
		);
	}
}

class Edition {
	constructor(ed) {
		this.properties = {
			edition: {
				label: "",
				value: ed || "",
			}
		};
	}

	ordinal_suffix_of(i) {
		var j = i % 10,
			k = i % 100;
		if (j == 1 && k != 11) {
			return i + "st";
		}
		if (j == 2 && k != 12) {
			return i + "nd";
		}
		if (j == 3 && k != 13) {
			return i + "rd";
		}
		return i + "th";
	}

	render() {
		if (this.properties.edition.value) {
			return (
				this.ordinal_suffix_of(this.properties.edition.value) + " ed. "
			);
		} else {
			return ""
        }
	}
}

let contentTypes = {
	Author,
	DateProp,
	Pages,
	Volume,
	Value,
	Edition,
	Editor,
	JournalVolume,
	PlaceOfPublication
}

let types = {
	"PL-P": {
		type: "Acts of Parliament (Statutes) pre-1963",
		subtype: "Print",
		label: "[PL-P] Acts of Parliament (Statutes) pre-1963 (Print)",
		tooltips: ["PL", "P"],
		schema: {
			shortTitle: {
				type: "Value",
				label: "Short title",
				store: new Value()
			},
			year: {
				type: "Value",
				label: "Year",
				store: new Value()
			},
			regnalYear: {
				type: "Value",
				label: "Regnal year",
				store: new Value()
			},
			chapterNo: {
				type: "Value",
				label: "Chapter number",
				store: new Value()
			},
			authorTEST: {
				type: "Author",
				label: "Author",
				store: []
			}
		},
		formats: {
			reference: `<i>{{shortTitle}} {{year}}</i> ({{regnalYear}}, chapter {{chapterNo}}) {{authorTEST}}`,
			inline: `<i>{{shortTitle}} {{year}}</i> ({{regnalYear}}, chapter {{chapterNo}}) {{authorTEST}}`
		}
	},
	"PL-E": {
		type: "Acts of Parliament (Statutes) pre-1963",
		subtype: "Electronic",
		label: "[PL-E] Acts of Parliament (Statutes) pre-1963 (Electronic)",
		tooltips: ["PL", "E"],
		schema: {
			"shortTitle": {
				type: "Value",
				label: "Short title",
				store: new Value()
			},
			"year": {
				type: "Value",
				label: "Year",
				store: new Value()
			},
			"regnalYear": {
				type: "Value",
				label: "Regnal year",
				store: new Value()
			},
			"chapterNo": {
				type: "Value",
				label: "Chapter number",
				store: new Value()
			},
			"websiteName": {
				type: "Value",
				label: "Website name",
				store: new Value()
			},
			"url": {
				type: "Value",
				label: "URL of website",
				store: new Value()
			},
			"accessDate": {
				type: "DateProp",
				label: "Date Accessed",
				store: new DateProp
			}
		},
		formats: {
			reference: `<i>{{shortTitle}} {{year}}</i> [online] ({{regnalYear}}, chapter {{chapterNo}}). {{websiteName}}. Available from: {{url}} [Accessed {{accessDate}}].`,
			inline: `<i>{{shortTitle}} {{year}}</i> ({{regnalYear}}, chapter {{chapterNo}})`
		}
	},
	"PLP-P": {
		type: "Acts of Parliament (Statutes) post-1963",
		subtype: "Print",
		label: "[PLP-P] Acts of Parliament (Statutes) post-1963 (Print)",
		tooltips: ["PLP", "P"],
		schema: {
			name: {
				type: "Value",
				label: "Name of Act",
				store: new Value()
			},
			year: {
				type: "Value",
				label: "Year",
				store: new Value()
			},
			chapterNo: {
				type: "Value",
				label: "Chapter number",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			}
		},
		formats: {
			reference: `<i>{{name}} {{year}}. Chapter {{chapterNo}}.</i> ({{year}})) {{publicationPlace}}: {{publisher}}`,
			inline: `<i>{{name}}</i> ({{year}})`
		}
	},
	"PLP-E": {
		type: "Acts of Parliament (Statutes) post-1963",
		subtype: "Electronic",
		label: "[PLP-E] Acts of Parliament (Statutes) post-1963 (Electronic)",
		tooltips: ["PLP", "E"],
		schema: {
			name: {
				type: "Value",
				label: "Name of Act",
				store: new Value()
			},
			year: {
				type: "Value",
				label: "Year",
				store: new Value()
			},
			chapterNo: {
				type: "Value",
				label: "Chapter number",
				store: new Value()
			},
			websiteName: {
				type: "Value",
				label: "Name of website",
				store: new Value()
			},
			url: {
				type: "Value",
				label: "URL",
				store: new Value()
			},
			date: {
				type: "DateProp",
				label: "Date accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `<i>{{name}} {{year}}. Chapter {{chapterNo}}.</i> ({{year}})) {{websiteName}}. Available from: {{url}} [Accessed {{date}}].`,
			inline: `<i>{{name}}</i> ({{year}})`
		}
	},
	"A-GL": {
		type: "Works of art",
		subtype: "In gallery/institution",
		label: "[A-GL] Works of art (In gallery/institution)",
		tooltips: ["A", "GL"],
		schema: {
			artist: {
				type: "Author",
				label: "Artists",
				store: []
			},
			dateCreated: {
				type: "Value",
				label: "Date of creation",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title of work",
				store: new Value()
			},
			medium: {
				type: "Value",
				label: "Medium",
				store: new Value()
			},
			loc: {
				type: "Value",
				label: "Geographic location where work is housed",
				store: new Value()
			},
			institution: {
				type: "Value",
				label: "nstitution or collection that houses the work",
				store: new Value()
			}
		},
		formats: {
			reference: `{{author}} ({{dateCreated}}) <i>{{title}}</i> [{{medium}}]. At: {{loc}}: {{institution}}`,
			inline: `<i>{{title}}</i> ({{year}})`
		}
	},
	"BL": {
		type: "Blogs",
		subtype: "",
		label: "[BL] Blogs ",
		tooltips: ["BL"],
		schema: {
			author: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title of blog entry",
				store: new Value()
			},
			blog: {
				type: "Value",
				label: "Title of the blog",
				store: new Value()
			},
			date: {
				type: "DateProp",
				label: "Day and month of publication (year not required)",
				store: new DateProp()
			},
			url: {
				type: "Value",
				label: "URL",
				store: new Value()
			},
			accessed: {
				type: "DateProp",
				label: "Date accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `{{author}} ({{year}}) {{title}}. <i>{{blog}}</i> [blog]. {{date}}. Available from: {{url}} [Accessed {{accessed}}].`,
			inline: `{{author}} ({{year}})`
		}
	},
	"BC-P": {
		type: "Book chapters",
		subtype: "Print",
		label: "[BC-P] Book chapters (Print)",
		tooltips: ["BC", "P"],
		schema: {
			author: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication of chapter",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Book chapter title",
				store: new Value()
			},
			editors: {
				type: "Editor",
				label: "Editors",
				store: []
			},
			yearBook: {
				type: "Value",
				label: "Year of publication of book",
				store: new Value()
			},
			titleBook: {
				type: "Value",
				label: "Title of book",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			},
			pages: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			}
		},
		formats: {
			reference: `{{author}} ({{year}}) {{title}}. In: {{bookAuthor}}, ed., ({{yearBook}}) <i>{{titleBook}}</i>. {{publicationPlace}}: {{publisher}}, {{pages}}.`,
			inline: `{{author}} ({{year}})`
		}
	},
	"BC-E": {
		type: "Book chapters",
		subtype: "Electronic",
		label: "[BC-E] Book chapters (Electronic)",
		tooltips: ["BC", "E"],
		schema: {
			author: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication of chapter",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Book chapter title",
				store: new Value()
			},
			editors: {
				type: "Editor",
				label: "Editors",
				store: []
			},
			yearBook: {
				type: "Value",
				label: "Year of publication of book",
				store: new Value()
			},
			titleBook: {
				type: "Value",
				label: "Title of book",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			},
			pages: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			},
			accessed: {
				type: "DateProp",
				label: "Accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `{{author}} ({{year}}) {{title}}. In: {{editors}}, ({{yearBook}}) <i>{{titleBook}}</i> [online]. {{publicationPlace}}: {{publisher}}, {{pages}}. [Accessed {{accessed}}]`,
			inline: `{{author}} ({{year}}, {{pages}})`
		}
	},
	"BC-MV": {
		type: "Book chapters",
		subtype: "part of Multi-volume work",
		label: "[BC-MV] Book chapters (part of Multi-volume work)",
		tooltips: ["BC", "MV"],
		schema: {
			author: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication of chapter",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Book chapter title",
				store: new Value()
			},
			editors: {
				type: "Editor",
				label: "Editors",
				store: []
			},
			yearBook: {
				type: "Value",
				label: "Year of publication of book",
				store: new Value()
			},
			titleBook: {
				type: "Value",
				label: "Title of book",
				store: new Value()
			},
			volume: {
				type: "Volume",
				label: "Volume",
				store: new Volume()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			},
			pages: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			}
		},
		formats: {
			reference: `{{author}} ({{year}}) {{title}}. In: {{editors}}, ({{yearBook}}) <i>{{titleBook}}</i>: {{volume}}. {{publicationPlace}}: {{publisher}}, {{pages}}.`,
			inline: `{{author}} ({{year}})`
		}
	},
	"BC-DR": {
		type: "Book chapters",
		subtype: "Digital Repository",
		label: "[BC-DR] Book chapters (Digital Repository)",
		tooltips: ["BC", "DR"],
		schema: {
			author: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication of chapter",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Book chapter title",
				store: new Value()
			},
			editors: {
				type: "Editor",
				label: "Editors",
				store: []
			},
			yearBook: {
				type: "Value",
				label: "Year of publication of book",
				store: new Value()
			},
			titleBook: {
				type: "Value",
				label: "Title of book",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			},
			pages: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			},
			accessed: {
				type: "DateProp",
				label: "Accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `{{author}} ({{year}}) {{title}}. In: {{editors}}, ({{yearBook}}) <i>{{titleBook}}</i> [online]. {{publicationPlace}}: {{publisher}}, {{pages}}. [Accessed {{accessed}}]`,
			inline: `{{author}} ({{year}})`
		}
	},
	"B": {
		type: "Books",
		subtype: "",
		label: "[B] Books ",
		tooltips: ["B"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title",
				store: new Value()
			},
			edition: {
				type: "Edition",
				label: "Edition (if not first)",
				store: new Edition()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) <i>{{title}}</i>. {{edition}}{{publicationPlace}}: {{publisher}}`,
			inline: `({{authors}}, {{year}})`
		}
	},
	"B-R": {
		type: "Books",
		subtype: "Reprint",
		label: "[B-R] Books (Reprint)",
		tooltips: ["B", "R"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			},
			yearRepublished: {
				type: "Value",
				label: "Year reprint published",
				store: new Value()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) <i>{{title}}</i>. Reprint. {{publicationPlace}}: {{publisher}}, {{yearRepublished}}`,
			inline: `({{authors}}, {{year}})`
		}
	},
	"B-T": {
		type: "Books",
		subtype: "Translation",
		label: "[B-T] Books (Translation)",
		tooltips: ["B", "T"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication of the translation",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title",
				store: new Value()
			},
			lang: {
				type: "Value",
				label: "Original language",
				store: new Value()
			},
			translatorFirstName: {
				type: "Value",
				label: "First name of translator",
				store: new Value()
			},
			translatorSurname: {
				type: "Value",
				label: "Last name of translator",
				store: new Value()
			},
			edition: {
				type: "Edition",
				label: "Edition (if not first)",
				store: new Edition()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) <i>{{title}}</i>. Translated from {{lang}} by {{translatorFirstName}} {{translatorSurname}}. {{publicationPlace}}: {{publisher}}.`,
			inline: `({{authors}}, {{year}})`
		}
	},
	"B-MVB": {
		type: "Books",
		subtype: "Multi-volume books",
		label: "[B-MVB] Books (Multi-volume books)",
		tooltips: ["B", "MVB"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title",
				store: new Value()
			},
			vols: {
				type: "Value",
				label: "Number of volumes",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) <i>{{title}}</i> ({{vols}} vols.). {{publicationPlace}}: {{publisher}}`,
			inline: `({{authors}}, {{year}})`
		}
	},
	"B-ATH": {
		type: "Books",
		subtype: "Anthologies",
		label: "[B-ATH] Books (Anthologies)",
		tooltips: ["B", "ATH"],
		schema: {
			editors: {
				type: "Editor",
				label: "Authors (editors)",
				store: []
			},
			year: {
				type: "Value",
				label: "Year",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			}
		},
		formats: {
			reference: `{{editors}} ({{year}}) <i>{{title}}</i>. {{publicationPlace}}: {{publisher}}.`,
			inline: `{{editors}} ({{year}})`
		}
	},
	"B-K": {
		type: "Books",
		subtype: "Electronic book device, e.g. Kindle",
		label: "[B-K] Books (Electronic book device, e.g. Kindle)",
		tooltips: ["B", "K"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) <i>{{title}}</i>. Kindle ed. {{publicationPlace}}: {{publisher}}`,
			inline: `({{authors}}, {{year}})`
		}
	},
	"B-F": {
		type: "Books",
		subtype: "Electronic reference book, incl. dictionaries",
		label: "[B-F] Books (Electronic reference book, incl. dictionaries)",
		tooltips: ["B", "F"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			titleCS: {
				type: "Value",
				label: "Title of chapter or section",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title",
				store: new Value()
			},
			accessed: {
				type: "DateProp",
				label: "Accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) {{titleCS}}. In: <i>{{title}}</i> [online]. [Accessed {{accessed}}].`,
			inline: `({{authors}}, {{year}})`
		}
	},
	"B-DR": {
		type: "Books",
		subtype: "Digital repositories",
		label: "[B-DR] Books in digital repositories",
		tooltips: ["B", "DR"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title",
				store: new Value()
			},
			publicationPlace: {
				type: "Value",
				label: "Place of publication",
				store: new Value()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			},
			repo: {
				type: "Value",
				label: "Name of digital repository",
				store: new Value()
			},
			url: {
				type: "Value",
				label: "URL",
				store: new Value()
			},
			accessed: {
				type: "DateProp",
				label: "Accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) <i>{{title}}</i>. {{publicationPlace}}: {{publisher}}. {{repo}} [online]. Available from: {{url}} [Accessed {{accessed}}].`,
			inline: `({{authors}}, {{year}})`
		}
	},
	"CN-P": {
		type: "Censuses",
		subtype: "Print",
		label: "[CN-P] Censuses (Print)",
		tooltips: ["CN", "P"],
		schema: {
			nameOfPerson: {
				type: "Value",
				label: "Name of person",
				store: new Value()
			},
			year: {
				type: "Value",
				label: "Year of census",
				store: new Value()
			},
			detailsOfCensus: {
				type: "Value",
				label: "Details of census",
				store: new Value()
			},
			pieceNumber: {
				type: "Value",
				label: "Piece number",
				store: new Value()
			},
			folioNumber: {
				type: "Value",
				label: "Folio number",
				store: new Value()
			},
			pageNumber: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			}
		},
		formats: {
			reference: `'{{nameOfPerson}}' ({{year}}) <i>{{detailsOfCensus}}</i>. Public Record Office: {{pieceNumber}}, folio {{folioNumber}}, {{pageNumber}}.`,
			inline: `('{{nameOfPerson}}' {{year}})`
		}
	},
	"CN-E": {
		type: "Censuses",
		subtype: "Electronic",
		label: "[CN-E] Censuses (Electronic)",
		tooltips: ["CN", "E"],
		schema: {
			nameOfPerson: {
				type: "Value",
				label: "Name of person",
				store: new Value()
			},
			year: {
				type: "Value",
				label: "Year of census",
				store: new Value()
			},
			detailsOfCensus: {
				type: "Value",
				label: "Details of census",
				store: new Value()
			},
			pieceNumber: {
				type: "Value",
				label: "Piece number",
				store: new Value()
			},
			folioNumber: {
				type: "Value",
				label: "Folio number",
				store: new Value()
			},
			pageNumber: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			},
			website: {
				type: "Value",
				label: "Name of website",
				store: new Value()
			},
			yearLastUpdate: {
				type: "Value",
				label: "Year of last update",
				store: new Value()
			},
			url: {
				type: "Value",
				label: "URL",
				store: new Value()
			},
			accessed: {
				type: "DateProp",
				label: "Date accessed",
				store: new DateProp()
			},
		},
		formats: {
			reference: `'{{nameOfPerson}}' ({{year}}) <i>{{detailsOfCensus}}</i> [online]. Public Record Office: {{pieceNumber}}, folio {{folioNumber}}, {{pageNumber}}. {{website}} ({{yearLastUpdate}}). Available from: {{url}} [Accessed {{accessed}}].`,
			inline: `('{{nameOfPerson}}' {{year}})`
		}
	},
	"CR": {
		type: "Cochrane reviews",
		subtype: "",
		label: "[CR] Cochrane reviews ",
		tooltips: ["CR"]
	},
	"G-CP": {
		type: "Computer games",
		subtype: "Physical copies of games",
		label: "[G-CP] Computer games (Physical copies of games)",
		tooltips: ["G", "CP"]
	},
	"G-DW": {
		type: "Computer games",
		subtype: "Digital download",
		label: "[G-DW] Computer games (Digital download)",
		tooltips: ["G", "DW"]
	},
	"C-PP": {
		type: "Conference papers and proceedings",
		subtype: "Papers",
		label: "[C-PP] Conference papers and proceedings (Papers)",
		tooltips: ["C", "PP"],
		schema: {
			author: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title of conference paper/contribution",
				store: new Value()
			},
			editors: {
				type: "Editor",
				label: "Editors",
				store: []
			},
			titleConf: {
				type: "Value",
				label: "Title of conference proceedings",
				store: new Value()
			},
			placeConf: {
				type: "Value",
				label: "Place of conference",
				store: new Value()
			},
			dateConf: {
				type: "Value",
				label: "Date(s) of conference",
				store: new Value()
			},
			publicationPlace: {
				type: "PlaceOfPublication",
				label: "Place of publication",
				store: new PlaceOfPublication()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			},
			pages: {
				type: "Pages",
				label: "Page numbers",
				store: new Pages()
			}
		},
		formats: {
			reference: `{{author}} ({{year}}) {{title}}. In: {{editors}}, <i>{{titleConf}}</i>. {{placeConf}}, {{dateConf}}. {{publicationPlace}}{{publisher}}, {{pages}}.`,
			inline: `{{author}} ({{year}})`
		}
	},
	"C-PROC": {
		type: "Conference papers and proceedings",
		subtype: "Proceedings",
		label: "[C-PROC] Conference papers and proceedings (Proceedings)",
		tooltips: ["C", "PROC"],
		schema: {
			editors: {
				type: "Editor",
				label: "Editors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year",
				store: new Value()
			},
			titleConf: {
				type: "Value",
				label: "Title of conference proceedings",
				store: new Value()
			},
			placeConf: {
				type: "Value",
				label: "Place of conference",
				store: new Value()
			},
			dateConf: {
				type: "Value",
				label: "Date(s) of conference",
				store: new Value()
			},
			publicationPlace: {
				type: "PlaceOfPublication",
				label: "Place of publication",
				store: new PlaceOfPublication()
			},
			publisher: {
				type: "Value",
				label: "Publisher",
				store: new Value()
			}
		},
		formats: {
			reference: `{{editors}} ({{year}}) <i>{{titleConf}}</i>, {{placeConf}}, {{dateConf}}. {{publicationPlace}}{{publisher}}.`,
			inline: `{{editors}} ({{year}})`
		}
	},
	"C-PON": {
		type: "Conference papers and proceedings",
		subtype: "Proceedings published online",
		label: "[C-PON] Conference papers and proceedings (Proceedings published online)",
		tooltips: ["C", "PON"]
	},
	"C-PDR": {
		type: "Conference papers and proceedings",
		subtype: "Papers digital repositories",
		label: "[C-PDR] Conference papers and proceedings (Papers digital repositories)",
		tooltips: ["C", "PDR"]
	},
	"D": {
		type: "Datasets",
		subtype: "",
		label: "[D] Datasets ",
		tooltips: ["D"]
	},
	"DTG": {
		type: "Diagrams, tables and graphs",
		subtype: "",
		label: "[DTG] Diagrams, tables and graphs ",
		tooltips: ["DTG"]
	},
	"XHB-AK": {
		type: "Exhibition catalogues",
		subtype: "Author or editor known",
		label: "[XHB-AK] Exhibition catalogues (Author or editor known)",
		tooltips: ["XHB", "AK"]
	},
	"XHB-AN": {
		type: "Exhibition catalogues",
		subtype: "Author unknown",
		label: "[XHB-AN] Exhibition catalogues (Author unknown)",
		tooltips: ["XHB", "AN"]
	},
	"FV-DVD": {
		type: "Films and videos",
		subtype: "Films and videos on DVD",
		label: "[FV-DVD] Films and videos (Films and videos on DVD)",
		tooltips: ["FV", "DVD"]
	},
	"FV-DVDE": {
		type: "Films and videos",
		subtype: "DVD extras",
		label: "[FV-DVDE] Films and videos (DVD extras)",
		tooltips: ["FV", "DVDE"]
	},
	"FV-FI": {
		type: "Films and videos",
		subtype: "Films viewed on the internet",
		label: "[FV-FI] Films and videos (Films viewed on the internet)",
		tooltips: ["FV", "FI"]
	},
	"FV-VI": {
		type: "Films and videos",
		subtype: "Videos viewed on the internet",
		label: "[FV-VI] Films and videos (Videos viewed on the internet)",
		tooltips: ["FV", "VI"]
	},
	"FV-FVD": {
		type: "Films and videos",
		subtype: "Films and videos downloaded",
		label: "[FV-FVD] Films and videos (Films and videos downloaded)",
		tooltips: ["FV", "FVD"]
	},
	"CLP-P": {
		type: "House of Commons/Lords papers",
		subtype: "Print",
		label: "[CLP-P] House of Commons/Lords papers (Print)",
		tooltips: ["CLP", "P"]
	},
	"CLP-E": {
		type: "House of Commons/Lords papers",
		subtype: "Electronic",
		label: "[CLP-E] House of Commons/Lords papers (Electronic)",
		tooltips: ["CLP", "E"]
	},
	"I-RXB": {
		type: "Images and Illustrations",
		subtype: "Image taken from another work, e.g. reproduced in an exhibition catalogue or book",
		label: "[I-RXB] Images and Illustrations (Image taken from another work, e.g. reproduced in an exhibition catalogue or book)",
		tooltips: ["I", "RXB"]
	},
	"I-OWA": {
		type: "Images and Illustrations",
		subtype: "Images of works of art accessed electronically",
		label: "[I-OWA] Images and Illustrations (Images of works of art accessed electronically)",
		tooltips: ["I", "OWA"]
	},
	"IVW-INT": {
		type: "Interviews",
		subtype: "Interview on the internet",
		label: "[IVW-INT] Interviews (Interview on the internet)",
		tooltips: ["IVW", "INT"]
	},
	"IVW-RNT": {
		type: "Interviews",
		subtype: "Interview on television/radio",
		label: "[IVW-RNT] Interviews (Interview on television/radio)",
		tooltips: ["IVW", "RNT"]
	},
	"IVW-PNT": {
		type: "Interviews",
		subtype: "Published interview or interview conducted for research",
		label: "[IVW-PNT] Interviews (Published interview or interview conducted for research)",
		tooltips: ["IVW", "PNT"]
	},
	"J-P": {
		type: "Journal articles",
		subtype: "Print",
		label: "[J-P] Journal articles (Print)",
		tooltips: ["J", "P"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title of the article",
				store: new Value()
			},
			journal: {
				type: "Value",
				label: "Journal",
				store: new Value()
			},
			volume: {
				type: "JournalVolume",
				label: "Volume",
				store: new JournalVolume()
			},
			pages: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) {{title}}. <i>{{journal}}</i>. {{volume}}, {{pages}}.`,
			inline: `{{authors}} ({{year}}, {{pages}})`
		}
	},
	"J-E": {
		type: "Journal articles",
		subtype: "Electronic",
		label: "[J-E] Journal articles (Electronic)",
		tooltips: ["J", "E"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title of the article",
				store: new Value()
			},
			journal: {
				type: "Value",
				label: "Journal",
				store: new Value()
			},
			volume: {
				type: "JournalVolume",
				label: "Volume",
				store: new JournalVolume()
			},
			pages: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			},
			accessed: {
				type: "DateProp",
				label: "Accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) {{title}}. <i>{{journal}}</i> [online]. {{volume}}, {{pages}}. [Accessed {{accessed}}].`,
			inline: `{{authors}} ({{year}}, {{pages}})`
		}
	},
	"J-JPP": {
		type: "Journal articles",
		subtype: "Journal articles (pre-publication) in digital repositories",
		label: "[J-JPP] Journal articles (Journal articles (pre-publication) in digital repositories)",
		tooltips: ["J", "JPP"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			title: {
				type: "Value",
				label: "Title of the article",
				store: new Value()
			},
			journal: {
				type: "Value",
				label: "Journal",
				store: new Value()
			},
			url: {
				type: "Value",
				label: "URL",
				store: new Value()
			},
			accessed: {
				type: "DateProp",
				label: "Accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) {{title}}. To be published in <i>{{journal}}</i> [preprint]. Available from: {{url}} [Accessed {{accessed}}].`,
			inline: `({{authors}}, {{pages}})`
		}
	},
	"J-JRP": {
		type: "Journal articles",
		subtype: "Journal article reprint",
		label: "[J-JRP] Journal articles (Journal article reprint)",
		tooltips: ["J", "JRP"],
		schema: {
			authors: {
				type: "Author",
				label: "Authors",
				store: []
			},
			year: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			reprintOf: {
				type: "Value",
				label: "Reprint of (article)",
				store: new Value()
			},
			journal: {
				type: "Value",
				label: "Journal",
				store: new Value()
			},
			volume: {
				type: "JournalVolume",
				label: "Volume",
				store: new JournalVolume()
			},
			pages: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			},
			inJournal: {
				type: "Value",
				label: "In (journal)",
				store: new Value()
			},
			inYear: {
				type: "Value",
				label: "Year of publication",
				store: new Value()
			},
			inVolume: {
				type: "JournalVolume",
				label: "Volume",
				store: new JournalVolume()
			},
			inPages: {
				type: "Pages",
				label: "Pages",
				store: new Pages()
			},
			accessed: {
				type: "DateProp",
				label: "Accessed",
				store: new DateProp()
			}
		},
		formats: {
			reference: `{{authors}} ({{year}}) Reprint of: {{title}}. <i>{{journal}}</i> [online]. {{volume}}, {{pages}}. In: {{inJournal}} ({{inYear}}). {{inVolume}}, {{inPages}}. [Accessed {{accessed}}].`,
			inline: `{{authors}} ({{year}})`
		}
	},
	"L-LR": {
		type: "Law reports (cases)",
		subtype: "Referring to a case published in a law report",
		label: "[L-LR] Law reports (cases) (Referring to a case published in a law report)",
		tooltips: ["L", "LR"]
	},
	"L-NCIT": {
		type: "Law reports (cases)",
		subtype: "neutral citation- referring to case not publication",
		label: "[L-NCIT] Law reports (cases) (neutral citation- referring to case not publication)",
		tooltips: ["L", "NCIT"]
	},
	"L-HANS": {
		type: "Law reports (cases)",
		subtype: "Hansard",
		label: "[L-HANS] Law reports (cases) (Hansard)",
		tooltips: ["L", "HANS"]
	},
	"LF": {
		type: "Leaflets",
		subtype: "",
		label: "[LF] Leaflets ",
		tooltips: ["LF"]
	},
	"LC": {
		type: "Lecturers' notes",
		subtype: "",
		label: "[LC] Lecturers' notes ",
		tooltips: ["LC"]
	},
	"LV-LCO": {
		type: "Live performances (concerts, dance, plays)",
		subtype: "Live concerts",
		label: "[LV-LCO] Live performances (concerts, dance, plays) (Live concerts)",
		tooltips: ["LV", "LCO"]
	},
	"LV-LDA": {
		type: "Live performances (concerts, dance, plays)",
		subtype: "Live dance",
		label: "[LV-LDA] Live performances (concerts, dance, plays) (Live dance)",
		tooltips: ["LV", "LDA"]
	},
	"LV-LPL": {
		type: "Live performances (concerts, dance, plays)",
		subtype: "Live plays",
		label: "[LV-LPL] Live performances (concerts, dance, plays) (Live plays)",
		tooltips: ["LV", "LPL"]
	},
	"LY": {
		type: "Lyrics from a song",
		subtype: "",
		label: "[LY] Lyrics from a song ",
		tooltips: ["LY"]
	},
	"MAP-P": {
		type: "Maps",
		subtype: "Print",
		label: "[MAP-P] Maps (Print)",
		tooltips: ["MAP", "P"]
	},
	"MAP-E": {
		type: "Maps",
		subtype: "Electronic",
		label: "[MAP-E] Maps (Electronic)",
		tooltips: ["MAP", "E"]
	},
	"EQ-P": {
		type: "Mathematical equations",
		subtype: "Print",
		label: "[EQ-P] Mathematical equations (Print)",
		tooltips: ["EQ", "P"]
	},
	"EQ-E": {
		type: "Mathematical equations",
		subtype: "Electronic",
		label: "[EQ-E] Mathematical equations (Electronic)",
		tooltips: ["EQ", "E"]
	},
	"MBD-BUL": {
		type: "Message/bulletin boards and discussion",
		subtype: "Message/bulletin board or discussion list website",
		label: "[MBD-BUL] Message/bulletin boards and discussion (Message/bulletin board or discussion list website)",
		tooltips: ["MBD", "BUL"]
	},
	"MBD-BUW": {
		type: "Message/bulletin boards and discussion",
		subtype: "Message on a message/bulletin board or discussion list website",
		label: "[MBD-BUW] Message/bulletin boards and discussion (Message on a message/bulletin board or discussion list website)",
		tooltips: ["MBD", "BUW"]
	},
	"MBD-MDS": {
		type: "Message/bulletin boards and discussion",
		subtype: "Message sent to an email discussion list",
		label: "[MBD-MDS] Message/bulletin boards and discussion (Message sent to an email discussion list)",
		tooltips: ["MBD", "MDS"]
	},
	"MF": {
		type: "Microformats",
		subtype: "",
		label: "[MF] Microformats ",
		tooltips: ["MF"]
	},
	"MR": {
		type: "Military records",
		subtype: "",
		label: "[MR] Military records ",
		tooltips: ["MR"]
	},
	"MM": {
		type: "Minutes of Meetings",
		subtype: "",
		label: "[MM] Minutes of Meetings ",
		tooltips: ["MM"]
	},
	"MS-CLS": {
		type: "Music and sound recordings",
		subtype: "Classical music",
		label: "[MS-CLS] Music and sound recordings (Classical music)",
		tooltips: ["MS", "CLS"]
	},
	"MS-POP": {
		type: "Music and sound recordings",
		subtype: "Popular music",
		label: "[MS-POP] Music and sound recordings (Popular music)",
		tooltips: ["MS", "POP"]
	},
	"MS-MDW": {
		type: "Music and sound recordings",
		subtype: "Music download",
		label: "[MS-MDW] Music and sound recordings (Music download)",
		tooltips: ["MS", "MDW"]
	},
	"MS-SEF": {
		type: "Music and sound recordings",
		subtype: "Sound effects",
		label: "[MS-SEF] Music and sound recordings (Sound effects)",
		tooltips: ["MS", "SEF"]
	},
	"MS-PLA": {
		type: "Music and sound recordings",
		subtype: "Play- audio recording",
		label: "[MS-PLA] Music and sound recordings (Play- audio recording)",
		tooltips: ["MS", "PLA"]
	},
	"MS-POA": {
		type: "Music and sound recordings",
		subtype: "Poetry- online audio recording",
		label: "[MS-POA] Music and sound recordings (Poetry- online audio recording)",
		tooltips: ["MS", "POA"]
	},
	"NW-P": {
		type: "Newspapers",
		subtype: "Print",
		label: "[NW-P] Newspapers (Print)",
		tooltips: ["NW", "P"]
	},
	"NW-E": {
		type: "Newspapers",
		subtype: "Electronic",
		label: "[NW-E] Newspapers (Electronic)",
		tooltips: ["NW", "E"]
	},
	"NW-AN": {
		type: "Newspapers",
		subtype: "Author unknown",
		label: "[NW-AN] Newspapers (Author unknown)",
		tooltips: ["NW", "AN"]
	},
	"NW-VCD": {
		type: "Newspapers",
		subtype: "Viewed on a CD-ROM",
		label: "[NW-VCD] Newspapers (Viewed on a CD-ROM)",
		tooltips: ["NW", "VCD"]
	},
	"OP-P": {
		type: "Official publications",
		subtype: "Print",
		label: "[OP-P] Official publications (Print)",
		tooltips: ["OP", "P"]
	},
	"OP-E": {
		type: "Official publications",
		subtype: "Electronic",
		label: "[OP-E] Official publications (Electronic)",
		tooltips: ["OP", "E"]
	},
	"PR-P": {
		type: "Parish registers",
		subtype: "Print",
		label: "[PR-P] Parish registers (Print)",
		tooltips: ["PR", "P"]
	},
	"PR-E": {
		type: "Parish registers",
		subtype: "Electronic",
		label: "[PR-E] Parish registers (Electronic)",
		tooltips: ["PR", "E"]
	},
	"PAT": {
		type: "Patents",
		subtype: "",
		label: "[PAT] Patents ",
		tooltips: ["PAT"]
	},
	"PC": {
		type: "Personal communications (including emails and letters)",
		subtype: "",
		label: "[PC] Personal communications (including emails and letters) ",
		tooltips: ["PC"]
	},
	"PG-E": {
		type: "Photographs",
		subtype: "Electronic",
		label: "[PG-E] Photographs (Electronic)",
		tooltips: ["PG", "E"]
	},
	"PG-IBK": {
		type: "Photographs",
		subtype: "In a book",
		label: "[PG-IBK] Photographs (In a book)",
		tooltips: ["PG", "IBK"]
	},
	"PD-PLE": {
		type: "Planning documents",
		subtype: "Planning application: electronic format",
		label: "[PD-PLE] Planning documents (Planning application: electronic format)",
		tooltips: ["PD", "PLE"]
	},
	"PD-PDE": {
		type: "Planning documents",
		subtype: "Planning documents: electronic format",
		label: "[PD-PDE] Planning documents (Planning documents: electronic format)",
		tooltips: ["PD", "PDE"]
	},
	"PDC-PH": {
		type: "Podcasts (including phonecasts, videocasts, screencasts)",
		subtype: "Phonecast",
		label: "[PDC-PH] Podcasts (including phonecasts, videocasts, screencasts) (Phonecast)",
		tooltips: ["PDC", "PH"]
	},
	"PDC-VDC": {
		type: "Podcasts (including phonecasts, videocasts, screencasts)",
		subtype: "Videocast",
		label: "[PDC-VDC] Podcasts (including phonecasts, videocasts, screencasts) (Videocast)",
		tooltips: ["PDC", "VDC"]
	},
	"PDC-SCS": {
		type: "Podcasts (including phonecasts, videocasts, screencasts)",
		subtype: "Screencast",
		label: "[PDC-SCS] Podcasts (including phonecasts, videocasts, screencasts) (Screencast)",
		tooltips: ["PDC", "SCS"]
	},
	"PSD": {
		type: "Posters and displays",
		subtype: "",
		label: "[PSD] Posters and displays ",
		tooltips: ["PSD"]
	},
	"CC-E": {
		type: "Public communications (e.g. lectures, presentations, webinars, announcements)",
		subtype: "Electronic",
		label: "[CC-E] Public communications (e.g. lectures, presentations, webinars, announcements) (Electronic)",
		tooltips: ["CC", "E"]
	},
	"CC-PEV": {
		type: "Public communications (e.g. lectures, presentations, webinars, announcements)",
		subtype: "Public event or print-format public communication",
		label: "[CC-PEV] Public communications (e.g. lectures, presentations, webinars, announcements) (Public event or print-format public communication)",
		tooltips: ["CC", "PEV"]
	},
	"RD-RA": {
		type: "Radio programmes",
		subtype: "Broadcast on the radio",
		label: "[RD-RA] Radio programmes (Broadcast on the radio)",
		tooltips: ["RD", "RA"]
	},
	"RD-IN": {
		type: "Radio programmes",
		subtype: "Accessed from the Internet",
		label: "[RD-IN] Radio programmes (Accessed from the Internet)",
		tooltips: ["RD", "IN"]
	},
	"REP-RPP": {
		type: "Reports (e.g. annual, company, financial, market, technical)",
		subtype: "Annual and company reports: print format",
		label: "[REP-RPP] Reports (e.g. annual, company, financial, market, technical) (Annual and company reports: print format)",
		tooltips: ["REP", "RPP"]
	},
	"REP-RPE": {
		type: "Reports (e.g. annual, company, financial, market, technical)",
		subtype: "Annual and company reports: electronic format",
		label: "[REP-RPE] Reports (e.g. annual, company, financial, market, technical) (Annual and company reports: electronic format)",
		tooltips: ["REP", "RPE"]
	},
	"REP-FR": {
		type: "Reports (e.g. annual, company, financial, market, technical)",
		subtype: "Financial reports from online databases",
		label: "[REP-FR] Reports (e.g. annual, company, financial, market, technical) (Financial reports from online databases)",
		tooltips: ["REP", "FR"]
	},
	"REP-MSP": {
		type: "Reports (e.g. annual, company, financial, market, technical)",
		subtype: "Market surveys: print format",
		label: "[REP-MSP] Reports (e.g. annual, company, financial, market, technical) (Market surveys: print format)",
		tooltips: ["REP", "MSP"]
	},
	"REP-MSE": {
		type: "Reports (e.g. annual, company, financial, market, technical)",
		subtype: "Market surveys: electronic format",
		label: "[REP-MSE] Reports (e.g. annual, company, financial, market, technical) (Market surveys: electronic format)",
		tooltips: ["REP", "MSE"]
	},
	"REP-TR": {
		type: "Reports (e.g. annual, company, financial, market, technical)",
		subtype: "Technical reports",
		label: "[REP-TR] Reports (e.g. annual, company, financial, market, technical) (Technical reports)",
		tooltips: ["REP", "TR"]
	},
	"ST-BIB": {
		type: "Sacred texts",
		subtype: "The Bible",
		label: "[ST-BIB] Sacred texts (The Bible)",
		tooltips: ["ST", "BIB"]
	},
	"ST-QUR": {
		type: "Sacred texts",
		subtype: "The Qur'an",
		label: "[ST-QUR] Sacred texts (The Qur'an)",
		tooltips: ["ST", "QUR"]
	},
	"ST-TOR": {
		type: "Sacred texts",
		subtype: "The Torah",
		label: "[ST-TOR] Sacred texts (The Torah)",
		tooltips: ["ST", "TOR"]
	},
	"SN": {
		type: "Social networking websites",
		subtype: "",
		label: "[SN] Social networking websites ",
		tooltips: ["SN"]
	},
	"SFW": {
		type: "Software",
		subtype: "",
		label: "[SFW] Software ",
		tooltips: ["SFW"]
	},
	"S-P": {
		type: "Standards",
		subtype: "Print",
		label: "[S-P] Standards (Print)",
		tooltips: ["S", "P"]
	},
	"S-E": {
		type: "Standards",
		subtype: "Electronic",
		label: "[S-E] Standards (Electronic)",
		tooltips: ["S", "E"]
	},
	"SI-P": {
		type: "Statutory instruments",
		subtype: "Print",
		label: "[SI-P] Statutory instruments (Print)",
		tooltips: ["SI", "P"]
	},
	"SI-E": {
		type: "Statutory instruments",
		subtype: "Electronic",
		label: "[SI-E] Statutory instruments (Electronic)",
		tooltips: ["SI", "E"]
	},
	"TV-EP": {
		type: "Television programmes",
		subtype: "An episode broadcast on TV",
		label: "[TV-EP] Television programmes (An episode broadcast on TV)",
		tooltips: ["TV", "EP"]
	},
	"TV-OFF": {
		type: "Television programmes",
		subtype: "A one-off programme or film broadcast on TV",
		label: "[TV-OFF] Television programmes (A one-off programme or film broadcast on TV)",
		tooltips: ["TV", "OFF"]
	},
	"TV-SER": {
		type: "Television programmes",
		subtype: "The whole series broadcast on TV",
		label: "[TV-SER] Television programmes (The whole series broadcast on TV)",
		tooltips: ["TV", "SER"]
	},
	"TV-EPI": {
		type: "Television programmes",
		subtype: "An episode viewed on the Internet",
		label: "[TV-EPI] Television programmes (An episode viewed on the Internet)",
		tooltips: ["TV", "EPI"]
	},
	"TV-OFI": {
		type: "Television programmes",
		subtype: "A one-off programme/film viewed on the Internet",
		label: "[TV-OFI] Television programmes (A one-off programme/film viewed on the Internet)",
		tooltips: ["TV", "OFI"]
	},
	"TV-SRI": {
		type: "Television programmes",
		subtype: "The whole series viewed on the Internet",
		label: "[TV-SRI] Television programmes (The whole series viewed on the Internet)",
		tooltips: ["TV", "SRI"]
	},
	"TV-EDV": {
		type: "Television programmes",
		subtype: "An episode on DVD",
		label: "[TV-EDV] Television programmes (An episode on DVD)",
		tooltips: ["TV", "EDV"]
	},
	"TV-BXS": {
		type: "Television programmes",
		subtype: "An episode from a DVD box-set",
		label: "[TV-BXS] Television programmes (An episode from a DVD box-set)",
		tooltips: ["TV", "BXS"]
	},
	"TV-OFD": {
		type: "Television programmes",
		subtype: "A one-off programme/film on DVD",
		label: "[TV-OFD] Television programmes (A one-off programme/film on DVD)",
		tooltips: ["TV", "OFD"]
	},
	"TV-SDV": {
		type: "Television programmes",
		subtype: "A whole series on DVD",
		label: "[TV-SDV] Television programmes (A whole series on DVD)",
		tooltips: ["TV", "SDV"]
	},
	"TH-P": {
		type: "Theses, dissertations and student projects",
		subtype: "Print",
		label: "[TH-P] Theses, dissertations and student projects (Print)",
		tooltips: ["TH", "P"]
	},
	"TH-E": {
		type: "Theses, dissertations and student projects",
		subtype: "Electronic",
		label: "[TH-E] Theses, dissertations and student projects (Electronic)",
		tooltips: ["TH", "E"]
	},
	"W-WP": {
		type: "Web pages",
		subtype: "Webpages",
		label: "[W-WP] Web pages (Webpages)",
		tooltips: ["W", "WP"]
	},
	"W-IW": {
		type: "Web pages",
		subtype: "Images or diagrams taken from webpages",
		label: "[W-IW] Web pages (Images or diagrams taken from webpages)",
		tooltips: ["W", "IW"]
	},
	"W-WIKI": {
		type: "Web pages",
		subtype: "Wiki articles",
		label: "[W-WIKI] Web pages (Wiki articles)",
		tooltips: ["W", "WIKI"]
	}
}

let options = [];

for (let key in types) {
	options.push({
		label: types[key].label,
		value: key
	})
}

let fromJSON = (as) => {
	let b = JSON.parse(as)
	for (let key in b) {
		let tempType = new contentTypes[b[key].type]();

		if (b[key].store.constructor === Array) {
			for (var i = 0; i < b[key].store.length; i++) {
				let a = new contentTypes[b[key].type]();
				b[key].store[i] = Object.assign(a, b[key].store[i]);
			}
		} else {
			b[key].store = Object.assign(new contentTypes[b[key].type](), b[key].store);
		}
		b[key].type = tempType

	}

	return b
}

class UIField extends React.Component {
	constructor(props) {
		super();
		this.label = props.label || "";
		this.target = props.target || null;
		this.multiple = this.target ? (this.target.constructor === Array ? true : false) : null;
		this.contentType = contentTypes[props.contentType] || null;
		this.currentValue = "";
		this.instance = props.instance || this.target;
		this.seq = 0;
		this.update = this.update.bind(this);
		this.addChild = this.addChild.bind(this);
		this.removeChild = props.removeChild || this.removeChild.bind(this);
		this.updateProps = this.updateProps.bind(this)
	}

	update(e, property = "value") {
		if (!this.multiple) {
			this.instance.properties[property].value = e.target.value;
		}

		this.forceUpdate();
	}

	addChild() {
		this.seq += 1;
		let toInsert = new this.contentType;
		toInsert.key = this.seq;
		this.target.push(toInsert);
		this.forceUpdate();
	}

	removeChild(key) {
		this.target.splice(this.target.findIndex(item => item.key == key), 1)
		this.forceUpdate()
	}

	updateProps() {
		this.label = this.props.label || "";
		this.target = this.props.target || null;
		this.multiple = this.target ? (this.target.constructor === Array ? true : false) : null;
		this.contentType = contentTypes[this.props.contentType] || null;
		this.currentValue = "";
		this.instance = this.props.instance || this.target;
		this.update = this.update.bind(this);
		this.addChild = this.addChild.bind(this);
		this.removeChild = this.props.removeChild || this.removeChild.bind(this);
	}

	render() {
		this.updateProps();
		let fieldsToAppend = []
		if (this.multiple) {
			this.target.forEach((inst) => {
				fieldsToAppend.push(<UIField instance={inst} removeChild={this.removeChild} />)
			})
		} else {
			let inputs = []
			for (let key in this.instance.properties) {
				inputs.push(
					<div>
						<h6 style={{ marginBottom: 0, marginTop: "5px" }}>{this.instance.properties[key].label}</h6>
						<Textfield onChange={(e) => { this.update(e, key) }} value={this.instance.properties[key].value || ""} />
						<span style={{ fontSize: "0.7em", color: "#4c6975", display: this.instance.properties[key].example ? 'block' : 'none', overflowWrap: 'anywhere', lineHeight: 1.2, marginTop: '4px' }}>{this.instance.properties[key].example}</span>
					</div>
				)
			}

			return (
				<div className="fieldContainer">
					<h5 style={{ margin: 0, marginTop: "15px", display: this.label ? 'inherit' : 'none' }}>{this.label}</h5>

					<div className={this.instance.key ? 'entryDiv' : ''}>
						<div className="inputGroup">
							{inputs}
						</div>
						<Button onClick={() => { this.removeChild(this.instance.key) }} style={{ display: this.instance.key ? 'inherit' : 'none' }}>-</Button>
					</div>
				</div>
			)
		}

		return (
			<div>
				<h5 className="fieldContainer" style={{ margin: 0, marginTop: "15px" }}>{this.label}</h5>
				{fieldsToAppend}
				<Button onClick={this.addChild}>+ Add</Button>
			</div>
		);
	}
}

class Reference extends React.Component {
	constructor(props) {
		super(props)
		//this.data = props.schema
		this.type = props.type;
		this.data = props.data ? fromJSON(props.data) : this.type.schema;
		this.evaluateTemplate = this.evaluateTemplate.bind(this);
		this.send = props.send;
	}

	evaluateTemplate(context = {}) {
		let result = types[this.type].formats[context.type]

		for (let key in this.data) {
			let evaluatedProp = "";
			if (this.data[key].store.constructor === Array) {
				if (contentTypes[this.data[key].type].prototype.combinationFn) {
					evaluatedProp += contentTypes[this.data[key].type].prototype.combinationFn(this.data[key].store, context);
				} else {
					this.data[key].store.forEach(i => {
						evaluatedProp += i.render(context)
						if (i != this.data[key].store[this.data[key].store.length - 1]) {
							evaluatedProp += this.data[key].delimiter
						}
					})
				}
			} else {
				evaluatedProp = this.data[key].store.render(context)
			}

			result = result.replace(`{{${key}}}`, evaluatedProp)
		}

		return result
	}

	componentWillReceiveProps(newProps) {
		this.type = newProps.type;
		this.data = newProps.data ? fromJSON(newProps.data) : this.type.schema;
		this.send = newProps.send;
	}

	render() {
		let refResult = this.data ? <Result type={this.type} data={JSON.stringify(this.data)} format="reference" /> : ""
		let citeResult = this.data ? <Result type={this.type} data={JSON.stringify(this.data)} format="inline" /> : ""

		let fieldsToDisplay = [];
		for (let key in this.data) {
			fieldsToDisplay.push(<UIField target={this.data[key].store} contentType={this.data[key].type || null} label={this.data[key].label || null} />)
		}

		return (
			<>
				<div className="referenceBuilder">
					{fieldsToDisplay}
					<Button appearance="primary" onClick={() => {
						this.send(this)
					}}>Render</Button>
				</div>
			</>
		);
	}
}

function copyToClip(str) {
	function listener(e) {
		e.clipboardData.setData("text/html", str);
		e.clipboardData.setData("text/plain", str.replace("<i>","").replace("</i>",""));
		e.preventDefault();
	}
	document.addEventListener("copy", listener);
	document.execCommand("copy");
	document.removeEventListener("copy", listener);
};

class Result extends React.Component {
	constructor(props, data = null) {
		super(props)

		this.type = props.type;
		this.data = fromJSON(props.data);
		this.evaluateTemplate = this.evaluateTemplate.bind(this);
		this.format = props.format;
	}

	componentWillReceiveProps(newProps) {
		this.type = newProps.type;
		this.data = fromJSON(newProps.data);
		this.format = newProps.format;
    }

	evaluateTemplate(context) {
		console.log("props", this.props, "this", this)
		if (!context) {
			context = {format: this.format}
        }
		let result = this.type.formats[context.format]
		for (let key in this.data) {
			let evaluatedProp = "";
			if (this.data[key].store.constructor === Array) {
				if (this.data[key].type.combinationFn) {
					evaluatedProp += this.data[key].type.combinationFn(this.data[key].store, context);
				} else {
					this.data[key].store.forEach(i => {
						evaluatedProp += i.render(context)
						if (i != this.data[key].store[this.data[key].store.length - 1]) {
							evaluatedProp += this.data[key].delimiter
						}
					})
				}
			} else {
				evaluatedProp = this.data[key].store.render(context)
			}

			result = result.replace(new RegExp(`{{${key}}}`, "g"), evaluatedProp)
		}

		return result
	}

	render() {
		let result = this.evaluateTemplate();

		let tooltips = [];

		for (var i = 0; i < this.type.tooltips.length; i++) {
			tooltips.push(<span className={"tooltip small " + this.type.tooltips[i]}>{this.type.tooltips[i]}</span>);
		}

		return (
			<>
				<div className="referenceResult">
					{tooltips}
					<span dangerouslySetInnerHTML={{ __html: result }} style={{
						display: "inline",
						marginLeft: "10px",
						marginRight: "10px"
					}} />
				</div>
				<button className="copy" onClick={() => {
					copyToClip(result)
				}}>Copy</button>
			</>
		);
	}
}

class ReferenceContainer extends React.Component {
	constructor(props) {
		super(props);
		this.data = null
	}

	render() {
		this.type = types[this.props.type];

		let tooltips = [];

		let reference = <Reference type={this.type} send={(reference) => {
			this.data = JSON.stringify(reference.data)
			this.type = reference.type
			this.props.send({ type: this.type, data: this.data })
			this.forceUpdate()
		}} />

		for (var i = 0; i < this.type.tooltips.length; i++) {
			tooltips.push(<span className={"tooltip " + this.type.tooltips[i]}>{this.type.tooltips[i]}</span>);
		}

		let refResult = this.data ? <Result type={this.type} data={this.data} format="reference" /> : ""
		let citeResult= this.data ? <Result type={this.type} data={this.data} format="inline" /> : ""

		return (
			<>
				<div className="buildBlock">
					{tooltips}
					<div className="container">
						<div className="infopane">
							<h4 style={{ fontWeight: 400, margin: 0 }}>{this.type.subtype}</h4>
							<h1 style={{ margin: 0 }}>{this.type.type}</h1>
						</div>
						{reference}
					</div>
				</div>
				<div className="referenceResultContainer">
					Reference: {refResult}<br />
					Citation: {citeResult}
				</div>
			</>
		)
	}
}

class SelectType extends React.Component {
	constructor(props) {
		super(props);
		this.update = props.update;
		this.processChange = this.processChange.bind(this);
		this.value = "";
	}

	processChange(e) {
		this.update(e);
		this.value = e.key;
		this.forceUpdate();
	}

	render() {
		return (
			<Select
				className="single-select"
				classNamePrefix="react-select"
				options={options}
				value={this.value}
				placeholder="Select a content type"
				onChange={this.processChange}
			/>
		);
	}
}

function globalReceiver(summary) {
	let a = JSON.stringify(summary)
	window.result = a;
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: null
		}

		this.render = this.render.bind(this)
	}

	render() {
		let ref
		if (this.state.type != null) {
			ref = <ReferenceContainer type={this.state.type} send={globalReceiver} />
		} else {
			ref = null
		}
		return (
			<div>
				<section>
					<span style={{ marginBottom: "5px", display: "block" }}><b>Type</b></span>
					<SelectType update={(e) => { this.setState({ type: e.value }) }} />
				</section>
				<section>
					{ref}
				</section>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
)
