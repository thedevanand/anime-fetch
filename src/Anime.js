const fetch = require('node-fetch');
const cheerio = require('cheerio');

class Anime {
	url = 'https://gogoanime.sh';

	constructor(url) {
		if(url) this.url = url;
	}

	async search(query, options) {
		let url = this.url;
		let all = false;

		if (options) {
			if (options.all == true) all = true;
			if (options.url) url = options.url;
		}

		if (!query) throw new Error('Nothing given to search :('); 

		if (!url) throw new Error('No url found to scrap :('); 

		let result = await fetch(url + '/search.html?keyword=' + query);
		result = await result.text();

		if (!result) return null;

		let $ = cheerio.load(result);

		let results = [];
		let pages = [];

		if ($('ul.items li').length != 0) {
				$('ul.items li').each(function(i, elem) {
					let _ = cheerio.load($(this).html());
					
					let name = _('p.name a').text() || null;
					let href = _('div.img a').attr('href') || null;

					if (href) href = url + href;

					let slug = '';
					if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

					let image = _('div.img a img').attr('src') || null;
					let releasedYear = _('p.released').text().replace('Released:', '').trim() || null;

					let anime = {
						name: name,
						url: href,
						slug: slug,
						image: image,
						released: parseInt(releasedYear)
					}

					results.push(anime);
				});
			}

		if ($('ul.pagination-list li').length != 0) {
			if(all) {
				$('ul.pagination-list li').each(function(page) {
					let _ = cheerio.load($(this).html());
					
					pages.push(_('a').attr('data-page'));
				});

				pages.forEach = async function forEach(callback, thisArg) {
					if (typeof callback !== "function") {
						throw new TypeError(callback + " is not a function");
					}
					var array = this;
					thisArg = thisArg || this;
					for (var i = 0, l = array.length; i !== l; ++i) {
						await callback.call(thisArg, array[i], i, array);
					}
				};

				delete pages[0];

				await pages.forEach(async function(page) {
					let page_fetch = await fetch(url + '/search.html?keyword=' + query + '&page=' + page);
					page_fetch = await page_fetch.text();

					let $$ = cheerio.load(page_fetch);

					if ($$('ul.items li').length != 0) {
						$$('ul.items li').each(function(i, elem) {
							let _ = cheerio.load($(this).html());

							let name = _('p.name a').text() || null;
							let href = _('div.img a').attr('href') || null;
							if (href) href = url + href;
							
							let slug = '';

							if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
							
							let image = _('div.img a img').attr('src') || null;
							let releasedYear = _('p.released').text().replace('Released:', '').trim() || null;

							let anime = {
								name: name,
								url: href,
								slug: slug,
								image: image,
								released: parseInt(releasedYear)
							} 

							results.push(anime);
						});
					}
				});
			}
		}

		return results;
	}

	async recent(options) {
		let url = this.url;
		let all = false;

		if (options) {
			if (options.all == true) all = true;
			if (options.url) url = options.url;
		}

		if (!url) throw new Error('No url found to scrap :('); 

		let result = await fetch(url);
		result = await result.text();

		if (!result) return null;

		let $ = cheerio.load(result);

		let results = [];
		let pages = [];

		if ($('ul.items li').length != 0) {
				$('ul.items li').each(function(i, elem) {
					let _ = cheerio.load($(this).html());
					
					let name = _('p.name a').text() || null;
					let href = _('div.img a').attr('href') || null;

					if (href) href = url + href;

					let slug = '';
					if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

					let image = _('div.img a img').attr('src') || null;
					let episode = _('p.episode').text().replace('Episode', '').trim() || null;

					let anime = {
						name: name,
						url: href,
						slug: slug,
						image: image,
						episode: parseInt(episode)
					}

					results.push(anime);
				});
			}

		if ($('ul.pagination-list li').length != 0) {
			if(all) {
				$('ul.pagination-list li').each(function(page) {
					let _ = cheerio.load($(this).html());
					
					pages.push(_('a').attr('data-page'));
				});

				pages.forEach = async function forEach(callback, thisArg) {
					if (typeof callback !== "function") {
						throw new TypeError(callback + " is not a function");
					}
					var array = this;
					thisArg = thisArg || this;
					for (var i = 0, l = array.length; i !== l; ++i) {
						await callback.call(thisArg, array[i], i, array);
					}
				};

				delete pages[0];

				await pages.forEach(async function(page) {
					let page_fetch = await fetch(url + '?page=' + page);
					page_fetch = await page_fetch.text();

					let $$ = cheerio.load(page_fetch);

					if ($$('ul.items li').length != 0) {
						$$('ul.items li').each(function(i, elem) {
							let _ = cheerio.load($(this).html());

							let name = _('p.name a').text() || null;
							let href = _('div.img a').attr('href') || null;
							if (href) href = url + href;
							
							let slug = '';

							if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
							
							let image = _('div.img a img').attr('src') || null;
							let episode = _('p.episode').text().replace('Episode', '').trim() || null;

							let anime = {
								name: name,
								url: href,
								slug: slug,
								image: image,
								episode: parseInt(episode)
							} 

							results.push(anime);
						});
					}
				});
			}
		}

		return results;
	}

