import React from 'react';

const GooogleFonts = `WebFontConfig = {
    google: { families: [ 'Lato:300,300i,400,400i,700,700i,900,900i' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();`;

const Styles = () => (
  <section>
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link rel="stylesheet" href="/static/bootstrap.min.css" />
    <link rel="stylesheet" href="/static/foundation.min.css" />
    <link rel="stylesheet" href="/static/global.css" />
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
      crossOrigin="anonymous"
    />
    <script dangerouslySetInnerHTML={{ __html: GooogleFonts }} />
  </section>
);

export default Styles;
