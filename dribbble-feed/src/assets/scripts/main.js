/**
 * Dynamit Code Day Dribbble Feed
 * @author ?
 */

var jQuery = require('jquery');

// Dribbble API info
const API_ENDPOINT = 'https://api.dribbble.com/v1/shots/';

// API token provided in-person
const API_TOKEN = '';

// DOM nodes
const DOM = {

	// main container
	mainContainer: document.querySelector('[role="main"]'),

	// button to hook click event into
	button: document.querySelector('#load-shots'),

	// container for the templated HTML
	feedContainer: document.querySelector('#dribbble-feed')

};


/**
 * Return a templated feed.
 * Handlebars is already included (via webpack handlebars-loader); just pass data through.
 * @param {object} data Context for template
 * @return {string} Templated HTML
 */
function templateFeed(data) {

	// import the template
	// note: if you update the template, you must recompile (hit save on main.js) to see changes
	const template = require('../../templates/components/feed');

	// template using data; return a string of HTML
	return template(data);

}


// CUSTOM ADDITIONS
;(function($) {

	$(DOM.button).click(loadShots);


	// Load the shots from the API.
	function loadShots() {

		$.get(API_ENDPOINT + '?access_token=' + API_TOKEN + '&timeframe=week')
			.done(function(data) {
				var defaultSorted = sort(data);
				renderShots(defaultSorted);
			});
	}


	/**
	 * Sort the data by 'views', 'likes', or 'followers' - all ascending order.
	 * 
	 * @param  {array} This is an array of shots returned from the API.
	 * @param  {string} sortBy This is a field to sort by. Options are
	 *   'views_count', 'likes_count', or 'followers' (all ascending)
	 * @return {array} This returns an array of sorted shot objects.
	 */
	function sort(shots, sortBy) {
		var sorted = [];
		if (typeof sortBy === 'undefined') {
			sortBy = 'views';
		}

		sorted = shots.sort(function(a, b) {
			if (a[sortBy] > b[sortBy]) {
				return -1;
			} else if (a[sortBy] < b[sortBy]) {
				return 1;
			} else {
				return 0;
			}
		});


		// @todo implement sortBy == 'likes_count' and sortBy for followers.
		
		return sorted;

	}

	/* Render the shots onto the page.
	 * 
	 * @param  {array} This is an array of shots returned from the API.
	 */
	function renderShots(shots) {
		DOM.feedContainer.innerHTML = templateFeed({ items: shots });
	}
	

})(jQuery);