	async movies(options) {
		let url = this.url + 'anime-movies.html';
		let all = false;

		if (options) {
			if (options.all == true) all = true;
			if (options.url) url = options.url;
		}

		if (!url) throw new Error('No url found to scrap :('); 

		let result = await fetch(url);
		result = await result.text();

		if (!result) return null;

		let $ = cheerio.load(result);

		let results = [];
		let pages = [];

		if ($('ul.items li').length != 0) {
				$('ul.items li').each(function(i, elem) {
					let _ = cheerio.load($(this).html());
					
					let name = _('p.name a').text() || null;
					let href = _('div.img a').attr('href') || null;

					if (href) href = url + href;

					let slug = '';
					if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

					let image = _('div.img a img').attr('src') || null;
					let releasedYear = _('p.released').text().replace('Released:', '').trim() || null;

					let anime = {
						name: name,
						url: href,
						slug: slug,
						image: image,
						released: parseInt(releasedYear)
					}

					results.push(anime);
				});
			}

		if ($('ul.pagination-list li').length != 0) {
			if(all) {
				$('ul.pagination-list li').each(function(page) {
					let _ = cheerio.load($(this).html());
					
					pages.push(_('a').attr('data-page'));
				});

				pages.forEach = async function forEach(callback, thisArg) {
					if (typeof callback !== "function") {
						throw new TypeError(callback + " is not a function");
					}
					var array = this;
					thisArg = thisArg || this;
					for (var i = 0, l = array.length; i !== l; ++i) {
						await callback.call(thisArg, array[i], i, array);
					}
				};

				delete pages[0];

				await pages.forEach(async function(page) {
					let page_fetch = await fetch(url + '?page=' + page);
					page_fetch = await page_fetch.text();

					let $$ = cheerio.load(page_fetch);

					if ($$('ul.items li').length != 0) {
						$$('ul.items li').each(function(i, elem) {
							let _ = cheerio.load($(this).html());

							let name = _('p.name a').text() || null;
							let href = _('div.img a').attr('href') || null;
							if (href) href = url + href;
							
							let slug = '';

							if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
							
							let image = _('div.img a img').attr('src') || null;
							let releasedYear = _('p.released').text().replace('Released:', '').trim() || null;

							let anime = {
								name: name,
								url: href,
								slug: slug,
								image: image,
								released: parseInt(releasedYear)
							} 

							results.push(anime);
						});
					}
				});
			}
		}

		return results;
	}

