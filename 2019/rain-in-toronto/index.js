const somehow = require('somehow');
const years = {
  2019: require('./data/2019-toronto'),
  2018: require('./data/2018-toronto'),
  2017: require('./data/2017-toronto'),
  2016: require('./data/2016-toronto'),
  2015: require('./data/2015-toronto'),
  2014: require('./data/2014-toronto'),
  2013: require('./data/2013-toronto'),
  2012: require('./data/2012-toronto'),
  2011: require('./data/2011-toronto'),
  2010: require('./data/2010-toronto'),
  2009: require('./data/2009-toronto'),
  2008: require('./data/2008-toronto'),
  2007: require('./data/2007-toronto'),
  2006: require('./data/2006-toronto'),
  2005: require('./data/2005-toronto'),
  2004: require('./data/2004-toronto'),
  2003: require('./data/2003-toronto'),
  2002: require('./data/2002-toronto'),
  2001: require('./data/2001-toronto'),
  2000: require('./data/2000-toronto'),
}

const doYear = function(year) {
  let w = somehow({
    height: 200,
    aspect: 'widescreen',
  });
  let days = years[year]
  days.forEach((d) => {
    if (d.rain) {
      let bar = w.bar().color('blue').at(d.date, d.rain)
      bar.attrs.title = d.date
    }
    if (d.thunder) {
      w.text('•').color('rose').at(d.date, '-35px')
    }
  })
  w.text(String(year)).at('0%', '90%')
  w.y.fit(0, 3);
  w.x.fit(`Jan 1 ${year}`, `Dec 31 ${year}`);
  w.yAxis.remove()
  document.querySelector(`#year${year}`).innerHTML = w.build()
}
doYear(2019)
doYear(2018)
doYear(2017)
doYear(2016)
doYear(2015)
doYear(2014)
doYear(2013)
doYear(2012)
doYear(2011)
doYear(2010)
doYear(2009)
doYear(2008)
doYear(2007)
doYear(2006)
doYear(2005)
doYear(2004)
doYear(2003)
doYear(2002)
doYear(2001)
doYear(2000)


//2018 aug 8

//2017 july - https://globalnews.ca/news/3612904/toronto-under-flood-warning-with-some-roads-closed-due-to-flooding/
//2017 may 1 - toronto island - https://globalnews.ca/video/3418709/toronto-under-flood-watch

// 2014 oct 17 - https://www.cbc.ca/news/canada/toronto/raw-toronto-flood-aftermath-1.2802601
//2014 june 25 - https://globalnews.ca/video/1417301/heavy-downpour-floods-parts-of-toronto-wednesday
//2014 may 27 - https://globalnews.ca/video/1357804/raw-video-heavy-rains-bring-floods-to-parts-of-toronto

//2013 july 8 - extreme https://globalnews.ca/news/708703/health-officials-warn-about-contaminated-flood-waters/
// https://globalnews.ca/news/1439081/city-urges-storm-preparedness-on-anniversary-of-toronto-floods/
//2013 april 13

//2012 dec 28 - snow - https://nationalpost.com/news/toronto/snowfall-in-toronto-by-the-numbers

//2011 March 23 - big snowstorm - https://toronto.citynews.ca/2011/03/23/evening-webcast-march-23-2011/
// 1999 mel lastman army

//2008 August 8 - https://www.bttoronto.ca/videos/morning-weather-webcast-august-8-2018/

//2005 August - very fast 1-hour storm?
