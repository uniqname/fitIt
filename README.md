#Usage

    fitIt(<selector>)

All elements that match the `selector` will be made responsive and full width within it's container...

    
    fitIt('[src*="youtube.com"]');

 ...including any asynchronously loaded nodes

    fitIt('[src*="youtube.com"]');
    
    setTimeout(function () {
        var i = document.createElement('iframe');
        i.src = '//www.youtube.com/embed/ImlzsxHbTRQ';
        document.body.appendChild(i);
    }, 5000);

Multiple selectors can be used...

    fitIt('[src*="youtube.com"], [src*="vimeo.com"]');

Even multiple calls.

    fitIt('[src*="youtube.com"]');
    fitIt('[src*="vimeo.com"]');    

Before the iframe...

    fitIt('[src*="youtube.com"], [src*="vimeo.com"]');
    
    ...
    
    <iframe width="560" height="315" src="//www.youtube.com/embed/MG9-y2t2ZLI" frameborder="0" allowfullscreen></iframe>

or after the iframe...

    <iframe width="560" height="315" src="//www.youtube.com/embed/MG9-y2t2ZLI" frameborder="0" allowfullscreen></iframe>
    
    ...
    
    fitIt('[src*="youtube.com"], [src*="vimeo.com"]');