	async genre(query, options) {
		let url = this.url + 'genre/';
		let all = false;

		if (options) {
			if (options.all == true) all = true;
			if (options.url) url = options.url;
		}

		if (!url) throw new Error('No url found to scrap :('); 

		if (!query) throw new Error('No query given :(');

		let result = await fetch(url + query);
		result = await result.text();

		if (!result) return null;

		let $ = cheerio.load(result);

		let results = [];
		let pages = [];

		if ($('ul.items li').length != 0) {
				$('ul.items li').each(function(i, elem) {
					let _ = cheerio.load($(this).html());
					
					let name = _('p.name a').text() || null;
					let href = _('div.img a').attr('href') || null;

					if (href) href = url + href;

					let slug = '';
					if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

					let image = _('div.img a img').attr('src') || null;
					let releasedYear = _('p.released').text().replace('Released:', '').trim() || null;

					let anime = {
						name: name,
						url: href,
						slug: slug,
						image: image,
						released: parseInt(releasedYear)
					}

					results.push(anime);
				});
			}

		if ($('ul.pagination-list li').length != 0) {
			if(all) {
				$('ul.pagination-list li').each(function(page) {
					let _ = cheerio.load($(this).html());
					
					pages.push(_('a').attr('data-page'));
				});

				pages.forEach = async function forEach(callback, thisArg) {
					if (typeof callback !== "function") {
						throw new TypeError(callback + " is not a function");
					}
					var array = this;
					thisArg = thisArg || this;
					for (var i = 0, l = array.length; i !== l; ++i) {
						await callback.call(thisArg, array[i], i, array);
					}
				};

				delete pages[0];

				await pages.forEach(async function(page) {
					let page_fetch = await fetch(url + query + '?page=' + page);
					page_fetch = await page_fetch.text();

					let $$ = cheerio.load(page_fetch);

					if ($$('ul.items li').length != 0) {
						$$('ul.items li').each(function(i, elem) {
							let _ = cheerio.load($(this).html());

							let name = _('p.name a').text() || null;
							let href = _('div.img a').attr('href') || null;
							if (href) href = url + href;
							
							let slug = '';

							if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
							
							let image = _('div.img a img').attr('src') || null;
							let releasedYear = _('p.released').text().replace('Released:', '').trim() || null;

							let anime = {
								name: name,
								url: href,
								slug: slug,
								image: image,
								released: parseInt(releasedYear)
							} 

							results.push(anime);
						});
					}
				});
			}
		}

		return results;
	}

	async genres() {
		let url = this.url;

		if (!url) throw new Error('No url found to scrap :(');

		let result = await fetch(url);
		result = await result.text();

		if (!result) return null;

		let $ = cheerio.load(result);

		let results = [];

		$('li.genre ul li').each(function(i, elem) {
			let _ = cheerio.load($(this).html());
			results.push(_('a').text());
		});

		return results;
	}

	async popular(options) {
		let url = this.url + 'popular.html';
		let all = false;

		if (options) {
			if (options.all == true) all = true;
			if (options.url) url = options.url;
		}

		if (!url) throw new Error('No url found to scrap :('); 

		let result = await fetch(url);
		result = await result.text();

		if (!result) return null;

		let $ = cheerio.load(result);

		let results = [];
		let pages = [];

		if ($('ul.items li').length != 0) {
				$('ul.items li').each(function(i, elem) {
					let _ = cheerio.load($(this).html());
					
					let name = _('p.name a').text() || null;
					let href = _('div.img a').attr('href') || null;

					if (href) href = url + href;

					let slug = '';
					if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

					let image = _('div.img a img').attr('src') || null;
					let releasedYear = _('p.released').text().replace('Released:', '').trim() || null;

					let anime = {
						name: name,
						url: href,
						slug: slug,
						image: image,
						released: parseInt(releasedYear)
					}

					results.push(anime);
				});
			}

		if ($('ul.pagination-list li').length != 0) {
			if(all) {
				$('ul.pagination-list li').each(function(page) {
					let _ = cheerio.load($(this).html());
					
					pages.push(_('a').attr('data-page'));
				});

				pages.forEach = async function forEach(callback, thisArg) {
					if (typeof callback !== "function") {
						throw new TypeError(callback + " is not a function");
					}
					var array = this;
					thisArg = thisArg || this;
					for (var i = 0, l = array.length; i !== l; ++i) {
						await callback.call(thisArg, array[i], i, array);
					}
				};

				delete pages[0];

				await pages.forEach(async function(page) {
					let page_fetch = await fetch(url + '?page=' + page);
					page_fetch = await page_fetch.text();

					let $$ = cheerio.load(page_fetch);

					if ($$('ul.items li').length != 0) {
						$$('ul.items li').each(function(i, elem) {
							let _ = cheerio.load($(this).html());

							let name = _('p.name a').text() || null;
							let href = _('div.img a').attr('href') || null;
							if (href) href = url + href;
							
							let slug = '';

							if (name) slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
							
							let image = _('div.img a img').attr('src') || null;
							let releasedYear = _('p.released').text().replace('Released:', '').trim() || null;

							let anime = {
								name: name,
								url: href,
								slug: slug,
								image: image,
								released: parseInt(releasedYear)
							} 

							results.push(anime);
						});
					}
				});
			}
		}

		return results;
	}

	async fetchEpisode(url, options) {
		let result = await fetch(url);
		result = await result.text();

		let elinks = false;

		if (options) {
		if (options.extraLinks != undefined) elinks = options.extraLinks;
		}

		if (!result) return null;

		let $ = cheerio.load(result);

		let episodeCount = $('ul#episode_page li a.active').attr("ep_end"); 

    let download = $("li.dowloads a").attr("href");

    if (!download) return console.log("Unable to scrap the downlaod link");

		let downloadPage = await fetch(download);
		downloadPage = await downloadPage.text();

		$ = cheerio.load(downloadPage);
		
    download = [];

    let extraLinks = [];

    let name = $('span#title').text() || null;

    $("div.dowload").each(function(i, elem) {
      let object = {};

      $ = cheerio.load($(this).html());

      object.quality = $('a').text().replace("Download\n", "").trim();

      object.link = $('a').attr("href");

      if (object.quality.startsWith("(")) download.push(object);

      else if(elinks) extraLinks.push(object);
    });

		let response = {
			name: name,
			totalEpisodes: episodeCount,
			download: download
		}
		if (elinks) response.extraLink = extraLinks; 
    return response;
	}

	async episodes(name, options) {
		let single = true;
		let episode = 1;
		let start = 1;

		if (!name) throw new Error('No name given in episodes function');
		
		if (options.episode) episode = options.episode;

		if (options.single != undefined) single = options.single;

		if (options.start) start = options.start;

		if(single) {
			return await this.fetchEpisode(this.url + name + '-episode-' + episode);
		} else {
			let episodes = [];

			for(let i = start; i <= episode; i++) {
				let object = {};

				object.episode = i;

				let download = await this.fetchEpisode(`${this.url}${name}-episode-${i}`);

				object.download = download.download;

				episodes.push(object);
			}
			return episodes;
		}
	}

	async fetch(name, options) {
		if (name.startsWith(this.url + '/category/')) {
			name = name.replace(this.url + '/category/', '');
		}
		
		let url = this.url + 'category/' + name;
		
		if(typeof url !== 'string') throw new Error(`Link should be string, ${typeof url} given :(`);

		let all = false;
		let episodes = false;

		if (options) {
			if (options.all == true) all = true;
			if (options.episodes != undefined) episodes = options.episodes;
		}

		if (!url) throw new Error('No url found to scrap :('); 

		let result = await fetch(url);
		result = await result.text();

		if (!result) return null;

		let $ = cheerio.load(result);
		
		let anime = {};

		anime.name = $('div.anime_info_body_bg h1').text() || null;
		anime.image = $('div.anime_info_body_bg img').attr("src");

		if (anime.name) anime.slug = anime.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

		
		$('div.anime_info_body_bg p.type').each(function(i, elem) {
			let _ = cheerio.load($(this).html());

			let key = _('span').text().toLowerCase().replace(':', '').trim().replace(/ /g, '_');

			if (all) {
				if (key == 'type') anime[key] = _('a').text();

				if (key == 'genre') anime[key] = _('a').text();

				if (key == 'genre') anime['genreArray'] = _('a').text().split(', ');

				if (key == 'status') anime[key] = _('a').text();

				if (key == 'other_name') anime[key] = _(this).html().replace('<span>' + _('span').text() + '</span>', '');
			}

			if (key == 'plot_summary') anime[key] = _(this).html().replace('<span>' + _('span').text() + '</span>', '');

			if (key == 'released') anime[key] = parseInt(_(this).html().replace('<span>' + _('span').text() + '</span>', ''));
		});

		anime.totalEpisodes = parseInt($('ul#episode_page li a.active').attr("ep_end"));

		if(episodes) {
			let epObject = [];

			let opts = {
				single: false,
				episode: anime.totalEpisodes
			}

			anime.episodes = await this.episodes(name, opts);
		}

		return anime;
	}
}

module.exports = Anime;